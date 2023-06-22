---
id: binding-to-controls
title: Binding to Controls
---

As well as binding to a control's [`DataContext`](https://docs.avaloniaui.net/docs/data-binding/the-datacontext) you can also bind to other controls.

:::info
Note that when you do this, the binding source is to the _control itself_ not the control's `DataContext`. If you want to bind to the control's `DataContext` then you'll need to specify that in the binding path.
:::

## Binding to a named control

If you want to bind to a property on another named control, you can use the control name prefixed by a `#` character.

```xml
<TextBox Name="other">

<!-- Binds to the Text property of the "other" control -->
<TextBlock Text="{Binding #other.Text}"/>
```

This is the equivalent to the long-form binding that will be familiar to WPF and UWP users:

```xml
<TextBox Name="other">
<TextBlock Text="{Binding Text, ElementName=other}"/>
```

Avalonia supports both syntaxes but the short-form `#` syntax is less verbose.

## Binding to an Ancestor

You can bind to the logical parent of the target using the `$parent` symbol:

```xml
<Border Tag="Hello World!">
  <TextBlock Text="{Binding $parent.Tag}"/>
</Border>
```

Or to an ancestor by adding an indexer to the `$parent` symbol:

```xml
<Border Tag="Hello World!">
  <Border>
    <TextBlock Text="{Binding $parent[1].Tag}"/>
  </Border>
</Border>
```

The indexer is 0-based so `$parent[0]` is equivalent to `$parent`.

You can also bind to an ancestor by type:

```xml
<Border Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[Border].Tag}"/>
  </Decorator>
</Border>
```

Finally, you can combine the indexer and the type:

```xml
<Border Tag="Hello World!">
  <Border>
    <Decorator>
    <TextBlock Text="{Binding $parent[Border;1].Tag}"/>
    </Decorator>
  </Border>
</Border>
```

If you need to include a XAML namespace in the ancestor type, you can do that using the `:` character as normal:

```xml
<local:MyControl Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[local:MyControl].Tag}"/>
  </Decorator>
</local:MyControl>
```

:::warning
Avalonia also supports WPF/UWP's `RelativeSource` syntax which does something similar, but is _not_ the same. `RelativeSource` works on the _visual_ tree whereas the syntax given here works on the _logical_ tree.
:::
