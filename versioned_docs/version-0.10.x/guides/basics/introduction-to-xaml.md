---
id: introduction-to-xaml
title: Introduction to XAML
---

Avalonia uses XAML to define user-interfaces. XAML is an XML-based markup language that is used by many UI frameworks.

This section is intended as a basic introduction to using XAML in Avalonia. For more information see the [Microsoft XAML documentation for WPF](https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/xaml-overview-wpf) or [Microsoft XAML documentation for UWP](https://docs.microsoft.com/en-us/windows/uwp/xaml-platform/xaml-overview) - many of the concepts are the same between frameworks.

## XAML or AXAML file?

The traditional extension for XAML files is `.xaml` but due to problems with Visual Studio we have been forced to move to our own `.axaml` extension for Avalonia XAML files. From version 0.9.11 Avalonia XAML files created in Visual Studio use the `.axaml` extension and from version 0.10 all of our templates will be standardized on using the `.axaml` extension.

For more information see [https://github.com/AvaloniaUI/Avalonia/issues/4102](https://github.com/AvaloniaUI/Avalonia/issues/4102).

Both `.xaml` and `.axaml` will be supported going forward, so feel free to use the extension you prefer.

## Format of an Avalonia XAML File

A basic Avalonia XAML file looks like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow">
</Window>
```

There are three parts to this file:

* The root element `Window` - this describes the type of the root control in the XAML file; in this case [`Window`](http://reference.avaloniaui.net/api/Avalonia.Controls/Window/)
* `xmlns="https://github.com/avaloniaui"` - this is the XAML namespace for Avalonia. Without this, the file will not be recognised as an Avalonia XAML document.
* `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` - this is the XAML-language XAML namespace. This isn't strictly necessary, but you will probably need it for accessing certain features of the XAML language.
* `x:Class="AvaloniaApplication1.MainWindow"` - this tells the XAML compiler where to find the associated class for this file, defined in [code-behind](code-behind)

## Declaring XAML Namespaces

In every `XML`-file you can declare namespaces, where the processor of the document can look up the nodes defined. If you are completely new to `X(A)ML`, please read more about `XML-Namespaces` [here](https://docs.microsoft.com/en-us/dotnet/standard/data/xml/managing-namespaces-in-an-xml-document).

A new namespace can be added via the `xmlns`-attribute. Most of the times the namespaces used are defined at the root node, but they can be added at each level of your file. Only one namespace can be defined without an alias, all other namespaces must have an unique alias defined: 

```xml
xmlns:myAlias="MyNamespaceDefinition"
```

### Valid XAML Namespaces

**Option 1**: Using the `clr-namespace`-syntax: 

```xml
xmlns:myAlias1="clr-namespace:My.NameSpace"
xmlns:myAlias2="clr-namespace:My.NameSpace.InOtherAssembly;assembly=TheOtherAssembly"
```

:::info
`My.NameSpace` is the namespace in `C#` you want to use. 
:::

:::info
You can omit the `assembly` part if your namespace is in the same assembly. 
:::

**Option 2**: Using the `using`-syntax: 

```xml
xmlns:myAlias3="using:My.NameSpace"
```

:::info
`My.NameSpace` is the namespace in `C#` you want to use.
:::

:::warning
The `using`-syntax cannot be used in case of reflection based type resolution like in `ReflectionBinding`. 
:::

**Option 3**: Using a common namespace which can combine multiple namespaces: 

Some libraries have their own common namespace defined, like Avalonia does. Often they use an URL like `https://github.com/avaloniaui`, but it can be any string. Usage: 

```xml
xmlns:myAlias4="https://github.com/avaloniaui"
```

### Create a common Namespace

If you want to create your own common namespace, add these lines to any `*.cs`-file, for example in `Properties ► AssemblyInfo.cs`:

```cs
using Avalonia.Metadata;

[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace")]
[assembly: XmlnsDefinition("https://my.controls.url", "My.NameSpace.Other")]
```

## Declaring Controls

Controls are added to the XAML by adding an XML element with the control's class name. For example to add a button as the child of the window you would write:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button>Hello World!</Button>
</Window>
```

See the [controls documentation](../../controls) for a list of the controls included with Avalonia.

## Setting Properties

You can set a property of a control by adding an XML attribute to an element. For example to create a button with a blue background you could write:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Background="Blue">Hello World!</Button>
</Window>
```

You can also use _property element syntax_ for setting properties. For more information see the [WPF documentation](https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/xaml-overview-wpf#property-element-syntax).

## Content Properties

You may notice that the button above has its "Hello World!" content placed directly inside the XML element. This could also be written as a property using:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="Hello World"/>
</Window>
```

This is because [`Button.Content`](http://reference.avaloniaui.net/api/Avalonia.Controls/ContentControl/) is declared as a _`[Content]` Property_ which means that any content placed inside its XML tag will be assigned to this property.

## Binding

You can bind a property using the `{Binding}` markup extension:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="{Binding Greeting}"/>
</Window>
```

For more information, see the [binding documentation](../../data-binding).

## Code-behind

Many XAML files also have an associated _code-behind_ file which usually has the extension `.xaml.cs`. For more information see the [codebehind documentation](code-behind).
