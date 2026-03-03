---
id: ios
title: iOS
---

Publishing an Avalonia app for iOS generates an `.ipa` file — an iOS app archive ready for distribution. Distributing an iOS app requires that it is signed using a provisioning profile, which contains code signing information and the intended distribution mechanism.

## Prerequisites

- A Mac with Xcode installed (iOS apps must be built on macOS)
- An [Apple Developer Program](https://developer.apple.com/programs/) membership (required for distribution)
- A provisioning profile and signing certificate configured in Xcode

:::tip
If you're new to iOS provisioning, see the [iOS platform setup guide](/docs/platform-specific-guides/ios) for steps on creating signing certificates and provisioning profiles.
:::

## Distribution options

Apple provides several approaches for distributing iOS apps:

- **App Store** — Submit through [App Store Connect](https://appstoreconnect.apple.com). Apps require Apple's approval. This is the most common approach for reaching end users.
- **Ad-hoc** — Distribute to up to 100 registered devices for testing. Available to Apple Developer Program members.
- **In-house (Enterprise)** — Distribute internally within an organization. Requires membership in the [Apple Developer Enterprise Program](https://developer.apple.com/programs/enterprise/).

All approaches require that apps are signed using an appropriate provisioning profile.

## Build and sign your app

### Publishing from macOS

Navigate to your iOS project folder and run `dotnet publish`:

```bash
dotnet publish -f net9.0-ios -c Release \
  -p:ArchiveOnBuild=true \
  -p:RuntimeIdentifier=ios-arm64 \
  -p:CodesignKey="Apple Distribution: John Smith (AY2GDE9QM7)" \
  -p:CodesignProvision="MyAvaloniaApp"
```

This builds, signs, and produces an `.ipa` in `bin/Release/net9.0-ios/ios-arm64/publish/`.

The distribution channel is determined by the distribution certificate in your provisioning profile (App Store, Ad Hoc, or Enterprise).

### Publishing from Windows

Building iOS apps on Windows requires a network-accessible Mac build host. Provide the connection details as additional parameters:

```bash
dotnet publish -f net9.0-ios -c Release \
  -p:ArchiveOnBuild=true \
  -p:RuntimeIdentifier=ios-arm64 \
  -p:CodesignKey="Apple Distribution: John Smith (AY2GDE9QM7)" \
  -p:CodesignProvision="MyAvaloniaApp" \
  -p:ServerAddress=192.168.1.100 \
  -p:ServerUser=macuser \
  -p:ServerPassword=mypassword \
  -p:TcpPort=58181 \
  -p:_DotNetRootRemoteDirectory=/Users/macuser/Library/Caches/Xamarin/XMA/SDKs/dotnet/
```

## Build properties reference

The following properties can be passed on the command line with `-p:` or set in a `<PropertyGroup>` in your project file:

| Property | Description |
|---|---|
| `ArchiveOnBuild` | Set to `true` to produce the `.ipa`. |
| `RuntimeIdentifier` | The target runtime. Use `ios-arm64`. |
| `CodesignKey` | The name of the code signing key (e.g., `Apple Distribution: Name (ID)`). |
| `CodesignProvision` | The provisioning profile name to use when signing. |
| `CodesignEntitlements` | Path to the entitlements file, if required. |
| `ApplicationTitle` | The user-visible name for the app. |
| `ApplicationId` | The unique identifier, such as `com.companyname.myapp`. |
| `ApplicationVersion` | The build version number. |
| `ApplicationDisplayVersion` | The display version string. |

### Define properties in your project file

Instead of passing all parameters on the command line, you can set them in your `.csproj`:

```xml
<PropertyGroup Condition="$(TargetFramework.Contains('-ios')) and '$(Configuration)' == 'Release'">
    <ArchiveOnBuild>true</ArchiveOnBuild>
    <CodesignKey>Apple Distribution: John Smith (AY2GDE9QM7)</CodesignKey>
    <CodesignProvision>MyAvaloniaApp</CodesignProvision>
</PropertyGroup>
```

Then publish with just:
```bash
dotnet publish -f net9.0-ios -c Release
```

## Distribute the app

- **App Store** — Upload the `.ipa` using [Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) or Xcode. You must first create an app record in [App Store Connect](https://appstoreconnect.apple.com) and generate an [app-specific password](https://support.apple.com/HT204397).
- **Ad-hoc** — Distribute using [Apple Configurator](https://apps.apple.com/app/id1037126344).
- **In-house** — Distribute via a secure website or Mobile Device Management (MDM). See [Distribute proprietary in-house apps](https://support.apple.com/guide/deployment/depce7cefc4d/web) for details.

## See also

- [iOS platform setup](/docs/platform-specific-guides/ios)
