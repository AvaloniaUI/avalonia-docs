---
id: custom-control-library
title: Custom control library
description: How to create a standalone class library project containing multiple custom controls, then reference it to use those custom controls in another project.
doc-type: how-to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomControlSolution from '/img/custom-controls/custom-control-solution.png';
import CustomControlPreview from '/img/custom-controls/custom-control-preview.png';

Create a custom control library as a standalone project storing multiple controls. You can then reference the library in any Avalonia app to reuse those custom controls.

## Creating a custom control library

1. Start by creating a new **class libraty** project. All recommended IDEs (Visual Studio, Visual Studio Code, Jetbrains Rider) have templates for .NET class libraries.
2. Install Avalonia in the class library project. [You can do this through the NuGet package management tab in your IDE](/docs/get-started/install-avalonia#installing-avalonia-in-an-existing-net-project).

### Creating a new class library project

To start, you need a **class library** project in which to collect your custom control files.

### Installing Avalonia in the class library project

Next, you must install the Avalonia NuGet package in the class library.


### Adding a custom control to the class library

Now that your class library is set up, you can start adding custom controls to it. The library can contain as many custom controls as you wish.

Some examples of custom controls you might add to a class library are [custom flyouts](/docs/custom-controls/custom-flyout) or [custom panels](/docs/custom-controls/custom-panel). See the respective pages for more information on how to create these custom controls.

## Referencing a custom control library

Reference your custom control library in an Avalonia project to allow those custom controls to be used.

This example uses a new project built with the Avalonia MVVM template titled `AvaloniaCCLib`.

<Image light={CustomControlSolution} alt="A screenshot of a solution containing two projects in Visual Studio." position="center" maxWidth={400} cornerRadius="true"/>

### Add a project reference

1. Open the `.csproj` file of your executable project. (`AvaloniaCCLib`, in this example.)
2. Within the `<Project>...</Project>` tags, add a `ProjectReference` pointing to the directory path of the `.csproj` file of the class library project.

```xml title="AvaloniaCCLib.csproj"
<ItemGroup>
  <ProjectReference Include="..\MyControlsLibrary\CCLibrary.csproj" />
</ItemGroup>
```

### Add XML namespace declaration

You can now make a namespace declaration in `.axaml` files of your Avalonia project to access your custom controls in XAML.

1. Add a line similar to this one to the opening `<Window>` tag: `xmlns:cc="using:CCLibrary"`. (Remember to change the name of the class library project if you used a different one.)

2. Add a custom control to the window's content zone by prefixing with `cc`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        xmlns:cc="using:CCLibrary"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCLib.Views.MainWindow"
        Title="AvaloniaCCLib">
  <Window.Styles>
    <Style Selector="cc|MyCustomControl">
      <Setter Property="Background" Value="Yellow"/>
    </Style>
  </Window.Styles>

  //highlight-next-line
  <cc:MyCustomControl Height="200" Width="300"/>

</Window>
```

3. Build the solution.
4. Verify you can see the custom control in the running window or preview.

<Image light={CustomControlPreview} alt="A screenshot of an IDE, displaying XAML code in one window and a preview of a user interface in another." position="center" maxWidth={400} cornerRadius="true"/>

## XML namespace definitions

When referencing a control library in a `.axaml` file, you can use the URL identification format. For example:

```xml
xmlns:cc="https://my.controls.url"
```

This is possible because control libraries contain XML namespace definitions. These map URLs to the code namespaces, and are in the project's `Properties/AssemblyInfo.cs` file. (See [the Avalonia source code](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls/Properties/AssemblyInfo.cs) for an example.)

```csharp title="AssemblyInfo.cs"
[assembly: XmlnsDefinition("https://github.com/avaloniaui", "Avalonia")]
```

### Shared namespace definitions

One URL can map to multiple namespaces in your control library. In your project's `Properties/AssemblyInfo.cs` file, you can add multiple XML namespace definitions that use the same URL but map to different namespaces.

```csharp title="AssemblyInfo.cs"
using Avalonia.Metadata;

[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace")]
[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace.Other")]
```

## See also

- [Creating custom controls](/docs/custom-controls): Overview of the custom control types you can package in a library.
- [Custom templated controls](/docs/custom-controls/templated-controls): Build a lookless control whose appearance is defined by a control theme.
- [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls): Create a control that draws itself by overriding `Render`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
