---
id: usercontrol
title: UserControl
description: A base class for creating reusable composite controls with a predefined XAML layout.
doc-type: reference
---

The [`UserControl`](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_UserControl) control is a [ContentControl](/controls/data-display/contentcontrol) that represents a reusable collection of controls in a predefined layout.

`UserControl` actually provides very little functionality on top of `ContentControl`. The difference is that you will not usually create instances of the `UserControl` class directly; instead a new subclass of the `UserControl` class is usually created for each "view" to be shown by an application.

## Common properties

| Property | Description |
| :--- | :--- |
| `Content` | The content to display in the control |

## Basic example

The following example defines a simple `UserControl` with a `StackPanel` layout containing a `TextBlock` and a `Button`:

```xml title='MyCustomView.axaml'
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MyCustomView">
    <StackPanel>
        <TextBlock Text="Hello from a UserControl!" />
        <Button Content="Click me" />
    </StackPanel>
</UserControl>
```

You can then use your `UserControl` in a `Window` or any other container by referencing its namespace:

```xml
<Window xmlns:local="clr-namespace:MyApp">
    <local:MyCustomView />
</Window>
```

## When to use `UserControl`

`UserControl` is the standard approach for creating views in MVVM applications. Each view in your application is typically a `UserControl` subclass paired with a corresponding view model. If you need a control that supports custom templates and theme styling, consider creating a [`TemplatedControl`](/controls/primitives/templatedcontrol) instead.

## See also

- [ContentControl](/controls/data-display/contentcontrol)
- [Creating custom controls](/docs/custom-controls/defining-properties)
- [UserControl API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_UserControl)
- [`UserControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs)
