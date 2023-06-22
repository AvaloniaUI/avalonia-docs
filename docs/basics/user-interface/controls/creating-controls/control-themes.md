# Defining a ControlTheme

Avalonia allows you to define custom control themes to customize the appearance and style of your controls. In particular, a lookless control will have no visual representation without a control theme; however you can define control themes for all types of control.

The following example shows you how to create a default control theme for a custom button lookless control called `MyCustomButton`.

## Step 1 - Create the ControlTheme XAML file

- Add a new `ResourceDictionary` XAML file, for example `MyCustomButton.axaml`
- In the `ResourceDictionary` add `ControlTheme` element with an `x:Key` and `TargetType` referencing the type of control to be themed

```xml
﻿<ResourceDictionary xmlns="https://github.com/avaloniaui"
                      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                      xmlns:local="using:MyProject"
                      x:ClassModifier="internal">
  <ControlTheme x:Key="{x:Type MyCustomButton}" TargetType="MyCustomButton">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}" />
    <Setter Property="Foreground" Value="{DynamicResource ButtonForeground}" />
    <Setter Property="BorderBrush" Value="{DynamicResource ButtonBorderBrush}" />
    <Setter Property="BorderThickness" Value="{DynamicResource ButtonBorderThemeThickness}" />

    <Setter Property="Template">
      <ControlTemplate>
        <ContentPresenter x:Name="PART_ContentPresenter"
                          Background="{TemplateBinding Background}"
                          BorderBrush="{TemplateBinding BorderBrush}"
                          BorderThickness="{TemplateBinding BorderThickness}"
                          CornerRadius="{TemplateBinding CornerRadius}"
                          Content="{TemplateBinding Content}"
                          ContentTemplate="{TemplateBinding ContentTemplate}"
                          Padding="{TemplateBinding Padding}"
                          HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}"
                          VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}" />
      </ControlTemplate>
    </Setter>
  </ControlTheme>
</ResourceDictionary>
```

In this example, a control theme is defined for the `MyCustomButton` control. It provides default values for the `Background`, `Foreground`, `BorderBrush` and `BorderThickness` properties, and provides a control template with `ContentPresenter` inside.

## Step 2 - Add the ControlTheme to the App.axaml File

- In the `App.axaml` file, create an `<Application.Resources>` element
- Under `<Application.Resources>`, create a `<ResourceDictionary.MergedDictionaries>` element
- Inside the `<ResourceDictionary.MergedDictionaries>` element add a `<ResourceInclude>` with the path to the XAML file

```xml
<Application xmlns="https://github.com/avaloniaui" 
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyProject.App">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
    
    <Application.Resources>
        <ResourceDictionary.MergedDictionaries>
            <ResourceInclude Source="MyCustomButton.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </Application.Resources>
</Application>
```

The control theme will now be applied automatically to all instances of `MyCustomButton` in the application.

## Further Reading

For more information see the introduction to [control themes](../../styling/control-themes)