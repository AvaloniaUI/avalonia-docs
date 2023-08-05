---
id: locating-views
title: Locating Views
---

Hold on, rewind a second. An observant reader will have noticed something strange going on [in the last section](wiring-up-the-views).

Views/MainWindow.axaml

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="Todo.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Width="200" Height="300"
        Title="Avalonia Todo"
        Content="{Binding List}">
</Window>
```

We bound the `Window.Content` property to the `MainWindowViewModel.List` property which is an instance of `TodoListViewModel` but the window is displaying a `TodoListView`! What's happening here? How is a view being displayed when the window content is a view model?

The answer can be found in `ViewLocator.cs` which was a file added by the template:

ViewLocator.cs

```csharp
using System;
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using Todo.ViewModels;

namespace Todo
{
    public class ViewLocator : IDataTemplate
    {
        public bool SupportsRecycling => false;

        public IControl Build(object data)
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
}
```

`ViewLocator` defines a [data template](../../templates/data-templates) which converts view models into views. It defines two methods:

* `Match(object data)` looks at the data and if the data inherits from `ViewModelBase` it returns `true` indicating that `Build` should be called
* `Build(object data)` takes the fully qualified name of the data's type and replaces the string `"ViewModel"` with the string `"View"`. It then tries to get a type that matches that name. If a matching type is found, it creates an instance of the type and returns it

An instance of `ViewLocator` is present in `Application.DataTemplates`:

```markup
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:Todo"
             x:Class="Todo.App">
    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>

    <Application.Styles>
        <StyleInclude Source="avares://Avalonia.Themes.Default/DefaultTheme.xaml"/>
        <StyleInclude Source="avares://Avalonia.Themes.Default/Accents/BaseLight.xaml"/>
    </Application.Styles>
</Application>
```

When an instance of [ContentControl](../../controls/contentcontrol) \(such as `Window`\) has its `Content` property set to a non-control, it searches up the tree of controls for a `DataTemplate` that matches the content data. If no other `DataTemplate` matches the data it will eventually reach the `ViewLocator` in the application data templates which will do its business and return an instance of the corresponding view.

:::warning
 `ViewLocator` is included in the project's source instead of being a component of Avalonia itself because the mechanism of relating a view model to a view may be application-specific; for example one might want to implement it using a DI framework. `ViewLocator` can be thought of as implementing the [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) paradigm.
:::
