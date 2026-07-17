---
id: custom-control-library
title: Custom control library
description: How to create a standalone class library project containing multiple custom controls, then reference it to use those custom controls in another project.
doc-type: how-to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NewClassLibraryVS from '/img/custom-controls/new-class-library-vs.png';
import NewClassLibraryRider from '/img/custom-controls/new-class-library-rider.png';
import NewClassLibraryVSCode from '/img/custom-controls/new-class-library-vscode.png';
import InstallAvaloniaInClassLibraryVS from '/img/custom-controls/install-avalonia-in-class-library-vs.png';
import InstallAvaloniaInClassLibraryRider from '/img/custom-controls/install-avalonia-in-class-library-rider.png';
import InstallAvaloniaInClassLibraryVSCode from '/img/custom-controls/install-avalonia-in-class-library-vscode.png';
import CustomControlSolution from '/img/custom-controls/custom-control-solution.png';
import CustomControlPreview from '/img/custom-controls/custom-control-preview.png';

This guide shows you how to create a custom control library and reference it for use in an Avalonia app.

## Creating a custom control library

### Creating a new class library project

To start, you need a **class library** project in which to collect your custom control files.

<Tabs groupId="ide">  
  <TabItem value="rider" label="Rider">
    1. Go to **File → New Solution**. Alternatively, **Add → New Project** to add the class library as a new project within an existing solution.
    2. In the left panel, under the section "Project Type", select **Class Library**.
    3. Name the project, e.g., "CCLibrary".
    4. For "Target framework", select the preferred .NET version.
    5. Click **Create**.

    <Image light={NewClassLibraryRider} alt="A screenshot of the new project menu in Rider." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
  <TabItem value="vs" label="Visual Studio">
    1. Go to **File → New → Project/Solution**.
    2. Select **.NET Class Library** as the project template. Use the search bar to locate this template if it does not appear on the suggested list.
    3. Name the project, e.g., "CCLibrary".
    4. For "Target framework", select the preferred .NET version.
    5. Click **Create**.

    <Image light={NewClassLibraryVS} alt="A screenshot of the new project menu in Visual Studio." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
  <TabItem value="vscode" label="VS Code">
    1. Bring up the command palette using <kbd>Ctrl</kbd> <kbd>⇧</kbd> <kbd>P</kbd> on Windows, or <kbd>Cmd</kbd> <kbd>⇧</kbd> <kbd>P</kbd> on macOS.
    2. Search for and select the command **.NET: New Project**.
    3. Search for and select the template **Class Library**.
    4. Select a location for the new project. Create a new folder for the project if desired.
    5. Name the project, e.g., "CCLibrary".
    6. Confirm the input.

    <Image light={NewClassLibraryVSCode} alt="A screenshot of the new project menu in Visual Studio Code." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
</Tabs>

### Installing Avalonia in the class library project

Next, you must install the Avalonia NuGet package in the class library.

<Tabs groupId="ide">  
  <TabItem value="rider" label="Rider">
    1. In the solution panel, select your class library project.
    2. Click **Tools → NuGet → Manage NuGet Packages**.
    3. Search for "Avalonia" in the search bar.
    4. Select **Avalonia**.
    5. Select the preferred version.
    6. Click the name of your class library project at the bottom of the panel to install Avalonia to that project.

    <Image light={InstallAvaloniaInClassLibraryRider} alt="A screenshot demonstrating how to install the Avalonia NuGet package in Rider." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
  <TabItem value="vs" label="Visual Studio">
    1. In the solution explorer, select your class library project.
    2. Click **Project → Manage NuGet Packages**.
    3. Go to the **Browse** tab. Search for "Avalonia".
    4. Select **Avalonia**.
    5. Select the preferred version.
    6. Click **Install**.

    <Image light={InstallAvaloniaInClassLibraryVS} alt="A screenshot demonstrating how to install the Avalonia NuGet package in Visual Studio." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
  <TabItem value="vscode" label="VS Code">
    1. Bring up the command palette using <kbd>Ctrl</kbd> <kbd>⇧</kbd> <kbd>P</kbd> on Windows, or <kbd>Cmd</kbd> <kbd>⇧</kbd> <kbd>P</kbd> on macOS.
    2. Search for and select the command **NuGet: Add NuGet Package**.
    3. Type in the search term "Avalonia". Confirm the input.
    4. Select the package **Avalonia** from the search results.
    5. Select the desired package version to install it.

    <Image light={InstallAvaloniaInClassLibraryVSCode} alt="A screenshot demonstrating how to install the Avalonia NuGet package in Visual Studio Code." position="center" maxWidth={400} cornerRadius="true"/>
  </TabItem>
</Tabs>

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
- [Custom-drawn basic controls](/docs/custom-controls/custom-drawn-basic-controls): Create a control that draws itself by overriding `Render`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
