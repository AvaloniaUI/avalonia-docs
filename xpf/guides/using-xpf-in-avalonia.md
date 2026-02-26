---
id: using-xpf-in-avalonia
title: Using XPF in Avalonia
---

## Step 1: Update the Project File

Change the SDK in your Avalonia application to [use the XPF SDK](/xpf/getting-started.md#step-3-use-the-xpf-sdk):

```xml
<Project Sdk="Xpf.Sdk/1.4.0">
```

And [disable automatic XPF initialization](/xpf/guides/customizing-initialization):

```xml
<PropertyGroup>
  <DisableAutomaticXpfInit>true</DisableAutomaticXpfInit>
</PropertyGroup>
```

## Step 2: Add an XPF Application Class

Add an `XpfApp` class to your project which inherits from `System.Windows.Application`:

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

## Step 3: Initialize the XPF Application

In your Avalonia `App.xaml.cs` file, create an instance `XpfApp` in `OnFrameworkInitializationCompleted`:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    // highlight-start
    new XpfApp();
    // highlight-end

    // Existing Avalonia initialization here
}
```

## Step 3: Add an XPF UserControl

Add an XPF `UserControl` to your application which contains the XPF content that you wish to host. For example:

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

## Step 4: Host the XPF UserControl

Intiantiate an `XpfContainer` to host the XPF content in an Avalonia control:

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