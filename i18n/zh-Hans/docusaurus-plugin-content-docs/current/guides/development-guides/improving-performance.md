---
id: improving-performance
title: 提高性能
---

改进Avalonia应用程序的性能可以通过在开发过程中考虑几个关键因素来实现。本文介绍了优化Avalonia应用程序性能的步骤。


## 使用 CompiledBindings

在Avalonia中提高性能的最有效方法之一是在应用程序中使用[`CompiledBindings`](../../basics/data/data-binding/compiled-bindings)。编译绑定通过在编译时编译绑定路径，从而减少了运行时反射的开销，从而加快了数据绑定速度。

## 选择适合数据显示的控件

当您需要在`DataGrid`或`TreeView`中显示大量数据或节点时，建议使用`TreeDataGrid`控件。`TreeDataGrid`从头构建，比普通的`DataGrid`具有更好的性能。它支持虚拟化，并且在需要虚拟化树时特别有用，因为它支持分层数据模板。

如果不需要编辑功能，请避免使用`DataGrid`控件，因为它通常被认为对性能不太优化。

## 虚拟化

在处理大量数据时，启用虚拟化可以提高Avalonia应用程序的性能。虚拟化意味着只有可见控件中的项目才会被渲染，这在需要显示大量项目时显著提高了性能。

### TreeDataGrid
`TreeDataGrid`支持虚拟化，并且可以有效地处理成千上万行复杂的单元格。

## 优化可视树结构

性能通常会受到深层嵌套和复杂的布局的影响。努力保持XAML标记尽可能简单和扁平化，因为在屏幕上渲染UI元素会触发“布局传递”（一次测量传递，然后是排列传递）。

这个布局过程非常消耗计算资源，每个元素会触发两次布局传递，子元素越多，计算量越大。因此，在Avalonia UI中尽量减少可视树的复杂性可以显著提高应用程序的性能。

## 减少对Run的使用以设置文本属性

建议尽量减少在`TextBlock`中使用`Run`，因为它可能导致更多的资源消耗。如果使用`Run`来定义文本属性，请考虑直接在`TextBlock`上设置这些属性。这样做有助于提高应用程序的性能。

## 使用StreamGeometries代替PathGeometries

在Avalonia UI中处理几何图形时，`StreamGeometry`是`PathGeometry`的更高效替代品。`StreamGeometry`经过专门优化，用于处理大量的`PathGeometry`对象，占用更少的内存并提供更优异的性能。因此，当有选择时，建议使用`StreamGeometry`而不是`PathGeometry`以提高应用程序的性能。

## 使用减小尺寸的图片

当您的应用程序需要显示较小的图像或缩略图时，最好生成并使用图像的缩小版本。默认情况下，Avalonia会加载和解码原始大小的图像，如果您加载大图像并在像`ItemsControl`这样的控件中将它们缩小到缩略图大小，可能会导致性能瓶颈。

## 解决绑定错误

绑定错误是Avalonia UI应用程序性能问题的一个普遍来源。每次绑定错误发生时，应用程序都会尝试解析绑定并将错误记录到跟踪日志，这会导致性能下降。当绑定错误越多，对性能的影响越大。

绑定错误的一个重要原因是在`DataTemplates`中使用`RelativeSource`绑定，因为绑定通常在`DataTemplate`完成初始化之前无法正确解析。建议避免使用`RelativeSource.FindAncestor`。一种更高效的方法是定义一个附加属性，并利用属性继承将值传递到可视树下，而不是查找可视树。

## 异步加载数据

性能问题、UI卡顿和无响应的应用程序通常源自数据加载方式。为了防止过载UI线程，请确保异步加载数据。
