---
id: style-classes
title: Style classes
description: Learn how to use style classes and pseudo-classes in Avalonia to apply conditional and reusable styles to your controls.
doc-type: explanation
---

# Style classes

Style classes let you tag controls with one or more named labels, then write styles that target those labels. This works similarly to CSS classes in web development: you apply a class name to a control, and any matching style rule takes effect.

## Assigning style classes

You assign style classes to a control using the `Classes` attribute. To apply more than one class, separate the names with spaces.

For example, this button has both the `h1` and `blue` style classes applied:

```xml
<Button Classes="h1 blue"/>
```

You can then define styles that target one or both of those classes:

```xml
<StackPanel.Styles>
    <Style Selector="Button.h1">
        <Setter Property="FontSize" Value="24"/>
    </Style>
    <Style Selector="Button.blue">
        <Setter Property="Foreground" Value="Blue"/>
    </Style>
</StackPanel.Styles>
```

:::tip
Style class names are case-sensitive. Use lowercase, hyphen-separated names (for example, `status-ok`) for consistency.
:::

## Pseudo-classes

Like in CSS, controls can have pseudo-classes. These are classes defined by the control itself rather than by you. Pseudo-class names in a selector always start with a colon.

For example, the `:pointerover` pseudo-class indicates that the pointer is currently inside the bounds of a control. This is similar to `:hover` in CSS.

The following example changes the background of a `Border` when you hover over it:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <StackPanel>
    <StackPanel.Styles>
      <Style Selector="Border:pointerover">
        <Setter Property="Background" Value="Red"/>
      </Style>
    </StackPanel.Styles>
    <Border>
      <TextBlock Margin="10">Hover for red background</TextBlock>
    </Border>
  </StackPanel>
</UserControl>
```

</XamlPreview>

You can also use pseudo-class selectors to change properties inside a control template. In this example, pressing the button changes the text color:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <StackPanel>
    <StackPanel.Styles>
      <Style Selector="Button:pressed /template/ ContentPresenter">
          <Setter Property="TextBlock.Foreground" Value="Red"/>
      </Style>
    </StackPanel.Styles>
   <Button Margin="10">Press for red text</Button>
  </StackPanel>
</UserControl>
```

</XamlPreview>

Other commonly used pseudo-classes include `:focus`, `:disabled`, `:pressed` for buttons, and `:checked` for checkboxes.

:::info
For a complete list of pseudo-classes, see the [pseudo-classes reference](/docs/styling/pseudoclasses).
:::

## Conditional classes

If you need to add or remove a class based on a bound condition, use the `Classes.` syntax with a binding:

```xml
<Button Classes.accent="{Binding IsSpecial}" />
```

When `IsSpecial` is `true`, the `accent` class is added. When it becomes `false`, the class is removed automatically.

You can combine multiple conditional classes on a single control:

```xml
<Border Classes.status-ok="{Binding IsOnline}"
        Classes.status-error="{Binding !IsOnline}"
        Padding="8">
    <TextBlock Text="Service Status" />
</Border>
```

### Combining style classes with pseudo-classes

You can target specific interactive states on controls that already have a style class applied:

```xml
<StackPanel.Styles>
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="Blue" />
        <Setter Property="Foreground" Value="White" />
    </Style>
    <Style Selector="Button.primary:pointerover">
        <Setter Property="Background" Value="DarkBlue" />
    </Style>
    <Style Selector="Button.primary:pressed">
        <Setter Property="Background" Value="Navy" />
    </Style>
</StackPanel.Styles>
```

## Classes in code

You can manipulate style classes in code using the `Classes` collection:

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
control.Classes.Toggle("highlight");

// Check whether a class is present
if (control.Classes.Contains("blue"))
{
    // The control has the "blue" class
}
```

:::note
Classes you add in code are not removed when a style sets the `Classes` attribute in AXAML. The two sources are merged at runtime.
:::

## See also

- [Styles](styles)
- [Pseudo-classes reference](/docs/styling/pseudoclasses)
- [Style selectors](/docs/styling/style-selectors)
- [Control themes](control-themes)
