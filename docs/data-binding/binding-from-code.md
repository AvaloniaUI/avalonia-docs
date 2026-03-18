---
id: binding-from-code
title: How to bind from code
doc-type: how-to
description: Create and manage data bindings from C# code rather than XAML.
---

## Creating compiled bindings from code

The [`CompiledBinding.Create`](/api/avalonia/data/compiledbinding#create-method) method lets you create type-safe bindings using LINQ expressions. The expression is validated at compile time, so errors in property names produce compiler errors rather than silent runtime failures.

The method takes two generic parameters: the type of the [`DataContext`](data-context) and the type of the property being selected. It then accepts a lambda expression to select the property to bind.

For example, if you have a control whose [`DataContext`](data-context) is an instance of `MyViewModel`, and you want to select a `string Title { get; set; }` property from it, you would write:

```csharp
var binding = CompiledBinding.Create<MyViewModel, string>(x => x.Title);
```

Then to bind this to a control:

```csharp
textBlock.Bind(TextBlock.TextProperty, binding);
```

The [`CompiledBinding.Create`](/api/avalonia/data/compiledbinding#create-method) method takes various optional parameters to control the binding. 

The following example selects a one-way binding from an explicit `viewModel` source (instead of using the data context):

```csharp
var binding = CompiledBinding.Create<MyViewModel, string>(
    expression: vm => vm.Title,
    source: viewModel,
    mode: BindingMode.OneWay);
```

The expression supports nested properties, indexers, and casts:

```csharp
// Nested property
CompiledBinding.Create<MyViewModel, string>(vm => vm.Address.City);

// With a value converter
CompiledBinding.Create<MyViewModel, bool>(
    expression: vm => vm.IsActive,
    converter: new BoolToOpacityConverter(),
    mode: BindingMode.OneWay);
```

You can also use it in object initializers:

```csharp
var textBlock = new TextBlock
{
    [!TextBlock.TextProperty] = CompiledBinding.Create<MyViewModel, string>(
        expression: vm => vm.Name),
};
```

This approach gives you the same performance and safety benefits as XAML compiled bindings, but from C# code. See [Compiled Bindings](/docs/data-binding/compiled-bindings) for the XAML equivalent.

## Subscribing to property changes

You can subscribe to [`AvaloniaObject`](/api/avalonia/avaloniaobject) property changes by calling the [`GetObservable`](/api/avalonia/avaloniaobjectextensions#getobservable-method) extension method. This returns an [`IObservable<T>`](https://learn.microsoft.com/en-us/dotnet/api/system.iobservable-1?view=net-10.0) which can be used to listen for changes to the property:

```csharp
var textBlock = new TextBlock();
var text = textBlock.GetObservable(TextBlock.TextProperty);
```

Each property that can be subscribed to has a static readonly field called `[PropertyName]Property` which is passed to `GetObservable` to subscribe to the property's changes.

[`IObservable<T>`](https://learn.microsoft.com/en-us/dotnet/api/system.iobservable-1?view=net-10.0) (part of Reactive Extensions, or rx for short) is out of scope for this guide, but here's an example which uses the returned observable to print a message with the changing property values to the console:

```csharp
var textBlock = new TextBlock();
var text = textBlock.GetObservable(TextBlock.TextProperty);
text.Subscribe(value => Console.WriteLine(value + " Changed"));
```

When the returned observable is subscribed, it will return the current value of the property immediately and then push a new value each time the property changes. If you don't want the current value, you can use the rx `Skip` operator:

```csharp
var text = textBlock.GetObservable(TextBlock.TextProperty).Skip(1);
```

Alternatively, you can subscribe to the [`AvaloniaObject.PropertyChanged`](/api/avalonia/avaloniaobject#propertychanged-event) event, which fires whenever _any_ property changes on the element.

```csharp
textBlock.PropertyChanged += (s, e) =>
{
    if (e.Property == TextBlock.TextProperty)
    {
        Console.WriteLine(e.NewValue + " Changed");
    }
};
```

## Binding to an observable

You can bind a property to an observable using the [`AvaloniaObject.Bind`](/api/avalonia/avaloniaobject#bind-method-1) method:

```csharp
// We use an Rx Subject here so we can push new values using OnNext
var source = new Subject<string>();
var textBlock = new TextBlock();

// Bind TextBlock.Text to source
var subscription = textBlock.Bind(TextBlock.TextProperty, source);

// Set textBlock.Text to "hello"
source.OnNext("hello");
// Set textBlock.Text to "world!"
source.OnNext("world!");

// Terminate the binding
subscription.Dispose();
```

Notice that the `Bind` method returns an `IDisposable` which can be used to terminate the binding. If you never call this, then the binding will automatically terminate when the observable finishes via `OnCompleted` or `OnError`.

:::note
Unlike standard Avalonia bindings, observables do not use weak references, so you are responsible for controlling their lifetime and preventing leaks.
:::

## Setting a binding in an object initializer

It is often useful to set up bindings in object initializers. You can do this using the indexer:

```csharp
var source = new Subject<string>();
var textBlock = new TextBlock
{
    Foreground = Brushes.Red,
    MaxWidth = 200,
    [!TextBlock.TextProperty] = CompiledBinding.Create<MyViewModel, string>(x => x.Title),
};
```

The indexer can be used outside of object initializers too:

```csharp
textBlock2[!TextBlock.TextProperty] = textBlock1[!TextBlock.TextProperty];
```

The only downside of this syntax is that no `IDisposable` is returned. If you need to manually terminate the binding then you should use the `Bind` method.

## Using reflection bindings from code

To create a reflection binding from code:

```csharp
var binding = new ReflectionBinding("Name");
```

For type-safe bindings that are validated at compile time, prefer [compiled bindings](#creating-compiled-bindings-from-code).

## Subscribing to a property on any object

The `GetObservable` method returns an observable that tracks changes to a property on a single instance. However, if you're writing a control you may want to implement an `OnPropertyChanged` method which isn't tied to an instance of an object.

To do this you can subscribe to [`AvaloniaProperty.Changed`](/api/avalonia/avaloniaproperty) which is an observable which fires _every time the property is changed on any instance_.

> In WPF this is done by passing a static `PropertyChangedCallback` to the `DependencyProperty` registration method, but this only allows the control author to register a property changed callback.

In addition there is an `AddClassHandler` extension method which can automatically route the event to a method on your control.

For example if you want to listen to changes to your control's `Foo` property you'd do it like this:

```csharp
static MyControl()
{
    FooProperty.Changed.AddClassHandler<MyControl>(FooChanged);
}

private static void FooChanged(MyControl sender, AvaloniaPropertyChangedEventArgs e)
{
    // The 'e' parameter describes what's changed.
}
```

## Inspecting active bindings

Use `BindingOperations.GetBindingExpressionBase` to retrieve the active binding expression on a property:

```csharp
var expression = BindingOperations.GetBindingExpressionBase(myTextBlock, TextBlock.TextProperty);
if (expression is not null)
{
    // A binding is active on TextBlock.TextProperty
}
```

This is useful for diagnostics or for calling `UpdateSource()` when using `UpdateSourceTrigger.Explicit`.

## See also

- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): XAML binding syntax reference.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): Compile-time validated bindings.
- [Binding Debugging](/docs/data-binding/binding-debugging): Diagnosing binding issues.
