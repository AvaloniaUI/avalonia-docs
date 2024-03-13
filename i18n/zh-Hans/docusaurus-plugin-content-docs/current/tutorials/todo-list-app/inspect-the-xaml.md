---
description: TUTORIALS - To Do List App
---

# 检查 XAML

现在是时候看一下视图模板生成的代码了。

首先从根元素开始，它的命名空间和设置的声明如下：

```xml
 <UserControl 
    xmlns="https://github.com/avaloniaui"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
    x:Class="ToDoList.Views.ToDoListView">
```
XAML 文件中的根元素以 `<UserControl` 开始，后面跟着一些 _Avalonia UI_ 控件的常见 XML `xmlns` 命名空间声明。值得注意的最重要的声明是第一个：

```xml
<UserControl xmlns="https://github.com/avaloniaui" ... >
```

这表示文件中的 XAML 包含 _Avalonia UI_ XAML。

:::warning
如果没有这个声明，您的 _Avalonia UI_ 项目将无法工作！
:::

下一个命名空间是 `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` 用于导入 _Avalonia UI_ 使用的 Microsoft XAML 语言特性。

:::info
有关更多信息，请参阅 [Microsoft 文档](https://learn.microsoft.com/en-us/dotnet/desktop/xaml-services/namespace-language-features).
:::

其余的两个命名空间用于向 _Avalonia UI_ 设计器（代码和预览窗格）传递信息。

```xml
<UserControl ...
     xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
     xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ... > 
```

例如，就像您已经做过的那样，您可以在设计时预览窗格中指定控件的宽度和高度：

<pre class="language-xml"><code class="lang-xml">&#x3C;UserControl ...
<strong>mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450" ... ></strong></code></pre>

`mc:Ignorable="d"` 条目告诉 _Avalonia UI_ XAML 引擎在运行时可以忽略以 `d:` 开头的条目。

最后一行将 XAML 文件链接到其代码后台类。请注意，这里必须使用完全限定的类名。

```xml
<UserControl ...
   x:Class="ToDoList.Views.ToDoListView">
```

## 控件内容

用户控件的内容区域由 DockPanel 占据：

```xml
<DockPanel>
```

:::info
要了解布局区域的概念，请参阅 [这里](../../concepts/layout/layout-zones).
:::

用户控件只能包含一个子控件在其内容区域中，因此您通常需要以 _Avalonia UI_ 面板控件之一开始布局，因为这些面板允许您在空间中包含多个子控件。

:::info
您可以在参考部分浏览完整范围的 _Avalonia UI_ [面板控件](../../reference/controls/panel.md)。
:::

在这个例子中，您使用了 `<DockPanel>` 控件。这是一种面板类型，它沿着其内容区域的边缘布局其子控件。每个子控件都可以指定哪个边：顶部、底部、左侧或右侧。这是通过 `DockPanel.Dock` 属性完成的。例如，这个 XAML 将一个按钮对齐在视图底部，并且它会被拉伸以适合宽度，并且它的文本居中。

```xml
<Button DockPanel.Dock="Bottom"
    HorizontalAlignment="Stretch"
    HorizontalContentAlignment="Center">Add Item</Button>
```

在 DockPanel 中，必须有一个单一的控件填充其内容区域的剩余空间（无论该空间位于何处）；否则它将无法正确显示。这个填充控件不能有 `DockPanel.Dock` 属性。本教程使用 StackPanel 来填充剩余空间：

```xml
<StackPanel>
```

StackPanel 在默认情况下会将其子控件垂直堆叠。（您可以通过设置 `Orientation` 属性使堆叠水平。）在 _Avalonia UI_ 布局中，您会经常使用 StackPanel。

:::info
有关 StackPanel 的更多细节，请参阅参考 [这里](../../reference/controls/stackpanel.md).
:::

剩余的 XAML 将硬编码的待办事项列表项作为复选框添加：

```xml
<CheckBox Margin="4">Walk the dog</CheckBox>
<CheckBox Margin="4">Buy some milk</CheckBox>
```

请注意，这些控件设置了 margin 属性。这将在视觉上将它们分隔开一点。

:::info
margin 是 _Avalonia UI_ 控件布局区域之一。要了解布局区域的概念，请参阅 [这里](../../concepts/layout/layout-zones).
:::

在下一页中，您将学习如何在应用程序的主窗口中显示此处创建的视图。
