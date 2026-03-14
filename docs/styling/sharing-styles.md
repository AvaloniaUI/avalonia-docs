---
id: sharing-styles
title: Sharing styles
---

import VsStylesTemplateScreenshot from '/img/guides/ui-development/styling/vs-styles-template.png';

You can define styles in separate files and include them at any level of your application. This lets you share a consistent set of styles across multiple windows, user controls, or even across projects.

## How to use included styles

This guide shows you how to share styles from a separate styles file that is included in your application. This approach allows you to share styles across multiple applications.

To do this, define styles in a new XAML file. The root element must be either a `Style` or `Styles` element. For example:

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Style Selector="TextBlock.h1">
        <Setter Property="FontSize" Value="24"/>
        <Setter Property="FontWeight" Value="Bold"/>
    </Style>
</Styles>
```

The Avalonia solution templates provide a quick way of adding a styles file to your project. Follow this procedure:

-  In the **Solution Explorer**, right-click your project.
-  Click **Add** and **New Item**
-  From the Avalonia Items, click **Styles (Avalonia)**
-  Type a name for your styles file

<img src={VsStylesTemplateScreenshot} alt="Visual Studio Add New Item dialog showing the Styles (Avalonia) template"/>

To use the styles defined in a separate file, you must reference it using a [`StyleInclude`](/api/avalonia/markup/xaml/styling/styleinclude) element. The source attribute defines the location of the styles file. You can choose the level at which to add this element.

For example, to use styles defined in a file `AppStyles.axaml` (saved in the folder `/Styles`), you could write a `StyleInclude` element in the window like this:

```xml
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

You can also include styles from another assembly by using the `avares://` prefix:

```xml
<Application... > 
    <Application.Styles>
        <FluentTheme Mode="Light"/>
        <StyleInclude Source="avares://MyApp.Shared/Styles/CommonAppStyles.axaml"/>
    </Application.Styles>
</Application>
```

This references the `/Styles/CommonAppStyles.axaml` file from the `MyApp.Shared` project.

## Troubleshooting: StaticResource not found in included styles

When you split resources and styles across multiple included files, `StaticResource` lookups can fail even though the resource file is included before the style file that references it.

This happens because each `StyleInclude` is loaded independently before it is attached to its parent `Styles` collection. At load time, the included style has no reference to sibling includes, so it cannot resolve a `StaticResource` defined in another file.

For example, if you have a `Fonts.axaml` defining font resources and a `TextStyles.axaml` referencing them:

```xml
<Application.Styles>
    <StyleInclude Source="/Styles/Fonts.axaml" />
    <StyleInclude Source="/Styles/TextStyles.axaml" />
</Application.Styles>
```

A `StaticResource` reference in `TextStyles.axaml` to a font defined in `Fonts.axaml` will fail at load time.

You have two options to resolve this:

- **Use `DynamicResource` instead of `StaticResource`.** `DynamicResource` resolves at runtime after all styles have been attached, so it can find resources defined in sibling includes. This is the recommended approach for most cases, and the performance impact is negligible since theme resources rarely change.
- **Define resources in the same file as the styles that reference them.** If a style file needs font or brush resources, include those resource definitions within that same file rather than relying on a separate resource file.

## See also

- [Styles](styles)
- [Style precedence](style-precedence)
