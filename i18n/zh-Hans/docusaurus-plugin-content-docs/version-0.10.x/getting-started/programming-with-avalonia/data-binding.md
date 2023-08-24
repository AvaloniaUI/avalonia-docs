---
id: data-binding
title: Data Binding
---

Avalonia includes comprehensive support for [binding](../../data-binding/bindings.md) between controls and to arbitrary .NET objects. Data binding can be set up in XAML or in code and supports:

* Multiple binding modes: one way, two way, one-time and one-way to source
* Binding to a [`DataContext`](../../data-binding/the-datacontext.md)
* Binding to [other controls](../../data-binding/binding-to-controls.md)
* Binding to [`Tasks and Observables`](../../data-binding/binding-to-tasks-and-observables.md)
* Binding [converters](../../data-binding/converting-binding-values.md) and negating binding values

The following example shows a `TextBlock` when an associated `TextBox` is disabled, by using a binding:

```markup
<StackPanel>
    <TextBox Name="input" IsEnabled="False"/>
    <TextBlock IsVisible="{Binding !#input.IsEnabled}">Sorry, no can do!</TextBlock>
</StackPanel>
```

In this example, a binding is set up to the `IsEnabled` property of the `input` control using `#input.IsEnabled` and the value of that binding is negated and fed into the `TextBlock.IsVisible` property.
