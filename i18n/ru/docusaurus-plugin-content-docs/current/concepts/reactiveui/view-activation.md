---
description: CONCEPTS - ReactiveUI
---

# View Activation

For the [WhenActivated](https://reactiveui.net/docs/handbook/when-activated/) ReactiveUI feature to work, you need to use custom base classes from the `Avalonia.ReactiveUI` package, such as `ReactiveWindow<TViewModel>` or `ReactiveUserControl<TViewModel>`. Of course, you can also implement the `IViewFor<TViewModel>` interface by hand in your class, but make sure you store the `ViewModel` in an `AvaloniaProperty`.

### Activation Example

**ViewModel.cs**

This view model implements the `IActivatableViewModel` interface. When the corresponding view gets attached to the visual tree, the code inside the WhenActivated block will get called. When the corresponding view gets detached from the visual tree, the composite disposable will be disposed. `ReactiveObject` is the base class for [view model classes](https://reactiveui.net/docs/handbook/view-models/), and it implements `INotifyPropertyChanged`.

```csharp
public class ViewModel : ReactiveObject, IActivatableViewModel
{
    public ViewModelActivator Activator { get; }

    public ViewModel()
    {
        Activator = new ViewModelActivator();
        this.WhenActivated((CompositeDisposable disposables) =>
        {
            /* handle activation */
            Disposable
                .Create(() => { /* handle deactivation */ })
                .DisposeWith(disposables);
        });
    }
}
```

**View.xaml**

This is the UI for the view model you see above.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        Background="#f0f0f0" FontFamily="Ubuntu"
        MinHeight="590" MinWidth="750">
  <TextBlock Text="Hello, world!" />
</Window>
```

**View.xaml.cs**

This is the code-behind for the `View.xaml` file you see above. Remember to always put a call to `WhenActivated` into your View constructor, otherwise ReactiveUI won't be able to determine when the view model gets activated.

```csharp
public class View : ReactiveWindow<ViewModel>
{
    public View()
    {
        // ViewModel's WhenActivated block will also get called.
        this.WhenActivated(disposables => { /* Handle view activation etc. */ });
        AvaloniaXamlLoader.Load(this);
    }
}
```

### Code-Behind ReactiveUI Bindings

The Avalonia XAML engine doesn't generate strongly typed `x:Name` references to controls. The only way to use [code-behind ReactiveUI bindings](https://reactiveui.net/docs/handbook/data-binding/) for now is to use the `FindControl` method that will find a control by the name specified in XAML, or to use `{Binding Path}` syntax.

The `FindControl` method shouldn't be used inside an expression. Instead, create a custom property which calls the `FindControl` method, or store the control in a variable. See the example below illustrating how to use ReactiveUI code-behind bindings with Avalonia.

```csharp
public class View : ReactiveWindow<ViewModel>
{
    // Assume the Button control has the Name="ExampleButton" attribute defined in XAML.
    public Button ExampleButton => this.FindControl<Button>("ExampleButton");

    public View()
    {
        this.WhenActivated(disposables => 
        {
            // Bind the 'ExampleCommand' to 'ExampleButton' defined above.
            this.BindCommand(ViewModel, x => x.ExampleCommand, x => x.ExampleButton)
                .DisposeWith(disposables);
        });
        AvaloniaXamlLoader.Load(this);
    }
}
```
