---
id: selectors
title: Selectors
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Selectors

## OfType

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="Button">
<Style Selector="local|Button">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<Button>());
new Style(x => x.OfType(typeof(Button)));
```
</TabItem>  

</Tabs>

Selects a control by type. The first example above selects the `Avalonia.Controls.Button` class. To include a XAML namespace in the type separate the namespace and the type with a `|` character.

This selector does not match derived types. For that, use the [`Is`](selectors.md#is) selector.

:::info
Note the type of an object is actually determined by looking at its `StyleKey` property. By default this simply returns the type of the current instance, but if, for example, you do want your control which inherits from `Button` to be styled as a `Button`, then you can override the `StyleKeyOverride` property on your class to return `typeof(Button)`.
:::

## Name

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="#myButton">
<Style Selector="Button#myButton">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.Name("myButton"));
new Style(x => x.OfType<Button>().Name("myButton"));
```
</TabItem>  

</Tabs>


Selects a control by its [`Name`](http://reference.avaloniaui.net/api/Avalonia/StyledElement/2362746E) property with a `#` character.

## Class

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="Button.large">
<Style Selector="Button.large:focus">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<Button>().Class("large"));
new Style(x => x.OfType<Button>().Class("large").Class(":focus"));
```
</TabItem>  

</Tabs>


Selects a control with the specified style classes. Multiple classes should be separated with a `.` character, or a `:` character in the case of pseudoclasses. If multiple classes are specified then the control must have all of the requested classes present in order to match.

## Is


<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector=":is(Button)">
<Style Selector=":is(local|Button)">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.Is<Button>());
new Style(x => x.Is(typeof(Button)));
```
</TabItem>  

</Tabs>


This is very similar to the [`OfType`](selectors.md#ofType) selector except it also matches derived types.

:::info
Again, the type of an object is actually determined by looking at its `IStyleable.StyleKey` property.
:::

## Child


<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="StackPanel > Button">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<StackPanel>().Child().OfType<Button>());
```
</TabItem>  

</Tabs>


A child selector is defined by separating two selectors with a `>` character. This selector matches _direct children in the logical tree_, so in the example above the selector will match any `Button` that is a direct logical child of a `StackPanel`.

## Descendant

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="StackPanel Button">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<StackPanel>().Descendant().OfType<Button>());
```
</TabItem>  

</Tabs>


When two selectors are separated by a space, then the selector will match descendants in the logical tree, so in this case the selector will match any `Button` that is a logical descendant of a `StackPanel`.

## PropertyEquals

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="Button[IsDefault=true]">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<Button>().PropertyEquals(Button.IsDefaultProperty, true));
```
</TabItem>  

</Tabs>


Matches any control which has the specified property set to the specified value.

:::info
**Note:** When using a `AttachedProperty` in selectors inside XAML, it has to be wrapped in parenthesis.

```markup
<Style Selector="TextBlock[(Grid.Row)=0]">
```
:::

:::info
**Note:** When using in selectors in XAML, properties must support [`TypeConverter`](https://learn.microsoft.com/dotnet/api/system.componentmodel.typeconverter)
:::

## Template

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="Button /template/ ContentPresenter">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<Button>().Template().OfType<ContentPresenter>());
```
</TabItem>  

</Tabs>


Matches a control in a control template. All other selectors listed here work on the logical tree. If you wish to select a control in a control template then you must use this selector. The example selects `ContentPresenter` controls in the templates of `Button`s.

## Not

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="TextBlock:not(.h1)">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<TextBlock>().Not(y => y.Class("h1")));
```
</TabItem>  

</Tabs>


Negates an inner selector.

## Or

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="TextBlock, Button">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => Selectors.Or(x.OfType<TextBlock>(), x.OfType<Button>()))
```
</TabItem>  

</Tabs>


Finds the elements that match any of these selectors. Each selector is separated by ",".

## Nth Child

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="TextBlock:nth-child(2n+3)">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<TextBlock>().NthChild(2, 3));
```
</TabItem>  

</Tabs>


Matches elements based on their position in a group of siblings.

## Nth Last Child

<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Style Selector="TextBlock:nth-last-child(2n+3)">
```

</TabItem>
<TabItem value="cs">

```cs
new Style(x => x.OfType<TextBlock>().NthLastChild(2, 3));
```
</TabItem>  

</Tabs>


Matches elements based on their position among a group of siblings, counting from the end.

## Nth Child and Nth Last Child Syntax

`:nth-child()` and `:nth-last-child()` takes a single argument that describes a pattern for matching element indices in a list of siblings. Element indices are **1-based**. Below samples use `:nth-child()`, but also applicable for `:nth-last-child()`.

### Keyword notation

`odd` Represents elements whose index in a series of siblings is odd: 1, 3, 5, etc.

`even` Represents elements whose index in a series of siblings is even: 2, 4, 6, etc.

### Functional notation

`An+B` Represents elements in a list whose indices match those found in a custom pattern of numbers, defined by An+B, where:

* `A` is an integer step size,
* `B` is an integer offset,
* `n` is all non-negative integers, starting from 0.

It can be understood as _every `A`th element starting from `B`th_

### Functional notation examples

|Example|Representation|
|:---|:---|
|`:nth-child(odd)`|The odd elements: **1**, **3**, **5**, etc.|
|`:nth-child(even)`|The even elements: **2**, **4**, **6**, etc.|
|`:nth-child(2n+1)`|The odd elements: **1**_(2×0+1)_, **3**_(2×1+1)_, **5**_(2×2+1)_, etc. equivalent to `:nth-child(odd)`|
|`:nth-child(2n)`|The even elements: **2**_(2×1)_, **4**_(2×2)_, **6**_(2×3)_, etc. equivalent to `:nth-child(even)`. Notice that **0**_(2×0)_ a valid notation, however it's not matching any element since index starts from 1. |
|`:nth-child(7)`|The 7th element|
|`:nth-child(n+7)`|Every element start from 7th: **7**_(0+7)_, **8**_(1+7)_, **9**_(2+7)_, etc|
|`:nth-child(3n+4)`|Every 3rd element start from 4th: **4**_(3×0+4)_, **7**_(3×1+4)_, **10**_(3×2+4)_, **13**_(3×3+4)_, etc|
|`:nth-child(-n+3)`|First 3 elements: **3**_(-1×0+3)_, **2**_(-1×1+3)_, **1**_(-1×2+3)_. All subsequent indices are less than 1 so they are not matching any elements.  |

### Online nth-child & nth-last-child Tester

Using the link below, both `nth-child` and `nth-last-child` can be easily evaluated:
[nth-child-tester](https://css-tricks.com/examples/nth-child-tester/)