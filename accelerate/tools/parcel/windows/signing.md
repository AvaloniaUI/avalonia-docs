# Windows Code Signing

Parcel signs Windows executables and installers using Authenticode certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

:::note
This document explains how to integrate various signing methods with Parcel. It does not include detailed setup steps for obtaining certificates or configuring cloud signing services. Please refer to the linked documentation for each method for complete setup instructions.
:::

## Prerequisites

Before signing Windows applications, ensure you have:

- **Code Signing Certificate**: Valid Authenticode certificate from a trusted Certificate Authority
- **Windows SDK** (Windows only): Can be installed with Visual Studio Build Tools (on CI) or Visual Studio (on Desktop) from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)
- **Java Runtime**: Required for cross-platform signing operations.

## Signing Methods

Parcel supports multiple certificate formats depending on your development environment and workflow.

### Local Certificate

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

### Windows Certificate Store

Use certificates installed in the Windows Certificate Store, including hardware security modules (HSMs) and USB tokens.

**Required Configuration:**
- **Store Certificate Name**: Subject name or thumbprint of the certificate
- **Use Local Machine Certificate Store** (optional): Search in Local Machine store instead of Current User
- **Auto-Detect Matching Certificate** (optional): Automatically select the best matching certificate

**Platform Support:**
- **Windows only**: Requires Windows SDK (SignTool)

**Documentation:**
- [Windows Certificate Store Overview](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/certificate-stores)

### Microsoft Trusted Signing (Cross-Platform)

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

### Azure Key Vault

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

### AWS KMS

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

### DigiCert

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

### Google Cloud KMS

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

### SSL.com eSigner

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

## Troubleshooting

### Common Issues

**Signed executable still triggers SmartScreen warnings**:

This is normal for new certificates and applications. Different certificate types have different trust timelines:
- **EV Certificates & Microsoft Trusted Signing**: Immediate SmartScreen bypass
- **OV Certificates**: Require reputation building (typically 3-6 months of consistent distribution)

**Azure authentication failures**:

1. Verify environment variables are set correctly: `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`
2. Consider installing [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) and folowing [az login](https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az-login) flow.
