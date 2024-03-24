---
id: binding-to-controls
title: How To Bind to a Control
---


# How To Bind to a Control

With _Avalonia UI_, as well as binding to a data context you can also bind one control directly to another.

:::info
Note that this technique does not use a data context at all. When you do this, you are binding directly to another control itself.
:::

## Binding to a Named Control

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

_Avalonia UI_ supports both syntaxes.

## Binding to an Ancestor

You can bind to the (logical control tree) parent of the target using the `$parent` syntax:

```xml
<Border Tag="Hello World!">
  <TextBlock Text="{Binding $parent.Tag}"/>
</Border>
```

Or to any level of ancestor by using an index with the `$parent` syntax:

```xml
<Border Tag="Hello World!">
  <Border>
    <TextBlock Text="{Binding $parent[1].Tag}"/>
  </Border>
</Border>
```

The index is zero based so `$parent[0]` is equivalent to `$parent`.

You can also bind to the closest ancestor of a given type, like this:

```xml
<Border Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[Border].Tag}"/>
  </Decorator>
</Border>
```

Finally, you can combine the index and the type:

```xml
<Border Tag="Hello World!">
  <Border>
    <Decorator>
    <TextBlock Text="{Binding $parent[Border;1].Tag}"/>
    </Decorator>
  </Border>
</Border>
```

If you need to include a XAML namespace in the ancestor type, you separate the namespace and class using a colon, like this:

```xml
<local:MyControl Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[local:MyControl].Tag}"/>
  </Decorator>
</local:MyControl>
```

'To access a property of a parent's `DataContext` it will be necessary to cast it with a casting expression `(vm:MyUserControlViewModel)DataContext` to its actual type. Otherwise `DataContext` would be considered as of type `object` and accessing a custom property would result in an compile-time error.

```xml
<local:MyControl Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[local:MyControl].((vm:MyUserControlViewModel)DataContext).CustomProperty}"/>
  </Decorator>
</local:MyControl>
```

:::warning
_Avalonia UI_ also supports WPF/UWP's `RelativeSource` syntax which does something similar, but is _not_ the same. `RelativeSource` works on the _visual_ tree whereas the syntax given here works on the _logical_ tree.
:::
