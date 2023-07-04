---
id: inotifypropertychanged
title: How to use INotifyPropertyChanged
---

## Introduction
The `INotifyPropertyChanged` interface is a critical component in the Model-View-ViewModel (MVVM) design pattern that helps create scalable and maintainable applications. By notifying that a property has been changed, it allows the View to update automatically, improving the communication between the components of your application.

## What is INotifyPropertyChanged?

`INotifyPropertyChanged` is an interface provided by .NET that a class can implement to signal that a property has changed its value. This is especially useful in data-binding scenarios, where an automatic update of the UI can be triggered once the data it's bound to changes.

The `INotifyPropertyChanged` interface has one event member, `PropertyChanged`. When a property's value is changed, the object raises a `PropertyChanged` event to notify any bound elements that the property has changed.

## Why is INotifyPropertyChanged Important in MVVM?
In the MVVM pattern, the ViewModel encapsulates the interaction logic for the View and encapsulates the data from the Model. The View binds to properties in the ViewModel, which in turn exposes data contained in Model objects.

For the MVVM pattern to work as intended, the View needs to be updated whenever the underlying data changes. That's where `INotifyPropertyChanged` comes in. By implementing this interface in your ViewModel, you can notify the View about changes in the Model, which automatically updates the UI.

## Implementing INotifyPropertyChanged
Here's an example of how to implement `INotifyPropertyChanged`:

```csharp
public class MyViewModel : INotifyPropertyChanged
{
    private string _name;

    public string Name
    {
        get { return _name; }
        set
        {
            _name = value;
            OnPropertyChanged(nameof(Name));
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

In this code, whenever the `Name` property is set to a new value, the `OnPropertyChanged` method is called, which raises the `PropertyChanged` event. Any UI elements bound to this property will then update to reflect the new value.

## Using MVVM Toolkit to Simplify INotifyPropertyChanged
While implementing `INotifyPropertyChanged` isn't particularly complex, it can become tedious if you have many properties in your ViewModel. Luckily, the .NET Community Toolkit's MVVM library offers an even more efficient way to implement `INotifyPropertyChanged` using its `ObservableObject` class and the `[ObservableProperty]` attribute with the help of Source Generators.

Here's how you can achieve the same result as before, but using `ObservableObject`:

```csharp
using Microsoft.Toolkit.Mvvm.ComponentModel;

public partial class MyViewModel : ObservableObject
{
    [ObservableProperty]
    private string _name;
}
```

In this code, the `ObservableObject` class implements `INotifyPropertyChanged`, and the `[ObservableProperty]` attribute is used to indicate that `_name` is an observable property. The Source Generator will then generate the necessary boilerplate code behind the scenes, including the property's getter and setter, and automatically call the `OnPropertyChanged` method when the property changes. This makes the implementation cleaner and less error-prone.

The MVVM Toolkit provides a range of tools to help simplify the implementation of the MVVM pattern in your .NET applications, including simplifying the use of `INotifyPropertyChanged`. The use of Source Generators makes your code more efficient and readable, while still maintaining the same functionality.








