---
description: CONCEPTS
---

# 应用程序生命周期

并非所有平台都是相同的！例如，您可能习惯于在Windows Forms或WPF中开发的生命周期管理仅适用于桌面平台。_Avalonia UI_ 是一个跨平台框架；因此，为了使您的应用程序可移植，它提供了几种不同的应用程序生命周期模型，并且还允许您在目标平台允许的情况下手动控制一切。

## 生命周期如何工作？

对于桌面应用程序，您可以这样初始化：

```csharp
class Program
{
  // 这个方法是为了IDE预览器基础设施而需要的
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // 入口点。此时还没有准备好，所以在这个点上
  // 您不应该使用任何Avalonia类型或任何期望
  // 准备好SynchronizationContext的东西
  public static int Main(string[] args) 
    => BuildAvaloniaApp().StartWithClassicDesktopLifetime(args);
}
```

然后在`Application`类中创建主窗口：

```csharp
public override void OnFrameworkInitializationCompleted()
{
  if (ApplicationLifetime 
                  is IClassicDesktopStyleApplicationLifetime desktop)
    desktop.MainWindow = new MainWindow();
  else if (ApplicationLifetime 
                  is ISingleViewApplicationLifetime singleView)
    singleView.MainView = new MainView();
  base.OnFrameworkInitializationCompleted();
}
```

当框架初始化完成时，将调用此方法，`ApplicationLifetime`属性包含所选择的生命周期（如果有）。

:::info
如果在设计模式下运行应用程序（这使用IDE预览器进程），则`ApplicationLifetime`为null。
:::

## 生命周期接口

_Avalonia UI_提供了一系列接口，允许您选择适合您的应用程序的控制级别。这些接口由`BuildAvaloniaApp().Start[Something]`系列方法提供。

### IControlledApplicationLifetime

由以下方法提供：

* `StartWithClassicDesktopLifetime`
* `StartLinuxFramebuffer`

允许您订阅`Startup`和`Exit`事件，并通过调用`Shutdown`方法显式关闭应用程序。此接口使您可以控制应用程序的退出过程。

### IClassicDesktopStyleApplicationLifetime

继承自：`IControlledApplicationLifetime`

由以下方法提供：

* `StartWithClassicDesktopLifetime`

允许您以Windows Forms或WPF应用程序的方式控制应用程序的生命周期。此接口提供了一种访问当前打开窗口列表的方法，设置主窗口的方法，并具有三种关闭模式：

* `OnLastWindowClose` - 当最后一个窗口关闭时关闭应用程序
* `OnMainWindowClose` - 当主窗口关闭时关闭应用程序（如果已设置）。
* `OnExplicitShutdown` - 禁用应用程序的自动关闭，您需要在代码中调用`Shutdown`方法。

### ISingleViewApplicationLifetime

由以下方法提供：

* `StartLinuxFramebuffer`
* 移动平台

某些平台没有桌面主窗口的概念，只允许在设备屏幕上同时显示一个视图。对于这些平台，生命周期允许您设置和更改主视图类（`MainView`）。

:::info
要在这样的平台上实现导航堆栈（具有单个主视图），您可以使用[_ReactiveUI_ 路由](https://www.reactiveui.net/docs/handbook/routing/)或其他路由控件。
:::

## 手动管理生命周期

如果需要，您可以完全控制应用程序的生命周期管理。例如，在桌面平台上，您可以将委托传递给`BuildAvaloniaApp.Start`方法的`AppMain`，然后从那里手动管理事

```csharp
class Program
{
  // 这种方法是IDE预览器基础设施所必需的
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // 入口点。事情还没准备好，所以现在
  // 你不应该使用任何Avalonia类型或任何期望
  // 准备一个SynchronizationContext
  public static int Main(string[] args) 
    => BuildAvaloniaApp().Start(AppMain, args);

  // 应用程序入口点。Avalonia已完全初始化。
  static void AppMain(Application app, string[] args)
  {
     // 一个取消令牌源，它将
     // 用于停止主循环
     var cts = new CancellationTokenSource();
     
     // 在这里启动你的代码
     new Window().Show();

     // 启动主循环
     app.Run(cts.Token);
  }
}
```
