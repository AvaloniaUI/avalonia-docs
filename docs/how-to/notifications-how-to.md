---
id: notifications-how-to
title: "How to: Show Notifications and Toasts"
description: Show notifications, toast messages, and status bars in Avalonia applications.
doc-type: how-to
---

This guide covers patterns for showing notifications, toast messages, and status bars in Avalonia applications.

## Overlay Notification Panel

A common pattern is a notification panel that slides in from a corner of the window. Build one with an `ItemsControl` and transitions.

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

```csharp
public partial class NotificationService : ObservableObject
{
    public ObservableCollection<NotificationViewModel> Notifications { get; } = new();

    public void Show(string message, string type = "info", int durationMs = 3000)
    {
        var notification = new NotificationViewModel(message, type);
        Notifications.Add(notification);

        // Auto-dismiss
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

### XAML overlay

Place this at the root of your main window, as the last child in a `Panel` so it overlays all other content:

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

## Simple Status Bar

For less intrusive feedback, use a status bar at the bottom of the window:

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

## Confirmation Banner

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

## Tray Icon Notifications (Desktop)

On desktop platforms, use the `TrayIcon` for system tray notifications:

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

## Color-Coded Notification Types

Style notifications based on their type:

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

## See Also

- [TrayIcon Control Reference](/controls/navigation/trayicon): System tray integration.
- [Flyout Control Reference](/controls/layout/containers/flyout): Popup content attached to controls.
- [ToolTip Control Reference](/controls/feedback/tooltip): Hover tooltips.
