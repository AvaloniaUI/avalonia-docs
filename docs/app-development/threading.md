---
id: threading
title: Threading model
description: Learn how Avalonia's single-threaded UI model works with dispatchers, async patterns, and background tasks.
doc-type: explanation
---

Avalonia uses a single-threaded UI model. All interactions with the UI, including reading or writing control properties, must happen on the UI thread. This is the same threading model used by WPF, WinForms, and most desktop UI frameworks.

## The UI thread

When your application starts, Avalonia creates a dispatcher that manages work items for the UI thread. All control creation, layout, rendering, and input processing happens on this thread.

If you attempt to access a control from a background thread, Avalonia throws an `InvalidOperationException` with the message "Call from invalid thread."

## Accessing a dispatcher

### Dispatcher.UIThread

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

`InvokeAsync` captures the calling thread's `ExecutionContext` and restores it when the callback executes. This means `AsyncLocal<T>` values, impersonation identity, and culture settings flow from the caller into the dispatched callback, matching the behavior of `Task.Run` and WPF's dispatcher.

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

### AvaloniaObject.Dispatcher

Every `AvaloniaObject` captures the dispatcher for the thread it was created on. Use this property when writing controls or libraries that should work correctly regardless of which dispatcher is active:

```csharp
// Uses the object's own dispatcher rather than assuming UIThread
myControl.Dispatcher.Post(() => myControl.IsVisible = false);
```

For most applications, `AvaloniaObject.Dispatcher` and `Dispatcher.UIThread` return the same instance. The distinction matters for library authors who want to support multiple dispatchers.

### Dispatcher.CurrentDispatcher

Returns the dispatcher for the calling thread, creating one if it does not already exist:

```csharp
var dispatcher = Dispatcher.CurrentDispatcher;
```

### Dispatcher.FromThread

Returns the dispatcher associated with a specific thread, or `null` if none exists. Unlike `CurrentDispatcher`, this does not create a new dispatcher:

```csharp
Dispatcher? dispatcher = Dispatcher.FromThread(Thread.CurrentThread);
if (dispatcher is not null)
{
    dispatcher.Post(() => { /* work */ });
}
```

## Dispatcher priority

Both `Post` and `InvokeAsync` accept an optional `DispatcherPriority` parameter that controls when the work item runs relative to other queued items:

```csharp
Dispatcher.UIThread.Post(
    () => StatusText.Text = "Updated",
    DispatcherPriority.Background);
```

Common priorities, from highest to lowest:

| Priority | Description |
|---|---|
| `Send` | Processed before other asynchronous operations. |
| `Normal` | Processed with normal priority. |
| `Default` | The lowest foreground dispatcher priority. |
| `Render` | Processed with the same priority as rendering. |
| `Loaded` | Processed after layout and render but before input. |
| `Input` | Processed with the same priority as input. |
| `Background` | Processed after other non-idle operations have completed. |
| `ContextIdle` | Processed after background operations have completed. |
| `ApplicationIdle` | Processed when the application is idle. |
| `SystemIdle` | Processed when the system is idle. |

## Async patterns

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

### Yielding to the dispatcher

`Dispatcher.Yield()` pauses the current async method and queues its continuation on the dispatcher, allowing pending input, layout, and rendering work to process before resuming:

```csharp
private async Task ProcessItemsAsync(IList<Item> items)
{
    foreach (var item in items)
    {
        ProcessItem(item);

        // Let the UI thread handle pending events before continuing
        await Dispatcher.Yield();
    }
}
```

`Yield` is a static method that operates on `Dispatcher.UIThread`. You can specify a priority to control when execution resumes:

```csharp
// Resume only when the dispatcher is idle
await Dispatcher.Yield(DispatcherPriority.ApplicationIdle);
```

For non-static usage or when working with a specific dispatcher instance, use `Resume`:

```csharp
await myControl.Dispatcher.Resume(DispatcherPriority.Background);
```

## Full example

This example shows how to access the UI thread from a worker thread to update or get the text of a `TextBlock`:

```xml title='MainView.axaml'
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="clr-namespace:AvaloniaApplication1.ViewModels"
             x:Class="AvaloniaApplication1.Views.MainView"
             x:DataType="vm:MainViewModel">
    <StackPanel Margin="20">
        <TextBlock Name="TextBlock1" />
    </StackPanel>
</UserControl>
```

```csharp title='MainView.axaml.cs'
using Avalonia.Controls;
using Avalonia.Threading;
using System.Threading.Tasks;

namespace AvaloniaApplication1.Views;

public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();
        _ = Task.Run(() => OnTextFromAnotherThread("test"));
    }

    private void SetText(string text) => TextBlock1.Text = text;
    private string GetText() => TextBlock1.Text ?? "";

    private async void OnTextFromAnotherThread(string text)
    {
        // Start the job on the UI thread and return immediately.
        Dispatcher.UIThread.Post(() => SetText(text));

        // Start the job on the UI thread and wait for the result.
        var result = await Dispatcher.UIThread.InvokeAsync(GetText);

        // This would throw because we are on a worker thread:
        // SetText(text); // InvalidOperationException: 'Call from invalid thread'
    }
}
```

## Common mistakes

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

### Modifying collections from a background thread

Modifying a bound `ObservableCollection` from a background thread does not always throw an exception. Instead, items may be silently dropped or only partially added, making the problem difficult to diagnose:

```csharp
// WRONG: Collection changes may be silently lost
await Task.Run(async () =>
{
    foreach (var item in loadedItems)
    {
        Items.Add(item); // May only add the first item
    }
});

// CORRECT: Load data on background thread, update collection on UI thread
var data = await Task.Run(() => LoadItems());
Items = new ObservableCollection<Item>(data);

// ALSO CORRECT: Dispatch each addition if you need incremental updates
foreach (var item in loadedItems)
{
    await Dispatcher.UIThread.InvokeAsync(() => Items.Add(item));
}
```

If your `async` method started on the UI thread, code after `await` resumes on the UI thread automatically (see [SynchronizationContext](#async-patterns)). Collection modifications in that continuation do not need explicit dispatching. The problem occurs when the method runs entirely on a background thread, or when `ConfigureAwait(false)` was used earlier in the call chain.

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

## See also

- [`Dispatcher` API reference](/api/avalonia/threading/dispatcher)
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): How the application lifecycle interacts with threading.
