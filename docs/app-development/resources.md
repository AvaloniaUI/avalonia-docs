---
id: resources
title: Resources overview
description: Define, reference, and manage reusable XAML resources, merged dictionaries, and theme variants.
doc-type: overview
---

Resources in Avalonia are reusable objects defined in XAML and shared across your application. Brushes, colors, thicknesses, strings, and styles are commonly defined as resources to ensure visual consistency and simplify maintenance.

## Defining resources

Resources are stored in `ResourceDictionary` collections, which you declare on any element's `Resources` property. Each resource must have an `x:Key`:

```xml
<Application.Resources>
    <SolidColorBrush x:Key="PrimaryBrush" Color="#6366F1" />
    <SolidColorBrush x:Key="DangerBrush" Color="#EF4444" />
    <x:Double x:Key="DefaultSpacing">8</x:Double>
    <Thickness x:Key="PagePadding">24,16</Thickness>
</Application.Resources>
```

Resources can be defined at any level of the tree:

| Level | Scope |
|---|---|
| `Application.Resources` | Available everywhere in the application |
| `Window.Resources` | Available within that window |
| `UserControl.Resources` | Available within that user control |
| Any control's `.Resources` | Available to that control and its descendants |
| `Style.Resources` | Available within that style block only |

## Using resources

### StaticResource

`StaticResource` performs a one-time lookup when the XAML is loaded:

```xml
<Button Background="{StaticResource PrimaryBrush}" />
<StackPanel Spacing="{StaticResource DefaultSpacing}" />
```

If the resource is not found, an exception is thrown at runtime.

### DynamicResource

`DynamicResource` monitors for changes and updates automatically if the resource value changes at runtime (for example, during theme switching):

```xml
<TextBlock Foreground="{DynamicResource SystemAccentColor}" />
<Border Background="{DynamicResource WindowBackgroundBrush}" />
```

### When to use each

| Use | When |
|---|---|
| `StaticResource` | The resource value never changes at runtime. Slightly faster lookup. |
| `DynamicResource` | The resource may change (theme switching, user preferences, runtime updates). |

:::tip
Use `DynamicResource` for colors, brushes, and sizes that should respond to theme changes. Use `StaticResource` for data templates, converters, and other structural resources that remain constant.
:::

## Resource lookup order

When you reference a resource, Avalonia searches for it by walking up the logical tree from the element where the reference appears:

1. The element's own `Resources` dictionary
2. Merged dictionaries at that level
3. The parent element's `Resources` (and its merged dictionaries)
4. Continue up the logical tree
5. Style resources at each level
6. `Application.Resources` and its merged dictionaries
7. Theme resources

The first match wins. This means resources defined closer to the usage point override those defined higher up.

## Merged dictionaries

You can organize resources into separate files and merge them into any `ResourceDictionary`:

```xml title="Resources/Colors.axaml"
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="PrimaryBrush" Color="#6366F1" />
    <SolidColorBrush x:Key="SecondaryBrush" Color="#8B5CF6" />
</ResourceDictionary>
```

```xml title="App.axaml"
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceInclude Source="/Resources/Colors.axaml" />
            <ResourceInclude Source="/Resources/Sizes.axaml" />
        </ResourceDictionary.MergedDictionaries>
        <!-- Additional inline resources -->
        <x:String x:Key="AppName">My Application</x:String>
    </ResourceDictionary>
</Application.Resources>
```

### MergeResourceInclude vs ResourceInclude

| Type | Behavior |
|---|---|
| `ResourceInclude` | Creates a separate resource dictionary scope. Standard resource file inclusion. |
| `MergeResourceInclude` | Merges the resources directly into the parent dictionary, making them accessible as if they were defined inline. |

## Theme-variant resources

Define different resource values for light and dark themes using `ThemeDictionaries`:

```xml
<ResourceDictionary>
    <ResourceDictionary.ThemeDictionaries>
        <ResourceDictionary x:Key="Light">
            <SolidColorBrush x:Key="CardBackground" Color="White" />
            <SolidColorBrush x:Key="CardForeground" Color="#1A1A1A" />
        </ResourceDictionary>
        <ResourceDictionary x:Key="Dark">
            <SolidColorBrush x:Key="CardBackground" Color="#2D2D2D" />
            <SolidColorBrush x:Key="CardForeground" Color="#FAFAFA" />
        </ResourceDictionary>
    </ResourceDictionary.ThemeDictionaries>
</ResourceDictionary>
```

Use `DynamicResource` to reference theme-variant resources so they update when the theme changes:

```xml
<Border Background="{DynamicResource CardBackground}">
    <TextBlock Foreground="{DynamicResource CardForeground}" Text="Hello" />
</Border>
```

## Accessing resources from code

Avalonia provides four methods for accessing resources programmatically:

```csharp
// Direct dictionary access (does not search merged dictionaries or parent elements)
var brush = (SolidColorBrush)this.Resources["PrimaryBrush"];

// Search merged dictionaries at the current level only
if (this.TryGetResource("PrimaryBrush", this.ActualThemeVariant, out var result))
{
    // result contains the resource value
}

// Search the full logical tree (most common usage)
if (this.TryFindResource("PrimaryBrush", this.ActualThemeVariant, out var found))
{
    // found contains the resource value from anywhere in the tree
}

// Observable for runtime changes
myBorder.Bind(Border.BackgroundProperty,
    this.GetResourceObservable("PrimaryBrush"));
```

| Method | Searches merged dictionaries | Searches parent elements |
|---|---|---|
| `Resources["key"]` | No | No |
| `TryGetResource` | Yes | No |
| `TryFindResource` | Yes | Yes |
| `GetResourceObservable` | Yes | Yes (and monitors changes) |

## Updating resources at runtime

You can modify resources in code to change the appearance of your application dynamically:

```csharp
// Update a resource (DynamicResource references update automatically)
Application.Current!.Resources["PrimaryBrush"] =
    new SolidColorBrush(Colors.Red);
```

Only `DynamicResource` references respond to runtime resource changes. `StaticResource` references retain their initial values.

## See also

- [Resource Dictionary](/docs/app-development/resource-dictionary): Step-by-step guide to creating and organizing resource dictionaries.
- [Theme Variants](/docs/styling/theme-variants): How theme-aware resources work.
- [Styles](/docs/styling/styles): Using resources within style definitions.
- [Sharing Styles](/docs/styling/sharing-styles): Organizing and sharing style resources.
