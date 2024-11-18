---
description: CONCEPTS
---

# Avalonia XAML

_Avalonia UI_ uses XAML to define a user interface. XAML is an XML-based mark-up language that is used by many UI frameworks.

:::info
These pages will introduce you to how XAML is used specifically in _Avalonia UI_. For background information about how XAML is used elsewhere in Microsoft technologies, you can use these references:

* Microsoft XAML documentation for WPF, see [here](https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/xaml-overview-wpf). 
* Microsoft XAML documentation for UWP, see [here](https://docs.microsoft.com/en-us/windows/uwp/xaml-platform/xaml-overview).
:::

## AXAML File Extension

The file extension for XAML files used elsewhere is `.xaml` but due to technical issues integrating with Visual Studio, _Avalonia UI_ uses its own `.axaml` extension - 'Avalonia XAML'.

## File Format

A typical Avalonia XAML file looks like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow">
</Window>
```

In common with all XML files, there is a root element. The root element tag `<Window></Window>` defines the type of the root. This will correspond to a type of Avalonia UI control, in the above example a window.

The sample above uses three interesting attributes:

* `xmlns="https://github.com/avaloniaui"` - this is the XAML namespace declaration for _Avalonia UI_ itself. This is required, without it the file will not be recognised as an Avalonia XAML document.
* `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` - this is the declaration for the XAML language namespace.
* `x:Class="AvaloniaApplication1.MainWindow"` - this is an extension of the above declaration (for 'x') that tells the XAML compiler where to find the associated class for this file. The class is defined in a code-behind file, usually written in C#.

:::info
For information about the code-behind concept, see [here](code-behind).
:::

## Control Elements

You can compose a UI for your application by adding XML elements that represent one of the _Avalonia UI_ controls. The element tag uses the same name as the control class name.

:::info
A UI can be composed of several different types of control. To learn more about the concept of UI composition, see [here](../../concepts/ui-composition.md).
:::

For example, this XAML adds a button to the content of a window:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button>Hello World!</Button>
</Window>
```

:::info
For a complete list of the _Avalonia UI_ built-in controls, see the reference [here](../../reference/controls).
:::

## Control Attributes

The XML elements that represent controls have attributes corresponding to control properties that can be set. You can set a control property by adding an attribute to an element.

For example, to specify a blue background for a button control, you add the `Background` attribute set the value to `"Blue"`. Like this:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Background="Blue">Hello World!</Button>
</Window>
```

## Control Content

You might have noticed that the button in the above sample has its content (the 'Hello World' string) placed between its opening and closing tags. As an alternative, you can set the content attribute, as follows:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="Hello World!"/>
</Window>
```

This behaviour is specific to the content of an _Avalonia UI_ control.

## Data Binding

You will often use the _Avalonia UI_ binding system to link a control property to an underlying object. The link is declared using the `{Binding}` mark-up extension. For example:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="{Binding Greeting}"/>
</Window>
```

:::info
For further information about the concept behind data binding, see [here](../data/data-binding).
:::

## Code-behind Files

Many XAML files also have an associated code-behind file that is usually written in C#, and has the file extension `.xaml.cs`.

:::info
For guidance about programming using code-behind files, see [here](code-behind).
:::

## XML Namespaces

In common with any XML format, in Avalonia XAML files you can declare namespaces. This allows the XML processor to find the definitions of the elements in the file.

:::info
For background information, see the Microsoft XML namespaces documentation [here](https://docs.microsoft.com/en-us/dotnet/standard/data/xml/managing-namespaces-in-an-xml-document).
:::

You can add a namespace using the `xmlns` attribute. The format of a namespace declaration is as follows:

```xml
xmlns:alias="definition"
```

It is standard practice to define all the namespaces you are going to use in the root element.

Only one namespace in a file can be defined without using the alias part of the attribute name. The alias must always be unique with in a file.

The definition part of the namespace declaration can be either a URL or a code definition. Both of these are used to locate the definition of the elements in the file.

:::info
For detailed guidance on how namespace declarations work, see [here](../../guides/custom-controls/how-to-create-a-custom-controls-library.md).
:::

There are two valid syntax options for the definition part of a XAML namespace attribute that references code:

### **CLR Namespace Prefix**

There is a prefix `clr-namespace:` you can use to reference both code in the current assembly and code in a referenced assembly.

For example, when the code is present in the same assembly as the XAML, you can use this syntax:

```xml
<Window ...
    xmlns:myAlias1="clr-namespace:MyNamespace.AppNameSpace.UI" 
... >
```

And if the code is in another referenced assembly (for example in a library), you must extend the description to include the name of the referenced assembly:

```xml
<Window ...
    xmlns:myAlias2="clr-namespace:MyNameSpace.OtherAssembly;assembly=OtherAssembly"
 ... >
```

### **Using Prefix**

There is an alternative prefix `using:` that you can use to reference code in the current assembly. For example:

```xml
xmlns:myAlias3="using:MyNamespace.AppNameSpace.UI"
```
