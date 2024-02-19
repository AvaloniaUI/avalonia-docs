---
description: CONCEPTS
---

import DataBindingOverviewDiagram from '/img/basics/data-binding/data-binding-overview.png';

# 数据绑定

Avalonia使用数据绑定将数据从应用程序对象传递到UI控件，根据用户输入更改应用程序对象中的数据，并在响应用户命令时对应用程序对象进行操作。

<img src={DataBindingOverviewDiagram} alt=''/>

在这种安排中，控件是**绑定目标**，而对象是**数据源**。

Avalonia运行数据绑定系统来完成大部分上述活动，而无需您添加大量额外的代码，只需在XAML中声明简单的映射即可。

数据绑定映射是在Avalonia控件的属性和应用程序对象的属性之间使用XML定义的。一般来说，语法如下：

```xml
<SomeControl Attribute="{Binding PropertyName}" />
```

这些映射可以是双向的：即绑定应用程序对象的属性的更改将反映在控件中，而控件中的更改（无论是由用户引起的还是其他原因）都将应用于底层对象。双向绑定的一个示例是将文本输入绑定到对象的字符串属性。XML可能如下所示：

```xml
<TextBox Text="{Binding FirstName}" />
```

如果用户在文本框中编辑文本，则底层对象的`FirstName`属性将自动更新。另一方面，如果底层对象的`FirstName`属性更改，则文本框中可见的文本将更新。

绑定可以是单向的：即绑定应用程序对象的属性的更改将反映在控件中，但用户不能更改控件的值。这样的一个例子是文本块控件，它是只读的。

```
<TextBlock Text="{Binding StatusMessage}" />
```

绑定与MVVM（Model-View-ViewModel）架构模式一起使用，这是使用Avalonia UI的主要方式之一。

:::info
有关如何在Avalonia中使用MVVM模式的更多信息，请参阅[概念页面](../../../concepts/the-mvvm-pattern)。
:::

:::info
有关MVVM模式在 _Microsoft_ 中的起源和发展的背景信息，请参阅 [_Microsoft Patterns and Practices_](https://msdn.microsoft.com/en-us/library/hh848246.aspx)。
:::

在下一页中，您将了解数据绑定器从哪里获取数据对象。
