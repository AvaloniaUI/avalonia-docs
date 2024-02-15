---
description: CONCEPTS
---

import ReactiveUINuGetScreenshot from '/img/concepts/reactiveui/reactiveui-nuget.png';

# ReactiveUI

:::tip
ReactiveUI is used in our examples, but it's not required. Avalonia supports any MVVM framework or your own custom solutions.
:::

These pages explain how _Avalonia UI_ uses a version of the open-source _ReactiveUI_ framework to make it easier to implement the MVVM pattern in your application.

_ReactiveUI_ is an advanced, composable, functional reactive model-view-viewmodel (MVVM) framework for all .NET platforms. It was inspired by the functional reactive programming paradigm.

:::info
For a full technical background on functional reactive programming, see the Wikipedia article [here](https://en.wikipedia.org/wiki/Functional\_reactive\_programming).
:::

_Avalonia UI_ ships with its own fork of _ReactiveUI_ in the `Avalonia.ReactiveUI` _NuGet_ package.

<img src={ReactiveUINuGetScreenshot} alt=""/>

To use _ReactiveUI_ and the MVVM pattern in your _Avalonia UI_ application, add the package to your project using the _NuGet_ package manager (as above), or execute the following CLI command:

```bash
dotnet add package Avalonia.ReactiveUI
```

:::info
For detailed information about _ReactiveUI_ itself, see the website [https://reactiveui.net/](https://reactiveui.net/)
:::

:::info
For more background about the MVVM pattern, see the _Microsoft_ article [here](https://msdn.microsoft.com/en-us/library/hh848246.aspx).
:::

The package includes helpers specifically for _Avalonia UI_ to handle the _ReactiveUI_ tasks of view model-based routing, view activation and scheduling. (see the above reference for full details of these tasks).

:::info
If you start your application from the Avalonia MVVM Application solution template; then you will already have the _ReactiveUI_ package installed and configured.
:::

## Configure to Use ReactiveUI

Having installed the _NuGet_ package, you must configure the application `Program` class to use it.  Check that you call the `UseReactiveUI()`method  in the `AppBuilder` code.

For example, if you use the Avalonia MVVM Application solution template, it will automatically add the _NuGet_ package, and then add the code:

```csharp
internal class Program
{
    // Initialization code. Don't use any Avalonia, third-party APIs or any
    // SynchronizationContext-reliant code before AppMain is called: things aren't initialized
    // yet and stuff might break.
    [STAThread]
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);

    // Avalonia configuration, don't remove; also used by visual designer.
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .LogToTrace()
            .UseReactiveUI();
}
```

In the following pages, you will learn how _ReactiveUI_ works with _Avalonia UI_ to allow you to implement the following application scenarios:

* Data Binding a Reactive View Model
* View Activation
* Routing
* Data Persistence
* Binding to Sorted/Filtered Data
