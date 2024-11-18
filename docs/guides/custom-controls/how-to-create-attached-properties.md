---
id: how-to-create-attached-properties
title: How To Create Attached Properties
---


# How To Create Attached Properties

When you need more or let's say foreign properties on avalonia elements, then attached properties are the right thing to use. They can also be used to create so called behaviors to generally modify the hosted gui components. This can be utilized to bind a command to an event for instance.

Here we present an example of how to use a command in an MVVM compatible way and bind it to an event.

It may not be the ideal solution as there are projects such as [Avalonia Behaviors](https://github.com/wieslawsoltes/AvaloniaBehaviors) where this is properly done. But it illustrates the following two learnings:

* How to create attached properties in _Avalonia UI_
* How to use them in a MVVM way.

First we have to create our attached property. The method `AvaloniaProperty.RegisterAttached` is used for that purpose. Note that by convention the **public static** CLR-property for the attached property is named _XxxxProperty_. Also note that by convention the name (the parameter) of the attached property is _Xxxx_ without the _Property_. And finally note that by convention one must provide two **public static** methods called _SetXxxx(element,value)_ and _GetXxxx(element)_.

This call ensures that the property has a type, an owner type and one where it may be used.

The verify method can be used to clean up a value that is being set. Either by returning the corrected value or discard the process by returning `AvaloniaProperty.UnsetValue`. Or one can perform special tasks with the element that the property is hosted by. The getter and setter methods should always just set the value and never do anything beyond. In fact they will usually never be called as the Binding system will recognize the convention and set the properties directly where they are stored.

In this example file we create two attached properties that interact with each other: A _Command_ property and a _CommandParameter_ that is used by when invoking the command.

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

In the verify method we utilize the routed event system to attach a new handler. Note that the handler should be detached, again. The value of the property is requested by the normal program mechanisms using `GetValue()` method.

This example UI shows how to use the attached property. After making the namespace known to the XAML compiler it can be used by qualifying it with a dot. Then bindings can be used.

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

Although the `CommandParameter` only uses a static value, it can be used with binding, too. When used with this view model, the `EditCommandExecuted` will run once a double click happens.

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
