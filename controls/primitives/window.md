---
id: window
title: Window
description: A top-level content control that represents an operating-system window with title bar, icon, and close/minimize/maximize chrome.
doc-type: reference
---

[`Window`](/api/avalonia/controls/window) is a top-level [`ContentControl`](/controls/data-display/contentcontrol) that represents an operating-system window. It provides the title bar, icon, and system chrome (close, minimize, maximize buttons) that your users expect from a desktop application.

You do not usually create instances of `Window` directly. Instead, you subclass `Window` for each type of window your application needs.

:::tip
`Window` is only available on desktop platforms (Windows, macOS, Linux). If you are targeting mobile or browser, use [`UserControl`](/controls/primitives/usercontrol) with a navigation framework instead.
:::

## Common properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `Title` | `string` | The text displayed in the title bar. |
| `Icon` | `WindowIcon` | The icon displayed in the title bar and taskbar. |
| `SizeToContent` | `SizeToContent` | Controls whether the window auto-sizes to fit its content horizontally, vertically, or both. |
| `WindowState` | `WindowState` | Gets or sets whether the window is `Normal`, `Minimized`, `Maximized`, or `FullScreen`. |
| `CanResize` | `bool` | Gets or sets whether the user can resize the window. |
| `ShowInTaskbar` | `bool` | Gets or sets whether the window appears in the operating-system taskbar. |
| `Topmost` | `bool` | Gets or sets whether the window stays above all other windows. |
| `SystemDecorations` | `SystemDecorations` | Controls the window chrome (title bar and borders). Set to `None` for a borderless window. |
| `ExtendClientAreaToDecorationsHint` | `bool` | When `true`, your content extends into the title bar area, allowing custom chrome. |

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
- [Window management](/docs/app-development/window-management)
- [How to: Work with windows](/docs/how-to/window-how-to)
- [`ContentControl`](/controls/data-display/contentcontrol)
- [`UserControl`](/controls/primitives/usercontrol)
- [`Window` source code (GitHub)](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Window.cs)
- [`Window` API reference](/api/avalonia/controls/window)