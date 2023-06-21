---
description: CONCEPTS
---

# Styling

The _Avalonia UI_ styling system is a mechanism that can share property settings between controls. It has many practical uses for your application developments, for example:

* Ensure consistent styling within an application
* Ensure consistent styling across a suite of applications
* Creating themes
* Templated control development

## How It Works

In essence, the styling mechanism has two steps: selection and substitution. The XAML for the style can define how both of these steps are to be done, but often you will help the selection step by defining 'class' labels on control elements.

:::info
The _Avalonia UI_ styling system's use of 'class' labels on control elements is analogous to how CSS (cascading style sheets) work with HTML elements.&#x20;
:::

The styling system implements cascading styles by searching the **logical control tree** upwards from a control, during the selection step. This means styles defined at the highest level of the application (in the `App.axaml` file) can be used anywhere in an application, but may still be overridden closer to a control (for example in a window, or user control).

:::info
To review the concept of the _Avalonia UI_ **logical control tree**, see [here](control-trees.md).&#x20;
:::

When a match is located by the selection step, then the matched control's properties are altered following the (setter) instructions in the style. To complete the cascading style, a matched style on a control is also applied to any inner controls.&#x20;

## How it is Written

The XAML for a style has two parts: a selector attribute, and one or more setter elements. The selector value contains a string that uses the _Avalonia UI_ **style selector syntax**. Each setter element identifies the property that will be changed by name, and the new value that will be substituted. The pattern is like this:

```
<Style Selector="selector syntax">
     <Setter Property="property name" Value="new value"/>
     ...
</Style>
```

:::info
The _Avalonia UI_ **style selector syntax** is analogous to that used by CSS (cascading style sheets). For detailed reference information, see [here](../reference/styles/style-selector-syntax.md). &#x20;
:::

## Example

This is an example of how a style is written and applied to a control element, with a style class to help selection:

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

In this example, the `h1` style class applies only to `<TextBlock>`elements, and the text block control will display with the font size and weight set by the style. This works in the preview pane:

<img src="../.gitbook/assets/image (5) (5).png" alt=""/>

## Styles and Resources

Resources are often used with styles to help maintain consistent presentation. Resources can help define standard colors and icons in an application; or across multiple applications when included from separate files.

:::info
For guidance on how to use resources in you application, see [here](../guides/styles-and-resources/resources.md).
:::

## Further Information

:::info
For guidance on how to share styles by including a styles file, see [here](../guides/styles-and-resources/how-to-use-included-styles.md).
:::
