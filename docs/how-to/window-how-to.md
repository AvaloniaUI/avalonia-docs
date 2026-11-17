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

## Setting Window Size and Position

### Fixed size on startup

```xml
<Window Width="800" Height="600"
        WindowStartupLocation="CenterScreen">
```

### Minimum and maximum size

```xml
<Window MinWidth="400" MinHeight="300"
        MaxWidth="1920" MaxHeight="1080">
```

### Startup location

| Value | Description |
|---|---|
| `Manual` | Position set by `Position` property. |
| `CenterScreen` | Centered on the primary screen. |
| `CenterOwner` | Centered on the owner window (for dialogs). |

## Showing a Dialog Window

Use `ShowDialog<T>` to open a modal dialog and get a result:

```csharp
var dialog = new SettingsWindow();
var result = await dialog.ShowDialog<bool>(this);
if (result)
{
    // User confirmed
}
```

Return a result by calling `Close` with a value:

```csharp
// In the dialog window
private void OnOkClick(object sender, RoutedEventArgs e)
{
    Close(true);
}

private void OnCancelClick(object sender, RoutedEventArgs e)
{
    Close(false);
}
```

## Getting the Parent Window

From any control, use `TopLevel.GetTopLevel`:

```csharp
var topLevel = TopLevel.GetTopLevel(this);
if (topLevel is Window window)
{
    await new MyDialog().ShowDialog<bool>(window);
}
```

## Preventing Window Close

Handle the `Closing` event to intercept close attempts:

```csharp
protected override void OnClosing(WindowClosingEventArgs e)
{
    if (HasUnsavedChanges)
    {
        e.Cancel = true;
        // Show save prompt
    }
    base.OnClosing(e);
}
```

## Window State (Minimize, Maximize, Restore)

```csharp
// Programmatically control window state
window.WindowState = WindowState.Maximized;
window.WindowState = WindowState.Minimized;
window.WindowState = WindowState.Normal;
```

```xml
<Button Content="Maximize" Command="{Binding MaximizeCommand}" />
```

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

## Disabling Minimize and Maximize Buttons

Use `CanMinimize` and `CanMaximize` to control whether the title bar buttons are enabled:

```xml
<Window CanMinimize="False" CanMaximize="False">
```

When `CanResize` is `false`, `CanMaximize` is automatically set to `false`.

:::note
Platform behavior varies. On Windows, disabled buttons are hidden. On macOS, they appear greyed out. On Linux, behavior depends on the window manager.
:::

## Hiding the Title Bar (Chromeless Window)

Create a borderless window by disabling system decorations:

```xml
<Window WindowDecorations="None"
        ExtendClientAreaToDecorationsHint="True"
        Background="Transparent"
        TransparencyLevelHint="AcrylicBlur">
```

### Creating a custom title bar

Mark an element as a title bar to allow users to drag the window using that element. On most platforms, the operating system automatically enables drag and double-click-to-maximize behavior on the designated title bar.

1. In your `<Window>` tag, set `ExtendClientAreaToDecorationsHint` to `True`.
2. Add a control to act as your custom title bar.
3. Set its `WindowDecorationProperties.ElementRole` to `TitleBar`.

```xml
<Grid RowDefinitions="32,*">

    <!-- Custom title bar -->
    <Border Grid.Row="0" Background="#1E1E2E"
            WindowDecorationProperties.ElementRole="TitleBar">
        <DockPanel Margin="8,0">
            <TextBlock Text="My App" VerticalAlignment="Center" Foreground="White" />
            <StackPanel DockPanel.Dock="Right" Orientation="Horizontal"
                        HorizontalAlignment="Right">
                <!-- ElementRole must be set per button for some platforms -->
                <Button WindowDecorationProperties.ElementRole="MinimizeButton" Content="_" Click="OnMinimize" />
                <Button WindowDecorationProperties.ElementRole="MaximizeButton" Content="□" Click="OnMaximize" />
                <Button WindowDecorationProperties.ElementRole="CloseButton" Content="✕" Click="OnClose" />
            </StackPanel>
        </DockPanel>
    </Border>

    <!-- Content -->
    <ContentControl Grid.Row="1" Content="Hello world!" />

</Grid>
```

The `ElementRole` property supports these values:

| Value | Behavior |
|---|---|
| `None` | No special window chrome behavior (default). |
| `TitleBar` | Acts as a draggable title bar region. |
| `ResizeN`, `ResizeS`, `ResizeE`, `ResizeW` | Resize grip for the specified edge. |
| `ResizeNE`, `ResizeNW`, `ResizeSE`, `ResizeSW` | Resize grip for the specified corner. |

Interactive controls inside a `TitleBar` region (such as buttons) continue to receive input normally and do not trigger window dragging.

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

## Saving and Restoring Window Position

```csharp
protected override void OnOpened(EventArgs e)
{
    base.OnOpened(e);
    var settings = LoadSettings();
    if (settings.WindowWidth > 0)
    {
        Width = settings.WindowWidth;
        Height = settings.WindowHeight;
    }
}

protected override void OnClosing(WindowClosingEventArgs e)
{
    SaveSettings(new AppSettings
    {
        WindowWidth = Width,
        WindowHeight = Height,
        WindowState = WindowState
    });
    base.OnClosing(e);
}
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

## See Also

- [Window Control Reference](/controls/primitives/window): Property tables.
- [Dialogs How-To](/docs/how-to/dialogs-how-to): Dialog patterns and file pickers.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): Desktop vs mobile lifetime models.
