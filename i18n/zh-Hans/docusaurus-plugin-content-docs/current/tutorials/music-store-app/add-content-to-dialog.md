---
description: TUTORIALS - Music Store App
---

import MusicStoreDialogContentDiagram from '/img/gitbook-import/assets/image (9) (3).png';

# 添加对话框内容

在这个页面上，您将学习如何向对话框窗口添加一些内容。这些内容将包括搜索控件和对话框关闭按钮，以及一个用于显示专辑封面的占位符列表。这些封面将作为搜索结果加载。

为了布局对话框控件，您将使用 _Avalonia UI_ 内置控件中的停靠面板布局控件。这将使搜索控件无论高度如何，都始终位于对话框的顶部，按钮位于底部。列表将会是停靠面板的“填充”区域，因此它将始终占据所有剩余的内容区域。

<img className="center" src={MusicStoreDialogContentDiagram} alt="" />

:::info
有关停靠面板控件的完整信息，请参阅[此处](../../reference/controls/dockpanel.md)的参考文档。
:::

停靠面板本身将位于一个 _Avalonia UI_ 用户控件上。这样，显示对话框的代码可以与对话框内部控件的操作代码分离。

:::info
这是 UI 组合的常见模式，要了解这个概念，请参阅[此处](../../concepts/ui-composition.md)。
:::

按照以下步骤添加用户控件和对话框的组成控件：

- 如果应用程序仍在运行，请停止应用程序。
- 在解决方案资源管理器中，右键单击 **/Views** 文件夹，然后单击**添加**。
- 单击 **Avalonia User Control**。
- 在提示输入名称时，键入 “MusicStoreView”。
- 按回车键。
- 修改用户控件的内容区域的 XAML 如下所示：

```xml
<UserControl ... >
  <DockPanel>
    <StackPanel DockPanel.Dock="Top">
      <TextBox Watermark="Search for Albums...." />
      <ProgressBar IsIndeterminate="True"  />
    </StackPanel>
      <Button Content="Buy Album" 
              DockPanel.Dock="Bottom" 
              HorizontalAlignment="Center" />
      <ListBox/>
  </DockPanel>
</UserControl>
```

在对话框中，用户将能够搜索专辑，但这将使用 Web API，并可能需要一些时间才能返回结果。因此，您添加了一个进度条。进度条将在搜索过程中处于活动状态，以向用户提供视觉反馈。

此外，为了确保应用程序在搜索过程中保持响应，您将操作本身实现为异步和可取消的，在本教程的后面会添加此功能。

现在，下一步是将新的用户控件添加到对话框窗口的内容区域中。

要添加用户控件，请按照以下步骤进行操作：

- 找到并打开 **MusicStoreWindow.axaml** 文件。
- 在 `<Window>` 元素中添加视图的命名空间：

```xml
<Window ...
    xmlns:views="using:Avalonia.MusicStore.Views" >    
```

- 在面板元素内部，添加一个新的用户控件元素：

```xml
<Panel Margin="40">
   <views:MusicStoreView/>
</Panel>
```

您将在预览窗格中看到这些控件。

在下一页中，您将学习如何使用模拟的专辑搜索功能，这样您就可以创建结果的视图和视图模型，留到以后来实现真正的搜索。
