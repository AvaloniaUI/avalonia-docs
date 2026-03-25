---
id: style-classes
title: Style classes
description: Learn how to assign and use style classes in Avalonia to apply conditional styling to controls.
doc-type: concept
---

You can assign an Avalonia control one or more *style classes*, and use these to guide style selection. Style classes are assigned in a control element using the `Classes` attribute. If you want to assign more than one class, use a space-separated list.

For example, this button has both the `h1` and `blue` style classes applied:

```xml
<Button Classes="h1 blue"/>
```

## Pseudoclasses

Like in CSS, controls can have pseudoclasses; these are classes that are defined in the control itself rather than by the user. The names of pseudo classes in a selector always start with a colon.

For example, the `:pointerover` pseudo class indicates that the pointer input is currently over (inside the bounds of) a control. This pseudo class is similar to `:hover` in CSS.

This is an example of a `:pointerover` pseudo class selector:

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

In this example, the pseudo class selector changes properties inside a control template:

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

Other pseudo classes include `:focus`, `:disabled`, `:pressed` for buttons, and `:checked` for checkboxes.

:::info
For more detail about pseudo classes, see [Pseudoclasses](pseudoclasses).
:::

## Conditional classes

If you need to add or remove a class using a bound condition, then you can use following special syntax:

```xml
<Button Classes.accent="{Binding IsSpecial}" />
```

## Conditional styling patterns

Avalonia does not have WPF-style triggers. Instead, use style classes, pseudo-classes, and binding converters to achieve conditional styling.

### Toggle appearance based on a bound property

Define styles for each state using style classes, then bind the class conditionally:

```xml
<StackPanel>
    <StackPanel.Styles>
        <Style Selector="Border.status-ok">
            <Setter Property="Background" Value="Green" />
        </Style>
        <Style Selector="Border.status-error">
            <Setter Property="Background" Value="Red" />
        </Style>
    </StackPanel.Styles>

    <Border Classes.status-ok="{Binding IsOnline}"
            Classes.status-error="{Binding !IsOnline}"
            Padding="8">
        <TextBlock Text="Service Status" />
    </Border>
</StackPanel>
```

### Using a converter for non-boolean conditions

For conditions that are not simple booleans, use a value converter:

```xml
<Border Background="{Binding Priority, Converter={StaticResource PriorityToBrushConverter}}" />
```

### Combining pseudo-classes with style classes

Target specific interactive states of styled controls:

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

### Custom pseudo-classes in your controls

Define custom pseudo-classes for states specific to your control:

```csharp
public class StatusIndicator : TemplatedControl
{
    public static readonly StyledProperty<bool> IsActiveProperty =
        AvaloniaProperty.Register<StatusIndicator, bool>(nameof(IsActive));

    public bool IsActive
    {
        get => GetValue(IsActiveProperty);
        set => SetValue(IsActiveProperty, value);
    }

    protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
    {
        base.OnPropertyChanged(change);
        if (change.Property == IsActiveProperty)
        {
            PseudoClasses.Set(":active", change.GetNewValue<bool>());
        }
    }
}
```

Then style it with pseudo-class selectors:

```xml
<Style Selector="local|StatusIndicator:active">
    <Setter Property="Background" Value="LimeGreen" />
</Style>
```

## Classes in code

You can manipulate style classes in code using the `Classes` collection:

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
control.Classes.Toggle("highlight");

// Check if a class is present
if (control.Classes.Contains("blue"))
{
    // ...
}
```

## See also

- [Styles](styles)
- [Pseudoclasses](pseudoclasses)
- [Style selectors](style-selectors)
