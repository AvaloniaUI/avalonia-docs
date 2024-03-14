# Styling 

[Styles in Avalonia](styles.md) are used to share property settings between controls. The Avalonia styling system can be thought of as a mix of CSS styling and WPF/UWP styling. At its most basic, a style consists of a _selector_ and a collection of _setters_.

The following style selects any `TextBlock` in the `Window` with a `h1` _style class_ and sets its font size to 24 point and font weight to bold:

```xml
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
