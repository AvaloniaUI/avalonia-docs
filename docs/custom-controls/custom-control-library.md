---
id: custom-control-library
title: Custom control library
description: How to create a standalone class library project containing multiple custom controls, then reference it to use those custom controls in another project.
doc-type: how-to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NewClassLibraryVS from '/img/custom-controls/new-class-library-vs.png';
import CustomControlSolution from '/img/custom-controls/custom-control-solution.png';
import CustomControlPreview from '/img/custom-controls/custom-control-preview.png';

Create a custom control library as a standalone project storing multiple controls. You can then reference the library in any Avalonia app to reuse those custom controls.

## Creating a custom control library

1. Start by creating a new **class library** project. All recommended IDEs (Visual Studio, Visual Studio Code, Jetbrains Rider) have templates for .NET class libraries.
2. Install Avalonia in the class library project. [You can do this through the NuGet package management tab in your IDE](/docs/get-started/install-avalonia#installing-avalonia-in-an-existing-net-project).

<Image light={NewClassLibraryVS} maxWidth={250} cornerRadius="true" position="center" alt="A screenshot showing how to start a new .NET class library project in Visual Studio." caption="Example of a .NET class library template in Visual Studio." />
<br />

## Adding custom controls to the class library

A control library can contain as many controls as you wish and can mix all three [types of custom control](/docs/custom-controls#types-of-custom-controls).

The examples below show a class library named `CCLibrary`, to which we will add the custom controls [`ConfirmationView`](/controls/primitives/usercontrol#basic-example), [`ToggleLabel`](/docs/custom-controls/templated-controls) and [`CircleControl`](/docs/custom-controls/custom-drawn-controls).

You do not need to edit the `.csproj` file to register control files. Once the Avalonia package is installed, every `.cs` and `.axaml` file in the project is compiled into the library.

When finished, ``CCLibrary` is structured like this:

```text
CCLibrary/
├── CCLibrary.csproj
├── ConfirmationView.axaml
    └── ConfirmationView.axaml.cs
├── ToggleLabel.cs
├── CircleControl.cs
├── PlotPanel.cs
└── Themes/
    └── Generic.axaml
```

### Adding a user control

`ConfirmationView` is a user control designed to be a reusable confirmation dialog. See the [`UserControl` page](/controls/primitives/usercontrol#basic-example) to learn how to create this control.

To add it to `CCLibrary`, place both the XAML file (`ConfirmationView.axaml`) and the code-behind file (`ConfirmationView.axaml.cs`) into the `CCLibrary` directory.

Ensure both files use the namespace of the library project (`CCLibrary` in this example), not the namespace of the executable project.

<Tabs>

<TabItem value="usercontrol-xaml" label="ConfirmationView.axaml">

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             // highlight-next-line
             x:Class="CCLibrary.ConfirmationView"
             x:Name="root">

  <<StackPanel Margin="20" Spacing="12">
    <TextBlock Text="{Binding #root.Title}"
               HorizontalAlignment="Center"
               FontWeight="Bold" />
    <TextBlock Text="Are you sure?"
               HorizontalAlignment="Center" />
    <StackPanel Orientation="Horizontal"
                HorizontalAlignment="Center"
                Spacing="12">
      <Button Content="Yes" />
      <Button Content="No" />
    </StackPanel>
  </StackPanel>>

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

    public static readonly StyledProperty<string?> TitleProperty =
        AvaloniaProperty.Register<ConfirmationView, string?>(nameof(Title));

    public string? Title
    {
        get => GetValue(TitleProperty);
        set => SetValue(TitleProperty, value);
    }
}
```

</TabItem>

</Tabs>

### Adding a templated control

`ToggleLabel` is a custom templated control that displays a text label when toggled. Because it is a templated control, it has no fixed appearance—this is set in a control theme which can vary between applications. For details on how to create this custom control, see the [Templated controls page](/docs/custom-controls/templated-controls).

Add the `ToggleLabel.cs` control class file to the control library.

```csharp title="ToggleLabel.cs"
using Avalonia;
using Avalonia.Controls.Primitives;

namespace CCLibrary;

public class ToggleLabel : TemplatedControl
{
    public static readonly StyledProperty<string> LabelTextProperty =
        AvaloniaProperty.Register<ToggleLabel, string>(nameof(LabelText), "Default");

    public string LabelText
    {
        get => GetValue(LabelTextProperty);
        set => SetValue(LabelTextProperty, value);
    }
}
```

Next, add a default control theme. By usual convention, default control themes included with a library are collected in a resource dictionary at `Themes/Generic.axaml`. If you are adding multiple templated controls, each will require a separate control theme.

```xml title="Themes/Generic.axaml"
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                    xmlns:cc="using:CCLibrary">

  <ControlTheme x:Key="{x:Type cc:ToggleLabel}" TargetType="cc:ToggleLabel">
    <Setter Property="Background" Value="#3B82F6" />
    <Setter Property="Template">
      <ControlTemplate>
        <Border Background="{TemplateBinding Background}" Padding="8" CornerRadius="4">
          <TextBlock Text="{TemplateBinding LabelText}" />
        </Border>
      </ControlTemplate>
    </Setter>
  </ControlTheme>

</ResourceDictionary>
```

Add one `ControlTheme` per templated control to this dictionary.

:::caution Generic.axaml is not loaded automatically
Unlike WPF, Avalonia does not search referenced assemblies for a generic theme file. A `ControlTheme` defined in your library only takes effect once the consuming app merges the dictionary. Without that step, `ToggleLabel` resolves no template and renders nothing.
:::

To load the dictionary, merge it into the consuming app's `App.axaml` using the [`avares://` URI scheme](/docs/fundamentals/including-assets).

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

In the URI, `CCLibrary` is the assembly name of your class library, and `/Themes/Generic.axaml` is the path to the dictionary inside it.

:::tip
Add a `Design.PreviewWith` block to `Generic.axaml` to render the control in the [XAML live previewer](/docs/app-development/xaml-preview-and-design-settings) while you edit its theme.

```xml
<Design.PreviewWith>
  <cc:ToggleLabel LabelText="Preview" />
</Design.PreviewWith>
```
:::

For more on control themes, template parts and pseudoclasses, see [Templated controls](/docs/custom-controls/templated-controls).

### Adding a custom-drawn control

A custom-drawn control paints itself by overriding `Render`, so it is a single `.cs` file with no accompanying XAML. This `CircleControl` draws an ellipse using a configurable `Fill` property.

```csharp title="CircleControl.cs"
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace CCLibrary;

public class CircleControl : Control
{
    public static readonly StyledProperty<IBrush> FillProperty =
        AvaloniaProperty.Register<CircleControl, IBrush>(nameof(Fill), Brushes.Blue);

    public IBrush Fill
    {
        get => GetValue(FillProperty);
        set => SetValue(FillProperty, value);
    }

    static CircleControl()
    {
        AffectsRender<CircleControl>(FillProperty);
    }

    public override void Render(DrawingContext context)
    {
        var radius = Math.Min(Bounds.Width, Bounds.Height) / 2;
        var center = new Point(Bounds.Width / 2, Bounds.Height / 2);
        context.DrawEllipse(Fill, null, center, radius, radius);
    }
}
```

Because the control carries its own drawing code, it needs no resource dictionary. Consuming apps can use it as soon as they reference the library.

For more on the drawing API, see [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls).

### Adding a custom panel

Layout panels also package as a single class file. This `PlotPanel` overrides `MeasureOverride` and `ArrangeOverride` to position its children at a fixed offset.

```csharp title="PlotPanel.cs"
using Avalonia;
using Avalonia.Controls;

namespace CCLibrary;

public class PlotPanel : Panel
{
    protected override Size MeasureOverride(Size availableSize)
    {
        var panelDesiredSize = new Size();

        foreach (var child in Children)
        {
            child.Measure(availableSize);
            panelDesiredSize = child.DesiredSize;
        }

        return panelDesiredSize;
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        foreach (var child in Children)
        {
            double x = 50;
            double y = 50;

            child.Arrange(new Rect(new Point(x, y), child.DesiredSize));
        }

        return finalSize;
    }
}
```

For more on the measure and arrange passes, see [Custom panel](/docs/custom-controls/custom-panel).

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
- [UserControl](/controls/primitives/usercontrol): Compose existing controls into a reusable view with XAML and code-behind.
- [Custom templated controls](/docs/custom-controls/templated-controls): Build a lookless control whose appearance is defined by a control theme.
- [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls): Create a control that draws itself by overriding `Render`.
- [Custom panel](/docs/custom-controls/custom-panel): Implement a layout panel by overriding `MeasureOverride` and `ArrangeOverride`.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Resource dictionaries](/docs/app-development/resource-dictionary): How merged dictionaries resolve resources across assemblies.
