---
id: macos
title: macOS Deployment
description: How to publish and deploy XPF applications on macOS, including app bundle structure and code signing.
---

## Publishing

Publish your XPF application for macOS from the command line:

```bash
dotnet publish -r osx-arm64 -c Release --self-contained
```

For Intel Macs:

```bash
dotnet publish -r osx-x64 -c Release --self-contained
```

:::caution
Always publish from the command line. Visual Studio publishing can produce incomplete output that is missing native libraries.
:::

## App bundle structure

macOS applications must be packaged as `.app` bundles for distribution. An `.app` bundle is a directory with the following structure:

```text
MyApp.app/
  Contents/
    Info.plist
    MacOS/
      MyApp          (executable or launch script)
    Resources/
      MyApp.icns     (application icon)
```

### Info.plist

Create an `Info.plist` with your application metadata:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>MyApp</string>
    <key>CFBundleDisplayName</key>
    <string>My Application</string>
    <key>CFBundleIdentifier</key>
    <string>com.yourcompany.myapp</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleExecutable</key>
    <string>MyApp</string>
    <key>CFBundleIconFile</key>
    <string>MyApp.icns</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
```

## Project settings

The following `.csproj` settings are important for macOS deployment:

```xml
<PropertyGroup>
    <SelfContained>true</SelfContained>
    <RuntimeIdentifier>osx-arm64</RuntimeIdentifier>
</PropertyGroup>
```

:::danger
Do **not** set `IncludeNativeLibrariesForSelfExtract` to `true`. This is incompatible with macOS and will cause your application to fail at runtime with "Failed to create CoreCLR".
:::

## Code signing

All macOS applications must be code signed for distribution. When signing XPF applications:

- **Sign individual files**, not the bundle as a whole. Do not use the `--deep` flag with `codesign`, as it may miss files or apply incorrect entitlements.
- Sign all `.dylib` files and the main executable before signing the `.app` bundle.

```bash
# Sign individual binaries first
find MyApp.app -name "*.dylib" -exec codesign --force --sign "Developer ID Application: Your Name" {} \;
codesign --force --sign "Developer ID Application: Your Name" MyApp.app/Contents/MacOS/MyApp

# Then sign the bundle
codesign --force --sign "Developer ID Application: Your Name" MyApp.app
```

## Notarization

For distribution outside the Mac App Store, Apple requires applications to be notarized. Use `notarytool`:

```bash
# Create a ZIP for notarization
ditto -c -k --keepParent MyApp.app MyApp.zip

# Submit for notarization
xcrun notarytool submit MyApp.zip --apple-id "you@example.com" \
    --team-id "YOUR_TEAM_ID" --password "app-specific-password" --wait

# Staple the notarization ticket
xcrun stapler staple MyApp.app
```

## DMG creation

To distribute as a `.dmg` disk image:

```bash
hdiutil create -volname "MyApp" -srcfolder MyApp.app -ov MyApp.dmg
```

## Parcel (Preview)

The Avalonia **Parcel** tool can automate the entire macOS packaging workflow, including `.app` bundle creation, code signing, notarization, and `.dmg` generation for XPF applications. Contact the Avalonia team for access to the preview.

## Dock visibility

To control whether your application appears in the macOS Dock, see [macOS: Dock Visibility](/xpf/platforms/macos#dock-visibility).

## Application name

To set the name shown in the macOS menu bar (instead of "Avalonia Application"), see [macOS: Application Name](/xpf/platforms/macos#application-name).

## ReadyToRun

Enable ReadyToRun for faster startup:

```xml
<PropertyGroup>
    <PublishReadyToRun>true</PublishReadyToRun>
</PropertyGroup>
```

See [Performance Optimization](/xpf/configuration/performance#reducing-startup-time-with-readytorun) for details.
