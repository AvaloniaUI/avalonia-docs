---
id: inotifypropertychanged
title: 如何使用 INotifyPropertyChanged
---

## 介绍
`INotifyPropertyChanged` 接口是模型-视图-视图模型（MVVM）设计模式中的关键组件，有助于创建可扩展和易于维护的应用程序。通过通知属性已更改，它允许视图自动更新，改善应用程序组件之间的通信。

## 什么是 INotifyPropertyChanged？

`INotifyPropertyChanged` 是 .NET 提供的一个接口，类可以实现该接口以表示属性已更改其值。这在数据绑定场景中特别有用，当绑定的数据发生变化时，可以自动更新用户界面（UI）。

`INotifyPropertyChanged` 接口具有一个事件成员，即 `PropertyChanged`。当属性的值更改时，对象会引发 `PropertyChanged` 事件，以通知任何已绑定的元素属性已更改。

## 为什么在 MVVM 中 INotifyPropertyChanged 很重要？
在 MVVM 模式中，视图模型（ViewModel）封装了视图的交互逻辑，并封装了来自模型的数据。视图绑定到视图模型中的属性，而视图模型则公开了模型对象中包含的数据。

为了使 MVVM 模式正常工作，当基础数据发生更改时，视图需要得到更新。这就是 `INotifyPropertyChanged` 的作用。通过在视图模型中实现此接口，您可以通知视图模型中的视图有关模型更改的信息，从而自动更新用户界面。

## 实现 INotifyPropertyChanged
以下是如何实现 `INotifyPropertyChanged` 的示例：

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

在此代码中，每当将 `Name` 属性设置为新值时，将调用 `OnPropertyChanged` 方法，该方法会引发 `PropertyChanged` 事件。与此属性绑定的任何用户界面元素将会更新以反映新值。

## 使用 MVVM Toolkit 简化 INotifyPropertyChanged
尽管实现 `INotifyPropertyChanged` 并不是特别复杂，但如果视图模型中有许多属性，可能会变得乏味。幸运的是，.NET 社区工具包的 MVVM 库通过使用其 `ObservableObject` 类以及 Source Generators 功能结合 `[ObservableProperty]` Attribute，提供了更高效的实现 `INotifyPropertyChanged` 的方式。

以下是如何使用 `ObservableObject` 实现相同结果的示例：

```csharp
using Microsoft.Toolkit.Mvvm.ComponentModel;

public partial class MyViewModel : ObservableObject
{
    [ObservableProperty]
    private string _name;
}
```

在此代码中，`ObservableObject` 类实现了 `INotifyPropertyChanged`，`[ObservableProperty]` Attribute 用于指示 `_name` 是可观察的属性。Source Generator 将在幕后生成必要的样板代码，包括属性的 getter 和 setter，并在属性更改时自动调用 `OnPropertyChanged` 方法。这使得实现更加清晰且更不容易出错。

MVVM Toolkit 提供了一系列工具，可帮助简化 .NET 应用程序中 MVVM 模式的实现，包括简化使用 `INotifyPropertyChanged`。使用 Source Generators 可使您的代码更高效和可读，同时保持相同的功能。
