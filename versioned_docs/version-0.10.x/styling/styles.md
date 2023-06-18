---
id: styles
title: Styles
---

Styles in Avalonia are used to share property settings between controls. The Avalonia styling system can be thought of as a mix of CSS styling and WPF/UWP styling. At its most basic, a style consists of a _selector_ and a collection of _setters_.

A style applies to the control that it is defined on and all descendent controls.

The following style selects any `TextBlock` with a `h1` _style class_ and sets its font size to 24 point and font weight to bold:

```markup
<Style Selector="TextBlock.h1">
    <Setter Property="FontSize" Value="24"/>
    <Setter Property="FontWeight" Value="Bold"/>
</Style>
```

Styles can be defined on any control or on the `Application` object by adding them to the [`Control.Styles`](http://reference.avaloniaui.net/api/Avalonia/StyledElement/0A46A84A) or [`Application.Styles`](http://reference.avaloniaui.net/api/Avalonia/Application/04017CAF) collections.

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Window.Styles>
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
            <Setter Property="FontWeight" Value="Bold"/>
        </Style>
    </Window.Styles>

    <TextBlock Classes="h1">I'm a Heading!</TextBlock>
</Window>
```

Styles can also be included from other files using the `StyleInclude` class, e.g.:

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Window.Styles>
        <StyleInclude Source="/CustomStyles.xaml" />
    </Window.Styles>

    <TextBlock Classes="h1">I'm a Heading!</TextBlock>
</Window>
```

Where `CustomStyles.xaml` is a XAML file with a root of either `Style` or `Styles` and is included as an [asset](../getting-started/assets.md) in the application, e.g.:

CustomStyles.xaml

```markup
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style Selector="TextBlock.h1">
        ...
    </Style>
</Styles>
```

Note that unlike WPF/UWP, styles will have no effect if they're added to a control or application `ResourceDictionary`. This is because the order that styles are defined in Avalonia is important and `ResourceDictionary` is an unsorted dictionary.

### Style Classes <a id="style-classes"></a>

As in CSS, controls can be given _style classes_ which can be used in selectors. Style classes can be assigned in XAML by setting the `Classes` property to a space-separated list of strings. The following example applies the `h1` and `blue` style classes to a `Button`:

```markup
<Button Classes="h1 blue"/>
```

If you need to add or remove class by condition, you can use the following special syntax:
```markup
<Button Classes.blue="{Binding IsSpecial}" />
```

Style classes can also be manipulated in code using the `Classes` collection:

```csharp
control.Classes.Add("blue");
control.Classes.Remove("red");
```

### Pseudoclasses <a id="pseudoclasses"></a>

Also as in CSS, controls can have pseudoclasses; these are classes that are defined by the control itself rather than by the user. Pseudoclasses start with a `:` character.

One example of a pseudoclass is the `:pointerover` \(similar to `:hover` in CSS\).

Pseudoclasses provide the functionality of `Triggers` in WPF and `VisualStateManager` in UWP:

```markup
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Border:pointerover">
      <Setter Property="Background" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Border>
    <TextBlock>I will have red background when hovered.</TextBlock>
  </Border>
</StackPanel>
```

Another example that involves changing properties inside of control [template](selectors.md#template):

```markup
<StackPanel>
  <StackPanel.Styles>
    <Style Selector="Button:pressed /template/ ContentPresenter">
        <Setter Property="TextBlock.Foreground" Value="Red"/>
    </Style>
  </StackPanel.Styles>
  <Button>I will have red text when pressed.</Button>
</StackPanel>
```

Other pseudoclasses include `:focus`, `:disabled`, `:pressed` for buttons, `:checked` for checkboxes etc.

### Custom PseudoClasses  <a id="custom-pseudoclasses"></a>

You can create own pseudoclasses for your `CustomControl` or `TemplatedControl`.
The function below adds or remove a pseudoclass depending on a boolean value on a `StyledElement`.
```csharp
PseudoClasses.Set(":className", bool);
```
***Remember:** PseudoClasses always starts with a `:`!*

### Selectors <a id="selectors"></a>

_Selectors_ select a control using a custom selector syntax which is very similar to the syntax used for CSS selectors. An example of some selectors:

| Selector | Description |
| :--- | :--- |
| `Button` | Selects all `Button` controls |
| `Button.red` | Selects all `Button` controls with the `red` style class |
| `Button.red.large` | Selects all `Button` controls with the `red` and `large` style classes |
| `Button:focus` | Selects all `Button` controls with the `:focus` pseudoclass |
| `Button.red:focus` | Selects all `Button` controls with the `red` style class and the `:focus` pseudoclass |
| `Button#myButton` | Selects a `Button` control with a name of `myButton` |
| `StackPanel Button.foo` | Selects all `Button`s with the `foo` class that are descendants of a `StackPanel` |
| `StackPanel > Button.foo` | Selects all `Button`s with the `foo` class that are children of a `StackPanel` |
| `Button /template/ ContentPresenter` | Selects all ContentPresenter controls inside of Button's template |

For more information see the [selectors documentation](selectors.md).

### Setters <a id="setters"></a>

A style's setters describe what will happen when the selector matches a control. They are simple property/value pairs written in the format:

```markup
<Setter Property="FontSize" Value="24"/>
<Setter Property="Padding" Value="4 2 0 4"/>
```

You can also use long-form syntax to declare more complex object values:

```markup
<Setter Property="MyProperty">
   <MyObject Property1="My Value"/>
</Setter>
```

Bindings can also be applied using setters and can bind to the target control's `DataContext`:

```markup
<Setter Property="FontSize" Value="{Binding SelectedFontSize}"/>
```

Whenever a style is matched with a control, all of the setters will be applied to the control. If a style selector causes the style to no longer match a control, the property value will revert to the its next highest priority value.

Note that the `Setter` creates a single instance of `Value` which will be applied to all controls that the style matches: if the object is mutable then changes will be reflected on all controls. Following on from this, any bindings on an _object within the setter `Value`_ will not have access to the target control's `DataContext` as there may be multiple target controls:

```markup
<Style Selector="local|MyControl">
  <Setter Property="MyProperty">
     <MyObject Property1="{Binding MyViewModelProperty}"/>
  </Setter>
</Style>
```

In the above example, the binding source will be `MyObject.DataContext`, not `MyControl.DataContext` and if `MyObject` has no data context then the binding will not be able to produce a value.

Note: at present, if you are using compiled bindings, you need to explicitly set the data type of the binding source in the `<Style>` element:

```markup
<Style Selector="MyControl" x:DataType="MyViewModelClass">
  <Setter Property="ControlProperty" Value="{Binding MyViewModelProperty}" />
</Style>
```

### Templates in Setters <a id="templates-in-setters"></a>

As mentioned above, usually a single instance of a setter's `Value` is created and shared across all matching controls. Due to this, to use a control as a setter value, the control must be wrapped in a `<Template>`:

```markup
<Style Selector="Border.empty">
  <Setter Property="Child">
    <Template>
      <TextBlock>No content available.</TextBlock>
    </Template>
  </Setter>
</Style>
```

### Style Precedence <a id="style-precedence"></a>

If multiple styles match a control, and they both attempt to set the same property then the style _closest to the control_ will win. Consider the following example:

```markup
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Window.Styles>
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
            <Setter Property="FontWeight" Value="Bold"/>
        </Style>
    </Window.Styles>

    <StackPanel>
        <StackPanel.Styles>
            <Style Selector="TextBlock.h1">
                <Setter Property="FontSize" Value="48"/>
                <Setter Property="Foreground" Value="Red"/>
            </Style>
        </StackPanel.Styles>

        <TextBlock Classes="h1">
            <StackPanel.Styles>
                <Style Selector="TextBlock.h1">
                    <Setter Property="Foreground" Value="Blue"/>
                </Style>
            </StackPanel.Styles>

            I'm a Heading!
        </TextBlock>
    </StackPanel>
</Window>
```

Here the `h1` style is defined in multiple places. The `TextBlock` will end up with the following settings:

| Property | Value | Source |
| :--- | :--- | :--- |
| `FontSize` | 48 | `StackPanel` |
| `FontWeight` | Bold | `Window` |
| `Foreground` | Blue | `TextBlock` |

If more than one style setter applies to a property, the value that takes precedence will be:

* The value from the style defined in the ancestor closest to the control
* For two styles declared in the same `Styles` collection, the style that appears later
