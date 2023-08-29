---
id: binding-from-code
title: 如何从代码中绑定
---


# 如何从代码中绑定

在Avalonia中，从代码中绑定与WPF/UWP中的方式有些不同。在底层，Avalonia的绑定系统基于Reactive Extensions的 `IObservable`，然后由XAML绑定进行构建（这些绑定也可以在代码中实例化）。

## 订阅属性的更改

您可以通过调用 `GetObservable` 方法来订阅属性的更改。这将返回一个 `IObservable<T>`，可用于监听属性的更改：

```csharp
var textBlock = new TextBlock();
var text = textBlock.GetObservable(TextBlock.TextProperty);
```

每个可订阅的属性都有一个静态只读字段，称为 `[PropertyName]Property`，该字段在 `GetObservable` 中传递以订阅属性的更改。

`IObservable`（是Reactive Extensions的一部分，简称为rx）超出了本指南的范围，但以下是一个示例，该示例使用返回的可观察对象将更改的属性值打印到控制台：

```csharp
var textBlock = new TextBlock();
var text = textBlock.GetObservable(TextBlock.TextProperty);
text.Subscribe(value => Console.WriteLine(value + " Changed"));
```

当订阅返回的可观察对象时，它将立即返回属性的当前值，然后在每次属性更改时推送一个新值。如果您不想要当前值，可以使用 rx 的 `Skip` 运算符：

```csharp
var text = textBlock.GetObservable(TextBlock.TextProperty).Skip(1);
```

## 绑定到可观察对象

您可以使用 `AvaloniaObject.Bind` 方法将属性绑定到可观察对象：

```csharp
// 在这里我们使用Rx Subject，以便我们可以使用OnNext推送新值
var source = new Subject<string>();
var textBlock = new TextBlock();

// 将TextBlock.Text绑定到source
var subscription = textBlock.Bind(TextBlock.TextProperty, source);

// 将textBlock.Text设置为"hello"
source.OnNext("hello");
// 将textBlock.Text设置为"world!"
source.OnNext("world!");

// 终止绑定
subscription.Dispose();
```

请注意，`Bind` 方法返回一个 `IDisposable`，可用于终止绑定。如果您从不调用此方法，那么当可观察对象通过 `OnCompleted` 或 `OnError` 结束时，绑定将自动终止。

## 在对象初始化器中设置绑定

在对象初始化器中设置绑定通常很有用。您可以使用索引器来实现此目的：

```csharp
var source = new Subject<string>();
var textBlock = new TextBlock
{
    Foreground = Brushes.Red,
    MaxWidth = 200,
    [!TextBlock.TextProperty] = source.ToBinding(),
};
```

使用此方法，您还可以轻松地将一个控件的属性绑定到另一个控件的属性：

```csharp
var textBlock1 = new TextBlock();
var textBlock2 = new TextBlock
{
    Foreground = Brushes.Red,
    MaxWidth = 200,
    [!TextBlock.TextProperty] = textBlock1[!TextBlock.TextProperty],
};
```

当然，索引器也可以在对象初始化器之外使用：

```csharp
textBlock2[!TextBlock.TextProperty] = textBlock1[!TextBlock.TextProperty];
```

这种语法的唯一缺点是不会返回 `IDisposable`。如果您需要手动终止绑定，则应使用 `Bind` 方法。

## 转换绑定值

因为我们使用的是可观察对象，所以可以很容易地转换我们绑定的值！

```csharp
var source = new Subject<string>();
var textBlock = new TextBlock
{
    Foreground = Brushes.Red,
    MaxWidth = 200,
    [!TextBlock.TextProperty] = source.Select(x => "Hello " + x).ToBinding(),
};
```

## 从代码中使用 XAML 绑定

有时，当您想要使用XAML绑定提供的附加功能时，从代码中使用 XAML 绑定会更加容易。例如，仅使用可观察对象，您可以像这样绑定到 `DataContext` 上的属性：

```csharp
var textBlock = new TextBlock();
var viewModelProperty = textBlock.GetObservable(TextBlock.DataContext)
    .OfType<MyViewModel>()
    .Select(x => x?.Name);
textBlock.Bind(TextBlock.TextProperty, viewModelProperty);
```

然而，在这种情况下，使用 XAML 绑定可能更可取：

```csharp
var textBlock = new TextBlock
{
    [!TextBlock.TextProperty] = new Binding("Name")
};
```

或者，如果您需要一个 `IDisposable` 来终止绑定：

```csharp
var textBlock = new TextBlock();
var subscription = textBlock.Bind(TextBlock.TextProperty, new Binding("Name"));

subscription.Dispose();
```

## 订阅任何对象的属性

`GetObservable` 方法返回一个可观察对象，用于跟踪单个实例上属性的更改。但是，如果您正在编写一个控件，可能希望实现一个与对象实例无关的 `OnPropertyChanged` 方法。

要做到这一点，您可以订阅 [`AvaloniaProperty.Changed`](http://reference.avaloniaui.net/api/Avalonia/AvaloniaProperty/65237C52)，这是一个可观察对象，_每次在任何实例上更改属性时都会触发该对象_。

> 在 WPF 中，通过将静态的 `PropertyChangedCallback` 传递给 `DependencyProperty` 注册方法来完成此操作，但这只允许控件作者注册属性更改回调。

此外，还有一个 `AddClassHandler` 扩展方法，可以自动将事件路由到控件上的方法。

例如，如果您想要监听对控件的 `Foo` 属性的更改，可以像这样做：

```csharp
static MyControl()
{
    FooProperty.Changed.AddClassHandler<MyControl>(FooChanged);
}

private static void FooChanged(MyControl sender, AvaloniaPropertyChangedEventArgs e)
{
    // 'e' 参数描述了发生的更改。
}
```

## 绑定到实现了 `INotifyPropertyChanged` 的对象

也可以绑定到实现了 `INotifyPropertyChanged` 的对象。

```csharp
var textBlock = new TextBlock();

var binding = new Binding 
{ 
    Source = someObjectImplementingINotifyPropertyChanged, 
    Path = nameof(someObjectImplementingINotifyPropertyChanged.MyProperty)
}; 

textBlock.Bind(TextBlock.TextProperty, binding);
```
