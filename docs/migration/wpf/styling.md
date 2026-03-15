---
id: styling
title: Styling
description: Key differences between WPF and Avalonia styling, including selectors, style classes, and themes.
doc-type: migration
---

Avalonia's styling system is one of the biggest conceptual shifts when migrating from WPF. Instead of the resource-dictionary-based approach used in WPF, Avalonia adopts a CSS-like styling model with selectors, style classes, and pseudo-classes. This guide walks through the key differences and shows practical migration patterns for each area.

## Style declaration

In WPF, styles are defined as resources and referenced by type or key. In Avalonia, styles live in a dedicated [`Styles`](/api/avalonia/styling/styles) collection and use CSS-like selectors to target controls.

**WPF:**

```xml
<Window.Resources>
    <Style TargetType="Button">
        <Setter Property="Background" Value="SteelBlue"/>
        <Setter Property="Foreground" Value="White"/>
    </Style>
</Window.Resources>
```

**Avalonia:**

```xml
<Window.Styles>
    <Style Selector="Button">
        <Setter Property="Background" Value="SteelBlue"/>
        <Setter Property="Foreground" Value="White"/>
    </Style>
</Window.Styles>
```

Key differences:

| Aspect | WPF | Avalonia |
|---|---|---|
| Storage location | `Resources` dictionary | `Styles` collection |
| Targeting mechanism | `TargetType` attribute | `Selector` attribute (CSS-like) |
| Scope | Applies to the visual tree below the resource | Applies to the visual tree below the `Styles` owner |
| Inheritance model | Resource lookup walks up the tree | Styles are matched top-down by selector specificity |

## Selectors vs TargetType

WPF uses `TargetType` to match a style to a control type. Avalonia replaces this with a CSS-inspired selector syntax. Selectors can target by type, class, name, property state, nesting, and more.

**WPF (target all TextBlocks):**

```xml
<Style TargetType="TextBlock">
    <Setter Property="Foreground" Value="Gray"/>
</Style>
```

**Avalonia (target all TextBlocks):**

```xml
<Style Selector="TextBlock">
    <Setter Property="Foreground" Value="Gray"/>
</Style>
```

**Avalonia (target TextBlocks inside a StackPanel):**

```xml
<Style Selector="StackPanel > TextBlock">
    <Setter Property="Foreground" Value="Gray"/>
</Style>
```

**Avalonia (target a named control):**

```xml
<Style Selector="TextBlock#MyHeader">
    <Setter Property="FontSize" Value="24"/>
</Style>
```

Common selector patterns:

| Selector | Meaning |
|---|---|
| `Button` | All Button controls |
| `Button.primary` | Buttons with the `primary` style class |
| `StackPanel > Button` | Buttons that are direct children of a StackPanel |
| `Button:pointerover` | Buttons in the pointer-over state |
| `Button:not(:disabled)` | Buttons that are not disabled |
| `TextBlock#title` | A TextBlock with `Name="title"` |
| `Button.primary:pointerover` | Primary buttons in the pointer-over state |

For the full selector reference, see [Style Selectors](/docs/styling/style-selectors).

## Style classes vs x:Key

In WPF, you differentiate styles of the same control type by assigning an `x:Key` and then referencing it with `Style="{StaticResource MyStyle}"`. Avalonia uses **style classes** instead, which work like CSS classes.

**WPF:**

```xml
<Window.Resources>
    <Style x:Key="PrimaryButton" TargetType="Button">
        <Setter Property="Background" Value="SteelBlue"/>
        <Setter Property="Foreground" Value="White"/>
    </Style>
</Window.Resources>

<Button Style="{StaticResource PrimaryButton}" Content="Save"/>
```

**Avalonia:**

```xml
<Window.Styles>
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="SteelBlue"/>
        <Setter Property="Foreground" Value="White"/>
    </Style>
</Window.Styles>

<Button Classes="primary" Content="Save"/>
```

A control can have multiple classes applied simultaneously, and classes can be toggled dynamically:

```xml
<Button Classes="primary large" Content="Save"/>
```

You can also toggle classes in code-behind:

```csharp
myButton.Classes.Add("active");
myButton.Classes.Remove("active");
```

This approach eliminates the need to manage resource keys and provides a more flexible composition model.

## Triggers to pseudo-classes

WPF uses `Trigger`, `DataTrigger`, and `EventTrigger` elements inside a style. Avalonia replaces all of these with **pseudo-classes** and selector-based matching.

### Property triggers to pseudo-classes

**WPF (property trigger):**

```xml
<Style TargetType="Button">
    <Setter Property="Background" Value="Gray"/>
    <Style.Triggers>
        <Trigger Property="IsMouseOver" Value="True">
            <Setter Property="Background" Value="LightBlue"/>
        </Trigger>
        <Trigger Property="IsPressed" Value="True">
            <Setter Property="Background" Value="DarkBlue"/>
        </Trigger>
    </Style.Triggers>
</Style>
```

**Avalonia (pseudo-classes):**

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="Gray"/>
</Style>
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="LightBlue"/>
</Style>
<Style Selector="Button:pressed">
    <Setter Property="Background" Value="DarkBlue"/>
</Style>
```

Common pseudo-class mappings from WPF:

| WPF Trigger Property | Avalonia Pseudo-Class |
|---|---|
| `IsMouseOver` | `:pointerover` |
| `IsPressed` | `:pressed` |
| `IsEnabled="False"` | `:disabled` |
| `IsChecked="True"` | `:checked` |
| `IsFocused` | `:focus` |
| `IsSelected` | `:selected` |
| `IsExpanded` | `:expanded` |

For the full list, see [Pseudo-Classes](/docs/styling/pseudoclasses).

### DataTrigger migration

WPF `DataTrigger` elements apply setters based on data binding values. In Avalonia, there is no direct equivalent. Instead, use one of these approaches depending on the scenario.

**Option 1: Bind directly with a converter.**

Use this when a single property needs to change based on a bound value:

```xml
<TextBlock Text="{Binding Status}"
           Foreground="{Binding Status, Converter={StaticResource StatusToColorConverter}}"/>
```

**Option 2: Use a style selector with a style class.**

If your ViewModel exposes a property that maps to a visual state, set a style class from code-behind or use a behavior, then target it with a selector:

```xml
<Style Selector="Border.error">
    <Setter Property="BorderBrush" Value="Red"/>
    <Setter Property="BorderThickness" Value="2"/>
</Style>
```

**Option 3: Use container queries for size-based triggers.**

In WPF, a common pattern is binding `DataTrigger` to `ActualWidth` or `ActualHeight` (often through a converter) to adapt layout at different sizes. Avalonia provides container queries as a purpose-built replacement for this pattern.

**WPF (DataTrigger on ActualWidth):**

```xml
<Style TargetType="UniformGrid">
    <Setter Property="Columns" Value="3"/>
    <Style.Triggers>
        <DataTrigger Binding="{Binding ActualWidth,
                     RelativeSource={RelativeSource AncestorType=Border},
                     Converter={StaticResource LessThanConverter},
                     ConverterParameter=600}"
                     Value="True">
            <Setter Property="Columns" Value="1"/>
        </DataTrigger>
    </Style.Triggers>
</Style>
```

**Avalonia (container query):**

```xml
<Border Container.Name="main" Container.Sizing="Width">
    <Border.Styles>
        <Style Selector="UniformGrid#cards">
            <Setter Property="Columns" Value="3"/>
        </Style>
        <ContainerQuery Name="main" Query="max-width:600">
            <Style Selector="UniformGrid#cards">
                <Setter Property="Columns" Value="1"/>
            </Style>
        </ContainerQuery>
    </Border.Styles>

    <UniformGrid x:Name="cards">
        <!-- content -->
    </UniformGrid>
</Border>
```

Container queries eliminate the need for converters and `RelativeSource` bindings. They can also target multiple properties at once and combine width and height conditions. See [Container queries](/docs/styling/container-queries) for the full syntax and [Responsive layouts](/docs/layout/responsive-layouts) for guidance on building adaptive UIs.

### EventTrigger to animations on pseudo-classes

WPF `EventTrigger` elements start animations in response to routed events. In Avalonia, animations are defined within styles and activated by pseudo-classes or style classes.

**WPF:**

```xml
<Style TargetType="Border">
    <Style.Triggers>
        <EventTrigger RoutedEvent="MouseEnter">
            <BeginStoryboard>
                <Storyboard>
                    <DoubleAnimation Storyboard.TargetProperty="Opacity"
                                     To="1" Duration="0:0:0.3"/>
                </Storyboard>
            </BeginStoryboard>
        </EventTrigger>
    </Style.Triggers>
</Style>
```

**Avalonia:**

```xml
<Style Selector="Border">
    <Setter Property="Opacity" Value="0.5"/>
    <Setter Property="Transitions">
        <Transitions>
            <DoubleTransition Property="Opacity" Duration="0:0:0.3"/>
        </Transitions>
    </Setter>
</Style>
<Style Selector="Border:pointerover">
    <Setter Property="Opacity" Value="1"/>
</Style>
```

Avalonia uses a `Transitions` system where you declare which properties should animate and their duration. The animation triggers automatically when the property value changes due to a style or pseudo-class change.

## ControlTheme vs implicit styles

In WPF, an implicit style (a `Style` with `TargetType` but no `x:Key`) defines the default look for a control, including its `ControlTemplate`. In Avalonia, this role is filled by [`ControlTheme`](/api/avalonia/styling/controltheme).

A `ControlTheme` is the mechanism for creating "lookless" control templates. It is stored in the `Resources` dictionary (not in the `Styles` collection) and is looked up by type.

**WPF (implicit style with template):**

```xml
<Style TargetType="Button">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="Button">
                <Border Background="{TemplateBinding Background}"
                        CornerRadius="4"
                        Padding="{TemplateBinding Padding}">
                    <ContentPresenter HorizontalAlignment="Center"
                                      VerticalAlignment="Center"/>
                </Border>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

**Avalonia (ControlTheme):**

```xml
<ControlTheme x:Key="{x:Type Button}" TargetType="Button">
    <Setter Property="Template">
        <ControlTemplate>
            <Border Background="{TemplateBinding Background}"
                    CornerRadius="4"
                    Padding="{TemplateBinding Padding}">
                <ContentPresenter HorizontalAlignment="Center"
                                  VerticalAlignment="Center"/>
            </Border>
        </ControlTemplate>
    </Setter>

    <Style Selector="^:pointerover">
        <Setter Property="Background" Value="LightBlue"/>
    </Style>
    <Style Selector="^:pressed">
        <Setter Property="Background" Value="DarkBlue"/>
    </Style>
</ControlTheme>
```

Key points about `ControlTheme`:

- It lives in `Resources`, not `Styles`.
- The key is typically `{x:Type ControlType}` so it is automatically applied to all instances of that type.
- Nested styles within a `ControlTheme` use the `^` selector to refer to the templated control itself.
- Unlike CSS-like `Style`, a `ControlTheme` does **not** cascade. Only one `ControlTheme` applies to a control at a time.

For more details, see [Control Themes](/docs/styling/control-themes).

## TemplateBinding

Both WPF and Avalonia support `TemplateBinding` to wire template elements to the templated control's properties. However, there is an important difference:

| Aspect | WPF | Avalonia |
|---|---|---|
| Binding direction | Two-way by default | **OneWay only** |
| Workaround for two-way | Not needed | Use a regular `Binding` with `RelativeSource={RelativeSource TemplatedParent}` |

If you need two-way binding inside a control template in Avalonia, replace:

```xml
<!-- OneWay only in Avalonia -->
<TextBox Text="{TemplateBinding SearchText}"/>
```

with:

```xml
<!-- Two-way binding in a template -->
<TextBox Text="{Binding SearchText, RelativeSource={RelativeSource TemplatedParent}, Mode=TwoWay}"/>
```

## See also

- [Styles](/docs/styling/styles)
- [Control Themes](/docs/styling/control-themes)
- [Pseudo-Classes](/docs/styling/pseudoclasses)
- [Style Selectors](/docs/styling/style-selectors)
- [Container queries](/docs/styling/container-queries): Size-based styling, replacing WPF DataTrigger patterns on ActualWidth/ActualHeight.
- [Responsive layouts](/docs/layout/responsive-layouts): Building adaptive layouts with container queries and reflowing panels.
