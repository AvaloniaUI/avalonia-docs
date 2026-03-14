---
id: notification
title: WindowNotificationManager
description: A toast-style notification popup system that displays temporary messages at a configurable position within a window.
doc-type: reference
---

The [`WindowNotificationManager`](/api/avalonia/controls/notifications/windownotificationmanager) provides a built-in notification popup system. It displays toast-style messages at a configurable position within a window. You can use it to inform users about completed operations, warnings, errors, or other events without blocking interaction with the rest of the UI.

## Useful properties

| Property | Type | Description |
|---|---|---|
| `Position` | `NotificationPosition` | Where notifications appear. Options: `TopLeft`, `TopCenter`, `TopRight`, `BottomLeft`, `BottomCenter`, `BottomRight`. Default: `TopRight`. |
| `MaxItems` | `int` | Maximum number of notifications visible at one time. Default: `5`. |

## Notification properties

The built-in `Notification` class exposes these properties:

| Property | Type | Description |
|---|---|---|
| `Title` | `string` | The notification title text. |
| `Message` | `string` | The notification body text. |
| `Type` | `NotificationType` | The severity level: `Information`, `Success`, `Warning`, or `Error`. |
| `Expiration` | `TimeSpan` | Time before the notification auto-dismisses. Set to `TimeSpan.Zero` to require manual dismissal. |

## Setting up

Register a `WindowNotificationManager` in your window, typically in code-behind or through a view model reference:

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

You can also declare the `WindowNotificationManager` in XAML if you prefer a markup-based approach:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.MainWindow">
    <Panel>
        <WindowNotificationManager x:Name="NotificationManager"
                                   Position="TopRight"
                                   MaxItems="5" />
        <!-- Your other content here -->
    </Panel>
</Window>
```

You then access the manager from code-behind:

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        var manager = this.FindControl<WindowNotificationManager>("NotificationManager");
    }
}
```

## Showing a notification

Call `Show` with a `Notification` object:

```csharp
_notificationManager.Show(new Notification(
    "File saved",
    "Your document has been saved successfully.",
    NotificationType.Success,
    TimeSpan.FromSeconds(3)));
```

If you omit the `Expiration` parameter, the notification uses the default expiration time. To keep a notification visible until the user dismisses it manually, pass `TimeSpan.Zero`:

```csharp
_notificationManager.Show(new Notification(
    "Action required",
    "Please review the pending changes before continuing.",
    NotificationType.Warning,
    TimeSpan.Zero));
```

## Notification types

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

## Closing notifications programmatically

You can close a specific notification or clear all notifications from code:

```csharp
var notification = new Notification("Processing", "Working...", NotificationType.Information, TimeSpan.Zero);
_notificationManager.Show(notification);

// Close a specific notification
_notificationManager.Close(notification);

// Clear all active notifications
_notificationManager.ClearAll();
```

This is useful when a long-running operation completes and you want to replace a progress notification with a result notification:

```csharp
var progressNotification = new Notification(
    "Uploading",
    "Sending files to the server...",
    NotificationType.Information,
    TimeSpan.Zero);

_notificationManager.Show(progressNotification);

// Later, when the upload finishes:
_notificationManager.Close(progressNotification);
_notificationManager.Show(new Notification(
    "Upload complete",
    "All files have been sent successfully.",
    NotificationType.Success,
    TimeSpan.FromSeconds(3)));
```

## Custom notification content

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

You can then show your custom notification the same way:

```csharp
_notificationManager.Show(new CustomNotification
{
    Title = "New message",
    Message = "You have a new message from support.",
    Type = NotificationType.Information,
    Expiration = TimeSpan.FromSeconds(5),
    ActionText = "View",
    OnAction = () => NavigateToMessages()
});
```

## Positioning

Control where notifications appear by setting `Position`:

```csharp
// Top-right corner (default)
_notificationManager.Position = NotificationPosition.TopRight;

// Bottom-center (useful for mobile-style toasts)
_notificationManager.Position = NotificationPosition.BottomCenter;
```

The six available positions are:

| Position | Description |
|---|---|
| `TopLeft` | Top-left corner of the window. |
| `TopCenter` | Top edge, centered horizontally. |
| `TopRight` | Top-right corner of the window (default). |
| `BottomLeft` | Bottom-left corner of the window. |
| `BottomCenter` | Bottom edge, centered horizontally. |
| `BottomRight` | Bottom-right corner of the window. |

## MVVM pattern

Expose a notification manager through a service so your view models can show notifications without referencing UI types directly:

```csharp
public interface INotificationService
{
    void ShowInfo(string title, string message);
    void ShowSuccess(string title, string message);
    void ShowWarning(string title, string message);
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

    public void ShowWarning(string title, string message) =>
        _manager.Show(new Notification(title, message, NotificationType.Warning));

    public void ShowError(string title, string message) =>
        _manager.Show(new Notification(title, message, NotificationType.Error));
}
```

Register the service in your application startup and inject it into view models that need to display notifications:

```csharp
public class MyViewModel
{
    private readonly INotificationService _notifications;

    public MyViewModel(INotificationService notifications)
    {
        _notifications = notifications;
    }

    public void SaveDocument()
    {
        // Perform save logic...
        _notifications.ShowSuccess("Saved", "Your document has been saved.");
    }
}
```

## See also

- [How to show notifications and toasts](/docs/how-to/notifications-how-to)
- [Popup](popup)
- [ToolTip](tooltip)
