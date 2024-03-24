---
description: TUTORIALS - To Do List App
---

import ToDoViewLocatorArchitectureDiagram from '/img/gitbook-import/assets/image (45).png';

# The View Locator

On this page you will learn how the view locator class that the solution template added to your project is being used. You will see how this implements a 'convention over configuration' paradigm inside the content zone of your main window.

To help learn how it works, take some time to examine the view locator class:

```csharp
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using System;
using ToDoList.ViewModels;

namespace ToDoList
{
    public class ViewLocator : IDataTemplate
    {
        public Control Build(object data)
        {
            var name = data.GetType().FullName!.Replace("ViewModel", "View");
            var type = Type.GetType(name);

            if (type != null)
            {
                return (Control)Activator.CreateInstance(type)!;
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

The view locator class defines a data template in code which takes a view model and can return a corresponding view. It works by defining two methods:

* `Match(object data)` looks at the data and checks that it inherits from the  `ViewModelBase` class - as both your view models do! If this check passes, then the `Build` method is called:
* `Build(object data)` takes the fully qualified name of the view model type and replaces the string `"ViewModel"` with the string `"View"`. It then tries to create the view type, and if that is successful returns it.

An instance of `ViewLocator` is present in the **App.axaml** file in the app project (it was added by the solution template). It should look like this:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="ToDoList.App"
             xmlns:local="using:ToDoList"
             RequestedThemeVariant="Default">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
  
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

In your to do list app, the main window has had its content set to an object that is not a built-in control, user control or custom control. So _Avalonia UI_ searches up the tree of controls for a **data template** that matches the class of the content data.

:::info
For more information about the concepts behind data templates, see [here](../../concepts/templates/).
:::

As no other data templates match, the search will eventually reach the `ViewLocator` in the application data templates element. This will run its checks and if they pass, return an instance of the corresponding view. In your app this will be the to do list view.

<img className="center" src={ToDoViewLocatorArchitectureDiagram} alt="" />

In this way the content of the main window is set to the correct view, based on the type of the view model and the naming convention.

## Source not Framework

Note that the view locator class is included in the project source rather than being part of the _Avalonia UI_ framework itself. This is because using an implementation of the 'convention over configuration' paradigm is an architectural choice for the application developer.

If you do not want to use the view locator (in a different app); then remove it from the project and the **App.axaml** file.

On the next page you will learn how to add revealed functionality and actions to the **OK** and **Cancel** buttons.
