---
id: value-precedence
title: Property value precedence
---

When multiple sources provide a value for the same Avalonia property (a local value, a style setter, an animation, an inherited value), Avalonia must decide which value wins. The property system resolves this using a fixed priority order defined by the `BindingPriority` enum.

## Priority order

Values are resolved from highest priority (top) to lowest priority (bottom):

| Priority | `BindingPriority` Value | Description |
|---|---|---|
| **1 (Highest)** | `Animation` | Values applied by active animations. |
| **2** | `LocalValue` | Values set directly on the object via `SetValue`, XAML attribute, or code. |
| **3** | `StyleTrigger` | Values applied by style selectors that match a transient condition, such as a pseudo-class (`:pointerover`, `:pressed`, `:focus`). |
| **4** | `Template` | Values set within a control template. |
| **5** | `Style` | Values applied by style selectors that match the control's type or class. |
| **6** | `Inherited` | Values inherited from an ancestor element in the visual tree. |
| **7 (Lowest)** | `Unset` | No value has been set. The property's registered default value is used. |

## How precedence works

When you request a property value (via `GetValue` or a binding), the property system checks each priority level in order and returns the first value it finds.

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
- The button's `Foreground` is **Red** because `LocalValue` has higher priority than both `Style` and `StyleTrigger`.
- Even when the pointer hovers over the button, the `Foreground` remains **Red** because `LocalValue` (priority 2) outranks `StyleTrigger` (priority 3).

If you remove the local `Foreground="Red"` attribute:
- The button's `Foreground` is **Black** (from the `Style` setter) by default.
- When the pointer hovers over the button, it changes to **Blue** (from the `StyleTrigger` for `:pointerover`).

## Animations override everything

Animations have the highest priority. While an animation is active, its value overrides local values, style values, and all other sources. This ensures smooth visual transitions are never interrupted by style changes.

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

## Clearing values

When you call `ClearValue`, you remove the value at the `LocalValue` priority level. The property system then falls through to the next available source:

```csharp
// Set a local value (overrides styles)
myButton.SetValue(Button.ForegroundProperty, Brushes.Red);

// Clear the local value (styles take effect again)
myButton.ClearValue(Button.ForegroundProperty);
```

## Setting values at specific priorities

In advanced scenarios, you can set a value at a specific priority using the `SetValue` overload:

```csharp
myButton.SetValue(Button.ForegroundProperty, Brushes.Red, BindingPriority.Style);
```

This is primarily used by the styling system internally. In most application code, you set local values (the default when calling `SetValue`).

## `SetCurrentValue`

The `SetCurrentValue` method sets a value at the current highest-priority level rather than at `LocalValue`. This is useful in control implementations where you want to update a property without overriding styles:

```csharp
// Sets the value without creating a LocalValue entry
myButton.SetCurrentValue(Button.ForegroundProperty, Brushes.Green);
```

## Impact on data binding

Bindings are applied at the priority level of their source. A binding created through a style is applied at the `Style` or `StyleTrigger` level. A binding set directly in XAML is applied at the `LocalValue` level:

```xml
<!-- This binding operates at LocalValue priority -->
<Button Foreground="{Binding ButtonColor}" />
```

Because `LocalValue` bindings outrank style values, a bound property value from XAML will override any style-set values, even pseudo-class triggered styles.

:::tip
If you want styles to be able to override a property, avoid setting it directly in XAML. Instead, use a style at the appropriate level.
:::

## See also

- [Property System Overview](index): Overview of Avalonia property types.
- [Styles](/docs/styling/styles): How to define and apply styles.
- [Animations](/docs/graphics-animation/animations): How animations interact with properties.
