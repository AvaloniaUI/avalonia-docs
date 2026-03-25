---
id: property-value-inheritance
title: Property value inheritance
description: How Avalonia properties propagate values from parent to descendant elements in the visual tree, including built-in inherited properties and creating custom ones.
doc-type: concept
---

Property value inheritance allows a property value set on a parent element to propagate down to its descendants in the visual tree, without each descendant needing to set the value explicitly. This is commonly used for properties like `FontSize`, `FontFamily`, `Foreground`, and `FlowDirection`.

## How it works

When an Avalonia property is registered with `inherits: true`, the property system checks ancestor elements in the visual tree if no local, styled, or animated value is set on the current element. The first ancestor that has a value for the property provides the inherited value.

Inherited values have the lowest priority in the [value precedence](value-precedence) system (just above `Unset`). A local value, style, or animation on a child will always override an inherited value.

## Built-in inherited properties

Several common properties in Avalonia are registered as inherited:

| Property | Defined On | Effect |
|---|---|---|
| `FontFamily` | [`TextElement`](/api/avalonia/controls/documents/textelement) | Text controls inherit the font family from their parent. |
| `FontSize` | `TextElement` | Text controls inherit the font size from their parent. |
| `FontStyle` | `TextElement` | Text controls inherit the font style (italic, normal). |
| `FontWeight` | `TextElement` | Text controls inherit the font weight (bold, normal). |
| `Foreground` | `TextElement` | Text controls inherit the foreground brush. |
| `LetterSpacing` | `TextElement` | Text controls inherit the spacing between characters. |
| `FlowDirection` | `Visual` | Controls inherit left-to-right or right-to-left layout direction. |
| `DataContext` | `StyledElement` | Controls inherit their data context from their parent. |
| `RequestedThemeVariant` | `ThemeVariantScope` | Controls inherit the requested theme variant (light/dark). |

## Example

Setting `FontSize` on a parent element applies that value to all descendant text controls that do not set their own `FontSize`:

```xml
<StackPanel FontSize="18">
    <!-- Inherits FontSize="18" -->
    <TextBlock Text="Large text" />

    <!-- Overrides with its own FontSize -->
    <TextBlock Text="Small text" FontSize="12" />

    <!-- Also inherits FontSize="18" -->
    <Button Content="Large button text" />
</StackPanel>
```

## Creating an inherited property

To create a custom property that inherits its value, set `inherits: true` when registering:

```csharp
public class MyControl : Control
{
    public static readonly StyledProperty<bool> IsCompactProperty =
        AvaloniaProperty.Register<MyControl, bool>(
            nameof(IsCompact),
            defaultValue: false,
            inherits: true);

    public bool IsCompact
    {
        get => GetValue(IsCompactProperty);
        set => SetValue(IsCompactProperty, value);
    }
}
```

Now any descendant of `MyControl` can read the `IsCompact` value. If the descendant is also a `MyControl` (or has added ownership of the property), it automatically receives the inherited value.

### Making the property available to descendants

For descendants of different types to read the inherited property, they need to register ownership:

```csharp
public class MyChildControl : Control
{
    public static readonly StyledProperty<bool> IsCompactProperty =
        MyControl.IsCompactProperty.AddOwner<MyChildControl>();

    public bool IsCompact
    {
        get => GetValue(IsCompactProperty);
        set => SetValue(IsCompactProperty, value);
    }
}
```

## Inheritance and `DataContext`

`DataContext` is one of the most important inherited properties. When you set a `DataContext` on a `Window`, all controls within that window inherit it:

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new MainWindowViewModel();
    }
}
```

```xml
<!-- All controls in the window inherit the DataContext -->
<Window>
    <StackPanel>
        <!-- Binds to MainWindowViewModel.Name -->
        <TextBlock Text="{Binding Name}" />

        <!-- Binds to MainWindowViewModel.Email -->
        <TextBox Text="{Binding Email}" />
    </StackPanel>
</Window>
```

## See also

- [Property System Overview](index): Overview of property types and registration.
- [Value Precedence](value-precedence): How inherited values fit into the priority order.
- [Data Context](/docs/data-binding/data-context): How the DataContext inherited property works with data binding.
