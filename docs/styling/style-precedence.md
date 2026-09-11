---
id: style-precedence
title: Style precedence
---

When multiple styles, local values, and animations target the same property on a control, Avalonia uses a fixed priority order to determine which value wins. Understanding this order is essential for diagnosing situations where a style does not appear to apply.

## Value sources (highest to lowest priority)

| Priority | Source | Example |
|---|---|---|
| 1 | **Animation** | An active `<Animation>` keyframe targeting `Opacity` |
| 2 | **Local value** | `<Button Foreground="Red" />` or `SetValue` in code |
| 3 | **Style trigger** | A style whose selector can start or stop matching at runtime: `:pointerover`, `.primary`, `[IsChecked=True]` |
| 4 | **Template** | A value set inside a `ControlTemplate` |
| 5 | **Style** | A style whose selector always matches the control: `Button`, `#saveButton` |
| 6 | **Inherited** | A value inherited from an ancestor in the visual tree |
| 7 | **Default** | The property's registered default value |

The property system checks each level in order and returns the first value it finds. For the full API details, see [Property value precedence](/docs/properties/value-precedence).

## Which level a style lands on

Levels 3 and 5 both hold values that come from styles. Avalonia decides between them by looking at the **selector**, not at the setter or at where the style is declared.

A selector that can start or stop matching while the control is alive applies its setters at the **style trigger** level:

- Pseudo-classes, such as `Button:pointerover` or `CheckBox:checked`.
- Style classes, such as `Button.primary`, because `Classes` can change at runtime.
- Property checks, such as `TextBox[IsReadOnly=True]`, because the property can change.

A selector whose result is fixed for a given control applies its setters at the **style** level:

- Type selectors, such as `Button`.
- Name selectors, such as `Button#saveButton`.

In a compound selector, one dynamic part is enough to move the whole style to the trigger level. `StackPanel > Button.primary` applies at level 3 because `.primary` can change, even though `StackPanel > Button` on its own would apply at level 5.

## Why your style might not apply

The most common styling surprise is that a **local value blocks style values**. Because local values (priority 2) outrank both style triggers (priority 3) and styles (priority 5), a property set directly on a control in XAML will always win:

```xml
<Window.Styles>
    <Style Selector="Button">
        <Setter Property="Foreground" Value="Blue" />
    </Style>
    <Style Selector="Button:pointerover">
        <Setter Property="Foreground" Value="Green" />
    </Style>
</Window.Styles>

<!-- This button is ALWAYS Red, even on hover, because LocalValue beats Style and StyleTrigger -->
<Button Foreground="Red" Content="Always Red" />

<!-- This button is Blue normally, Green on hover -->
<Button Content="Styled correctly" />
```

**Fix:** Remove the local value and let the style system control the property, or move the value into a style.

## Style declaration order

When two styles at the **same priority level** target the same property, the style declared later wins:

```xml
<Window.Styles>
    <Style Selector="Button">
        <Setter Property="Background" Value="Blue" />
    </Style>

    <!-- This wins because it is declared later -->
    <Style Selector="Button">
        <Setter Property="Background" Value="Red" />
    </Style>
</Window.Styles>
```

Styles from different sources are evaluated in the order they appear in the logical tree, from the control upward to the application. A style declared on a `UserControl` overrides a matching style from `App.axaml` because the closer scope is evaluated later.

Declaration order only breaks ties **within** a level. A class or property selector sits at the style trigger level, so it beats a plain type selector whichever one is declared first:

```xml
<Window.Styles>
    <!-- Style trigger level: this wins, even though it is declared first -->
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="Red" />
    </Style>

    <!-- Style level -->
    <Style Selector="Button">
        <Setter Property="Background" Value="Blue" />
    </Style>
</Window.Styles>

<!-- Red, not Blue -->
<Button Classes="primary" Content="Primary" />
```

## Style triggers vs base styles

Pseudo-class selectors (`:pointerover`, `:pressed`, `:focus`, `:disabled`) operate at the `StyleTrigger` priority level, which ranks above the `Style` level. This means a pseudo-class style overrides a base type style for the same property:

```xml
<!-- Priority: Style -->
<Style Selector="Button">
    <Setter Property="Background" Value="#6366F1" />
</Style>

<!-- Priority: StyleTrigger (higher than Style) -->
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="#818CF8" />
</Style>
```

When the pointer enters the button, the `StyleTrigger` value takes effect. When it leaves, the `Style` value returns.

Class and property selectors behave the same way, because they can also stop matching. A `Button.primary` style overrides a `Button` style for the same property, and the `Button` value comes back when the class is removed:

```csharp
// Background becomes the value from the Button.primary style
myButton.Classes.Add("primary");

// Background returns to the value from the Button style
myButton.Classes.Remove("primary");
```

## Animations override everything

Animations run at the highest priority. While an animation is active, its values override all other sources, including local values:

```xml
<Style Selector="Button.pulse">
    <Style.Animations>
        <Animation Duration="0:0:1" IterationCount="Infinite">
            <KeyFrame Cue="50%">
                <Setter Property="Opacity" Value="0.5" />
            </KeyFrame>
            <KeyFrame Cue="100%">
                <Setter Property="Opacity" Value="1.0" />
            </KeyFrame>
        </Animation>
    </Style.Animations>
</Style>
```

Even `<Button Opacity="0.8" Classes="pulse" />` will pulse between 0.5 and 1.0 while the animation is active.

The `.pulse` class puts this style itself at the style trigger level, but that does not cap what the animation can override. Values from `<Style.Animations>` are applied at the animation level whatever selector carried them.

## Inherited values

Some properties (like `FontSize`, `Foreground`, `FlowDirection`) inherit their value from ancestor controls. Inherited values have the second-lowest priority, so any style, template, or local value overrides them:

```xml
<!-- Sets FontSize for all descendants via inheritance -->
<StackPanel TextElement.FontSize="18">
    <!-- Inherits 18 -->
    <TextBlock Text="Large text" />

    <!-- Style overrides the inherited value -->
    <TextBlock Text="Small text" Classes="caption" />
</StackPanel>

<Style Selector="TextBlock.caption">
    <Setter Property="FontSize" Value="12" />
</Style>
```

## Debugging precedence issues

Use DevTools (press <kbd>F12</kbd> at runtime) to inspect property values. The **Properties** panel shows the current value and its source, so you can identify which level is providing the active value.

## See also

- [Property value precedence](/docs/properties/value-precedence)
- [Styles](/docs/styling/styles)
- [Pseudoclasses](/docs/styling/pseudoclasses)
- [Styling best practices](/docs/styling/style-best-practices)
