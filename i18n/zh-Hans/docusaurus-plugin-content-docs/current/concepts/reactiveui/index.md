---
description: CONCEPTS
---

import ReactiveUINuGetScreenshot from '/img/concepts/reactiveui/reactiveui-nuget.png';

# ReactiveUI

:::tip
ReactiveUI在我们的示例中使用，但不是必需的。Avalonia支持任何MVVM框架或您自己的自定义解决方案。
:::

这些页面解释了_Avalonia UI_如何使用开源的_ReactiveUI_框架的版本，以便更容易地在应用程序中实现MVVM模式。

_ReactiveUI_是一个高级的、可组合的、功能反应式的模型-视图-视图模型（MVVM）框架，适用于所有.NET平台。它受到了函数式反应式编程范式的启发。

:::info
有关函数式反应式编程的完整技术背景，请参阅维基百科文章[这里](https://en.wikipedia.org/wiki/Functional\\_reactive\\_programming)。
:::

_Avalonia UI_附带了自己的_ReactiveUI_分支，位于`Avalonia.ReactiveUI` _NuGet_包中。

<img src={ReactiveUINuGetScreenshot} alt=""/>

要在您的_Avalonia UI_应用程序中使用_ReactiveUI_和MVVM模式，请使用_NuGet_包管理器（如上所示）将包添加到您的项目中，或执行以下CLI命令：

```bash
dotnet add package Avalonia.ReactiveUI
```

:::info
有关_ReactiveUI_本身的详细信息，请参阅网站[https://reactiveui.net/](https://reactiveui.net/)
:::

:::info
有关MVVM模式的更多背景信息，请参阅_Microsoft_文章[这里](https://msdn.microsoft.com/en-us/library/hh848246.aspx)。
:::

该包包含了专门为_Avalonia UI_设计的帮助程序，用于处理_ReactiveUI_的视图模型导航、视图激活和调度任务（有关这些任务的完整详细信息，请参阅上述参考）。

:::info
如果您从Avalonia MVVM应用程序解决方案模板启动应用程序，则已经安装并配置了_ReactiveUI_包。
:::

## 配置使用ReactiveUI

安装了_NuGet_包后，您必须配置应用程序的`Program`类来使用它。请确保在`AppBuilder`代码中调用`UseReactiveUI()`方法。

例如，如果您使用Avalonia MVVM应用程序解决方案模板，它将自动添加_NuGet_包，然后添加以下代码：

```csharp
internal class Program
{
    // 初始化代码。在调用AppMain之前，不要使用任何Avalonia、第三方API或任何
    // 依赖于SynchronizationContext的代码：因为还没有初始化，可能会出现问题。
    [STAThread]
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);

    // Avalonia配置，请勿删除；也被可视化设计器使用。
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .LogToTrace()
            .UseReactiveUI();
}
```

在接下来的页面中，您将了解_ReactiveUI_如何与_Avalonia UI_配合工作，以实现以下应用程序场景：

* 数据绑定反应式视图模型
* 视图激活
* 路由
* 数据持久化
* 绑定到排序/过滤数据