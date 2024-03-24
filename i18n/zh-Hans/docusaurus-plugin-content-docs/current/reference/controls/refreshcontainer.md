---
description: REFERENCE - Built-in Controls
---

# Refresh Container

The refresh container allows a user to pull down on content or a list of data to refresh the content or retrieve more data. The refresh progress is indicated by a `RefreshVisualizer` that appears from the edge by which the pull gesture was initiated. The content of a `RefreshContainer` must be a `ScrollViewer`, or a control that has one.

## Example

This example shows hows to use a RefreshContainer with a

_In the axaml file._
```xml
<RefreshContainer PullDirection="TopToBottom"
                RefreshRequested="RefreshContainerPage_RefreshRequested">
    <ListBox ItemsSource="{Binding Items}"/>
</RefreshContainer>
```

_In the class file._
```csharp
private void RefreshContainerPage_RefreshRequested(object? sender, RefreshRequestedEventArgs e)
{
    // Retrieve a deferral object.
    var deferral = e.GetDeferral();

    // Refresh List Box Items

    // Notify the Refresh Container that the refresh is complete.
    deferral.Complete();
}
```

## Refreshing
A refresh can be initiated by pulling in the direction specified by the `PullDirection` property to the full extent of the visualizer, or by calling the `RequestRefresh` method on the RefreshContainer. The progress of the refresh is indicated by the `RefreshVisualizerState` of the `Visualizer`, which can be in any of the following;

* #### Idle
This is the default state of the visualizer. The user is not interacting with the container, and no refresh is in progress. The visualizer is hidden.

* #### Interacting
The user is pulling in the direction specified in the `PullDirection` property, but has not reached the pull threshold. The visualizer gradually becomes visible until the pull threshold is reached.
If the pull is releaseed before reaching the pull threshold, the `Visualizer` returns to the `Idle` state, and no refresh is initiated. 
If the pull threshold is reached, the `Visualizer` enters the `Pending` state.

* #### Pending
The user has pulled past the pull threshold. In this state, the visualizer is fully visible. If the user moves the contact back to before the pull threshold, the visualizer returns to the `Interacting` state. If the user releases contact while in the `Pending` state, the visualizer enters the `Refreshing` state.

* #### Refreshing
The user has released the touch contact while the visualizer is in the `Pending` state. The `RefreshRequested` event is raised. The event args contains a `Deferral` object. This object is used to notify the Refresh Container that the refresh action has completed, and should be used in long refreshes without blocking the UI thread. If not retrieved, the `Refreshing` state ends when the `RefreshRequested` invocation is complete.
In this state, the visualizer is fully visible, and the refresh animation begins.

* #### Peeking
This occurs when the user starts a pull gesture while the content is in a position where refresh is not allowed. This typical happens when the child ScrollViewer isn't at Offset 0, with respect to the pull direction and scroll direction, when the pull is started. The visualizer is hidden and the visualizer's state can only progress to `Idle` when the pull is released.

## More Information

:::info
View the source code on GitHub [`RefreshContainer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/PullToRefresh/RefreshContainer.cs)
:::
