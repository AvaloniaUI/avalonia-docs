---
id: winforms
title: Avalonia controls in Windows Forms
---

Avalonia controls can be hosted in Windows Forms applications. This enables a step-by-step migration of existing Windows Forms applications to Avalonia.

## Overview

An exemplary Windows Forms application with Avalonia controls requires at least two projects:

1. `YourApp` Cross platform library where you put your Avalonia controls 
2. `YourApp.WinForms` Your existing Windows Forms application
3. `YourApp.Desktop` (optional) Executable Avalonia application, required only for the Visual Studio Avalonia designer

As Windows Forms is only supported on Microsoft Windows, adding Avalonia controls to your app will not make it cross platform.

## Step-by-step instructions

These instruction assume that you use Visual Studio 2022 with the Avalonia extension.
You can adjust the steps and leave out the `YourApp.Desktop` project if you are using VS Code or Rider.

1. Create both Avalonia projects
   - In Visual Studio add a new project to your solution
   - Choose _Avalonia C# Project_
   - Select at least _Desktop_ as target platforms
   - Click _Create_
   - You should now have a `YourApp` and a `YourApp.Desktop` project in your solution
2. Add references to your existing Windows Forms project
   - A package reference to `Avalonia.Desktop`
   - A package reference to `Avalonia.Win32.Interoperability`
   - A project reference to `YourApp.csproj`
3. Add the following lines in your `Program.cs` before you call `Application.Run()`
```cs
AppBuilder.Configure<App>()
    .UsePlatformDetect()
    .SetupWithoutStarting();
```
4. Add an `WinFormsAvaloniaControlHost` control from the Toolbox
5. Add the following line to your form's constructor after `InitializeComponent()`
```cs
winFormsAvaloniaControlHost1.Content = new MainView { DataContext = new MainViewModel() };
```

Now you should see Avalonia's default main view _Welcome to Avalonia_ in your Windows Forms application.

:::info
You cannot use ReactiveUI for your Windows Forms and Avalonia controls at the same time.

If you want to use it for Avalonia you must register ReactiveUI at the `AppBuilder` with `.UseReactiveUI()` in `Program.cs`.
Do not include a reference to `ReactiveUI.WinForms` otherwise interactions will not work (see [#16478](https://github.com/AvaloniaUI/Avalonia/discussions/16478)).
:::
