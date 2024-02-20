---
id: how-to-implement-dependency-injection
title: How To Implement Dependency Injection
---

# How To Implement Dependency Injection in Avalonia

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows developers to write cleaner, more modular, and testable code. It accomplishes this by creating discrete services that are passed around/created as needed. It is especially useful when you are developing multi-platform applications that need specific service implementations for each platform.

This guide will show you how to use Dependency Injection (DI) with _Avalonia UI_ and the MVVM pattern. 

Let's assume that your MainViewModel has a dependency on IMyService. The constructor for ViewModel should looks like this:

```csharp
private readonly IMyService _myService;

public MainViewModel(IMyService myService)
{
    _myService = myService;
}
```

You could solve that by instantiating `MyService` and passing as a parameter everytime you need a `MainViewModel` instance, like this:

```csharp
var window = new MainWindow
{
    // Note: we assume that MyService implements IMyService
    DataContext = new MainViewModel(new MyService())
}
```

But this will get quickly difficult as when your application scale and your classes have more dependencies, hence the need of DI.

These are the steps you need to do in order to resolve that dependencu using DI.

## Step 1: Install the NuGet package for DI
There are many dependency injection (DI) container providers available ([DryIoC](https://github.com/dadhi/DryIoc), [Autofac](https://github.com/autofac/Autofac), [Pure.DI](https://github.com/DevTeam/Pure.DI)) but this guide will only focus on `Microsoft.Extensions.DependencyInjection`. This is a lightweight, extensible dependency injection container that is part of the .NET Framework. It provides an easy-to-use and convention-based way to add DI to .NET applications, including Avalonia-based desktop applications.

```shell
dotnet add package Microsoft.Extensions.DependencyInjection
```

## Step 2: Add ServiceCollectionExtensions 
The following code is creating an extension for IServiceCollection. This is where you will register all your platform independent shared dependencies. It's recomended to create that class in the shared project used by all avalonia target platform.

```csharp
public static class ServiceCollectionExtensions {
    public static void AddCommonServices(this IServiceCollection collection) {
        collection.AddTransient<MainViewModel>();
        collection.AddTransient<MyService>();
    }
}
```

## Step 3: Add ServiceManager
The following code creates a ServiceManager class that is used to retrieve an instance of a given object. It's recomended to create that class in the shared project used by all avalonia target platform.

```csharp
public static class ServiceManager {
    public static IServiceProvider Locator { get; private set; }

    public static void InitialiseLocatorFromCollection(IServiceCollection collection) {
        if (Locator == null)
        {
            Locator = collection.BuildServiceProvider();
        }
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
        => BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);

    // Avalonia configuration, don't remove; also used by visual designer.
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .WithInterFont()
            .LogToTrace()
            .AfterSetup(SetupDependencyInjection);

    private static void SetupDependencyInjection(AppBuilder builder)
    {
        var collection = new ServiceCollection();
        collection.AddCommonServices();

        //Register platform specific services here with the collection

        ServiceManager.InitialiseLocatorFromCollection(collection);
    }
}
```

## Step 5: Modify App.axaml.cs
Next, the App.xaml.cs class should be modified to use the DI container. This will allow the previously registered view model to be resolved via the dependency injection container. The fully realised view model can then be set to the data context of the main view. 

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

        // ServiceManager retrieve an instance of MainViewModel
        // The service manager's locator instance is used to resolve an instance of MainViewModel, 
        // with all the constructor dependencies of MainViewModel such as MyService that 
        // was configured during the container creation.
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