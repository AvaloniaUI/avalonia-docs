---
id: install
title: 安装
---

## 安装 Avalonia UI 模板

开始使用 Avalonia 的最佳方式是使用模板创建一个应用程序。

要安装 Avalonia 模板，请运行以下命令：

```bash
dotnet new install Avalonia.Templates
```

:::note
对于 .NET 6.0 及更早版本，请将 `install` 替换为 `--install`
:::

要列出已安装的模板，请运行以下命令：

```bash
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