---
id: macos-development
title: macOS Development
---

## How to build and run your AvaloniaUI app for macOS

It's actually really simple. If you're developing in Windows (which is easier for a Windows developer), once your AvaloniaUI application is looking about right and you're ready to try it on macOS, copy your entire project folder to your Mac (don't worry - all the files will be treated as basic flat files). If you have a github for it, commit it and then check it out on your dev Mac machine.

You'll need a development platform for macOS such as Visual Studio for macOS, JetBrains Rider or you can build from the command line if you have the dotnet SDK installed on you Mac.
See the Getting Started>>IDE Support for more details.

### Visual Studio for Mac or JetBrains Rider
Open your project's SLN file in your platform of choice

Then build or run.

### Command Line Build
Open Terminal and change directories (cd) to your project's folder (where the project's sln file is).

Type "dotnet build" to build your project.

If you have multiple SLNs in the same folder, you will have to specify which one to use by typing "dotnet build myproject.sln" where "myproject" is the name of your SLN.

To run either type "dotnet run --project pathToProject/myproject.csproj" where "pathToProject" is the path to where the csproj file you want to run is, or change directories (cd) to that location and type "dotnet run".

Your build platform will recompile the code and since it's target independent, it will build the native (ie: Mac) version and link all the Mac target DLLs for .Net Core 6.0 and AvaloniaUI.

The following instructions are for more advanced builds such as having a proper Mac app bundle or of you need better intergration with native macOS.

## Native code

The native macOS code is located at `native/Avalonia.Native/src/OSX`. Open the `Avalonia.Native.OSX.xcodeproj` project in Xcode.

You can make changes in Xcode and compile using Cmd+B. You will then need to point your Avalonia application to the modified dynlib. The path can be found by clicking on the dylib in Xcode’s project navigator under Products.

You then specify this path in your AppBuilder using:

```csharp
.With(new AvaloniaNativePlatformOptions
{ 
    AvaloniaNativeLibraryPath = “[Path to your dylib]”, 
})
```

If you're running on an Apple Silicon Mac and targeting .NET 5 and lower then you'll need to switch to rosetta by selecting "My Mac \(Rosetta\)" in the toolbar.

### Bundling Dev Code

In certain situations you need to run an Avalonia sample application as an app bundle. One of these situations is testing macOS Accessibility - Xcode's Accessibility Inspector fails to recognise the application otherwise.

A solution to this is to change the sample's output path to [resemble an app bundle](https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFBundles/BundleTypes/BundleTypes.html). You can do this by modifying the output path in the csproj, e.g.:

```xml
<OutputPath>bin\$(Configuration)\$(Platform)\ControlCatalog.NetCore.app/Contents/MacOS</OutputPath>
<AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
<UseAppHost>true</UseAppHost>
```

And in the `Contents` output directory place a valid `Info.plist` file. An example for ControlCatalog.NetCore is:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>CFBundleName</key>
    <string>ControlCatalog.NetCore</string>
    <key>CFBundleDisplayName</key>
    <string>ControlCatalog.NetCore</string>
    <key>CFBundleIdentifier</key>
    <string>ControlCatalog.NetCore</string>
    <key>CFBundleVersion</key>
    <string>0.10.999</string>
    <key>CFBundlePackageType</key>
    <string>AAPL</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>CFBundleExecutable</key>
    <string>ControlCatalog.NetCore</string>
    <key>CFBundleIconFile</key>
    <string>ControlCatalog.NetCore.icns</string>
    <key>CFBundleShortVersionString</key>
    <string>0.1</string>
    <key>NSPrincipalClass</key>
    <string>NSApplication</string>
    <key>NSHighResolutionCapable</key>
    <true />
  </dict>
</plist>
```

If you're using Rider &lt; 2021.1 then you'll need to run the application from the command line, not the IDE \(see [https://youtrack.jetbrains.com/issue/RIDER-53892](https://youtrack.jetbrains.com/issue/RIDER-53892)\).
