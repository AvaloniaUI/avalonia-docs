---
description: CONCEPTS - Input
---

import PointerPressedSampleScreenshot from '/img/concepts/input/pointer-pressed.gif';

# 鼠标和指针设备

在_Avalonia UI_中，您可以使用'pointer'抽象来实现指针设备与应用程序的交互。这可以表示包括但不限于鼠标、触摸板和笔在内的设备。_Avalonia UI_控件具有允许您订阅指针移动、点击和滚轮移动的事件。它们如下所示：

* PointerEnter
* PointerLeave
* PointerMoved
* PointerPressed
* PointerReleased
* PointerWheelChanged
* Tapped
* DoubleTapped
* Holding

例如，您可以订阅控件上一个指针按钮被按下的事件，如下所示：

```csharp title='C#'
private void PointerPressedHandler (object sender, PointerPressedEventArgs args)
{
    var point = args.GetCurrentPoint(sender as Control);
    var x = point.Position.X;
    var y = point.Position.Y;
    var msg = $"Pointer press at {x}, {y} relative to sender.";
    if (point.Properties.IsLeftButtonPressed)
    {
        msg += " Left button pressed.";
    }
    if (point.Properties.IsRightButtonPressed)
    {
        msg += " Right button pressed.";
    }
    results.Text = msg ;
}
```

```xml title='XAML'
<StackPanel Margin="20" Background="AliceBlue" 
                PointerPressed="PointerPressedHandler" >
  <TextBlock x:Name="results" Margin="5">Ready...</TextBlock>
</StackPanel>
```

<img src={PointerPressedSampleScreenshot} alt=""/>

## 指针位置

在上面的示例中，指针坐标（`x`和`y`）是相对于发送者控件原点（顶部，左侧）计算的，此处为堆栈面板。如果您想要相对于包含窗口的坐标，那么可以使用以下方式的`GetCurrentPoint`方法：

```csharp
var point = args.GetCurrentPoint(this);
```

## 点击事件

控件还具有特殊的手势事件，它们是：`Tapped`、`DoubleTapped`和`Holding`。在指针在控件上按下然后释放后，将引发点击事件。双击事件在指针在同一位置按下两次后引发。

按住事件在指针按下一段时间后引发。按住的持续时间在`TopLevel` PlatformSettings的`HoldWaitDuration`属性中定义。可以通过设置`Gestures.IsHoldingEnabled`附加属性来在控件上启用按住。当按住的持续时间过去时，控件的`HoldingEvent`将被引发，参数的`HoldingState`设置为`HoldingState.Started`。在释放指针时，事件将再次引发，状态为`HoldingState.Completed`。如果在`Holding`开始时启动新的手势或按下第二个指针，将取消`Holding`手势并引发`HoldingEvent`，状态为`HoldingState.Cancelled`。还可以使用鼠标指针来启动按住，方法是在控件上设置`Gestures.IsHoldWithMouseEnabled`附加属性。

:::info
请注意，第一次和第二次点击之间的最大距离以及它们之间的时间延迟将取决于目标平台，并且通常对于触摸设备而言更大。
:::

## 更多信息

有关指针和点击事件的完整API文档，请参阅[此处](http://reference.avaloniaui.net/api/Avalonia.Input/PointerEventArgs/)。