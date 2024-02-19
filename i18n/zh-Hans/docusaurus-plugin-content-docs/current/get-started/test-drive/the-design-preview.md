---
id: the-design-preview
title: 设计预览
---

import TemperatureDesignPreviewScreenshot from '/img/get-started/test-drive/temperature-design-preview.png';

在这个页面上，您将探索窗口的属性；然后使用其中一些属性来调整窗口在预览窗格中显示时的大小。

检查`<Window>`标签的XAML。它看起来像这样：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="400" d:DesignHeight="550"
        x:Class="GetStartedApp.MainWindow"
        Title="GetStartedApp">
```

窗口标签首先定义了Avalonia使用的一些XML命名空间。使用了别名'x'、'd'和'mc'。

设计命名空间'd'允许设置设计时属性`d:DesignWidth`和`d:DesignHeight`。在上面的代码示例中的设置，可以使预览窗格看起来更像是纵向的移动设备。

设置了这些属性后，窗口的预览现在看起来像这样：

<img className="center" src={TemperatureDesignPreviewScreenshot} alt="" />

在下一页中，您将看到如何通过响应按钮点击事件为应用程序添加一些动作。