---
id: window-how-to
title: "How to: Work with windows"
description: Sizing, positioning, dialogs, multi-window apps, startup behavior, and system chrome options.
doc-type: how-to
---

This guide covers practical usage of the [`Window`](/controls/primitives/window) control.

## Creating a window

Add a new `.axaml` file containing the window's XAML, together with a dependent [code-behind](/docs/fundamentals/code-behind) class.

<Tabs>

<TabItem value="xaml" label="MyWindow.axaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.MyWindow"
        Title="MyWindow"
        Width="400" Height="300">
    <TextBlock Text="Hello world!" />
</Window>
```

</TabItem>

<TabItem value="code-behind" label="MyWindow.axaml.cs">

```csharp
using Avalonia.Controls;

namespace MyApp.Views;

public partial class MyWindow : Window
{
    public MyWindow()
    {
        InitializeComponent();
    }
}
```

</TabItem>

</Tabs>

## Opening and closing

### Opening a window

Open a window by calling the `Show` method.

```csharp
var window = new MyWindow();
window.Show();
```

### Opening a modal dialog

Open a window as a modal dialog by calling the `ShowDialog` method. This method requires you to pass an owner window, so that the system knows which window the dialog belongs to. The owner window is inactive while the dialog is open.

```csharp
var dialog = new MyWindow();
var ownerWindow = this; // "this" makes the current window the owner
dialog.ShowDialog(ownerWindow);
```

### Closing a window

Close a window by calling the `Close` method.

```csharp
Close();
```

### Hiding a window

Hide a window by calling the `Hide` method. `Hide` does not close the window, meaning you can show the same window again by calling `Show`.

```csharp
Hide();
```

:::danger
If the window was closed instead of hidden, calling `Show` throws an exception.
:::

### Closing a modal dialog with a result

A window opened as a [modal dialog](#opening-a-modal-dialog) can be set to return a result on close. You can do this by giving the `Close` method a value.

```csharp title="MyWindow.axaml.cs"
Close("User has acknowledged");
```

The owner window can read the result through the `ShowDialog<T>` method. Use this method with `async` so that it can await the dialog closure.

```csharp title="MainWindow.axaml.cs"
private async void OpenModal(object? sender, RoutedEventArgs e)
{
    var dialog = new MyWindow();
    var ownerWindow = this; // "this" makes the current window the owner
    var result = await dialog.ShowDialog<string?>(ownerWindow);
}
```

You can then further process the result however you need. For example, to use the text of the result elsewhere on the UI:

```csharp
DialogResultText.Text = result;
```

## Preventing a window from closing

You can prevent a window from closing by handling the `Closing` event and cancelling it with `e.Cancel = true`. A common pattern, demonstrated below, is to stop the window from closing and have it [hide](#hiding-a-window) instead, so that it can be opened again later.

```csharp
window.Closing += (s, e) =>
{
    // Change the window to hide instead of close
    ((Window)s!).Hide();

    // Cancel the closing event
    e.Cancel = true;
};
```

## Window states: Minimize and maximize

### Changing window state in code

To programmatically control the window state, set `WindowState` to one of `Minimized`, `Maximized` or `Normal`.

```csharp
window.WindowState = WindowState.Minimized;
window.WindowState = WindowState.Maximized;
window.WindowState = WindowState.Normal;
```

As an example, you may wish to let the user maximize the window with a button on the UI, rather than with the window chrome.

<Tabs>

<TabItem value="xaml" label="XAML">

```xml
<Button Content="Maximize" Command="{Binding MaximizeCommand}" />
```

</TabItem>

<TabItem value="code-behind" label="Code-behind">

```csharp
[RelayCommand]
private void Maximize()
{
    if (Application.Current?.ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        var window = desktop.MainWindow;
        window.WindowState = window.WindowState == WindowState.Maximized
            ? WindowState.Normal
            : WindowState.Maximized;
    }
}
```

</TabItem>

</Tabs>

### Disabling minimize and maximize chrome buttons

Use `CanMinimize` and `CanMaximize` to control whether the minimize and maximize buttons in the title bar are enabled.

Note that, if [`CanResize`](/controls/primitives/window#common-properties) is `False`, `CanMaximize` is always `False`.

```xml
<Window CanMinimize="False" CanMaximize="False">
```

:::note
Platform behavior varies. Some platforms hide disabled buttons (e.g., Windows). Others may gray out disabled buttons (e.g., macOS).
:::

## Sizing and positioning

### Default size

The size set by `Width` and `Height` is the window's default size on startup. It can still be resized by the user, unless `CanResize` is `False`.

```xml
<Window Width="800" Height="600">
```

### Minimum and maximum size

Set a minimum and/or maximum window size by using the `Min`- and `Max`-prefixed properties.

```xml
<Window MinWidth="400" MinHeight="300"
        MaxWidth="1920" MaxHeight="1080">
```

### Size to content

Set `SizeToContent` to let the window size itself based on its content.

```xml
<Window SizeToContent="WidthAndHeight">
```

Accepted values for `SizeToContent` are:

| Value | Behavior |
|---|---|
| `Manual` | Default. Window uses the values of `Width` and `Height`. |
| `Width` | Width sizes to content, height is explicit. |
| `Height` | Height sizes to content, width is explicit. |
| `WidthAndHeight` | Both dimensions size to content. |

### Startup location

Use `WindowStartupLocation` and/or `Position` to have the window open at a specific location on the screen.

`Position` coordinates are ignored if you set `WindowStartupLocation` to any value other than `Manual`.

```xml
<Window WindowStartupLocation="Manual"
        Position="100,100">
```

Accepted values for `WindowStartupLocation` are:

| Value | Description |
|---|---|
| `Manual` | Default. Uses coordinates from the `Position` property. |
| `CenterScreen` | Centered on the primary screen. |
| `CenterOwner` | [Modal dialogs](#opening-a-modal-dialog) only. Centered on the owner window. |

### Saving and restoring window position

To remember the window's position on close so that it can reopen at its last location, make the following changes in its [code-behind](/docs/fundamentals/code-behind) file:

1. Set a save destination to save the window's position to disk.
2. Add a method that saves the window's `PixelPoint` coordinates to the specified save file.
3. Add a method that loads `PixelPoint` coordinates from the specified save file.
4. Add an `OnClosing` event to trigger the save method when the window is closing.
5. Add an `OnOpened` event to trigger the load method when the window opens, and use its output to position the window.

```csharp title="MyWindow.axaml.cs"
using System;
using System.IO;
using System.Linq;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace MyApp.Views;

public partial class MyWindow : Window
{
    // Window's last position is saved to disk as a file.
    private static readonly string PositionFile = Path.Combine(
        Environment.GetFolderPath(DESTINATION_FOLDER),
        "MyWindow.position");

    public MyWindow()
    {
        InitializeComponent();
    }

    // On open, restore the saved position.
    protected override void OnOpened(EventArgs e)
    {
        base.OnOpened(e);

        if (TryLoadPosition(out var saved) && IsOnAnyScreen(saved))
        {
            Position = saved;
        }
    }

    // On close, save the window's position.
    protected override void OnClosing(WindowClosingEventArgs e)
    {
        base.OnClosing(e);

        // Do not save if the close is cancelled,
        // or the window is in a minimized/maximized state.
        if (!e.Cancel && WindowState == WindowState.Normal)
        {
            SavePosition(Position);
        }
    }

    // Method to load the window's saved position from the filepath specified above.
    private static bool TryLoadPosition(out PixelPoint position)
    {
        try
        {
            position = PixelPoint.Parse(File.ReadAllText(PositionFile));
            return true;
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or FormatException)
        {
            // Use default placement if the file is unreadable or does not exist.
            position = default;
            return false;
        }
    }

    // Method to save the window's position to the filepath specified above.
    private static void SavePosition(PixelPoint position)
    {
        try
        {
            Directory.CreateDirectory(Path.GetDirectoryName(PositionFile)!);
            File.WriteAllText(PositionFile, position.ToString());
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            // Failing to save the position must not prevent the window from closing.
        }
    }
}
```

:::tip
You can use the same approach to save and restore a window's height, width and [window state](#window-states-minimize-and-maximize).
:::

## Getting the parent window

From any control, use `TopLevel.GetTopLevel` to get its parent window.

```csharp
var topLevel = TopLevel.GetTopLevel(this);
if (topLevel is Window window)
{
    // Do something with the window
}
```

## Creating a chromeless or borderless window

Set [`WindowDecorations`](/controls/primitives/window#common-properties) to `BorderOnly` to hide the title bar. Set the same property to `None` to hide both the title bar and the border lines.

You can combine a borderless window with `ExtendClientAreaToDecorationsHint="True"` to create a [custom title bar](#creating-a-custom-title-bar).

```xml
<Window WindowDecorations="None">
```

### Creating a custom title bar

Mark an element as a title bar to allow users to drag the window using that element.

On most platforms, the operating system automatically enables drag and double-click-to-maximize behavior on the designated title bar. Interactive controls inside a `TitleBar` region, such as buttons, receive input normally without triggering window drag.

1. In your `<Window>` tag, set `ExtendClientAreaToDecorationsHint` to `True`.
2. Add a control to act as your custom title bar.
3. Set its `WindowDecorationProperties.ElementRole` to `TitleBar`.

```xml
<Window ExtendClientAreaToDecorationsHint="True"
        WindowDecorations="None">
  <Grid RowDefinitions="32,*">

    <!-- Custom title bar -->
    <Border Grid.Row="0"
            Background="Blue"
            WindowDecorationProperties.ElementRole="TitleBar">
      <TextBlock Text="My App"
                 VerticalAlignment="Center"
                 Foreground="White" />
    </Border>

    <!-- Content -->
    <ContentControl Grid.Row="1" Content="Hello world!" />

  </Grid>
</Window>
```

Accepted values for the `ElementRole` property are:

| Value | Behavior |
|---|---|
| `None` | Default. No window chrome behavior. |
| `TitleBar` | Draggable title bar. |
| `ResizeN`, `ResizeS`, `ResizeE`, `ResizeW` | Resize grip for the specified edge. |
| `ResizeNE`, `ResizeNW`, `ResizeSE`, `ResizeSW` | Resize grip for the specified corner. |

## Multi-Window Application

Open additional windows from the main window:

```csharp
[RelayCommand]
private void OpenNewWindow()
{
    var window = new SecondaryWindow
    {
        DataContext = new SecondaryViewModel()
    };
    window.Show();
}
```

For a non-modal window that stays on top of the owner:

```csharp
var toolWindow = new ToolWindow();
toolWindow.Show(ownerWindow); // Stays above owner
```

## Window Transparency

```xml
<!-- Acrylic blur (platform-dependent) -->
<Window TransparencyLevelHint="AcrylicBlur"
        Background="Transparent">
    <Panel>
        <ExperimentalAcrylicBorder Material="{DynamicResource AcrylicMaterial}" />
        <!-- Content on top of acrylic -->
    </Panel>
</Window>
```

Check which transparency levels are supported at runtime:

```csharp
var supported = this.ActualTransparencyLevel;
```

If `ActualTransparencyLevel` returns a lower level than requested, this may be due to an OS restriction rather than a configuration error. For example, macOS and Linux have more limited support for transparency, and Windows may suppress compositor effects when in battery saver mode. It is advisable to set a [`TransparencyBackgroundFallback`](/docs/fundamentals/top-level#transparencybackgroundfallback) with a solid color appropriate for your UI, in case transparency is unavailable on the user's device.

:::note
Avalonia currently does not support WPF-like transparent click-through behavior.

If you wish to create a transparent click-through window using native platform APIs, please see our guidance on [Native platform interop](/docs/app-development/native-interop).
:::

## Window Icon

```xml
<Window Icon="/Assets/app-icon.ico">
```

Or set it in code:

```csharp
Icon = new WindowIcon(AssetLoader.Open(new Uri("avares://MyApp/Assets/app-icon.ico")));
```

## See also

- [Window control reference](/controls/primitives/window): Full property, event and method tables for `Window`.
- [Main window](/docs/fundamentals/main-window): The primary application window.
- [How to: Work with dialogs](/docs/how-to/dialogs-how-to): Dialog patterns and file pickers.
- [Application lifetimes](/docs/fundamentals/application-lifetimes): Desktop vs mobile lifetime models.
