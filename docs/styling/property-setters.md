---
id: property-setters
title: Property setters
description: Define property values in styles using setters, bindings, templates, and understand setter precedence rules.
doc-type: reference
---

Property setters define what property values a style applies to a control after Avalonia has matched it using a selector.

## Basic usage

Setters are property and value attribute pairs written in XAML in the format:

```xml
<Setter Property="propertyName" Value="newValueString"/>
```

For example:

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

You can also use a long-form syntax to set a control property to an object with several properties, like this:

```xml
<Setter Property="MyProperty">
   <MyObject Property1="My Value" Property2="999"/>
</Setter>
```

A style can also set properties using bindings. After the usual selection process, this causes Avalonia to use a value from the data context of the target control. For example:

```xml
<Setter Property="FontSize" Value="{Binding SelectedFontSize}"/>
```

:::caution
Bindings in setters resolve against the **target control's** `DataContext`. Styles declared inside `<Application.Styles>` still bind against the matched control's `DataContext`, not a `DataContext` set on `Application` itself. `Application` is not part of the visual or logical tree, so setting `DataContext` on it has no effect on setter bindings.

If you need to apply configurable values (such as user-chosen colors) at the application level, use `DynamicResource` references together with runtime resource updates instead of data bindings. See [Resources overview](/docs/app-development/resources) and [How to switch themes](/docs/how-to/theme-switching-how-to) for details.
:::

## Style priority

There are two rules that govern which property setter has precedence when a selector matches multiple styles:

* Position of the enclosing styles collection in the application - 'closest' has priority.
* Position of the style in the located styles collection - 'latest' has priority.

Firstly, this means that styles defined closer to the control will be applied, e.g., styles at window level will override those defined at application level. Secondly, this means that where the selected style collections are at the same level, then the later definition (as written in the file) has priority.

:::caution
**Unlike CSS**, the list sequence of class names in the `Classes` attribute has no effect on setter priority in Avalonia. If both these style classes set the color, then either way of listing the classes has the same result:

```xml
<Button Classes="h1 blue"/>
<Button Classes="blue h1"/>
```
:::

## Value reversion

Whenever a style is matched with a control, all of the setters will be applied to the control. If a style selector causes the style to no longer match a control, the property value will revert to its next highest priority value.

See [Property value precedence](/docs/properties/value-precedence) for the full property priority rules.

## Mutable values

[`Setter`](/api/avalonia/styling/setter) creates a single instance of `Value`, which will be applied to all controls that the style matches. If the object is mutable, changes will be reflected on all controls.

Bindings on an object defined in a setter value will not have access to the target control's data context because there may be multiple target controls. This scenario may arise with a style defined like this:

```xml
<Style Selector="MyControl" x:DataType="MyViewModelClass">
  <Setter Property="MyProperty">
     <MyObject Property1="{Binding MyViewModelProperty}"/>
  </Setter>
</Style>
```

In the example above, the binding source for the setter will be `MyObject.DataContext`, and not `MyControl.DataContext`. If `MyObject` has no data context, the binding will be unable to produce a value.

## Setter data templates

As described in the section above, if you use a setter without a **data template**, a single instance of the setter value is created and shared across all matching controls. To change the value depending on a data template, place the target control inside a template element, like this:

```xml
<Style Selector="Border.empty">
  <Setter Property="Child">
    <Template>
      <TextBlock>No content available.</TextBlock>
    </Template>
  </Setter>
</Style>
```

## Setter precedence

Avalonia `Setters` are applied in order of [`BindingPriority`](/api/avalonia/data/bindingpriority), then visual tree locality, and finally the `Styles` collection order. Precedence applies individually to each `StyledProperty` so that styling can benefit from composition. `DirectProperty` and CLR properties cannot be styled and therefore do not participate in precedence.

`BindingPriority` cannot be explicitly set in XAML. For the full priority list, see [Property value precedence](/docs/properties/value-precedence).

## Visual tree locality

Setters with equal `BindingPriority` are then selected by their location in the visual tree relative to the `Control`. The 
setter with the fewest nodes required to traverse upwards to locate will take precedence. Inline style setters have 
the highest precedence for this step.

```xml
<Window>
    <Window.Styles>
        <Style Selector="Button">
            <Setter Property="FontSize" Value="16" />
            <Setter Property="Foreground" Value="Red" />
        </Style>
    </Window.Styles>
    <StackPanel>
        <StackPanel.Styles>
            <Style Selector="Button">
                <Setter Property="FontSize" Value="24" />
            </Style>
        </StackPanel.Styles>

        <Button Content="This Has FontSize=24 with Foreground=Red" />
    </StackPanel>
</Window>
```

## Styles collection order

When `BindingPriority` and visual tree locality are both equal, the final decider is the order within the `Styles` 
collection. The last applicable `Setter` will take precedence.

```xml
<StackPanel>
    <StackPanel.Styles>
        <Style Selector="Button.small">
            <Setter Property="FontSize" Value="12" />
        </Style>
        <Style Selector="Button.big">
            <Setter Property="FontSize" Value="24" />
        </Style>
    </StackPanel.Styles>

    <Button Classes="small big" Content="This Has FontSize=24" />
    <Button Classes="big small" Content="This Also Has FontSize=24" />
</StackPanel>
```

:::info
These buttons specify their `Classes` in different orders. This has no effect on setter precedence in Avalonia.
:::

## See also

- [Styles](/docs/styling/styles)
- [Property value precedence](/docs/properties/value-precedence)
- [Control themes](/docs/styling/control-themes)