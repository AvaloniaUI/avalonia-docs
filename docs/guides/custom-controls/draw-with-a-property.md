---
id: draw-with-a-property
title: Draw with a Property
---

import DrawWithPropertyScreenshot from '/img/guides/custom-controls/draw-property.png';

# Draw with a Property

On this page you will see how to draw a custom control, using the value for a simple property that defines the background color. The code now looks like this:

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

This example defines a simple brush property on the custom control for the background color. It then overrides the `Render` method to draw the control.

The drawing code uses the _Avalonia UI_ graphics context (that is passed to the render method), to draw a rectangle that is filled with the background color, and made the same size as the control (as supplied by the `Bounds.Size` object).

<img src={DrawWithPropertyScreenshot} alt=""/>

Notice how the control now shows both at runtime (above) and in the preview pane.

On the next page, you will see how to implement the background property so that it can be changed by the _Avalonia UI_ styling system. 
