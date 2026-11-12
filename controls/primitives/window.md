---
id: window
title: Window
description: A top-level content control that represents an operating-system window with title bar, icon, and close/minimize/maximize chrome.
doc-type: reference
---

`Window` is a top-level [`ContentControl`](/controls/data-display/contentcontrol) that represents an operating system (OS) window. It provides the title bar, icon, and system chrome, i.e., close, minimize and maximize buttons.

This page covers technical reference information for the `Window` control. For practical guidance on using `Window`, see [How to: Work with windows](/docs/how-to/window-how-to).

:::tip
`Window` is only available on desktop platforms, i.e., Windows, macOS and Linux. If you are targeting mobile or browser, use [`UserControl`](/controls/primitives/usercontrol) with a navigation framework instead.
:::

## When to use

You do not usually create direct instances of `Window`. Instead, subclass `Window` for each type of window your application needs.

## Common properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `Title` | `string` | Text displayed in the title bar. |
| `Icon` | `WindowIcon?` | Icon displayed in the title bar and taskbar. |
| `Height` | `double` | Height of the window. |
| `Width` | `double` | Width of the window. |
| `MaxHeight` | `double` | Maximum allowed height of the window. |
| `MaxWidth` | `double` | Maximum allowed width of the window. |
| `MinHeight` | `double` | Minimum allowed height of the window. |
| `MinWidth` | `double` | Minimum allowed width of the window. |
| `Position` | `PixelPoint` | Position of the window in screen coordinates. |
| `CanResize` | `bool` | Whether the user can resize the window. Defaults to `True`. |
| `CanMinimize` | `bool` | Whether the user can minimize the window. Defaults to `True`. |
| `CanMaximize` | `bool` | Whether the user can maximize the window. Defaults to `True`. Always `False` if `CanResize` is `False`. |
| `SizeToContent` | `SizeToContent` | Controls whether the window auto-sizes to fit its content. `Height`, `Width`, `WidthAndHeight`, or `Manual`. |
| `WindowStartupLocation` | `WindowStartupLocation` | Where the window appears on startup. `Manual`, `CenterScreen`, or `CenterOwner`. |
| `WindowState` | `WindowState` | Current state of the window. `Normal`, `Minimized`, `Maximized` or `FullScreen`. |
| `IsDialog` | `bool` | Whether the window is a dialog. `True` if opened with `ShowDialog`, `False` if opened with `Show`. |
| `ShowInTaskbar` | `bool` | Whether the window appears in the OS taskbar. |
| `Topmost` | `bool` | Whether the window stays above all other windows. |
| `WindowDecorations` | `WindowDecorations` | Whether to show the window chrome and/or borders. `Full`, `BorderOnly`, or `None`. |
| `ExtendClientAreaToDecorationsHint` | `bool` | When `True`, your content extends into the title bar area so you can create custom chrome with [`WindowDrawnDecorations`](/controls/primitives/windowdrawndecorations). |
| `TransparencyLevelHint` | `IReadOnlyList<WindowTransparencyLevel>` | Window transparency. `None`, `Transparent`, `Blur`, `AcrylicBlur`, `Mica`. Default is an empty array.<br /><br />See [How to work with windows](/docs/how-to/window-how-to) for details. |
| `ClosingBehavior` | `WindowClosingBehavior` | How child windows behave when the owner window closes. `OwnerAndChildWindows` is the default and closes children before the window. Set to `OwnerWindowOnly` to close only the owner window. |

### Platform differences

| Feature | Windows | macOS | Linux |
|---|---|---|---|
| `Topmost` | Supported | Supported | Supported |
| `TransparencyLevelHint` | All levels | `Transparent` and native blur (mapped to `AcrylicBlur`) | Depends on compositor |
| `WindowDecorations.None` | Supported | Supported | Supported |
| `ExtendClientAreaToDecorationsHint` | Supported | Supported | Limited support |

## Window events

| Event | When it fires |
|---|---|
| `Opened` | Window is shown for the first time. |
| `Closing` | Window is about to close. Can be cancelled. |
| `Closed` | Window has closed. |
| `Activated` | Window has received focus. |
| `Deactivated` | Window has lost focus. |
| `PositionChanged` | Window was moved. |
| `Resized` | Window was resized. |

## Show, hide, and close a window

You can show a window by calling the `Show` method:

```csharp
var window = new MyWindow();
window.Show();
```

You can close a window by calling `Close`. This has the same effect as when a user clicks the window's close button:

```csharp
window.Close();
```

:::warning
Once a window has been closed, it cannot be shown again. Calling `Show` on a closed window will throw an exception. If you need to show the same window again later, call `Hide` instead of `Close`.
:::

```csharp
window.Hide();

// You can show the window again later.
window.Show();
```

See also [Prevent a window from closing](#prevent-a-window-from-closing).

## Show a window as a dialog

You can show a window as a modal dialog by calling `ShowDialog`. This method requires you to pass an owner window so the system knows which window the dialog belongs to:

```csharp
// "this" is the current Window instance.
// You can also obtain the main window from
// Application.ApplicationLifetime cast to IClassicDesktopStyleApplicationLifetime.
var ownerWindow = this;
var dialog = new MyWindow();
dialog.ShowDialog(ownerWindow);
```

`ShowDialog` returns a `Task`, so you can `await` it to wait until the dialog is closed:

```csharp
var dialog = new MyWindow();
await dialog.ShowDialog(ownerWindow);
```

### Return a result from a dialog

Your dialog can return a result by passing a value to the `Close` method. The caller reads the result through the generic `ShowDialog<T>` overload:

```csharp
public class MyDialog : Window
{
    public MyDialog()
    {
        InitializeComponent();
    }

    private void OkButton_Click(object? sender, EventArgs e)
    {
        Close("OK Clicked!");
    }
}
```

```csharp
var dialog = new MyDialog();

// The result is a string, so use ShowDialog<string>.
var result = await dialog.ShowDialog<string>(ownerWindow);
```

## Prevent a window from closing

You can prevent a window from closing by handling the `Closing` event and setting `e.Cancel = true`:

```csharp
window.Closing += (s, e) =>
{
    e.Cancel = true;
};
```

A common pattern is to hide the window instead of closing it so you can show it again later:

```csharp
window.Closing += (s, e) =>
{
    ((Window)s!).Hide();
    e.Cancel = true;
};
```

## Practical notes

- **Startup window.** Your application's main window is typically set in `App.axaml.cs` by assigning `MainWindow` on the `IClassicDesktopStyleApplicationLifetime`. See [Main window](/docs/fundamentals/main-window) for details.
- **Multiple windows.** You can open as many windows as you need by creating new instances and calling `Show`. Each window runs independently within the same application.
- **Positioning.** Use the `Position` property (of type `PixelPoint`) to set the window's screen coordinates, or set `WindowStartupLocation` to `CenterScreen` or `CenterOwner`.
- **Closing behavior.** When the last window closes, your application exits by default. You can change this by setting `ShutdownMode` on the application lifetime.

## See also

- [Main window](/docs/fundamentals/main-window)
- [How to: Work with windows](/docs/how-to/window-how-to)
- [`WindowDrawnDecorations`](/controls/primitives/windowdrawndecorations)
- [`ContentControl`](/controls/data-display/contentcontrol)
- [`UserControl`](/controls/primitives/usercontrol)
- [`Window` source code (GitHub)](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Window.cs)
- [`Window` API reference](/api/avalonia/controls/window)