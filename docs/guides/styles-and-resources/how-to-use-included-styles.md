---
id: how-to-use-included-styles
title: How to Use Included Styles
---


# 👉 How to Use Included Styles

This guide shows you how to share styles from a separate styles file (that is included in your application). This approach allows you to share styles across multiple applications.

To do this, you define styles in a new XAML file. Here, the root element must then be either a `Style` or `Styles` element. For example:

```markup
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style Selector="TextBlock.h1">
        <Setter Property="FontSize" Value="24"/>
        <Setter Property="FontWeight" Value="Bold"/>
    </Style>
</Styles>
```

The _Avalonia U_I solution templates provide a quick way of adding a styles file to your project. Follow this procedure:

-  In the **Solution Explorer**, right-click your project.
-  Click **Add** and **New Item**
-  From the Avalonia Items, click **Styles(Avalonia)**
-  Type a name for your styles file

<!--<!--<figure><img src="../../.gitbook/assets/image (1) (4) (2).png" alt=""><figcaption></figcaption></figure>-->-->

To use the styles defined in a separate file, you must reference it using a `StyleInclude` element. The source attribute defines the location of the styles file. You can choose the level at which to add this element.&#x20;

For example, to use styles defined in a file `AppStyles.axaml` (saved in the folder `/Styles`), you could write a a `StyleInclude` element in the window like this:

```markup
<Window ... >
    <Window.Styles>
        <StyleInclude Source="/Styles/AppStyles.axaml" />
    </Window.Styles>

    <StackPanel>
       <TextBlock Classes="h1">Heading 1</TextBlock>
       <TextBlock>This is not a heading and will not be changed.</TextBlock>
    </StackPanel>
</Window>
```

However, it is more common to reference a styles file in the `App.axaml` file like this:

```xml
<Application... > 
    <Application.Styles>
        <FluentTheme Mode="Light"/>
        <StyleInclude Source="/AppStyles.axaml"/>
    </Application.Styles>
</Application>
```

This will allow you to use the styles from the separate file throughout your application.
