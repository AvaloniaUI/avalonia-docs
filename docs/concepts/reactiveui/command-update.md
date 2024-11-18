---
description: CONCEPTS - ReactiveUI
---

# Command Update

This page introduces how you can use Avalonia UI binding to initiate changes on a view model from controls like buttons that have a `Command` attribute.

For example, you can use this view model with an action defined in the method `ButtonAction`:

```csharp
public class MainWindowViewModel : ViewModelBase
{
    private string _greeting = "Welcome to Avalonia!";

    public string Greeting
    {
        get => _greeting;
        set => this.RaiseAndSetIfChanged(ref _greeting,  value);
    }

    public void ButtonAction()
    {
        Greeting = "Another greeting from Avalonia";
    }
}
```

Then in the corresponding XAML define two controls:

```xml
<TextBlock Text="{Binding Greeting}" />
<Button Command="{Binding ButtonAction}" >Change It</Button>
```

This means that when the user clicks the button, _Avalonia UI_ updates the view model by calling the `ButtonAction` method. This changes the `Greeting` property using the setter, so in turn the new greeting text is notified back to the text control on the UI.


