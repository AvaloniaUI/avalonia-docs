---
id: window-how-to
title: "How to: Work with Windows"
description: Sizing, positioning, dialogs, multi-window apps, startup behavior, and system chrome options.
doc-type: how-to
---

This guide covers common Window scenarios: sizing, positioning, dialogs, multi-window apps, startup behavior, and system chrome.

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
<Window SystemDecorations="None"
        ExtendClientAreaToDecorationsHint="True"
        Background="Transparent"
        TransparencyLevelHint="AcrylicBlur">
```

### Custom title bar with drag region

Mark an element as a title bar drag region using the `WindowDecorations.ElementRole` attached property. The operating system handles drag and double-click-to-maximize behavior automatically:

```xml
<Grid RowDefinitions="32,*">
    <!-- Custom title bar -->
    <Border Grid.Row="0" Background="#1E1E2E"
            WindowDecorations.ElementRole="TitleBar">
        <DockPanel Margin="8,0">
            <TextBlock Text="My App" VerticalAlignment="Center" Foreground="White" />
            <StackPanel DockPanel.Dock="Right" Orientation="Horizontal"
                        HorizontalAlignment="Right">
                <Button Content="_" Command="{Binding MinimizeCommand}" />
                <Button Content="□" Command="{Binding MaximizeCommand}" />
                <Button Content="✕" Command="{Binding CloseCommand}" />
            </StackPanel>
        </DockPanel>
    </Border>

    <!-- Content -->
    <ContentControl Grid.Row="1" Content="{Binding CurrentView}" />
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

### Transparent click-through window

To create a transparent overlay window where mouse clicks pass through empty areas to applications underneath, set `TransparencyLevelHint="Transparent"` and remove the window's `Background` by setting it to `{x:Null}`. Interactive controls placed in the window remain clickable.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        TransparencyLevelHint="Transparent"
        Background="{x:Null}"
        SystemDecorations="None"
        Topmost="True"
        WindowState="Maximized">
    <Grid>
        <!-- This button is clickable; empty areas pass input through -->
        <Button Content="Click Me"
                HorizontalAlignment="Center"
                VerticalAlignment="Center" />
    </Grid>
</Window>
```

The key difference is between `Background="{x:Null}"` and `Background="Transparent"`:

| Background value | Visual result | Hit testing |
|---|---|---|
| `{x:Null}` | Transparent | Empty areas pass clicks through to windows behind |
| `Transparent` | Transparent | Empty areas block clicks (the window captures all input) |

This distinction applies at every level in Avalonia, from individual panels to the window itself. For more details, see [Background and hit testing](/docs/graphics-animation/hit-testing#background-and-hit-testing).

:::tip[Migrating from WPF]
In WPF, setting `AllowsTransparency="True"` with `Background="Transparent"` on a `Window` allows clicks to pass through transparent areas by default. Avalonia behaves differently: `Background="Transparent"` still captures input. Set `Background="{x:Null}"` instead to get the WPF-like click-through behavior.
:::

## Window Icon

```xml
<Window Icon="/Assets/app-icon.ico">
```

Or set it in code:

```csharp
Icon = new WindowIcon(AssetLoader.Open(new Uri("avares://MyApp/Assets/app-icon.ico")));
```

## Key Properties

| Property | Type | Description |
|---|---|---|
| `Title` | `string` | Window title bar text. |
| `WindowState` | `WindowState` | `Normal`, `Minimized`, `Maximized`, `FullScreen`. |
| `WindowStartupLocation` | `WindowStartupLocation` | `Manual`, `CenterScreen`, `CenterOwner`. |
| `SystemDecorations` | `SystemDecorations` | `Full`, `BorderOnly`, `None`. |
| `CanResize` | `bool` | Whether the user can resize the window. |
| `CanMinimize` | `bool` | Whether the minimize button is enabled. Defaults to `true`. |
| `CanMaximize` | `bool` | Whether the maximize button is enabled. Defaults to `true`. Automatically `false` when `CanResize` is `false`. |
| `Topmost` | `bool` | Keep the window above all others. |
| `ShowInTaskbar` | `bool` | Show in the OS taskbar. |
| `Icon` | `WindowIcon` | Window icon for title bar and taskbar. |
| `TransparencyLevelHint` | `WindowTransparencyLevel` | Requested transparency: `None`, `Transparent`, `Blur`, `AcrylicBlur`, `Mica`. |

## See Also

- [Window Control Reference](/controls/primitives/window): Property tables.
- [Dialogs How-To](/docs/how-to/dialogs-how-to): Dialog patterns and file pickers.
- [Window Management](/docs/app-development/window-management): Window lifecycle.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): Desktop vs mobile lifetime models.
