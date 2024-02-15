---
description: CONCEPTS
---

import CompositionBasicLayoutDiagram from '/img/concepts/composition-basic-layout.png';
import CompositionTreesDiagram from '/img/concepts/composition-trees.png';
import CompositionUserControlsDiagram from '/img/concepts/composition-usercontrol.png';
import CompositionCollectionControlsDiagram from '/img/concepts/composition-collection-controls.png';

# UI组合

UI组合是创建应用程序所需布局的过程。它允许您从组件的排列中构建复杂的视图。其优点包括：

* _封装_ - 通过将XAML和代码限制在组件所需的范围内，减少每个组件的复杂性，使您的代码更易于理解和维护。
* _重用_ - 维护应用程序中重复部分的一致性呈现和行为。

_Avalonia UI_使您能够轻松使用UI组合来创建应用程序所需的布局和功能。

在使用_Avalonia UI_构建应用程序时，有几种不同类型的组件可供选择：

* 窗口
* 内置控件
* 用户控件
* 自定义控件
* 模板控件

## 窗口和内置控件

在_Avalonia UI_中，窗口是布局的基本单位（用于窗口平台）。

_Avalonia UI_包含大量内置控件，可以满足大多数UI需求。

当您第一次接触_Avalonia UI_时，您可能会将一个内置控件放置在窗口的内容区域中（上图左侧）。这是最简单的UI组合形式：窗口具有应用程序的标题，通常还有一些窗口状态控件（取决于目标平台）。内置控件允许您的应用程序接收一些用户输入，或者以布局和样式呈现一些输出。

稍微复杂一些的应用程序可能需要使用内置布局控件在窗口的内容区域中排列多个其他内置控件（上图右侧）。

:::info
要查看Avalonia UI内置控件的完整范围，请参阅此处的参考部分[here](../reference/controls/)。
:::

## 逻辑树和视觉树

无论您使用的是哪种控件排列方式，_Avalonia UI_都将它们的关系表示为树结构，以“最外层”控件作为根。因此，例如，前面的UI组合可以表示为此处显示的树：

<img src={CompositionTreesDiagram} alt=""/>

这是**逻辑控件树**，它表示应用程序控件（包括主窗口）在XAML中定义的层次结构。_Avalonia UI_中有许多处理逻辑控件树及其伴生的**视觉控件树**的系统。

:::info
有关控件树概念的更多信息，请参阅[here](control-trees.md)。
:::

## 用户控件

用户控件是_Avalonia UI_中UI组合的主要组成部分。

<img src={CompositionUserControlsDiagram} alt=""/>

您可以将用户控件添加到主窗口的内容区域中，以表示“页面视图”（上图左侧）。这允许您使用自己的用户控件（XAML和代码文件）为每个页面实现布局和功能，从而创建一个更复杂的应用程序。

:::info
有关如何使用视图实现多页面应用程序的更多信息，请参阅此处的指南[here](../guides/development-guides/how-to-implement-multi-page-apps.md)。
:::

用户控件的另一个用途是作为组件控件（上图右侧）。您可能最初这样做是为了减少窗口或页面视图的复杂性，但随后您可能还会（也许稍后）在另一个页面上重用生成的组件。

## 教程

:::info
在“待办事项列表应用程序”教程中，您将学习如何将用户控件添加为页面视图；以及如何使用重复布局控件来呈现带有数据模板的项目集合。请在[这里](../tutorials/todo-list-app/)尝试教程。  
:::

## 集合控件

另一种UI组合的变体是需要呈现一组项目的情况。

<img src={CompositionCollectionControlsDiagram} alt=""/>

这种情况将使用内置的重复控件之一，绑定到一个集合；以及使用数据模板来表示集合中的项目。

:::info
有关如何 TO DO 的信息
:::

## 自定义控件

在不太可能找到一个适用于您的应用程序UI需求的_Avalonia UI_内置控件的情况下，您可以从头开始创建自定义控件。这允许您定义自己的自定义属性、事件和方法；但它还需要您从头开始实现控件呈现的绘制。

:::info
要了解如何实现自定义控件，请参阅[这里](../basics/user-interface/controls/creating-controls)的指南。
:::

## 模板化控件

模板化控件使用_Avalonia UI_的**样式**系统，将UI布局中的一个标签替换为一个

:::info
有关_Avalonia UI_ **样式**系统背后的概念的更多信息，请参阅[这里](../basics/user-interface/styling)。
:::