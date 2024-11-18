---
id: host-avalonia-controls-in-winforms
title: 在WinForm中托管Avalonia控件
---

# 在WinForm当中托管Avalonia 控件

Avalonia控件可以在WinForm应用程序中托管。这使得现有的WinForm应用程序可以逐步迁移到Avalonia。

## 概述

一个包含Avalonia控件的示例Windows Forms应用程序至少需要两个项目：

1. `YourApp` 跨平台库，用于放置您的 Avalonia 控件
2. `YourApp.WinForms` 您现有的 Windows Forms 应用程序
3. `YourApp.Desktop`（可选）可执行的 Avalonia 应用程序，仅在使用 Visual Studio Avalonia 设计器时需要

由于WindowsForms仅支持Microsoft Windows，因此将Avalonia控件添加到您的应用程序中并不会使其成为跨平台应用程序。

## 逐步说明

这些说明假设您使用的是安装了 Avalonia 扩展的 Visual Studio 2022。如果您使用的是 VS Code 或 Rider，可以调整步骤并省略 `YourApp.Desktop` 项目。

1. 创建两个 Avalonia 项目
   - 在 Visual Studio 中向您的解决方案添加一个新项目
   - 选择 _Avalonia C# Project_
   - 选择至少 _Desktop_ 作为目标平台
   - 点击 _Create_
   - 现在您的解决方案中应该有一个 `YourApp` 和一个 `YourApp.Desktop` 项目

2. 向现有的 Windows Forms 项目添加引用
   - 添加对 `Avalonia.Desktop` 的包引用
   - 添加对 `Avalonia.Win32.Interoperability` 的包引用
   - 添加对 `YourApp.csproj` 的项目引用

3. 在 `Program.cs` 中调用 `Application.Run()` 之前添加以下行

```cs
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .SetupWithoutStarting();
```

4. 从工具箱中添加一个 `WinFormsAvaloniaControlHost` 控件

5. 在表单的构造函数中 `InitializeComponent()` 之后添加以下行

```cs
winFormsAvaloniaControlHost1.Content = new MainView { DataContext = new MainViewModel() };
```

现在您可以在 Windows Forms 应用程序中看到 Avalonia 的默认主视图 _Welcome to Avalonia_。

:::info
您不能同时在 Windows Forms 和 Avalonia 控件中使用 ReactiveUI。

如果您希望在 Avalonia 中使用它，必须在 `Program.cs` 中通过 `.UseReactiveUI()` 在 `AppBuilder` 中注册 ReactiveUI。不要包含对 `ReactiveUI.WinForms` 的引用，否则Interaction将无法正常工作（参见 [#16478](https://github.com/AvaloniaUI/Avalonia/discussions/16478)）。
:::