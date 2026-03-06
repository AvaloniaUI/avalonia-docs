---
id: notification
title: WindowNotificationManager
---

The `WindowNotificationManager` provides a built-in notification popup system. It displays toast-style messages at a configurable position within a window.

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `Position` | `NotificationPosition` | Where notifications appear. Options: `TopLeft`, `TopCenter`, `TopRight`, `BottomLeft`, `BottomCenter`, `BottomRight`. Default: `TopRight`. |
| `MaxItems` | `int` | Maximum number of notifications visible at one time. Default: `5`. |

## Notification Properties

The built-in `Notification` class exposes these properties:

| Property | Type | Description |
|---|---|---|
| `Title` | `string` | The notification title text. |
| `Message` | `string` | The notification body text. |
| `Type` | `NotificationType` | The severity level: `Information`, `Success`, `Warning`, or `Error`. |
| `Expiration` | `TimeSpan` | Time before the notification auto-dismisses. Set to `TimeSpan.Zero` to require manual dismissal. |

## Setting Up

Register a `WindowNotificationManager` in your window, typically in code-behind or via a view model reference:

```csharp
public partial class MainWindow : Window
{
    private WindowNotificationManager _notificationManager;

    public MainWindow()
    {
        InitializeComponent();

        _notificationManager = new WindowNotificationManager(this)
        {
            Position = NotificationPosition.BottomRight,
            MaxItems = 3
        };
    }
}
```

## Showing a Notification

Call `Show` with a `Notification` object:

```csharp
_notificationManager.Show(new Notification(
    "File Saved",
    "Your document has been saved successfully.",
    NotificationType.Success,
    TimeSpan.FromSeconds(3)));
```

## Notification Types

Use the `NotificationType` enum to convey severity. The built-in theme applies distinct colors to each type:

```csharp
// Informational (default blue)
_notificationManager.Show(new Notification("Info", "Operation started.", NotificationType.Information));

// Success (green)
_notificationManager.Show(new Notification("Done", "Upload complete.", NotificationType.Success));

// Warning (yellow/orange)
_notificationManager.Show(new Notification("Warning", "Disk space is low.", NotificationType.Warning));

// Error (red)
_notificationManager.Show(new Notification("Error", "Connection failed.", NotificationType.Error));
```

## Custom Notification Content

Implement `INotification` to provide custom notification data:

```csharp
public class CustomNotification : INotification
{
    public string Title { get; set; }
    public string Message { get; set; }
    public NotificationType Type { get; set; }
    public TimeSpan Expiration { get; set; }
    public string ActionText { get; set; }
    public Action OnAction { get; set; }

    public void OnClose()
    {
        // Clean up when dismissed
    }

    public void OnClick()
    {
        OnAction?.Invoke();
    }
}
```

## Positioning

Control where notifications appear by setting `Position`:

```csharp
// Top-right corner (default)
_notificationManager.Position = NotificationPosition.TopRight;

// Bottom-center (useful for mobile-style toasts)
_notificationManager.Position = NotificationPosition.BottomCenter;
```

## MVVM Pattern

Expose a notification manager through a service so view models can show notifications without referencing UI types directly:

```csharp
public interface INotificationService
{
    void ShowInfo(string title, string message);
    void ShowSuccess(string title, string message);
    void ShowError(string title, string message);
}

public class NotificationService : INotificationService
{
    private readonly WindowNotificationManager _manager;

    public NotificationService(WindowNotificationManager manager)
    {
        _manager = manager;
    }

    public void ShowInfo(string title, string message) =>
        _manager.Show(new Notification(title, message, NotificationType.Information));

    public void ShowSuccess(string title, string message) =>
        _manager.Show(new Notification(title, message, NotificationType.Success));

    public void ShowError(string title, string message) =>
        _manager.Show(new Notification(title, message, NotificationType.Error));
}
```

## See Also

- [How To: Show Notifications and Toasts](/docs/how-to/notifications-how-to): Custom notification patterns including overlays, status bars, and banners.
- [ToolTip](/controls/feedback/tooltip): Hover-triggered popups for supplementary information.
