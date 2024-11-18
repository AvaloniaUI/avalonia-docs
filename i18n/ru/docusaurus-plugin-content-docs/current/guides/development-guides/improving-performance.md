---
id: improving-performance
title: Improving Performance
---

The performance of Avalonia applications can be significantly improved by taking into account several key considerations during the development process. This document discusses the steps you can take to optimize the performance of your Avalonia applications.

## Use CompiledBindings

One of the most effective ways to improve performance in Avalonia is to use [`CompiledBindings`](../../basics/data/data-binding/compiled-bindings) in your application. Compiled bindings enable faster data binding by compiling the binding path at compile time, thus reducing the overhead of reflection at runtime. 

## Choose the Right Control for Data Display

When you need to display a large amount of data in a `DataGrid` or a `TreeView` with many nodes, it is recommended to use the `TreeDataGrid` control. `TreeDataGrid` is built from scratch and provides better performance than the normal `DataGrid`. It supports virtualization and is particularly useful if you need a virtualized tree, as it has hierarchical data templates.

Avoid using the `DataGrid` control if you don't need editing features. It's generally regarded as a less optimal control for performance.

## Virtualization

When working with large amounts of data, enabling virtualization can improve the performance of your Avalonia application. Virtualization means that only the visible items in the control are rendered, which significantly improves the performance when there are a large number of items to display.

### TreeDataGrid

`TreeDataGrid` supports virtualization and can handle thousands of rows with complex cells effectively.

## Optimize Your Visual Tree Structure

Performance can often be hindered by a deeply nested and complicated layout. Strive to maintain your XAML markup as uncomplicated and flat as possible. Rendering UI elements onscreen triggers a "layout pass" twice for every single element (a measure pass followed by an arrange pass).

This layout pass process is computation-heavy—the more child elements an item has, the more calculations are needed. Therefore, minimizing the complexity of your visual tree in Avalonia UI can significantly enhance the application's performance.

## Minimize Use of Run for Setting Text Properties

It's advisable to minimize the use of Run within a TextBlock as it can lead to more resource-demanding operations. If you're utilizing Run to define text properties, consider setting those properties directly on the TextBlock instead. This practice can help enhance the performance of your application.

## Use StreamGeometries Over PathGeometries

When dealing with geometries in Avalonia UI, `StreamGeometry` is a more efficient alternative to `PathGeometry`. `StreamGeometry` is specifically optimized to handle numerous `PathGeometry` objects, consuming less memory and offering superior performance. Hence, when a choice is available, it's recommended to use `StreamGeometry` over `PathGeometry` for improved application performance.

## Use Reduced Image Sizes

When your application necessitates the display of smaller images or thumbnails, it's beneficial to generate and use reduced-size versions of your images. By default, Avalonia will load and decode your image at its original full size, which can potentially lead to performance bottlenecks if you're loading large images and scaling them down to thumbnail sizes in controls like an `ItemsControl`.

## Resolve Your Binding Errors 

Binding errors are a prevalent source of performance issues in Avalonia UI applications. Each occurrence of a binding error causes a performance dip as the application attempts to resolve the binding and logs the error to the trace log. Naturally, the more binding errors present, the greater the impact on performance. 

A significant contributor to binding errors is the use of `RelativeSource` bindings in `DataTemplates`, as the binding usually isn't resolved correctly until the `DataTemplate` has completed its initialization. It's recommended to avoid `RelativeSource.FindAncestor` entirely. A more efficient approach is to define an attached property and utilize property inheritance to push values down the visual tree, rather than performing a lookup of the visual tree.

## Asynchronously Load Data 

Performance issues, UI freezes, and unresponsive applications often stem from the way data is loaded. To prevent overloading the UI thread, ensure that your data is loaded asynchronously. 































