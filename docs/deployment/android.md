---
id: android
title: Android
description: Build, sign, and publish an Avalonia application as an APK or AAB for Android devices.
doc-type: how-to
---

Publishing an Avalonia app for Android generates an Android Package (APK) or Android App Bundle (AAB) file. The APK is used for installing your app directly to an Android device, and the AAB is used to publish your app to Google Play.

## Running on an emulator

From your Android project directory, build and run with:

```bash
dotnet build
dotnet run
```

This deploys the app to the default Android emulator. If no emulator is running, one will be started automatically using the first available AVD (Android Virtual Device) configured through the Android SDK.

## Running on a device

To deploy to a physical Android device:

1. Ensure the Android version on the device matches the supported or target version in `AndroidManifest.xml`.
2. Connect the device to your development machine via USB.
3. Enable **USB Debugging** in the device's developer settings.
4. If the default USB connection mode is "charging only", switch to MTP or another mode so ADB can detect the device.

Then run:

```bash
dotnet run
```

The app will be deployed and launched on the connected device.

## Publishing

### Create a keystore file

During development, .NET for Android uses a debug keystore to sign the app, which allows it to be deployed directly to an emulator or to devices configured to run debuggable apps. However, this keystore isn't valid for distributing apps. A private keystore must be created and used for signing release builds.

:::tip
This step only needs to be performed once. The same keystore will be used for publishing updates and can be used to sign other apps. Back up your keystore and password. If you lose them, you won't be able to sign your app with the same identity.
:::

Run `keytool` from the JDK with the following parameters:

```bash
keytool -genkeypair -v -keystore myapp.keystore -alias myapp -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted to provide and confirm a password, followed by your name and organization details. This information is included in your certificate but isn't displayed in your app.

### Build and sign your app

Navigate to your Android project folder and run `dotnet publish` with the signing parameters:

```bash
dotnet publish -f net9.0-android -c Release \
  -p:AndroidKeyStore=true \
  -p:AndroidSigningKeyStore=myapp.keystore \
  -p:AndroidSigningKeyAlias=myapp \
  -p:AndroidSigningKeyPass=mypassword \
  -p:AndroidSigningStorePass=mypassword
```

This builds and signs the app, producing both AAB and APK files in the `bin/Release/net9.0-android/publish` folder. The signed variant has **-signed** in the file name.

:::caution
Avoid passing passwords directly on the command line in shared environments. Use `env:` or `file:` prefixes instead (see below).
:::

#### Secure password handling

Both `AndroidSigningKeyPass` and `AndroidSigningStorePass` support `env:` and `file:` prefixes to avoid exposing passwords in build logs.

Using an environment variable:
```bash
dotnet publish -f net9.0-android -c Release \
  -p:AndroidKeyStore=true \
  -p:AndroidSigningKeyStore=myapp.keystore \
  -p:AndroidSigningKeyAlias=myapp \
  -p:AndroidSigningKeyPass=env:ANDROID_SIGNING_PASSWORD \
  -p:AndroidSigningStorePass=env:ANDROID_SIGNING_PASSWORD
```

Using a file:
```bash
dotnet publish -f net9.0-android -c Release \
  -p:AndroidKeyStore=true \
  -p:AndroidSigningKeyStore=myapp.keystore \
  -p:AndroidSigningKeyAlias=myapp \
  -p:AndroidSigningKeyPass=file:/path/to/password.txt \
  -p:AndroidSigningStorePass=file:/path/to/password.txt
```

:::note
The `env:` prefix isn't supported when `AndroidPackageFormat` is set to `aab`.
:::

### Build properties reference

The following properties can be passed on the command line with `-p:` or set in a `<PropertyGroup>` in your project file:

| Property | Description |
|---|---|
| `AndroidKeyStore` | Set to `true` to sign the app. Default: `false`. |
| `AndroidPackageFormats` | Semicolon-delimited. Set to `aab`, `apk`, or `aab;apk`. Default for release: `aab;apk`. |
| `AndroidSigningKeyAlias` | The alias for the key in the keystore. |
| `AndroidSigningKeyPass` | The key password. Supports `env:` and `file:` prefixes. |
| `AndroidSigningKeyStore` | The keystore filename. |
| `AndroidSigningStorePass` | The keystore password. Supports `env:` and `file:` prefixes. |
| `ApplicationTitle` | The user-visible name for the app. |
| `ApplicationId` | The unique identifier, such as `com.companyname.myapp`. |
| `ApplicationVersion` | The build version number. |
| `ApplicationDisplayVersion` | The display version string. |
| `PublishTrimmed` | Whether to trim unused code. Default: `true` for release builds. |

#### Define properties in your project file

Instead of passing all parameters on the command line, you can set them in your `.csproj`:

```xml
<PropertyGroup Condition="$(TargetFramework.Contains('-android')) and '$(Configuration)' == 'Release'">
    <AndroidKeyStore>true</AndroidKeyStore>
    <AndroidSigningKeyStore>myapp.keystore</AndroidSigningKeyStore>
    <AndroidSigningKeyAlias>myapp</AndroidSigningKeyAlias>
    <AndroidSigningKeyPass>env:ANDROID_SIGNING_PASSWORD</AndroidSigningKeyPass>
    <AndroidSigningStorePass>env:ANDROID_SIGNING_PASSWORD</AndroidSigningStorePass>
</PropertyGroup>
```

Then publish with just:
```bash
dotnet publish -f net9.0-android -c Release
```

### Distribute the app

- **Google Play**: Submit your AAB file via the [Google Play Console](https://play.google.com/console). See [Upload your app to the Play Console](https://developer.android.com/studio/publish/upload-bundle) for details.
- **Direct download**: Host the APK on a website or file share. Users must enable installation from unknown sources on their devices. See [User opt-in for unknown apps](https://developer.android.com/studio/publish#publishing-unknown) for details.

## See also

- [Android platform setup](/docs/platform-specific-guides/android)
