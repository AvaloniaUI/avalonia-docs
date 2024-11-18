---
description: CONCEPTS - ReactiveUI
---

# 查看激活

为了使[WhenActivated](https://reactiveui.net/docs/handbook/when-activated/) ReactiveUI功能正常工作，您需要使用`Avalonia.ReactiveUI`包中的自定义基类，例如`ReactiveWindow<TViewModel>`或`ReactiveUserControl<TViewModel>`。当然，您也可以手动在类中实现`IViewFor<TViewModel>`接口，但请确保将`ViewModel`存储在`AvaloniaProperty`中。

### 激活示例

**ViewModel.cs**

此视图模型实现了`IActivatableViewModel`接口。当相应的视图附加到可视树时，WhenActivated块内的代码将被调用。当相应的视图从可视树中分离时，复合可处置对象将被处置。`ReactiveObject`是[视图模型类](https://reactiveui.net/docs/handbook/view-models/)的基类，并实现了`INotifyPropertyChanged`。

```csharp
public class ViewModel : ReactiveObject, IActivatableViewModel
{
    public ViewModelActivator Activator { get; }

    public ViewModel()
    {
        Activator = new ViewModelActivator();
        this.WhenActivated((CompositeDisposable disposables) =>
        {
            /* 处理激活 */
            Disposable
                .Create(() => { /* 处理停用 */ })
                .DisposeWith(disposables);
        });
    }
}
```

**View.xaml**

这是上面所示视图模型的用户界面。

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        Background="#f0f0f0" FontFamily="Ubuntu"
        MinHeight="590" MinWidth="750">
  <TextBlock Text="Hello, world!" />
</Window>
```

**View.xaml.cs**

这是上面你看到的`View.xaml`文件的代码后台。请记住，始终在View构造函数中调用`WhenActivated`，否则ReactiveUI将无法确定何时激活视图模型。

```csharp
public class View : ReactiveWindow<ViewModel>
{
    public View()
    {
        // ViewModel的WhenActivated块也将被调用。
        this.WhenActivated(disposables => { /* 处理视图激活等 */ });
        AvaloniaXamlLoader.Load(this);
    }
}
```

### Code-Behind ReactiveUI绑定

Avalonia XAML引擎不会生成强类型的`x:Name`引用来引用控件。目前，使用[代码后台的ReactiveUI绑定](https://reactiveui.net/docs/handbook/data-binding/)的唯一方法是使用`FindControl`方法，该方法将根据XAML中指定的名称查找控件，或者使用`{Binding Path}`语法。

不应在表达式中使用`FindControl`方法。相反，可以创建一个调用`FindControl`方法的自定义属性，或者将控件存储在变量中。下面的示例演示了如何在Avalonia中使用ReactiveUI代码后台绑定。

```csharp
public class View : ReactiveWindow<ViewModel>
{
    // 假设Button控件在XAML中定义了Name="ExampleButton"属性。
    public Button ExampleButton => this.FindControl<Button>("ExampleButton");

    public View()
    {
        this.WhenActivated(disposables => 
        {
            // 将'ExampleCommand'绑定到上面定义的'ExampleButton'。
            this.BindCommand(ViewModel, x => x.ExampleCommand, x => x.ExampleButton)
                .DisposeWith(disposables);
        });
        AvaloniaXamlLoader.Load(this);
    }
}
```