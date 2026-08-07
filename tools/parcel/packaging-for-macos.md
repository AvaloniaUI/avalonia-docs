---
id: packaging-for-macos
title: Packaging apps for macOS
sidebar_label: macOS
doc-type: reference
tags:
  - avalonia plus
  - avalonia pro
  - avalonia enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Packaging

Parcel creates macOS application bundles (`.app`) and packages. You can run Parcel on Windows, macOS, or Linux.

| Format | CLI code | Best suited for |
|---|---|---|
| DMG image (`.dmg`) | `dmg` | Direct distribution with a branded drag-and-drop experience |
| PKG installer (`.pkg`) | `pkg` | Managed installation, direct distribution, and Mac App Store submission |
| ZIP archive (`.zip`) | `zip` | Direct distribution of an app bundle without an installer |

For the complete setting names, types, defaults, and environment variables, see the [Parcel configuration reference](/tools/parcel/configuration-reference#macos-settings).

### Bundle Configuration

#### Common Properties

**Application Name**:

Display name used for the app display name, as `CFBundleDisplayName`.

:::note
Currently cannot be localized.
:::

**Package Name**:

Package name used as a bundle and output dmg file names.

### Bundle Properties

Essential bundle metadata that defines how an application appears and behaves on macOS.

**Bundle Identifier**:

A unique reverse-DNS identifier for the application (e.g., `com.Company.AppName`). This must follow Apple's reverse DNS notation guidelines. Avoid special characters except dots and hyphens, and ensure the identifier starts with a letter.

**Team ID**:

A unique identifier for your Apple Developer account. Using during signing and notarization process, optional otherwise.

**App Category**:

The application category for macOS and App Store classification. This maps to Apple's `public.app-category.*` identifiers.

**Application Icon**:

An optional macOS icon in **ICNS** or **SVG** format. This icon overrides **Application Icon**. An ICNS file should contain resolutions from 16 x 16 through 1024 x 1024 pixels. Parcel creates the bundle icon structure from the source file.

**Permissions**:

System permissions with custom usage descriptions. Each permission requires a usage description that appears in macOS permission dialogs.

:::note
Usage descriptions are mandatory; otherwise, the OS may deny access to system resources.
:::

**File Associations**:

Associate the application with specific file types by specifying file extensions (e.g., `.myfile`) and optionally adding MIME types.

To handle these files in Avalonia applications, see [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation).

**URL Schemes**:

Register custom URL schemes for deep linking by defining custom schemes (e.g., `myapp://`, `myprotocol://`). This enables other applications to launch the app with specific parameters.

To handle URL schemes in Avalonia applications, see [Activatable lifetime](/docs/services/activatable-lifetime#handling-uri-activation).

Configure associations under **Basics**. Parcel writes them to the application bundle's `Info.plist` file. Parcel ignores associations when **Create Bundle** is disabled. See [File associations and URL schemes](/tools/parcel/configuration-reference#file-associations).

#### Custom Info.plist Configuration

Parcel supports custom Info.plist files for advanced bundle configuration.

1. Create an `Info.plist` file in the project's root directory
2. Add custom keys and values following Apple's documentation
3. Parcel merges custom properties with generated ones
4. Existing properties in the custom file take precedence
5. Missing properties are automatically added based on project configuration

### DMG Creation

Parcel creates DMG installers with a drag-and-drop interface, custom backgrounds, and symbolic links.

:::caution
[WSL2](https://learn.microsoft.com/en-us/windows/wsl/) is required for DMG creation on Windows. ZIP packages can be created without WSL2.
:::

**DMG Background Image**:

The background image for the DMG installer in TIFF format.

Parcel includes a visual DMG layout editor. The default layout uses a **660 x 422** pixel window with these values:

- **App Bundle icon**: positioned at coordinates (173, 231)
- **Applications folder**: positioned at coordinates (485, 231)
- **Icon size**: 128px
- **Text size**: 12px

Icons are positioned from the top left corner to the icon center.

Use the editor to change the window position, window size, icon size, label size, grid, and background color. You can also change the positions of the application bundle and Applications folder. Design the background image for the selected layout.

:::note
Parcel puts the optional **DMG License File** at the root of the image. Enable **Sign DMG** to sign the completed image with the application-signing credentials.
:::

### ZIP Creation

Parcel maintains executable permissions during ZIP creation. The bundle structure remains intact when extracted on macOS, and applications remain executable without additional steps.

### PKG installers <MinVersion version="1.1" isNewVersion="true" />

PKG packages use the native macOS Installer. You can create them on every host that Parcel supports. PKG packages require **Create Bundle** and install the application in `/Applications` by default.

Use different certificates for the application and its installer package. For direct distribution, sign the application with a **Developer ID Application** certificate. Sign the PKG with a **Developer ID Installer** certificate. Then notarize the package. For Mac App Store distribution, see [App Store Connect](#app-store-connect). See also Apple's [Mac software packaging guidance](https://developer.apple.com/documentation/xcode/packaging-mac-software-for-distribution) and [Developer ID overview](https://developer.apple.com/support/developer-id/).

### Troubleshooting

See the [macOS troubleshooting page](/troubleshooting/platform-specific-issues/macos#packaging).

## Code Signing

Parcel signs macOS bundles using Apple Developer certificates. Cross-platform signing is supported on Windows, Linux, and macOS platforms.

### Prerequisites

Before you sign a macOS application, make sure that you have these items:

- **Apple Developer Account**: Active [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year)
- **Xcode Command Line Tools** (macOS only): Available on [Apple Developer Resources](https://developer.apple.com/xcode/resources/)

### Signing Methods

Parcel supports multiple certificate formats depending on development environment and workflow.

#### KeyChain Identity (macOS Only)

Uses certificates from the macOS Keychain that are installed via a certificate request.

Requires a "Developer ID Application" certificate linked to your team ID for distribution outside the Mac App Store.

#### P12 Certificate (Cross-Platform)

Portable certificate format containing both the certificate and private key.
Apple doesn't provide P12 certificates directly, but they can be exported from the Keychain or generated with OpenSSL.

Parcel uses [rcodesign](https://github.com/indygreg/apple-platform-rs/tree/main/apple-codesign) to sign binaries and bundles on Windows and Linux machines.

#### PEM Certificate (Cross-Platform)

Uses a PEM certificate for cross-platform signing. For a PKG package, configure separate PEM certificate fields for the application and installer.

### Installer certificates for PKG

Configure PKG signing in the **Installer Signing** group. Select a Keychain identity, P12 certificate, or PEM certificate that can sign installer packages. An application certificate cannot sign a PKG installer. An installer certificate cannot sign the application bundle.

### Create Developer Certificate

<Tabs>
<TabItem value="keychain" label="Keychain (macOS Only)" default>

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
Export the certificate as P12 to enable cross-platform signing without requiring macOS after this step.
:::

</TabItem>

<TabItem value="openssl" label="OpenSSL (Cross-Platform)">

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

:::tip
The resulting `certificate.p12` and password can be used with Parcel on any platform.
:::

</TabItem>

</Tabs>

## App Store Connect

Submit a signed PKG to distribute an application through the Mac App Store. Do not submit a DMG or ZIP file. These formats are for direct distribution.

### Recommended configuration

1. Create the macOS application record in App Store Connect. Register an explicit App ID. Its bundle ID must exactly match **Bundle Identifier** in Parcel. App Store Connect uses the bundle ID and version to associate an upload with the application record.
2. Configure signing with an **Apple Distribution** certificate. And configure PKG signing separately with a **Mac Installer Distribution** certificate. Do not use Developer ID certificates for an App Store submission, it will be rejected by Apple.
3. Create and download a **Mac App Store Connect** provisioning profile for the same explicit App ID and application-signing certificate.
4. Copy the provisioning profile to the directory that contains the Parcel project file. Rename the profile to match the configured .NET project. For example, use `MyApp.provisionprofile` when **.NET Project Path** points to `MyApp.csproj`. Parcel requires this exact file name.
5. Make sure that **Create Bundle** and **Enable Sandbox** are enabled in MacOS settings. Notarization must be disabled for App Store Connect - it's only useful for sideloading.
6. Optinally, configure custom `Entitlements.plist` file in the project directory, if the app requires custom permissions. Before submission, test file access, network access, child processes, and bundled helper tools in the sandbox.
7. Upload the PKG with Apple's Transporter application, Xcode tools, or another method that App Store Connect supports. Wait for processing to finish. Resolve all delivery warnings. Select the processed build for the macOS version, and submit it for review.

See Apple's documentation for [creating a Mac App Store Connect provisioning profile](https://developer.apple.com/help/account/provisioning-profiles/create-an-app-store-provisioning-profile), [certificate purposes](https://developer.apple.com/help/account/certificates/certificates-overview), and [uploading builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/).

:::note[Do not notarize App Store builds with Parcel]
Parcel notarizes software that uses a Developer ID identity for distribution outside the Mac App Store. Apple validates App Store packages during upload and submission. Disable Parcel notarization for an App Store build.
:::

## Notarization

Apple notarization verifies that applications have been checked by Apple for malicious software. Notarization is required for macOS 10.15 (Catalina) and later when distributing applications outside the Mac App Store.

The process uploads an application to Apple's servers for scanning and associates the bundle hash with the developer account.

Apple validates Mac App Store packages during submission. Do not notarize them separately. For direct distribution, Parcel can submit and staple DMG and PKG files that use Developer ID certificates. See Apple's [notarization documentation](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution).

### Prerequisites

Before you notarize an application, make sure that you have these items:

- **Apple Developer Account**: Paid Apple Developer Program membership ($99/year)
- **Valid Developer ID Certificate**: For code signing applications distributed outside the Mac App Store
- (macOS only) **Xcode Command Line Tools**: Available on [Apple Developer Resources](https://developer.apple.com/xcode/resources/)

### Apple Account Authentication

Parcel requires authentication with Apple's notary service. Two methods are available for providing credentials.

#### App-Specific Password (Recommended)

Apple requires app-specific passwords instead of user passwords for the Notary API. Follow Apple's guide: [How to generate an app-specific password](https://support.apple.com/en-us/102654).

**To configure credentials in Parcel:**

1. Select "Apple Account" as the notary credentials option
2. Enter your Apple ID (email address)
3. Enter your app-specific password
4. Enter your Team ID (from the [Apple Developer Membership](https://developer.apple.com/account/#/membership) page)

:::tip
Use environment variables to store credentials instead of hardcoding them in configuration files.
:::

#### Keychain Profile (macOS Only)

Store Apple Account credentials in macOS Keychain and reference them by profile name. Credentials are encrypted and stored locally.

**Setting up a keychain profile:**

1. Open Terminal
2. Run the following command:

    ```bash
    xcrun notarytool store-credentials "MyParcelProfile" --apple-id "your-email@example.com" --team-id "YOUR_TEAM_ID"
    ```

3. Enter app-specific password when prompted:

    ```text
    App-specific password for your-email@example.com: [enter your app-specific password]
    Credentials saved to Keychain.
    To use them, specify `--keychain-profile "MyParcelProfile"`
    ```

**To configure the keychain profile in Parcel:**

1. Select "Keychain Profile" as the notary credentials option
2. Enter the profile name (e.g., "MyParcelProfile")

:::caution
Apple Keychain is only available on macOS. Use the App-Specific Password method on Windows or Linux.
:::

### Running Non-Notarized Apps (Testing & Personal Use)

For testing, development, or personal use without an Apple Developer Account, non-notarized apps can run with user intervention.

When macOS blocks a non-notarized app, users can bypass the warning:

1. Go to **System Preferences** → **Security & Privacy** → **General** tab
2. Try to run the application. macOS blocks it.
3. Within a few minutes, a message appears in Security & Privacy about the blocked app
4. Click **"Open Anyway"** next to the blocked app message
5. Confirm by clicking **"Open"** in the dialog

:::note
Code-sign applications with a Developer ID certificate when available, even without notarization.
:::

### Troubleshooting notarization issues

See the [macOS troubleshooting page](/troubleshooting/platform-specific-issues/macos#notarization).

## Troubleshooting

See the [macOS troubleshooting page](/troubleshooting/platform-specific-issues/macos#code-signing).

## See also

- [Parcel setup](/tools/parcel/setup)
- [Parcel configuration reference](/tools/parcel/configuration-reference)
- [Parcel command line reference](/tools/parcel/command-line-reference)
