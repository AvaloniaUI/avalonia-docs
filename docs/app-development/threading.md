---
id: threading
title: Threading Model
---

Avalonia uses a single-threaded UI model. All interactions with the UI, including reading or writing control properties, must happen on the UI thread. This is the same threading model used by WPF, WinForms, and most desktop UI frameworks.

## The UI Thread

When your application starts, Avalonia creates a dispatcher that manages work items for the UI thread. All control creation, layout, rendering, and input processing happens on this thread.

If you attempt to access a control from a background thread, Avalonia throws an `InvalidOperationException` with the message "Call from invalid thread."

## Dispatcher.UIThread

The `Dispatcher.UIThread` property provides access to the UI thread's dispatcher from anywhere in your code. Use it to marshal work from background threads to the UI thread.

### Post (fire-and-forget)

`Post` schedules a callback on the UI thread and returns immediately. Use this when you do not need to wait for the result:

```csharp
Dispatcher.UIThread.Post(() =>
{
    StatusText.Text = "Processing complete";
});
```

### InvokeAsync (await the result)

`InvokeAsync` schedules a callback and returns a `Task` that completes when the callback finishes. Use this when you need to wait for the result or ensure the operation completed:

```csharp
var text = await Dispatcher.UIThread.InvokeAsync(() =>
{
    return SearchBox.Text;
});
```

### CheckAccess and VerifyAccess

Check whether you are already on the UI thread before dispatching:

```csharp
if (Dispatcher.UIThread.CheckAccess())
{
    // Already on the UI thread, update directly
    StatusText.Text = "Ready";
}
else
{
    // On a background thread, marshal to UI thread
    Dispatcher.UIThread.Post(() => StatusText.Text = "Ready");
}
```

`VerifyAccess()` throws an `InvalidOperationException` if called from a non-UI thread:

```csharp
Dispatcher.UIThread.VerifyAccess(); // Throws if not on UI thread
```

## Dispatcher Priority

Both `Post` and `InvokeAsync` accept an optional `DispatcherPriority` parameter that controls when the work item runs relative to other queued items:

```csharp
Dispatcher.UIThread.Post(
    () => StatusText.Text = "Updated",
    DispatcherPriority.Background);
```

Common priorities, from highest to lowest:

| Priority | Use case |
|---|---|
| `Send` | Highest priority. Processes immediately if already on the UI thread. |
| `Normal` | Default priority for user-initiated operations. |
| `Input` | Input processing (pointer, keyboard). |
| `Loaded` | Control loaded events. |
| `Render` | Rendering operations. |
| `Background` | Low-priority background work. Runs when the UI thread is idle. |
| `ApplicationIdle` | Lowest priority. Runs only when no other work is pending. |

## Async Patterns

### Background work with UI updates

The most common pattern is performing heavy computation on a background thread and updating the UI when complete:

```csharp
private async void OnLoadClick(object? sender, RoutedEventArgs e)
{
    LoadButton.IsEnabled = false;
    StatusText.Text = "Loading...";

    // Heavy work runs on a thread pool thread
    var data = await Task.Run(() =>
    {
        return LoadLargeDataSet();
    });

    // Back on the UI thread automatically (thanks to SynchronizationContext)
    Items = new ObservableCollection<Item>(data);
    StatusText.Text = $"Loaded {data.Count} items";
    LoadButton.IsEnabled = true;
}
```

:::info
When you `await` a `Task` in an `async` method that started on the UI thread, execution resumes on the UI thread automatically. Avalonia sets up a `SynchronizationContext` that captures the UI thread context.
:::

### Progress reporting

For long-running operations, report progress back to the UI:

```csharp
private async void OnProcessClick(object? sender, RoutedEventArgs e)
{
    var progress = new Progress<int>(percent =>
    {
        // This callback runs on the UI thread
        ProgressBar.Value = percent;
    });

    await Task.Run(() => ProcessData(progress));

    StatusText.Text = "Done";
}

private void ProcessData(IProgress<int> progress)
{
    for (int i = 0; i <= 100; i++)
    {
        Thread.Sleep(50); // Simulate work
        progress.Report(i);
    }
}
```

### Timer-based updates

Use `DispatcherTimer` for periodic UI updates. The timer callback runs on the UI thread:

```csharp
var timer = new DispatcherTimer
{
    Interval = TimeSpan.FromSeconds(1)
};

timer.Tick += (sender, e) =>
{
    // Runs on the UI thread
    ClockText.Text = DateTime.Now.ToString("HH:mm:ss");
};

timer.Start();
```

## Common Mistakes

### Accessing controls from Task.Run

```csharp
// WRONG: Accessing UI from background thread
await Task.Run(() =>
{
    StatusText.Text = "Done"; // Throws InvalidOperationException
});

// CORRECT: Update UI after awaiting the background work
var result = await Task.Run(() => ComputeResult());
StatusText.Text = result; // Runs on UI thread after await
```

### Blocking the UI thread

```csharp
// WRONG: Blocks the UI thread, making the app unresponsive
var data = LoadDataFromNetwork().Result; // Deadlock risk!

// CORRECT: Use async/await
var data = await LoadDataFromNetworkAsync();
```

### Unnecessary dispatching

```csharp
// UNNECESSARY: Already on UI thread in event handlers
private void OnButtonClick(object? sender, RoutedEventArgs e)
{
    // No need to dispatch - event handlers run on the UI thread
    StatusText.Text = "Clicked";
}
```

## See Also

- [Accessing the UI Thread](/docs/app-development/accessing-the-ui-thread): More examples of Dispatcher usage.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): How the application lifecycle interacts with threading.
