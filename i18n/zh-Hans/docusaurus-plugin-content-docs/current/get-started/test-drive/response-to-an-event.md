---
id: respond-to-an-event
title: 响应事件
---

import SolutionCodeBehindScreenshot from '/img/get-started/test-drive/solution-code-behind.png';
import EventDebugOutputScreenshot from '/img/get-started/test-drive/event-debug-output.png';

在Avalonia应用程序中，您可以使用多种方式实现操作。在本页面中，您将了解如何使用最简单的方法之一：如何编写按钮点击的事件处理代码。

首先，您将编写一个不与任何其他控件交互的按钮单击事件处理程序。

## Code-behind

主窗口的XAML文件可以拥有一个关联的C#代码后台文件，用于访问命名控件并处理其的事件。如果您使用的是IDE，您可以在**Solution Explorer**中找到这个文件，它是`.axaml`文件的子项。

<img className="center" src={SolutionCodeBehindScreenshot} alt="" />

修改 `MainView` 的代码后台：

- 打开`MainView.axaml.cs`文件

您将看到一些类似于以下代码的C#代码：

```csharp
using Avalonia.Controls;

namespace GetStartedApp.Views;
public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();
    }
}
```

分部类 `MainView` 对应于由 Avalonia 根据您已有的 XAML 创建的用户控件。分部类的命名空间必须XAML与保持一致，您可以在XAML标记中找到该类名：

```xml
<UserControl x:Class="GetStartedApp.Views.MainView"
    ...>
</UserControl>
```

要为按钮添加事件处理程序，请按照以下步骤进行操作：

- 在代码后台文件中找到主窗口的`MainView`构造函数（参见上述说明）。
- 在构造函数之后添加以下代码：

```csharp
public void ButtonClicked(object source, RoutedEventArgs args)
{
    Debug.WriteLine("Click!");
}
```

这将需要一些额外的using语句：

```cs
using Avalonia.Interactivity;
using System.Diagnostics;
```

- 切换到XAML文件，找到`<Button>`标记。
- 在标记的末尾添加 `Click` 属性，如下所示：

```xml
<Button Grid.Row="2" Grid.Column="1" Margin="0,5" Click="ButtonClicked">
    Calculate
</Button>
```

- 运行应用程序并点击按钮。

您应该在Debug的输出窗口中看到结果，如下所示：

<img className="center" src={EventDebugOutputScreenshot} alt="" />

在下一页中，您将了解如何使用代码后台在运行时读取和更改Avalonia UI控件的属性。