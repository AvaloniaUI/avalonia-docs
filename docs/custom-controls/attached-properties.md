---
id: attached-properties
title: How to create attached properties
description: Define attached properties that can be set on other controls, like layout positioning properties.
doc-type: how-to
---

When you need additional properties on Avalonia elements that are not part of the element's own class, attached properties are the right tool. You can also use them to create behaviors that modify hosted controls. For example, you can bind a command to an event using an attached property.

The following example shows how to use a command in an MVVM-compatible way and bind it to an event. It is not the only approach (projects such as [Avalonia Behaviors](https://github.com/wieslawsoltes/AvaloniaBehaviors) offer a more complete solution), but it illustrates two key concepts:

* How to create attached properties in Avalonia
* How to use them with MVVM

## Register the attached property

Use the `AvaloniaProperty.RegisterAttached` method to register an attached property. By convention:

* The **public static** CLR field for the attached property is named _XxxxProperty_.
* The name parameter of the attached property is _Xxxx_ (without the _Property_ suffix).
* You must provide two **public static** methods: _SetXxxx(element, value)_ and _GetXxxx(element)_.

The registration call specifies the property type, owner type, and the type on which the property can be set.

The validation callback can clean up a value being set by returning a corrected value, or discard the change by returning `AvaloniaProperty.UnsetValue`. The getter and setter methods should only get and set the value. The binding system recognizes the naming convention and sets the properties directly.

The following example creates two attached properties that interact with each other: a `Command` property and a `CommandParameter` that is passed when invoking the command.

```csharp
/// <summary>
/// Container class for attached properties. Must inherit from <see cref="AvaloniaObject"/>.
/// </summary>
public class DoubleTappedBehav : AvaloniaObject
{
    static DoubleTappedBehav()
    {
        CommandProperty.Changed.AddClassHandler<Interactive>(HandleCommandChanged);
    }

    /// <summary>
    /// Identifies the <seealso cref="CommandProperty"/> avalonia attached property.
    /// </summary>
    /// <value>Provide an <see cref="ICommand"/> derived object or binding.</value>
    public static readonly AttachedProperty<ICommand> CommandProperty = AvaloniaProperty.RegisterAttached<DoubleTappedBehav, Interactive, ICommand>(
        "Command", default(ICommand), false, BindingMode.OneTime);

    /// <summary>
    /// Identifies the <seealso cref="CommandParameterProperty"/> avalonia attached property.
    /// Use this as the parameter for the <see cref="CommandProperty"/>.
    /// </summary>
    /// <value>Any value of type <see cref="object"/>.</value>
    public static readonly AttachedProperty<object> CommandParameterProperty = AvaloniaProperty.RegisterAttached<DoubleTappedBehav, Interactive, object>(
        "CommandParameter", default(object), false, BindingMode.OneWay, null);


    /// <summary>
    /// <see cref="CommandProperty"/> changed event handler.
    /// </summary>
    private static void HandleCommandChanged(Interactive interactElem, AvaloniaPropertyChangedEventArgs args)
    {
        if (args.NewValue is ICommand commandValue)
        {
             // Add non-null value
             interactElem.AddHandler(InputElement.DoubleTappedEvent, Handler);
        }
        else
        {
             // remove prev value
             interactElem.RemoveHandler(InputElement.DoubleTappedEvent, Handler);
        }
        // local handler fcn
        static void Handler(object s, RoutedEventArgs e)
        {
            if (s is Interactive interactElem)
            {
                // This is how we get the parameter off of the gui element.
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
    /// Accessor for Attached property <see cref="CommandProperty"/>.
    /// </summary>
    public static void SetCommand(AvaloniaObject element, ICommand commandValue)
    {
        element.SetValue(CommandProperty, commandValue);
    }

    /// <summary>
    /// Accessor for Attached property <see cref="CommandProperty"/>.
    /// </summary>
    public static ICommand GetCommand(AvaloniaObject element)
    {
        return element.GetValue(CommandProperty);
    }

    /// <summary>
    /// Accessor for Attached property <see cref="CommandParameterProperty"/>.
    /// </summary>
    public static void SetCommandParameter(AvaloniaObject element, object parameter)
    {
        element.SetValue(CommandParameterProperty, parameter);
    }

    /// <summary>
    /// Accessor for Attached property <see cref="CommandParameterProperty"/>.
    /// </summary>
    public static object GetCommandParameter(AvaloniaObject element)
    {
        return element.GetValue(CommandParameterProperty);
    }
}

```

The class listens for changes to `CommandProperty` and uses the routed event system to attach or detach a handler. The handler reads the property values using `GetValue()`.

## Use the attached property in XAML

After declaring the namespace in XAML, you can set the attached property using dot notation. Bindings work as expected.

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

## Handle the command in a view model

Although the `CommandParameter` in this example uses a static value, it can also be data-bound. When used with the following view model, `EditCommandExecuted` runs when a double-tap occurs.

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
        // p contains "test77"

        return Unit.Default;
    }
}
```

## See also

- [Defining Properties](defining-properties)
- [Creating Custom Controls](index)
- [Routed Events](/docs/input-interaction/routed-events)
