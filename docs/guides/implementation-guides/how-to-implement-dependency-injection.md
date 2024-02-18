---
id: how-to-implement-dependency-injection
title: How To Implement Dependency Injection
---

# How To Implement Dependency Injection in Avalonia

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows developers to write cleaner, more modular, and testable code. It is especially useful when you are developing multi-platform applications that need specific service implementations for each platform.

Microsoft.Extensions.DependencyInjection is a lightweight, extensible dependency injection (DI) container that is part of the .NET Framework. It provides an easy-to-use and convention-based way to add DI to .NET applications, including Avalonia-based desktop applications.

This guide will show you how to use Dependency Injection (DI) with _Avalonia UI_ and the MVVM pattern. 

Let's assume that your MainViewModel has a dependency on MyService. The constructor for ViewModel should looks like this:
```csharp
private readonly MyService _myService;

public MapsViewModel(MyService myService)
{
    _myService = myService;
}
```
These are the steps you need to do in order to resolve that dependencu using DI.

## Step 1: Install the NuGet package Microsoft.Extensions.DependencyInjection
```shell
dotnet add package Microsoft.Extensions.DependencyInjection
```

## Step 2: ServiceCollectionExtensions 
The following code is creating an extension for IServiceCollection. This is where you will register all your common dependencies. It's recomended to create that class in the shared project used by all avalonia target platform.

```csharp
public static class ServiceCollectionExtensions {
    public static void AddCommonServices(this IServiceCollection collection) {
        collection.AddTransient<MainViewModel>();
        collection.AddTransient<MyService>();
    }
}
```

## Step 3: ServiceManager
The following code create a ServiceManager class that is used to retrieve an instance of a given object.
```csharp
public static class ServiceManager {
    public static IServiceProvider Locator { get; private set; }

    public static void InitialiseLocatorFromCollection(IServiceCollection collection) {
        Locator = collection.BuildServiceProvider();
    }
}
``` 

## Step 4: Modify Program.cs
This should be modified for each target platform project. You can add specific platform dependency at this location too (see comment in code below)

```csharp
class Program
{
    // Initialization code. Don't use any Avalonia, third-party APIs or any
    // SynchronizationContext-reliant code before AppMain is called: things aren't initialized
    // yet and stuff might break.
    [STAThread]
    public static void Main(string[] args)
    {
        var collection = new ServiceCollection();
        collection.AddCommonServices();

        //Register platform specific services here with the collection

        ServiceManager.InitialiseLocatorFromCollection(collection);

        BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);
    }

    // Avalonia configuration, don't remove; also used by visual designer.
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .WithInterFont()
            .LogToTrace();

}
```

## Step 5: Modify App.axaml.cs
We are using the `ServiceManager` class to retrieve the right view model.
```csharp
public partial class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // Line below is needed to remove Avalonia data validation.
        // Without this line you will get duplicate validations from both Avalonia and CT
        BindingPlugins.DataValidators.RemoveAt(0);

        var vm = ServiceManager.Locator.GetRequiredService<MainViewModel>();
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            desktop.MainWindow = new MainWindow
            {
                DataContext = vm
            };
        }
        else if (ApplicationLifetime is ISingleViewApplicationLifetime singleViewPlatform)
        {
            singleViewPlatform.MainView = new MainView
            {
                DataContext = vm
            };
        }

        base.OnFrameworkInitializationCompleted();
    }
}
```