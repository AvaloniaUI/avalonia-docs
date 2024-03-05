---
id: how-to-implement-dependency-injection
title: How To Implement Dependency Injection
---

# How To Implement Dependency Injection in Avalonia

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows developers to write cleaner, more modular, and testable code. It accomplishes this by creating discrete services that are passed around/created as needed.

This guide will show you step by step how to use Dependency Injection (DI) with _Avalonia UI_ and the MVVM pattern. 

## Step 0: Context and Initial Code

Let's assume that you have an app with a MainViewModel, a BusinessService and a Repository. MainViewModel has a dependency on IBusinessService and BusinessService on IRepository. A simple implementation would look like this:

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

```csharp
public class BusinessService : IBusinessService
{
    private readonly IRepository _repository;

    public MainViewModel(IRepository repository)
    {
        _repository = repository;
    }
}
```

```csharp
public class Repository : IRepository
{
}
```

Typically you would directly instantiate `Repository` and pass it into `BusinessService` then pass it into `MainViewModel`, like this:

```csharp
var window = new MainWindow
{
    DataContext = new MainViewModel(new BusinessService(new Repository()))
}
```

 This works great for simple constructors that are not used very often and don't change. But this technique does not scale very well because:
- The more dependencies your constructor has the more things you will need to instantiate and pass in. Instantiating the dependencies locally (such as by doing new MainViewModel(new MyService())) results in direct rigid coupling to a specific instance of the dependencies.
- Similarly if MainViewModel creates its dependencies itself, (such as in the constructor body) it also becomes directly coupled to the creation of the dependencies which can result in mostly the same problems. 
- Furthermore, if the object is instantiated in many places, every single reference to any of the dependencies would also need to be updated should the dependencies of `MainViewModel` ever change (such as by requiring additional dependencies or require a different implementation of a dependency). 

Dependency injection solves these problem by abstracting away the creation of objects and their dependencies. This allows for well encapsulated services to be used that will be automatically passed into any other service that is registered to use them. 

## Step 1: Install the NuGet package for DI
There are many dependency injection (DI) container providers available ([DryIoC](https://github.com/dadhi/DryIoc), [Autofac](https://github.com/autofac/Autofac), [Pure.DI](https://github.com/DevTeam/Pure.DI)) but this guide will only focus on `Microsoft.Extensions.DependencyInjection` which is a lightweight, extensible dependency injection container. It provides an easy-to-use and convention-based way to add DI to .NET applications, including Avalonia-based desktop applications.

Run the following command in a terminal inside your project directory to install the DI package:

```shell
dotnet add package Microsoft.Extensions.DependencyInjection
```

## Step 2: Add ServiceCollectionExtensions 
The following code is creating an extension method for `IServiceCollection` that will register services to our service collection and make them available for injection.  

```csharp
public static class ServiceCollectionExtensions {
    public static void AddCommonServices(this IServiceCollection collection) {
        collection.AddSingleton<IRepository, Repository>();
        collection.AddTransient<BusinessService>();
        collection.AddTransient<MainViewModel>();
    }
}
```

## Step 3: Modify App.axaml.cs
Next, the `App.xaml.cs` class should be modified to use the DI container. This will allow the previously registered view model to be resolved via the dependency injection container. The fully realised view model can then be set to the data context of the main view. 

```csharp
public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // If you use CommunityToolkit, line below is needed to remove Avalonia data validation.
        // Without this line you will get duplicate validations from both Avalonia and CT
        BindingPlugins.DataValidators.RemoveAt(0);

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