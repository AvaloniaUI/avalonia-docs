---
id: using-xpf-in-avalonia
title: Using XPF in Avalonia
description: Host WPF-compatible XPF controls inside an existing Avalonia application using XpfContainer.
doc-type: guide
---

This guide walks you through embedding XPF (WPF-compatible) controls in an existing Avalonia application. By the end, you will have an XPF `UserControl` rendering inside an Avalonia window via the `XpfContainer` wrapper.

## Prerequisites

Before you begin, make sure you have:

- An existing Avalonia application project.
- A valid XPF license and access to the XPF SDK NuGet feed. See [Getting started](/xpf/getting-started) for setup details.

## Step 1: Update the project file

Change the SDK in your Avalonia application to [use the XPF SDK](/xpf/getting-started#step-3-use-the-xpf-sdk):

```xml
<Project Sdk="Xpf.Sdk/1.6.0">
```

Next, disable automatic XPF initialization so you can control when the XPF subsystem starts. Add the following property to your project file:

```xml
<PropertyGroup>
  <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
</PropertyGroup>
```

:::tip
Disabling automatic initialization is required because the Avalonia application owns the startup sequence. If you skip this step, XPF may attempt to initialize before Avalonia is ready, which can cause runtime errors. For more details, see [Customizing initialization](/xpf/configuration/customizing-initialization).
:::

## Step 2: Add an XPF application class

Add an `XpfApp` class to your project that inherits from `System.Windows.Application`. This class acts as the XPF application object and is required for XPF resource resolution, merged dictionaries, and other WPF infrastructure to function correctly.

```csharp
using System.Windows;

namespace MyAvaloniaApplication;

/// <summary>
/// Represents the XPF application.
/// </summary>
public partial class XpfApp : Application
{
}
```

:::note
If your XPF controls depend on application-level resources (styles, brushes, converters), define them in an `App.xaml` file associated with this class, just as you would in a standard WPF application.
:::

## Step 3: Initialize the XPF application

In your Avalonia `App.xaml.cs` file, create an instance of `XpfApp` inside `OnFrameworkInitializationCompleted`. You must do this before any XPF controls are used.

```csharp
public override void OnFrameworkInitializationCompleted()
{
    // highlight-start
    new XpfApp();
    // highlight-end

    // Existing Avalonia initialization here
}
```

Place the `new XpfApp()` call at the top of the method, before you set the `MainWindow` or `MainView`. If you initialize XPF after Avalonia has already rendered its first frame, any `XpfContainer` instances in the initial view tree may fail to load.

## Step 4: Add an XPF UserControl

Create an XPF `UserControl` that contains the WPF-compatible content you want to host. This control uses WPF XAML namespaces, not Avalonia namespaces.

```xml
<UserControl x:Class="MyAvaloniaApplication.MyXpfView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             mc:Ignorable="d"
             d:DesignHeight="300" d:DesignWidth="300">
    <Button>Hello XPF!</Button>
</UserControl>
```

```csharp
using System.Windows.Controls;

namespace MyAvaloniaApplication;

public partial class MyXpfView : UserControl
{
    public MyXpfView()
    {
        InitializeComponent();
    }
}
```

:::warning
Do not mix Avalonia and WPF namespaces in the same XAML file. The XPF `UserControl` must use WPF namespaces (`http://schemas.microsoft.com/winfx/2006/xaml/presentation`), while your Avalonia views must use the Avalonia namespace (`https://github.com/avaloniaui`).
:::

## Step 5: Host the XPF UserControl

Use an `XpfContainer` to host your XPF content inside an Avalonia control. The `XpfContainer` lives in the `Atlantis` namespace within the `PresentationFramework` assembly.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="clr-namespace:MyAvaloniaApplication"
        // highlight-next-line
        xmlns:xpf="clr-namespace:Atlantis;assembly=PresentationFramework"
        x:Class="MyAvaloniaApplication.MainWindow">
    // highlight-start
    <xpf:XpfContainer>
        <local:MyXpfView/>
    </xpf:XpfContainer>
    // highlight-end
</Window>
```

You can place `XpfContainer` anywhere in your Avalonia visual tree: inside panels, tab controls, split views, or any other layout container.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `XpfContainer` renders blank | `XpfApp` was not instantiated before the control loaded | Move `new XpfApp()` to the top of `OnFrameworkInitializationCompleted` |
| Build error referencing missing WPF types | Project SDK was not changed to `Xpf.Sdk` | Verify the `<Project Sdk="Xpf.Sdk/1.6.0">` line in your `.csproj` |
| XPF initializes before Avalonia is ready | `DisableAutomaticXpfInit` is not set | Add `<DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>` to your project file |
| XAML namespace errors in the XPF control | Mixed Avalonia and WPF namespaces | Ensure XPF controls use WPF XAML namespaces exclusively |

## See also

- [Getting started with XPF](/xpf/getting-started)
- [Customizing initialization](/xpf/configuration/customizing-initialization)
- [Embedding Avalonia in XPF](/xpf/interop/embedding-avalonia-in-xpf)
- [Centralizing multiple XPF projects](/xpf/configuration/centralizing-multiple-xpf-projects)
