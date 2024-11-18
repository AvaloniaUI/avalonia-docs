# Tunnelling Events

В Avalonia есть `Tunnelling` события, но но они не используют отдельные события CLR в `Preview`, 
Для подписки к `Tunnelling` событию, вы должны вызвать `AddHandler` вместе с `RoutingStrategies.Tunnel`:

```csharp
target.AddHandler(InputElement.KeyDownEvent, OnPreviewKeyDown, RoutingStrategies.Tunnel);

void OnPreviewKeyDown(object sender, KeyEventArgs e)
{
    // Handler code
}
```

