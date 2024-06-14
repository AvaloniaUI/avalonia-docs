---
id: developer-tools
title: 开发者工具
---

import DevToolsOverviewScreenshot from '/img/guides/implementation-guides/devtools-overview.png';
import DevToolsPropertiesScreenshot from '/img/guides/implementation-guides/devtools-properties.png';
import DevToolsLayoutScreenshot from '/img/guides/implementation-guides/devtools-layout.png';
import DevToolsStylesScreenshot from '/img/guides/implementation-guides/devtools-styles.png';
import DevToolsOverriddenStylesScreenshot from '/img/guides/implementation-guides/devtools-overridden-styles.png';
import DevToolsSetterContextMenuScreenshot from '/img/guides/implementation-guides/devtools-setter-contextmenu.png';
import DevToolsEventsScreenshot from '/img/guides/implementation-guides/devtools-events.png';
import DevToolsChangePropertyScreenshot from '/img/guides/implementation-guides/devtools-change-property.gif';
import DevToolsChangeLayoutScreenshot from '/img/guides/implementation-guides/devtools-change-layout.gif';

# 开发者工具

Avalonia 内置了一个开发工具窗口，可以通过在 `Window` 构造函数中调用附加的 `AttachDevTools()` 方法来启用。在程序以 `DEBUG` 模式编译时，默认模板已启用此功能：

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }
}

// 在由 Avalonia.NameGenerator 自动生成的 MainWindow.g.cs中：
partial class MainWindow
{
    // ...
    public void InitializeComponent(bool loadXaml = true, bool attachDevTools = true)
    {
        // ...
#if DEBUG
        if (attachDevTools)
        {
            this.AttachDevTools();
        }
#endif
        // ...
    }
}
```

要打开 DevTools，请按 F12 键，或向 `this.AttachDevTools()` 方法传递不同的 `Gesture` 手势。

:::info
要使用 DevTools，必须添加 `Avalonia.Diagnostics` nuget 软件包。

```bash
dotnet add package Avalonia.Diagnostics --version 11.0.0
```

但默认情况下，它已经安装好了。
:::

<img className="center" src={DevToolsOverviewScreenshot} alt="" />

在 .NET core 2.1 下运行时存在一个已知问题，即按 F12 会导致程序退出。在这种情况下，要么切换到 .NET core 2.0 或 3.0+，要么将打开手势改为其他手势，如 "Ctrl+F12"。

## 逻辑树和视觉树

`Logical Tree` 和 `Visual Tree` 选项卡显示窗口逻辑树和视觉树中的控件。选择一个控件后，右侧窗格中将显示该控件的属性，可以对其进行编辑。

### 属性

允许快速检查和编辑控件的属性。还可以搜索属性（按名称或使用正则表达式）。

| 列   | 描述                   |
| -------- | ----------------------------- |
| Property | 属性名          |
| Value    | 属性的当前值 |
| Type     | 当前值的类型     |
| Priority | 值的优先级        |

<img className="center" src={DevToolsPropertiesScreenshot} alt="" />

### 布局

允许检查和编辑常见的布局属性（`Margin`、`Border`、`Padding`）。\
控件的尺寸和尺寸约束也会显示。

:::info
如果 `Width` 或 `Height` 带有下划线，这表明该属性属于活动约束。悬停在值上会显示包含相关信息的工具提示。
:::

<img className="center" src={DevToolsLayoutScreenshot} alt="" />

### 样式

[属性](developer-tools.md#属性)面板显示属性的当前活动值，而样式面板则显示所有值及其来源。

此外，还可以查看可能与该控件匹配的所有样式（通过切换 `Show inactive` 选项）。

按下 `Snapshot` 按钮或将鼠标悬停在目标窗口上时按下 `Alt+S`，即可快照当前样式。快照意味着样式面板不会更新以反映控件的新状态。这在排除与 `:pointerover` 或 `:pressed` 选择器有关的问题时很有用。

:::info
如果设置值与资源绑定，则会以一个圆圈表示，后面跟着资源键。
:::

<img className="center" src={DevToolsStylesScreenshot} alt="" />

:::info
如果给定值带有删除线，则表示该值被优先级更高的样式值覆盖。
:::

<img className="center" src={DevToolsOverriddenStylesScreenshot} alt="" />

Setters 有一个上下文菜单，允许快速将名称和值复制到剪贴板。

<img className="center" src={DevToolsSetterContextMenuScreenshot} alt="" />

## 事件

事件选项卡可用于跟踪 [事件](../../concepts/input/) 的传播。在左侧窗格中选择要跟踪的事件类型，所有此类型的事件将显示在中上方窗格中。选择其中一个事件以查看事件路由。

:::info
事件名称或控件类型下的虚线表示可以进行快速导航。

* 双击事件类型将选择并滚动到给定的事件类型
* 双击控件类型（和/或名称）将导航到视觉树选项卡并选择该控件。

:::

<img className="center" src={DevToolsEventsScreenshot} alt="" />

## 热键

| 组合键 | 功能                      |
| ---------------- | ------------------------------|
| Alt+S            | 启用快照样式        |
| Alt+D            | 禁用快照样式       |
| CTRL+Shift       | 检查指针指向的控件  |
| CTRL+Alt+F       | 切换弹出窗口冻结           |
| F8               | 对逻辑树或可视树中的选定项目截图|

## 示例

### 更改属性值

<img className="center" src={DevToolsChangePropertyScreenshot} alt="" />

### 更改布局属性

<img className="center" src={DevToolsChangeLayoutScreenshot} alt="" />
