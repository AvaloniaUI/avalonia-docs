---
description: CONCEPTS - Data Templates
---

import ControlContentButtonScreenshot from '/img/concepts/templates/content-button.png';
import ControlContentStringScreenshot from '/img/concepts/templates/content-string.png';
import ControlContentTypeScreenshot from '/img/concepts/templates/content-type.png';

# 控件内容

您可能已经看到了在将按钮控件放入_Avalonia UI_窗口的内容区域时会发生什么。

:::info
关于_Avalonia UI_控件区域的概念，可以在[此处](../layout/layout-zones)找到讨论。
:::

例如：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  <Button HorizontalAlignment="Center" >Hello World!</Button>
</Window>
```

窗口会显示一个按钮 - 在此例中水平居中（指定）和垂直居中（默认情况下）。效果如下图所示：

<img src={ControlContentButtonScreenshot} alt=""/>

如果您将一个字符串放入窗口的内容区域，例如：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="MySample.MainWindow"
        Title="MySample">
  Hello World!
</Window>
```

窗口将显示该字符串：

<img src={ControlContentStringScreenshot} alt=""/>

但是如果您尝试显示在窗口中定义的类的对象会发生什么呢？

例如，使用上面的`Student`类定义：

```csharp
namespace MySample
{
    public class Student
    {
        public string FirstName { get; set;} = String.Empty;
        public string LastName { get; set;} = String.Empty;
    }
}
```

并且将XML命名空间`local`定义为`MySample`命名空间（来自上面的代码），您可以在窗口的内容区域中定义一个学生对象，如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MySample"
        x:Class="MySample.Views.MainWindow">
  <local:Student FirstName="Jane" LastName="Deer"/>
</Window>
```

但是，您将只会看到学生对象的完全限定类名：

<img src={ControlContentTypeScreenshot} alt=""/>

这并不是很有帮助！这是因为_Avalonia UI_没有定义如何显示`Student`类的对象 - 它不是一个控件 - 因此它会退回到`.ToString()`方法，您所看到的只是完全限定的类名。

在接下来的页面上，您将看到一种指定如何显示您定义的类的对象（不是控件或简单字符串）的方法。