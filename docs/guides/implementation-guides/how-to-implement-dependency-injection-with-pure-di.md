---
id: how-to-implement-dependency-injection-with-pure-di
title: How To Implement Dependency Injection with Pure.DI code generator
---

# How To Implement Dependency Injection in Avalonia with Pure.DI code generator

This example is based on [another example](how-to-implement-dependency-injection.md) on dependency injection showing the benefits of the pure Dependency Injection approach using the Pure.DI source code generator. 

## Step 0: Presentation model

Compared to [this example](how-to-implement-dependency-injection.md), only a few properties and methods have been added to demonstrate real-world usage scenarios:

```csharp
public interface IMainViewModel
{
    string Title { get; }
    
    string Greetings { get; }
}

public class MainViewModel(IBusinessService businessService)
    : IMainViewModel
{
    public string Title => "Avalonia application";

    public string Greetings => businessService.CreateGreetings();
}

public interface IBusinessService
{
    string CreateGreetings();
}

public class BusinessService(IRepository repository)
    : IBusinessService
{
    public string CreateGreetings()
    {
        repository.RegisterSomething();
        return "Example of Dependency Injection implementation using Pure.DI";
    }
}

public interface IRepository
{
    void RegisterSomething();
}

public class Repository: IRepository
{
    public void RegisterSomething()
    {
    }
}
```

## Step 1: Install the NuGet package for DI

Run the following command in a terminal inside your project directory to install the [Pure.DI](https://www.nuget.org/packages/Pure.DI) source generator package.

```shell
dotnet add package Pure.DI
```

## Step 2: Add a composition class

This class setups how the composition of objects will be created for the application.

```csharp
using Pure.DI;
using static Pure.DI.Lifetime;

public partial class Composition
{
    private static void Setup() => DI.Setup()
        .Root<MainWindow>(nameof(MainWindow))
        .Root<IMainViewModel>(nameof(MainViewModel))

        .Bind().As(Singleton).To<Repository>()
        .Bind().To<BusinessService>()
        .Bind().As(Singleton).To<MainViewModel>();
}
```

Advantages over classical DI container libraries:
- No performance impact or side effects when creating composition of objects.
- All logic for analyzing the graph of objects, constructors and methods takes place at compile time. Pure.DI notifies the developer at compile time of missing or cyclic dependencies, cases when some dependencies are not suitable for injection, etc.
- Does not add dependencies to any additional assembly.
- Since the generated code uses primitive language constructs to create object compositions and does not use any libraries, you can easily debug the object composition code as regular code in your application.

## Step 3: Modify App.axaml.cs

Next, the `App.xaml.cs` class should be modified to use the main window created in pure DI paradigm: 

```csharp
public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop
            && Resources[nameof(Composition)] is Composition composition)
        {
            desktop.MainWindow = composition.MainWindow;
        }
        
        base.OnFrameworkInitializationCompleted();
    }
}
```

This code is only needed to create a main window in a pure DI paradigm using a shared composition instance:

```csharp
if (Resources[nameof(Composition)] is Composition composition)
{
    desktop.MainWindow = composition.MainWindow;
}
```

This will be useful if the main window will require dependencies to be injected.

Advantages over classical DI container libraries:
- No explicit initialisation of data contexts is required. Data contexts are configured directly in `.axaml` files according to the MVVM approach.
- The code is simpler, more compact, and requires less maintenance effort.
- The main window is created in a pure DI paradigm, and it can be easily supplied with all necessary dependencies via DI as regular types.

## Step 4: Modify App.axaml

Next, modify the `App.axaml` file to use view models according to the MVVM approach via a shared resource:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:avaloniaSimpleApp="clr-namespace:AvaloniaSimpleApp"
             x:Class="AvaloniaSimpleApp.App"
             RequestedThemeVariant="Default">

  <!-- "Default" ThemeVariant follows system theme variant.
  "Dark" or "Light" are other available options. -->
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
  
  <Application.Resources>
    <avaloniaSimpleApp:Composition x:Key="Composition" />
  </Application.Resources>

</Application>
```

This markup fragment

```xml
<Application.Resources>
    <avaloniaSimpleApp:Composition x:Key="Composition" />
</Application.Resources>
```

creates a shared resource of type `Composition` and with key _‘Composition’_, which will be further used as a data context in the views.

## Step 5: Create your views according to MVVM approach

You can now use bindings to model views without even editing the views `.cs` code files, for example for the main window in the example this might look like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaSimpleApp.MainWindow"
        DataContext="{StaticResource Composition}"
        xmlns:app="clr-namespace:AvaloniaSimpleApp"
        x:DataType="app:Composition"
        Title="{Binding MainViewModel.Title}"
        Content="{Binding MainViewModel.Greetings}"/>
```

To use bindings in views:

- You can set a shared resource as a data context
  
  `DataContext="{StaticResource Composition}"`
  
  The resource with key _"Composition"_ was defined in [step 4](#step-4-modify-appaxaml).

- Specify the data type in the context:

  `xmlns:app="clr-namespace:AvaloniaSimpleApp"`

  `x:DataType="app:Composition"`

- Use the bindings as usual:

  `Title="{Binding MainViewModel.Title}"`

Advantages over classical DI container libraries:
- The code-behind `.cs` files for views are free of any logic.
- This approach works just as well during design time.
- You can easily use different view models in a single view.
- Bindings depend on properties through abstractions, which additionally ensures weak coupling of types in application. This is in line with the basic principles of DI.
