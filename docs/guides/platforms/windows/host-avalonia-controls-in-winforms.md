---
id: host-avalonia-controls-in-winforms
title: Host Avalonia controls in Windows Forms
---

# Host Avalonia controls in Windows Forms

Avalonia controls can be hosted in Windows Forms applications. This enables a step-by-step migration of existing Windows Forms applications to Avalonia.

## Overview

An exemplary Windows Forms application with Avalonia controls requires at least three projects:

1. `YourApp` Cross platform library where you put your Avalonia controls 
2. `YourApp.Desktop` Executable Avalonia application, required for the Visual Studio Avalonia designer
3. `YourApp.WinForms` Your existing Windows Forms application

## Prerequisites

- Visual Studio 2022
- Avalonia extension for Visual Studio 2022
- A solution with a Windows Forms project

## Step-by-step instructions

1. Create both Avalonia projects
   - In Visual Studio add a new project to your solution
   - Choose _Avalonia C# Project_
   - Select at least _Desktop_ as target platforms
   - Click _Create_
   - You should now have a `YourApp` and a `YourApp.Desktop` project in your solution
2. Add references to your existing Windows Forms project
   - A package reference to `Avalonia.Skia`
   - A package reference to `Avalonia.Win32.Interoperability`
   - A project reference to `YourApp.csproj`
3. Add the following lines in your `Program.cs` before you call `Application.Run()`
```cs
AppBuilder.Configure<App>()
    .UseWin32()
    .UseSkia()
    .SetupWithoutStarting();
```
4. Add an `WinFormsAvaloniaControlHost` control from the Toolbox
5. Add the following line to your form's constructor after `InitializeComponent()`
```cs
winFormsAvaloniaControlHost1.Content = new MainView { DataContext = new MainViewModel() };
```

Now you should see Avalonia's default main view _Welcome to Avalonia_ in your Windows Forms application.
