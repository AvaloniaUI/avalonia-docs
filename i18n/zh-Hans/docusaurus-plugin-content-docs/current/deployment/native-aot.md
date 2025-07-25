---
id: native-aot
title: Native AOT 部署
---

Native AOT (Ahead-of-Time) 编译允许您将 Avalonia 应用程序发布为具有本机性能特征的自包含可执行文件。本指南涵盖了 Avalonia 特定的注意事项和 Native AOT 部署的设置。

## Avalonia 应用程序的优势

Native AOT 编译为 Avalonia 应用程序提供了几个特别相关的优势：

- 更快的应用程序启动时间，尤其有利于桌面应用程序
- 减少资源受限环境的内存占用
- 自包含部署，无需安装 .NET 运行时
- 通过减少攻击面（无 JIT 编译）提高安全性
- 与裁剪结合使用时，分发包更小

## 为 Avalonia 设置 Native AOT

### 1. 项目配置

将以下内容添加到您的 csproj 文件中：

```xml
<PropertyGroup>
    <PublishAot>true</PublishAot>
    <!-- 推荐的 Avalonia Native AOT 裁剪设置 -->
    <BuiltInComInteropSupport>false</BuiltInComInteropSupport>
    <TrimMode>link</TrimMode>
</PropertyGroup>
```

### 2. 裁剪配置

Native AOT 需要裁剪。添加这些特定于 Avalonia 的裁剪设置：

```xml
<ItemGroup>
    <!-- 保留 Avalonia 类型以进行反射 -->
    <TrimmerRootAssembly Include="Avalonia.Themes.Fluent" />
    <TrimmerRootAssembly Include="Avalonia.Themes.Default" />
</ItemGroup>
```

## Avalonia 特定注意事项

### XAML 加载
使用 Native AOT 时，XAML 会在构建时编译到应用程序中。请确保您：
- 在 XAML 文件中使用 `x:CompileBindings="True"`
- 避免在运行时动态加载 XAML
- 尽可能使用静态资源引用而不是动态资源

### 资产和资源
- 将所有资产捆绑为嵌入式资源
- 对您的资产使用 `AvaloniaResource` 构建操作
- 避免从外部源动态加载资产

### ViewModel 和依赖注入
- 在启动时注册您的 ViewModel
- 使用编译时 DI 配置
- 避免基于反射的服务定位

## 发布 Avalonia Native AOT 应用程序

### Windows
```bash
dotnet publish -r win-x64 -c Release
```

### Linux
```bash
dotnet publish -r linux-x64 -c Release
```

### macOS
基于 Intel 的 macOS
```bash
dotnet publish -r osx-x64 -c Release
```
基于 Apple 芯片的 macOS
```bash
dotnet publish -r osx-arm64 -c Release
```

:::tip
然后，您可以使用 Apple 的 [lipo 工具](https://developer.apple.com/documentation/apple-silicon/building-a-universal-macos-binary) 来合并 Intel 和 Apple Silicon 的二进制文件，从而使您能够发布通用二进制文件。
:::

## 故障排除常见问题

### 1. 缺少 XAML 控件
如果运行时缺少控件：
```xml
<ItemGroup>
    <!-- 添加您正在使用的特定 Avalonia 控件 -->
    <TrimmerRootAssembly Include="Avalonia.Controls" />
</ItemGroup>
```

### 2. 反射相关错误
对于使用反射的 ViewModel 或服务：
```xml
<ItemGroup>
    <TrimmerRootDescriptor Include="TrimmerRoots.xml" />
</ItemGroup>
```

创建一个 `TrimmerRoots.xml`：
```xml
<linker>
    <assembly fullname="YourApplication">
        <type fullname="YourApplication.ViewModels*" preserve="all"/>
    </assembly>
</linker>
```

## 已知限制

将 Native AOT 与 Avalonia 一起使用时，请注意以下限制：
- 动态控件创建必须在裁剪器设置中配置
- 某些第三方 Avalonia 控件可能与 AOT 不兼容
- 特定于平台的功能需要显式配置
- 设计时工具中的实时预览可能受限

## 平台支持

| 平台 | 状态 |
|----------|--------|
| Windows x64 | ✅ 支持 | 
| Windows Arm64 | ✅ 支持 | 
| Linux x64 | ✅ 支持 | |
| Linux Arm64 | ✅ 支持 | 
| macOS x64 | ✅ 支持 | |
| macOS Arm64 | ✅ 支持 | 
| 浏览器 | ❌ 不支持 |

## 最佳实践

1.  **应用程序结构**
    -   始终如一地使用 MVVM 模式
    -   最大限度地减少反射的使用
    -   优先选择编译时配置

2.  **资源管理**
    -   尽可能使用静态资源
    -   捆绑所有必需的资产
    -   在 IDisposable 中实现正确的清理

3.  **性能优化**
    -   启用绑定编译
    -   使用已编译的绑定
    -   为大型集合实现适当的虚拟化

## 额外资源

- [使用 Native AOT 的 Avalonia 示例应用程序](https://github.com/AvaloniaUI/Avalonia.Samples)