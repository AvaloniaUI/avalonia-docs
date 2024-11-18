---
description: CONCEPTS - ReactiveUI
---

# 命令更新

本页面介绍了如何使用Avalonia UI绑定来从具有`Command`属性的按钮等控件上启动对视图模型的更改。

例如，您可以使用以下视图模型和在`ButtonAction`方法中定义的操作：

```csharp
public class MainWindowViewModel : ViewModelBase
{
    private string _greeting = "欢迎使用Avalonia！";

    public string Greeting
    {
        get => _greeting;
        set => this.RaiseAndSetIfChanged(ref _greeting, value);
    }

    public void ButtonAction()
    {
        Greeting = "来自Avalonia的另一个问候";
    }
}
```

然后，在相应的XAML中定义两个控件：

```xml
<TextBlock Text="{Binding Greeting}" />
<Button Command="{Binding ButtonAction}">更改</Button>
```

这意味着当用户点击按钮时，_Avalonia UI_通过调用`ButtonAction`方法来更新视图模型。这将使用setter更改`Greeting`属性，因此新的问候文本将通知回UI上的文本控件。