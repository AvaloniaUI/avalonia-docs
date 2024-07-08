---
description: CONCEPTS
---

# XAML Overview

This article describes the features of the XAML language and demonstrates how you can use XAML to write Avalonia apps. This article specifically describes XAML as implemented by Avalonia. XAML is a versatile language that extends beyond Avalonia. It is widely utilised with technologies such as WPF, WinUI, .NET MAUI, and more.

## What is XAML
XAML is a declarative markup language. As applied to the .NET programming model, XAML simplifies creating a UI for a .NET app. You can create visible UI elements in the declarative XAML markup, and then separate the UI definition from the run-time logic by using code-behind files that are joined to the markup through partial class definitions. XAML directly represents the instantiation of objects in a specific set of backing types defined in assemblies. This is unlike most other markup languages, which are typically an interpreted language without such a direct tie to a backing type system. XAML enables a workflow where separate parties can work on the UI and the logic of an app, using potentially different tools.

When represented as text, XAML files are XML files that generally have the .axaml extension, which refers to Avalonia XAML. The files can be encoded by any XML encoding, but encoding as UTF-8 is typical.

The following example shows how you might create a button as part of a UI. This example is intended to give you a flavour of how XAML represents common UI programming metaphors (it's not a complete sample).

```xml
<StackPanel>
    <Button Content="Click Me"/>
</StackPanel>
```

## XAML syntax in brief
The following sections explain the basic forms of XAML syntax and give a short markup example. These sections aren't intended to provide complete information about each syntax form, such as how these are represented in the backing type system. For more information about the specifics of XAML syntax, see XAML Syntax In Detail.

Much of the material in the next few sections will be elementary to you if you have previous familiarity with the XML language. This is a consequence of one of the basic design principles of XAML. The XAML language defines concepts of its own, but these concepts work within the XML language and markup form.

## XAML object elements
An object element typically declares an instance of a type. That type is defined in the assemblies referenced by the technology that uses XAML as a language.

Object element syntax always starts with an opening angle bracket (&lt;). This is followed by the name of the type where you want to create an instance. (The name can include a prefix, a concept that will be explained later.) After this, you can optionally declare attributes on the object element. To complete the object element tag, end with a closing angle bracket (>). You can instead use a self-closing form that doesn't have any content, by completing the tag with a forward slash and closing angle bracket in succession (/>). For example, look at the previously shown markup snippet again.

```xml
<StackPanel>
    <Button Content="Click Me"/>
</StackPanel>
```
This specifies two object elements: &lt;StackPanel> (with content, and a closing tag later), and &lt;Button .../> (the self-closing form, with several attributes). The object elements StackPanel and Button each map to the name of a class that is defined by Avalonia and is part of the Avalonia assemblies. When you specify an object element tag, you create an instruction for XAML processing to create a new instance of the underlying type. Each instance is created by calling the parameterless constructor of the underlying type when parsing and loading the XAML.

## Attribute syntax (properties)
Properties of an object can often be expressed as attributes of the object element. The attribute syntax names the object property that is being set, followed by the assignment operator (=). The value of an attribute is always specified as a string that is contained within quotation marks.

Attribute syntax is the most streamlined property setting syntax and is the most intuitive syntax to use for developers who have used markup languages in the past. For example, the following markup creates a button that has red text and a blue background with a display text of ```Content```.

```xml
<Button Background="Blue" Foreground="Red" Content="This is a button"/>
```

## Property element syntax
For some properties of an object element, attribute syntax isn't possible, because the object or information necessary to provide the property value can't be adequately expressed within the quotation mark and string restrictions of attribute syntax. For these cases, a different syntax known as property element syntax can be used.

The syntax for the property element start tag is ``` <TypeName.PropertyName>```. Generally, the content of that tag is an object element of the type that the property takes as its value. After specifying the content, you must close the property element with an end tag. The syntax for the end tag is ``` </TypeName.PropertyName>```.

If an attribute syntax is possible, using the attribute syntax is typically more convenient and enables a more compact markup, but that is often just a matter of style, not a technical limitation. The following example shows the same properties being set as in the previous attribute syntax example, but this time by using property element syntax for all properties of the Button.

```xml
<Button>
    <Button.Background>
        <SolidColorBrush Color="Blue"/>
    </Button.Background>
    <Button.Foreground>
        <SolidColorBrush Color="Red"/>
    </Button.Foreground>
    <Button.Content>
        This is a button
    </Button.Content>
</Button>
```

## Collection syntax
The XAML language includes some optimizations that produce more human-readable markup. One such optimization is that if a particular property takes a collection type, then items that you declare in markup as child elements within that property's value become part of the collection. In this case, a collection of child object elements is the value being set to the collection property.

The following example shows collection syntax for setting values of the GradientStops property.
```xml
<LinearGradientBrush>
    <LinearGradientBrush.GradientStops>
        <!-- no explicit new GradientStopCollection, parser knows how to find or create -->
        <GradientStop Offset="0.0" Color="Red" />
        <GradientStop Offset="1.0" Color="Blue" />
    </LinearGradientBrush.GradientStops>
</LinearGradientBrush>
```

## XAML content properties
XAML specifies a language feature whereby a class can designate exactly one of its properties to be the XAML *content* property. Child elements of that object element are used to set the value of that content property. In other words, for the content property uniquely, you can omit a property element when setting that property in XAML markup and produce a more visible parent/child metaphor in the markup.

For example, [Border](../../reference/controls/detailed-reference/border.md) specifies a content property of Child. The following two Border elements are treated identically. The first one takes advantage of the content property syntax and omits the ```Border.Child``` property element. The second one shows ```Border.Child``` explicitly.

```xml
<Border>
    <TextBox Width="300"/>
</Border>
<!--explicit equivalent-->
<Border>
    <Border.Child>
        <TextBox Width="300"/>
    </Border.Child>
</Border>
```

As a rule of the XAML language, the value of a XAML content property must be given either entirely before or entirely after any other property elements on that object element. For instance, the following markup doesn't compile.

```xml
<Button>I am a
  <Button.Background>Blue</Button.Background>
  blue button</Button>
```

## Text content

A small number of XAML elements can directly process text as their content. To enable this, one of the following cases must be true:

* The class must declare a content property, and that content property must be of a type assignable to a string (the type could be Object). For instance, any [ContentControl](/docs/reference/controls/contentcontrol) uses Content as its content property and it is type Object, and this supports the following usage on a [ContentControl](/docs/reference/controls/contentcontrol) such as a [Button](/docs/reference/controls/buttons/button): ```<Button>Hello</Button>```.

* The type must declare a type converter, in which case the text content is used as initialization text for that type converter. For example, ```<Brush>Blue</Brush>``` converts the content value of Blue into a brush. This case is less common in practice.

* The type must be a known XAML language primitive.

## Content properties and collection syntax combined

Consider this example.

```xml
<StackPanel>
  <Button>First Button</Button>
  <Button>Second Button</Button>
</StackPanel>
```
Here, each [Button](/docs/reference/controls/buttons/button) is a child element of [StackPanel](/docs/reference/controls/stackpanel). This is a streamlined and intuitive markup that omits two tags for two different reasons.

* **Omitted StackPanel.Children property element:** [StackPanel](/docs/reference/controls/stackpanel) derives from [Panel](/docs/reference/controls/panel). [Panel](/docs/reference/controls/panel) defines Panel.Children as its XAML content property.

* **Omitted Children object element:** The Panel.Children property in Avalonia takes a collection of Control objects. The collection’s element tag can be omitted based on the XAML rules for processing collections such as IList. The Children property is a collection that manages the child elements within a panel.

```xml
<StackPanel>
  <StackPanel.Children>
    <!--<IList<Control>>-->
    <Button>First Button</Button>
    <Button>Second Button</Button>
    <!--</IList<Control>>-->
  </StackPanel.Children>
</StackPanel>
```

## Attribute syntax (events)
Attribute syntax can also be used for members that are events rather than properties. In this case, the attribute's name is the name of the event. In the Avalonia implementation of events for XAML, the attribute's value is the name of a handler that implements that event's delegate. For example, the following markup assigns a handler for the Click event to a [Button](/docs/reference/controls/buttons/button) created in markup:

```xml
<Window 
  xmlns="https://github.com/avaloniaui"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
  x:Class="ExampleNamespace.ExampleWindow">
  <Button Click="Button_Click" >Click Me!</Button>
</Window>
```
There is more to events and XAML in Avalonia than just this example of the attribute syntax. For example, you might wonder what the ClickHandler referenced here represents and how it is defined. This will be explained in the upcoming Events and XAML code-behind section of this article.

## Case and white space in XAML
In general, XAML is case-sensitive. For purposes of resolving backing types, Avalonia XAML is case-sensitive by the same rules that the CLR is case-sensitive. Object elements, property elements, and attribute names must all be specified by using the sensitive casing when compared by name to the underlying type in the assembly, or to a member of a type. XAML language keywords and primitives are also case-sensitive. Values are not always case-sensitive. Case sensitivity for values will depend on the type converter behavior associated with the property that takes the value, or the property value type. For example, properties that take the Boolean type can take either ```true``` or ```True``` as equivalent values, but only because the native Avalonia XAML parser type conversion for string to Boolean already permits these as equivalents.

Avalonia's XAML processors and serializers will ignore or drop all nonsignificant white space, and will normalize any significant white space. This is consistent with the default white-space behavior recommendations of the XAML specification. This behavior is only of consequence when you specify strings within XAML content properties. In simplest terms, XAML converts space, linefeed, and tab characters into spaces, and then preserves one space if found at either end of a contiguous string. 

## Markup extensions

Markup extensions are a XAML language concept. When used to provide the value of an attribute syntax, curly braces (&#123; and  &#125;) indicate a markup extension usage. This usage directs the XAML processing to escape from the general treatment of attribute values as either a literal string or a string-convertible value.

The most common markup extensions used in Avalonia app programming are [Binding](/docs/concepts/markupextensions), used for data binding expressions, and the resource references [StaticResource](/docs/guides/styles-and-resources/resources#static-resource) and DynamicResource. By using markup extensions, you can use attribute syntax to provide values for properties even if that property does not support an attribute syntax in general. Markup extensions often use intermediate expression types to enable features such as deferring values or referencing other objects that are only present at run-time.

For example, the following markup sets the value of the Style property using attribute syntax. The Style property takes an instance of the Style class, which by default could not be instantiated by an attribute syntax string. But in this case, the attribute references a particular markup extension, StaticResource. When that markup extension is processed, it directly references and applies the style defined in the ```<Application.Styles>```.

```xml
<Application.Styles>
    <Style Selector="Border.BlueBackground">
        <Setter Property="Background" Value="Blue"/>
    </Style>
</Application.Styles>
  ```

  ```xml
<StackPanel>
    <Border Style="{StaticResource BlueBackground}">
    </Border>
</StackPanel>
```

For a reference listing of all markup extensions for XAML implemented specifically in Avalonia, see [Markup Extensions](/docs/concepts/markupextensions). 

## Type converters

In the [XAML Syntax in Brief](/docs/basics/user-interface/introduction-to-xaml#xaml-syntax-in-brief) section, it was stated that the attribute value must be able to be set by a string. The basic, native handling of how strings are converted into other object types or primitive values is based on the [String](https://learn.microsoft.com/en-us/dotnet/api/system.string) type itself, in addition to native processing for certain types such as [DateTime](https://learn.microsoft.com/en-us/dotnet/api/system.datetime) or [Uri](https://learn.microsoft.com/en-us/dotnet/api/system.uri). But many Avalonia types or members of those types extend the basic string attribute processing behavior in such a way that instances of more complex object types can be specified as strings and attributes.

The Thickness structure is an example of a type that has a type conversion enabled for XAML usages. Thickness indicates measurements within a nested rectangle and is used as the value for properties such as [Margin](docs/basics/user-interface/building-layouts/alignment-margins-and-padding#understanding-margin-properties). By placing a type converter on Thickness, all properties that use a Thickness are easier to specify in XAML because they can be specified as attributes. The following example uses a type conversion and attribute syntax to provide a value for a Margin:
```xml
<Button Margin="10,20,10,30" Content="Click me"/>
```

The previous attribute syntax example is equivalent to the following more verbose syntax example, where the Margin is instead set through property element syntax containing a Thickness object element. The four key properties of Thickness are set as attributes on the new instance:
```xml
<Button Content="Click me">
  <Button.Margin>
    <Thickness Left="10" Top="20" Right="10" Bottom="30"/>
  </Button.Margin>
</Button>
```

:::note
There are also a limited number of objects where the type conversion is the only public way to set a property to that type without involving a subclass, because the type itself does not have a parameterless constructor. An example is [Cursor](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/Cursor.cs).
:::

For more information on type conversion, see [TypeConverters and XAML](/docs/concepts/xaml/typeconverters-and-xaml.md).

## XAML root elements and XAML namespaces
A XAML file must have only one root element, in order to be both a well-formed XML file and a valid XAML file. For typical Avalonia scenarios, you use a root element that has a prominent meaning in the Avalonia app model (for example, Window or UserControl for a view, or Application for the app definition). The following example shows the root element of a typical XAML file for a Avalonia window, with the root element of Window.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ExampleApp.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="ExampleApp.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Example App">

</Window>
```

The root element also contains the attributes ```xmlns``` and ```xmlns:x```. These attributes indicate to a XAML processor which XAML namespaces contain the type definitions for backing types that the markup will reference as elements. The ```xmlns``` attribute specifically indicates the default XAML namespace. Within the default XAML namespace, object elements in the markup can be specified without a prefix. For most Avalonia app scenarios, and for almost all of the examples given in the Avalonia sections of the SDK, the default XAML namespace is mapped to the Avalonia namespace ```https://github.com/avaloniaui```. The ```xmlns:x``` attribute indicates an additional XAML namespace, which maps the XAML language namespace http://schemas.microsoft.com/winfx/2006/xaml.

This usage of ```xmlns``` to define a scope for usage and mapping of a namescope is consistent with the XML 1.0 specification. XAML namescopes are different from XML namescopes only in that a XAML namescope also implies something about how the namescope's elements are backed by types when it comes to type resolution and parsing the XAML.

The ```xmlns``` attributes are only strictly necessary on the root element of each XAML file. ```xmlns``` definitions will apply to all descendant elements of the root element (this behavior is again consistent with the XML 1.0 specification for ```xmlns```.) ```xmlns``` attributes are also permitted on other elements underneath the root, and would apply to any descendant elements of the defining element. However, frequent definition or redefinition of XAML namespaces can result in a XAML markup style that is difficult to read.

The Avalonia implementation of its XAML processor includes an infrastructure that has awareness of the Avalonia core assemblies. The Avalonia core assemblies are known to contain the types that support the Avalonia mappings to the default XAML namespace. This is enabled through configuration that is part of your project build file and the Avalonia build and project systems. Therefore, declaring the default XAML namespace as the default ```xmlns``` is all that is necessary in order to reference XAML elements that come from Avalonia assemblies.

## The x: prefix
In the previous root element example, the prefix ```x:``` was used to map the XAML namespace ```http://schemas.microsoft.com/winfx/2006/xaml```, which is the dedicated XAML namespace that supports XAML language constructs. This ```x:``` prefix is used for mapping this XAML namespace in the templates for projects, in examples, and in documentation throughout this SDK. The XAML namespace for the XAML language contains several programming constructs that you will use frequently in your XAML. The following is a listing of the most common ```x:``` prefix programming constructs you will use:

* ```x:Class```: Specifies the CLR namespace and class name for the class that provides code-behind for a XAML page. You must have such a class to support code-behind per the Avalonia programming model, and therefore you almost always see ```x:``` mapped, even if there are no resources.
* ```x:Name```: Specifies a run-time object name for the instance that exists in run-time code after an object element is processed. In general, you will frequently use a Avalonia-defined equivalent property for x:Name. Such properties map specifically to a CLR backing property and are thus more convenient for app programming, where you frequently use run-time code to find the named elements from initialized XAML. The most common such property is ```StyledElement.Name```. You might still use x:Name when the equivalent Avalonia framework-level Name property is not supported in a particular type. 
* ```x:Static```: Enables a reference that returns a static value that is not otherwise a XAML-compatible property.
* ```x:Type```: Constructs a Type reference based on a type name. This is used to specify attributes that take Type, such as Style.Selector, although frequently the property has native string-to-Type conversion in such a way that the ```x:Type``` markup extension usage is optional.

## Custom prefixes and custom types in XAML
For your own custom assemblies, or for assemblies outside the Avalonia, you can specify the assembly as part of a custom ```xmlns``` mapping. You can then reference types from that assembly in your XAML, so long as that type is correctly implemented to support the XAML usages you are attempting.

The following is a basic example of how custom prefixes work in XAML markup. The prefix ```custom``` is defined in the root element tag, and mapped to a specific assembly that is packaged and available with the app. This assembly contains a type ```NumericUpDown```, which is implemented to support general XAML usage as well as using a class inheritance that permits its insertion at this particular point in a Avalonia XAML content model. An instance of this ```NumericUpDown``` control is declared as an object element, using the prefix so that a XAML parser knows which XAML namespace contains the type, and therefore where the backing assembly is that contains the type definition.


```xml
<Window
    xmlns="https://github.com/avaloniaui"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:custom="clr-namespace:NumericUpDownCustomControl;assembly=CustomLibrary"
    >
  <StackPanel Name="LayoutRoot">
    <custom:NumericUpDown Name="numericCtrl1" Width="100" Height="60"/>
...
  </StackPanel>
</Window>
```

For more information about custom types in XAML, see [XAML and Custom Classes for Avalonia](/docs/concepts/xaml/xaml-and-custom-classes).

For more information about how XML namespaces and code namespaces in assemblies are related, see [XAML Namespaces and Namespace Mapping](/docs/concepts/xaml/xaml-namespaces-and-namespace-mapping).

## Events and XAML code-behind

Most Avalonia apps consist of both XAML markup and code-behind. Within a project, the XAML is written as a ```.axaml``` file, and a CLR language such as Visual Basic, C# or F# is used to write a code-behind file. When a XAML file is markup compiled as part of the WPF programming and application models, the location of the XAML code-behind file for a XAML file is identified by specifying a namespace and class as the ```x:Class``` attribute of the root element of the XAML.

In the examples so far, you have seen several buttons, but none of these buttons had any logical behavior associated with them yet. The primary application-level mechanism for adding a behavior for an object element is to use an existing event of the element class, and to write a specific handler for that event that is invoked when that event is raised at run-time. The event name and the name of the handler to use are specified in the markup, whereas the code that implements your handler is defined in the code-behind.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="ExampleApp.Views.MainWindow"
        Title="ExampleApp">
        <Button Click="Button_OnClick" >Click Me!</Button>
</Window>
```
```csharp
namespace ExampleApp.Views
{
  public partial class MainWindow : Window
  {
    void Button_OnClick(object? sender, RoutedEventArgs e)
    {
      Button b = e.Source as Button;
      b.Foreground = Brushes.Red;
    }
  }
}
```

Notice that the code-behind file uses the CLR namespace ```ExampleApp.Views``` and declares MainWindow as a partial class within that namespace. This parallels the x:Class attribute value of ```ExampleApp.Views.MainWindow``` that was provided in the markup root. The Avalonia XAML compiler will create a partial class for any compiled XAML file, by deriving a class from the root element type. When you provide code-behind that also defines the same partial class, the resulting code is combined within the same namespace and class of the compiled app.

For more information about requirements for code-behind programming in Avalonia, see [Code-behind, Event Handler, and Partial Class Requirements](/docs/concepts/xaml/code-behind-and-xaml).

If you do not want to create a separate code-behind file, you can also inline your code in a XAML file. However, inline code is a less versatile technique that has substantial limitations. For more informaiton, see [Code-Behind and XAML](/docs/concepts/xaml/code-behind-and-xaml).

## Routed events
A particular event feature that is fundamental to Avalonia is a routed event. Routed events enable an element to handle an event that was raised by a different element, as long as the elements are connected through a tree relationship. When specifying event handling with a XAML attribute, the routed event can be listened for and handled on any element, including elements that do not list that particular event in the class members table. This is accomplished by qualifying the event name attribute with the owning class name. For instance, the parent ```StackPanel``` in the ongoing ```StackPanel``` / ```Button``` example could register a handler for the child element button's Click event by specifying the attribute ```Button.Click``` on the ```StackPanel``` object element, with your handler name as the attribute value. For more information, see [Routed Events Overview](/docs/concepts/input/routed-events).



