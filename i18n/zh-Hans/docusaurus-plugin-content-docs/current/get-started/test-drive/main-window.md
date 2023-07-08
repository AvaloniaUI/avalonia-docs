---
id: main-window
title: 主窗口
---

您现在可以开始 Avalonia 项目之旅了。我们将从主应用程序窗口开始。打开 **MainWindow.axaml** 文件。

:::info
请注意，在 Avalonia 中，XAML 文件的扩展名为 **.axaml**（而不是 .xaml）。它表示 'Avalonia XAML'，文件扩展名是出于技术原因引入的。
:::

## 发生了什么？

在 **MainWindow.axaml** XAML 文件中，`<Window>...</Window>` XAML 标记表示 Avalonia 窗口。与其他 Avalonia 控件一样，窗口将在目标平台上绘制，具有 4 个**布局区域**：边距、边框、内边距和内容。

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (25) (2) (1).png" alt="" />
</div>

在当前应用程序中，窗口的内容区域只包含一个简单的字符串，即您最新的消息；因此显示的就是这个消息。

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (15) (1) (1).png" alt="" />
</div>

在这个阶段，您没有定义边距、边框或任何内边距，所以消息显示在窗口的左上角。

:::info
有关控件布局区域概念的更多信息，请参阅[这里](../../concepts/layout/layout-zones)。
:::

## Visual Studio 设计器

如果您使用的是 Visual Studio，则应该看到 XAML 代码和预览窗格。

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (22) (1).png" alt="" />
</div>

:::info
请注意红色感叹号图标（左上角）和消息 **The designer is loading...**。这表示必须将项目构建一次预览窗格才能开始响应。
:::

- 构建项目。
- 滚动预览窗格到左侧，查看预览轮廓和显示在左上角的文本。

<div style={{textAlign: 'center'}}>
    <img src="/img/get-started/the-main-window/image (6) (2).png" alt="" />
</div>

- 在 XAML 代码窗格中找到 `Welcome to Avalonia!` 消息文本，并进行更改。

您会看到在输入时预览窗格中的新文本也会更改。这是 Avalonia 的**设计时预览行为**的一个示例，它将帮助您准确快速地开发用户界面呈现。

- 运行项目，可以看到您的新文本也在运行中显示了。

在下一页中，您将看到如何向窗口添加一个简单的按钮。