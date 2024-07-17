---
description: CONCEPTS
---

# XAML Namespaces and Namespace Mapping

This topic further explains the presence and purpose of the two XAML namespace mappings as often found in the root tag of a Avalonia XAML file. It also describes how to produce similar mappings for using elements that are defined in your own code, and/or within separate assemblies.

## What is a XAML Namespace
A XAML namespace is really an extension of the concept of an XML namespace. The techniques of specifying a XAML namespace rely on the XML namespace syntax, the convention of using URIs as namespace identifiers, using prefixes to provide a means to reference multiple namespaces from the same markup source, and so on. The primary concept that is added to the XAML definition of the XML namespace is that a XAML namespace implies both a scope of uniqueness for the markup usages, and also influences how markup entities are potentially backed by specific CLR namespaces and referenced assemblies. This latter consideration is also influenced by the concept of a XAML schema context. But for purposes of how Avalonia works with XAML namespaces, you can generally think of XAML namespaces in terms of a default XAML namespace, the XAML language namespace, and any further XAML namespaces as mapped by your XAML markup directly to specific backing CLR namespaces and referenced assemblies.

## The Avalonia and XAML Namespace Declarations

Within the namespace declarations in the root tag of many XAML files, you will see that there are typically two XML namespace declarations. The first declaration maps the overall Avalonia client / framework XAML namespace as the default:

```xml
xmlns="https://github.com/avaloniaui"
```

The second declaration maps a separate XAML namespace, mapping it (typically) to the ```x:``` prefix.

```xml
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
``` 

The relationship between these declarations is that the ```x:``` prefix mapping supports the intrinsics that are part of the XAML language definition, and Avalonia is one implementation that uses XAML as a language and defines a vocabulary of its objects for XAML. Because the Avalonia vocabulary's usages will be far more common than the XAML intrinsics usages, the Avalonia vocabulary is mapped as the default.

The ```x:``` prefix convention for mapping the XAML language intrinsics support is followed by project templates, sample code, and the documentation of language features within this SDK. The XAML namespace defines many commonly-used features that are necessary even for basic Avalonia applications. For instance, in order to join any code-behind to a XAML file through a partial class, you must name that class as the ```x:Class``` attribute in the root element of the relevant XAML file. Or, any element as defined in a XAML page that you wish to access as a keyed resource should have the ```x:Key``` attribute set on the element in question. For more information on these and other aspects of XAML see [XAML Overview](../xaml/introduction-to-xaml) or [XAML Syntax In Detail](../xaml/xaml-syntax-in-detail).

## Mapping to Custom Classes and Assemblies
You can map XML namespaces to assemblies using a series of tokens within an ```xmlns``` prefix declaration, similar to how the standard Avalonia and XAML-intrinsics XAML namespaces are mapped to prefixes.

The syntax takes the following possible named tokens and following values:

```clr-namespace:``` The CLR namespace declared within the assembly that contains the public types to expose as elements.

```assembly=``` The assembly that contains some or all of the referenced CLR namespace. This value is typically just the name of the assembly, not the path, and does not include the extension (such as .dll or .exe). The path to that assembly must be established as a project reference in the project file that contains the XAML you are trying to map. In order to incorporate versioning and strong-name signing, the ```assembly``` value can be a string as defined by [AssemblyName](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assemblyname), rather than the simple string name.

Note that the character separating the ```clr-namespace``` token from its value is a colon (:) whereas the character separating the ```assembly``` token from its value is an equals sign (=). The character to use between these two tokens is a semicolon. Also, do not include any white space anywhere in the declaration.

### A Basic Custom Mapping Example
The following code defines an example custom class:

```csharp
namespace SDKSample 
{  
    public class ExampleClass : ContentControl 
    {  
        public ExampleClass() 
        {  
        ...  
        }  
    }  
}
```
This custom class is then compiled into a library, which per the project settings (not shown) is named ```SDKSampleLibrary```.

In order to reference this custom class, you also need to include it as a reference for your current project, which you would typically do using the Solution Explorer UI in your IDE.

Now that you have a library containing a class, and a reference to it in project settings, you can add the following prefix mapping as part of your root element in XAML:

```xml
xmlns:custom="clr-namespace:SDKSample;assembly=SDKSampleLibrary"
```

To put it all together, the following is XAML that includes the custom mapping along with the typical default and x: mappings in the root tag, then uses a prefixed reference to instantiate ```ExampleClass``` in that UI:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="ExampleApp.Views.MainWindow"
        Title="ExampleApp"
        xmlns:custom="clr-namespace:SDKSample;assembly=SDKSampleLibrary">
        ...
          <custom:ExampleClass/>  
        ...
</Window>
```

### Mapping to Current Assemblies

```assembly``` can be omitted if the ```clr-namespace``` referenced is being defined within the same assembly as the application code that is referencing the custom classes. Or, an equivalent syntax for this case is to specify ```assembly=```, with no string token following the equals sign.

Custom classes cannot be used as the root element of a page if defined in the same assembly. Partial classes do not need to be mapped; only classes that are not the partial class of a page in your application need to be mapped if you intend to reference them as elements in XAML.

## Mapping CLR Namespaces to XML Namespaces in an Assembly
Avalonia defines an attribute that is consumed by XAML processors in order to map multiple CLR namespaces to a single XAML namespace. This attribute, [XmlnsDefinitionAttribute](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Metadata/XmlnsDefinitionAttribute.cs), is placed at the assembly level in the source code that produces the assembly. The Avalonia assembly source code uses this attribute to map the various common namespaces to the ```https://github.com/avaloniaui``` namespace.

The [XmlnsDefinitionAttribute](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Metadata/XmlnsDefinitionAttribute.cs) takes two parameters: the XML/XAML namespace name, and the CLR namespace name. More than one [XmlnsDefinitionAttribute](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Metadata/XmlnsDefinitionAttribute.cs) can exist to map multiple CLR namespaces to the same XML namespace. Once mapped, members of those namespaces can also be referenced without full qualification if desired by providing the appropriate ```using``` statement in the partial-class code-behind page. For more details, refer to the Avalonia documentation on [XmlnsDefinitionAttribute](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Metadata/XmlnsDefinitionAttribute.cs).

## Designer Namespaces and Other Prefixes From XAML Templates

If you are working with development environments and/or design tools for Avalonia XAML, you may notice that there are other defined XAML namespaces / prefixes within the XAML markup.

Avalonia's XAML previewer uses a designer namespace that is typically mapped to the prefix ```d:```. This design XAML namespace is used to support design-time features and maintain design state while working with XAML-based UI in the previewer. It can be used for features such as ```d:DesignWidth``` and ```d:DesignHeight```, which allow you to specify dimensions for design-time rendering without affecting runtime behavior.

Another prefix you might see mapped is ```mc:```. ```mc:``` is for markup compatibility, and is leveraging a markup compatibility pattern that is not necessarily XAML-specific. To some extent, the markup compatibility features can be used to exchange XAML between frameworks or across other boundaries of backing implementation, work between XAML schema contexts, provide compatibility for limited modes in previewers, and so on. For more information on markup compatibility concepts and how they relate to Avalonia, refer to the Avalonia documentation on Markup Compatibility Language Features. Copy

## Avalonia and Assembly Loading
The XAML schema context for Avalonia integrates with the Avalonia application model. The process of loading assemblies or finding types at run time or design time in Avalonia is designed to work efficiently with modern .NET versions (6 and above). The exact sequence may vary based on the specific Avalonia version and configuration, but generally follows these principles:

1. Look for already-loaded assemblies that match the required name.
2. If the name is qualified, attempt to load the assembly using the qualified name.
3. If the assembly name matches the one from which the markup was loaded, return that assembly.
4. Attempt to load the assembly using various strategies, including probing the application's directory and its subdirectories.

Loose XAML does not use the step of matching against the assembly the markup was loaded from, as there is no such assembly in this case.

Compiled XAML for Avalonia typically uses fully qualified assembly names, which simplifies the loading process.

For the most up-to-date and detailed information on how Avalonia handles assembly loading and type resolution, refer to the latest Avalonia source code.