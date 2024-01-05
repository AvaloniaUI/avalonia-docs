---
description: TUTORIALS - To Do List App
---

import ToDoCreateNewProjectScreenshot from '/img/gitbook-import/assets/image (43).png';
import ToDoNewSolutionScreenshot from '/img/gitbook-import/assets/image (3) (1) (1).png';

# 创建新项目

在本页中，您将学习如何为待办事项列表应用创建一个新项目。有两种方式可以选择：

1. **Visual Studio扩展模板**：如果您喜欢使用Visual Studio，请按照以下说明创建您的项目。

2. **.NET Core CLI命令**：或者，如果您喜欢命令行工具，也可以使用.NET Core CLI命令。方法如下：

## Visual Studio

在开始之前，请确保您已经安装了 Visual Studio 的 _Avalonia UI_ 扩展。

:::info
有关扩展的完整说明，请参阅：[这里](../../get-started/install-the-avalonia-extension.md).
:::

<p><img className="center" src={ToDoCreateNewProjectScreenshot} alt="" /></p>

<figure><figcaption></figcaption></figure>

安装扩展后，请按照以下说明开始本教程：

- 启动 _Microsoft Visual Studio_
- 点击 **创建新项目**
- 在 **搜索模板** 中输入 'Avalonia'
- 点击 **Avalonia MVVM Application**
- 点击 **下一步**
- 在 **项目名称** 中输入 'ToDoList'，然后点击 **创建**

新创建的解决方案将如下所示：

<img className="center" src={ToDoNewSolutionScreenshot} alt="" />

## .NET Core CLI

在开始之前，请确保您已经安装了 .NET Core 的 _Avalonia UI_ 模板。

:::info
有关 CLI 入门的完整说明，请参阅：[这里](../../get-started/getting-started.md).
:::

安装模板后，您可以使用模板创建应用程序：

```bash
dotnet new avalonia.mvvm -o ToDoList -n ToDoList
```

新创建的项目将如下所示：

```bash
ToDoList
 |- Assets
 |   |- avalonia-logo.ico
 |- Models
 |- ViewModels
 |   |- MainWindowViewModel.cs
 |   |- ViewModelBase.cs
 |- Views
 |   |- MainWindow.axaml
 |   |  |- MainWindow.axaml.cs
 |- App.axaml
 |   |- App.axaml.cs
 |- app.manifest
 |- Program.cs
 |- ViewLocator.cs
 |- ToDoList.csproj
```

## MVVM 项目结构

此部分适用于 Visual Studio 和 CLI。

您可以看到每个 MVVM 模式概念（模型、视图和视图模型）都有相应的文件夹，以及其他一些文件和文件夹。

* `/Assets` 文件夹包含应用程序的二进制资源，如图标和位图。放在此处的文件将自动包含为应用程序的资源。
* `/Models` 文件夹目前为空，您将在本教程后面的阶段在此处添加文件。
* `/ViewModels` 文件夹包含视图模型的基类以及用于应用程序主窗口的简单视图模型。
* `/Views` 文件夹包含应用程序主窗口的 AXAML 文件。在本教程中，您将在此处添加其他视图文件。
* `App.axaml` 文件用于应用于整个应用程序的 XAML 样式和数据模板。在本教程中，您不会更改此文件。
* `Program.cs` 文件是应用程序的执行入口点。您可以在此配置 _Avalonia UI_ 的其他平台选项（如果需要的话），但在本教程中，您不会更改此文件。
* `ViewLocator.cs` 文件是一个特殊的辅助类，它在 `App.axaml` 文件中使用。此文件的重要性将在本教程中解释。

## AXAML 文件

_Avalonia UI_ 使用 `.axaml` 作为其 XAML 文件的文件扩展名，这包括通过 Visual Studio 解决方案模板创建的文件，以及较新版本的 .NET Core CLI 模板创建的文件。如果您之前使用较旧版本的 .NET Core CLI 模板，则扩展名可能是 `.xaml`。

:::info
有关 Avalonia UI XAML 的更多背景信息，请参阅：[这里](../../basics/user-interface/introduction-to-xaml.md).
:::
