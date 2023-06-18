---
id: usercontrols
title: UserControls
---

`UserControl` represents a "view" in Avalonia, which is a reusable collection of controls in a predefined layout.

A `UserControl` usually consists of two parts: a XAML file \(e.g. `MyUserControl.axaml`\) and a code-behind file \(e.g. `MyUserControl.axaml.cs`\). The code-behind defines a .NET class which represents the control.

`UserControl`s are often paired with "view models" when using the MVVM pattern. For more information see the [tutorial](../../tutorials/todo-list-app/).

You can create `UserControl`s from templates:

### Visual Studio

1. Right click the folder in Solution Explorer that you'd like to add the control to
2. Select the `Add -> New Item` menu item
3. In the dialog that appears, navigate to the "Avalonia" section in the category tree
4. Select "UserControl \(Avalonia\)"
5. Enter your control name under "Name"
6. Click the "Add" button

### .NET Core CLI

Run this command replacing `[namespace]` with the namespace you'd like to create the `UserControl` in and `[name]` with the name of the control.

```bash
dotnet new avalonia.usercontrol -p:n [namespace] -n [name]
```

For more information see [the .NET core templates repository](https://github.com/AvaloniaUI/avalonia-dotnet-templates/).
