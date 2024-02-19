---
description: REFERENCE
---

import RiderWelcomeScreenshot from '/img/reference/jetbrains-rider-ide/rider-welcome.png';
import RiderInstallAvaloniaPluginScreenshot from '/img/reference/jetbrains-rider-ide/rider-install-avalonia-plugin.png';

# JetBrains Rider 设置

要设置 _JetBrains Rider_ 以用于开发 _Avalonia UI_，请按照以下步骤进行：

- 从 _Microsoft_ 下载并安装您选择的.NET SDK。其中包含用于构建 _Avalonia UI_ 应用程序的运行时和开发工具包（编译器等）。
- 通过在计算机的命令提示符上运行命令 `dotnet new install Avalonia.Templates` 来安装 _Avalonia UI_ 模板。

:::info
有关最新的.NET SDK下载，请参阅[这里](https://dotnet.microsoft.com/download).
:::

:::info
对于.NET 7之前的SDK版本，您需要运行命令 `dotnet new -i Avalonia.Templates`
:::

输出结果将类似于以下内容。

```bash
$ dotnet new install Avalonia.Templates
  Determining projects to restore...
  Restored /Users/danwalmsley/.templateengine/dotnetcli/v5.0.200/scratch/restore.csproj (in 706 ms).

Templates                                     Short Name            Language    Tags
.....

Avalonia Resource Dictionary                  avalonia.resource                 ui/xaml/avalonia/avaloniaui
Avalonia Styles                               avalonia.styles                   ui/xaml/avalonia/avaloniaui

Examples:
    dotnet new mvc --auth Individual
    dotnet new mstest
    dotnet new --help
    dotnet new avalonia.mvvm --help
$
```

:::info
要下载 _JetBrains Rider_，请参阅[这里](https://www.jetbrains.com/rider/)。
:::

Rider将为您提供 _Avalonia UI_ 最佳的开发体验。它适用于Windows、Linux和macOS。Rider默认支持XAML。但是，如果您想使用XAML预览器，则需要安装Avalonia插件。

## 安装Avalonia插件

一旦Rider加载完成，您将看到**Welcome to JetBrains Rider**屏幕。

- 点击**Configure**，然后在下拉菜单中点击**Plugins**。

<img src={RiderWelcomeScreenshot} alt="" />

**Preferences** 窗口将打开。

- 点击**Marketplace**并在搜索框中输入 `Avalonia`。在搜索结果窗格中看到**AvaloniaRider**时，点击**Install**。

<img src={RiderInstallAvaloniaPluginScreenshot} alt="" />

- 安装完成后，点击**Restart IDE**（按钮出现）。

现在，_JetBrains Rider_ 已准备好开发 _Avalonia UI_ 应用程序。
