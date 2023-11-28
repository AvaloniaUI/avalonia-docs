---
id: troubleshooting
title: Troubleshooting
---
Avalonia styling system is a mix of XAML and CSS styling approaches, so developers with knowledge of only one of these technologies can be confused by details of another one.

Let's imagine a problem when one or all style setters are not applied to the control. Below we will list common possible reasons and solutions.

### Selector targets a control that doesn't exist

Avalonia selectors, like CSS selectors, do not raise any errors or warnings, when there are no controls which can be matched by the selector. This includes using a name or class that doesn't exist or a child selector when there are no children to match the inner selector. The reason is simple, one style can target many controls, that can be created or removed at runtime, so there is no possible way to validate the selector.

### Target property is overridden by another style

Styles are applied in order of declaration. If there are **multiple** style files that target the same control property, one style can override the other:

```markup title="Styles1.axaml"
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Blue" />
    <Style Property="FontSize" Value="16" />
</Style>
```


```markup title="Styles2.axaml"
<Style Selector="TextBlock.header">
    <Style Property="Foreground" Value="Green" />
</Style>
```

```markup title="App.axaml"
<StyleInclude Source="Style1.axaml" />
<StyleInclude Source="Style2.axaml" />
```


Here styles from file **Styles1.axaml** were applied first, so setters in styles of file **Styles2.axaml** take priority. The resulting TextBlock will have FontSize="16" and Foreground="Green". The same order prioritization happens within style files also.

### Locally set Properties override Styles

Similarly, to WPF, Avalonia properties can have multiple values, often of different priorities.

In this example you can see that local value (defined directly on the control) has higher priority than style value, so text block will have red foreground:

```markup
<TextBlock Classes="header" Foreground="Red" />
...
<Style Selector="TextBlock.header">
    <Setter Property="Foreground" Value="Green" />
</Style>
```

You can see the full list of value priorities in the [BindingPriority](http://reference.avaloniaui.net/api/Avalonia.Data/BindingPriority/) enum, where lower enum values have higher priority. For example `Animation` values have the highest priority and even override local values.

:::info
Some default Avalonia styles use local values in their templates instead of template bindings or styles-setters, which makes it impossible to update template property without replacing whole template.
:::

### Missing style pseudoclass (trigger) selector

Let's imagine a situation in which you might expect a second style to override previous one, but it doesn't:

```markup
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

```markup
<Style Selector="Button">
    <Setter Property="Background" Value="Red" />
</Style>
<Style Selector="Button:pointerover">
    <Setter Property="Background" Value="Blue" />
</Style>
```

You might expect the `Button` to be red by default and blue when pointer is over it. In fact, only setter of first style will be applied, and second one will be ignored.

The reason is hidden in the Button's template. You can find the default templates in the Avalonia source code (old [Default](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Default/Button.xaml) theme and new [Fluent](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Themes.Fluent/Controls/Button.xaml) theme), but for convenience here we have simplified one from the Fluent theme:

```markup
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

```markup
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

In Avalonia we have multiple types of properties, and one of them, Direct Property, doesn't support styling at all. These properties work in simplified way to achieve lower overhead and higher performance, and do not store multiple values depending on priority. Instead only latest value is saved and cannot be restored. You can find more details about properties [here](../authoring-controls/defining-properties.md#direct-avaloniaproperties).

Typical example is [CommandProperty](http://reference.avaloniaui.net/api/Avalonia.Controls/Button/B9689B29). It is defined as a DirectProperty, and it will never work properly.
In the future attempt to style direct property will be resulted in compile time error, see [#6837](https://github.com/AvaloniaUI/Avalonia/issues/6837).