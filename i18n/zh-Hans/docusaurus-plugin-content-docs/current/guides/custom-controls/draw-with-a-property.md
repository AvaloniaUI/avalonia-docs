---
id: draw-with-a-property
title: 使用属性绘制
---

import DrawWithPropertyScreenshot from '/img/guides/custom-controls/draw-property.png';

# 使用属性进行绘制

在这个页面上，您将看到如何使用一个简单属性的值来绘制自定义控件，该属性定义了背景颜色。代码现在如下所示：

```xml title='MainWindow.xaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  <cc:MyCustomControl Height="200" Width="300" Background="Red"/>
</Window>

```

```csharp title='MyCustomControl.cs'
using Avalonia.Controls;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
        public IBrush? Background { get; set; }

        public sealed override void Render(DrawingContext context)
        {
            if (Background != null)
            {
                var renderSize = Bounds.Size;
                context.FillRectangle(Background, new Rect(renderSize));
            }
            
            base.Render(context);
        }
    }
}
```

这个示例在自定义控件上定义了一个简单的笔刷属性，用于背景颜色。然后，它重写了`Render`方法来绘制控件。

绘制代码使用_Avalonia UI_图形上下文（传递给渲染方法），绘制一个填充有背景颜色的矩形，大小与控件相同（由`Bounds.Size`对象提供）。

<img src={DrawWithPropertyScreenshot} alt=""/>

请注意，控件现在在运行时（如上图）和预览窗格中都显示出来。

在下一页中，您将看到如何实现背景属性，以便可以通过_Avalonia UI_样式系统进行更改。
