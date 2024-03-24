---
description: REFERENCE
---

# 内置数据绑定转换器

_Avalonia UI_ 包含许多用于常见场景的内置数据绑定转换器：

| 转换器                                 | 描述                                      |
|-------------------------------------|-----------------------------------------|
| 否定运算符                               | 可以将 `!` 运算符放在数据绑定路径前面，返回布尔值的反转。参见下面的备注。 |
| `StringConverters.IsNullOrEmpty`    | 如果输入字符串为 null 或空字符串，则返回 `true`。         |
| `StringConverters.IsNotNullOrEmpty` | 如果输入字符串不为 null 且不为空字符串，则返回 `false`。     |
| `ObjectConverters.IsNull`           | 如果输入对象为 null，则返回 `true`。                |
| `ObjectConverters.IsNotNull`        | 如果输入对象不为 null，则返回 `false`。              |
| `BoolConverters.And`                | 这是一个多值转换器，如果所有输入值都为 `true`，则返回 true。    |
| `BoolConverters.Or`                 | 这是一个多值转换器，如果任何输入值为 `true`，则返回 true。     |

## 否定运算符示例

这个例子展示了当绑定的值为false时，文本块的情况：

```xml
<StackPanel>
  <TextBox Name="input" IsEnabled="{Binding AllowInput}"/>
  <TextBlock IsVisible="{Binding !AllowInput}">Input is not allowed</TextBlock>
</StackPanel>
```

否定运算符在绑定到非布尔值时也可以工作。这是因为绑定的值首先会被转换为布尔值（使用函数`Convert.ToBoolean`），然后结果会被取反。

例如，整数零会被转换为false（通过函数`Convert.ToBoolean`），而其他所有整数值都会被转换为true，因此你可以使用否定运算符来在集合为空时显示一条消息，像这样：

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}"/>
  <TextBlock IsVisible="{Binding !Items.Count}">No results found</TextBlock>
</Panel>
```

你也可以连续使用否定运算符两次。例如，在你想要将整数转换为布尔值，然后对该值取反时，可以这样写：

你可以使用这种方式来在集合为空时隐藏一个控件（计数为零），像这样：

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}" IsVisible="{Binding !!Items.Count}"/>
</Panel>
```

## 其他转换示例

这个绑定示例将在绑定的文本为null或空字符串时隐藏文本块：

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, 
                       Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

而这个示例将在绑定的对象为null或为空时隐藏内容控件：

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, 
                            Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

## 更多信息


:::info
你可以查看 Avalonia UI 的[值转换器示例](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample)。
:::
