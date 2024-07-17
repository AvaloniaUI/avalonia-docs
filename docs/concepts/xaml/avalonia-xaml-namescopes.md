---
description: CONCEPTS
---

# XAML Namescopes

XAML namescopes are a concept that identifies objects that are defined in XAML. The names in a XAML namescope can be used to establish relationships between the XAML-defined names of objects and their instance equivalents in an object tree. Typically, XAML namescopes in Avalonia managed code are created when loading the individual XAML page roots for a XAML application. XAML namescopes as the programming object are defined by the [INameScope](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Controls/INameScope.cs#L10) interface and are also implemented by the practical class [NameScope](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Controls/NameScope.cs).

## Namescopes in Loaded XAML Applications

In a broader programming or computer science context, programming concepts often include the principle of a unique identifier or name that can be used to access an object. For systems that use identifiers or names, the namescope defines the boundaries within which a process or technique will search if an object of that name is requested, or the boundaries wherein uniqueness of identifying names is enforced. These general principles are true for XAML namescopes. In Avalonia, XAML namescopes are created on the root element for a XAML page when the page is loaded. Each name specified within the XAML page starting at the page root is added to a pertinent XAML namescope.

In Avalonia XAML, elements that are common root elements (such as [UserControl](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs) and [Window](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Window.cs)) always control a XAML namescope. If an element such as Control or ContentControl is the root element of the page in markup, Avalonia ensures that a working XAML namescope is provided.

:::note
Avalonia's build process creates a XAML namescope for a XAML production even if no ```Name``` or ```x:Name``` attributes are defined on any elements in the XAML markup.
:::

If you try to use the same name twice in any XAML namescope, an exception is raised. For Avalonia XAML that has code-behind and is part of a compiled application, the exception is typically raised at runtime when the XAML is loaded. Avalonia's XAML previewer and other design-time tools may also anticipate and highlight XAML namescope issues during development.

## Adding Objects to Runtime Object Trees

The moment that XAML is parsed represents the time when an Avalonia XAML namescope is created and defined. If you add an object to an object tree after the XAML that produced that tree was parsed, setting a Name or x:Name value on the new object will automatically update the information in the XAML namescope. This is different from WPF and simplifies the process of adding named objects dynamically.

To add a named object to an Avalonia object tree after XAML is loaded:

1. Create the object
2. Set its Name property
3. Add it to the visual tree

Avalonia will automatically handle registering the name in the appropriate namescope. The added object can then be referenced by name through methods such as ```FindControl<T>```, and you can use that name for animation targeting.

## XAML Namescopes in Code

While you typically don't need to interact directly with XAML namescopes in Avalonia, the concept still exists behind the scenes. The XAML processor for Avalonia uses these concepts when it processes XAML. The primary purpose is to enable finding objects by name within an object tree that is typically defined partially or entirely in XAML.

For applications that are created programmatically, and not from loaded XAML, named objects are handled in the same way as they are in XAML. Simply set the ```Name``` property of a control, and Avalonia will handle the registration in the appropriate namescope.

To find a control by name in code, use the ```FindControl<T>``` method:

```csharp
var myButton = this.FindControl<Button>("MyButtonName");
```

This method searches the visual tree starting from the control it's called on, looking for a control of the specified type with the given name.

Avalonia's approach simplifies the process of working with named controls, eliminating the need for explicit namescope manipulation in most scenarios. This design choice makes it easier to work with dynamically created UIs while maintaining the ability to reference controls by name.

## XAML Namescopes in Styles and Templates

Styles and templates in Avalonia provide the ability to reuse and reapply content in a straightforward way. However, styles and templates might also include elements with names defined at the template level. That same template might be used multiple times in a page. For this reason, styles and templates both define their own namescopes, independent of whatever location in an object tree where the style or template is applied.

Consider the following example:

```xml
<UserControl
  xmlns="https://github.com/avaloniaui"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <UserControl.Resources>
    <ControlTemplate x:Key="MyButtonTemplate" TargetType="Button">
      <Border BorderBrush="Red" Name="TheBorder" BorderThickness="2">
        <ContentPresenter Content="{TemplateBinding Content}"/>
      </Border>      
    </ControlTemplate>
  </UserControl.Resources>
  <StackPanel>
    <Button Template="{StaticResource MyButtonTemplate}">My first button</Button>
    <Button Template="{StaticResource MyButtonTemplate}">My second button</Button>
  </StackPanel>
</UserControl>
```

Here, the same template is applied to two different buttons. If templates did not have discrete namescopes, the ```TheBorder``` name used in the template would cause a name collision. Each instantiation of the template has its own namescope, so in this example each instantiated template's namescope would contain exactly one name.

Styles also define their own namescope, primarily to support animations that target elements by name, even if the template was redefined as part of control customization.

Because of the separate namescopes, finding named elements in a template is more challenging than finding a non-templated named element in a page. In Avalonia, you can use the ```GetTemplateChildren<T>``` method to find named elements within a template. This method returns all elements of type T with the specified name in the template.

If you are a control author and you are generating a convention where a particular named element in an applied template is the target for a behavior that is defined by the control itself, you can use the ```GetTemplateChild<T>``` method from your control implementation code.

If you are working from within a template and need to get to the namescope where the template is applied, you can use the ```TemplatedParent``` property to access the control to which the template is applied, and then use ```FindControl<T>``` on that control.

In Avalonia, these mechanisms provide a balance between the flexibility of reusable templates and the need to access specific elements within those templates when necessary.

## XAML Namescopes and Name-related APIs

[StyledElement](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/StyledElement.cs) has FindControl, while RegisterName and UnregisterName methods are typically not used directly in Avalonia. If the object you call FindControl on owns a XAML namescope, the method searches within that namescope. Otherwise, the parent element is checked to see if it owns a XAML namescope, and this process continues recursively until a XAML namescope is found.

In Avalonia, namescopes are typically managed automatically, with Controls creating a [NameScope](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Controls/NameScope.cs) when needed, usually when a named element is added to their visual tree.

### XAML Namescope Implementations

The following classes are involved in namescope handling in Avalonia:

* [NameScope](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Controls/NameScope.cs)
* [Style](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Styling/Style.cs)
* [ResourceDictionary](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Controls/ResourceDictionary.cs)
* [ControlTemplate](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Markup/Avalonia.Markup.Xaml/Templates/ControlTemplate.cs)

ResourceDictionary uses keys instead of names, as it is a dictionary implementation.
ControlTemplate and Style implement their own namescope behavior to allow for reuse of named elements across multiple instances.

The following classes in Avalonia define their own XAML namescope:

* [Control](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Control.cs)
* [Visual](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Visual.cs)

This adaptation maintains the structure of the original while accurately representing Avalonia's approach to XAML namescopes.