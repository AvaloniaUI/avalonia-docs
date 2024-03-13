---
id: how-to-create-templated-controls
title: How To Create Templated Controls
---


# How To Create Templated Controls

## Data Binding

When you're creating a control template and you want to bind to the templated parent you can use:

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- Which is the same as -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```

Although the two syntaxes shown here are equivalent in most cases, there are some differences:

1.  `TemplateBinding` accepts only a single property rather than a property path, so if you want to bind using a property path you must use the second syntax:

    ```xml
    <!-- This WON'T work as TemplateBinding only accepts single properties -->
    <TextBlock Name="tb" Text="{TemplateBinding Caption.Length}"/>

    <!-- Instead this syntax must be used in this case -->
    <TextBlock Name="tb" Text="{Binding Caption.Length, RelativeSource={RelativeSource TemplatedParent}}"/>
    ```
2.  A `TemplateBinding` only supports `OneWay` mode for performance reasons (this is the [same as WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/templatebinding-markup-extension#remarks)). This means a `TemplateBinding` is actually equivalent to `{Binding RelativeSource={RelativeSource TemplatedParent}, Mode=OneWay}`. If `TwoWay` binding is required in a control template, the full syntax is needed as shown below. Note that `Binding` will also use the default binding mode unlike `TemplateBinding`.

    ```markup
    {Binding RelativeSource={RelativeSource TemplatedParent}, Mode=TwoWay}
    ```
3. `TemplateBinding` can only be used on `IStyledElement`.

```xml
<!-- This WON'T work as GeometryDrawing is not a IStyledElement. -->
<GeometryDrawing Brush="{TemplateBinding Foreground}"/>

<!-- Instead this syntax must be used in this case. -->
<GeometryDrawing Brush="{Binding Foreground, RelativeSource={RelativeSource TemplatedParent}}"/>
```

