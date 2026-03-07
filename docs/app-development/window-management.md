---
id: window-management
title: Window management
description: Create, configure, and manage windows and dialogs in Avalonia desktop applications.
doc-type: overview
---

Avalonia provides a flexible windowing system for creating single-window and multi-window desktop applications. This page covers common window management patterns.

## Creating windows

Windows are typically defined in XAML with a code-behind class:

```xml title="SecondWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.SecondWindow"
        Title="Second Window"
        Width="400" Height="300">
    <TextBlock Text="Hello from the second window" />
</Window>
```

```csharp title="SecondWindow.axaml.cs"
public partial class SecondWindow : Window
{
    public SecondWindow()
    {
        InitializeComponent();
    }
}
```

### Opening a window

```csharp
var window = new SecondWindow();
window.Show(); // Non-modal: both windows remain interactive
```

### Opening a modal dialog

```csharp
var dialog = new SecondWindow();
var result = await dialog.ShowDialog<string>(parentWindow);
// Execution resumes here after the dialog closes
```

The parent window is disabled while the dialog is open. Pass the owner window as the parameter to `ShowDialog`.

### Closing with a result

In the dialog, set the result by calling `Close` with a value:

```csharp
// Inside the dialog
Close("user clicked OK");
```

The value is returned from the `ShowDialog<T>` call in the parent.

## Window properties

| Property | Description |
|---|---|
| `Title` | The text displayed in the window title bar. |
| `Width`, `Height` | Initial size. |
| `MinWidth`, `MinHeight` | Minimum allowed size. |
| `MaxWidth`, `MaxHeight` | Maximum allowed size. |
| `WindowStartupLocation` | Where the window appears: `Manual`, `CenterScreen`, `CenterOwner`. |
| `Position` | The window position in screen coordinates (when `WindowStartupLocation` is `Manual`). |
| `CanResize` | Whether the user can resize the window. |
| `CanMinimize` | Whether the minimize button is enabled. Defaults to `true`. |
| `CanMaximize` | Whether the maximize button is enabled. Defaults to `true`. Automatically `false` when `CanResize` is `false`. |
| `IsDialog` | Read-only. `true` when the window was opened with `ShowDialog`, `false` when opened with `Show`. |
| `ShowInTaskbar` | Whether the window appears in the OS taskbar. |
| `Topmost` | Whether the window stays on top of other windows. |
| `WindowState` | Current state: `Normal`, `Minimized`, `Maximized`, `FullScreen`. |
| `SystemDecorations` | Title bar and border style: `Full`, `BorderOnly`, `None`. |
| `ExtendClientAreaToDecorationsHint` | Extends the client area into the title bar area for custom chrome. Uses `WindowDrawnDecorations` for application-drawn decorations. |
| `Icon` | The window icon displayed in the title bar and taskbar. |
| `TransparencyLevelHint` | Enables window transparency: `None`, `Transparent`, `AcrylicBlur`, `Mica`. |
| `ClosingBehavior` | Controls how child windows behave when the owner closes: `OwnerAndChildWindows` (default, children close first and can cancel) or `OwnerWindowOnly` (only the owner's `Closing` event is checked). |

## Window sizing

### Sizing to content

Set `SizeToContent` to let the window size itself based on its content:

```xml
<Window SizeToContent="WidthAndHeight">
    <StackPanel Margin="20">
        <TextBlock Text="The window will size to fit this content." />
        <Button Content="OK" HorizontalAlignment="Right" Margin="0,10,0,0" />
    </StackPanel>
</Window>
```

| Value | Behavior |
|---|---|
| `Manual` | Window uses `Width` and `Height` explicitly (default). |
| `Width` | Width sizes to content, height is explicit. |
| `Height` | Height sizes to content, width is explicit. |
| `WidthAndHeight` | Both dimensions size to content. |

### Saving and restoring window position

```csharp
protected override void OnOpened(EventArgs e)
{
    base.OnOpened(e);

    // Restore saved position
    if (Settings.WindowLeft >= 0 && Settings.WindowTop >= 0)
    {
        Position = new PixelPoint(Settings.WindowLeft, Settings.WindowTop);
        Width = Settings.WindowWidth;
        Height = Settings.WindowHeight;
    }
}

protected override void OnClosing(WindowClosingEventArgs e)
{
    base.OnClosing(e);

    // Save position
    Settings.WindowLeft = Position.X;
    Settings.WindowTop = Position.Y;
    Settings.WindowWidth = Width;
    Settings.WindowHeight = Height;
}
```

## Multi-window patterns

### Tracking open windows

```csharp
public static class WindowManager
{
    private static readonly List<Window> _openWindows = new();

    public static IReadOnlyList<Window> OpenWindows => _openWindows;

    public static void Register(Window window)
    {
        _openWindows.Add(window);
        window.Closed += (_, _) => _openWindows.Remove(window);
    }

    public static void CloseAll()
    {
        foreach (var window in _openWindows.ToList())
            window.Close();
    }
}
```

### Finding the parent window from a control

```csharp
var topLevel = TopLevel.GetTopLevel(myControl);
if (topLevel is Window window)
{
    // Use window
}
```

Or using the extension method:

```csharp
var window = myControl.FindAncestorOfType<Window>();
```

## Preventing window close

Handle the `Closing` event to intercept the close action. Set `e.Cancel = true` to prevent closing:

```csharp
protected override void OnClosing(WindowClosingEventArgs e)
{
    base.OnClosing(e);

    if (HasUnsavedChanges)
    {
        e.Cancel = true;
        // Show a save confirmation dialog instead
        _ = ShowSavePromptAsync();
    }
}
```

## Custom title bar

To create a custom title bar, extend the client area into the decorations and use `WindowDecorations.ElementRole` to mark a region as the title bar:

```xml
<Window ExtendClientAreaToDecorationsHint="True"
        SystemDecorations="None">
    <Grid RowDefinitions="32,*">
        <!-- Custom title bar -->
        <Border Grid.Row="0" Background="#2D2D2D"
                WindowDecorations.ElementRole="TitleBar">
            <TextBlock Text="My App" Foreground="White"
                       VerticalAlignment="Center" Margin="12,0" />
        </Border>
        <!-- Content -->
        <Border Grid.Row="1">
            <TextBlock Text="Window content" />
        </Border>
    </Grid>
</Window>
```

Elements marked with `WindowDecorations.ElementRole="TitleBar"` support native window dragging and double-click-to-maximize. Interactive controls placed inside a title bar region (buttons, text boxes) receive input normally without triggering drag behavior.

For more details on the `ElementRole` values, see the [custom title bar how-to](/docs/how-to/window-how-to#custom-title-bar-with-drag-region).

## Window events

| Event | When it fires |
|---|---|
| `Opened` | The window has been shown for the first time. |
| `Closing` | The window is about to close. Can be cancelled. |
| `Closed` | The window has closed. |
| `Activated` | The window received focus. |
| `Deactivated` | The window lost focus. |
| `PositionChanged` | The window was moved. |
| `Resized` | The window was resized. |

## Working with screens

The `Screens` API provides information about connected monitors. Access it from any `TopLevel`:

```csharp
var screens = TopLevel.GetTopLevel(this)?.Screens;
```

### Querying screens

```csharp
// All connected screens
var allScreens = screens.All;

// Primary monitor
var primary = screens.Primary;

// Screen containing a specific window
var currentScreen = screens.ScreenFromWindow(this);

// Screen at a point
var screenAtPoint = screens.ScreenFromPoint(new PixelPoint(500, 300));
```

### Screen properties

Each `Screen` object exposes:

| Property | Type | Description |
|---|---|---|
| `Bounds` | `PixelRect` | Full screen bounds in pixels. |
| `WorkingArea` | `PixelRect` | Usable area excluding taskbars and docks. |
| `Scaling` | `double` | DPI scaling factor (e.g., 1.0 for 96 DPI, 1.5 for 144 DPI). |
| `IsPrimary` | `bool` | Whether this is the primary display. |
| `DisplayName` | `string?` | The OS-reported display name. |
| `CurrentOrientation` | `ScreenOrientation` | The screen orientation (Landscape, Portrait, and similar). |

### Responding to screen changes

Subscribe to the `Changed` event to detect when monitors are added, removed, or reconfigured:

```csharp
screens.Changed += (sender, args) =>
{
    // Re-evaluate window placement or layout
    var count = screens.All.Count;
};
```

## Platform differences

| Feature | Windows | macOS | Linux |
|---|---|---|---|
| `Topmost` | Supported | Supported | Supported |
| `TransparencyLevelHint` | All levels | `Transparent` only | Depends on compositor |
| `SystemDecorations.None` | Supported | Supported | Supported |
| `ExtendClientAreaToDecorationsHint` | Supported | Supported | Limited support |
| Modal dialogs | Blocks parent window | Sheet-style on macOS | Blocks parent window |

## See also

- [Main Window](/docs/fundamentals/main-window): The primary application window.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): How the application lifecycle manages windows.
