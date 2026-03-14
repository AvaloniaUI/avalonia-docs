---
id: namespaces
title: XAML namespaces
---

XAML namespaces tell the XAML engine where to find the types referenced in your markup. Every Avalonia XAML file requires at least one namespace declaration to work.

## Default namespaces

A typical Avalonia XAML file starts with two namespace declarations:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
</Window>
```

| Declaration | Purpose |
|---|---|
| `xmlns="https://github.com/avaloniaui"` | The default Avalonia namespace. Maps to all core Avalonia CLR namespaces (`Avalonia`, `Avalonia.Controls`, `Avalonia.Media`, `Avalonia.Animation`, and others). Required in every Avalonia XAML file. |
| `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` | The XAML language namespace. Provides access to [x: directives](directives) like `x:Name`, `x:Key`, and `x:Class`. |

## CLR namespaces mapped to the default Avalonia namespace

The `https://github.com/avaloniaui` URI maps to many CLR namespaces across Avalonia assemblies. The most commonly used include:

- `Avalonia` (base types)
- `Avalonia.Controls` (all standard controls)
- `Avalonia.Controls.Primitives`
- `Avalonia.Controls.Shapes`
- `Avalonia.Controls.Presenters`
- `Avalonia.Controls.Templates`
- `Avalonia.Controls.Documents`
- `Avalonia.Controls.Notifications`
- `Avalonia.Animation`
- `Avalonia.Animation.Easings`
- `Avalonia.Data` (binding types)
- `Avalonia.Media` (brushes, transforms, geometries)
- `Avalonia.Layout`
- `Avalonia.Styling`
- `Avalonia.Markup.Xaml.MarkupExtensions`
- `Avalonia.Markup.Xaml.Styling`
- `Avalonia.Markup.Xaml.Templates`

## Referencing your own types

To use your own classes in XAML, you need to declare a namespace prefix that maps to a CLR namespace.

### Using the `using:` prefix

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:MyApp.ViewModels"
        xmlns:controls="using:MyApp.Controls">

    <controls:MyCustomControl DataContext="{x:Static vm:DesignData.MainViewModel}" />
</Window>
```

The `using:` prefix works for namespaces in the current assembly or any referenced assembly. This is the recommended syntax.

### Using the `clr-namespace:` prefix

The `clr-namespace:` prefix, familiar from WPF, is also supported:

**Same assembly:**
```xml
xmlns:local="clr-namespace:MyApp.Controls"
```

**Different assembly:**
```xml
xmlns:ext="clr-namespace:ThirdParty.Controls;assembly=ThirdParty.Controls"
```

:::tip
Prefer `using:` over `clr-namespace:`. The `using:` syntax is shorter and does not require the `;assembly=` suffix for referenced assemblies.
:::

## Defining custom XML namespace mappings

Library authors can map multiple CLR namespaces to a single XML namespace URI using the `XmlnsDefinition` assembly attribute:

```csharp
// In your library's AssemblyInfo.cs or a Properties file
[assembly: XmlnsDefinition("https://mycompany.com/mylib", "MyLib.Controls")]
[assembly: XmlnsDefinition("https://mycompany.com/mylib", "MyLib.Converters")]
[assembly: XmlnsDefinition("https://mycompany.com/mylib", "MyLib.Panels")]
```

Users of the library can then use a single namespace declaration:

```xml
<Window xmlns:mylib="https://mycompany.com/mylib">
    <mylib:FancyButton />
</Window>
```

## Common namespace prefixes by convention

These prefixes are commonly used across Avalonia projects:

| Prefix | Typical Mapping |
|---|---|
| `x` | XAML language namespace |
| `d` | `http://schemas.microsoft.com/expression/blend/2008` (design-time) |
| `mc` | `http://schemas.openxmlformats.org/markup-compatibility/2006` |
| `local` | The application's root namespace |
| `vm` | ViewModels namespace |
| `conv` | Converters namespace |

### Design-time namespaces

The `d:` and `mc:` namespaces enable design-time features:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d"
        d:DesignWidth="800" d:DesignHeight="450">
</Window>
```

- `d:DesignWidth` and `d:DesignHeight` set the preview size in the XAML designer.
- `d:DataContext` sets a design-time data context for binding previews.
- `mc:Ignorable="d"` tells the runtime to ignore all `d:` attributes.

## See also

- [Avalonia XAML](/docs/fundamentals/avalonia-xaml): XAML basics and file structure.
- [x: Directives](directives): XAML language directives.
- [Custom Control Library](/docs/custom-controls/custom-control-library): How to package controls with namespace mappings.
