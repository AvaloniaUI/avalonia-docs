---
id: macos-development
title: macOS 开发
---


# macOS 开发

开始进行macOS开发

## 本地代码

本地macOS代码位于`native/Avalonia.Native/src/OSX`。在Xcode中打开`Avalonia.Native.OSX.xcodeproj`项目。

您可以在Xcode中进行更改，并使用Cmd+B进行编译。然后，您需要将Avalonia应用程序指向修改后的dynlib。路径可以通过在Xcode的项目导航器中单击dylib并选择“产品”找到。

然后，在您的AppBuilder中指定此路径：

```csharp
.With(new AvaloniaNativePlatformOptions
{ 
    AvaloniaNativeLibraryPath = “[Path to your dylib]”, 
})
```

如果您在Apple Silicon Mac上运行并且目标是.NET 5及更低版本，则需要在工具栏中选择“我的Mac（Rosetta）”切换到Rosetta。

### 打包开发代码

在某些情况下，您需要将Avalonia示例应用程序打包成应用程序包。其中一种情况是测试macOS辅助功能——否则，Xcode的辅助功能检查器无法识别该应用程序。

解决方法是将示例输出路径更改为[类似应用程序包](https://developer.apple.com/library/archive/documentation/CoreFoundation/Conceptual/CFBundles/BundleTypes/BundleTypes.html)的路径。您可以通过修改csproj中的输出路径来实现，例如：

```xml
<OutputPath>bin\$(Configuration)\$(Platform)\ControlCatalog.NetCore.app/Contents/MacOS</OutputPath>
<AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
<UseAppHost>true</UseAppHost>
```

并在`Contents`输出目录中放置有效的`Info.plist`文件。ControlCatalog.NetCore的示例如下：

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

如果您使用的是Rider < 2021.1，则需要从命令行而不是IDE运行应用程序（请参阅 https://youtrack.jetbrains.com/issue/RIDER-53892 ）。
