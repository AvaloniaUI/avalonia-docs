# Accessing the UI thread

A `Dispatcher` provides services for managing work items on a specific thread. In Avalonia you will usually have only one `Dispatcher`, the one that handles the UI thread. Whenever you need to update the UI from a different thread than the UI thread, you need to access the UI thread via the running `Dispatcher`.

## Access the UI thread from a different thread

You can access the current UI thread via `Dispatcher.UIThread`. You can either use `Post` or `InvokeAsync`, if you want to run a job on the UI thread. Use `Post` when you just want to start a job, but you don't need to wait for the job to be finished and you don't need the result. If you need to wait for the result, then use `InvokeAsync` instead. 

## The DispatcherPriority

The `DispatcherPriority` specifies at which priority the given job should be queued. For possible values please refer to the [API-Reference](http://reference.avaloniaui.net/api/Avalonia.Threading/DispatcherPriority/)

## Examples

In the below example we have a `TextBlock` which shows the result and a `Button` which is used to start our work. 

Our view looks like this: 

```markup
<StackPanel>
  <TextBlock x:Name="TextBlock_Result" />
  <Button Content="Run long running process" Click="Button_OnClick" />
</StackPanel>
```

The long running task looks like this:

```csharp
async Task LongRunningTask()
{
    // Do some work
    this.FindControl<TextBlock>("TextBlock_Result").Text = "I'm working ...";
    await Task.Delay(2000);
    this.FindControl<TextBlock>("TextBlock_Result").Text = "Done";
}
```

Finally we can run the long running task as shown below: 

```csharp
private void Button_OnClick(object sender, RoutedEventArgs e)
{
    // Start the job and return immediately
    Dispatcher.UIThread.Post(() => LongRunningTask(), DispatcherPriority.Background);
}
```

if we want to get the result to work with it further, we need to change the long running task to return the result:

```csharp
async Task<string> LongRunningTask()
{
    // Do some work
    this.FindControl<TextBlock>("TextBlock_Result").Text = "I'm working ...";
    await Task.Delay(2000);
    this.FindControl<TextBlock>("TextBlock_Result").Text = "Done";
    
    // return a result
    return "Success";
}
```

We can use the result now: 

```csharp
private async void Button_OnClick(object sender, RoutedEventArgs e)
{
    // Run the job
    var result = await Dispatcher.UIThread.InvokeAsync(LongRunningTask, DispatcherPriority.Background);
    
    // Work with the result
    Debug.WriteLine(result);
}
```

## Reference
[Dispatcher](http://reference.avaloniaui.net/api/Avalonia.Threading/Dispatcher/)

## Source Code
[Dispatcher.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Threading/Dispatcher.cs)