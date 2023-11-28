---
id: add-some-layout
title: Add Some Layout
---

import StackPanelDiagram from '/img/get-started/add-some-layout/image (40) (1) (1).png';
import StackPanelSampleScreenshot from '/img/get-started/add-some-layout/image (41) (1).png';

Avalonia provides a range of built-in controls to help you layout the visual elements of an application. On this page you will see how to use some of these layout controls.

At this stage, your application has a single button located in the content zone of the main window.

In fact an Avalonia window allows only a single other control in its content zone. So to add the multiple visual elements required for most applications, you will need to use one of the built-in layout controls that allows multiple other controls inside its content zone.

## Stack Panel

The stack panel control allows multiple controls in its content zone, and arranges them in a vertical stack in the sequence they are defined in the XAML.

<img className="center" src={StackPanelDiagram} alt="" />

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

<img className="center" src={StackPanelSampleScreenshot} alt="" />

:::info
You can explore the other layout controls in Avalonia from the reference [here](../../reference/controls/layout-controls.md).
:::

On the next page, you will add some inputs to the middle of the window.