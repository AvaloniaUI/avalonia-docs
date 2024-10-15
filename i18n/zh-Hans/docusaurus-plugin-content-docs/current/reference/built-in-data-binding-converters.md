---
description: REFERENCE
---

# 内置数据绑定转换器

_Avalonia UI_ 包含许多用于常见场景的内置数据绑定转换器：

| 转换器                              | 描述                                                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 取反运算符                         | 可以在数据绑定路径前面放置 ! 运算符以返回布尔值的反值。另请参见下面的注释。                                                        |
| `StringConverters.IsNullOrEmpty`    | 如果输入字符串为空或为 null，则返回 `true`                                                                                         |
| `StringConverters.IsNotNullOrEmpty` | 如果输入字符串为空或为 null，则返回 `false`                                                                                        |
| `ObjectConverters.IsNull`           | 如果输入为 null，则返回 `true`                                                                                                     |
| `ObjectConverters.IsNotNull`        | 如果输入为 null，则返回 `false`                                                                                                    |
| `BoolConverters.And`                | 一个多值转换器，如果所有输入都为 true，则返回 `true`                                                                             |
| `BoolConverters.Or`                 | 一个多值转换器，如果任何输入为 true，则返回 `true`                                                                               |

## 取反运算符示例

此示例显示当绑定值为 false 时的 `TextBlock`：

```xml
<StackPanel>
  <TextBox Name="input" IsEnabled="{Binding AllowInput}"/>
  <TextBlock IsVisible="{Binding !AllowInput}">不允许输入</TextBlock>
</StackPanel>
```

当您绑定到非布尔值时，取反运算符也有效。这是因为绑定值首先转换为布尔值（使用函数 `Convert.ToBoolean`），然后结果被取反。

例如，由于整数零被转换为 false（通过函数 `Convert.ToBoolean`），而所有其他整数值被转换为 true，您可以使用取反运算符在集合为空时显示消息，如下所示：

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}"/>
  <TextBlock IsVisible="{Binding !Items.Count}">未找到结果</TextBlock>
</Panel>
```

您还可以使用取反运算符两次。例如，当您希望执行从整数到布尔值的转换，然后取反该值时。

您可以使用此方法在集合为空（计数为零）时隐藏控件，如下所示：

```xml
<Panel>
  <ListBox ItemsSource="{Binding Items}" IsVisible="{Binding !!Items.Count}"/>
</Panel>
```

## 其他转换示例

此示例绑定将在绑定文本为空或为 null 时隐藏文本块：

```xml
<TextBlock Text="{Binding MyText}"
           IsVisible="{Binding MyText, 
                       Converter={x:Static StringConverters.IsNotNullOrEmpty}}"/>
```

此示例将在绑定对象为空或为 null 时隐藏内容控件：

```xml
<ContentControl Content="{Binding MyContent}"
                IsVisible="{Binding MyContent, 
                            Converter={x:Static ObjectConverters.IsNotNull}}"/>
```

## 更多信息

:::info
您可以在 [这里](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample) 查看 Avalonia UI 值转换器示例。
:::

