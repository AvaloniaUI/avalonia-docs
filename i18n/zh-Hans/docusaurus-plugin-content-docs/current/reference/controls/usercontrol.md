---
id: usercontrol
title: UserControl
---

[`UserControl`](http://reference.avaloniaui.net/api/Avalonia.Controls/UserControl/) control is a [ContentControl](contentcontrol) that represents a reusable collection of controls in a predefined layout.

`UserControl` actually provides very little functionality on top of `ContentControl`. The difference is that you will not usually create instances of the `UserControl` class directly; instead a new subclass of the `UserControl` class is usually created for each "view" to be shown by an application.

### Common Properties

| Property | Description |
| :--- | :--- |
| `Content` | The content to display in the control |

### Reference

[UserControl](http://reference.avaloniaui.net/api/Avalonia.Controls/UserControl/)

### Source code

[UserControl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs)
