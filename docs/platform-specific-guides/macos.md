---
id: macos
title: macOS
---

## How Avalonia runs on macOS

Avalonia does not use the standard .NET macOS workload (`net10.0-macos`). Instead, it ships its own native platform backend that interfaces with macOS APIs through a compiled dynamic library (`libAvaloniaNative.dylib`), bypassing Microsoft's managed macOS bindings entirely.

This native backend is written in Objective-C++ (`.mm` files) and lives in the Avalonia repository at [`native/Avalonia.Native/src/OSX`](https://github.com/AvaloniaUI/Avalonia/tree/master/native/Avalonia.Native/src/OSX). It provides the platform essentials: windowing, input handling, Metal and OpenGL rendering, clipboard, menus, drag-and-drop, system tray, file dialogs, and accessibility. The .NET side communicates with this native code through MicroCom, a lightweight COM-style interop layer. Interfaces between the two sides are defined in an [IDL file](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Native/avn.idl), and MicroCom generates the managed wrappers that marshal calls across the boundary.

This has an important practical benefit: you can build and compile Avalonia desktop apps for macOS from Windows or Linux without installing the macOS workload or having access to a Mac. The default target framework is simply `net9.0` (or `net10.0`), not a platform-specific one.

The trade-off is that Avalonia's native bindings are minimal. They cover what the framework needs for UI, but they don't expose the full breadth of macOS platform APIs (such as MapKit, HealthKit, StoreKit, etc.).

### Accessing the full macOS API surface

If your app needs macOS APIs beyond what Avalonia exposes, change your target framework to a macOS-specific one:

```xml
<TargetFramework>net10.0-macos</TargetFramework>
```

This gives you access to the complete set of APIs provided by the .NET macOS workload, but it comes with a constraint: **builds targeting a macOS TFM must be performed on macOS**. You lose the ability to cross-compile from Windows or Linux.

## URL protocol handlers

You can register your app to handle custom URL schemes (e.g., `myapp://open`) so that clicking a link in a browser or another app launches yours. Add a `CFBundleURLTypes` entry to your `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>MyApp</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
    </dict>
</array>
```

With this in place, URLs like `myapp://some-action` will open your application. You can inspect the `Info.plist` files of other apps in `/Applications` to see how they configure their URL schemes.

## File type associations

You can register your app as the handler for specific file types so that double-clicking a file in Finder opens it in your app. Add a `CFBundleDocumentTypes` entry to your `Info.plist`:

```xml
<key>CFBundleDocumentTypes</key>
<array>
    <dict>
        <key>CFBundleTypeName</key>
        <string>Sketch</string>
        <key>CFBundleTypeExtensions</key>
        <array>
            <string>sketch</string>
        </array>
        <key>CFBundleTypeIconFile</key>
        <string>icon.icns</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>LSHandlerRank</key>
        <string>Default</string>
    </dict>
</array>
```

| Key | Description |
|---|---|
| `CFBundleTypeName` | A human-readable name for the file type. |
| `CFBundleTypeExtensions` | Array of file extensions to associate (without the leading dot). |
| `CFBundleTypeIconFile` | Icon to display for files of this type. |
| `CFBundleTypeRole` | Your app's role: `Editor` (can read and write), `Viewer` (read-only), or `None`. |
| `LSHandlerRank` | Priority: `Owner` (your app created this type), `Default`, `Alternate`, or `None`. |

## Native code

The Avalonia native macOS code is located at `native/Avalonia.Native/src/OSX`. If you need to modify or debug the native layer, open the `Avalonia.Native.OSX.xcodeproj` project in Xcode.

You can compile changes in Xcode using Cmd+B, then point your Avalonia application to the modified dylib. Find the output path by clicking on the dylib under Products in Xcode's project navigator, then specify it in your `AppBuilder`:

```csharp
.With(new AvaloniaNativePlatformOptions
{
    AvaloniaNativeLibraryPath = "[Path to your dylib]",
})
```

### Running as an app bundle during development

Some macOS features require your app to run as a proper `.app` bundle. For example, the Xcode Accessibility Inspector will not recognise your application otherwise.

To achieve this without a full packaging step, modify the output path in your `.csproj` to resemble a bundle structure:

```xml
<OutputPath>bin\$(Configuration)\$(Platform)\MyApp.app/Contents/MacOS</OutputPath>
<AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
<UseAppHost>true</UseAppHost>
```

Then place a valid `Info.plist` in the `Contents` directory. See the [macOS deployment guide](/docs/deployment/macos) for `Info.plist` details.

## See also

- [Deploying on macOS](/docs/deployment/macos)
