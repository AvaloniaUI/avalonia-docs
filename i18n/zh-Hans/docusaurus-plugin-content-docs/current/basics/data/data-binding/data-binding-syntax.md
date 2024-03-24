---
description: CONCEPTS
---

import DataBindingModeDiagram from '/img/basics/data-binding/data-binding-syntax/data-binding-mode.png';

# 数据绑定语法

在Avalonia中，您可以使用XAML或代码定义数据绑定。要在XAML中定义数据绑定，您可以使用数据绑定标记扩展，其语法如下所述。

## 数据绑定标记扩展

数据绑定标记扩展使用关键字`Binding`，结合定义数据源和其他选项的参数。标记扩展的格式如下：

```xml
<SomeControl SomeProperty="{Binding Path, Mode=ModeValue, StringFormat=Pattern}" />
```

当有多个选项参数时，它们之间用逗号分隔。

<table><thead><tr><th width="222">参数</th><th>描述</th></tr></thead><tbody><tr><td><code>Path</code></td><td>数据绑定路径。</td></tr><tr><td><code>Mode</code></td><td>绑定模式之一，见下文。</td></tr><tr><td><code>StringFormat</code></td><td>显示值的格式化模式。</td></tr><tr><td><code>ElementName</code></td><td>可以通过在路径中使用＃来缩短。</td></tr><tr><td><code>Converter</code></td><td>用于转换值的函数。</td></tr><tr><td><code>RelativeSource</code></td><td>在视觉树中工作，而不是逻辑树。</td></tr></tbody></table>

## 数据绑定路径

第一个参数通常是数据源的路径。数据源是Avalonia在执行数据绑定时找到的数据上下文中的对象。

在这里，不需要使用参数名`Path`。因此，以下绑定是等效的：

```xml
<TextBlock Text="{Binding Name}"/>
<TextBlock Text="{Binding Path=Name}"/>
```

绑定路径可以是单个属性，也可以是属性链。例如，如果数据源有一个`Student`属性，该属性返回的对象具有一个`Name`属性，您可以使用以下语法绑定到学生姓名：

```xml
<TextBlock Text="{Binding Student.Name}"/>
```

如果数据源有一个数组或列表（带有索引器），则可以将索引添加到绑定路径中，如下所示：

```xml
<TextBlock Text="{Binding Students[0].Name}"/>
```

## 空的数据绑定路径

您可以指定没有路径的数据绑定。这将绑定到控件本身的数据上下文（绑定定义的位置）。以下两种语法是等效的：

```xml
<TextBlock Text="{Binding}"/>
<TextBlock Text="{Binding .}"/>
```

## 数据绑定模式

您可以通过指定数据绑定模式来更改数据在数据绑定中的移动方式。

<img src={DataBindingModeDiagram} alt=''/>

例如：

```xml
<TextBlock Text="{Binding Name, Mode=OneTime}">
```

可用的绑定模式有：

<table><thead><tr><th width="250">模式</th><th>描述</th></tr></thead><tbody><tr><td><code>OneWay</code></td><td>数据源的更改会自动传播到绑定目标</td></tr><tr><td><code>TwoWay</code></td><td>数据源的更改会自动传播到绑定目标，反之亦然。</td></tr><tr><td><code>OneTime</code></td><td>从数据源传播的值在初始化时传播到绑定目标，但后续更改将被忽略</td></tr><tr><td><code>OneWayToSource</code></td><td>绑定目标的更改会传播到数据源，但反之不会。</td></tr><tr><td><code>Default</code></td><td>绑定模式基于代码中属性的默认模式。见下文。</td></tr></tbody></table>

如果未指定模式，则将始终使用默认模式。对于不因用户交互而改变值的控件属性，默认模式通常是`OneWay`。对于因用户输入而改变值的控件属性，默认模式通常是`TwoWay`。

例如，`TextBlock.Text`属性的默认模式是`OneWay`，而`TextBox.Text`属性的默认模式是`TwoWay`。

## 转换绑定的值

有多种方法可以将数据绑定提供的值转换为目标控件中实际显示的值。

### 字符串格式化

您可以对绑定应用模式来定义要如何显示该值。这里有几种语法：

模式索引从零开始，必须始终位于花括号内。当花括号位于模式的开头时，即使也在单引号内，它们也必须被转义。这可以通过在模式前面添加额外的一对花括号或使用反斜杠转义花括号来实现。

这意味着，当您的模式以零开头时，您可以使用一对花括号来转义模式，然后在第二对花括号内提供模式本身。例如：

```xml
<TextBlock Text="{Binding FloatProperty, StringFormat={}{0:0.0}}" />
```

或者，您可以使用反斜杠转义模式所需的花括号。例如：

```xml
<TextBlock Text="{Binding FloatValue, StringFormat=\{0:0.0\}}" />
```

但是，如果您的模式不以零开头，则不需要转义。此外，如果模式中有空格，则必须用单引号括起来。例如：

```xml
<TextBlock Text="{Binding Animals.Count, StringFormat='I have {0} animals.'}" />
```

请注意，这意味着如果模式以您绑定的值开头，则需要转义。例如：

```xml
<TextBlock Text="{Binding Animals.Count, 
                                StringFormat='{}{0} animals live in the farm.'}" />
```

:::info
当`StringFormat`参数存在时，绑定的值实际上将使用`StringFormatValueConverter`进行转换（这是内置转换器之一——见下文）。
:::

### 内置转换器

_Avalonia_ 拥有许多内置的数据绑定转换器，包括：

* 字符串格式化转换器
* 空值测试转换器
* 布尔操作转换器

:::info
有关Avalonia内置数据绑定转换器的完整信息，请参阅[此处](../../../reference/built-in-data-binding-converters.md)的参考文档。
:::

### 自定义转换器

如果内置转换器都不满足您的要求，您可以实现自定义转换器。

:::info
自定义转换器的一个示例是绑定图像文件。有关如何为图像创建自定义转换器的指南，请参阅[此处](../../../guides/data-binding/how-to-bind-image-files.md)。
:::


