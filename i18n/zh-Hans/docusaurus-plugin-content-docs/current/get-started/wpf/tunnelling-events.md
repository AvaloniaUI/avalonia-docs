# 事件隧道传播（Tunnelling Events）

Avalonia确实有事件隧道传播，但它们不是通过单独的`Preview` CLR事件处理程序公开的。要订阅一个事件隧道传播事件，您需要使用`AddHandler`方法，并传递`RoutingStrategies.Tunnel`参数：

```csharp
target.AddHandler(InputElement.KeyDownEvent, OnPreviewKeyDown, RoutingStrategies.Tunnel);

void OnPreviewKeyDown(object sender, KeyEventArgs e)
{
    // 处理程序代码
}
```

