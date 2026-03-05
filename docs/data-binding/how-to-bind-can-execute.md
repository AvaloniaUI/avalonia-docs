---
id: how-to-bind-can-execute
title: How to Bind Can Execute
---

import BindCanExecuteScreenshot from '/img/guides/data/bind-canexecute.gif';

# How to Bind Can Execute

Whether a control, that can initiate an action in response to user interaction, is in its enabled state, is an important principle of the 'revealed functionality' part of user experience design (UX). User confidence is reinforced by disabling commands that cannot run. For example where a button or menu item cannot run due to the current state of an application, they should be presented as inactive.

This example assumes that you are using the MVVM implementation pattern. This approach gives a clear separation between the view and the view model.

In this example, the button can only be clicked when the message is not empty. As soon as the output is shown, the message is reset to the empty string, which in turn will disable the button again.

```xml title='XAML'
<StackPanel Margin="20">
  <TextBox Margin="0 5" Text="{Binding Message}"
           Watermark="Add a message to enable the button"/>
  <Button Command="{Binding ExampleCommand}">
    Run the example
  </Button>
  <TextBlock Margin="0 5" Text="{Binding Output}" />
</StackPanel>
```

```csharp title='MainWindowViewModel.cs'
using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel : INotifyPropertyChanged
    {
        private string _message = string.Empty;
        private string _output = "Waiting...";

        public event PropertyChangedEventHandler? PropertyChanged;

        public string Message
        {
            get => _message;
            set
            {
                if (_message != value)
                {
                    _message = value;
                    OnPropertyChanged();
                    ExampleCommand.RaiseCanExecuteChanged();
                }
            }
        }

        public string Output
        {
            get => _output;
            set
            {
                if (_output != value)
                {
                    _output = value;
                    OnPropertyChanged();
                }
            }
        }

        public RelayCommand ExampleCommand { get; }

        public MainWindowViewModel()
        {
            ExampleCommand = new RelayCommand(
                PerformAction,
                () => !string.IsNullOrWhiteSpace(Message));
        }

        private void PerformAction()
        {
            Output = $"The action was called. {Message}";
            Message = string.Empty;
        }

        protected void OnPropertyChanged([CallerMemberName] string? name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }
}
```

```csharp title='RelayCommand.cs'
using System;
using System.Windows.Input;

namespace AvaloniaGuides.ViewModels
{
    public class RelayCommand : ICommand
    {
        private readonly Action _execute;
        private readonly Func<bool>? _canExecute;

        public RelayCommand(Action execute, Func<bool>? canExecute = null)
        {
            _execute = execute;
            _canExecute = canExecute;
        }

        public event EventHandler? CanExecuteChanged;

        public bool CanExecute(object? parameter) => _canExecute?.Invoke() ?? true;

        public void Execute(object? parameter) => _execute();

        public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

In the constructor of the view model, the command is created with two parameters: the action to execute, and a function that determines whether the command can run. The button automatically disables when `CanExecute` returns `false`.

When the `Message` property changes, `RaiseCanExecuteChanged` notifies the binding system to re-evaluate whether the button should be enabled.

<img src={BindCanExecuteScreenshot} alt=""/>
