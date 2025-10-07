# macOS Code Signing

Parcel signs macOS bundles using Apple Developer certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

## Prerequisites

Before signing macOS applications, ensure you have:

- **Apple Developer Account**: Active [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year)
- **Xcode Command Line Tools** (macOS only): Available on [Apple Developer Resources](https://developer.apple.com/xcode/resources/)

## Signing Methods

Parcel supports multiple certificate formats depending on development environment and workflow.

### KeyChain Identity (macOS Only)

Uses certificates from the macOS Keychain that are installed via a certificate request.

Requires a "Developer ID Application" certificate linked to your team ID for distribution outside the Mac App Store.

### P12 Certificate (Cross-Platform)

Portable certificate format containing both the certificate and private key.
Apple doesn't provide P12 certificates directly, but they can be exported from the Keychain or generated with OpenSSL.

Parcel uses [rcodesign](https://github.com/indygreg/apple-platform-rs/tree/main/apple-codesign) to sign binaries and bundles on Windows and Linux machines.

## Create Developer Certificate

### Method 1: Keychain (macOS Only)

Requires a macOS machine for initial setup.

**To create a certificate with Keychain:**

1. Open **Keychain Access** on macOS
2. **Keychain Access** > **Certificate Assistant** > **Request a Certificate From a Certificate Authority**
3. Enter a name in the Common Name field, leave CA Email Address empty
4. Choose **Saved to disk**, then click **Continue** to generate `certificate.csr`
5. Go to [Apple Developer Account](https://developer.apple.com/account/) > **Certificates, Identifiers & Profiles**
6. Navigate to **Certificates** > **All Certificates**
7. Click ➕ to create a new certificate
8. Choose **Developer ID Application** for apps distributed outside the App Store
9. Upload `certificate.csr` when prompted
10. Download the resulting `.cer` file
11. Import the certificate into Keychain

:::tip
Export the certificate as P12 to enable cross-platform signing without requiring macOS.
:::

### Method 2: OpenSSL (Cross-Platform)

Generate certificates on any platform using OpenSSL.

**Prerequisites:**

- OpenSSL installed (WSL2 recommended for Windows)

**To create a certificate with OpenSSL:**

1. Create a private key:

    ```bash
    openssl genrsa -out private.key 2048
    ```

2. Generate Certificate Signing Request:

    ```bash
    openssl req -new -key private.key -out certificate.csr
    ```

3. Upload the CSR to [Apple Developer Portal](https://developer.apple.com/account/)
    - Go to **Certificates, Identifiers & Profiles** > **Certificates**
    - Click ➕, choose **Developer ID Application**
    - Upload `certificate.csr`, then download the `.cer` file

4. Convert the certificate to PEM format:

    ```bash
    openssl x509 -in development.cer -inform DER -out certificate.pem -outform PEM
    ```

5. Create a P12 file (you will need the previously created `private.key` file):

    ```bash
    openssl pkcs12 -export -out certificate.p12 -inkey private.key -in certificate.pem
    ```

    Set a secure password when prompted.

:::note
The resulting `certificate.p12` and password can be used with Parcel on any platform.
:::

## Troubleshooting

### Common Issues

**"Developer ID Application" not available when creating a certificate**:

This option requires Apple Developer Account team membership. Contact your team's account holder for access.

**App signs successfully but cannot execute on other machines**:

Verify that you used a "Developer ID Application" certificate. "Apple Development" certificates only work for development builds.

### Getting Help

For issues not covered here:

1. Review Parcel's signing logs for error information
2. Verify certificate status in Apple Developer portal
