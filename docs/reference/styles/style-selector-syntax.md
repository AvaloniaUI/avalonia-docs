---
description: REFERENCE - Styles
---

# Style Selector Syntax

This page lists the XAML syntax for style selectors with the C# code methods that perform the same selection.

## By Control Class



```xml
<Style Selector="Button">
<Style Selector="local|Button">
```


```csharp title='C#'
new Style(x => x.OfType<Button>());
new Style(x => x.OfType(typeof(Button)));
```



Selects a control by its class name.

The first example above selects the `Avalonia.Controls.Button` class. To include a XAML namespace in the type separate the namespace and the type with a `|` character.

:::warning
This selector does not match derived types. For that, use the `:is` selector, see below.
:::



:::info
Note the type of an object is actually determined by looking at its `StyleKey` property. By default this simply returns the type of the current instance, but if, for example, you do want your control which inherits from `Button` to be styled as a `Button`, then you can override the `StyleKeyOverride` property on your class to return `typeof(Button)`.
:::

## By Name



```xml
<Style Selector="#myButton">
<Style Selector="Button#myButton">
```


```csharp title='C#'
new Style(x => x.Name("myButton"));
new Style(x => x.OfType<Button>().Name("myButton"));
```



Selects a control by its `Name` attribute, with an added `#` (hash) character prefix.

## By Style Class



```xml
<Style Selector="Button.large">
<Style Selector="Button.large.red">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Class("large"));
new Style(x => x.OfType<Button>().Class("large").Class("red"));
```



Selects a control with the specified style class or classes. Multiple classes are separated with a full stop. If multiple classes are specified in the selector, then the control must have all of the requested classes defined for a match.

## By Pseudo Class



```xml
<Style Selector="Button:focus">
<Style Selector="Button.large:focus">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Class(":focus"));
new Style(x => x.OfType<Button>().Class("large").Class(":focus"));
```



Selects a control using its current pseudo class. The colon character defines the start of the pseudo class name in the selector. There can only be one pseudo class in the selector. When used in combination with other classes, the pseudo class must be the last in the list. 

:::info
For more detail about pseudo classes, see the reference [here](pseudo-classes.md).
:::

## Include Derived Classes



```xml
<Style Selector=":is(Button)">
<Style Selector=":is(local|Button)">
```


```csharp title='C#'
new Style(x => x.Is<Button>());
new Style(x => x.Is(typeof(Button)));
```



This is very similar to the style class selector except it also matches derived types.

:::info
Technical detail: during the matching process, _Avalonia UI_ determines the type of a control by examining its `StyleKey` property.
:::

INterestingly, this allows you to write very general class-based selectors. As controls are all derived from the class `Control`, a selector that only selects on the style class `margin2` can be written:



```xml
<Style Selector=":is(Control).margin2">
<Style Selector=":is(local|Control.margin2)">
```


```csharp title='C#'
new Style(x => x.Is<Control>().Class("margin2"));
new Style(x => x.Is(typeof(Control)).Class("margin2"));
```



## Child Operator



```xml
<Style Selector="StackPanel > Button">
```


```csharp title='C#'
new Style(x => x.OfType<StackPanel>().Child().OfType<Button>());
```



A child selector is defined by separating two selectors with a `>` character. This selector matches only direct children in the **logical controls tree**.

:::info
For the concept behind the logical controls tree, see [here](../../concepts/control-trees.md).
:::

For example, applying the above selector to this XAML:

```
<StackPanel>
   <Button>Save</Button>
   <DockPanel Width="300" Height="300">
       <Button DockPanel.Dock="Top">Top</Button>
       <TextBlock>Some text</TextBlock>
   </DockPanel
</StackPanel>
```

The selector will match the first button, but not the second. This is because the second button is not a direct child of the stack panel (it is inside the dock panel as well).

## Any Descendant Operator



```xml
<Style Selector="StackPanel Button">
```


```csharp title='C#'
new Style(x => x.OfType<StackPanel>().Descendant().OfType<Button>());
```



When two selectors are separated by a space, then the selector will match any descendants in the logical tree. The parent is on the left, and the descendant is on the right.

Therefore applying the above selector to the previous XAML sample, both buttons will be selected.

## By Property Match



```xml
<Style Selector="Button[IsDefault=true]">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().PropertyEquals(Button.IsDefaultProperty, true));
```



You can refine a selector so that it includes the value of a property. The property=value pair is defined inside square brackets. This matches any control that has the specified property set to the specified value.

```
<StackPanel Orientation="Horizontal">
   <Button IsDefault="True">Save</Button>
   <Button>Cancel</Button>   
</StackPanel>
```

For example, in the XAML above, the first button will be selected, but not the second button.

:::info
Note: when you use an attached property as a property match, the property name must be wrapped in parentheses. Fro example:

```xml
<Style Selector="TextBlock[(Grid.Row)=0]">
```
:::

:::info
Further note: when you use a property match, the property type must support the component model type converter, `TypeConverter` class. For more information see the _Microsoft_ documentation [here](https://learn.microsoft.com/dotnet/api/system.componentmodel.typeconverter).
:::

## By Template



```xml
<Style Selector="Button /template/ ContentPresenter">
```


```csharp title='C#'
new Style(x => x.OfType<Button>().Template().OfType<ContentPresenter>());
```



You can match a control in a control template using the above syntax. All the other selectors listed here work on the logical tree, but this selector can step into a template.

In the example above, if a button has a template, then the selector matches selects content presenter controls (class `ContentPresenter`) inside the template.

## Not Function



```xml
<Style Selector="TextBlock:not(.h1)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().Not(y => y.Class("h1")));
```



This function negates the selection in the brackets. In the example above all the text block controls that **do not** have the `h1` class will be matched.

## By List



```xml
<Style Selector="TextBlock, Button">
```


```csharp title='C#'
new Style(x => Selectors.Or(x.OfType<TextBlock>(), x.OfType<Button>()))
```



You can select any element that matches a comma-separated list of selectors. Any setters in the style must change properties that are common to all the items. 

## By Child Position Formula



```xml
<Style Selector="TextBlock:nth-child(2n+3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthChild(2, 3));
```



You can match elements based on their position within a group of siblings.  This is regardless of the class of the parent (container) control.

Selection is based on a simple formula in the style `An + B` so that **`A`** controls the step size and **`B`** the offset from the start. In the nth-child formula (above), **`n`** is supplied to the formula as zero and all positive integers starting at zero, and the match is made against the results of the formula compared with a one-based position of the child element.

So, for the above selector:

<table><thead><tr><th width="175">Child = 1</th><th width="184">Child = 2</th><th width="201">Child = 3</th><th>Child = 4</th></tr></thead><tbody><tr><td>n=0, n=1</td><td>n=0, n=1</td><td>n=0, n=1</td><td>n=0, n=1</td></tr><tr><td>3, 5</td><td>3, 5</td><td><strong>3</strong>, 5</td><td>3, 5</td></tr><tr><td>No Match</td><td>No Match</td><td>Match</td><td>No Match</td></tr></tbody></table>

If the formula evaluates to less than 1 then it is ignored - there are never any child element with that index.

There is a corresponding selector with a formula that counts from the end of the group:



```xml
<Style Selector="TextBlock:nth-last-child(2n+3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthLastChild(2, 3));
```



### Single child position

You can omit the **A** and **n** from the formula in XAML to specify a single position only. For example, this selects only child number 3:



```xml
<Style Selector="TextBlock:nth-child(3)">
```


```csharp title='C#'
new Style(x => x.OfType<TextBlock>().NthChild(0, 3));
```



### Keyword notation

You can also use a keyword notation in place of the formula: `odd` or `even`. So these are selectors are equivalent:

```
<Style Selector="TextBlock:nth-child(2n)">
<Style Selector="TextBlock:nth-child(even)">
```

```
<Style Selector="TextBlock:nth-child(2n+1)">
<Style Selector="TextBlock:nth-child(odd)">
```

### Other Formula Examples

This table lists some examples of selection by child position:

| Formula Example    | Representation                                                                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:nth-child(odd)`  | The odd elements: **1**, **3**, **5**, etc.                                                                                                                                                                     |
| `:nth-child(even)` | The even elements: **2**, **4**, **6**, etc.                                                                                                                                                                    |
| `:nth-child(2n+1)` | The odd elements: **1**_(2×0+1)_, **3**_(2×1+1)_, **5**_(2×2+1)_, etc. equivalent to `:nth-child(odd)`                                                                                                          |
| `:nth-child(2n)`   | The even elements: **2**_(2×1)_, **4**_(2×2)_, **6**_(2×3)_, etc. equivalent to `:nth-child(even)`. Notice that **0**_(2×0)_ a valid notation, however it's not matching any element since index starts from 1. |
| `:nth-child(7)`    | The 7th element                                                                                                                                                                                                 |
| `:nth-child(n+7)`  | Every element start from 7th: **7**_(0+7)_, **8**_(1+7)_, **9**_(2+7)_, etc                                                                                                                                     |
| `:nth-child(3n+4)` | Every 3rd element start from 4th: **4**_(3×0+4)_, **7**_(3×1+4)_, **10**_(3×2+4)_, **13**_(3×3+4)_, etc                                                                                                         |
| `:nth-child(-n+3)` | First 3 elements: **3**_(-1×0+3)_, **2**_(-1×1+3)_, **1**_(-1×2+3)_. All subsequent indices are less than 1 so they are not matching any elements.                                                              |

### Online Child Position Tester

Although this is a CSS site, it will work for _Avalonia UI_ child position selectors because the rules are the same.

:::info
You can use this site to test your child position selector: \
[https://css-tricks.com/examples/nth-child-tester/](https://css-tricks.com/examples/nth-child-tester/)
:::

## Nesting

```xml
<Style Selector="TextBlock">
    <Setter Property="FontSize" Value="24"/>
    
    <!-- Effectively "TextBlock:pointerover" -->
    <Style Selector="^:pointerover">
        <Setter Property="FontWeight" Value="Bold"/>
    </Style>
</Style>
```

```csharp title='C#'
new Style(x => x.OfType<TextBlock>())
{
    Setters = { new Setter(TextBlock.FontSizeProperty, 24d) },
    Children =
    {
        new Style(x => x.Nesting().Class(":pointerover"))
        {
            Setters = { new Setter(TextBlock.FontWeightProperty, FontWeight.Bold) }
        }
    }
};
```
