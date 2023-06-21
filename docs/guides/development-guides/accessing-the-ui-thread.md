---
id: accessing-the-ui-thread
title: How To Access the UI Thread
---


# 👉 How To Access the UI Thread

This guide will show you how to access the UI thread in your _Avalonia UI_ application.&#x20;

_Avalonia UI_ applications have one main thread, and this handles the UI. When you have a process that is intensive, or long running, then you will usually opt to run it on a different thread. Then you may have scenarios where you want to update them main UI thread (for example with progress updates). &#x20;

A dispatcher provides services for managing work items on any specific thread. In _Avalonia UI_ you will already have the dispatcher that handles the UI thread. When you need to update the UI from a different thread, you access it through this dispatcher, as follows:

```csharp
Dispatcher.UIThread
```

You can use either the `Post` method or the `InvokeAsync` method to run a process on the UI thread.&#x20;

Use `Post` when you just want to start a job, but you do not need to wait for the job to be finished, and you do not need the result: this is the 'fire-and-forget' dispatcher method.&#x20;

Use `InvokeAsync` when you need to wait for the result, and potentially want to receive the result.&#x20;

## Dispatcher Priority

Both of the above methods have a dispatcher priority parameter. You can use this with the   `DispatcherPriority` enumeration to specify the queue priority that the given job should be given.&#x20;

:::info
For the possible values of the `DispatcherPriority` enumeration, see [here](http://reference.avaloniaui.net/api/Avalonia.Threading/DispatcherPriority/).
:::

## Example

In this example a text block is used to show the result of a long running task, and a button is used to start the work. In this version, the fire-and-forget `Post` method is used:

{% tabs %}
{% tab title="XAML" %}
```xml
<StackPanel Margin="20">    
  <Button x:Name="RunButton" Content="Run long running process" 
          Click="ButtonClickHandler" />
  <TextBlock x:Name="ResultText" Margin="10"/>
</StackPanel>
```
{% endtab %}

{% tab title="Task C#" %}
```csharp
using System.Threading.Tasks;
...
private async Task LongRunningTask()
{
    this.FindControl<Button>("RunButton").IsEnabled = false;
    this.FindControl<TextBlock>("ResultText").Text = "I'm working ...";
    await Task.Delay(5000);
    this.FindControl<TextBlock>("ResultText").Text = "Done";
    this.FindControl<Button>("RunButton").IsEnabled = true;
}
```
{% endtab %}

{% tab title="Post C#" %}
```csharp
private void ButtonClickHandler(object sender, RoutedEventArgs e)
{
    // Start the job and return immediately
    Dispatcher.UIThread.Post(() => LongRunningTask(), 
                                            DispatcherPriority.Background);
}
```
{% endtab %}
{% endtabs %}



<!--<img src="/img/gitbook-import/assets/long1.gif" alt=""/>-->

Notice that because the long running task is executed on its own thread, the UI does not lose responsiveness.

To get a result from the long running task, the XAML is the same, but this version uses the `InvokeAsync`method:

{% tabs %}
{% tab title="XAML" %}
```xml
<StackPanel Margin="20">    
  <Button x:Name="RunButton" Content="Run long running process" 
          Click="ButtonClickHandler" />
  <TextBlock x:Name="ResultText" Margin="10"/>
```
{% endtab %}

{% tab title="Task C#" %}
```csharp
using System.Threading.Tasks;
...
private async Task<string> LongRunningTask()
{
    this.FindControl<Button>("RunButton").IsEnabled = false;
    this.FindControl<TextBlock>("ResultText").Text = "I'm working ...";
    await Task.Delay(5000);    
    return "Success";
}
```
{% endtab %}

{% tab title="InvokeAsync C#" %}
```csharp
private async void ButtonClickHandler(object sender, RoutedEventArgs e)
{
    var result = await Dispatcher.UIThread.InvokeAsync(LongRunningTask, 
                                    DispatcherPriority.Background);
    //result returns here
    this.FindControl<TextBlock>("ResultText").Text = result;
    this.FindControl<Button>("RunButton").IsEnabled = true;
}
```
{% endtab %}
{% endtabs %}

<!--<img src="/img/gitbook-import/assets/long2.gif" alt=""/>-->

## More Information

:::info
For the complete API documentation about the dispatcher, see [here](http://reference.avaloniaui.net/api/Avalonia.Threading/Dispatcher/).
:::

:::info
View the source code on _GitHub_ [`Dispatcher.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Threading/Dispatcher.cs)
:::
