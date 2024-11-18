---
description: TUTORIALS - Music Store App
---

import MusicStoreCreateSolutionScreenshot from '/img/tutorials/music-store-app/creating-the-project/CreateSolution.png';
import MusicStoreProjectStructureScreenshot from '/img/tutorials/music-store-app/creating-the-project/project-structure.png';
import MusicStoreRiderDebugButtonScreenshot from '/img/tutorials/music-store-app/creating-the-project/debug-button.png';
import MusicStoreNewAppScreenshot from '/img/tutorials/music-store-app/creating-the-project/image-20210310192926578.png';

# 创建一个新项目

在本页面上，您将学习如何为应用程序创建一个新项目。

### JetBrains Rider

在开始之前，请检查您是否已安装了 _JetBrains Rider_ 的 _Avalonia UI_ 解决方案模板。

:::info
有关在 _JetBrains Rider_ 上准备 _Avalonia UI_ 开发的完整说明，请参阅[这里](../../reference/jetbrains-rider-ide/jetbrains-rider-setup.md)。
:::

安装了解决方案模板后，请按照以下说明开始本教程：

- 在**欢迎使用 JetBrains Rider**屏幕上，点击**新建解决方案**。
- 在左侧的项目类型列表中，找到并点击 **Avalonia .NET Core MVVM App**。它将在**其他**部分下面。
- 将 **MVVM Toolkit** 选项保留为（默认的）_ReactiveUI_ 框架。
- 向**解决方案名称**输入 “Avalonia.MusicStore”。
- 点击**创建**。

<p><img className="image-medium-zoom" src={MusicStoreCreateSolutionScreenshot} alt="" /></p>

这将创建一个新项目，其中包含以下解决方案文件夹和文件：

<p><img className="image-medium-zoom" src={MusicStoreProjectStructureScreenshot} alt="" /></p>

花一些时间来查看解决方案模板创建的文件和文件夹。您将看到根据 MVVM 模式，创建了以下文件夹：

<table><thead><tr><th width="188">文件夹名称</th><th>描述</th></tr></thead><tbody><tr><td>Assets</td><td>包含编译到程序中的任何嵌入式资源。例如：图片、图标、字体等，UI可能需要显示的任何内容。</td></tr><tr><td>Models</td><td>这是一个空文件夹，用于存放 MVVM 模式中的“模型”部分的代码。通常包含应用程序需要的除 UI 之外的所有内容。例如：与数据库的交互、Web API 或与硬件设备的接口。</td></tr><tr><td>View Models</td><td>这是项目中所有视图模型的文件夹，它已经包含了一个示例。视图模型在 MVVM 模式中包含应用程序逻辑。例如：只有在用户输入了内容时按钮才可用；或者在用户点击这里时打开对话框；或者在用户输入了太大的数字时显示错误类型的逻辑。</td></tr><tr><td>Views</td><td>这是项目中所有视图的文件夹，它已经包含了应用程序主窗口的视图。在 MVVM 模式中，视图仅包含应用程序的展示部分，即布局和表单、字体、颜色、图标和图片。在 MVVM 中，它们只有足够的代码将它们链接到视图模型层。在 <em>Avalonia UI</em> 中，这里只有足够管理窗口和对话框的代码。</td></tr></tbody></table>


:::info
要了解 MVVM 模式背后的概念以及何时适合使用它，请参阅[这里](../../concepts/the-mvvm-pattern/)。
:::

解决方案模板已经创建了足够的文件来运行应用程序。在本教程的其余部分中，您将会与所有这些文件打交道。

## 运行项目

按下 IDE 右上角的调试按钮以编译和运行项目。

<p><img className="image-medium-zoom" src={MusicStoreRiderDebugButtonScreenshot} alt="" /></p>

这将显示一个窗口，看起来像这样：

<p><img className="image-medium-zoom" src={MusicStoreNewAppScreenshot} alt="" /></p>

它虽然有点简单，但是现在您已经有了一个运行中的应用程序，并且有一个空白的画布可以开始开发。在下一页中，您将学习如何添加一个现代化的亚克力模糊深色背景。
