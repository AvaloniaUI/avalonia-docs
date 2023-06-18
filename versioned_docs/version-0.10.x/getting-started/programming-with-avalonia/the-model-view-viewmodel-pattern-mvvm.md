---
id: the-model-view-viewmodel-pattern-mvvm
title: The Model-View-ViewModel Pattern
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

As well as writing code in code-behind, Avalonia supports using the [Model-View-ViewModel](https://docs.avaloniaui.net/guides/basics/mvvm) pattern \(or MVVM\). MVVM is a common way to structure UI applications that separates view logic from application logic in a way that allows your applications to become unit-testable.

MVVM relies upon Avalonia's [binding](https://docs.avaloniaui.net/docs/data-binding/bindings) capabilities to separate your application into a View layer which displays standard Avalonia windows and controls, and a ViewModel layer which defines the functionality of the application independently of Avalonia itself. 

The following example shows the code from the previous example implemented using the MVVM pattern:


<Tabs
  defaultValue="xaml"
  values={[
      { label: 'XAML', value: 'xaml', },
      { label: 'C#', value: 'cs', },
  ]}
>
<TabItem value="xaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow"
        Title="Window with Button"
        Width="250" Height="100">

  <!-- Add button to window -->
  <Button Content="{Binding ButtonText}" Command="{Binding ButtonClicked}"/>
</Window>
```

</TabItem>
<TabItem value="cs">

```cs
using System.ComponentModel;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace AvaloniaApplication1
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = new MainWindowViewModel();
        }
    }

    public class MainWindowViewModel : INotifyPropertyChanged
    {
        string buttonText = "Click Me!";

        public string ButtonText
        {
            get => buttonText;
            set 
            {
                buttonText = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(ButtonText)));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        public void ButtonClicked() => ButtonText = "Hello, Avalonia!";
    }
}
```
</TabItem>  

</Tabs>


In this example, the code-behind assigns the `Window`'s [`DataContext`](https://docs.avaloniaui.net/docs/data-binding/the-datacontext) property to an instance of `MainWindowViewModel`. The XAML then uses an Avalonia [`{Binding}`](https://docs.avaloniaui.net/docs/data-binding/bindings) to bind the `Button`'s `Content` property to the `ButtonText` property on the `MainWindowViewModel`. It also binds the `Button`'s [`Command`](https://docs.avaloniaui.net/docs/data-binding/binding-to-commands) property to the `ButtonClicked` method on the `MainWindowViewModel`.

When the `Button` is clicked it invokes its `Command`, causing the bound `MainWindowViewModel.ButtonClicked` method to be called. This method then sets the `ButtonText` property which raises the `INotifyPropertyChanged.PropertyChanged` event, causing the `Button` to re-read its bound value and update the UI.
