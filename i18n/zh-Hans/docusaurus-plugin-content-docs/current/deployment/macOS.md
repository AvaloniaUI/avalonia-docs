---
id: macOS
title: macOS 部署
---

macOS应用程序通常以 `.app` [应用程序包](https://en.wikipedia.org/wiki/Bundle_%28macOS%29#macOS_application_bundles) 的形式分发。要让 .NET Core 和 Avalonia 项目在 `.app` 包中运行，需要在应用程序完成发布流程后进行一些额外的工作。

对于 Avalonia，您的 `.app` 文件夹结构如下：

```csharp
MyProgram.app
|
----Contents\
    |
    ------_CodeSignature\（存储代码签名信息）
    |     |
    |     ------CodeResources
    |
    ------MacOS\（您的所有 DLL 文件等 -- `dotnet publish` 的输出）
    |     |
    |     ---MyProgram
    |     |
    |     ---MyProgram.dll
    |     |
    |     ---Avalonia.dll
    |
    ------Resources\
    |     |
    |     -----MyProgramIcon.icns（图标文件）
    |
    ------Info.plist（存储捆绑包标识符、版本等信息）
    ------embedded.provisionprofile（签名信息文件）
```

有关 `Info.plist` 的更多信息，请参阅[苹果的文档](https://developer.apple.com/documentation/bundleresources/information_property_list)。

## 创建应用程序包

有几个选项可用于创建 `.app` 文件/文件夹结构。您可以在任何操作系统上执行此操作，因为 `.app` 文件只是按照特定格式排列的一组文件夹，工具并不特定于一个操作系统。但是，如果您在 Windows 上构建（而不是在 WSL 中），可执行文件可能没有适合 macOS 上执行的正确属性 -- 您可能需要在来自 Unix 设备的已发布二进制输出（由 `dotnet publish` 生成的输出）上运行 `chmod +x`。这是最终位于文件夹 `MyApp.app/Contents/MacOS/` 中的二进制输出，名称应该匹配 `CFBundleExecutable`。

`.app` 结构依赖于 `Info.plist` 文件的正确格式和包含正确信息。使用 Xcode 编辑 `Info.plist`，它为所有属性提供自动完成。确保：

* [`CFBundleExecutable`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleexecutable) 的值与 `dotnet publish` 生成的二进制名称相匹配 -- 通常与您的 `.dll` 程序集名称相同 **不包含** `.dll`。
* [`CFBundleName`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundlename) 设置为您的应用程序的显示名称。如果超过15个字符，请同时设置 [`CFBundleDisplayName`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundledisplayname)。
* [`CFBundleIconFile`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleiconfile) 设置为您的 `icns` 图标文件的名称（包括扩展名）。
* [`CFBundleIdentifier`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier) 设置为唯一标识符，通常使用反向DNS格式 -- 例如 `com.myapp.macos`。
* [`NSHighResolutionCapable`](https://developer.apple.com/documentation/bundleresources/information_property_list/nshighresolutioncapable) 设置为 true（在 `Info.plist` 中是`<true/>`）。
* [`CFBundleVersion`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleversion) 设置为捆绑包的版本，例如 1.4.2。
* [`CFBundleShortVersionString`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring) 设置为应用程序版本的用户可见字符串，例如 `Major.Minor.Patch`。

如果需要协议注册或文件关联，请打开 Applications 文件夹中其他应用程序的 plist 文件并查看它们的字段。

示例协议：

```xml
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>AppName</string>
      <key>CFBundleTypeRole</key>
      <string>Viewer</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>i8-AppName</string>
      </array>
    </dict>
  </array>
```

示例文件关联：

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

有关可能的 `Info.plist` 键的更多文档，请参见[此处](https://developer.apple.com/documentation/bundleresources/information_property_list/bundle_configuration)。

如果在任何时候工具给出错误，表示您的资产文件没有 `osx-64` 的目标，那么请在 `.csproj` 的顶层 `<PropertyGroup>` 中添加以下[运行时标识符](https://docs.microsoft.com/en-us/dotnet/core/rid-catalog)：

```xml
<RuntimeIdentifiers>osx-x64</RuntimeIdentifiers>
```

根据需要添加其他运行时标识符。每个标识符应以分号（;）分隔。

### 关于创建图标文件的说明

这种类型的图标文件不仅可以在 Apple 设备上创建，也可以在 Linux 设备上创建。  
您可以在[此博客文章](https://dentrassi.de/2014/02/25/creating-mac-os-x-icons-icns-on-linux/)中找到有关如何实现这一点的更多信息。

### 关于 `.app` 可执行文件的说明

实际上在 macOS 启动您的 `.app` 包时执行的文件将**不会**具有标准的 `.dll` 扩展名。如果您的发布文件夹内容（放在 `.app` 包

内）中没有 `MyApp`（可执行文件）和 `MyApp.dll`，可能没有正确生成东西，macOS 可能无法正确启动您的 `.app`。

[最近对 macOS 上的 .NET Core 分发和验签](https://docs.microsoft.com/en-us/dotnet/core/install/macos-notarization-issues)进行的一些更改导致未生成 `MyApp` 可执行文件（也称为链接文档中的 "app host"）。**您需要此文件才能生成您的 `.app` 包。**为确保它被生成，可以执行以下操作之一：

* 将以下内容添加到您的 `.csproj` 文件中：

```xml
<PropertyGroup>
  <UseAppHost>true</UseAppHost>
</PropertyGroup>
```

* 在 `dotnet publish` 命令中添加 `-p:UseAppHost=true`。

### dotnet-bundle

:::warning
[dotnet-bundle 不再维护](https://github.com/egramtel/dotnet-bundle/issues/16#issuecomment-1365767804)，但仍然可以使用。 

建议您将目标设置为 `net6-macos`，它会处理包的生成。
:::

[dotnet-bundle](https://github.com/egramtel/dotnet-bundle) 是一个 [NuGet 包](https://www.nuget.org/packages/Dotnet.Bundle/)，用于发布项目并为您创建 `.app` 文件。

首先，您需要将该项目作为 `PackageReference` 添加到您的项目中。可以通过 NuGet 包管理器添加它，或者通过将以下行添加到您的 `.csproj` 文件中：

```xml
<PackageReference Include="Dotnet.Bundle" Version="*" />
```

然后，可以通过在命令行上执行以下命令来创建 `.app`：

```bash
dotnet restore -r osx-x64
dotnet msbuild -t:BundleApp -p:RuntimeIdentifier=osx-x64 -p:UseAppHost=true
```

您可以为 `dotnet msbuild` 命令指定其他参数。例如，如果要发布为 Release 模式：

```bash
dotnet msbuild -t:BundleApp -p:RuntimeIdentifier=osx-x64 -property:Configuration=Release -p:UseAppHost=true
```

或者如果要指定不同的应用程序名称：

```bash
dotnet msbuild -t:BundleApp -p:RuntimeIdentifier=osx-x64 -p:CFBundleDisplayName=MyBestThingEver -p:UseAppHost=true
```

您还可以在命令行中指定 `CFBundleDisplayName` 等，也可以在项目文件中指定它们：

```xml
<PropertyGroup>
    <CFBundleName>AppName</CFBundleName> <!-- 同时定义 .app 文件名 -->
    <CFBundleDisplayName>MyBestThingEver</CFBundleDisplayName>
    <CFBundleIdentifier>com.example</CFBundleIdentifier>
    <CFBundleVersion>1.0.0</CFBundleVersion>
    <CFBundlePackageType>APPL</CFBundlePackageType>
    <CFBundleSignature>????</CFBundleSignature>
    <CFBundleExecutable>AppName</CFBundleExecutable>
    <CFBundleIconFile>AppName.icns</CFBundleIconFile> <!-- 将从输出目录复制 -->
    <NSPrincipalClass>NSApplication</NSPrincipalClass>
    <NSHighResolutionCapable>true</NSHighResolutionCapable>
</PropertyGroup>
```

默认情况下，`dotnet-bundle` 将 `.app` 文件放在与 `publish` 输出相同的位置：`[project directory]/bin/{Configuration}/netcoreapp3.1/osx-x64/publish/MyBestThingEver.app`。

有关可以发送的其他参数的更多信息，请参见 [dotnet-bundle 文档](https://github.com/egramtel/dotnet-bundle)。

如果在 Windows 上创建了 `.app`，请确保从 Unix 设备上运行 `chmod +x MyApp.app/Contents/MacOS/AppName`。否则，应用程序将无法在 macOS 上启动。

### 手动方法

首先，发布您的应用程序（[dotnet publish 文档](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish)）：

```bash
dotnet publish -r osx-x64 --configuration Release -p:UseAppHost=true
```

创建您的 `Info.plist` 文件，并根据需要添加或修改键：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIconFile</key>
    <string>myicon-logo.icns</string>
    <key>CFBundleIdentifier</key>
    <string>com.identifier</string>
    <key>CFBundleName</key>
    <string>MyApp</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.12</string>
    <key>CFBundleExecutable</key>
    <string>MyApp.Avalonia</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
```

您可以按照本页面顶部的说明创建您的 `.app` 文件夹结构。如果您想要使用脚本自动完成，可以使用以下脚本（适用于 macOS/Unix）：

```bash
#!/bin/bash
APP_NAME="/path/to/your/output/MyApp.app"
PUBLISH_OUTPUT_DIRECTORY="/path/to/your/publish/output/netcoreapp3.1/osx-64/publish/."
# PUBLISH_OUTPUT_DIRECTORY should point to the output directory of your dotnet publish command.
# One example is /path/to/your/csproj/bin/Release/netcoreapp3.1/osx-x64/publish/.
# If you want to change output directories, add `--output /my/directory/path` to your `dotnet publish` command.
INFO_PLIST="/path/to/your/Info.plist"
ICON_FILE="/path/to/your/myapp-logo.icns"

if [ -d "$APP_NAME" ]
then
    rm -rf "$APP_NAME"
fi

mkdir "$APP_NAME"

mkdir "$APP_NAME/Contents"
mkdir "$APP_NAME/Contents/MacOS"
mkdir "$APP_NAME/Contents/Resources"

cp "$INFO_PLIST" "$APP_NAME/Contents/Info.plist"
cp "$ICON_FILE" "$APP_NAME/Contents/Resources/$ICON_FILE"
cp -a "$PUBLISH_OUTPUT_DIRECTORY" "$APP_NAME/Contents/MacOS"
```

如果您在Windows上创建了 `.app` 文件，请确保在Unix计算机上运行 `chmod +x MyApp.app/Contents/MacOS/AppName`。否则，应用程序将无法在 macOS 上启动。

## 签署您的应用程序

创建了 `.app` 文件之后，您可能希望对应用程序进行签署，以便进行公证，并无需Gatekeeper给您带来麻烦即可将其分发给用户。从macOS 10.15（Catalina）开始，分发到App Store之外的应用程序需要进行公证，您需要启用[hardened runtime](https://developer.apple.com/documentation/security/hardened_runtime?language=objc)并在 `.app` 上运行 `codesign` 命令才能成功进行公证。

很遗憾，这一步需要使用Mac计算机，因为我们必须运行Xcode附带的 `codesign` 命令行工具。

### 运行 codesign 并启用 hardened runtime

启用 hardened runtime 是与代码签名的相同步骤。您必须对 `Contents/MacOS` 文件夹下的 `.app` 包中的所有内容进行代码签名，使用脚本进行签名最为简便，因为其中包含大量文件。为了签名您的文件，您需要一个Apple开发者帐户。为了对您的应用程序进行公证，您需要使用[Developer ID证书](https://developer.apple.com/developer-id/)执行以下步骤，这需要付费的Apple开发者订阅。

您还需要安装Xcode命令行工具。您可以通过安装Xcode并运行它，或者在命令行中运行 `xcode-select --install` 并按照提示安装工具来获取这些工具。

首先，通过创建 `MyAppEntitlements.entitlements` 文件来启用带有[例外](https://developer.apple.com/documentation/security/hardened_runtime?language=objc)的Hardened Runtime：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.automation.apple-events</key>
    <true/>
</dict>
</plist>
```

然后，运行以下脚本来为您进行所有代码签名：

```bash
#!/bin/bash
APP_NAME="/path/to/your/output/MyApp.app"
ENTITLEMENTS="/path/to/your/MyAppEntitlements.entitlements"
SIGNING_IDENTITY="Developer ID: MyCompanyName" # matches Keychain Access certificate name

find "$APP_NAME/Contents/MacOS/"|while read fname; do
    if [[ -f $fname ]]; then
        echo "[INFO] Signing $fname"
        codesign --force --timestamp --options=runtime --entitlements "$ENTITLEMENTS" --sign "$SIGNING_IDENTITY" "$fname"
    fi
done

echo "[INFO] Signing app file"

codesign --force --timestamp --options=runtime --entitlements "$ENTITLEMENTS" --sign "$SIGNING_IDENTITY" "$APP_NAME"
```

`codesign` 行中的 `--options=runtime` 部分是用于启用带有您的应用程序的 hardened runtime 的部分。因为 [.NET Core 可能不完全兼容 hardened runtime](https://github.com/dotnet/runtime/issues/10562#issuecomment-503013071)，所以我们添加了一些例外情况来使用 JIT 编译的代码和允许发送 Apple Events。JIT 编译的代码例外情况是在 hardened runtime 下运行 Avalonia 应用程序所必需的。我们添加第二个例外情况是为了修复 Console.app 中出现的错误。

注意：Microsoft 列出了[一些其他 hardened runtime 的例外情况](https://docs.microsoft.com/en-us/dotnet/core/install/macos-notarization-issues#default-entitlements)，这些例外情况可能会对您的应用程序造成安全风险。请谨慎使用。

一旦您的应用程序被代码签名，您可以通过确保以下命令不输出任何错误来验证签名是否成功：

```bash
codesign --verify --verbose /path/to/MyApp.app
```

### 对软件进行公证

公证允许您的应用程序在 macOS App Store 之外进行分发。您可以在[此处](https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution)了解更多信息。如果在此过程中遇到任何问题，Apple 提供了一个有关潜在解决方案的有用文档 [here](https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution/resolving_common_notarization_issues?language=objc)。

有关自定义公证工作流程和在运行 `

xcrun altool` 时可能需要发送的更多标志的更多信息，请[查看 Apple 的文档](https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow?language=objc)。

以下步骤修改自[此 StackOverflow 帖子](https://stackoverflow.com/a/53121755/3938401)：

1. 确保您的 `.app` 已正确进行了代码签名
2. 将您的 `.app` 放入 `.zip` 文件中，例如 `MyApp.zip`。请注意，使用 `zip` 会导致公证失败，请改用 `ditto`，如下所示：`ditto -c -k --sequesterRsrc --keepParent MyApp.app MyApp.zip`
3. 运行 `xcrun altool --notarize-app -f MyApp.zip --primary-bundle-id com.unique-identifier-for-this-upload -u username -p password`。您可以使用密钥链中的密码，通过传递 `-p "@keychain:AC_PASSWORD"`，其中 AC_PASSWORD 是密钥。该帐户必须注册为 Apple 开发者。
4. 如果上传成功，您将得到一个UUID作为请求令牌，如：`28fad4c5-68b3-4dbf-a0d4-fbde8e6a078f`
5. 您可以使用该令牌检查公证状态，如下所示：`xcrun altool --notarization-info 28fad4c5-68b3-4dbf-a0d4-fbde8e6a078f -u username -p password`。这可能需要一些时间 - 最终将成功或失败。
6. 如果成功，您必须将公证附加到应用程序中：`xcrun stapler staple MyApp.app`。您可以通过运行 `xcrun stapler validate MyApp.app` 来验证此过程。

公证完成后，您应该能够分发您的应用程序！

:::info
如果您将您的应用程序分发在 `.dmg` 文件中，您需要稍微修改步骤：
:::

1. 像往常一样将您的 `.app` 进行代码签名（放入 `.zip` 文件中）
2. 将已经进行了公证和附加 `xcrun stapler` 的 `.app` 放入 DMG 中（DMG 现在包含了已经进行公证和附加的 `.app` 文件）。
3. 对您的 `.dmg` 文件进行公证（与之前的 `xcrun altool` 命令相同，只需将 `.zip` 文件替换为 `.dmg` 文件）
4. 对 `.dmg` 文件进行公证附加：`xcrun stapler staple MyApp.dmg`

## App Store 打包

您需要很多东西：

* 您的应用程序满足[App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)。
* 您的应用程序满足[macOS 人机界面指南](https://developer.apple.com/design/human-interface-guidelines/macos/overview/themes/)。
* Apple Developer 帐户，使用与之连接的 Apple ID。
* 您的应用程序在 [App Store Connect](https://appstoreconnect.apple.com/apps/) 中注册。
* 从 App Store 安装的 Transporter 应用程序。
* 安装有最新 Xcode，使用您的 Apple ID 授权。
* 两个证书：`3rd Party Mac Developer Installer` 用于签名 `.pkg` 文件，`3rd Party Mac Developer Application` 用于签名 bundle。
* App Store Provision Profile - 可以在此处获取您的应用程序的 [App Store Provision Profile](https://developer.apple.com/account/resources/profiles/list)。
* 两个授权：一个用于签名 `.app` 文件，另一个用于签名应用程序助手。
* 您的应用程序内容被[正确地捆绑](https://developer.apple.com/documentation/bundleresources/placing_content_in_a_bundle)。
* 您的 bundle 已经正确签名。
* 您的 `.dylib` 文件不包含任何非 ARM/x64 架构。您可以使用 `lipo` 命令行工具来移除这些文件。
* 您的应用程序准备好从[沙盒](https://developer.apple.com/library/archive/documentation/Security/Conceptual/AppSandboxDesignGuide/AboutAppSandbox/AboutAppSandbox.html)内部启动。

### 获取证书

* 前往 Xcode > Preferences > Account > Manage Certificates...
* 如果证书不存在，则添加它们。
* 使用密码导出它们。
* 打开它们并导入到 KeyChain Access（钥匙串访问）中。
* 在 KeyChain Access 中，您应该会看到这两个证书：`3rd Party Mac Developer Installer` 和 `Apple Distribution`。如果证书名称以其他字符串开头，则表示您创建了错误的证书。请重试。
* 在 KeyChain Access 中展开导入的密钥，并双击其中的私钥。
* 转到 Access Control（访问控制）选项卡。
* 如果您不想为每个文件签名输入 Mac 配置文件密码，请选择“Allow all applications to access this item”（允许所有应用程序访问此项）。

### 沙箱和捆绑

App Store 要求应用在沙箱内启动。这意味着应用将无法访问一切，并且不能损害用户的电脑。

您的应用程序应该准备好，并且在任何文件受到读写保护时不会崩溃。

.NET 6 应用程序只有在启用了单文件选项的情况下，才不会在沙箱中崩溃。例如：

`dotnet publish src/MyApp.csproj -c Release -f net6.0 -r osx-x64 --self-contained true -p:PublishSingleFile=true`

您的应用程序内容应该正确地捆绑在一起。[这是一篇来自 Apple 的文章，包含了很多有用的信息](https://developer.apple.com/documentation/bundleresources/placing_content_in_a_bundle)。

文章中最重要的规则如下：
* `.dll` 文件不被 Apple 视为代码。因此，应将它们放置在 `/Resources` 文件夹中，并且可以不进行签名。
* `/MacOS` 文件夹应该只包含可执行的 mach-o 文件，即应用程序可执行文件和其他辅助可执行文件。
* 所有其他的 mach-o `.dylib` 文件应该放在 `Frameworks/` 文件夹中。

为了满足这一要求，您可以使用相对符号链接从 `MacOS/` 文件夹链接到 `Resources/` 和 `Frameworks/` 文件夹。示例：

`ln -s fromFile toFile`

此外，最好将您的应用程序资源访问方案重写，直接访问 `Resources/` 文件夹，而不使用任何符号链接，因为通过符号链接可能会在沙箱中遇到 I/O 访问问题。

### 沙箱授权和签名

您应该阅读所有 [授权文档](https://developer.apple.com/documentation/bundleresources/entitlements)，并选择您的应用程序所需的授权。

首先，对于授权文件，需要对 `.app/Contents/MacOS/` 文件夹中的所有辅助可执行文件进行签名。文件内容应如下所示：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
</dict>
</plist>
```

其次，需要对应用程序可执行文件和整个应用程序捆绑包进行签名。它应该包含所有应用程序的权限。以下是示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.disable-library-validation</key>
    <true/>
    <key>com.apple.security.cs.allow-dyld-environment-variables</key>
    <true/>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.temporary-exception.mach-lookup.global-name</key>
    <array>
        <string>com.apple.coreservices.launchservicesd</string>
    </array>
</dict>
</plist>
```

这里还有一些可选参数，您的应用程序可能需要：

```xml
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.network.server</key>
    <true/>
    <key>com.apple.security.automation.apple-events</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
    <key>com.apple.security.files.bookmarks.document-scope</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>[Your Team ID].[Your App ID]</string>
    </array>
```

### 打包脚本

以下是带有注释的示例打包脚本：

```bash
# 清理文件夹
rm -rf "App/AppName.app/Contents/MacOS/" 
rm -rf "App/AppName.app/Contents/CodeResources" 
rm -rf "App/AppName.app/Contents/_CodeSignature" 
rm -rf "App/AppName.app/Contents/embedded.provisionprofile" 
mkdir -p "App/AppName.app/Contents/Frameworks/"
mkdir -p "App/AppName.app/Contents/MacOS/"

# 构建应用程序
dotnet publish ../../ProjectFolder/AppName.csproj -c release -f net5.0 -r osx-x64 --self-contained true -p:PublishSingleFile=true

# 移动应用程序
cd ..
cd ..
cp -R -f ProjectFolder/bin/release/net5.0/osx-x64/publish/* "build/osx/App/AppName.app/Contents/MacOS/"
cd "build/osx/"

APP_ENTITLEMENTS="AppEntitlements.entitlements"
APP_SIGNING_IDENTITY="3rd Party Mac Developer Application: [***]"
INSTALLER_SIGNING_IDENTITY="3rd

 Party Mac Developer Installer: [***]"
APP_NAME="App/AppName.app"

#<这里是使用相对符号链接将您的应用程序资源移动到 Resources 文件夹的代码>

#<这里是使用相对符号链接将您的 .dylib 文件移动到 Frameworks 文件夹的代码>

echo "[INFO] 切换 provisionprofile 到 AppStore"
\cp -R -f AppNameAppStore.provisionprofile "App/AppName.app/Contents/embedded.provisionprofile"

echo "[INFO] 修复 libuv.dylib 架构"
lipo -remove i386 "App/AppName.app/Contents/Frameworks/libuv.dylib" "App/AppName.app/Contents/Frameworks/libuv.dylib"

find "$APP_NAME/Contents/Frameworks/"|while read fname; do
    if [[ -f $fname ]]; then
        echo "[INFO] 签名 $fname"
        codesign --force --sign "$APP_SIGNING_IDENTITY" "$fname"
    fi
done

echo "[INFO] 签名应用程序可执行文件"
codesign --force --entitlements "$FILE_ENTITLEMENTS" --sign "$APP_SIGNING_IDENTITY" "App/AppName.app/Contents/MacOS/AppName"

echo "[INFO] 签名应用程序捆绑包"
codesign --force --entitlements "$APP_ENTITLEMENTS" --sign "$APP_SIGNING_IDENTITY" "$APP_NAME"

echo "[INFO] 创建 AppName.pkg"
productbuild --component App/AppName.app /Applications --sign "$INSTALLER_SIGNING_IDENTITY" AppName.pkg
```
### 测试一个软件包

将您的 `.app` 文件复制到“应用程序”文件夹中并启动它。如果它能正常启动 - 表明您的操作没有问题。如果它崩溃了 - 打开“Console”应用程序并检查崩溃报告。

### 将软件包上传到应用商店

打开“Transporter”应用程序，登录，选择您的 \*.pkg 软件包并等待验证和上传到应用商店。

如果出现任何错误 - 请修复它们，重新打包应用程序，删除“Transporter”中的文件，然后再次选择它。

上传成功后 - 您将在“App Store Connect”中看到您的软件包。

## 故障排除

### 应用程序菜单显示 _关于Avalonia_ 菜单项

这意味着您的应用程序很可能没有指定菜单。在启动时，Avalonia 会为应用程序创建默认的菜单项，并在未配置菜单时自动添加 _关于Avalonia_ 项。您可以通过将以下内容添加到 `App.xaml` 来解决这个问题：

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="using:RoadCaptain.App.RouteBuilder"
             x:Class="RoadCaptain.App.RouteBuilder.App">
	<NativeMenu.Menu>
		<NativeMenu>
			<NativeMenuItem Header="关于我的应用" Click="AboutMenuItem_OnClick" />
		</NativeMenu>
	</NativeMenu.Menu>
</Application>
```

macOS 的其他默认菜单项仍由 Avalonia 生成。

### 菜单栏中的应用程序名称不匹配

当您从软件包运行应用程序时，在菜单栏中显示的应用程序名称是从软件包的 `Info.plist` 中获取的，而不是 `App.xaml` 中的 `Name` 属性。

如果名称不匹配，请验证 `CFBundleName`、`CFBundleDisplayName` 和 `Name` 属性的值是否相同。

请注意，`CFBundleName` 限制为15个字符，如果您的应用程序名称较长，必须设置 `CFBundleDisplayName`。

## 在 GitHub Actions 工作流中打包

在 CI/CD 管道中构建应用程序很简单，只需使用 `dotnet` 命令即可。但要使代码签名和公证化工作，需要做一些额外的工作。

`codesign` 和 `notarytool` 从构建机的钥匙串中读取证书和与公证化服务通信的凭据：

```bash
# 创建新的钥匙串
security create-keychain -p "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
# 将其设置为默认钥匙串
security default-keychain -s build.keychain
# 解锁钥匙串，以便无需授权提示即可使用它
security unlock-keychain -p "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
```

`KEYCHAIN_PASSWORD` 是您专门为此钥匙串生成的密码。它可以在每次构建时生成，或者您可以为每次构建使用相同的密码。

接下来，需要将用于签名的证书导入到钥匙串中。由于 GitHub Secrets 只支持字符串，因此证书 `.p12` 文件需要以Base64编码形式存储。在流程中，将字符串解码为文件并添加到钥匙串中：

```bash
# 将证书解码到文件
echo "${{ secrets.MACOS_CERTIFICATE }}" | base64 --decode > certificate.p12
# 导入到钥匙串
security import certificate.p12 -k build.keychain -P "${{ secrets.MACOS_CERTIFICATE_PWD}}" -T /usr/bin/codesign
```

`MACOS_CERTIFICATE` 是Base64编码的 `.p12` 文件，`MACOS_CERTIFICATE_PWD` 是 `.p12` 文件的密码。

为了在代码签名过程中避免授权提示弹出窗口，请指示钥匙串允许 `codesign` 访问：

```bash
# 允许 codesign 访问钥匙串
security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
```

由于苹果要求开发者帐户启用多因素身份验证 (MFA)，`notarytool` 使用了专用的应用程序密码，您可以在苹果开发者网站上生成它。我们将添加 `notarytool` 的应用程序密码，以便稍后使用：

```bash
xcrun notarytool store-credentials "AC_PASSWORD" --apple-id "${{ secrets.APPLE_ID }}" --team-id ${{ env.TEAM_ID }} --password "${{ secrets.NOTARY_TOOL_PASSWORD }}"
```

`TEAM_ID` 是 App Store Connect 中的团队 ID，`APPLE_ID` 是您的苹果帐户电子邮件地址，`NOTARY_TOOL_PASSWORD` 是您生成的应用程序密码。

要在 GitHub Actions 工作流中使用这些步骤，请将它们作为构建应用程序的作业的一部分添加到工作流中：

```yaml
jobs:
  build_osx:
    runs_on: macos-11
    env:
      TEAM_ID: MY_TEAM_ID
    steps:
    - name: Setup Keychain
      run: |
        security create-keychain -p "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
        security default-keychain -s build.keychain
        security unlock-keychain -p "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
        echo "${{ secrets.MACOS_CERTIFICATE }}" | base64 --decode > certificate.p12
        security import certificate.p12 -k build.keychain -P "${{ secrets.MACOS_CERTIFICATE_PWD}}" -T /usr/bin/codesign
        security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "${{ secrets.KEYCHAIN_PASSWORD}}" build.keychain
        xcrun notarytool store-credentials "AC_PASSWORD" --apple-id "${{ secrets.APPLE_ID }}" --team-id ${{ env.TEAM_ID }} --password "${{ secrets

.NOTARY_TOOL_PASSWORD }}"
```

配置好后，您将不必为 `codesign` 或 `notarytool` 指定特定的钥匙串文件。

接下来的步骤是发布应用程序并对其进行签名。
首先，将此环境变量添加到作业中：

```yaml
    env:
      SIGNING_IDENTITY: thumbprint_of_certificate_added_to_keychain
```

然后添加以下步骤：

```yaml
    - name: Publish app
      run: dotnet publish -c Release -r osx-x64 -o $RUNNER_TEMP/MyApp.app/Contents/MacOS MyApp.csproj
    - name: Codesign app
      run: |
        find "$RUNNER_TEMP/MyApp.app/Contents/MacOS/"|while read fname; do
          if [ -f "$fname" ]
          then
              echo "[INFO] Signing $fname"
              codesign --force --timestamp --options=runtime --entitlements MyApp.entitlements --sign "${{ env.$SIGNING_IDENTITY }}" "$fname"
          fi
        done
        codesign --force --timestamp --options=runtime --entitlements MyApp.entitlements --sign "${{ env.SIGNING_IDENTITY }}" "$RUNNER_TEMP/MyApp.app"
```

> **注意：** `RUNNER_TEMP` 是 GitHub Actions 提供的环境变量。

代码签名后，现在可以对应用程序捆绑进行公证化，将以下步骤添加到作业中：

```yaml
    - name: Notarise app
      run: |
        ditto -c -k --sequesterRsrc --keepParent "$RUNNER_TEMP/MyApp.app" "$RUNNER_TEMP/MyApp.zip"
        xcrun notarytool submit "$RUNNER_TEMP/MyApp.zip" --wait --keychain-profile "AC_PASSWORD"
        xcrun stapler staple "$RUNNER_TEMP/MyApp.app"
```

当您运行此工作流时，您将获得一个已签名和公证化的应用程序捆绑，可以将其打包为磁盘映像或安装程序。

要验证代码签名是否成功，您需要首先下载应用程序捆绑以触发 macOS 的隔离功能。您可以通过将其通过电子邮件发送给自己，或者使用 WeTransfer 或类似服务来实现这一点。

一旦下载了应用程序捆绑并希望启动它，您应该会看到 macOS 弹出窗口，显示应用程序已经过扫描，并未发现恶意软件。
