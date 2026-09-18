---
id: styles
title: Styles
description: Troubleshooting common issues with Avalonia styles.
doc-type: troubleshooting
---

## Selector has no targets

An Avalonia selector, like a CSS selector, does not raise an error or warning when there are no controls it can match. The style will silently fail to show.

Check whether you have used a name or class that does not exist.

Check whether you have used a child selector where there are no children to match.

## Wrong style is applied

Styles are applied in order of declaration. If you are using multiple style files that target the same control property, the last style included will override the previous ones.

For example, in the files below, styles from `Styles2.axaml` take priority over styles from `Styles1.axaml`. The resulting `TextBlock` will have `FontSize="16"` and `Foreground="Blue"`. The same order prioritization happens within the same style file as well.

<Tabs>

<TabItem value="app-styles" label="App.axaml">

```xml
<Application.Styles>
    <StyleInclude Source="Style1.axaml" />
    <!-- Later style has priority -->
    // highlight-next-line
    <StyleInclude Source="Style2.axaml" />
</Application.Styles>
```

</TabItem>

<TabItem value="style1" label="Style1.axaml">

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
```

</TabItem>

<TabItem value="style2" label="Style2.axaml">

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Blue" />
    <Setter Property="FontSize" Value="16" />
</Style>
```

</TabItem>

</Tabs>

## Style cannot override a local property

A local property value defined directly on a control has higher priority than any style value. For example, this text block will have a red foreground:

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>

<TextBlock Classes="header" Foreground="Red" />
```

To set a mutable property value that can be changed at runtime, it is preferable to use a style through a name or type selector (like `Selector="TextBlock.header"` in the example above).

## Pseudoclass style is not applied

Some pseudoclasses may not work as you might expect because of how the control template is structured. In the below example, the `Button` turns gray when hovered, although you would think it should turn blue, as specified by the `:pointerover` pseudoclass.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <UserControl.Styles>
    <Style Selector="Button">
      <Setter Property="Background" Value="Red" />
    </Style>
    <Style Selector="Button:pointerover">
      <Setter Property="Background" Value="Blue" />
    </Style>
  </UserControl.Styles>

  <Button HorizontalAlignment="Center" 
          Content="lolwut?" />
</UserControl>
```

</XamlPreview>

The reason is in the [Fluent theme button template](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Controls/Button.xaml), which is used by default in new Avalonia projects. In the template, the button's background is rendered by a `ContentPresenter` bound to the button's `Background` property. When in the pointer-over state, the selector applies a different background directly to the `ContentPresenter` template part, bypassing any other property setters for `Background`. Because of this mechanism, the unstyled `:pointerover` appearance would similarly override any other background, including one set by an animation.

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}"/>
    <Setter Property="Template">
        <ControlTemplate>
            <ContentPresenter Name="PART_ContentPresenter"
                              Background="{TemplateBinding Background}"
                              Content="{TemplateBinding Content}"/>
        </ControlTemplate>
    </Setter>
</Style>
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}" />
</Style>
```

To ensure your pseudoclass style is applied properly, you must target the relevant template part with the style selector. In this case, the blue background setter can be amended to select `PART_ContentPresenter`.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <UserControl.Styles>
    <Style Selector="Button">
        <Setter Property="Background" Value="Red" />
    </Style>
    <Style Selector="Button /template/ ContentPresenter#PART_ContentPresenter:pointerover">
        <Setter Property="Background" Value="Blue" />
    </Style>
  </UserControl.Styles>

  <Button HorizontalAlignment="Center" 
          Content="woo!" />
</UserControl>
```

</XamlPreview>

## Previous property value is not restored when style is no longer applied

Avalonia has multiple types of properties, which you can learn more about in [Defining properties](/docs/custom-controls/defining-properties).

**Direct properties** do not support styling. Instead of storing multiple values depending on priority, they only use the latest applied value and thus cannot restore to an earlier value. They are intended to offer lower overhead and higher performance in situations where only simple mechanics are required.

If you are unable to restore an earlier property value, it is likely you are using a direct property. Consider changing to a different property, or [customizing a property](/docs/custom-controls/defining-properties).

## See also

- [Styles](/docs/styling/styles)
- [Style selectors](/docs/styling/style-selectors)
- [Style selector syntax](/docs/styling/style-selector-syntax)
- [Pseudoclasses](/docs/styling/pseudoclasses)
- [Property setters](/docs/styling/property-setters)
- [Property value precedence](/docs/properties/value-precedence)
- [Sharing styles](/docs/styling/sharing-styles)
- [Control template walkthrough](/docs/styling/control-template-walkthrough)
- [Defining properties](/docs/custom-controls/defining-properties)
- [Troubleshooting themes](/troubleshooting/ui-development/themes)