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

可以通过将`Application.ApplicationLifetime`强制转换为`IClassicDesktopStyleApplicationLifetime`来随时检索它。

:::warning
Avalonia中的移动和浏览器平台没有窗口的概念。相反，当实现`ISingleViewApplicationLifetime`接口时，需要在`Application.ApplicationLifetime`中设置`MainView`控件。
:::

### <a href="#show-hide-and-close-a-window" id="show-hide-and-close-a-window"></a>
