---
description: REFERENCE - Built-in Controls
---

# RefreshContainer 刷新容器

刷新容器允许用户通过下拉内容或直接用一列数据来刷新内容或检索更多数据。刷新进度由从启动下拉手势的边缘出现的 `RefreshVisualizer` 指示。`RefreshContainer` 的内容必须是 `ScrollViewer` 或包含一个的控件。

## 示例

此示例展示了如何在 axaml 文件中使用 RefreshContainer。

```xml
<RefreshContainer PullDirection="TopToBottom"
                RefreshRequested="RefreshContainerPage_RefreshRequested">
    <ListBox ItemsSource="{Binding Items}"/>
</RefreshContainer>
```

在相应的类文件中：
```csharp
private void RefreshContainerPage_RefreshRequested(object? sender, RefreshRequestedEventArgs e)
{
    // 获取一个延期对象。
    var deferral = e.GetDeferral();

    // 刷新列表

    // 通知刷新容器刷新完成。
    deferral.Complete();
}
```

## 刷新
可以通过将 `PullDirection` 属性指定的方向完全拉到视觉器的极限或调用 RefreshContainer 上的 `RequestRefresh` 方法来启动刷新。刷新的进度由 `Visualizer` 的 `RefreshVisualizerState` 指示，可以处于以下任何状态：

* #### 空闲
这是视觉器的默认状态。用户没有与容器交互，也没有正在进行的刷新。视觉器是隐藏的。

* #### 交互中
用户正在 `PullDirection` 属性指定的方向上拉，但尚未达到拉动阈值。视觉器逐渐变得可见，直到达到拉动阈值。
如果在达到拉动阈值之前释放拉动，`Visualizer` 返回到 `空闲` 状态，不会启动刷新。
如果达到了拉动阈值，`Visualizer` 进入 `准备刷新` 状态。

* #### 准备刷新
用户已经拉过了拉动阈值。在这种状态下，视觉器是完全可见的。如果用户将接触点移回拉动阈值之前，视觉器返回到 `交互中` 状态。如果用户在 `准备刷新` 状态下释放接触，视觉器进入 `正在刷新` 状态。

* #### 正在刷新
用户在视觉器处于 `准备刷新` 状态时释放了触摸接触。会触发 `RefreshRequested` 事件。事件参数包含一个 `Deferral` 对象。此对象用于通知刷新容器刷新操作已完成，应在不阻塞 UI 线程的情况下用于长时间的刷新。如果没有检索到，`正在刷新` 状态在 `RefreshRequested` 调用完成时结束。
在这种状态下，视觉器是完全可见的，并开始刷新动画。

* #### 瞥视
当用户在不允许刷新的内容位置开始下拉手势时会发生这种情况。这通常发生在子 ScrollViewer 的偏移量不是 0，相对于开始下拉时的拉动方向和滚动方向。此时，视觉器是隐藏的，且视觉器的状态只有在释放下拉时才能回到 `空闲` 状态。

## 更多信息

:::info
在 GitHub 上查看源代码 [`RefreshContainer.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/PullToRefresh/RefreshContainer.cs)
:::