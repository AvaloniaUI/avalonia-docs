---
id: how-to-implement-multi-page-apps
title: How To Implement Multi-page Apps
---


# 如何实现多页面应用

内容准备中。

本指南将向您展示如何使用用户控件作为页面视图以及视图定位器类来实现多页面应用。

这是Avalonia MVVM解决方案模板添加的功能。

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
