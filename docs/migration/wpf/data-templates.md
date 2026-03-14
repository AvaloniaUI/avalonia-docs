---
id: data-templates
title: Data templates
description: Differences between WPF and Avalonia data templates, type matching, and template storage.
doc-type: migration
---

Data templates in Avalonia work similarly to WPF, allowing you to define the visual representation of data objects. The core concepts are the same, but there are key differences in where templates are stored, how type matching works, and what additional features are available.

## Template storage

In WPF, data templates are typically stored in a `ResourceDictionary`, either on a control, a window, or in `App.xaml`:

```xml
<!-- WPF -->
<Window.Resources>
    <DataTemplate DataType="{x:Type viewmodels:FooViewModel}">
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</Window.Resources>
```

In Avalonia, data templates are not stored in resources. Instead, they are placed in a [`DataTemplates`](/api/avalonia/controls/templates/datatemplates) collection that exists on every `Control` and on `Application`:

```xml
<!-- Avalonia -->
<Window xmlns:viewmodels="using:MyApp.ViewModels">
    <Window.DataTemplates>
        <DataTemplate DataType="viewmodels:FooViewModel">
            <TextBlock Text="{Binding Name}" />
        </DataTemplate>
    </Window.DataTemplates>
</Window>
```

The template resolution walks up the visual tree, checking each control's `DataTemplates` collection, then falls back to `Application.DataTemplates`. This is analogous to WPF's resource lookup, but uses a dedicated collection rather than the general-purpose resource dictionary.

## DataType matching

Both frameworks support matching templates by `DataType`. However, Avalonia offers additional capabilities that WPF does not:

- **Interface matching:** Avalonia can match a `DataType` against an interface. WPF only supports concrete types.
- **Derived class matching:** Avalonia will match a template to derived classes of the specified `DataType`. WPF requires an exact type match.

Because of these broader matching rules, the order of templates in a collection matters. Templates are evaluated in declaration order, so you should place more-specific templates before less-specific ones:

```xml
<Window.DataTemplates>
    <!-- Most specific first -->
    <DataTemplate DataType="viewmodels:SpecialItemViewModel">
        <Border Background="Gold">
            <TextBlock Text="{Binding Name}" />
        </Border>
    </DataTemplate>
    <!-- Base type or interface last -->
    <DataTemplate DataType="viewmodels:ItemViewModel">
        <TextBlock Text="{Binding Name}" />
    </DataTemplate>
</Window.DataTemplates>
```

Note that in WPF the `DataType` uses the `{x:Type}` markup extension, while in Avalonia you specify the type directly as a string.

## DataTemplateSelector replacement

In WPF, you can create a `DataTemplateSelector` subclass to choose a template based on custom logic:

```csharp
// WPF
public class MyTemplateSelector : DataTemplateSelector
{
    public DataTemplate TemplateA { get; set; }
    public DataTemplate TemplateB { get; set; }

    public override DataTemplate SelectTemplate(object item, DependencyObject container)
    {
        return item is SpecialItem ? TemplateA : TemplateB;
    }
}
```

Avalonia does not have `DataTemplateSelector`. Instead, you implement the `IDataTemplate` interface, which serves the same purpose:

```csharp
// Avalonia
public class MyDataTemplate : IDataTemplate
{
    public IControl Build(object? data)
    {
        if (data is SpecialItem)
            return new Border { Background = Brushes.Gold, Child = new TextBlock { Text = "Special" } };

        return new TextBlock { [!TextBlock.TextProperty] = new ReflectionBinding("Name") };
    }

    public bool Match(object? data)
    {
        return data is ItemViewModel;
    }
}
```

You can then use your custom template directly in XAML:

```xml
<Window.DataTemplates>
    <local:MyDataTemplate />
</Window.DataTemplates>
```

For a full working example, see the [IDataTemplate sample](https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample).

## TreeDataTemplate

WPF's `HierarchicalDataTemplate` is called `TreeDataTemplate` in Avalonia. The two are functionally equivalent, differing only in name.

**WPF:**

```xml
<!-- WPF -->
<TreeView ItemsSource="{Binding RootNodes}">
    <TreeView.Resources>
        <HierarchicalDataTemplate DataType="{x:Type viewmodels:NodeViewModel}"
                                  ItemsSource="{Binding Children}">
            <TextBlock Text="{Binding Title}" />
        </HierarchicalDataTemplate>
    </TreeView.Resources>
</TreeView>
```

**Avalonia:**

```xml
<!-- Avalonia -->
<TreeView ItemsSource="{Binding RootNodes}">
    <TreeView.DataTemplates>
        <TreeDataTemplate DataType="viewmodels:NodeViewModel"
                          ItemsSource="{Binding Children}">
            <TextBlock Text="{Binding Title}" />
        </TreeDataTemplate>
    </TreeView.DataTemplates>
</TreeView>
```

Note that Avalonia places the template in `DataTemplates` rather than in `Resources`.

## ItemTemplate and ContentTemplate

The `ItemTemplate` property on `ItemsControl`, `ListBox`, and similar controls works the same way in both frameworks. You assign a `DataTemplate` to control how each item is rendered:

```xml
<ListBox ItemsSource="{Binding Items}">
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <Image Source="{Binding Icon}" Width="16" Height="16" />
                <TextBlock Text="{Binding DisplayName}" />
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
</ListBox>
```

Similarly, `ContentTemplate` on `ContentControl` and `ContentPresenter` works as expected. If you do not set an explicit `ItemTemplate` or `ContentTemplate`, Avalonia will walk up the tree to find a matching template in a `DataTemplates` collection, as WPF would search through resources.

## x:DataType for compiled bindings

Avalonia supports compiled bindings, which provide compile-time validation of binding paths and improved runtime performance. WPF has no equivalent feature.

To enable compiled bindings within a data template, set the `x:DataType` attribute to the type the template will receive:

```xml
<DataTemplate DataType="viewmodels:FooViewModel"
              x:DataType="viewmodels:FooViewModel">
    <StackPanel>
        <!-- These bindings are validated at compile time -->
        <TextBlock Text="{Binding Name}" />
        <TextBlock Text="{Binding Description}" />
    </StackPanel>
</DataTemplate>
```

When `x:DataType` is set, the compiler checks that `Name` and `Description` actually exist on `FooViewModel`. Typos or incorrect property names will produce build errors instead of silently failing at runtime.

You can enable compiled bindings project-wide by adding `<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>` to your `.csproj` file, which makes `x:DataType` the default expectation for all bindings.

## See also

- [Introduction to Data Templates](/docs/data-templates/introduction-to-data-templates)
- [Data Template Collection](/docs/data-templates/data-template-collection)
- [Compiled Bindings](/docs/data-binding/compiled-bindings)
