# Windows Code Signing

Parcel signs Windows executables and MSI installers using Authenticode certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

## Prerequisites

Before signing Windows applications, ensure you have:

- **Code Signing Certificate**: Valid Authenticode certificate from a trusted Certificate Authority
- **Windows SDK** (Windows only): Can be installed with Visual Studio Build Tools (on CI) or standard Visual Studio (on Desktop) from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)
- **Java Runtime** (Linux and macOS only): Required for cross-platform signing operations. Parcel expects JAVA_HOME to be set.

Linux and macOS support is powered by [JSign](https://github.com/ebourg/jsign).

## Signing Methods

Parcel supports multiple certificate formats depending on development environment and workflow.

### Microsoft Trusted Signing (Cross-Platform)

Cloud-based signing service that provides the highest trust level without managing local certificates.

Requires Microsoft Trusted Signing account and Azure authentication. Provides immediate SmartScreen bypass and enhanced security through hardware security modules (HSMs).

The certificates issued by Azure Trusted Signing have a lifetime of 3 days only, and timestamping is automatically enabled to ensure long term validity of the signature.

**Required Configuration:**
- **Trusted Signing Endpoint**: Azure Trusted Signing service endpoint URL (format: `https://[region].codesigning.azure.net/`)
- **Certificate Profile Name**: Name of the certificate profile in Azure Trusted Signing
- **Code Signing Account Name**: Azure Trusted Signing account name
- **Azure Authentication**: Valid Azure access token with "Code Signing Certificate Profile Signer" role

Please refer to [Microsoft Trusted Signing](https://learn.microsoft.com/en-us/azure/trusted-signing/) for detailed documentation.

### Azure Key Vault

Store certificates and keys in Azure Key Vault key management system for centralized certificate management.

**Required Configuration:**
- **Azure Key Vault Name**: Name of the Azure Key Vault instance
- **Azure Key Vault Certificate Name**: Name of the certificate stored in the vault
- **Azure Authentication**: Account with "Key Vault Crypto User" and "Key Vault Certificate User" roles

### DigiCert ONE / DigiCert KeyLocker

Use certificates and keys stored in DigiCert ONE Secure Software Manager directly without installing DigiCert client tools.

**Required Configuration:**
- **DigiCert API Key**: API key for DigiCert ONE authentication
- **DigiCert Keystore**: PKCS#12 keystore file containing client certificate for authentication
- **DigiCert Storepass**: Password for the keystore
- **DigiCert Certificate Name or ID**: Identifier for the certificate in DigiCert ONE
- **DigiCert Host** (optional): Custom host URL (defaults to `https://clientauth.one.digicert.com`)

### SSL.com eSigner

Cloud-based signing service from SSL.com with optional sandbox environment for testing.

**Required Configuration:**
- **eSigner Username**: SSL.com account username
- **eSigner Password**: SSL.com account password
- **eSigner Key Password**: Base64 encoded TOTP secret for authentication
- **eSigner Credential ID**: Credential identifier for the certificate
- **eSigner Sandbox** (optional): Enable sandbox environment for testing

### Google Cloud KMS

Use Google Cloud Key Management Service for private key storage. The certificate must be provided separately as Google Cloud KMS stores only the private key.

**Required Configuration:**
- **Google Signing Keyring**: Path to the keyring in format `projects/[PROJECT]/locations/[LOCATION]/keyRings/[KEYRING]`
- **Google Signing Certificate File**: Path to the certificate file
- **Google Signing Certificate Version** (optional): Specific version of the key (uses most recent if omitted)

**Required Permissions:**
- `cloudkms.cryptoKeyVersions.useToSign`
- `cloudkms.cryptoKeyVersions.list` (if version not specified)
- `cloudkms.cryptoKeys.list` (for key discovery)

### AWS Key Management Service

Use AWS KMS for private key storage. The certificate must be provided separately as AWS KMS stores only the private key.

**Required Configuration:**
- **AWS Signing Region Code**: AWS region where the key is stored
- **AWS Signing Certificate File**: Path to the certificate file
- **AWS Signing Key ID or Alias**: AWS KMS key identifier or alias

**Authentication**: Uses AWS credentials from environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`), ECS container credentials, or EC2 IMDSv2 service.

**Required Permissions:**
- `kms:ListKeys`
- `kms:DescribeKey`
- `kms:Sign`

**FIPS Compliance**: Set `AWS_USE_FIPS_ENDPOINT=true` environment variable to use FIPS endpoints.

## Troubleshooting

### Common Issues

**Signed executable still triggers SmartScreen warnings**:

This is normal for new certificates and applications. EV certificates and Trusted Signing bypass warnings immediately, while OV certificates require reputation building over time.

### Getting Help

For issues not covered here:

1. Review Parcel's signing logs for error information
2. Verify certificate properties in Windows Certificate Manager
3. Check Certificate Authority documentation for specific requirements
4. Select **Automatically select the certificate store**
5. Complete the Certificate Import Wizard
