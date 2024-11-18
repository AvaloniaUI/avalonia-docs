---
id: defining-properties
title: 定义属性
---

# 样式化属性

如果您正在创建自定义控件，通常希望它具有可以由_Avalonia UI_样式系统设置的属性。

:::info
有关如何在_Avalonia UI_中使用样式的更多信息，请参阅[此处](../../basics/user-interface/styling)的指南。
:::

在本页面中，您将了解如何实现属性，以便可以通过_Avalonia UI_样式系统进行更改。这是一个两步过程：

* 注册样式化属性。
* 为属性提供getter/setter。

### 注册样式化属性

通过定义一个静态只读字段并使用`AvaloniaProperty.Register`方法来注册样式化属性。

属性的命名有一个约定。它必须遵循以下模式：

```
[AttributeName]Property
```

这意味着_Avalonia UI_将在XAML中查找一个属性，如下所示：

```
<MyCustomControl AttributeName="value" ... >
```

例如，通过使用样式化属性，您可以从窗口样式集合中控制自定义控件的背景颜色：

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">

  <Window.Styles>
    <Style Selector="cc|MyCustomControl">
      <Setter Property="Background" Value="Yellow"/>
    </Style>
  </Window.Styles>

  <cc:MyCustomControl Height="200" Width="300"/>

</Window>
```

```csharp title='MainWindow.axaml.cs'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
        public static readonly StyledProperty<IBrush?> BackgroundProperty =
            Border.BackgroundProperty.AddOwner<MyCustomControl>();

        public IBrush? Background
        {
            get { return GetValue(BackgroundProperty); }
            set { SetValue(BackgroundProperty, value); }
        }

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

:::info
请注意，属性的getter/setter使用了特殊的Avalonia UI `GetValue`和`SetValue`方法。
:::

样式化属性将在运行时和预览面板中均起作用。

<img src='/img/gitbook-import/assets/image (4) (3).png' alt=''/>

:::info
有关如何创建自定义控件的更高级信息，请参阅[此处](../custom-controls/how-to-create-advanced-custom-controls.md)。
:::