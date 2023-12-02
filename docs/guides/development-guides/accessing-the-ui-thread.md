---
id: accessing-the-ui-thread
title: How To Access the UI Thread
---

import DispatchPostLongRunningScreenshot from '/img/gitbook-import/assets/long1.gif';
import DispatchInvokeAsyncLongRunningScreenshot from '/img/gitbook-import/assets/long2.gif';

# How To Access the UI Thread

This guide will show you how to access the UI thread in your _Avalonia UI_ application.

_Avalonia UI_ applications have one main thread, and this handles the UI. When you have a process that is intensive, or long running, then you will usually opt to run it on a different thread. Then you may have scenarios where you want to update them main UI thread (for example with progress updates). 

A dispatcher provides services for managing work items on any specific thread. In _Avalonia UI_ you will already have the dispatcher that handles the UI thread. When you need to update the UI from a different thread, you access it through this dispatcher, as follows:

```csharp
Dispatcher.UIThread
```

You can use either the `Post` method or the `InvokeAsync` method to run a process on the UI thread.

Use `Post` when you just want to start a job, but you do not need to wait for the job to be finished, and you do not need the result: this is the 'fire-and-forget' dispatcher method.

Use `InvokeAsync` when you need to wait for the result, and potentially want to receive the result.

## Dispatcher Priority

Both of the above methods have a dispatcher priority parameter. You can use this with the `DispatcherPriority` enumeration to specify the queue priority that the given job should be given.

:::info
For the possible values of the `DispatcherPriority` enumeration, see [here](http://reference.avaloniaui.net/api/Avalonia.Threading/DispatcherPriority/).
:::

## Example

This example shows how to access the ui thread from a worker thread to update a viewmodel property:

```csharp
using Avalonia.Threading;
using ReactiveUI;
using System.Threading.Tasks;

namespace AvaloniaApplication1.ViewModels;

public class MainViewModel : ViewModelBase
{
    private string _text = string.Empty;
    public string Text
    {
        get => _text;
        set => this.RaiseAndSetIfChanged(ref _text, value);
    }

    public MainViewModel()
    {
        // Execute OnTextFromAnotherThread on the thread pool
        // to demonstrate how to access the UI thread from
        // there.
        Task.Run(() => OnTextFromAnotherThread("test"));
    }

    private void UpdateUiText(string text)
    {
        Text = text;
    }

    private string GetUiText()
    {
        return Text;
    }

    private async void OnTextFromAnotherThread(string text)
    {
        // Start the job on the ui thread and return immediately.
        Dispatcher.UIThread.Post(() => UpdateUiText(text));

        // Start the job on the ui thread and wait for the result.
        var result = await Dispatcher.UIThread.InvokeAsync(GetUiText);
    }
}
```

## More Information

:::info
For the complete API documentation about the dispatcher, see [here](http://reference.avaloniaui.net/api/Avalonia.Threading/Dispatcher/).
:::

:::info
View the source code on _GitHub_ [`Dispatcher.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Threading/Dispatcher.cs)
:::
