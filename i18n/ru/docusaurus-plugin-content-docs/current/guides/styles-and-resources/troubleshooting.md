---
id: troubleshooting
title: How To Troubleshoot Styles
---


# 👉 How To Troubleshoot Styles

Much of the _Avalonia UI_ styling system corresponds to CSS styling approaches. So without knowledge of this technology, you may find the hints here helpful.

## Selector has no Targets

An _Avalonia UI_ selector, like a CSS selector, does not raise an error or warning when there are no controls which can be matched. The style will silently fail to show.

:::info
Check whether you have used a name or class that does not exist.
:::

:::info
Check whether you have used a child selector where there are no children to match.
:::

## Include File Sequence

Styles are applied in order of declaration. If there are multiple style files included that target the same control property, the last style included will override the previous ones. For example:

```xml
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Green" />
</Style>
```

```xml
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Blue" />
    <Style Property="FontSize" Value="16" />
</Style>
```

```xml
<StyleInclude Source="Style1.axaml" />
<StyleInclude Source="Style2.axaml" />
```

Here styles from file **Styles1.axaml** were applied first, so setters in styles of file **Styles2.axaml** take priority. The resulting TextBlock will have FontSize="16" and Foreground="Green". The same order prioritization happens within style files also.

## Locally Set Properties Have Priority

A local value defined directly on a control often has higher priority than any style value. So in this example the text block will have a red foreground:

```xml
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
...
<TextBlock Classes="header" Foreground="Red" />
```

You can see the full list of value priorities in the `BindingPriority` enum, where lower enum values have the higher priority.

<table><thead><tr><th width="218">BindingPriority </th><th width="147.33333333333331">Value</th><th>Comment</th></tr></thead><tbody><tr><td><code>Animation</code></td><td>-1</td><td>The highest priority - even overrides a local value</td></tr><tr><td><code>LocalValue</code></td><td>0</td><td>A local value is set on the property of the control.</td></tr><tr><td><code>StyleTrigger</code></td><td>1</td><td>This is triggered when a pseudo class becomes active.</td></tr><tr><td><code>TemplatedParent</code></td><td>2</td><td></td></tr><tr><td><code>Style</code></td><td>3</td><td></td></tr><tr><td><code>Unset</code></td><td>2147483647</td><td></td></tr></tbody></table>

:::warning
The exception is that `Animation` values have the highest priority and can even override local values.
:::

:::info
Some default _Avalonia UI_ styles use local values in their templates instead of template bindings or style setters. This makes it impossible to update the template property without replacing the whole template.
:::

### Missing style pseudo class (trigger) selector

Let's imagine a situation in which you might expect a second style to override previous one, but it doesn't:

```xml
<Style Selector="Border:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
<Style Selector="Border">
    <Setter Property="Background" Value="Red" />
</Style>
...
<Border Width="100" Height="100" Margin="100" />
```

With this code example the `Border` has a Red background normally and Blue when the pointer is over it. This is because as with CSS more specific selectors have precedence. It is an issue, when you want to override default styles of any state (pointerover, pressed or others) with a single style. To achieve it you will need to have new styles for these states as well.

:::info
Visit the Avalonia source code to find the [original templates](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls) when this happens and copy and paste the styles with pseudoclasses into your code.
:::

### Selector with a pseudoclass doesn't override the default

The following code example of styles that can be expected to work on top of default styles:

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="Red" />
</Style>
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
```

You might expect the `Button` to be red by default and blue when pointer is over it. In fact, only setter of first style will be applied, and second one will be ignored.

The reason is hidden in the Button's template. You can find the default templates in the Avalonia source code (old [Default](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Default/Button.xaml) theme and new [Fluent](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Controls/Button.xaml) theme), but for convenience here we have simplified one from the Fluent theme:

```xml
<Style Selector="Button">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}"/>
    <Setter Property="Template">
        <ControlTemplate>
            <ContentPresenter Name="PART_ContentPresenter"
                              Background="{TemplateBinding Background}"
                              Content="{TemplateBinding Content}"/>
        </ControlTemplate>
    </Setter>
</Style>
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}" />
</Style>
```

The actual background is rendered by a `ContentPresenter`, which in the default is bound to the Buttons `Background` property. However in the pointer-over state the selector is directly applying the background to the `ContentPresenter (Button:pointerover /template/ ContentPresenter#PART_ContentPresenter`) That's why when our setter was ignored in the previous code example. The corrected code should target content presenter directly as well:

```xml
<!-- Here #PART_ContentPresenter name selector is not necessary, but was added to have more specific style -->
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Blue" />
</Style>
```

:::info
You can see this behavior for all controls in the default themes (both old Default and the new Fluent), not just Button. And not just for Background, but also other state-dependent properties.
:::

:::info
Why default styles change the ContentPresenter `Background` property directly instead of changing the `Button.Background` property?

This is because if the user were to set a local value on the button, it would override all styles, and make button always the same color. For more details see this [reverted PR](https://github.com/AvaloniaUI/Avalonia/pull/2662#issuecomment-515764732).
:::

### Previous value of specific properties is not restored when style is not applied anymore

In Avalonia we have multiple types of properties, and one of them, Direct Property, doesn't support styling at all. These properties work in simplified way to achieve lower overhead and higher performance, and do not store multiple values depending on priority. Instead only latest value is saved and cannot be restored. You can find more details about properties [here](../custom-controls/defining-properties).

Typical example is [CommandProperty](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/B9689B29). It is defined as a DirectProperty, and it will never work properly. In the future attempt to style direct property will be resulted in compile time error, see [#6837](https://github.com/AvaloniaUI/Avalonia/issues/6837).
