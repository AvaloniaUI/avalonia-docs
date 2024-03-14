---
id: property-setters
title: 属性设置器
---

# 属性设置器

样式中的设置器定义了在 _Avalonia UI_ 中通过选择器匹配控件并确定使用哪种样式后，将更改哪些属性。设置器是在XAML中的简单属性和值对，格式如下：

```xml
<Setter Property="propertyName" Value="newValueString"/>
```

例如：

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

您也可以使用长格式语法将控件属性设置为具有多个设置的对象，如下所示：

```xml
<Setter Property="MyProperty">
   <MyObject Property1="My Value" Property2="999"/>
</Setter>
```

样式还可以使用绑定来设置属性。在常规选择过程之后，这将使 _Avalonia UI_ 使用目标控件的数据上下文中的值。例如，可以这样定义设置器：

```xml
<Setter Property="FontSize" Value="{Binding SelectedFontSize}"/>
```

## 样式优先级

当选择器匹配多个样式时，有两个规则来决定哪个属性设置器具有优先权：

* 应用程序中包含样式集合的位置 - `closest` 优先级高。
* 样式在定位的样式集合中的位置 - `latest` 优先级高。

例如，首先意味着在窗口级别定义的样式将覆盖在应用程序级别定义的样式。其次，这意味着如果所选样式集位于同一级别，则后面的定义（按照文件中的书写顺序）优先。

:::warning
如果将样式类比为CSS，请注意：**与CSS不同**，在 _Avalonia UI_ 中，`Classes` 属性中类名的列表顺序对设置器优先级没有影响。也就是说，如果这两个样式类都设置了颜色，那么这两种类名的列举方式结果是相同的：

```
<Button Classes="h1 blue"/>
<Button Classes="blue h1"/>
```
:::

## 值还原

当样式与控件匹配时，所有设置器都将应用于控件。如果样式选择器导致样式不再与控件匹配，属性值将恢复为下一个优先级更高的值。

## 可变值

请注意，`Setter` 创建了一个将应用于所有与样式匹配的控件的 `Value` 的单个实例：如果对象是可变的，则更改将反映在所有控件上。

还要注意，在设置器值中定义的对象上的绑定将无法访问目标控件的数据上下文。这是因为可能有多个目标控件。这种情况可能在像这样定义的样式中出现：

```xml
<Style Selector="local|MyControl">
  <Setter Property="MyProperty">
     <MyObject Property1="{Binding MyViewModelProperty}"/>
  </Setter>
</Style>
```

这意味着在上面的示例中，设置器的绑定源将是 `MyObject.DataContext`，而不是 `MyControl.DataContext`。此外，如果 `MyObject` 没有数据上下文，则绑定将无法生成值。

注意：如果您使用编译后的绑定，需要在 `<Style>` 元素中显式设置绑定源的数据类型：

```xml
<Style Selector="MyControl" x:DataType="MyViewModelClass">
  <Setter Property="ControlProperty" Value="{Binding MyViewModelProperty}" />
</Style>
```

:::info
For more information about compiled bindings, see here. --> TO DO
:::

## 设置器数据模板

如前面所述，当使用没有**数据模板**的设置器时，将创建一个设置器值的单个实例，并在所有匹配的控件之间共享。要根据数据模板更改值，请将目标控件放置在模板元素内，如下所示：

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
有关**数据模板**背后的概念信息，请参见[此处](../../concepts/templates)。
:::
