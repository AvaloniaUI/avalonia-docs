---
description: GET STARTED
---

# ⚡ Add Some Layout

_Avalonia UI_ provides a range of built-in controls to help you layout the visual elements of an application. On this page you will see how to use some of these layout controls.

At this stage, your application has a single button located in the content zone of the main window.&#x20;

In fact an _Avalonia UI_ window allows only a single other control in its content zone. So to add the multiple visual elements required for most applications, you will need to use one of the built-in layout controls that allows multiple other controls inside its content zone.

## Stack Panel

The stack panel control allows multiple controls in its content zone, and arranges them in a vertical stack in the sequence they are defined in the XAML.



![](./img/image (40) (1) (1).png)

```xml
<StackPanel>
    <TextBlock>1</TextBlock>
    <TextBlock>2</TextBlock>
</StackPanel>
```

## Text Block

The text block control gives you full control over the styling of the text it contains.

To take the example forwards, add a stack panel as follows (you can include the existing the button XAML).

```xml
<StackPanel>
    <Border Margin="5" 
      CornerRadius="10"
      Background="LightBlue">
      <TextBlock Margin="5"
         FontSize="24" 
         HorizontalAlignment="Center"
         Text="Temperature Converter">
      </TextBlock>
    </Border>
    <StackPanel>
    </StackPanel>    
    <Button HorizontalAlignment="Center">Calculate</Button>
  </StackPanel>
```

![](./img/image%20(41)%20(1).png)
:::info
You can explore the other layout controls in _Avalonia UI_ from the reference [here](../reference/controls/layout-controls.md).&#x20;
:::

On the next page, you will add some inputs to the middle of the window.
