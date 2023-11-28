---
id: how-to-implement-multi-page-apps
title: How To Implement Multi-page Apps
---


# How To Implement Multi-page Apps

Content in preparation.

This guide will show you how to employ user controls as page views, and the view locator class, to implement a multiple-page application.



that is added by the Avalonia MVVM solution template.

```csharp
public class ViewLocator : IDataTemplate
{
    public Control? Build(object? data)
    {
        if (data==null) return null;
        var name = data.GetType().FullName!.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type)!;
        }

        return new TextBlock { Text = "Not Found: " + name };
    }

    public bool Match(object? data)
    {
        return data is ViewModelBase;
    }
}
```
