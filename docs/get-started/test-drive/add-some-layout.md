---
id: add-some-layout
title: Add Some Layout
---

import StackPanelZonesDiagram from '/img/get-started/test-drive/stackpanel-zones.png';
import TemperatureStackPanelScreenshot from '/img/get-started/test-drive/temperature-stackpanel.png';

Avalonia provides a range of built-in controls to help you layout the visual elements of an application. On this page, 
you will see how to use some of these layout controls.

At this stage, your application has a single button located in the content zone of the main window.

In fact, an Avalonia `Window` allows only one control in its content zone. To show multiple visual elements, you 
must use a layout control that allows multiple controls within its content zone.

## StackPanel

The `StackPanel` control lays out a sequence of controls in the order they are defined in XAML. By default, it lays out 
in a vertical stack but this can be changed to horizontal with its `Orientation` property.

<img src={StackPanelZonesDiagram} alt="" />

```xml
<StackPanel>
    <TextBlock>1</TextBlock>
    <TextBlock>2</TextBlock>
</StackPanel>
```

## TextBlock

The `TextBlock` control allows extensive styling of its contained text.

To take the example forward, add a `StackPanel` as follows (include the preexisting `Button` XAML):

```xml
<StackPanel>
    <Border Margin="5" CornerRadius="10" Background="LightBlue">
        <TextBlock Margin="5"
            FontSize="24" 
            HorizontalAlignment="Center"
            Text="Temperature Converter">
        </TextBlock>
    </Border>

    <Button HorizontalAlignment="Center">Calculate</Button>
</StackPanel>
```

<img className="center" src={TemperatureStackPanelScreenshot} alt="" />

:::info
You can explore the other layout controls in Avalonia using the reference [here](../../reference/controls/layout-controls.md).
:::

On the next page, you will add some inputs to the middle of the window.