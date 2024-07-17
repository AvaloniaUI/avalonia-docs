---
description: CONCEPTS
---

# Markup Extensions and Avalonia XAML

This topic introduces the concept of markup extensions for XAML, including their syntax rules, purpose, and the class object model that underlies them. Markup extensions are a general feature of the XAML language and of the .NET implementation of XAML services. This topic specifically details markup extensions for use in Avalonia XAML.

## XAML Processors and Markup Extensions
Generally speaking, a XAML parser can either interpret an attribute value as a literal string that can be converted to a primitive, or convert it to an object by some means. One such means is by referencing a type converter; this is documented in the topic [TypeConverters and XAML](/docs/concepts/xaml/typeconverters-and-xaml.md). However, there are scenarios where different behavior is required. For example, a XAML processor can be instructed that a value of an attribute should not result in a new object in the object graph. Instead, the attribute should result in an object graph that makes a reference to an already constructed object in another part of the graph, or a static object. Another scenario is that a XAML processor can be instructed to use a syntax that provides non-default arguments to the constructor of an object. These are the types of scenarios where a markup extension can provide the solution.

## Basic Markup Extension Syntax
A markup extension can be implemented to provide values for properties in an attribute usage, properties in a property element usage, or both.

When used to provide an attribute value, the syntax that distinguishes a markup extension sequence to a XAML processor is the presence of the opening and closing curly braces ( &#123; and &#125;). The type of markup extension is then identified by the string token immediately following the opening curly brace.

When used in property element syntax, a markup extension is visually the same as any other element used to provide a property element value: a XAML element declaration that references the markup extension class as an element, enclosed within angle brackets (&lt; &gt;).

## Avalonia-Specific Markup Extensions
A MarkupExtension allows code-based customization of setter logic to a target property in a convenient, reusable syntax within XAML. Curly braces are used to differentiate the usage from plain text.

### StaticResource
```StaticResource``` provides a value for a property by substituting the value of an already defined resource. A StaticResource evaluation is ultimately made at XAML load time and does not have access to the object graph at run time. 

### DynamicResource
```DynamicResource``` provides a value for a property by deferring that value to be a run-time reference to a resource. A dynamic resource reference forces a new lookup each time that such a resource is accessed and has access to the object graph at run time. In order to get this access, DynamicResource concept is supported by dependency properties in the WPF property system, and evaluated expressions. Therefore you can only use DynamicResource for a dependency property target. 

### Binding
```Binding``` provides a data-bound value for a property, utilising a compiled expression to enhance performance and type safety.By compiling the binding expressions, it ensures faster execution and immediate feedback on binding errors at compile time, which reduces runtime issues.

### CompiledBinding
```CompiledBinding``` provides a data bound value for a property, using the data context that applies to the parent object at run time. This markup extension is relatively complex, because it enables a substantial inline syntax for specifying a data binding.

### ReflectionBinding
```ReflectionBinding``` provides a data-bound value for a property by utilising reflection to dynamically resolve the binding at runtime. By using reflection, it offers the ability to bind to properties without requiring them to be known at compile time, thus supporting more dynamic and adaptable binding scenarios.

### TemplateBinding
```TemplateBinding``` enables a control template to use values for templated properties that come from object-model-defined properties of the class that will use the template. In other words, the property within the template definition can access a context that only exists once the template is applied.

When you're creating a control template and you want to bind to the templated parent you can use:

```xml
<TextBlock Name="tb" Text="{TemplateBinding Caption}"/>

<!-- Which is the same as -->
<TextBlock Name="tb" Text="{Binding Caption, RelativeSource={RelativeSource TemplatedParent}}"/>
```
Learn more in [How To Create Templated Controls](/docs/guides/custom-controls/how-to-create-templated-controls#data-binding).

### OnPlatform
``OnPlatform``` allows properties to be set conditionally based on the platform on which the application is running. This markup extension is particularly useful for creating cross-platform applications, enabling developers to specify different values or behaviours depending on the target platform.

You can specify values for each platform and a default value that will be used if no specific platform match is found:
```xml
<TextBlock Text="{OnPlatform Default='Unknown', Windows='Im Windows', macOS='Im macOS', Linux='Im Linux'}"/>
```

Alternatively, you can use constructor syntax to define the default value directly, skipping ```Default``` keyword. Platform-specific properties still need to be defined:
```xml
<TextBlock Text="{OnPlatform 'Hello World', Android='Im Android'}"/>
````
You can use this markup extension with any other type, not only strings:

```
<Border Height="{OnPlatform 10, Windows=50.5}"/>
```


### OnFormFactor
```OnFormFactor``` functions similarly to the ```OnPlatform```, however, instead of defining values based on the platform, ```OnFormFactor``` allows values to be set based on the device’s form factor, such as ```Desktop``` and ```Mobile```. This is particularly useful for creating adaptive user interfaces that cater to different device types.
```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <TextBlock Text="{OnFormFactor 'Default value', Mobile='Im Mobile', Desktop='Im Desktop'}"/>
</UserControl>
```


## Compiler intrinsics
These technically fall outside of ```MarkupExtension```s as part of the XAML compiler, but the XAML syntax is the same.

* ```x:Type``` supplies the Type object for the named type. This facility is used most frequently in styles and templates. 
* ```x:Static``` produces static values. The values come from value-type code entities that are not directly the type of a target property's value, but can be evaluated to that type. 
* ```x:Null``` specifies null as a value for a property and can be used either for attributes or property element values. 
* ```x:Array``` provides support for creation of general arrays in XAML syntax, for cases where the collection support provided by WPF base elements and control models is deliberately not used.

The ```x:True``` and ```x:False``` literals have use cases where the target binding property is ```object``` and you need to provide a boolean. In these scenarios that lack type information, providing "True" remains a ```string```.

```xml
<Button Command="{Binding SetStateCommand}" CommandParameter="{x:True}" />
```

:::note
The ```x:``` prefix is used for the typical XAML namespace mapping of the XAML language intrinsics, in the root element of a XAML file or production. For example, the .NET templates for Avalonia applications initiate a XAML file using this x: mapping. You could choose a different prefix token in your own XAML namespace mapping, but this documentation will assume the default x: mapping as a means of identifying those entities that are a defined part of the XAML namespace for the XAML language, as opposed to the Avalonia default namespace or other XAML namespaces not related to a specific framework.
:::

 ## *Extension Classes

 For both the general XAML language and Avalonia-specific markup extensions, the behavior of each markup extension is identified to a XAML processor through a ```*Extension``` class that derives from MarkupExtension, and provides an implementation of the ProvideValue method. This method on each extension provides the object that is returned when the markup extension is evaluated. The returned object is typically evaluated based on the various string tokens that are passed to the markup extension.

For example, the StaticResourceExtension class provides the surface implementation of actual resource lookup so that its ProvideValue implementation returns the object that is requested, with the input of that particular implementation being a string that is used to look up the resource by its ```x:Key```. Much of this implementation detail is unimportant if you are using an existing markup extension.
Some markup extensions do not use string token arguments. This is either because they return a static or consistent value, or because context for what value should be returned is available through one of the services passed through the ```serviceProvider``` parameter.

The ```*Extension``` naming pattern is for convenience and consistency. It is not necessary in order for a XAML processor to identify that class as support for a markup extension. So long as your codebase includes the necessary XAML processing capabilities, all that is necessary to be recognized as a XAML markup extension is to derive from MarkupExtension and to support a construction syntax. Avalonia defines markup extension-enabling classes that do not follow the ```*Extension``` naming pattern, for example Binding. Typically the reason for this is that the class supports scenarios beyond pure markup extension support. In the case of Binding, that class supports run-time access to methods and properties of the object for scenarios that have nothing to do with XAML.

## Extension Class Interpretation of Initialization Text

The string tokens following the markup extension name and still within the braces are interpreted by a XAML processor in one of the following ways:

* A comma always represents the separator or delimiter of individual tokens.

* If the individual separated tokens do not contain any equals signs, each token is treated as a constructor argument. Each constructor parameter must be given as the type expected by that signature, and in the proper order expected by that signature.

:::note
Note: A XAML processor must call the constructor that matches the argument count of the number of pairs. For this reason, if you are implementing a custom markup extension, do not provide multiple constructors with the same argument count. The behavior for how a XAML processor behaves if more than one markup extension constructor path with the same parameter count exists is not defined, but you should anticipate that a XAML processor is permitted to throw an exception on usage if this situation exists in the markup extension type definitions.
:::

* If the individual separated tokens contain equals signs, then a XAML processor first calls the parameterless constructor for the markup extension. Then, each name=value pair is interpreted as a property name that exists on the markup extension, and a value to assign to that property.

* If there is a parallel result between the constructor behavior and the property setting behavior in a markup extension, it does not matter which behavior you use. It is more common usage to use the property```=```value pairs for markup extensions that have more than one settable property, if only because it makes your markup more intentional and you are less likely to accidentally transpose constructor parameters. (When you specify property=value pairs, those properties may be in any order.) Also, there is no guarantee that a markup extension supplies a constructor parameter that sets every one of its settable properties. For example, Binding is a markup extension, with many properties that are settable through the extension in property```=```value form, but Binding only supports two constructors: a parameterless constructor, and one that sets an initial path.

* A literal comma cannot be passed to a markup extension without escapement.

## Escape Sequences and Markup Extensions

Attribute handling in a XAML processor uses the curly braces as indicators of a markup extension sequence. It is also possible to produce a literal curly brace character attribute value if necessary, by entering an escape sequence using an empty curly brace pair followed by the literal curly brace. See {} Escape Sequence - Markup Extension.

## Nesting Markup Extensions in XAML Usage
Nesting of multiple markup extensions is supported, and each markup extension will be evaluated deepest first. For example, consider the following usage:

```xml
<Setter Property="Background" Value="{DynamicResource {x:Static SystemColors.ControlBrushKey}}" />
```

In this usage, the x:Static statement is evaluated first and returns a string. That string is then used as the argument for ```DynamicResource```.

## Markup Extensions and Property Element Syntax

When used as an object element that fills a property element value, a markup extension class is visually indistinguishable from a typical type-backed object element that can be used in XAML. The practical difference between a typical object element and a markup extension is that the markup extension is either evaluated to a typed value or deferred as an expression. Therefore the mechanisms for any possible type errors of property values for the markup extension will be different, similar to how a late-bound property is treated in other programming models. An ordinary object element will be evaluated for type match against the target property it is setting when the XAML is parsed.

Most markup extensions, when used in object element syntax to fill a property element, would not have content or any further property element syntax within. Thus you would close the object element tag, and provide no child elements. Whenever any object element is encountered by a XAML processor, the constructor for that class is called, which instantiates the object created from the parsed element. A markup extension class is no different: if you want your markup extension to be usable in object element syntax, you must provide a parameterless constructor. Some existing markup extensions have at least one required property value that must be specified for effective initialization. If so, that property value is typically given as a property attribute on the object element. 