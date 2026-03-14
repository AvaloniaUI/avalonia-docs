---
id: styles
title: Styles
description: Learn how to use Avalonia styles, selectors, and setters to share property settings between controls.
doc-type: concept
---

The Avalonia style system is a mechanism that shares property settings between controls.
Avalonia provides three primary mechanisms for styling controls:

## Styles

- [Styles](/docs/styling/styles) are similar to CSS styles and are usually used to style controls based on their content or purpose within the application; for example creating a style for header text blocks.

## Control themes

- [Control themes](/docs/styling/control-themes) are similar to WPF/UWP styles and are usually used to apply a theme to controls.

## Container queries
- [Container queries](/docs/styling/container-queries) are a collection of styles that are applied based on the size of a container.

## How it works

In essence, the styling mechanism has two steps: selection and substitution. You can define how both steps work in XAML, but often you help the selection step by defining 'class' labels on control elements.

:::info
The Avalonia styling system's use of 'class' labels on control elements is analogous to how CSS (cascading style sheets) work with HTML elements.
:::

The styling system implements cascading styles by searching the [logical tree](/docs/custom-controls/control-trees) upwards from a control during the selection step. This means styles defined at the highest level of your application (the `App.axaml` file) can be used anywhere, but may still be overridden closer to a control (for example, in a window or user control).

When a match is located by the selection step, then the matched control's properties are altered according to the setters in the style.

## How styles are written

A style in XAML has two parts: a selector attribute and one or more setter elements. The selector value contains a string that uses the Avalonia **style selector syntax**. Each setter element identifies the property to change by name and the new value to substitute. The pattern looks like this:

```xml
<Style Selector="selector syntax">
     <Setter Property="property name" Value="new value"/>
     ...
</Style>
```

:::info
The Avalonia **style selector syntax** is analogous to that used by CSS (cascading style sheets). For detailed reference information, see the [style selector syntax](/docs/styling/style-selector-syntax) reference.
:::

## Example

This is an example of how a style is written and applied to a control element, with a [style class](/docs/styling/style-classes) to help selection:

```xml
<Window ... >
    <Window.Styles>
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
            <Setter Property="FontWeight" Value="Bold"/>
        </Style>
    </Window.Styles>
    <StackPanel Margin="20">
       <TextBlock Classes="h1">Heading 1</TextBlock>
    </StackPanel>
</Window>
```

In this example, all `TextBlock` elements with the `h1` style class will be displayed with the font size and weight set by the style.

## Where to put styles

You place styles inside a `Styles` collection element on a `Control` or on the `Application`. For example, a window styles collection looks like this:

```xml
<Window.Styles>
   <Style> ...  </Style>
</Window.Styles>
```

The location of a styles collection defines the scope of the styles it contains. In the above example, the styles apply to the window and all of its contents. If you add a style to the `Application`, it applies globally.

## The selector

The style selector defines which controls the style acts upon. The selector uses a variety of formats. One of the simplest is:

```xml
<Style Selector="TargetControlClass.styleClassName">
```

This selector matches all controls with a style key of `TargetControlClass` that have a style class of `styleClassName`.

:::info
A full list of selectors can be found in the [style selector syntax](/docs/styling/style-selector-syntax) reference.
:::

## Setters

Setters describe what happens when the selector matches a control. They are simple property/value pairs written in the format:

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

Whenever a style matches a control, all of the setters within the style are applied to that control.

:::info
For more information on setters, see [property setters](/docs/styling/property-setters).
:::

## Nested styles

Styles can be nested in other styles. To nest a style, include the child style as a child of the parent `<Style>` element, and start the selector with the [`Nesting selector (^)`](/docs/styling/style-selector-syntax):

```xml
<Style Selector="TextBlock.h1">
    <Setter Property="FontSize" Value="24"/>
    <Setter Property="FontWeight" Value="Bold"/>
    
    // highlight-start
    <Style Selector="^:pointerover">
        <Setter Property="Foreground" Value="Red"/>
    </Style>
    // highlight-end
</Style>
```

When you nest styles, the selector from the parent style automatically applies to the child style. In the above example, the nested style effectively has a selector of `TextBlock.h1:pointerover`, meaning it displays with a red foreground when the pointer is over the control.

:::info
The nesting selector must be present and must appear at the start of the child selector.
:::

## Style key

The type of an object matched by a style selector is not determined by the concrete type of the control, but rather by examining its `StyleKey` property.

By default, the `StyleKey` property returns the type of the current instance. However, if you want your control, which inherits from `Button`, to be styled as a `Button`, you can override the `StyleKeyOverride` property in your class and have it return `typeof(Button)`.

```csharp
public class MyButton : Button
{
    // `MyButton` will be styled as a standard `Button` control.
    protected override Type StyleKeyOverride => typeof(Button);
}
```

:::info
Note that this logic is inverted compared with WPF/UWP: in those frameworks, when you derive a new control it is styled as its base control unless you override the `DefaultStyleKey` property. In Avalonia, the control is styled using its concrete type unless you provide a different style key.
:::

:::info
Before Avalonia 11, you overrode the style key by implementing `IStyleable` and providing a new implementation of the `IStyleable.StyleKey` property. This mechanism is still supported in Avalonia 11 for compatibility, but may be removed in a future version.
:::

## Styles and resources

Resources are often used with styles to help maintain consistent presentation. You can use resources to define standard colors and icons in your application, or across multiple applications when included from separate files.

:::info
For guidance on how to use resources in your application, see [resource dictionaries](/docs/app-development/resource-dictionary).
:::

## See also

- [Sharing styles](/docs/styling/sharing-styles)
- [Style classes](/docs/styling/style-classes)
- [Style selector syntax](/docs/styling/style-selector-syntax)
- [Property setters](/docs/styling/property-setters)
- [Resource dictionaries](/docs/app-development/resource-dictionary)
