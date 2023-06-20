---
id: index
title: How To Use Styles
---


# 👉 How To Use Styles

This guide shows you how to use styles in _Avalonia UI_.

Styles in _Avalonia UI_ are used to share property settings between controls. A style declaration is placed inside a style element, and comprise a selector attribute, and one or more property setter elements.&#x20;

Styles are placed inside a styles collection element, which maybe attached. For example, a window styles collection looks like this:

```xml
<Window.Styles>
   <Style> ...  </Style>
</Window.Styles>
```

The location of a styles collection defines the scope of the styles it contains. In the above example, the styles will apply to the window and all of its contents.

You use a style selector to define what controls the style can act upon. The selector uses a variety of formats, one of the simplest is this:

```xml
<Style Selector="targetControlClass.styleClassName">
```

You must place a collection of setter elements inside the style element; and these define what is to be changed on any controls that match the selector.  &#x20;

{% hint style="info" %}
You can read a full list of the selector formats [here](selectors.md).&#x20;
{% endhint %}

For example, the following style element is located inside a window, and it is targeting the `TextBlock` control class and the style class name `h1`.&#x20;

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
       <TextBlock Classes="h1">I'm a Heading!</TextBlock>
       <TextBlock>This is not a heading and will not be changed.</TextBlock>
    </StackPanel>
</Window>
```

The style will therefore select any text block control in the window where the `h1` style class has been set. In this example, the first text block is selected, and the font size is changed to 24 point and font weight is changed to bold. The second text block will not be altered by the style.

{% hint style="info" %}
You may be helpful to think of the _Avalonia UI_ styling system of as a mixture of CSS styling and WPF/UWP styling, if you are familiar with those technologies.
{% endhint %}
