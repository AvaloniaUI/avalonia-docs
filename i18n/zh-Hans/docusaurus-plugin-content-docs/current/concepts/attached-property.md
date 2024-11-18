---
description: CONCEPTS
---

import AttachedControlDiagram from '/img/concepts/attached-control.png';
import AttachedLayoutPropertyDiagram from '/img/concepts/attached-layout-property.png';

# 附加属性

_Avalonia UI_ 控件支持**附加属性**的概念。这是应用于子控件的属性，它引用其容器控件。

在 XAML 中，附加属性被定义为子控件元素的属性，使用以下格式：`ContainerClassName.AttachedPropertyName="value"`

以下是一些使用附加属性的场景：

## 附加控件

附加控件是附加到“主控件”上的额外控件，用于某些目的。这可以在控件通常只允许一个子控件在其内容区域时使用。在这种情况下，附加控件不被视为内容的一部分，但容器会以其他方式使用它。示例包括：上下文菜单、工具提示和弹出窗口。

<img src={AttachedControlDiagram} alt=""/>

## 布局控件

附加布局属性用于容器控件需要了解将要排列的子控件的情况的场景。示例包括：网格、停靠面板和相对面板。

<img src={AttachedLayoutPropertyDiagram} alt=""/>

:::info
有关 _Avalonia UI_ 内置控件的完整列表，请参阅[此处](../reference/controls/)的参考。
:::


