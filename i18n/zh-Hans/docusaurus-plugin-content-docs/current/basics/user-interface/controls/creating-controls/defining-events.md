# 定义事件

在Avalonia中，事件允许您的自定义控件进行通信并通知用户特定的操作或事件发生。通过定义事件，您为控件的使用者提供了一种在其应用程序中响应和处理这些事件的方法。本文档将指导您如何为自定义控件定义事件。

## 路由事件

Avalonia中的路由事件提供了一种处理事件的机制，这些事件可以在控件树中传播（或“路由”），允许多个控件对相同的事件做出响应。路由事件提供以下关键特性：

- **事件路由**：路由事件可以沿着树向上（冒泡）或向下（隧道）传播，使得不同级别的控件可以处理相同的事件。这允许更灵活和集中的事件处理。

- **事件处理程序**：路由事件使用事件处理程序来响应事件。事件处理程序可以与特定控件关联，也可以附加到视觉树中的更高级别以处理来自多个控件的事件。

- **已处理状态**：路由事件具有`Handled`属性，可用于标记事件为已处理，阻止进一步的传播。这允许对事件处理进行精细的控制。

- **事件路由策略**：Avalonia支持不同的路由策略，如冒泡、隧道和直接路由。这些策略决定了控件接收和处理事件的顺序。
Avalonia的路由事件在需要处理可能发生在嵌套控件内部的事件时特别有用，或者当您希望在视觉树的较高级别集中事件处理逻辑时。

## 示例

以下是为假设的自定义滑块控件定义路由事件的示例：

```csharp
public class MyCustomSlider : Control
{
    public static readonly RoutedEvent<RoutedEventArgs> ValueChangedEvent =
        RoutedEvent.Register<MyCustomSlider, RoutedEventArgs>(nameof(ValueChanged), RoutingStrategies.Direct);

    public event EventHandler<RoutedEventArgs> ValueChanged
    {
        add => AddHandler(ValueChangedEvent, value);
        remove => RemoveHandler(ValueChangedEvent, value);
    }

    protected virtual void OnValueChanged()
    {
        RoutedEventArgs args = new RoutedEventArgs(ValueChangedEvent);
        RaiseEvent(args);
    }
}
```

在此示例中，为`MyCustomSlider`控件定义了一个名为`ValueChangedEvent`的自定义路由事件。该事件通过`RoutedEvent`系统进行注册，使得用户可以订阅它。还定义了CLR事件，以方便使用该事件，使其在使用上与标准.NET API一致。

## 进一步阅读

如需更多信息，请参阅[路由事件深入](../../../../concepts/input/routed-events.md)
