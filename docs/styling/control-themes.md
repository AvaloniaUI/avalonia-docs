---
id: control-themes
title: Control themes
---

import StylingEllipseButtonScreenshot from '/img/concepts/ui-concepts/styling/ellipse-button.png';

Control themes build upon [styles](styles) to create switchable themes for controls. Unlike regular styles, which accumulate and cannot be removed once applied, a control theme can be replaced entirely. This makes control themes the right choice when you need to swap out a control's complete look for a specific instance or section of your UI.

Control themes are themselves styles, but with some important differences:

- Control themes don't have a selector: instead they have a `TargetType` property which describes the control that they target
- Control themes are stored in a `ResourceDictionary` instead of a `Styles` collection
- Control themes are assigned to a control by setting the `Theme` property, usually using the `{StaticResource}` markup extension

:::tip
Because control themes are based on styles, it is important to understand the Avalonia [styling system](styles) first.
:::

:::info
Control themes are typically applied to [templated (lookless)](../custom-controls) controls, but they can actually be applied to any control. However, for non-templated controls, it is often more convenient to use standard styles instead.
:::

## Example: round button

The following example shows a simple `Button` theme which displays a button with an ellipse background with a 90's Geocities aesthetic:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    // highlight-start
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </ControlTheme>
    // highlight-end
  </Application.Resources>
</Application>
```

```xml title='MainWindow.xaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="Sandbox.MainWindow">
  // highlight-start
  <Button Theme="{StaticResource EllipseButton}"
          HorizontalAlignment="Center"
          VerticalAlignment="Center">
    Hello World!
  </Button>
  // highlight-end
</Window>
```

<p><img className="medium-image-zoom" src={StylingEllipseButtonScreenshot} alt="Ellipse Button" /></p>

## Interaction in control themes

Like standard styles, control themes support [nested styles](styles) which can be used to add interactions such as pointer-over and pressed states.

## Example: round button hover state

Using nested styles we can make our button change color when the pointer is hovered over it:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      // highlight-start
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
      // highlight-end
    </ControlTheme>
  </Application.Resources>
</Application>
```

## Control theme lookup

There are two ways in which a control theme can be found:

- If the control's `Theme` property is set, then that control theme will be used; otherwise
- Avalonia will search upwards through the logical tree for a `ControlTheme` resource with an `x:Key` which matches the control's [style key](styles)

:::tip
If you're having trouble getting Avalonia to find your theme, make sure it's returning a [style key](styles) which matches the `x:Key` and `TargetType` of your control theme.
:::

In effect this means that you have two choices for how to define your control theme:

- **If you want the control theme to apply to all instances of the control** then use an `{x:Type}` as the resource key. For example
  `<ControlTheme x:Key="{x:Type Button}" TargetType="Button">`
- **If you want the control theme to be applied to selected instances of the control** then use anything else as the resource key and look up this resource using `{StaticResource}`. Commonly this key will be a `string`

:::info
Notice that this means that only a single control theme can be applied to a control at any one time.
:::

## Example: make all the buttons round

To apply the control theme to all buttons in the application, change the `x:Key` of the control theme to match the `Button` type.

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
      // highlight-next-line
    <ControlTheme x:Key="{x:Type Button}" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
    </ControlTheme>
  </Application.Resources>
</Application>
```

## TargetType

The `ControlTheme.TargetType` property specifies the type to which setter properties apply. If you don't specify a `TargetType`, you must qualify the properties in your `Setter` objects with a class name by using the syntax `Property="ClassName.Property"`. For example, instead of setting `Property` to `FontSize`, you must set `Property` to `TextBlock.FontSize` or `Control.FontSize`.

## See also

- [ButtonCustomize](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize) sample with a `WinClassicButtonTheme`
- Control themes for built-in Avalonia controls:
  - [Simple Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Simple/Controls)
  - [Fluent Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls)
- [Styles](styles)
- [Control template walkthrough](control-template-walkthrough)
