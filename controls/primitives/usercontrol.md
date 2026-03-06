---
id: usercontrol
title: UserControl
---

[`UserControl`](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_UserControl) control is a [ContentControl](/controls/data-display/contentcontrol) that represents a reusable collection of controls in a predefined layout.

`UserControl` actually provides very little functionality on top of `ContentControl`. The difference is that you will not usually create instances of the `UserControl` class directly; instead a new subclass of the `UserControl` class is usually created for each "view" to be shown by an application.

## Common properties

| Property | Description |
| :--- | :--- |
| `Content` | The content to display in the control |

## See also

- [UserControl API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_UserControl)
- [`UserControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs)
