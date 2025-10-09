# macOS Notarization

Apple notarization verifies that applications have been checked by Apple for malicious software. Notarization is required for macOS 10.15 (Catalina) and later when distributing applications outside the Mac App Store.

The process uploads an application to Apple's servers for scanning and associates the bundle hash with the developer account.

## Prerequisites

Before notarizing applications, ensure you have:

- **Apple Developer Account**: Paid Apple Developer Program membership ($99/year)
- **Valid Developer ID Certificate**: For code signing applications distributed outside the Mac App Store
- (macOS only) **Xcode Command Line Tools**: Available on [Apple Developer Resources](https://developer.apple.com/xcode/resources/)

## Apple Account Authentication

Parcel requires authentication with Apple's notary service. Two methods are available for providing credentials.

### App-Specific Password (Recommended)

Apple requires app-specific passwords instead of user passwords for the Notary API. Follow Apple's guide: [How to generate an app-specific password](https://support.apple.com/en-us/102654).

**To configure credentials in Parcel:**

1. Select "Apple Account" as the notary credentials option
2. Enter your Apple ID (email address)
3. Enter your app-specific password
4. Enter your Team ID (from the [Apple Developer Membership](https://developer.apple.com/account/#/membership) page)

:::tip
Use environment variables to store credentials instead of hardcoding them in configuration files.
:::

### Keychain Profile (macOS Only)

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

:::warning
Apple Keychain is only available on macOS. Use the App-Specific Password method on Windows or Linux.
:::

## Running Non-Notarized Apps (Testing & Personal Use)

For testing, development, or personal use without an Apple Developer Account, non-notarized apps can run with user intervention.

When macOS blocks a non-notarized app, users can bypass the warning:

1. Go to **System Preferences** → **Security & Privacy** → **General** tab
2. Try to run the app - it will be blocked
3. Within a few minutes, a message appears in Security & Privacy about the blocked app
4. Click **"Open Anyway"** next to the blocked app message
5. Confirm by clicking **"Open"** in the dialog

:::note
Code-sign applications with a Developer ID certificate when available, even without notarization.
:::

## Troubleshooting

### Common Issues

**Notarization takes too long**:

Notarization typically takes a few minutes but can take up to an hour during peak times. In worst cases, it can take several hours depending on application size.

**"Invalid credentials" error:**

- Verify that your Apple ID and app-specific password are correct
- Ensure your Team ID is accurate
- Check your Apple Developer account status

**"License agreement must be accepted" error:**

- Log in to [Apple Developer Account](https://developer.apple.com/account/) in a web browser
- Check for pending agreements or notifications
- Accept any new license agreements or terms of service
- Wait a few minutes after accepting before retrying
- Common after Apple developer program updates or policy changes

**Notarization fails during upload:**

- Check your internet connection

### Getting Help

For issues not covered here:

1. Check Apple's [Notarizing macOS Software Before Distribution](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution) guide
2. Review notarization logs in Parcel's output