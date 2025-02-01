---
description: CONCEPTS - ReactiveUI
---

import ReactiveObjectDiagram from '/img/concepts/reactiveui/reactiveobject.png';

# Reactive View Model

This page describes how you can use the _ReactiveUI_ `ReactiveObject` as the basis of your view model to implement MVVM binding with _Avalonia UI_.

_ReactiveUI_ provides the `ReactiveObject` as a base class for view models. It implements a notification of property changes and observables to monitor object changes.

:::info
For the detailed _ReactiveUI_ documentation for `ReactiveObject`, see [here](https://www.reactiveui.net/api/reactiveui/reactiveobject/).
:::

Once you have installed and configured _ReactiveUI_, you can base your view models on the class:

```csharp
public class ViewModelBase : ReactiveObject
{
}
```

<img src={ReactiveObjectDiagram} alt=""/>

:::info
If you have used the Avalonia MVVM Application solution template, then you will find this base class already added to the project /ViewModels folder.
:::

For example, you can implement a simple view model like this:

```csharp
public class MyViewModel : ViewModelBase
{
   private string _description = string.Empty;
   public string Description
   {
      get => _description;
      set => this.RaiseAndSetIfChanged(ref _description, value);
   }
}
```

## Notify the View of Changes

_Avalonia UI_ uses the underlying `ReactiveObject` to **Notify** changes in the view model back to the view using any bindings defined in the XAML. For example, if you are binding the _Avalonia UI_ text input control like this:

```xml
<TextBox AcceptsReturn="True"
         Text="{Binding Description}"
         Watermark="Enter a description"/>
```

Any change to the view model description property is achieved using the `set` accessor and a change is raised causing _Avalonia UI_ to display the new value on the UI.

## Update the View Model from Input

When _Avalonia UI_ uses the binding to **Update** the view model, the `set` accessor ensures that any parts of the view model that depend on the description property can also react to the change if necessary.

On the next page, you will learn how a reactive command acts as a special case of the view model update.

## Performing Data Validation
ReactiveUI provides the ability to perform data validation from the ViewModel that integrates well with the Avalonia fluent controls. The example shows how this can be done. The example is for a ViewModel that exposes a directory path string that is bounded to a TextBox control on the View.

Steps to enable data validation on the ViewModel:
1. Download the ReactiveUI.Validation nuget package (for desktop applications)
2. Change the inheritance of the ViewModel to ReactiveValidationObject
3. Include a this.ValidationRule in the ViewModel constructor, which provides the validation check for the ViewModel property and corresponding validation error message.

The code below shows the MainWindowViewModel.cs and MainWindow.axaml 
```C#
using System.IO;
using ReactiveUI;
using ReactiveUI.Validation.Extensions;
using ReactiveUI.Validation.Helpers;

namespace AvaloniaApplication3.ViewModels;

public class MainWindowViewModel : ReactiveValidationObject
{
    private string _directoryPath = string.Empty;
    
    public string DirectoryPath
    {
        get => _directoryPath;
        set => this.RaiseAndSetIfChanged(ref _directoryPath, value);
    }

    public MainWindowViewModel()
    {
        DirectoryPath = "C:\\BogusPath\\";
        this.ValidationRule(
            vm => vm.DirectoryPath,
            path => Directory.Exists(path),
            "You must specify a valid directory path.");

    }
}
```
```xaml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaApplication3.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaApplication3.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Width="800" Height="300" WindowStartupLocation="CenterScreen"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaApplication3">

    <TextBox
        Name="DirectoryPathTextBox"
        VerticalAlignment="Top"
        Text="{Binding DirectoryPath}"/>

</Window>
```
Below is the output:

![Avalonia-ReactiveUI-DataValidation](https://github.com/AvaloniaUI/avalonia-docs/assets/130417839/75aede6b-f8cc-4bb8-8520-f9a8f24aa779)
