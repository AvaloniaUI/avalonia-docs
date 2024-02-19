---
id: add-some-layout
title: 添加一些布局
---

import StackPanelZonesDiagram from '/img/get-started/test-drive/stackpanel-zones.png';
import TemperatureStackPanelScreenshot from '/img/get-started/test-drive/temperature-stackpanel.png';

Avalonia提供了一系列内置的控件来帮助您布局应用程序的可视元素。在本页，您将看到如何使用其中一些布局控件。

目前，您的应用程序在主窗口的内容区域中只有一个按钮。

实际上，Avalonia窗口只允许在其内容区域中放置一个控件。因此，为了添加大多数应用程序所需的多个可视元素，您需要使用一个内置的布局控件，从而在其内容区域中放置多个控件。

## Stack Panel

stack panel控件允许在其内容区域中放置多个控件，并按照在XAML中定义的顺序以垂直堆栈的方式排列它们。

<img src={StackPanelZonesDiagram} alt="" />

```xml
<StackPanel>
    <TextBlock>1</TextBlock>
    <TextBlock>2</TextBlock>
</StackPanel>
```

## Text Block

text block控件使您可以完全控制其包含的文本的样式。

为了继续示例，添加一个stack panel如下（您可以包含现有的按钮XAML）。

```xml
<StackPanel>
    <Border Margin="5" 
      CornerRadius="10"
      Background="LightBlue">
      <TextBlock Margin="5"
         FontSize="24" 
         HorizontalAlignment="Center"
         Text="温度转换器">
      </TextBlock>
    </Border>
    <StackPanel>
    </StackPanel>    
    <Button HorizontalAlignment="Center">计算</Button>
  </StackPanel>
```

<img className="center" src={TemperatureStackPanelScreenshot} alt="" />

:::info
您可以从参考文档[这里](../../reference/controls/layout-controls.md)了解Avalonia中的其他布局控件。
:::

在下一页中，您将在窗口的中间添加一些输入内容。