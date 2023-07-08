---
id: add-custom-control-class
title: 添加自定义控件类
---

# 添加自定义控件类

您可以使用继承自_Avalonia UI_ `Control` 类的类来创建自定义控件。您可以将自定义控件类放置在应用程序项目的任何位置，或者将其包含在另一个控件库项目中。

:::info
有关创建自定义控件库的更多信息，请参阅[此处](how-to-create-a-custom-controls-library)。
:::

无论您选择将自定义控件类放置在何处，您都必须能够在XAML中引用它。例如，以下代码显示了将自定义控件`MyControl`类放置在主窗口中的示例；自定义控件类定义在`/CustomControls`命名空间和项目文件夹中：

```xml title='XAML'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:cc="using:AvaloniaCCExample.CustomControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaCCExample.MainWindow"
        Title="Avalonia Custom Control">
  <cc:MyCustomControl Height="200" Width="300"/>
</Window>

```

```csharp title='C#'
using Avalonia.Controls;

namespace AvaloniaCCExample.CustomControls
{
    public class MyCustomControl : Control
    {
    }
}
```

请注意，您已经可以为自定义控件添加高度和宽度属性。这些属性来自基类：`Control`。

然而，目前什么都没有显示。在下一页中，您将看到如何定义属性并教会自定义控件如何使用它进行绘制。
