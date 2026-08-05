---
id: custom-control-library
title: Custom control library
description: How to create a standalone class library project containing multiple custom controls, then reference it to use those custom controls in another project.
doc-type: how-to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomControlLibraryUsage from '/img/custom-controls/custom-control-library-usage.png';
import NewClassLibraryVS from '/img/custom-controls/new-class-library-vs.png';
import CustomControlSolution from '/img/custom-controls/custom-control-solution.png';

Create a custom control library as a standalone project storing multiple controls. You can then reference the library in any Avalonia app to reuse those custom controls.

## Creating a custom control library

1. Start by creating a new **class library** project. All recommended IDEs (Visual Studio, Visual Studio Code, Jetbrains Rider) have templates for .NET class libraries.
2. Install Avalonia in the class library project. [You can do this through the NuGet package management tab in your IDE](/docs/get-started/install-avalonia#installing-avalonia-in-an-existing-net-project).

<Image light={NewClassLibraryVS} maxWidth={250} cornerRadius="true" position="center" alt="A screenshot showing how to start a new .NET class library project in Visual Studio." caption="Example of a .NET class library template in Visual Studio." />
<br />

## Adding custom controls to the class library

A control library can contain as many controls as you wish and can mix all three [types of custom control](/docs/custom-controls#types-of-custom-controls).

The examples below show a class library named `CCLibrary`, to which we will add the custom controls [`ConfirmationView`](/controls/primitives/usercontrol#basic-example), [`ToggleLabel`](/docs/custom-controls/templated-controls) and [`CircleControl`](/docs/custom-controls/custom-drawn-controls).

```text
CCLibrary/
├── CCLibrary.csproj
├── ConfirmationView.axaml
    └── ConfirmationView.axaml.cs
├── ToggleLabel.cs
├── CircleControl.cs
└── Themes/
    └── Generic.axaml
```

### Adding a user control

`ConfirmationView` is a user control designed to be a reusable confirmation dialog. See the [`UserControl` page](/controls/primitives/usercontrol#basic-example) to learn how to create this control.

To add it to `CCLibrary`, place both the XAML file (`ConfirmationView.axaml`) and the code-behind file (`ConfirmationView.axaml.cs`) into the directory of the control library.

Ensure both files use the namespace of the library project (`CCLibrary` in this case), not the namespace of the executable project.

<Tabs>

<TabItem value="usercontrol-xaml" label="ConfirmationView.axaml">

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             // highlight-next-line
             x:Class="CCLibrary.ConfirmationView"
             x:Name="root">

  <!-- Control's design and layout -->

</UserControl>
```

</TabItem>

<TabItem value="usercontrol-cs" label="ConfirmationView.axaml.cs">

```csharp
using Avalonia;
using Avalonia.Controls;

// highlight-next-line
namespace CCLibrary;

public partial class ConfirmationView : UserControl
{
    public ConfirmationView()
    {
        InitializeComponent();
    }

    // Control's events, logic, properties, etc.
}
```

</TabItem>

</Tabs>

### Adding a templated control

`ToggleLabel` is a custom control that displays a text label. Being a templated control, it has no fixed appearance—this is set in a control theme, which can vary between applications. See the [Templated controls page](/docs/custom-controls/templated-controls) to learn how to create this control.

To add it to `CCLibrary`, place the `ToggleLabel.cs` class file into the directory of the control library.

You can also add a default control theme to allow the templated control to be used immediately in the executable project. Like in WPF, the usual convention is to collect control themes in a resource dictionary under a `Themes` subdirectory. If you are adding multiple templated controls, each will require a separate control theme.

Like the previous example, both files must use the namespace of the class library project (`CCLibrary` in this case).

<Tabs>

<TabItem value="templated-control" label="ToggleLabel.cs">

```csharp
using Avalonia;
using Avalonia.Controls.Primitives;

// highlight-next-line
namespace CCLibrary;

public class ToggleLabel : TemplatedControl
{
    // Control's events, logic, properties, etc.
}
```

</TabItem>

<TabItem value="control-theme" label="Themes/Generic.axaml">

```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                    // highlight-next-line
                    xmlns:cc="using:CCLibrary">

  <ControlTheme x:Key="{x:Type cc:ToggleLabel}" TargetType="cc:ToggleLabel">
    <!-- Control's default visual appearance-->
  </ControlTheme>

</ResourceDictionary>
```

</TabItem>

</Tabs>

:::caution
Default control themes in a class library are not applied automatically. Without explicit inclusion of the resource dictionary, the templated control receives no template and does not render. See [Using templated controls](#using-templated-controls) for more information.
:::

### Adding a custom-drawn control

`CircleControl` is a control that draws an ellipse that is colored with a configurable `Fill` property. See the [Custom-drawn controls page](/docs/custom-controls/custom-drawn-controls) to learn how to create this control. It is a custom-drawn control, meaning it paints itself and requires no control theme.

To add it to `CCLibrary`, place the single `CircleControl.cs` class file into the directory of the control library. Like the previous examples, the class file must use the namespace of the class library project (`CCLibrary` in this case).

```csharp title="CircleControl.cs"
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

// highlight-next-line
namespace CCLibrary;

public class CircleControl : Control
{
    // Control's specifications

    public override void Render(DrawingContext context)
    {
        // Control's appearance as drawn by DrawingContext
    }
}
```

## Referencing a custom control library

To use the custom controls in a control library, you must reference the class library project in the executable project.

The example below demonstrates how this works using an Avalonia MVVM project named `AvaloniaCCLib`. This project and `CCLibrary`, [from the section above](#adding-custom-controls-to-the-class-library), are included together in a solution titled `MyControlsLibrary`.

<Image light={CustomControlSolution} alt="A screenshot of a solution containing two projects in Visual Studio." position="center" maxWidth={400} cornerRadius="true"/>

### Adding a project reference

In the project file of the executable project (`AvaloniaCCLib.csproj`), add a `ProjectReference` pointing at the directory path of the control library's project file (`CCLibrary.csproj`).

```xml title="AvaloniaCCLib.csproj"
<ItemGroup>
  <ProjectReference Include="..\MyControlsLibrary\CCLibrary.csproj" />
</ItemGroup>
```

### Adding namespace declarations

To access your custom controls in the executable project, make a namespace declaration in any relevant XAML files. In the example below, `cc` is chosen as the namespace reference, which allows custom controls from `CCLibrary` to be used by prefixing with `cc:`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        xmlns:cc="using:CCLibrary"
        x:Class="AvaloniaCCLib.Views.MainWindow"
        Title="AvaloniaCCLib">
```

### Using templated controls

To use a templated control in the executable project, it must have a control template. If no template is available, the control will not render when you run the app.

If you included a default control theme with your templated control, as shown in the [`ToggleLabel` example above](#adding-a-templated-control), be aware that the default control theme is not applied automatically. You must explicitly merge the resource dictionary containing the control theme into `App.axaml` of the executable project.

This is done using `ResourceInclude`, which uses the [`avares://` URI scheme](/docs/fundamentals/including-assets) to locate the resource dictionary file in the class library project. Here is an example using `CCLibrary` from the sections above.

```xml title="App.axaml"
<Application.Resources>
  <ResourceDictionary>
    <ResourceDictionary.MergedDictionaries>
      // highlight-next-line
      <ResourceInclude Source="avares://CCLibrary/Themes/Generic.axaml" />
    </ResourceDictionary.MergedDictionaries>
  </ResourceDictionary>
</Application.Resources>
```

### Using user controls and custom-drawn controls

User controls and custom-drawn controls require no further configuration to use. So long as the control library is referenced in the project, and the appropriate namespace is declared, both can be directly used in XAML.

<Tabs>

<TabItem value="user-control-usage" label="ConfirmationView">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaCCLib.ViewModels"
        // highlight-next-line
        xmlns:cc="using:CCLibrary"
        x:Class="AvaloniaCCLib.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Title="AvaloniaCCLib">

    // highlight-next-line
    <cc:ConfirmationView />

</Window>
```

</TabItem>

<TabItem value="custom-drawn-control-usage" label="CircleControl">

```xml

<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaCCLib.ViewModels"
        // highlight-next-line
        xmlns:cc="using:CCLibrary"
        x:Class="AvaloniaCCLib.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Title="AvaloniaCCLib">

    <!-- CircleControl from our example has no default width or height.
         These must be set in XAML when adding the control. -->
    // highlight-next-line
    <cc:CircleControl Width="100" Height="100" />

</Window>

```

</TabItem>

</Tabs>

<Image light={CustomControlLibraryUsage} maxWidth={400} cornerRadius="true" position="center" alt="A screenshot showing all three custom controls from the examples in this section in use." caption="All three custom controls from the control library in use together." />
<br />

## XML namespace definitions

When referencing a control library in a `.axaml` file, you can use the URL identification format. For example:

```xml
<Window xmlns:cc="https://my.controls.url" />
```

This requires registration in the `AssemblyInfo.cs` file of the class library project. Multiple XML namespaces can share the same URL. ([Avalonia itself](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls/Properties/AssemblyInfo.cs) shares the `https://github.com/avaloniaui` URL between most packages.)

```csharp title="AssemblyInfo.cs"
using Avalonia.Metadata;

[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace")]
[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace.Other")]
```

The main reason to use the URL format is to share the same namespace identification across multiple assemblies, so that many separate namespaces can be referenced with a single prefix.

In contrast, the `using:` or `clr-namespace:` formats work strictly on a one-to-one basis: one namespace, one prefix. However, they require no additional registration in the assembly info.

For more information on referencing custom classes in XAML, see [Referencing your own types](/docs/xaml/namespaces#referencing-your-own-types).

## See also

- [Creating custom controls](/docs/custom-controls): Overview of the custom control types you can package in a library.
- [UserControl](/controls/primitives/usercontrol): Compose existing controls into a reusable view with XAML and code-behind.
- [Custom templated controls](/docs/custom-controls/templated-controls): Build a lookless control whose appearance is defined by a control theme.
- [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls): Create a control that draws itself by overriding `Render`.
- [Custom panel](/docs/custom-controls/custom-panel): Implement a layout panel by overriding `MeasureOverride` and `ArrangeOverride`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Resource dictionaries](/docs/app-development/resource-dictionary): How merged dictionaries resolve resources across assemblies.
