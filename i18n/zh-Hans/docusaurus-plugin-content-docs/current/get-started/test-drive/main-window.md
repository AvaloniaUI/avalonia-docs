---
id: main-window
title: 主窗口
---

import LayoutZonesDiagram from '/img/concepts/layout/layout-zones.png';
import ViewModelScreenshot from '/img/get-started/test-drive/main-window-viewmodel.png';
import AppRunningScreenshot from '/img/get-started/test-drive/main-window-app-running.png';
import VsPreviewerScreenshot from '/img/get-started/test-drive/vs-previewer.png';
import VsPreviewPaneScreenshot from '/img/get-started/test-drive/vs-preview-pane.png';

您现在可以开始 Avalonia 项目之旅了。我们将从主应用程序窗口开始。打开 **MainWindow.axaml** 文件。

:::info
请注意，在 Avalonia 中，XAML 文件的扩展名为 **.axaml**（而不是 .xaml）。它表示 'Avalonia XAML'，文件扩展名是出于技术原因引入的。
:::

## 发生了什么？

在 **MainWindow.axaml** XAML 文件中，`<Window>...</Window>` XAML 标记表示 Avalonia 窗口。与其他 Avalonia 控件一样，窗口将在目标平台上绘制，具有 4 个**布局区域**：边距、边框、内边距和内容。

<img src={LayoutZonesDiagram} alt="" />

在当前应用程序中，窗口的内容区域引用另一个视图：**<views:MainView />**。这是对 **MainView.axaml** 文件的引用，它是一个将显示在窗口的内容区域的用户控件。

## MainView 用户控件

在此用户控件中，您将看到一个 `<TextBlock>...</TextBlock>` XAML 标记。这代表一个文本块控件。文本块的 `Text` 属性绑定到 **MainViewModel** 类的 **Greeting** 属性。这是在视图模型类的构造函数中设置的属性。
```
<TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

您可以更改文件 **MainViewModel.cs** 中的文本，以查看界面上的更改。

<img className="center" src={ViewModelScreenshot} alt="" />
<img className="center" src={AppRunningScreenshot} alt="" />

:::info
有关控件布局区域概念的更多信息，请参阅[这里](../../concepts/layout/layout-zones)。
:::

## Visual Studio 设计器

如果您使用的是 Visual Studio，则应该看到 XAML 代码和预览窗格。
切换到 **MainView.axaml** 文件，并单击编辑窗口顶部的 **Split View** 按钮。

<img className="center" src={VsPreviewerScreenshot} alt="" />

:::info
可能会有一个红色的感叹号图标（左上角）和消息 **The designer is loading...**。这表示必须将项目构建一次预览窗格才能开始响应。
:::

- 构建项目。
- 滚动预览窗格到左侧，查看预览轮廓和显示在左上角的文本。

<img className="center" src={VsPreviewPaneScreenshot} alt="" />

- 删除绑定 `{Binding Greeting}` 并更改文本 `<TextBlock Text="my text" ...`

您会看到在输入时预览窗格中的新文本也会更改。这是 Avalonia 的**设计时预览行为**的一个示例，它将帮助您准确快速地开发用户界面呈现。

- 运行项目，可以看到您的新文本也在运行中显示了。

在下一页中，您将看到如何向窗口添加一个简单的按钮。