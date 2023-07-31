# 类处理程序（Class Handlers）

在WPF中，可以通过调用[EventManager.RegisterClassHandler](https://msdn.microsoft.com/en-us/library/ms597875.aspx)为事件添加类处理程序。在WPF中注册类处理程序的示例可能如下：


```csharp title='WPF'
static MyControl()
{
    EventManager.RegisterClassHandler(typeof(MyControl), MyEvent, HandleMyEvent));
}

private static void HandleMyEvent(object sender, RoutedEventArgs e)
{
}
```


```csharp title='Avalonia'
static MyControl()
{
    MyEvent.AddClassHandler<MyControl>((x, e) => x.HandleMyEvent(e));
}

private void HandleMyEvent(RoutedEventArgs e)
{
}
```



请注意，在WPF中，您必须将类处理程序添加为静态方法，而在Avalonia中，类处理程序不是静态的：通知会自动定向到正确的实例。在这种情况下，事件处理程序通常的`sender`参数是不必要的，一切保持强类型。

