---
id: binding-to-commands
title: Binding to Commands
---

Controls that carry out an action, such as [`Button`](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/4AAA993D) have a `Command` property which can be bound to an [`ICommand`](https://docs.microsoft.com/en-gb/dotnet/api/system.windows.input.icommand?view=netstandard-2.0). When the control is activated \(e.g. when a button is clicked\) the `ICommand.Execute` method will be called.

A good implementation of `ICommand` can be found in ReactiveUI's [`ReactiveCommand`](https://reactiveui.net/docs/handbook/commands/). If you've created your application using the [Avalonia MVVM Application](../tutorials/todo-list-app/creating-a-new-project#net-core-cli) template then this will be available by default. See the [ReactiveUI](https://reactiveui.net/docs/handbook/commands/) documentation for more information.

An example:

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        public MainWindowViewModel()
        {
            DoTheThing = ReactiveCommand.Create(RunTheThing);
        }

        public ReactiveCommand<Unit, Unit> DoTheThing { get; }

        void RunTheThing()
        {
            // Code for executing the command here.
        }
    }
}
```

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Button Command="{Binding DoTheThing}">Do the thing!</Button>
</Window>
```

## CommandParameter

You can also pass a parameter to the command using the `CommandParameter` property:

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        public MainWindowViewModel()
        {
            DoTheThing = ReactiveCommand.Create<string>(RunTheThing);
        }

        public ReactiveCommand<string, Unit> DoTheThing { get; }

        void RunTheThing(string parameter)
        {
            // Code for executing the command here.
        }
    }
}
```

```xml
<Window xmlns="https://github.com/avaloniaui">
    <Button Command="{Binding DoTheThing}" CommandParameter="Hello World">Do the thing!</Button>
</Window>
```

Note that no type conversion is carried out on `CommandParameter`, so if you need your type parameter to be something other than `string` you must supply an object of that type in XAML. For example to pass an `int` parameter you could use:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:sys="clr-namespace:System;assembly=mscorlib">
    <Button Command="{Binding DoTheThing}">
        <Button.CommandParameter>
            <sys:Int32>42</sys:Int32>
        </Button.CommandParameter>
        Do the thing!
    </Button>
</Window>
```

Like any other property, `CommandParameter` can also be bound.

## Binding To Methods

### ICommand.Execute

Sometimes you just want to call a method when a button is clicked without the ceremony of creating a command. You can do that too!

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        public void RunTheThing(string parameter)
        {
            // Code for executing the command here.
        }
    }
}
```

```xml
<Window xmlns="https://github.com/avaloniaui">
  <Button Command="{Binding RunTheThing}" CommandParameter="Hello World">Do the thing!</Button>
</Window>
```

### ICommand.CanExecute

If you need to have execution dependent on CommandParameter or your ViewModel property, you can define a named method formed by the prefix "Can" and the name of your execution method; the method will accept an object parameter which is the CommandParameter and return a Boolean which determines if the method is executable.

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        public void RunTheThing(string parameter)
        {
            // Code for executing the command here.
        }

        bool CanRunTheThing(/* CommandParameter */object parameter)
        {
            return parameter != null;
        }
    }
}
```

**Trigger ICommand.CanExecute**

if you want trigger CanExecute from your ViewModel, you have to decorate it with one or more DependsOn attributes, where propertyName is the name of the property that will activate the CanExecute method when it changes value.

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        bool _isTheThingEnabled = true;

        bool IsTheThingEnabled
        {
            get
            {
               return  _isTheThingEnabled;
            }
            set
            {
                if(value == _isTheThingEnabled)
                   return;
                _isTheThingEnabled = value;
                PropertyChanged?
                    .Invoke(this, new PropertyChangedEventArgs(nameof(IsTheThingEnabled)));
            }
        }

        public void RunTheThing(string parameter)
        {
            // Code for executing the command here.
        }

        [DependsOn(nameof(IsTheThingEnabled))]
        bool CanRunTheThing(/* CommandParameter */object parameter)
        {
            return IsTheThingEnabled && parameter != null;
        }
    }
}
```

## Samples

[Commands Example](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/CommandSample)