---
id: styles
title: Styles
description: Learn how the Avalonia style system selects controls and applies property setters using CSS-like selectors and style classes.
doc-type: concept
---

The Avalonia style system is a mechanism that can share property settings between controls.
Avalonia provides three primary mechanisms for styling controls:

## Styles

- [Styles](/docs/styling/styles) are similar to CSS styles and are usually used to style controls based on their content or purpose within the application; for example creating a style for header text blocks.

## Control themes

- [Control Themes](/docs/styling/control-themes) are similar to WPF/UWP styles and are usually used to apply a theme to controls.

## Container queries

- [Container Queries](/docs/styling/container-queries) are a collection of styles applied based on the size of a container.

## How it works

In essence, the styling mechanism has two steps: selection and substitution. The XAML for the style can define how both of these steps work, but often you help the selection step by defining 'class' labels on your control elements.

:::info
The Avalonia styling system's use of 'class' labels on control elements is analogous to how CSS (cascading style sheets) work with HTML elements.
:::

The styling system implements cascading styles by searching the [logical tree](/docs/custom-controls/control-trees) upwards from a control, during the selection step. This means styles defined at the highest level of the application (the `App.axaml` file) can be used anywhere in an application, but may still be overridden closer to a control (for example in a window, or user control).

When a match is located by the selection step, then the matched control's properties are altered according to the setters in the style.

## How it is written

The XAML for a style has two parts: a selector attribute, and one or more setter elements. The selector value contains a string that uses the Avalonia **style selector syntax**. Each setter element identifies the property that will be changed by name, and the new value that will be substituted. The pattern is like this:

```xml
<Style Selector="selector syntax">
     <Setter Property="property name" Value="new value"/>
     ...
</Style>
```

:::info
The Avalonia **style selector syntax** is analogous to that used by CSS (cascading style sheets). For detailed reference information, see the [style selector syntax reference](/docs/styling/style-selector-syntax).
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

Styles are placed inside a `Styles` collection element on a `Control` or on the `Application`. For example, a window styles collection looks like this:

```xml
<Window.Styles>
   <Style> ...  </Style>
</Window.Styles>
```

The location of a styles collection defines the scope of the styles it contains. In the above example, the styles will apply to the window and all of its contents. If a style is added to the `Application` then it will apply globally.

## The selector

The style selector defines what controls the style will act upon. The selector uses a variety of formats, one of the simplest is this:

```xml
<Style Selector="TargetControlClass.styleClassName">
```

This selector will match all controls with a style key of `TargetControlClass`, having a style class of `styleClassName`.

:::info
A full list of selectors can be found in the [style selector syntax reference](/docs/styling/style-selector-syntax).
:::

## Setters

Setters describe what will happen when the selector matches a control. They are simple property/value pairs written in the format:

```xml
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

Whenever a style is matched with a control, all of the setters within the style will be applied to the control.

:::info
For more information on setters, see the [property setters reference](/docs/styling/property-setters).
:::

## Nested styles

Styles can be nested in other styles. To nest a style, include the child style as a child of the parent `<Style>` element, and start the selector with the [`Nesting Selector (^)`](/docs/styling/style-selector-syntax):

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

When this happens, the selector from the parent style will automatically apply to the child style. In the above example the nested style will effectively have a selector of `TextBlock.h1:pointerover`, meaning that it will display with a red foreground when the pointer is over the control.

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
Note that this logic is inverted as compared with WPF/UWP: in those frameworks, when you derive a new control it will be styled as its base control unless you override the `DefaultStyleKey` property. In Avalonia the control will be styled using its concrete type unless a different style key is provided.
:::

:::info
Before Avalonia 11, the style key was overridden by implementing `IStyleable` and providing a new implementation of the `IStyleable.StyleKey` property. This mechanism is still supported in Avalonia 11 for compatibility, but may be removed in a future version.
:::

## Styles and resources

Resources are often used with styles to help maintain consistent presentation. Resources can help define standard colors and icons in an application; or across multiple applications when included from separate files.

:::info
For guidance on how to use resources in your application, see the [resource dictionary guide](/docs/app-development/resource-dictionary).
:::

## See also

- [Style Selector Syntax](/docs/styling/style-selector-syntax): Full reference for selector syntax.
- [Style Classes](/docs/styling/style-classes): How to define and use style classes on controls.
- [Control Themes](/docs/styling/control-themes): How to apply a theme to controls.
- [Sharing Styles](/docs/styling/sharing-styles): How to share styles by including a styles file.
- [Resource Dictionary](/docs/app-development/resource-dictionary): How to define and use resources with styles.
