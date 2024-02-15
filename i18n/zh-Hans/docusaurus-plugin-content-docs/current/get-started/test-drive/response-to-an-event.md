---
id: respond-to-an-event
title: 响应事件
---

import SolutionCodeBehindScreenshot from '/img/get-started/test-drive/solution-code-behind.png';
import ButtonIntellisenseClickScreenshot from '/img/get-started/test-drive/button-intellisense-click.png';
import EventDebugOutputScreenshot from '/img/get-started/test-drive/event-debug-output.png';

在Avalonia应用程序中，您可以使用多种方式实现操作。在本页面中，您将了解如何使用最简单的方法之一：如何编写按钮点击的事件处理代码。

首先，您将编写一个按钮点击事件处理程序，该处理程序不与任何其他控件交互。

## Code-behind

主窗口的XAML文件与一个关联的C#代码后台文件。如果您使用的是一个IDE，您可以在**Solution Explorer**中找到这个文件 - 它是`.axaml`文件的子项。

<img className="center" src={SolutionCodeBehindScreenshot} alt="" />

要更改主窗口的代码后台：

- 打开`MainWindow.axaml.cs`文件

您将看到一些类似于以下代码的C#代码：

```csharp
using Avalonia.Controls;

namespace GetStartedApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```

部分类`MainWindow`对应于由Avalonia UI根据您已有的XAML创建的窗口对象。您可以在XAML窗口标记中找到此类名称：

```xml
<Window 
    ...
    x:Class="GetStartedApp.MainWindow" >
</Window>
```

要为按钮添加事件处理程序，请按照以下步骤进行操作：

- 在代码后台文件中找到主窗口的`MainWindow`构造函数（参见上述说明）。
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
- 在标记的末尾输入click属性，如下所示：

```xml
<Button
   ...
   Click="ButtonClicked">
</Button>
```

:::tip
如果您使用的是一个IDE，您将在输入时看到Avalonia UI的智能感知。

<img className="center" src={ButtonIntellisenseClickScreenshot} alt="" />
:::

- 运行应用程序并点击按钮。

您应该在Debug的输出窗口中看到结果，如下所示：

<img className="center" src={EventDebugOutputScreenshot} alt="" />

在下一页中，您将了解如何使用代码后台在运行时读取和更改Avalonia UI控件的属性。