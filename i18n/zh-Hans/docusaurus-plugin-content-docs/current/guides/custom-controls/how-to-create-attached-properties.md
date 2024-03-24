---
id: how-to-create-attached-properties
title: 如何创建附加属性
---


# 如何创建附加属性

当您需要在Avalonia元素上添加更多或者说外部属性时，附加属性是正确的选择。它还可以用于创建所谓的行为，通常用以修改托管的GUI组件。它可以用于将命令绑定到事件上。

下面是一个示例，展示了如何以符合MVVM的方式使用命令，并将其绑定到事件上。

这可能不是最理想的解决方案，因为有一些项目（如[Avalonia Behaviors](https://github.com/wieslawsoltes/AvaloniaBehaviors)）可以正确地完成这个任务。但它说明了以下两个要点：

* 如何在_Avalonia UI_中创建附加属性
* 如何以MVVM的方式使用它们

首先，我们需要创建我们的附加属性。使用`AvaloniaProperty.RegisterAttached`方法来实现。请注意，按照约定，附加属性的**public static** CLR属性的名称应为 _XxxxProperty_。还请注意，按照约定，附加属性的名称（参数）应为 _Xxxx_，不包括 _Property_。最后，请注意，按照约定，必须提供两个名为 _SetXxxx(element,value)_ 和 _GetXxxx(element)_ 的**public static**方法。

这个调用确保属性具有类型、所有者类型和可以使用的类型。

验证方法可以用来清理正在设置的值。可以通过返回更正后的值或返回`AvaloniaProperty.UnsetValue`来丢弃该过程。或者可以执行与托管属性的元素相关的特殊任务。获取器和设置器方法应该只设置值，不要做其他任何操作。实际上，它们通常不会被调用，因为绑定系统会识别约定并直接在存储属性的位置设置属性。

在这个示例文件中，我们创建了两个相互交互的附加属性：一个 _Command_ 属性和一个 _CommandParameter_ 属性，用于在调用命令时使用。

```csharp
/// <summary>
/// 附加属性的容器类。必须继承自<see cref="AvaloniaObject"/>。
/// </summary>
public class DoubleTappedBehav : AvaloniaObject
{
    static DoubleTappedBehav()
    {
        CommandProperty.Changed.AddClassHandler<Interactive>(HandleCommandChanged);
    }

    /// <summary>
    /// 标识<seealso cref="CommandProperty"/> avalonia附加属性。
    /// </summary>
    /// <value>提供一个派生自<see cref="ICommand"/>的对象或绑定。</value>
    public static readonly AttachedProperty<ICommand> CommandProperty = AvaloniaProperty.RegisterAttached<DoubleTappedBehav, Interactive, ICommand>(
        "Command", default(ICommand), false, BindingMode.OneTime);

    /// <summary>
    /// 标识<seealso cref="CommandParameterProperty"/> avalonia附加属性。
    /// 用作<see cref="CommandProperty"/>的参数。
    /// </summary>
    /// <value>任何类型为<see cref="object"/>的值。</value>
    public static readonly AttachedProperty<object> CommandParameterProperty = AvaloniaProperty.RegisterAttached<DoubleTappedBehav, Interactive, object>(
        "CommandParameter," default(object), false, BindingMode.OneWay, null);


    /// <summary>
    /// <see cref="CommandProperty"/>的变化事件处理程序。
    /// </summary>
    private static void HandleCommandChanged(Interactive interactElem, AvaloniaPropertyChangedEventArgs args)
    {
        if (args.NewValue is ICommand commandValue)
        {
             // 添加非空值
             interactElem.AddHandler(InputElement.DoubleTappedEvent, Handler);
        }
        else
        {
             // 删除之前的值
             interactElem.RemoveHandler(InputElement.DoubleTappedEvent, Handler);
        }
        // 本地处理函数
        static void Handler(object s, RoutedEventArgs e)
        {
            if (s is Interactive interactElem)
            {
                // 这是如何从GUI元素中获取参数的方法。
                object commandParameter = interactElem.GetValue(CommandParameterProperty);
                ICommand commandValue = interactElem.GetValue(CommandProperty);
                if (commandValue?.CanExecute(commandParameter) == true)
                {
                    commandValue.Execute(commandParameter);
                }
            }
        }
    }


    /// <summary>
    /// 附加属性<see cref="CommandProperty"/>的访问器。
    /// </summary>
    public static void SetCommand(AvaloniaObject element, ICommand commandValue)
    {
        element.SetValue(CommandProperty, commandValue);
    }

    /// <summary>
    /// 附加属性<see cref="CommandProperty"/>的访问器。
    /// </summary>
    public static ICommand GetCommand(AvaloniaObject element)
    {
        return element.GetValue(CommandProperty);
    }

    /// <summary>
    /// 附加属性<see cref="CommandParameterProperty"/>的访问器。
    /// </summary>
    public static void SetCommandParameter(AvaloniaObject element, object parameter)
    {
        element.SetValue(CommandParameterProperty, parameter);
    }

    /// <summary>
    /// 附加属性<see cref="CommandParameterProperty"/>的访问器。
    /// </summary>
    public static object GetCommandParameter(AvaloniaObject element)
    {
        return element.GetValue(CommandParameterProperty);
    }
}

```

在验证方法中，我们利用路由事件系统来附加一个新的处理程序。请注意，处理程序应该被再次分离。属性的值是通过正常的程序机制使用`GetValue()`方法来请求的。

这个示例UI展示了如何使用附加属性。在将命名空间告知XAML编译器后，可以通过在前面加上一个点来使用它。然后可以使用绑定。

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:loc="clr-namespace:MyApp.Behaviors"
             x:Class="MyApp.Views.TestView">
    <ListBox ItemsSource="{Binding Accounts}"
             SelectedIndex="{Binding SelectedAccountIdx, Mode=TwoWay}"
             loc:DoubleTappedBehav.Command="{Binding EditCommand}"
             loc:DoubleTappedBehav.CommandParameter="test77"
             >
      <ListBox.ItemTemplate>
        <DataTemplate>
          <TextBlock Text="{Binding }" />          
        </DataTemplate>
      </ListBox.ItemTemplate>
    </ListBox>
</UserControl>
```

虽然`CommandParameter`只使用了一个静态值，但它也可以与绑定一起使用。当与这个视图模型一起使用时，一旦发生双击，`EditCommandExecuted`就会运行。

```csharp
public class TestViewModel : ReactiveObject
{
    public ObservableCollection<Profile> Accounts { get; } = new ObservableCollection<Profile>();

    public ReactiveCommand<object, Unit> EditCommand { get; set; }

    public TestViewModel()
    {
        EditCommand = ReactiveCommand.CreateFromTask<object, Unit>(EditCommandExecuted);
    }

    private async Task<Unit> EditCommandExecuted(object p)
    {
        // p包含"test77"

        return Unit.Default;
    }
}
```
