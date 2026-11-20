---
id: window-management
title: Window management
description: Create, configure, and manage windows and dialogs in Avalonia desktop applications.
doc-type: overview
---

Avalonia provides a flexible windowing system for creating single-window and multi-window desktop applications. This page covers common window management patterns.

## Window sizing

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

## Custom title bar

To create a custom title bar, extend the client area into the decorations and use `WindowDecorationProperties.ElementRole` to mark a region as the title bar:

```xml
<Window ExtendClientAreaToDecorationsHint="True"
        WindowDecorations="None">
    <Grid RowDefinitions="32,*">
        <!-- Custom title bar -->
        <Border Grid.Row="0" Background="#2D2D2D"
                WindowDecorationProperties.ElementRole="TitleBar">
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

Elements marked with `WindowDecorationProperties.ElementRole="TitleBar"` support native window dragging and double-click-to-maximize. Interactive controls placed inside a title bar region (buttons, text boxes) receive input normally without triggering drag behavior.

For more details on the `ElementRole` values, see the [custom title bar how-to](/docs/how-to/window-how-to#custom-title-bar-with-drag-region).

## See also

- [Main Window](/docs/fundamentals/main-window): The primary application window.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): How the application lifecycle manages windows.
