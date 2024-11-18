---
id: types-of-control
title: 控件类型
---

如果您想创建自己的控件，Avalonia中有三个主要的控件类型。首先要做的是选择最适合您使用场景的控件类型。

### 用户控件(User Controls)
`UserControl`是创建控件的最简单方法。这种类型的控件最适合特定于应用程序的“视图”或“页面”。`UserControl`的创建方式与创建`Window`的方式相同：通过从模板创建一个新的`UserControl`，并向其添加控件。

### 模板化控件(Templated Controls)
`TemplatedControl`最适用于可以在各种应用程序之间共享的通用控件。它们是无外观的控件，意味着可以为不同的主题和应用程序重新定义样式。Avalonia定义的大多数标准控件属于此类型。

:::info
在WPF/UWP中，您将从`Control`类继承以创建新的模板控件，但在Avalonia中，您应该从`TemplatedControl`继承。
:::

:::info
如果您想为模板化控件提供单独的样式文件，请记得通过StyleInclude将此文件包含在您的应用程序中。
:::

### 基本控件(Basic Controls)
基本控件是用户界面的基础——它们通过重写`Visual.Render`方法使用几何图形进行绘制。`TextBlock`和`Image`等控件属于此类型。

:::info
在WPF/UWP中，您将从`FrameworkElement`类继承以创建新的基本控件，但在Avalonia中，您应该从`Control`继承。
:::
