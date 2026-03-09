---
id: notifications-how-to
title: "How to: Show notifications and toasts"
description: Learn how to show overlay notifications, toast messages, status bars, and system tray notifications in your Avalonia application across desktop and mobile platforms.
doc-type: how-to
---

This guide covers patterns for showing notifications, toast messages, and status bars in your Avalonia application. Because Avalonia does not include a built-in notification control, you build your own using standard layout controls such as [`ItemsControl`](/api/avalonia/controls/itemscontrol), `Panel`, and `Border`.

## Overlay notification panel

A common pattern is a notification panel that slides in from a corner of the window. You can build one with an `ItemsControl` and transitions.

### Notification model

```csharp
public partial class NotificationViewModel : ObservableObject
{
    public string Message { get; }
    public string Type { get; } // "info", "success", "error", "warning"

    public NotificationViewModel(string message, string type = "info")
    {
        Message = message;
        Type = type;
    }
}
```

### Notification service

The service below manages a collection of active notifications and handles auto-dismissal. Note that `Dispatcher.UIThread.Post` is required because `Task.Delay(...).ContinueWith(...)` resumes on a thread-pool thread, and you must marshal collection changes back to the UI thread.

```csharp
public partial class NotificationService : ObservableObject
{
    public ObservableCollection<NotificationViewModel> Notifications { get; } = new();

    public void Show(string message, string type = "info", int durationMs = 3000)
    {
        var notification = new NotificationViewModel(message, type);
        Notifications.Add(notification);

        // Auto-dismiss after the specified duration
        if (durationMs > 0)
        {
            _ = Task.Delay(durationMs).ContinueWith(_ =>
                Dispatcher.UIThread.Post(() => Notifications.Remove(notification)));
        }
    }

    [RelayCommand]
    private void Dismiss(NotificationViewModel notification)
    {
        Notifications.Remove(notification);
    }
}
```

:::tip
If you set `durationMs` to `0`, the notification stays visible until the user explicitly dismisses it. This is useful for error messages that require acknowledgement.
:::

### XAML overlay

Place this at the root of your main window as the last child in a `Panel` so it overlays all other content:

```xml
<Panel>
    <!-- Main content -->
    <ContentControl Content="{Binding CurrentView}" />

    <!-- Notification overlay -->
    <ItemsControl ItemsSource="{Binding Notifications.Notifications}"
                  HorizontalAlignment="Right" VerticalAlignment="Top"
                  Margin="16" MaxWidth="360">
        <ItemsControl.ItemTemplate>
            <DataTemplate>
                <Border Background="#1E1E2E" CornerRadius="8" Padding="12,8"
                        Margin="0,0,0,8" BorderBrush="#333" BorderThickness="1">
                    <Grid ColumnDefinitions="*,Auto">
                        <TextBlock Text="{Binding Message}" TextWrapping="Wrap"
                                   Foreground="White" VerticalAlignment="Center" />
                        <Button Grid.Column="1" Content="x" FontSize="10"
                                Background="Transparent" Foreground="Gray"
                                Padding="4,2" Margin="8,0,0,0"
                                Command="{Binding $parent[ItemsControl].((vm:NotificationService)DataContext).DismissCommand}"
                                CommandParameter="{Binding}" />
                    </Grid>
                </Border>
            </DataTemplate>
        </ItemsControl.ItemTemplate>
    </ItemsControl>
</Panel>
```

:::note
On mobile platforms (Android and iOS), consider placing notifications at the top of the screen where they do not overlap soft navigation buttons. Adjust `VerticalAlignment` and `Margin` to account for safe area insets on devices with notches or rounded corners.
:::

### Usage in a view model

```csharp
public partial class MainViewModel : ObservableObject
{
    public NotificationService Notifications { get; } = new();

    [RelayCommand]
    private async Task SaveAsync()
    {
        await _repository.SaveAsync();
        Notifications.Show("Changes saved successfully.", "success");
    }
}
```

## Simple status bar

For less intrusive feedback, use a status bar at the bottom of your window:

```xml
<DockPanel>
    <Border DockPanel.Dock="Bottom" Background="#F3F4F6" Padding="8,4">
        <TextBlock Text="{Binding StatusMessage}" FontSize="12" Foreground="Gray" />
    </Border>

    <!-- Main content -->
    <ContentControl Content="{Binding CurrentView}" />
</DockPanel>
```

```csharp
[ObservableProperty]
private string _statusMessage = "Ready";

[RelayCommand]
private async Task LoadDataAsync()
{
    StatusMessage = "Loading...";
    await _dataService.LoadAsync();
    StatusMessage = "Loaded 42 items.";

    // Clear after delay
    await Task.Delay(3000);
    StatusMessage = "Ready";
}
```

:::warning
If the user triggers `LoadDataAsync` multiple times in quick succession, the `Task.Delay` from an earlier call can reset the status message while a newer operation is still running. To avoid this, use a `CancellationTokenSource` that you cancel each time the method is re-entered.
:::

## Confirmation banner

Show a banner at the top of the page for important messages:

```xml
<StackPanel>
    <!-- Banner -->
    <Border Background="#FEF3C7" Padding="12,8"
            IsVisible="{Binding ShowBanner}">
        <Grid ColumnDefinitions="*,Auto">
            <TextBlock Text="{Binding BannerMessage}" Foreground="#92400E"
                       VerticalAlignment="Center" />
            <Button Grid.Column="1" Content="Dismiss"
                    Command="{Binding DismissBannerCommand}"
                    Background="Transparent" Foreground="#92400E" />
        </Grid>
    </Border>

    <!-- Page content -->
    <ContentControl Content="{Binding CurrentPage}" />
</StackPanel>
```

## Tray icon notifications (desktop only)

On desktop platforms (Windows, macOS, Linux), you can use the `TrayIcon` control for system tray integration:

```xml
<TrayIcon.Icons>
    <TrayIcons>
        <TrayIcon Icon="/Assets/app-icon.ico"
                  ToolTipText="My Application"
                  Command="{Binding ShowWindowCommand}">
            <TrayIcon.Menu>
                <NativeMenu>
                    <NativeMenuItem Header="Show" Command="{Binding ShowWindowCommand}" />
                    <NativeMenuItem Header="Exit" Command="{Binding ExitCommand}" />
                </NativeMenu>
            </TrayIcon.Menu>
        </TrayIcon>
    </TrayIcons>
</TrayIcon.Icons>
```

### Platform considerations

| Platform | Notes |
|----------|-------|
| **Windows** | Full tray icon and balloon notification support. Use `.ico` format for the icon. |
| **macOS** | Appears in the menu bar. macOS guidelines recommend template images (monochrome PNGs) for menu bar icons. |
| **Linux** | Support depends on the desktop environment. GNOME, KDE, and XFCE generally support tray icons through `libappindicator` or the `StatusNotifierItem` protocol. |
| **Android / iOS / Browser** | `TrayIcon` is not supported on these platforms. Use in-app overlay notifications instead. |

## Color-coded notification types

You can style notifications based on their type using class-based selectors:

```xml
<ItemsControl.ItemTemplate>
    <DataTemplate>
        <Border CornerRadius="8" Padding="12,8" Margin="0,0,0,8"
                Classes.info="{Binding Type, Converter={StaticResource EqualConverter}, ConverterParameter=info}"
                Classes.success="{Binding Type, Converter={StaticResource EqualConverter}, ConverterParameter=success}"
                Classes.error="{Binding Type, Converter={StaticResource EqualConverter}, ConverterParameter=error}">
            <TextBlock Text="{Binding Message}" Foreground="White" />
        </Border>
    </DataTemplate>
</ItemsControl.ItemTemplate>

<ItemsControl.Styles>
    <Style Selector="Border.info">
        <Setter Property="Background" Value="#3B82F6" />
    </Style>
    <Style Selector="Border.success">
        <Setter Property="Background" Value="#22C55E" />
    </Style>
    <Style Selector="Border.error">
        <Setter Property="Background" Value="#EF4444" />
    </Style>
</ItemsControl.Styles>
```

:::tip
Consider adding a `warning` style (for example, `#F59E0B`) alongside `info`, `success`, and `error` to cover all four common notification levels.
:::

## See also

- [Threading](/docs/app-development/threading): Understand UI thread marshalling with `Dispatcher.UIThread`.
- [TrayIcon](/docs/controls/navigation/trayicon): System tray integration for desktop platforms.
- [Flyout](/docs/controls/layout/containers/flyout): Popup content attached to controls.
- [ToolTip](/docs/controls/feedback/tooltip): Hover tooltips for controls.
- [ItemsControl](/docs/how-to/itemscontrol-how-to): Working with `ItemsControl` for dynamic lists.
- [Data templates](/docs/data-templates/introduction-to-data-templates): Customize how notification items render.
