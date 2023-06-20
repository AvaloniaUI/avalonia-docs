---
id: style-classes
title: Style Classes
---

# Style Classes

You can assign an _Avalonia UI_ control one or more style classes, and use these to guide style selection. Style classes are assigned in a control element using the `Classes` attribute. If you want to assign more than one class, then use a space-separated list.&#x20;

For example, this button has both the `h1` and `blue` style classes applied:

```markup
<Button Classes="h1 blue"/>
```

## Style Priority

There are two rules that govern which property setter has precedence when a selector matches multiple styles:

* Position of the enclosing styles collection in the application - 'closest' has priority.
* Position of the style in the located styles collection - 'latest' has priority.

For example, firstly this means that styles defined at window level will override those defined at application level. Secondly, this means that where the selected style collections are at the same level, then the later definition (as written in the file) has priority.

{% hint style="warning" %}
If you were comparing style classes to CSS you must note that: **unlike CSS**, the list sequence of class names in the `Classes` attribute has no effect on setter priority in _Avalonia UI_. That is, if both these style classes set the colour, then either way of listing the classes has the same result:

```
<Button Classes="h1 blue"/>
<Button Classes="blue h1"/>
```
:::

## Pseudo Classes

Like in CSS, controls can have pseudo classes; these are classes that are defined in the control itself rather than by the user. The names of pseudo classes in a selector always start with a colon.

For example `:pointerover` pseudo class indicates that the pointer input is currently over (inside the bounds of) a control. (This is pseudo class is the similar to `:hover` in CSS.)

This is an example of  a `:pointerover` pseudo class selector:&#x20;

```markup
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Border:pointerover">
      <Setter Property="Background" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Border>
    <TextBlock>I will have red background when hovered.</TextBlock>
  </Border>
</StackPanel>
```

In this example, the pseudo class selector changes properties inside a control template:

```markup
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Button:pressed /template/ ContentPresenter">
        <Setter Property="TextBlock.Foreground" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Button>I will have red text when pressed.</Button>
</StackPanel>
```

Other pseudo classes include `:focus`, `:disabled`, `:pressed` for buttons, and `:checked` for checkboxes.

:::info
For more detail about pseudo classes, see the reference [here](../../../reference/styles/pseudo-classes.md).
:::

## Conditional Classes

If you need to add or remove a class using a bound condition, then you can use following special syntax:

```markup
<Button Classes.accent="{Binding IsSpecial}" />
```

## Classes in Code

You can manipulate style classes in code using the `Classes` collection:

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
```
