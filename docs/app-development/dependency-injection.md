---
id: dependency-injection
title: Implementing dependency injection
description: Set up dependency injection in an Avalonia app using Microsoft.Extensions.DependencyInjection.
doc-type: how-to
---

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows you to write cleaner, more modular, more testable code. This is done by creating discrete services that are passed around or created as needed.

This guide shows you how to use DI with Avalonia and the [Model-View-ViewModel (MVVM) pattern](/docs/fundamentals/the-mvvm-pattern).

## Prerequisites

- An Avalonia project
- .NET 8.0 SDK or later (.NET 10 is recommended)

## Step 0: Context and initial code

Assume that you have an app with a `MainViewModel`, a `BusinessService` and a `Repository`. `MainViewModel` has a dependency on `IBusinessService`, and `BusinessService` has one on `IRepository`.

<Tabs>

<TabItem value="mainviewmodel" label="MainViewModel">

```csharp
public partial class MainViewModel
{
    private readonly IBusinessService _businessService;

    public MainViewModel(IBusinessService businessService)
    {
        _businessService = businessService;
    }
}
```

</TabItem>

<TabItem value="businessservice" label="BusinessService">

```csharp
public class BusinessService : IBusinessService
{
    private readonly IRepository _repository;

    public BusinessService(IRepository repository)
    {
        _repository = repository;
    }
}
```

</TabItem>

<TabItem value="repository" label="Repository">

```csharp
public class Repository : IRepository
{
}
```

</TabItem>

</Tabs>

Traditionally, you would directly instantiate `Repository`, pass it into `BusinessService`, then pass it into `MainViewModel`, like this:

```csharp
var window = new MainWindow
{
    DataContext = new MainViewModel(new BusinessService(new Repository()))
}
```

This approach is frequently used for simple constructors that are not used often and do not change. However, it does not scale well with increasing complexity, because:

- The more dependencies your constructor has, the more things you will need to instantiate and pass in. Instantiating the dependencies locally in the constructor (such as `new MainViewModel(new MyService())`) results in rigid coupling to a specific instance of a dependency.
- If the `MainViewModel` constructor creates its own dependencies, it also becomes directly coupled to the creation of dependencies.
- If `MainViewModel` is instantiated in many places, _every_ instantiation of `MainViewModel` would need to be updated should the dependencies ever change.

Dependency injection solves this problem by abstracting away the creation of objects and their dependencies. This allows for well-encapsulated services that are automatically passed into any service registered to use them.

## Step 1: Install the NuGet package for DI

Many DI container providers are available (e.g., [DryIoC](https://github.com/dadhi/DryIoc), [Autofac](https://github.com/autofac/Autofac), [Pure.DI](https://github.com/DevTeam/Pure.DI)), but this guide focuses on `Microsoft.Extensions.DependencyInjection`, a lightweight, extensible DI container. It provides a convention-based approach to add DI to .NET applications, including Avalonia applications.

To install the DI package, run the following command inside your project directory.

```shell
dotnet add package Microsoft.Extensions.DependencyInjection
```

## Step 2: Add `ServiceCollectionExtensions`

The following code creates an extension method for `IServiceCollection`. The method registers services to the service collection and makes them available for injection.

```csharp
public static class ServiceCollectionExtensions
{
    public static void AddCommonServices(this IServiceCollection collection)
    {
        collection.AddSingleton<IRepository, Repository>();
        collection.AddTransient<BusinessService>();
        collection.AddTransient<MainViewModel>();
    }
}
```

## Step 3: Modify `App.axaml.cs`

Modify `App.axaml.cs` to use the DI container. This allows the view model registered in the previous step to be resolved via the DI container. The fully realized view model can then be set to the data context of the `MainWindow`/`MainView`.

```csharp
public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // Register all the services needed for the application to run
        var collection = new ServiceCollection();
        collection.AddCommonServices();

        // Creates a ServiceProvider containing services from the provided IServiceCollection
        var services = collection.BuildServiceProvider();

        var vm = services.GetRequiredService<MainViewModel>();
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

## Step 4: Verify the result

Run your application. If the DI container is configured correctly, the `MainWindow` (or `MainView`) appears with its `DataContext` set to a fully resolved `MainViewModel` instance, including all injected dependencies.

## See also

- [Data Binding](/docs/data-binding/introduction-to-data-binding): Binding view models to views.
- [MVVM Architecture](/docs/fundamentals/the-mvvm-pattern): Using the MVVM pattern with Avalonia.
