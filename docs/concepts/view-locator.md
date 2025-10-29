---
description: CONCEPTS
---

# View Locator

:::info
ViewLocator is optional and included in default Avalonia templates. You can use explicit [DataTemplates](templates/data-templates-collection.md) instead.
:::

ViewLocator resolves views for view models in MVVM applications. It implements `IDataTemplate` to map view model types to view types.

## Default Implementation

The default implementation uses reflection. It replaces "ViewModel" with "View" in the fully-qualified type name and searches for the expected view type.

**Example:** `MyApp.ViewModels.MainViewModel` → `MyApp.Views.MainView`

:::tip
While the reflection-based approach is the simplest to get started with, consider implementing a custom ViewLocator tailored to your application using one of the alternatives below for better performance, type safety, and AOT compatibility.
:::

```cs
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
        else
        {
            return new TextBlock { Text = "Not Found: " + name };
        }
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

- The `Match` method checks if the data is a `ViewModelBase`
- The `Build` method creates the view instance using reflection, or returns an error TextBlock if the view isn't found

## Registration

Register the ViewLocator in `App.axaml`:

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

Once registered, ViewLocator works automatically:

```csharp
DataContext = new MainViewModel(); // ViewLocator resolves to MainView
```

Or with data binding:

```xml
<ContentControl Content="{Binding CurrentViewModel}" />
```

## Alternative Implementations

### Pattern Matching

Type-safe approach without reflection:

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        return data switch
        {
            MainViewModel vm => new MainView { DataContext = vm },
            SettingsViewModel vm => new SettingsView { DataContext = vm },
            _ => new TextBlock { Text = $"View not found for {data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

- Compile-time safety and better performance
- AOT-compatible
- IDE refactoring support

### DataTemplates in XAML

Define view-viewmodel mappings declaratively:

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

See [DataTemplates Collection](templates/data-templates-collection.md).

### Dependency Injection / IoC

When using DI, you can integrate ViewLocator with your container to resolve views with their dependencies:

- **Pattern Matching + DI**: Combine pattern matching with `IServiceProvider.GetRequiredService()` for type-safe resolution
- **Factory Registration**: Register view factories in your DI container that ViewLocator calls
- **Direct Resolution**: Pass service provider to ViewLocator (may still need reflection unless combined with pattern matching or source generators)

Choose based on whether you need to avoid reflection or prefer simpler configuration.

### Source Generators

You can create a custom source generator to generate ViewLocator code at compile time. This provides zero runtime overhead and full AOT compatibility.

For details on creating source generators, see [Microsoft's Source Generators documentation](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview).

#### Third-Party Options

**[StaticViewLocator](https://github.com/wieslawsoltes/StaticViewLocator)** - A NuGet package that automatically discovers and registers views.

**[ViewLocatorGenerator](https://github.com/peaceshi/Avalonia-NativeAOT-SingleFile)** - An example implementation of a source generator for ViewLocator (not a package, reference implementation).

## See Also

- [DataTemplates](templates/data-templates.md)
- [DataTemplates Collection](templates/data-templates-collection.md)
- [Implementing IDataTemplate](templates/implement-idatatemplate.md)
