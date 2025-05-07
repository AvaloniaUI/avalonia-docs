---
id: install
title: 安装
---

## 预先安装

请先安装您选择的受支持的 IDE。Avalonia 支持 Visual Studio、Rider 和 Visual Studio Code。

## 安装 Avalonia UI 模板

开始使用 Avalonia 的最佳方式是用项目模板创建一个应用程序。

要安装 [Avalonia 模板](https://github.com/AvaloniaUI/avalonia-dotnet-templates)，请运行以下命令：

```bash title='Bash'
dotnet new install Avalonia.Templates
```

:::note
对于 .NET 6.0 及更早版本，请将 `install` 替换为 `--install`
:::

要列出已安装的模板，请运行

```bash title='Bash'
dotnet new list
```

您应该可以看到已安装的 Avalonia 模板：

```
Template Name                                 Short Name                  Language    Tags
--------------------------------------------  --------------------------  ----------  ---------------------------------------------------------
Avalonia App                                  avalonia.app                [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia MVVM App                             avalonia.mvvm               [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Cross Platform Application           avalonia.xplat              [C#],F#     Desktop/Xaml/Avalonia/Web/Mobile
Avalonia Resource Dictionary                  avalonia.resource                       Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Styles                               avalonia.styles                         Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia TemplatedControl                     avalonia.templatedcontrol   [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia UserControl                          avalonia.usercontrol        [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Window                               avalonia.window             [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
```

## 创建新的应用程序

项目模板安装完成后，您可以通过命令行运行以下命令创建一个新的 Avalonia UI 应用程序：

```bash title='Bash'
dotnet new avalonia.app -o MyApp
```

这会创建一个名为 `MyApp` 的新文件夹，其中包含您的应用程序文件。要运行应用程序，请导航到 `MyApp` 文件夹并运行：

```bash title='Bash'
cd MyApp
dotnet run
```

项目模板还允许从您的 IDE 创建项目。

## 安装故障排除

### 确保已安装 .NET SDK

确保您已经安装了 .NET SDK。您可以运行以下命令检查已安装的 .NET SDK 版本：

```bash
dotnet --version

8.0.202 [C:\Program Files\dotnet\sdk] <-- 您的版本可能有所不同
```

如果 `dotnet` 不是可识别的程序，请确保您已经安装了 IDE。接下来，确保 `dotnet` 已关联到终端。在 Windows 上，这涉及检查环境变量：在命令提示符中运行 `echo %PATH%` 或在 PowerShell 中运行 `echo $Env:PATH`。

### 确保 NuGet 源配置正确

如果在安装项目模板时收到错误，提示 `Avalonia.Templates` 包无法找到，请确保 NuGet 已正确配置为 .NET 的标准全局包源。您可以运行以下命令检查 NuGet 源：

```bash
dotnet nuget list source

注册的源:
  1.  nuget.org [已启用]
      https://api.nuget.org/v3/index.json
```

如果未列出此源，请运行以下命令添加 NuGet 源：

```bash
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

如果 NuGet 已列出，但是包安装仍然失败，请考虑网络连接或防火墙问题。