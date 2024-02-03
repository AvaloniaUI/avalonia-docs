---
id: how-to-implement-dependency-injection
title: How To Implement Dependency Injection
---

import MvvmArchitectureDiagram from '/img/gitbook-import/assets/image (3) (1) (2).png';

# How To Implement Dependency Injection

This guide will show you how to use Dependency Injection (DI) with _Avalonia UI_ and the MVVM pattern. 

<img src={MvvmArchitectureDiagram} alt=""/>

[Dependency injection (DI)](https://en.wikipedia.org/wiki/Dependency_injection) allows developers to write cleaner, more modular, and testable code. It is especially useful when you are developing multi-platform applications that need specific service implementations for each platform.

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
public static class ServiceRegistry
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
        ServiceProvider = ServiceRegistry.ConfigureServices();
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
To improve the testability of your ViewModel code even more, you can choose to register your Views and ViewModels as services also and use the [View Locator](../../concepts/view-locator.md) pattern to resolve the views. The dependency injection service provider will take care of injecting your services into your view model for you, keeping the view model clean.

## Step 1: Register your View and View Model in ConfigureServices

```csharp
public static IServiceProvider ConfigureServices()
{
    var serviceCollection = new ServiceCollection();

    // Register your application services with the container
    serviceCollection.AddSingleton<GuitarTabsService>();

    // Add view models and views as necessary.
    serviceCollection.AddTransient<MainViewModel>();

    // Register the template for MainViewModel which will be resolved by the ViewLocator via a naming convention replacing "ViewModel" with "View".
    serviceCollection.AddKeyedTransient<Control, MainView>("MainView");

    // Here we can register the MainWindow resolved by the app, this allows your MainWindow have services injected too.
    serviceCollection.AddKeyedTransient<Window, MainWindow>("MainWindow");

    return serviceCollection.BuildServiceProvider();
}
```

## Step 2: Remove the reference to the ServiceProvider from your View Model.
```csharp
public class MyViewModel
{
    private readonly IMyService _myService;

    public MyViewModel()
    {
        // This constructor will be called at design time by the Designer, this is where you can initialize any sample data to aid in design of your UI.
    }

    public MyViewModel(IMyService myService)
    {
        // This constructor will be called at runtime by the DI ServiceProvider.
        _myService = myService;
    }
}
```

## Step 3: Create a View Locator class
The View Locator will attempt to provide a user interface for any view model via a naming convention (see [View Locator](../../concepts/view-locator.md) pattern for more information).
```csharp
public class ViewLocator : IDataTemplate
{
    public bool SupportsRecycling => false;

    public Control Build(object? param)
    {
        var name = param?.GetType().FullName?.Replace("ViewModel", "View");
        if (name != null)
        {
            if (App.ServiceProvider.GetKeyedService<Control>(name) is Control registeredControl)
            {
                return registeredControl;
            }
            else
            {
                // This code is called at Design time or when a service isn't registered.
                var type = Type.GetType(name);
                if (type != null && Activator.CreateInstance(type) is Control unregisteredControl)
                {
                    return unregisteredControl;
                }
            }
        }

        return new TextBlock { Text = $"{name} not found or is not a Control." };
    }

    public bool Match(object? data) => data is ViewModelBase;
}
```

## Step 4: Add the View Locator to the Application's DataTemplates
Add the ViewLocator to DataTempaltes so that it is available to your entire application's views.
Ensure that its appropriate 'using' statement is in the xmlns:local property of the Application root tag.
```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="LearningAvalonia.App"
             xmlns:local="using:LearningAvalonia"
             RequestedThemeVariant="Default">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->
    <Application.DataTemplates>
        <local:ViewLocator />
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

## Step 5: Update the application to resolve the Window or View

This allows you main window or view to take view models as dependencies, this also could be used to support different views on different platforms.
```csharp
public override void OnFrameworkInitializationCompleted()
{
    ServiceProvider = ServiceRegistry.ConfigureServices();

    // Line below is needed to remove Avalonia data validation.
    // Without this line you will get duplicate validations from both Avalonia and CT
    BindingPlugins.DataValidators.RemoveAt(0);

    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = ServiceProvider.GetKeyedService<Window>("MainWindow");
    }
    else if (ApplicationLifetime is ISingleViewApplicationLifetime singleViewPlatform)
    {
        singleViewPlatform.MainView = ServiceProvider.GetKeyedService<Window>("MainView"); ;
    }

    base.OnFrameworkInitializationCompleted();
}
```

## Step 6: Update MainWindow to resolve the MainViewModel as it's DataContext
Replace the direct reference to <MainView> with just a content control.
```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:LearningAvalonia.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:views="clr-namespace:LearningAvalonia.Views"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="LearningAvalonia.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="Welcome">

        <!-- No need for direct references to your views they are all dynamically data driven now -->
        <!--<views:MainView />-->

        <!-- Placeholder for the data template registered in your ServicesRegistry -->
        <ContentControl Content="{Binding}"/>
</Window>
```

Make the main window take the ViewModel as a dependency and set it as the Window's binding data context.
```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        // Design time
        InitializeComponent();
    }

    public MainWindow(MainViewModel context)
    {
        // Run time
        InitializeComponent();
        this.DataContext = context;
    }
}
```

## Conclusion
You now have an application framework that:
1. Is completely flexible in how your views are tied to your view models.
2. Allows for additional services to be resolved anywhere in your code (Views, View Models etc.)
3. Still supports designer previews of what your user interface looks like.
4. Avoids any references to App.ServiceProvider in almost all of your application code.
