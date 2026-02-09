---
id: style-classes
title: Style classes
---

# Style Classes

You can assign an _Avalonia UI_ control one or more style classes, and use these to guide style selection. Style classes are assigned in a control element using the `Classes` attribute. If you want to assign more than one class, then use a space-separated list.

For example, this button has both the `h1` and `blue` style classes applied:


```xml
<Button Classes="h1 blue"/>
```

## Pseudoclasses

Like in CSS, controls can have pseudoclasses; these are classes that are defined in the control itself rather than by the user. The names of pseudo classes in a selector always start with a colon.

For example `:pointerover` pseudo class indicates that the pointer input is currently over (inside the bounds of) a control. (This is pseudo class is the similar to `:hover` in CSS.)

This is an example of  a `:pointerover` pseudo class selector:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <StackPanel>
    <StackPanel.Styles>
      <Style Selector="Border:pointerover">
        <Setter Property="Background" Value="Red"/>
      </Style>
    </StackPanel.Styles>
    <Border>
      <TextBlock Margin="10">Hover for red background</TextBlock>
    </Border>
  </StackPanel>
</UserControl>
```

</XamlPreview>

In this example, the pseudo class selector changes properties inside a control template:

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
  <StackPanel>
    <StackPanel.Styles>
      <Style Selector="Button:pressed /template/ ContentPresenter">
          <Setter Property="TextBlock.Foreground" Value="Red"/>
      </Style>
    </StackPanel.Styles>
   <Button Margin="10">Press for red text</Button>
  </StackPanel>
</UserControl>
```

</XamlPreview>

Other pseudo classes include `:focus`, `:disabled`, `:pressed` for buttons, and `:checked` for checkboxes.

:::info
For more detail about pseudo classes, see the reference [here](/reference/styles/pseudoclasses).
:::

## Conditional Classes

If you need to add or remove a class using a bound condition, then you can use following special syntax:

```xml
<Button Classes.accent="{Binding IsSpecial}" />
```

## Classes in Code

You can manipulate style classes in code using the `Classes` collection:

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
```
