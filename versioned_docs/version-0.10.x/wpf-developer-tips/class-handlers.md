---
info: class-handlers
title: Class Handlers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In WPF, class handlers for events can be added by calling [EventManager.RegisterClassHandler](https://msdn.microsoft.com/en-us/library/ms597875.aspx). An example of registering a class handler in WPF might be:

<Tabs
  defaultValue="wpf"
  values={[
      { label: 'WPF', value: 'wpf', },
      { label: 'Avalonia UI', value: 'avalonia', },
  ]}
>
<TabItem value="wpf">

```cs
static MyControl()
{
    EventManager.RegisterClassHandler(typeof(MyControl), MyEvent, HandleMyEvent));
}

private static void HandleMyEvent(object sender, RoutedEventArgs e)
{
}
```

</TabItem>
<TabItem value="avalonia">

```cs
static MyControl()
{
    MyEvent.AddClassHandler<MyControl>((x, e) => x.HandleMyEvent(e));
}

private void HandleMyEvent(RoutedEventArgs e)
{
}
```
</TabItem>  

</Tabs>

Notice that in WPF you have to add the class handler as a static method, whereas in Avalonia the class handler is not static: the notification is automatically directed to the correct instance. The `sender` parameter typical of event handlers is not necessary in this case and everything remains strongly typed.
