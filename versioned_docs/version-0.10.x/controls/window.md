---
id: window
title: Window
---

[`Window`](http://reference.avaloniaui.net/api/Avalonia.Controls/Window/) is a top-level [`ContentControl`](https://docs.avaloniaui.net/docs/controls/contentcontrol).

You will not usually create instances of the `Window` class directly; instead the `Window` class is usually sub-classed for each type of window to be shown by an application. For information on how to create new window classes from templates see the [quickstart](https://docs.avaloniaui.net/docs/getting-started/windows).

### Common Properties <a id="common-properties"></a>

| Property | Description |
| :--- | :--- |
| `Title` | The window title |
| `Icon` | The window icon |
| `SizeToContent` | Describes the window's auto-sizing behavior |
| `WindowState` | The minimized/maximized state of the window |

### Reference <a id="reference"></a>

[Window](http://reference.avaloniaui.net/api/Avalonia.Controls/Window/)

### Source code <a id="source-code"></a>

[Window.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Window.cs)

### The main window <a id="the-main-window"></a>

The main window is the window passed to `ApplicationLifetime.MainWindow` in the `OnFrameworkInitializationCompleted` method of your your `App.axaml.cs` file:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktopLifetime)
    {
        desktopLifetime.MainWindow = new MainWindow();
    }
}
```

It can be retrieved at any time by casting `Application.ApplicationLifetime` IClassicDesktopStyleApplicationLifetime.

:::info
Mobile and browser platforms don't have a concept of Window in Avalonia.
Instead you need to set MainView control in Application.ApplicationLifetime when it implements ISingleViewApplicationLifetime interface.
:::

### Show, hide and close a window <a id="show-hide-and-close-a-window"></a>

You can show a window using the `Show` method:

```csharp
var window = new MyWindow();
window.Show();
```

Windows can be closed using the `Close` method. This has the same effect as when a user clicks the window's close button:

```csharp
window.Close();

// A closed window cannot be shown.
window.Show();
```

Note that once a window has been closed, it cannot be shown again. If you want to re-show the window then you should use the `Hide` method:

```csharp
window.Hide();

// Window can now be shown again later
window.Show();
```

See also [Prevent a window from closing](https://docs.avaloniaui.net/docs/controls/window#prevent-a-window-from-closing)

### Show a window as a dialog <a id="show-a-window-as-a-dialog"></a>

You can show a window as a modal dialog by calling the `ShowDialog` method. `ShowDialog` requires an owner window to be passed:

```csharp
// Here we assume this code is executed from our current Window class and "this" object is a Window.
// Alternatively you can get global MainWindow from Application.ApplicationLifetime casted to IClassicDesktopStyleApplicationLifetime.
var ownerWindow = this;
var window = new MyWindow();
window.ShowDialog(ownerWindow);
```

The `ShowDialog` method will return immediately. If you want to wait for the dialog to be closed, you can `await` the call:

```csharp
var window = new MyWindow();
await window.ShowDialog(ownerWindow);
```

Dialogs can return a result by calling the `Close` method with an object. This result can then be read by the caller of `ShowDialog`. For example:

```csharp
public class MyDialog : Window
{
    public MyDialog()
    {
        InitializeComponent();
    }

    private void OkButton_Click(object sender, EventArgs e)
    {
        Close("OK Clicked!");
    }
}
```

```csharp
var dialog = new MyDialog();

// The result is a string so call `ShowDialog<string>`.
var result = await dialog.ShowDialog<string>(ownerWindow);
```

### Prevent a window from closing <a id="prevent-a-window-from-closing"></a>

A window can be prevented from closing by handling the `Closing` event and setting `e.Cancel = true`:

```csharp
window.Closing += (s, e) =>
{
    e.Cancel = true;
};
```

You could also hide the window instead. This allows the window to be re-shown after the user clicks the close button:

```csharp
window.Closing += (s, e) =>
{
    ((Window)s).Hide();
    e.Cancel = true;
};
```
