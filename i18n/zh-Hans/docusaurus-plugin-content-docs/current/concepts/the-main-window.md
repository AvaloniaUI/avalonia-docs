---
description: CONCEPTS
---

# 主窗口

主窗口是在`App.axaml.cs`文件的`OnFrameworkInitializationCompleted`方法中传递给`ApplicationLifetime.MainWindow`的窗口：

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktopLifetime)
    {
        desktopLifetime.MainWindow = new MainWindow();
    }
}
```

可以通过将`Application.Current.ApplicationLifetime`强制转换为`IClassicDesktopStyleApplicationLifetime`来随时检索它。

值得一提的是，开发人员应该记住，使用静态全局变量并从应用程序的任何位置访问MainWindow都可能是危险的，有时还会导致糟糕的用户体验。例如，所有与顶级窗口相关的 API 都应该从最具体的顶级窗口使用，通常是最新的活动窗口。通过这种方式，用户对话框就不会从错误的窗口打开。

:::warning
Avalonia中的移动和浏览器平台没有窗口的概念。相反，当实现`ISingleViewApplicationLifetime`接口时，需要在`Application.ApplicationLifetime`中设置`MainView`控件。
:::

### <a href="#show-hide-and-close-a-window" id="show-hide-and-close-a-window"></a>
