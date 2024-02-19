---
description: CONCEPTS - ReactiveUI
---

import ReactiveCommandViewScreenshot from '/img/concepts/reactiveui/reactivecommand-view.png';
import ReactiveCommandOutputScreenshot from '/img/concepts/reactiveui/reactivecommand-output.png';
import ReactiveCommandCanExecuteScreenshot from '/img/concepts/reactiveui/reactivecommand-canexecute.png';

# Reactive Command

On this page you will learn how to use the _ReactiveUI_ `ReactiveCommand` and an `ObservableObject` created in code, to implement the UI principle of revealed functionality.

## Revealed Functionality

This is a very important principle that ensures that a user is properly guided through your UI because features and functions only become available (or even visible) once they are valid. 

As a simple example: an input requires at least 8 characters before a button can be clicked, so it is proper UI practice to keep the button disabled until valid input has been made.

## Reactive Command

As a starting point, you can create a simple view like this:

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5" >User Name</TextBlock>
  <TextBox Text="{Binding UserName}"/>
  <Button Margin="0 20" Command="{Binding SubmitCommand}">Submit</Button>
</StackPanel>
```

<img src={ReactiveCommandViewScreenshot} alt=""/>

You can add a corresponding view model like this:

```csharp
public class MainWindowViewModel : ViewModelBase
{
    private string _userName = string.Empty;

    public string UserName
    {
        get { return _userName; }
        set { this.RaiseAndSetIfChanged(ref _userName, value); }
    }

    public ReactiveCommand<Unit, Unit> SubmitCommand { get; }

    public MainWindowViewModel()
    {
        SubmitCommand = ReactiveCommand.Create(() => 
        {
            Debug.WriteLine("The submit command was run.");
        }); 
    }
}
```

This view model does not yet perform revealed functionality. The `SubmitCommand` is declared with no parameter, and no result (void). The synchronous action parameter of the `Create` method is where you implement what happens when the command is run (when the user clicks the button). The example above just reports the action in the debug window.

<img src={ReactiveCommandOutputScreenshot} alt=""/>

## Can Execute?

When you use _ReactiveUI_ to implement revealed functionality, you create an observable object that indicates whether your command can execute or not.

For example, you can add this code to the above view model to create an observable object to validate the view model:

```
IObservable<bool> isInputValid = this.WhenAnyValue(
                x => x.UserName,
                x => !string.IsNullOrWhiteSpace(x) && x.Length > 7
                );
```

The observable object monitors the value of the `UserName` property and runs the validation function whenever it changes. The observable object is created by the `WhenAnyValue` function of the `ReactiveObject` that underlies the view model (see the previous page [here](reactive-view-model.md)).

Next add the observable object to the `Create` method. This second parameter is the `canExecute` argument for the method.

```csharp
SubmitCommand = ReactiveCommand.Create(() => 
{
   Debug.WriteLine("The submit command was run.");
}, isInputValid); 
```

Now you will see that the button only becomes enabled once you have entered 8 characters.

<img src={ReactiveCommandCanExecuteScreenshot} alt=""/>
