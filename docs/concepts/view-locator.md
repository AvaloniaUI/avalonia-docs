---
description: CONCEPTS
---

# View Locator

:::info
ViewLocator is optional and included in default Avalonia templates. You can use explicit [DataTemplates](templates/data-templates-collection.md) instead.
:::

ViewLocator resolves views for view models in MVVM applications. It implements `IDataTemplate` and maps view model types to view types using naming conventions.

## Default Implementation

The default implementation uses reflection. It replaces "ViewModel" with "View" in the fully-qualified type name and searches for the expected view type.

**Example:** `MyApp.ViewModels.MainWindowViewModel` → `MyApp.Views.MainWindowView`

```cs
public class ViewLocator : IDataTemplate
{
    public bool SupportsRecycling => false;

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

- `Match` method checks if the data is a `ViewModelBase`.
- `Build` method creates the view instance using reflection, or returns an error TextBlock if the view isn't found.

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
DataContext = new MainWindowViewModel(); // ViewLocator resolves to MainWindowView
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
            MainWindowViewModel vm => new MainWindowView { DataContext = vm },
            SettingsViewModel vm => new SettingsView { DataContext = vm },
            _ => new TextBlock { Text = $"View not found for {data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

Provides compile-time safety, better performance, and is AOT-compatible. Supports IDE refactoring.

### DataTemplates in XAML

Define view-viewmodel mappings declaratively:

```xml
<Application.DataTemplates>
    <DataTemplate DataType="{x:Type vm:MainWindowViewModel}">
        <views:MainWindowView />
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

Use source generators like [StaticViewLocator](https://github.com/wieslawsoltes/StaticViewLocator) for compile-time view resolution:

```csharp
public class ViewLocator : ViewLocatorBase
{
    // Code is generated at compile time
}
```

No reflection, AOT-compatible, and provides compile-time errors for missing views.

## See Also

- [DataTemplates](templates/data-templates.md)
- [DataTemplates Collection](templates/data-templates-collection.md)
- [Implementing IDataTemplate](templates/implement-idatatemplate.md)
