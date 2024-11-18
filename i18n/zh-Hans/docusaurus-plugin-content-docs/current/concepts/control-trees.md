---
description: CONCEPTS
---

import ControlTreesLogicalScreenshot from '/img/concepts/control-trees-logical.png';
import ControlTreesVisualScreenshot from '/img/concepts/control-trees-visual.png';
import ControlTreesEventScreenshot from '/img/concepts/control-trees-events.png';

# 控件树

_Avalonia UI_ 从应用程序的 XAML 文件中创建控件树，以便能够渲染 UI 并管理应用程序的功能。

## 逻辑树

逻辑控件树以 XAML 中定义的层次结构表示应用程序控件（包括主窗口）。例如：窗口中的一个控件（按钮）在另一个控件（堆栈面板）内部，将形成一个三层的逻辑树。

<img src={ControlTreesLogicalScreenshot} alt=""/>

在应用程序运行时，您可以打开 _Avalonia Dev Tools_ 窗口（按 F12 键）。这将在其 **逻辑树** 选项卡上显示逻辑树。

## 可视树

可视控件树包含 _Avalonia UI_ 实际运行的所有内容。它显示了控件上设置的所有属性，以及 _Avalonia UI_ 添加的所有额外部分，以呈现 UI 并管理应用程序的功能。

<img src={ControlTreesVisualScreenshot} alt=""/>

您可以在 _Avalonia Dev Tools_ 窗口的 **可视树** 选项卡上查看可视控件树。

## 事件

_Avalonia UI_ 执行应用程序功能管理的一个重要部分是事件的生成和传播。**事件** 选项卡记录了事件的源和传播，当您在运行的应用程序中移动或与其交互时。

<img src={ControlTreesEventScreenshot} alt=""/>
