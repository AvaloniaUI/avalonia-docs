---
id: binding-to-controls
title: 如何绑定到控件
---


# 如何绑定到控件

在 _Avalonia UI_ 中，除了绑定到数据上下文(DataContext)外，您还可以直接将一个控件绑定到另一个控件。

:::info
请注意，这种技术完全不使用数据上下文。在执行此操作时，您是直接将一个控件绑定到另一个控件本身。
:::

## 绑定到命名控件

如果要绑定到另一个命名控件上的属性，可以使用以 `#` 字符为前缀的控件名称。

```xml
<TextBox Name="other">

<!-- 绑定到命名为 other 控件的 Text 属性 -->
<TextBlock Text="{Binding #other.Text}"/>
```

这相当于 WPF 和 UWP 开发者熟悉的长格式绑定：

```xml
<TextBox Name="other">
<TextBlock Text="{Binding Text, ElementName=other}"/>
```

_Avalonia UI_ 支持这两种语法。

## 绑定到祖先控件

您可以使用 `$parent` 语法绑定到目标的（逻辑控件树）父级：

```xml
<Border Tag="Hello World!">
  <TextBlock Text="{Binding $parent.Tag}"/>
</Border>
```

或者使用带有 `$parent` 语法的索引绑定到任何级别的祖先：

```xml
<Border Tag="Hello World!">
  <Border>
    <TextBlock Text="{Binding $parent[1].Tag}"/>
  </Border>
</Border>
```

索引从0开始，因此 `$parent[0]` 等同于 `$parent`。

您还可以绑定到指定类型的最近祖先，如下所示：

```xml
<Border Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[Border].Tag}"/>
  </Decorator>
</Border>
```

最后，您可以结合索引和类型：

```xml
<Border Tag="Hello World!">
  <Border>
    <Decorator>
    <TextBlock Text="{Binding $parent[Border;1].Tag}"/>
    </Decorator>
  </Border>
</Border>
```

如果需要在祖先类型中包含 XAML 命名空间，则使用冒号分隔命名空间和类名，如下所示：

```xml
<local:MyControl Tag="Hello World!">
  <Decorator>
    <TextBlock Text="{Binding $parent[local:MyControl].Tag}"/>
  </Decorator>
</local:MyControl>
```

:::warning
_Avalonia UI_ 还支持 WPF/UWP 的 `RelativeSource` 语法，类似但并不相同。`RelativeSource` 在 _视觉_ 树上起作用，而此处给出的语法在 _逻辑_ 树上起作用。
:::
