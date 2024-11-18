---
description: CONCEPTS
---

import MvvmPatternDiagram from '/img/guides/implementation-guides/mvvm-architecture.png';

# MVVM模式

<img src={MvvmPatternDiagram} alt=""/>

Model-View-View Model（MVVM）模式是一种常见的UI应用程序结构方式。它使用数据绑定系统来帮助在视图和视图模型之间传递数据。这意味着它实现了应用程序逻辑（视图模型）与UI显示（视图）的分离。

应用程序逻辑与业务服务（模型）之间的分离通常通过依赖注入（DI）系统来实现。

对于简单的应用程序来说，MVVM可能有些过度设计；但随着应用程序的发展，往往会出现在同一UI组件模块中保持显示定义和应用程序逻辑的问题：

* UI组件之间的交互变得复杂且容易出错。
* 由于依赖于目标UI平台，对UI组件进行单元测试变得困难。

MVVM通过将应用程序逻辑抽象为仅包含代码的类来解决这个问题，这些类不依赖于目标UI平台，因此可以独立进行单元测试。

:::info
要了解有关MVVM模式背景的更多信息，请参阅_Microsoft Patterns and Practices_文章[这里](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/hh848246(v=pandp.10))。
:::

## 何时使用MVVM？

与事件驱动的代码后台模式相比，MVVM是一种更复杂的编程模式。您需要额外学习_ReactiveUI_框架的技术，该框架将用于在_Avalonia UI_中实现MVVM。

事实上，对于一个小型简单的应用程序，代码后台模式可能更容易理解和维护。

:::info
有关如何使用代码后台模式在_Avalonia UI_中编程的详细信息，请参阅[这里](../../basics/user-interface/code-behind)。
:::

使用MVVM模式的优势只有在应用程序增长并变得更加复杂时才会显现出来。因此，您有两种开发策略可以考虑：

1. 首先使用更简单的代码后台模式。如果应用程序变得难以维护，再考虑转换到MVVM。
2. 从一开始就使用MVVM，因为您预计应用程序会不断增长。

您可以使用以下页面来了解如何在_Avalonia UI_中使用MVVM，无论您采用上述哪种策略。


