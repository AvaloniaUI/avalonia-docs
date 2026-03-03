---
id: packaging-for-windows
title: Packaging apps for Windows
sidebar_label: Windows
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

## Packaging

Parcel creates Windows installers (NSIS executable) and portable executables that can be distributed via setup files or ZIP archives. The tool handles executable configuration, registry entries, and can create Windows packages on all supported platforms.

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

When enabled, the application will be installed in a company-specific subdirectory:
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

**Include Uninstaller**:

When enabled, Parcel includes an uninstaller executable with the application and creates an entry in Windows Settings > Apps & Features (or Control Panel > Programs and Features on older Windows versions).

Default: true.

**License File**:

Optional license file to be displayed during installation. Supported formats:
- Plain text (.txt)
- Rich Text Format (.rtf)

The license is displayed on a dedicated page during installation, and users must accept it to proceed.

<!--- NOT YET AVAILABLE IN STABLE PARCEL

**File Type Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types and custom icons. This creates registry entries for proper Windows Explorer integration.

To handle these files in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

**URL Scheme Handlers**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). This creates registry entries that enable other applications and web browsers to launch your app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable Lifetime](https://docs.avaloniaui.net/docs/concepts/services/activatable-lifetime#handling-uri-activation) documentation.

--->

## Code Signing

Parcel signs Windows executables and installers using Authenticode certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

:::note
This document explains how to integrate various signing methods with Parcel. It does not include detailed setup steps for obtaining certificates or configuring cloud signing services. Please refer to the linked documentation for each method for complete setup instructions.
:::

### Prerequisites

Before signing Windows applications, ensure you have:

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

#### Microsoft Trusted Signing (Cross-Platform)

Cloud-based signing service that provides the highest trust level without managing local certificates. Provides immediate SmartScreen bypass and enhanced security through hardware security modules (HSMs).

**Required Configuration:**
- **Trusted Signing Endpoint**: Azure Trusted Signing service endpoint URL (format: `https://[region].codesigning.azure.net/`)
- **Certificate Profile Name**: Name of the certificate profile in Azure Trusted Signing
- **Code Signing Account Name**: Azure Trusted Signing account name

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
Microsoft Trusted Signing is the recommended solution for enterprises requiring immediate trust without building reputation over time.
:::

**Documentation:**
- [Microsoft Trusted Signing Documentation](https://learn.microsoft.com/en-us/azure/trusted-signing/)
- [Trusted Signing Quickstart](https://learn.microsoft.com/en-us/azure/trusted-signing/quickstart)

#### Azure Key Vault

Store certificates and private keys securely in Azure Key Vault for centralized certificate management and access control.

**Required Configuration:**
- **Azure Key Vault Name**: Name of the Azure Key Vault instance
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
- **Google Signing Keyring**: Full path to the keyring in format: `projects/[PROJECT]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]`
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
