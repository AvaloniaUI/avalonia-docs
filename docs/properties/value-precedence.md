---
id: value-precedence
title: Property value precedence
description: How Avalonia resolves competing property values using BindingPriority.
doc-type: explanation
---

When multiple sources provide a value for the same property, Avalonia must decide which value wins. For example, a property like `Foreground` may receive competing values from a local value, a style setter, an animation and an inherited value. The property system resolves this using a fixed priority order defined by the [`BindingPriority` enum](/api/avalonia/data/bindingpriority).

## Priority order

Higher priority values are resolved over lower priority values, where 1 is the highest priority.

| Priority | `BindingPriority` value | Description |
|---|---|---|
| 1 | `Animation` | Values applied by active animations. |
| 2 | `LocalValue` | Values set directly on the object via `SetValue`, XAML attribute, or code. |
| 3 | `StyleTrigger` | Values applied by style selectors with conditional activation, such as pseudoclasses (`:pointerover`), style classes (`.primary`), or property checks (`[IsChecked=True]`). |
| 4 | `Template` | Values set within a control template. |
| 5 | `Style` | Values applied by style selectors that always match, such as a type selector (`Button`) or name selector (`#saveButton`). |
| 6 | `Inherited` | Values inherited from an ancestor element in the visual tree. See [Property value inheritance](/docs/properties/property-value-inheritance). |
| 7 | `Unset` | No value set. The property's default value is used. |

## How precedence works

When you request a property value (via `GetValue` or a binding), the property system checks each priority level in order and returns the first value it finds.

### `StyleTrigger` vs. `Style`

`StyleTrigger` (priority 3) and `Style` (priority 5) both hold values that come from styles. Avalonia decides between them by looking at the **selector**. A selector that conditionally matches during runtime beats a selector that always matches. In effect, this means pseudoclasses, style classes and property checks are prioritized over name and type selectors.

Two `StyleTrigger` values have equal priority, regardless of the number of activators present and the position of the activator within the selector syntax.

### Example

Consider a `Button` with a `Foreground` property:

```xml
<!-- Application-level style (Priority: Style) -->
<Application.Styles>
    <Style Selector="Button">
        <Setter Property="Foreground" Value="Black" />
    </Style>
    <Style Selector="Button:pointerover">
        <Setter Property="Foreground" Value="Blue" />
    </Style>
</Application.Styles>
```

```xml
<!-- Local value (Priority: LocalValue) -->
<Button Foreground="Red" Content="Click me" />
```

In this scenario:
- The button's `Foreground` is **Red** because `LocalValue` has higher priority than `Style` and `StyleTrigger`.
- Even when the pointer hovers over the button, the `Foreground` remains **Red** because `LocalValue` (priority 2) outranks `StyleTrigger` (priority 3).

If you remove the local `Foreground="Red"` attribute:
- The button's `Foreground` is **Black** (from the `Style` setter) by default.
- When the pointer hovers over the button, it changes to **Blue** (from the `StyleTrigger` for `:pointerover`).

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

Declaration order only breaks ties **within** a level. A class or property selector sits at the style trigger level, so it beats a plain type selector regardless of order.

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

## Animations override everything

Animations have the highest priority. While an animation is active, its value overrides all other sources. This ensures visual transitions are never interrupted by style changes.

```xml
<Style Selector="Button:pointerover">
    <Style.Animations>
        <Animation Duration="0:0:0.2">
            <KeyFrame Cue="100%">
                <Setter Property="Opacity" Value="0.8" />
            </KeyFrame>
        </Animation>
    </Style.Animations>
</Style>
```

## Template priority

`Template` (priority 4) applies to all properties set by a `ControlTemplate`. In the example below, `BorderThickness`, `Background`, and `Padding`have `Template` priority.

`Template` is a higher priority than `Style` (priority 5), meaning these values would override any set by a name or type selector.

```xml
<ControlTemplate>
    <Border BorderThickness="2">
        <Button Background="{DynamicResource ButtonBrush}" Padding="{TemplateBinding Padding}" />
    </Border>
</ControlTemplate>
```

## Working with priorities in code

### Clearing values

When you call `ClearValue`, you remove the value at the `LocalValue` priority level. The property system then continues to the next available source.

```csharp
// Set a local value (red foreground overrides other styles)
myButton.SetValue(Button.ForegroundProperty, Brushes.Red);

// Clear the local value (styles take effect again)
myButton.ClearValue(Button.ForegroundProperty);
```

### Setting values at specific priorities

In advanced scenarios, you can set a value at a specific priority using the `SetValue` overload:

```csharp
myButton.SetValue(Button.ForegroundProperty, Brushes.Red, BindingPriority.Style);
```

This is primarily used by the styling system internally. In most application code, you set local values (the default when calling `SetValue`).

### `SetCurrentValue`

The `SetCurrentValue` method sets a value at the current highest-priority level rather than at `LocalValue`. This can be used where you want to update a property without overriding styles:

```csharp
// Sets the value without creating a LocalValue entry
myButton.SetCurrentValue(Button.ForegroundProperty, Brushes.Green);
```

### Impact on data binding

Bindings are applied at the priority level of their source. A binding created through a style is applied at the `Style` or `StyleTrigger` level. A binding set directly in XAML is applied at the `LocalValue` level:

```xml
<!-- This binding operates at LocalValue priority -->
<Button Foreground="{Binding ButtonColor}" />
```

Because `LocalValue` bindings outrank style values (both `Style` and `StyleTrigger`), a bound property value from XAML will override any style-set values.

If you want styles to be able to override a property, avoid setting a value for that property in XAML. Instead, use a style at the appropriate level.

## See also

- [Property system overview](/docs/properties): Overview of Avalonia property types.
- [Styles](/docs/styling/styles): How to define and apply styles.
- [Animations](/docs/graphics-animation/animations): How animations interact with properties.
- [Troubleshooting styles](/troubleshooting/ui-development/styles): Resolving common issues with styles.
