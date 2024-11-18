---
description: CONCEPTS - The MVVM Pattern
---

import MvvmDataBindingDiagram from '/img/concepts/mvvm/mvvm.png';

# Avalonia UI和MVVM

在本页面中，您将了解如何在使用_Avalonia UI_时实现MVVM模式。

## 视图和视图模型

当您在_Avalonia UI_中使用MVVM模式时，您需要实现一个视图，它由一个带有代码后台文件的AXAML文件和一个普通的代码类文件组成，以及一个视图模型。

在_Avalonia UI_中，视图是由窗口或用户控件（都是带有代码后台的AXAML文件）中的UI元素组成的组合。组合中的UI元素可以是_Avalonia UI_内置控件、用户控件以及您自己设计和实现的（更高级的）控件的混合。

:::info
要查看_Avalonia UI_内置控件的完整列表，请参阅参考部分[此处](../../reference/controls/)。
:::

:::info
要了解有关UI组合的概念的更多信息，请参阅[此处](../ui-composition.md)。
:::

:::info
要了解如何设计和实现自己的控件，请参阅[此处](../../guides/custom-controls/how-to-create-a-custom-controls-library.md)。
:::

## 数据绑定

数据绑定是允许_Avalonia UI_ MVVM应用程序将视图与视图模型分离的关键技术。您可以将视图与视图模型之间的关系可视化为通过数据绑定连接的两个层：

<img src={MvvmDataBindingDiagram} alt=""/>

请注意，其中一些数据绑定由双向箭头表示，而其他数据绑定则由单向箭头表示。例如，名称和地址输入是双向的 - 您希望将视图模型中的任何更改通知视图，并且将视图中的输入更新到视图模型。

但是，按钮具有单向命令，由视图发出并由视图模型执行。

请注意，视图模型类不依赖于视图层，也不依赖于_Avalonia UI_将如何在目标平台上渲染。因为视图模型类是独立的，所以它可以像任何其他代码一样进行单元测试。

当您在实践中使用MVVM模式时，您将为每个视图使用一个相应的视图模型，视图模型类包含了视图的所有应用程序逻辑。

## MVVM模型

模型是MVVM模式的另一部分。模型在模式中没有被严格定义，因为它们代表着“架构的其余部分”。这通常是数据存储或其他服务。

对您来说，重要的原则是分离。您应该使用某种形式的依赖注入（DI）模式来实现视图模型和模型之间的关系。

## ReactiveUI

有许多框架旨在帮助使用MVVM模式编写应用程序。

在接下来的页面中，您将了解到_ReactiveUI_框架，这是最受欢迎的框架之一，并且由一个_Avalonia UI_包支持。