---
id: view-locator
title: View locator
description: Automatically resolve views for view models using a ViewLocator that implements IDataTemplate.
doc-type: explanation
---

In MVVM applications, view models contain application logic but have no knowledge of the UI. A *view locator* bridges this gap by automatically resolving the correct view for a given view model. When Avalonia encounters a view model object in a content area, the view locator determines which view to create and display.

:::info
ViewLocator is optional. You can achieve the same result using [DataTemplates](/docs/data-templates/data-template-collection) defined in XAML. ViewLocator is included in the default Avalonia project templates as a convenience for MVVM applications.
:::

## How it works

ViewLocator implements the [`IDataTemplate`](/api/avalonia/controls/templates/idatatemplate) interface, which means it participates in Avalonia's standard data template resolution. When a [`ContentControl`](/api/avalonia/controls/contentcontrol) or similar presenter needs to display an object that is not a control, it searches for a matching `IDataTemplate`. A registered ViewLocator matches view model objects and builds the corresponding view.

The `IDataTemplate` interface has two members:

- `Match(object data)` returns `true` if this template can handle the given object.
- `Build(object data)` creates and returns the control to display.

## Default implementation

The default ViewLocator included in Avalonia project templates uses a naming convention: it replaces `"ViewModel"` with `"View"` in the fully qualified type name and resolves the view type via reflection.

For example, `MyApp.ViewModels.MainViewModel` resolves to `MyApp.Views.MainView`.

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        var name = data.GetType().FullName!.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type)!;
        }

        return new TextBlock { Text = "Not Found: " + name };
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

`Match` returns `true` for any object that inherits from `ViewModelBase`. `Build` constructs the view using `Activator.CreateInstance`, or returns an error `TextBlock` if the view type cannot be found.

:::tip
The reflection-based approach is convenient for getting started, but it is not compatible with Native AOT and provides no compile-time safety. For production applications, consider one of the alternatives described below.
:::

## Registering the view locator

Register your ViewLocator in `App.axaml` so it is available throughout the application:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             xmlns:local="using:MyApp"
             RequestedThemeVariant="Default">
    <Application.DataTemplates>
        <local:ViewLocator />
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

Because `ViewLocator` implements `IDataTemplate`, it sits in the `DataTemplates` collection alongside any other data templates you define.

## Using the view locator

Once registered, the view locator resolves views automatically wherever a view model appears as content. The most common pattern uses a `ContentControl` bound to a view model property:

```xml
<ContentControl Content="{Binding CurrentPage}" />
```

When `CurrentPage` is set to an instance of `SettingsViewModel`, the view locator creates a `SettingsView` and displays it inside the `ContentControl`. Changing `CurrentPage` to a different view model automatically swaps the displayed view.

You can also set a view model directly as a window's `DataContext`:

```csharp
DataContext = new MainViewModel(); // ViewLocator resolves MainView
```

## Alternative approaches

The default reflection-based ViewLocator works for prototyping, but has limitations: no compile-time verification that views exist, no AOT support, and no way to inject dependencies into views. The following alternatives address these limitations.

### Pattern matching

Replace reflection with explicit type mapping using C# pattern matching. This approach is AOT-compatible and provides compile-time safety:

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        return data switch
        {
            MainViewModel => new MainView(),
            SettingsViewModel => new SettingsView(),
            ProfileViewModel => new ProfileView(),
            _ => new TextBlock { Text = $"No view for {data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

You must add a new line to the `switch` expression for each view model. This is a deliberate trade-off: a small amount of manual maintenance in exchange for compile-time checks and AOT compatibility.

### XAML data templates

You can skip ViewLocator entirely and define view-to-viewmodel mappings as standard data templates in XAML:

```xml
<Application.DataTemplates>
    <DataTemplate DataType="{x:Type vm:MainViewModel}">
        <views:MainView />
    </DataTemplate>
    <DataTemplate DataType="{x:Type vm:SettingsViewModel}">
        <views:SettingsView />
    </DataTemplate>
</Application.DataTemplates>
```

This approach uses Avalonia's built-in template resolution with no custom code. See [Data Template Collection](/docs/data-templates/data-template-collection) for details on how template matching and search order work.

### Dependency injection

When views require constructor-injected services, combine pattern matching with your DI container:

```csharp
public class ViewLocator : IDataTemplate
{
    private readonly IServiceProvider _services;

    public ViewLocator(IServiceProvider services)
    {
        _services = services;
    }

    public Control Build(object data)
    {
        return data switch
        {
            MainViewModel => _services.GetRequiredService<MainView>(),
            SettingsViewModel => _services.GetRequiredService<SettingsView>(),
            _ => new TextBlock { Text = $"No view for {data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

Because this ViewLocator requires a constructor parameter, register it in code rather than XAML:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    var services = BuildServiceProvider();
    DataTemplates.Add(new ViewLocator(services));

    base.OnFrameworkInitializationCompleted();
}
```

See [Dependency Injection](/docs/app-development/dependency-injection) for setting up your service provider.

### Source generators

For large applications where maintaining a manual mapping is impractical, source generators can produce ViewLocator code at compile time. This provides zero runtime overhead and full AOT compatibility.

Community packages that provide this:

- **[StaticViewLocator](https://github.com/wieslawsoltes/StaticViewLocator)**: A NuGet package that automatically discovers and registers view-viewmodel pairs.

For building your own source generator, see [Microsoft's Source Generators documentation](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview).

## Choosing an approach

| Approach | AOT compatible | Compile-time safe | Supports DI | Maintenance |
|---|---|---|---|---|
| Reflection (default) | No | No | No | None |
| Pattern matching | Yes | Yes | Optional | Add line per view model |
| XAML data templates | Yes | Yes | No | Add template per view model |
| DI + pattern matching | Yes | Yes | Yes | Add line per view model |
| Source generator | Yes | Yes | Varies | None (auto-generated) |

## See also

- [Introduction to Data Templates](/docs/data-templates/introduction-to-data-templates): How Avalonia selects and applies data templates.
- [Data Template Collection](/docs/data-templates/data-template-collection): Defining multiple templates by type.
- [Creating Data Templates in Code](/docs/data-templates/creating-data-templates-in-code): Implementing `IDataTemplate` and using `FuncDataTemplate<T>`.
- [Dependency Injection](/docs/app-development/dependency-injection): Setting up service registration for your application.
