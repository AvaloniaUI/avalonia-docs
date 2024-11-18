---
id: property-setters
title: Property Setters
---

# Property Setters

The setters in a style define what properties will be changed after _Avalonia UI_ has matched the control in the logical control tree using the selector, and determined which style is to be used. Setters are simple property and value attribute pairs in the XAML, written in the format:

```xml
<Setter Property="propertyName" Value="newValueString"/>
```

For example:

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

You can also use a long-form syntax to set a control property to an object with several properties set, like this:

```xml
<Setter Property="MyProperty">
   <MyObject Property1="My Value" Property2="999"/>
</Setter>
```

A style can also set properties using bindings. After the usual selection process, this causes _Avalonia UI_ to use a value from data context of the target control. For example, the setter can be defined like this:

```xml
<Setter Property="FontSize" Value="{Binding SelectedFontSize}"/>
```

## Style Priority

There are two rules that govern which property setter has precedence when a selector matches multiple styles:

* Position of the enclosing styles collection in the application - 'closest' has priority.
* Position of the style in the located styles collection - 'latest' has priority.

For example, firstly this means that styles defined at window level will override those defined at application level. Secondly, this means that where the selected style collections are at the same level, then the later definition (as written in the file) has priority.

:::warning
If you were comparing style classes to CSS you must note that: **unlike CSS**, the list sequence of class names in the `Classes` attribute has no effect on setter priority in _Avalonia UI_. That is, if both these style classes set the colour, then either way of listing the classes has the same result:

```
<Button Classes="h1 blue"/>
<Button Classes="blue h1"/>
```
:::

## Value Reversion

Whenever a style is matched with a control, all of the setters will be applied to the control. If a style selector causes the style to no longer match a control, the property value will revert to the its next highest priority value.

## Mutable Values

Note that the `Setter` creates a single instance of `Value` which will be applied to all controls that the style matches: if the object is mutable then changes will be reflected on all controls.

Also note that bindings on an object defined in a setter value will not have access to the target control's data context. This is because there may be multiple target controls. This scenario may arise with a style defined like this:

```xml
<Style Selector="local|MyControl">
  <Setter Property="MyProperty">
     <MyObject Property1="{Binding MyViewModelProperty}"/>
  </Setter>
</Style>
```

This means that in the example above, the binding source for the setter will be `MyObject.DataContext`, and not `MyControl.DataContext`. Also if `MyObject` has no data context then the binding will unable to produce a value.

Note: if you are using compiled bindings, you need to explicitly set the data type of the binding source in the `<Style>` element:

```xml
<Style Selector="MyControl" x:DataType="MyViewModelClass">
  <Setter Property="ControlProperty" Value="{Binding MyViewModelProperty}" />
</Style>
```

:::info
For more information about compiled bindings, see here. --> TO DO
:::

## Setter Data Templates

As previously described here, when you use a setter without a **data template**, a single instance of the setter value is created and shared across all matching controls. To change the value depending on a data template, you place the target control inside a template element, like this:

```xml
<Style Selector="Border.empty">
  <Setter Property="Child">
    <Template>
      <TextBlock>No content available.</TextBlock>
    </Template>
  </Setter>
</Style>
```

:::info
For information about the concepts behind a **data template**, see [here](../../concepts/templates).
:::
