---
id: style-selectors
title: Style Selectors
---

Avalonia uses style selectors to match controls using a custom XAML syntax that is similar to CSS (Cascading Style Sheets). Selectors determine which controls a style applies to.

## Selector Quick Reference

| Selector | Description |
|---|---|
| `Button` | Selects all `Button` controls. |
| `Button.red` | Selects all `Button` controls with the `red` style class. |
| `Button.red.large` | Selects all `Button` controls with both `red` and `large` style classes. |
| `Button:focus` | Selects all `Button` controls with the `:focus` pseudo-class active. |
| `Button.red:focus` | Selects all `Button` controls with the `red` class and `:focus` pseudo-class. |
| `Button#myButton` | Selects the `Button` with `Name="myButton"`. |
| `StackPanel Button.xl` | Selects `Button.xl` controls that are descendants (any depth) of a `StackPanel`. |
| `StackPanel > Button.xl` | Selects `Button.xl` controls that are direct children of a `StackPanel`. |
| `Button /template/ ContentPresenter` | Selects `ContentPresenter` controls inside a `Button` control template. |
| `:is(Button)` | Selects controls that are `Button` or derive from `Button`. |
| `:not(Button.red)` | Selects controls that do not match `Button.red`. |
| `Button:nth-child(2n+1)` | Selects odd-numbered `Button` controls among their siblings. |

## How Selectors Work

A style selector is specified on the `Selector` attribute of a `Style`:

```xml
<Style Selector="Button.primary:pointerover">
    <Setter Property="Background" Value="DarkBlue" />
</Style>
```

This selector targets all `Button` controls with the `primary` style class when the pointer is hovering over them. Multiple parts compose left to right:

1. `Button` matches the control type
2. `.primary` matches a style class
3. `:pointerover` matches a pseudo-class (state)

## Selector Specificity

When multiple styles match the same control, the more specific selector wins. Specificity is determined by (in order of priority):

1. Name selectors (`#name`) are most specific
2. Property and pseudo-class selectors (`:pointerover`, `[IsEnabled=True]`)
3. Style class selectors (`.primary`)
4. Type selectors (`Button`)
5. Descendant/child combinators are resolved by position in the tree

If two selectors have equal specificity, the one declared later wins.

## Full Reference

For a complete description of all selector formats, operators, and combinators, see the [Style Selector Syntax](/docs/styling/style-selector-syntax) reference.

## See Also

- [Style Selector Syntax](/docs/styling/style-selector-syntax): Complete syntax reference.
- [Styles](/docs/styling/styles): How to define and apply styles.
- [Style Classes](/docs/styling/style-classes): Working with style classes.
- [Pseudo-Classes](/docs/styling/pseudoclasses): State-based pseudo-class selectors.
