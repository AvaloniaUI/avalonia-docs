---
id: scrollviewer
title: ScrollViewer
---

The `ScrollViewer` control scrolls its content if the content is bigger than the space available. A `ScrollViewer` cannot be contained in a control that has infinite height or width (depending on scrolling direction) such as a `StackPanel`. To avoid it, you can either set fixed Height/Width or MaxHeight/MaxWidth or choose another container panel.

## ScrollChaining
If you have one `ScrollViewer` nested inside another `ScrollViewer` and the user hits any limit of the inner `ScrollViewer`, you can specify if the parent `ScrollViewer` should continue with the scroll event or not. You can enable or disable this behavior with the attached property `ScrollViewer.IsScrollChainingEnabled=[true|false]`. The default value is `true`. 

This property is available from these Controls: 
- ScrollViewer
- [DataGrid](./datagrid)
- [ListBox](./listbox)
- [TextBox](./textbox)
- [TreeView](./treeview)

## Reference

[ScrollViewer](http://reference.avaloniaui.net/api/Avalonia.Controls/ScrollViewer/)

## Source code

[ScrollViewer.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ScrollViewer.cs)