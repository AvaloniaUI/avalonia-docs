---
description: CONCEPTS
---

# The View Locator


While the use of the View Locator comes as part of the default templates, it's important to note that it's not a mandatory requirement. It's an optional tool provided to help you structure your Avalonia application using the Model-View-ViewModel (MVVM) design pattern.

The View Locator is a mechanism in Avalonia that is used to resolve the view (user interface) that corresponds to a specific ViewModel. This is a core part of the MVVM (Model-View-ViewModel) pattern, which is a design pattern that separates the development of the graphical user interface from the development of the business logic or back-end logic.

## How it works

The View Locator uses naming conventions to map ViewModel types to view types. By default, it replaces every occurrence of the string "ViewModel" within the fully-qualified ViewModel type name with "View".

For example, given a ViewModel named `MyApplication.ViewModels.ExampleViewModel`, the View Locator will look for a View named `MyApplication.Views.ExampleView`.

The View Locator is typically used in conjunction with the `DataContext` property, which is used to link a view to its ViewModel.

Here's a simple usage example:

```cs
public class ViewLocator : IDataTemplate
{
    public bool SupportsRecycling => false;

    public Control Build(object data)
    {
        var name = data.GetType().FullName.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type);
        }
        else
        {
            return new TextBlock { Text = "Not Found: " + name };
        }
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

In this example, the View Locator is implemented as an `IDataTemplate`. The `Build` method creates the view for the ViewModel, and the `Match` method checks if the data object is a ViewModel that this locator knows how to handle. If you do not have a `ViewModelBase` class, at a minimum your ViewModel must implement `INotifyPropertyChanged`, and the comparison in `Match` should be changed accordingly. 

## Customizing the View Locator

You can customize the View Locator to use different conventions. For example, you might want to look for views in a different assembly, or use a different naming convention. To do this, you can implement your own View Locator by creating a class that implements the `IDataTemplate` interface, and replace the default View Locator with your own.

## Using the View Locator

By default, the View Locator is referenced in App.axaml as a DataTemplate, in the content of the `Application.DataTemplates` XAML tag. Ensure that its appropriate 'using' statement is in the `xmlns:local` property of the Application root tag.

```xaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="LearningAvalonia.App"
             xmlns:local="using:LearningAvalonia"
             RequestedThemeVariant="Default">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->
    <Application.DataTemplates>
        <local:ViewLocator />
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```
