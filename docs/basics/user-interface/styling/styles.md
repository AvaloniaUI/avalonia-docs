---
id: styles
title: Styles
---

# Styles

The _Avalonia UI_ style system is a mechanism that can share property settings between controls. 

:::tip
A `Style` in Avalonia is more similar to a CSS style than a WPF/UWP style. The equivalent of a WPF/UWP Style in Avalonia is a [`ControlTheme`](control-themes).
:::

## How It Works

In essence, the styling mechanism has two steps: selection and substitution. The XAML for the style can define how both of these steps are to be done, but often you will help the selection step by defining 'class' labels on control elements.

:::info
The _Avalonia UI_ styling system's use of 'class' labels on control elements is analogous to how CSS (cascading style sheets) work with HTML elements.&#x20;
:::

The styling system implements cascading styles by searching the **logical control tree** upwards from a control, during the selection step. This means styles defined at the highest level of the application (in the `App.axaml` file) can be used anywhere in an application, but may still be overridden closer to a control (for example in a window, or user control).

:::info
To review the concept of the _Avalonia UI_ **logical control tree**, see [here](../../../concepts/control-trees.md).&#x20;
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
The _Avalonia UI_ **style selector syntax** is analogous to that used by CSS (cascading style sheets). For detailed reference information, see [here](../../../reference/styles/style-selector-syntax.md). &#x20;
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

<img src="/img/gitbook-import/assets/image (5) (5).png" alt=""/>

## Style Key

The type of an object matched by a style selector is not determined by the concrete type of the control, but rather by examining its `StyleKey` property.

By default, the `StyleKey `property returns the type of the current instance. However, if you want your control, which inherits from Button, to be styled as a Button, you can override the `StyleKeyOverride` property in your class and have it return `typeof(Button)`.

```csharp
public class MyButton : Button
{
    // `MyButton` will be styled as a standard `Button` control.
    protected override Type StyleKeyOverride => typeof(Button);
}
```

:::info
Note this this logic is inverted as compared with WPF/UWP: in those frameworks, when you derive a new control it will be styled as its base control unless you override the `DefaultStyleKey` property. In Avalonia the control will be styled using its concrete type unless a different style key is provided.
:::

:::info
Before Avalonia 11, the style key was overridden by implementing `IStyleable` and providing a new implementation of the `IStyleable.StyleKey` property. This mechanism is still supported in Avalonia 11 for compatibility, but may be removed in a future version.
:::

## Nesting Styles

Styles can be nested in other styles. To nest a style, simply include the child style as a child of the parent `<Style>` element, and start the selector with the [`Nesting Selector (^)`](../../../reference/styles/style-selector-syntax.md#nesting):

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

## Styles and Resources

Resources are often used with styles to help maintain consistent presentation. Resources can help define standard colors and icons in an application; or across multiple applications when included from separate files.

:::info
For guidance on how to use resources in you application, see [here](../../../guides/styles-and-resources/resources.md).
:::

## Further Information

:::info
For guidance on how to share styles by including a styles file, see [here](../../../guides/styles-and-resources/how-to-use-included-styles.md).
:::
