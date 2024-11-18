# Class Handlers

In WPF, class handlers for events can be added by calling [EventManager.RegisterClassHandler](https://msdn.microsoft.com/en-us/library/ms597875.aspx). An example of registering a class handler in WPF might be:


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



Notice that in WPF you have to add the class handler as a static method, whereas in Avalonia the class handler is not static: the notification is automatically directed to the correct instance. The `sender` parameter typical of event handlers is not necessary in this case and everything remains strongly typed.

<XpfAd/>