---
description: REFERENCE - Styles
---

# 样式选择器语法

本页面列出了XAML样式选择器的语法，以及执行相同选择的C#代码方法。

## 按控件类选择



```xml
<Style Selector="Button">
<Style Selector="local|Button">
```


```csharp title='C#'
new Style(x => x.OfType<Button>());
new Style(x => x.OfType(typeof(Button)));
```



按控件类选择。

以上第一个示例选择`Avalonia.Controls.Button`类。要在类型中包含XAML命名空间，请使用`|`字符将命名空间和类型分隔。

:::warning
此选择器不匹配派生类型。若要匹配派生类型，请使用`:is`选择器，参见下文。
:::



:::info
请注意，对象的类型实际上是通过查看其`StyleKey`属性来确定的。默认情况下，它只返回当前实例的类型，但是，如果您希望从`Button`继承的控件被视为`Button`样式，则可以在您的类上重写`StyleKeyOverride`属性以返回`typeof(Button)`。
:::

## 按名称选择



```xml
<Style Selector="#myButton">
<Style Selector="Button#myButton">
```


```csharp title='C#'
new Style(x => x.Name("myButton"));
new Style(x => x.OfType<Button>().Name("myButton"));
```



按`Name`属性选择控件，前面加上`#`（井号）字符作为前缀。

## 按样式类选择



```xml
<Style Selector="Button.large">
<Style Selector="Button.large.red">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Class("large"));
new Style(x => x.OfType<Button>().Class("large").Class("red"));
```



选择具有指定样式类或多个样式类的控件。多个类用点号分隔。如果选择器中指定了多个类，则控件必须同时拥有所有请求的类定义才能匹配。

## 按伪类选择



```xml
<Style Selector="Button:focus">
<Style Selector="Button.large:focus">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Class(":focus"));
new Style(x => x.OfType<Button>().Class("large").Class(":focus"));
```



使用当前伪类选择控件。冒号字符在选择器中定义伪类名称。选择器中只能有一个伪类。与其他类一起使用时，伪类必须是列表中的最后一个。

:::info
有关伪类的更多详细信息，请参见[此处](pseudo-classes.md)的参考。
:::

## 包括派生类



```xml
<Style Selector=":is(Button)">
<Style Selector=":is(local|Button)">
```


```csharp title='C#'
new Style(x => x.Is<Button>());
new Style(x => x.Is(typeof(Button)));
```



这与样式类选择器非常相似，但它还匹配派生类型。

:::info
技术细节：在匹配过程中，_Avalonia UI_ 通过检查控件的`StyleKey`属性来确定其类型。
:::

有趣的是，这允许您编写非常通用的基于类别的选择器。由于所有控件都派生自类`Control`，因此只选择样式类`margin2`的选择器可以编写如下：



```xml
<Style Selector=":is(Control).margin2">
<Style Selector=":is(local|Control.margin2)">
```


```csharp title='C#'
new Style(x => x.Is<Control>().Class("margin2"));
new Style(x => x.Is(typeof(Control)).Class("margin2"));
```



## 子操作符



```xml
<Style Selector="StackPanel > Button">
```


```csharp title='C#'
new Style(x => x.OfType<StackPanel>().Child().OfType<Button>());
```



通过使用`>`字符分隔两个选择器来定义子选择器。此选择器仅匹配**逻辑控件树**中的直接子项。

:::info
有关逻辑控件树背后的概念，请参见[这里](../../concepts/control-trees.md)。
:::

例如，将上述选择器应用于以下XAML：

```
<StackPanel>
   <Button>Save</Button>
   <DockPanel Width="300" Height="300">
       <Button DockPanel.Dock="Top">Top</Button>
       <TextBlock>Some text</TextBlock>
   </DockPanel
</StackPanel>
```

该选择器将匹配第一个按钮，但不会匹配第二个按钮。这是因为第二个按钮不是堆栈面板的直接子项（它也在停靠面板中）。

## 任意后代操作符



```xml
<Style Selector="StackPanel Button">
```


```csharp title='C#'
new Style(x => x.OfType<StackPanel>().Descendant().OfType<Button>());
```



当两个选择器由空格分隔时，选择器将匹配逻辑树中的任意后代。父级在左边，后代在右边。

因此，将上述选择器应用于之前的XAML示例，两个按钮都将被选择。

## 按属性匹配



```xml
<Style Selector="Button[IsDefault=true]">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().PropertyEquals(Button.IsDefaultProperty, true));
```



您可以细化选择器，以包含属性的值。属性=值对在方括号内定义。这将匹配具有指定属性设置为指定值的任何控件。

```
<StackPanel Orientation="Horizontal">
   <Button IsDefault="True">Save</Button>
   <Button>Cancel</Button>   
</StackPanel>
```

例如，在上面的XAML中，第一个按钮将被选择，但第二个按钮不会被选择。

:::info
注意：当您将附加属性用作属性匹配时，属性名必须用括号括起来。例如：

```xml
<Style Selector="TextBlock[(Grid.Row)=0]">
```
:::

:::info
进一步注意：当您使用属性匹配时，属性类型必须支持组件模型类型转换器`TypeConverter`类。有关更多信息，请参阅[_Microsoft_文档](https://learn.microsoft.com/dotnet/api/system.componentmodel.typeconverter)。
:::

## 按模板选择



```xml
<Style Selector="Button /template/ ContentPresenter">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Template().OfType<ContentPresenter>());
```



您可以使用上述语法在控件模板中匹配控件。此处列出的所有其他选择器都适用于逻辑树，但此选择器可以进入模板。

在上面的示例中，如果按钮具有模板，则该选择器将选择模板中的内容呈现控件（类`ContentPresenter`）。

## Not 函数



```xml
<Style Selector="TextBlock:not(.h1)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().Not(y => y.Class("h1")));
```



该函数否定括号中的选择。在上面的示例中，将匹配所有**没有**`h1`类的文本块控件。

## 按列表选择



```xml
<Style Selector="TextBlock, Button">
```


```csharp title='C#'
new Style(x => Selectors.Or(x.OfType<TextBlock>(), x.OfType<Button>()))
```



您可以选择与逗号分隔的选择器列表匹配的任何元素。样式中的任何setter必须更改对所有项目都通用的属性。

## 按子元素位置公式选择



```xml
<Style Selector="TextBlock:nth-child(2n+3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthChild(2, 3));
```



您可以根据元素在相邻组内的位置进行匹配。这与父（容器）控件的类别无关。

选择是基于样式中的简单公式`An + B`，以便 **`A`** 控制步长，**`B`** 控制从开始位置的偏移。在nth-child公式（上面）中，将 **`n`** 作为零提供给公式，以及从零开始的所有正整数，并且与子元素的基于一的位置的结果进行比较。

因此，对于上面的选择器：

<table><thead><tr><th width="175">Child = 1</th><th width="184">Child = 2</th><th width="201">Child = 3</th><th>Child = 4</th></tr></thead><tbody><tr><td>n=0, n=1</td><td>n=0, n=1</td><td>n=0, n=1</td><td>n=0, n=1</td></tr><tr><td>3, 5</td><td>3, 5</td><td><strong>3</strong>, 5</td><td>3, 5</td></tr><tr><td>不匹配</td><td>不匹配</td><td>匹配</td><td>不匹配</td></tr></tbody></table>

如果公式计算结果小于1，则忽略它——从不会有任何具有该索引的子元素。

有一个与从组的末尾计数的公式相对应的选择器：



```xml
<Style Selector="TextBlock:nth-last-child(2n+3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthLastChild(2, 3));
```



### 单个子元素位置

您可以在XAML中省略公式中的**A**和**n**，仅指定一个位置。例如，这将仅选择第3个子元素：



```xml
<Style Selector="TextBlock:nth-child(3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthChild(0, 3));
```



### 关键字符号

您还可以在公式中使用关键字符号：`odd`或`even`。因此，以下选择器是等效的：

```
<Style Selector="TextBlock:nth-child(2n)">
<Style Selector="TextBlock:nth-child(even)">
```

```
<Style Selector="TextBlock:nth-child(2n+1)">
<Style Selector="TextBlock:nth-child(odd)">
```

### 其他公式示例

此表列出了一些按子元素位置选择的示例：

| 公式示例               | 表示                                                                                                             |
|--------------------|----------------------------------------------------------------------------------------------------------------|
| `:nth-child(odd)`  | 奇数元素：**1**，**3**，**5**...                                                                                      |
| `:nth-child(even)` | 偶数元素：**2**，**4**，**6**...                                                                                      |
| `:nth-child(2n+1)` | 奇数元素：**1**_(2×0+1)_，**3**_(2×1+1)_，**5**_(2×2+1)_...，等同于 `:nth-child(odd)`                                     |
| `:nth-child(2n)`   | 偶数元素：**2**_(2×1)_，**4**_(2×2)_，**6**_(2×3)_...，等同于 `:nth-child(even)`。请注意，**0**_(2×0)_是有效表示，但不匹配任何元素，因为索引从1开始。 |
| `:nth-child(7)`    | 第7个元素                                                                                                          |
| `:nth-child(n+7)`  | 从第7个元素开始的每个元素：**7**_(0+7)_，**8**_(1+7)_，**9**_(2+7)_...                                                        |
| `:nth-child(3n+4)` | 从第4个开始的每3个元素：**4**_(3×0+4)_，**7**_(3×1+4)_，**10**_(3×2+4)_，**13**_(3×3+4)_...                                  |
| `:nth-child(-n+3)` | 前3个元素：**3**_(-1×0+3)_，**2**_(-1×1+3)_，**1**_(-1×2+3)_。所有后续索引都小于1，因此它们不匹配任何元素。                                  |

## 在线子元素位置测试

尽管这是一个CSS网站，但它也适用于 _Avalonia UI_ 子元素位置选择器，因为规则是相同的。

:::info
您可以使用此站点测试您的子元素位置选择器：
[https://css-tricks.com/examples/nth-child-tester/](https://css-tricks.com/examples/nth-child-tester/)
:::
