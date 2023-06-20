---
id: property-setters
title: Property Setters
---

# Property Setters

The setters in a style define what properties will be changed after _Avalonia UI_ has matched the control in the logical control tree using the the selector, and determined which style is to be used. Setters are simple property and value attribute pairs in the XAML, written in the format:

```xml
<Setter Property="propertyName" Value="newValueString"/>
```

For example:

```markup
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

You can also use a long-form syntax to set a control property to an object with several properties set, like this:

```markup
<Setter Property="MyProperty">
   <MyObject Property1="My Value" Property2="999"/>
</Setter>
```

A style can also set properties using bindings. After the usual selection process, this causes _Avalonia UI_ to use a value from data context of the target control. For example, the setter can be defined like this:

```markup
<Setter Property="FontSize" Value="{Binding SelectedFontSize}"/>
```

## Value Reversion

Whenever a style is matched with a control, all of the setters will be applied to the control.&#x20;

However, be alert to the (somewhat rare) scenario where application of the setter would cause the match to no longer be valid. For example, this scenario can occur where the selector relies on the value of a property, and the new value is in a binding.

```
<Style Selector="local|MyControl">
```

If the setter causes a match to become invalid, then that match is eliminated from the process, and selection is repeated. This means that the next match (based on **style priority**) will be used, and properties set accordingly.

{% hint style="info" %}
You can review the rules governing **style priority** on the previous page, [here](style-classes.md#style-priority).
{% endhint %}

## Mutable Values

Note that the `Setter` creates a single instance of `Value` which will be applied to all controls that the style matches: if the object is mutable then changes will be reflected on all controls.&#x20;

Also note that bindings on an object defined in a setter value will not have access to the target control's data context. This is because there may be multiple target controls. This scenario may arise with a style defined like this:

```markup
<Style Selector="local|MyControl">
  <Setter Property="MyProperty">
     <MyObject Property1="{Binding MyViewModelProperty}"/>
  </Setter>
</Style>
```

This means that in the example above, the binding source for the setter will be `MyObject.DataContext`, and not `MyControl.DataContext`. Also if `MyObject` has no data context then the binding will unable to produce a value.

Note: if you are using compiled bindings, you need to explicitly set the data type of the binding source in the `<Style>` element:

```markup
<Style Selector="MyControl" x:DataType="MyViewModelClass">
  <Setter Property="ControlProperty" Value="{Binding MyViewModelProperty}" />
</Style>
```

{% hint style="info" %}
For more information about compiled bindings, see here. --> TO DO
{% endhint %}

## Setter Data Templates <a href="#templates-in-setters" id="templates-in-setters"></a>

As previously described here, when you use a setter without a **data template**, a single instance of the setter value is created and shared across all matching controls. To change the value depending on a data template, you place the target control inside a template element, like this:

```markup
<Style Selector="Border.empty">
  <Setter Property="Child">
    <Template>
      <TextBlock>No content available.</TextBlock>
    </Template>
  </Setter>
</Style>
```

{% hint style="info" %}
For information about the concepts behind a **data template**, see [here](../../../concepts/templates/).
{% endhint %}
