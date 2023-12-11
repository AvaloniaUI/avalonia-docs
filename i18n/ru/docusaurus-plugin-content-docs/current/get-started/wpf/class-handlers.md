# Обработчики событий класса

В WPF, обработчики событий можно добавить через вызов [EventManager.RegisterClassHandler](https://msdn.microsoft.com/en-us/library/ms597875.aspx). 
Пример регистрации обработчика в WPF:


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


Обратите внимание, что для WPF, обработчки должен быть добавлен как статический метод,
в то время как в Avalonia, он не является статическим: событие отправляется конкретному экземпляру.
Параметр `sender` не нужен, все является строго типизированным.
