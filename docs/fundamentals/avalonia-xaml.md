---
id: avalonia-xaml
title: Avalonia XAML
description: Learn the XAML markup language used to define Avalonia user interfaces.
doc-type: explanation
---

Avalonia uses XAML to define user interfaces. XAML is an XML-based markup language that is used by many UI frameworks.

While XAML is the most popular way to define Avalonia user interfaces, it is not a requirement. You can develop Avalonia applications entirely with C#, F#, or any .NET language.

:::tip
For a complete guide to building applications without XAML, see [Code-Only UI](/docs/fundamentals/coded-ui).
:::

:::info
XAML was originally developed by Microsoft for WPF and later adopted by Silverlight, UWP, and other frameworks. Avalonia uses the same core XAML concepts (declarative markup, object elements, property attributes, data binding, and markup extensions) but with its own namespace and control library. If you have experience with WPF or UWP XAML, most of your knowledge transfers directly to Avalonia.
:::

## AXAML file extension

The file extension for XAML files used elsewhere is `.xaml` but due to technical issues integrating with Visual Studio, Avalonia uses its own `.axaml` extension - 'Avalonia XAML'.

## File format

A typical Avalonia XAML file looks like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow">
</Window>
```

In common with all XML files, there is a root element. The root element tag `<Window></Window>` defines the type of the root. This will correspond to a type of Avalonia control, in the above example a window.

The sample above uses three interesting attributes:

* `xmlns="https://github.com/avaloniaui"` - this is the XAML namespace declaration for Avalonia itself. This is required, without it the file will not be recognised as an Avalonia XAML document.
* `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` - this is the declaration for the XAML language namespace.
* `x:Class="AvaloniaApplication1.MainWindow"` - this is an extension of the above declaration (for 'x') that tells the XAML compiler where to find the associated class for this file. The class is defined in a code-behind file, usually written in C#.

:::info
For information about the code-behind concept, see [Code-behind](/docs/fundamentals/code-behind).
:::

## Control elements

You can compose a UI for your application by adding XML elements that represent one of the Avalonia controls. The element tag uses the same name as the control class name.

:::info
A UI can be composed of several different types of control. To learn more about the concept of UI composition, see [UI composition](/docs/fundamentals/ui-composition).
:::

For example, this XAML adds a button to the content of a window:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button>Hello World!</Button>
</Window>
```

:::info
For a complete list of the Avalonia built-in controls, see the [Controls reference](/controls).
:::

## Control attributes

The XML elements that represent controls have attributes corresponding to control properties that can be set. You can set a control property by adding an attribute to an element.

For example, to specify a blue background for a button control, you add the `Background` attribute set the value to `"Blue"`. Like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Background="Blue">Hello World!</Button>
</Window>
```

## Control content

You might have noticed that the button in the above sample has its content (the 'Hello World' string) placed between its opening and closing tags. As an alternative, you can set the content attribute, as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="Hello World!"/>
</Window>
```

This behaviour is specific to the content of an Avalonia control.

## Data binding

You will often use the Avalonia binding system to link a control property to an underlying object. The link is declared using the `{Binding}` mark-up extension. For example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="{Binding Greeting}"/>
</Window>
```

:::info
For further information about the concept behind data binding, see [Introduction to data binding](/docs/data-binding/introduction-to-data-binding).
:::

## Code-behind files

Many Avalonia XAML files also have an associated code-behind file that is usually written in C#, and has the file extension `.axaml.cs`.

:::info
For guidance about programming using code-behind files, see [Code-behind](/docs/fundamentals/code-behind).
:::

## XML namespaces

In common with any XML format, in Avalonia XAML files you can declare namespaces. XML namespaces associate element and attribute names with specific URIs, preventing name collisions and allowing the XAML processor to find the definitions of the elements in the file. You declare a namespace using the `xmlns` attribute, optionally with a prefix. Namespace declarations are inherited from parent elements to child elements, and are effective from their point of declaration until the end of the enclosing element.

You can add a namespace using the `xmlns` attribute. The format of a namespace declaration is as follows:

```xml
xmlns:alias="definition"
```

It is standard practice to define all the namespaces you are going to use in the root element.

Only one namespace in a file can be defined without using the alias part of the attribute name. The alias must always be unique within a file.

The definition part of the namespace declaration can be either a URL or a code definition. Both of these are used to locate the definition of the elements in the file.

:::info
For detailed guidance on how namespace declarations work, see [Custom control library](/docs/custom-controls/custom-control-library).
:::

There are two valid syntax options for the definition part of a XAML namespace attribute that references code:

### Using prefix

The prefix `using:` can be used when providing an alias for a namespace in either the current assembly or a referenced assembly. The syntax is the same in both cases.  For example:

```xml
xmlns:myAlias1="using:AppNameSpace.MyNamespace"
```
### CLR namespace prefix

The prefix `clr-namespace:`, the same as in WPF, is also supported. However, the syntax depends on whether the namespace for which an alias is required is in the current assembly or a referenced assembly.

For example, when the namespace is in the same assembly as the XAML, you can use this syntax:

```xml
<Window ...
    xmlns:myAlias1="clr-namespace:AppNameSpace.MyNamespace" 
... >
```

If the namespace is in another referenced assembly (for example in a library), you must extend the description to include the name of the referenced assembly:

```xml
<Window ...
    xmlns:myAlias2="clr-namespace:OtherAssembly.MyNameSpace;assembly=OtherAssembly"
 ... >
```

## See also

- [Code-Only UI](/docs/fundamentals/coded-ui)
- [Code-behind](/docs/fundamentals/code-behind)
- [UI composition](/docs/fundamentals/ui-composition)
- [Introduction to data binding](/docs/data-binding/introduction-to-data-binding)
