---
id: index
title: XAML Reference
---

This section provides a reference for the XAML language features available in Avalonia. While the [Avalonia XAML fundamentals page](/docs/fundamentals/avalonia-xaml) covers basic concepts, this reference goes deeper into syntax, directives, markup extensions, and the XAML compilation pipeline.

## What is XAML?

XAML (eXtensible Application Markup Language) is an XML-based language for declaring object graphs. In Avalonia, XAML is used to define user interfaces declaratively. Each XML element maps to a .NET object, and XML attributes set properties on those objects.

Avalonia uses the `.axaml` file extension (Avalonia XAML) to distinguish its XAML files from WPF or other XAML dialects. This avoids conflicts in Visual Studio and other tooling.

## XAML Syntax

### Object Elements

An XML element creates an instance of the named type:

```xml
<Button />
<TextBlock />
<StackPanel />
```

### Property Attributes

Set properties using XML attributes:

```xml
<Button Content="Click me" Width="200" Background="Blue" />
```

The XAML engine uses [type converters](type-converters) to convert the string attribute values to the appropriate .NET types (e.g., `"Blue"` becomes a `SolidColorBrush`).

### Property Element Syntax

For complex values that cannot be expressed as a string, use property element syntax:

```xml
<Button>
    <Button.Background>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
            <GradientStop Color="Red" Offset="0" />
            <GradientStop Color="Blue" Offset="1" />
        </LinearGradientBrush>
    </Button.Background>
    <Button.Content>
        <StackPanel Orientation="Horizontal">
            <Image Source="/Assets/icon.png" Width="16" Height="16" />
            <TextBlock Text="Click me" Margin="4,0,0,0" />
        </StackPanel>
    </Button.Content>
</Button>
```

### Content Property

Many controls designate a default content property. Child elements placed directly inside the control's tags are assigned to that property:

```xml
<!-- These are equivalent -->
<Button>Click me</Button>
<Button Content="Click me" />
```

```xml
<!-- StackPanel's content property is Children -->
<StackPanel>
    <TextBlock Text="First" />
    <TextBlock Text="Second" />
</StackPanel>
```

### Collection Syntax

Properties of collection types can be populated with multiple child elements:

```xml
<Grid.ColumnDefinitions>
    <ColumnDefinition Width="Auto" />
    <ColumnDefinition Width="*" />
    <ColumnDefinition Width="200" />
</Grid.ColumnDefinitions>
```

Some collection properties support a compact string syntax:

```xml
<Grid ColumnDefinitions="Auto,*,200" RowDefinitions="Auto,*" />
```

### Attached Property Syntax

Set attached properties using the `OwnerType.PropertyName` syntax:

```xml
<Grid>
    <Button Grid.Row="0" Grid.Column="1" Content="Cell (0,1)" />
</Grid>
```

## Topics

- [Namespaces](namespaces): How XAML namespaces work and how to reference your own types.
- [x: Directives](directives): Reference for `x:Name`, `x:Key`, `x:Class`, `x:DataType`, and other directives.
- [Markup Extensions](markup-extensions): Reference for `{Binding}`, `{StaticResource}`, `{DynamicResource}`, `{TemplateBinding}`, and others.
- [Type Converters](type-converters): How string values in XAML are converted to .NET types.
