---
id: how-to-implement-dependency-injection
title: How To Implement Dependency Injection
---

import MvvmArchitectureDiagram from '/img/gitbook-import/assets/image (3) (1) (2).png';

# How To Implement Dependency Injection

Content in preparation.

This guide will show you how to use Dependency Injection (DI) with _Avalonia UI_ and the MVVM pattern. 

<img src={MvvmArchitectureDiagram} alt=""/>

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows developers to write cleaner, more modular, and testable code. It is especially useful when you are developing multi-platform applications that need specific service implementations for each platform. First let's explore how to register your own services in Avalonia using the Avalonia's built in dependency injection support via `AvaloniaLocator`.

## Understanding AvaloniaLocator
The AvaloniaLocator is Avalonia's built-in service locator, which acts as a central place where services and their instances can be registered and retrieved. Although it's recommended to use a more robust DI container for complex applications, the AvaloniaLocator provides a simple and effective way to achieve dependency injection without external dependencies.

### Step 1: Define Your Service
First, define the interface and one implementation for your service. 

```csharp
public interface IMyService
{
    void DoSomething();
}

public class MyService : IMyService
{
    public void DoSomething()
    {
        // Implementation here
    }
}
```

### Step 2: Register Your Service with AvaloniaLocator
You can register your service with the AvaloniaLocator in the App.xaml.cs file or wherever your application initialization code resides. It's typically done in the App.OnFrameworkInitializationCompleted method.

```csharp
public override void OnFrameworkInitializationCompleted()
{
    AvaloniaLocator.CurrentMutable.Bind<IMyService>().ToSingleton<MyService>();
    
    base.OnFrameworkInitializationCompleted();
}
```

In this example, `Bind<IMyService>().ToSingleton<MyService>()` registers `MyService` as a singleton instance to be associated with the `IMyService` interface. This means that every time you request `IMyService`, the same instance of `MyService` will be returned.

### Step 3: Retrieve Your Service
To retrieve your service from anywhere in your application, use the `AvaloniaLocator` directly:

```csharp
var myService = AvaloniaLocator.Current.GetService<IMyService>();
myService.DoSomething();
```

This line fetches the instance of `MyService` that was registered with the interface `IMyService` and calls the `DoSomething` method on it.

# Integrating Microsoft.Extensions.DependencyInjection with Avalonia
Microsoft.Extensions.DependencyInjection is a lightweight, extensible dependency injection (DI) container that is part of the .NET Framework. It provides an easy-to-use and convention-based way to add DI to .NET applications, including Avalonia-based desktop applications.

## Step 1: Add the Necessary NuGet Packages
First, ensure that your Avalonia project has the necessary NuGet packages. You'll need both Avalonia and Microsoft.Extensions.DependencyInjection packages. If you haven't already, add the Microsoft.Extensions.DependencyInjection package to your project:

```shell
dotnet add package Microsoft.Extensions.DependencyInjection
```

## Step 2: Setting Up the Service Collection
Create a method or a class dedicated to configuring your services. Here, you'll set up a ServiceCollection instance where you'll register all your application's services and their dependencies.

```csharp
public static class Services
{
    public static IServiceProvider ConfigureServices()
    {
        var serviceCollection = new ServiceCollection();
    
        // Register your application services with the container
        serviceCollection.AddTransient<IMyService, MyService>();
        // Add more services as needed
    
        return serviceCollection.BuildServiceProvider();
    }
}
```

In this example, `IMyService` is an interface, and `MyService` is its implementation. The `AddTransient` method indicates that a new instance of `MyService` will be created each time the `IMyService` is requested.

## Step 3: Integrating with Avalonia
To make use of the configured services within your Avalonia application, modify the App class to hold a reference to the IServiceProvider and override the OnFrameworkInitializationCompleted method to set it up:

```csharp
public class App : Application
{
    public static IServiceProvider ServiceProvider { get; private set; }

    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        ServiceProvider = Services.ConfigureServices();
        base.OnFrameworkInitializationCompleted();
    }
}
```

## Step 4: Resolving Services
With the DI container set up, you can now resolve services wherever they're needed. For instance, in a ViewModel, you might resolve services like so:

```csharp
public class MyViewModel
{
    private readonly IMyService _myService;

    public MyViewModel()
    {
        _myService = App.ServiceProvider.GetService<IMyService>();
    }
}
```

# Combining with View Locator pattern
To improve the testability of your ViewModel code even more, you can choose to register your ViewModels as services also and use the [View Locator](../../concepts/view-locator.md) pattern to resolve the view models. The dependency injection service provider will take care of injecting your services into your view model for you, keeping the view model clean.

## Step 1: Register your view model in ConfigureServices

```csharp
public static IServiceProvider ConfigureServices()
{
    var serviceCollection = new ServiceCollection();
    serviceCollection.AddTransient<IMyService, MyService>();

    // Register the view model to be resolved by the ViewLocator
    serviceCollection.AddTransient<MyViewModel>();

    return serviceCollection.BuildServiceProvider();
}
```

## Step 2: Remove the reference the ServiceProvider from your view model.
```csharp
public class MyViewModel
{
    private readonly IMyService _myService;

    public MyViewModel(IMyService myService)
    {
        _myService = myService;
    }
}
```

See [View Locator](../../concepts/view-locator.md) pattern for how to resolve the View Model.
