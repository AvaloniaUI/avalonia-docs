---
id: control-themes
title: Control Themes
---

Control themes build upon [Styles](styles) to create switchable themes for controls. Control themes are analogous to Styles in WPF/UWP, though their mechanism is slightly different.

:::tip
Because control themes are based on styles, it is important to understand the Avalonia [styling system](styles) first.
:::

## Introduction

Before Avalonia 11, control themes were created using standard styles. However, this approach had a fundamental problem: once a style was applied to a control, there was no way to remove it. Consequently, if you wanted to change the theme for a specific instance of a control or a section of the user interface (UI), the only option was to apply a second theme to the control and hope that it would override all the properties set in the original theme.

The solution for this was introduced in Avalonia 11 in the form of _Control Themes_.

Control themes are themselves styles, but with some important differences:

- Control themes don't have a selector: instead they have a "target type" which is simply the style key of the control that they will apply to
- Control themes are stored in a `ResourceDictionary` instead of a `Styles` collection
- Control themes are assigned to a control by setting the `Theme` property, usually using the `{StaticResource}` markup extension

:::info
Control themes are typically applied to templated (lookless) controls, but they can actually be applied to any control. However, for non-templated controls, it is often more convenient to use standard styles instead.
:::

## Example: Round Button

The following example shows a simple `Button` theme which displays a button with an ellipse background with a 90's geocities aesthetic:

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

![Ellipe Button](/img/basics/user-interface/styling/ellipse-button.png)

## Interaction in Control Themes

Like standard styles, control themes support [nested styles](../styling/styles.md#nesting-styles) which can be used to add interactions such as pointer-over and pressed states.

## Example: Round Button Hover State

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

## Control Theme Lookup

There a two ways in which a control theme can be found:

- If the control's `Theme` property is set, then that control theme will be used; otherwise
- Avalonia will search the upwards through the logical tree for a `ControlTheme` resource with an `x:Key` which matches the control's style key

Notice that this means that only a single control theme can be applied to a control at any one time.

## Example: Make all the Buttons Round

We can apply our new control theme to all of the buttons in the application by simply changing the `x:Key` of the control theme to match the `Button` type.

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
