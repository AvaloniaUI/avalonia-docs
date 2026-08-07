---
id: packaging-for-windows
title: Packaging apps for Windows
sidebar_label: Windows
doc-type: reference
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

## Packaging

Parcel creates Windows installers and archives. You can run Parcel on Windows, macOS, or Linux.

| Format | CLI code | Best suited for |
|---|---|---|
| NSIS installer (`.exe`) | `nsis` | Traditional direct distribution with a customizable installation flow and optional uninstaller |
| MSIX package (`.msix`) | `msix` | Modern Windows deployment, enterprise management, and Microsoft Store distribution |
| ZIP archive (`.zip`) | `zip` | Portable distribution that does not require installation or registration |

For the complete setting names, types, defaults, and environment variables, see the [Parcel configuration reference](/tools/parcel/configuration-reference#windows-settings).

### Package Configuration

#### Common Properties

**Application Name**:

Display name used for the application install directory, Start Menu entry, and shortcut file name.

:::note
Currently cannot be localized.
:::

**Package Name**:

The output installer file name (without extension).

### NSIS Installer Properties

Parcel uses NSIS (Nullsoft Scriptable Install System) that creates lightweight, self-extracting installers with flexible installation options.

**Company**:

The publisher name displayed in Windows properties, installers, and system dialogs. This name is used to organize applications in Program Files and registry entries when **Create Company Folder** is enabled.

**Create Company Folder**:

When enabled, Parcel installs the application in a company-specific subdirectory:
- Admin install: `Program Files\[Company]\[Application Name]\`
- User install: `%LocalAppData%\[Company]\[Application Name]\`

This also affects the Start Menu shortcut location, organizing shortcuts under `Start Menu\Programs\[Company]\[Application Name]`.

Default: false.

**Installer Icon**:

The installer icon in **ICO** or **SVG** format. ICO files should include multiple resolutions from 16x16 to 256x256 pixels. This icon appears in Windows Explorer for the installer executable, during installation, and in the Windows uninstaller list.

:::note
This is separate from the application icon. 

Application icon is defined by the standard .NET `<ApplicationIcon>file.ico</ApplicationIcon>` property in the .csproj file.
:::

**Requires Admin**:

Controls whether the installer requires administrator privileges for installation.

When enabled (default), the application is installed to `Program Files` and requires User Account Control (UAC) elevation. When disabled, the application is installed to the current user's `%LocalAppData%` directory without requiring elevation.

Default: true.

**Include uninstaller with the app**:

When enabled, Parcel includes an uninstaller executable with the application and creates an entry in Windows Settings > Apps & Features (or Control Panel > Programs and Features on older Windows versions).

Default: true.

**License File**:

Optional license file to be displayed during installation. Supported formats:
- Plain text (.txt)
- Rich Text Format (.rtf)

The license is displayed on a dedicated page during installation, and users must accept it to proceed.

### MSIX packages <MinVersion version="1.1" isNewVersion="true" />

MSIX provides package identity, clean installation and removal, and integration with Windows deployment systems. Parcel creates MSIX packages on every supported host. It does not require the Windows SDK to create the package. Parcel generates the package manifest or patches an `.appxmanifest` template in the project. It creates visual assets from the shared application metadata and **Installer Icon** settings.

The **Publisher** setting is the distinguished name in the MSIX identity, such as `CN=Contoso`. For a signed package that you distribute directly, this value must exactly match the signing certificate subject. Parcel gets the value from a local signing certificate when possible. Otherwise, it uses **Company** or **Application Name**.

For direct distribution, sign the MSIX package with a certificate that the target device trusts. For Microsoft Store distribution, the Store signs the submitted package. Disable **Sign Installer** when another process signs the package after Parcel. See Microsoft's [MSIX signing overview](https://learn.microsoft.com/en-us/windows/msix/package/signing-package-overview) and [Microsoft Store publishing guidance](https://learn.microsoft.com/en-us/windows/apps/publish/get-started).

### Desktop integration

**File Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types and custom icons. This creates registry entries for proper Windows Explorer integration.

To handle these files in Avalonia applications, see [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation).

**URL Schemes**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). This creates registry entries that enable other applications and web browsers to launch your app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation).

Configure associations under **Basics**. Parcel applies them to NSIS and MSIX packages. See [File associations and URL schemes](/tools/parcel/configuration-reference#file-associations).

## Code Signing

Parcel signs Windows executables and installers using Authenticode certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

:::note
This document explains how to integrate various signing methods with Parcel. It does not include detailed setup steps for obtaining certificates or configuring cloud signing services. Please refer to the linked documentation for each method for complete setup instructions.
:::

### Prerequisites

Before you sign a Windows application, make sure that you have these items:

- **Code Signing Certificate**: Valid Authenticode certificate from a trusted Certificate Authority
- **Windows SDK** (Windows only): Can be installed with Visual Studio Build Tools (on CI) or Visual Studio (on Desktop) from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)
- **Java Runtime**: Required for cross-platform signing operations.

### Signing Methods

Parcel supports multiple certificate formats depending on your development environment and workflow.

#### Local Certificate

Use a local certificate file (PFX/P12 format) for signing. This method is not recommended for production applications, and is typically untrusted by Windows.

**Required Configuration:**
- **Local Signing Certificate File**: Path to PFX or P12 certificate file
- **Local Signing Certificate Password**: Password protecting the certificate file
- **Timestamp Server URL** (optional): URL of timestamp authority server (e.g., `http://timestamp.digicert.com`)

**Platform Support:**
- **Windows**: Uses native SignTool when available, JSign otherwise
- **Linux/macOS**: Uses [JSign](https://github.com/ebourg/jsign) (requires Java Runtime)

**Documentation:**
- [New-SelfSignedCertificate](https://learn.microsoft.com/en-us/powershell/module/pki/new-selfsignedcertificate?view=windowsserver2025-ps)

#### Windows Certificate Store

Use certificates installed in the Windows Certificate Store, including hardware security modules (HSMs) and USB tokens.

**Required Configuration:**
- **Store Certificate Name**: Subject name or thumbprint of the certificate
- **Use Local Machine Certificate Store** (optional): Search in Local Machine store instead of Current User
- **Auto-Detect Matching Certificate** (optional): Automatically select the best matching certificate

**Platform Support:**
- **Windows only**: Requires Windows SDK (SignTool)

**Documentation:**
- [Windows Certificate Store Overview](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/certificate-stores)

#### Azure Artifact Signing (Cross-Platform)

Azure Artifact Signing is a cloud signing service that was formerly named Trusted Signing. It removes the need to manage local certificates. Hardware security modules (HSMs) protect the signing keys.

**Required Configuration:**
- **Azure Artifact Signing Endpoint**: Service endpoint URL (format: `https://[region].codesigning.azure.net/`)
- **Azure Artifact Signing Certificate Profile Name**: Name of the certificate profile
- **Azure Artifact Signing Account Name**: Name of the signing account

**Authentication:**
Azure CLI authentication or environment variables:
- `AZURE_TENANT_ID`: Azure Active Directory tenant ID
- `AZURE_CLIENT_ID`: Service principal client ID
- `AZURE_CLIENT_SECRET`: Service principal client secret

**Required Azure Role**: "Code Signing Certificate Profile Signer"

**Platform Support:**
- **Windows**: Uses native SignTool when available, JSign otherwise
- **Linux/macOS**: Uses [JSign](https://github.com/ebourg/jsign) (requires Java Runtime)

:::tip
Azure Artifact Signing is the recommended solution for enterprises requiring immediate trust without building reputation over time.
:::

**Documentation:**
- [Azure Artifact Signing documentation](https://learn.microsoft.com/en-us/azure/artifact-signing/)
- [Artifact Signing quickstart](https://learn.microsoft.com/en-us/azure/artifact-signing/quickstart)

#### Azure Key Vault

Store certificates and private keys securely in Azure Key Vault for centralized certificate management and access control.

**Required Configuration:**
- **Azure Key Vault Name**: Name of the Azure Key Vault instance
- **Azure Key Vault URL** (optional): Full vault URL for sovereign clouds or a non-default endpoint
- **Azure Key Vault Certificate Name**: Name of the certificate stored in the vault

**Authentication:**
Azure CLI authentication or environment variables:
- `AZURE_TENANT_ID`: Azure Active Directory tenant ID
- `AZURE_CLIENT_ID`: Service principal client ID
- `AZURE_CLIENT_SECRET`: Service principal client secret

**Required Azure Roles:**
- "Key Vault Crypto User" - for signing operations
- "Key Vault Certificate User" - for certificate access

**Documentation:**
- [Azure Key Vault Overview](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)

:::note
Powered by [JSign](https://github.com/ebourg/jsign), and requires Java Runtime.
:::

#### AWS KMS

Use AWS Key Management Service for secure private key storage with certificates managed separately.

**Required Configuration:**
- **AWS Region Code**: AWS region where the key is stored (e.g., `us-east-1`, `eu-west-1`, `ap-southeast-2`)
- **AWS Signing Certificate File**: Path to the certificate file (AWS KMS stores only the private key)
- **AWS Signing Key ID or Alias**: AWS KMS key identifier or alias

**Authentication:**
AWS credentials from one of the following sources:
- Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`
- ECS container credentials
- EC2 IMDSv2 service

**Required IAM Permissions:**
- `kms:ListKeys` - for key discovery
- `kms:DescribeKey` - for key metadata
- `kms:Sign` - for signing operations

**Documentation:**
- [AWS KMS Overview](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

:::note
Powered by [JSign](https://github.com/ebourg/jsign), and requires Java Runtime.
:::

#### DigiCert

Use certificates and keys stored in DigiCert ONE Secure Software Manager (formerly DigiCert KeyLocker) without installing DigiCert client tools.

**Required Configuration:**
- **DigiCert API Key**: API key for DigiCert ONE authentication (obtained from DigiCert ONE portal)
- **DigiCert Keystore**: PKCS#12 keystore file containing client certificate for authentication
- **DigiCert Storepass**: Password for the keystore file
- **DigiCert Certificate Name or ID**: Identifier for the certificate in DigiCert ONE
- **DigiCert Host** (optional): Custom host URL (defaults to `https://clientauth.one.digicert.com` for US)

**Documentation:**
- [DigiCert Software Trust Manager](https://docs.digicert.com/en/software-trust-manager.html)

:::note
Powered by [JSign](https://github.com/ebourg/jsign), and requires Java Runtime.
:::

#### Google Cloud KMS

Use Google Cloud Key Management Service for secure private key storage. The certificate must be provided separately as Google Cloud KMS stores only the private key.

**Required Configuration:**
- **Google Access Token**: OAuth 2.0 access token for authentication
- **Google Signing Keyring**: Keyring path in format: `projects/[PROJECT]/locations/[LOCATION]/keyRings/[KEYRING]`
- **Google Signing Certificate File**: Path to the certificate file
- **Google Signing Certificate Version** (optional): Specific version of the key (uses most recent if omitted)

**Required IAM Permissions:**
- `cloudkms.cryptoKeyVersions.useToSign` - for signing operations
- `cloudkms.cryptoKeyVersions.list` - required if version isn't specified
- `cloudkms.cryptoKeys.list` - for key discovery

**Documentation:**
- [Google Cloud KMS Overview](https://cloud.google.com/kms/docs)

:::note
Powered by [JSign](https://github.com/ebourg/jsign), and requires Java Runtime.
:::

#### SSL.com eSigner

Cloud-based signing service from SSL.com with hardware security module (HSM) backed certificates and optional sandbox environment for testing.

**Required Configuration:**
- **eSigner User Name**: SSL.com account username
- **eSigner Password**: SSL.com account password
- **eSigner Key Password**: Base64-encoded TOTP (Time-based One-Time Password) secret for two-factor authentication
- **eSigner Credential ID**: Credential identifier for the certificate (found in SSL.com dashboard)
- **eSigner Sandbox** (optional): Enable sandbox environment (`https://cs-try.ssl.com`) for testing before production use

**Documentation:**
- [SSL.com eSigner](https://www.ssl.com/esigner/)

:::note
Powered by [JSign](https://github.com/ebourg/jsign), and requires Java Runtime.
:::

## See also

- [Parcel setup](/tools/parcel/setup)
- [Parcel configuration reference](/tools/parcel/configuration-reference)
- [Parcel command line reference](/tools/parcel/command-line-reference)
