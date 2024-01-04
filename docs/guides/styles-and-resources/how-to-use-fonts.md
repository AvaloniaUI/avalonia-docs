---
id: how-to-use-fonts
title: How To Use Custom Fonts
---

Customizing your Avalonia application with unique fonts can add a distinctive look and feel. This guide will walk you through the process of integrating custom fonts into your Avalonia application.


<GitHubSampleLink title="Google Fonts" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts"/>


## Add Your Custom Font to the Project

Before you can use a custom font, you need to include it in your project.

In this guide, we will be using a font called [Nunito](https://fonts.google.com/specimen/Nunito) which is already stored in our application resources under `avares://GoogleFonts/Assets/Fonts`.

Ensure that the fonts have the build property set to `AvaloniaResource`.

## Declare Your Font in Application Resources

In your Avalonia application, open your `App.xaml` file and include your custom font inside `<Application.Resources>`. Assign it a key, which you will use to reference it in your application. In this case, we have assigned the key `NunitoFont`.

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="GoogleFonts.App"
             RequestedThemeVariant="Default">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
    // highlight-start
    <Application.Resources>
        <FontFamily x:Key="NunitoFont">avares://GoogleFonts/Assets/Fonts#Nunito</FontFamily>
    </Application.Resources>
     // highlight-end
</Application>
```

## Use Your Custom Font
Once your font is declared in your application resources, you can use it in your application.

To reference your custom font, use the `FontFamily` attribute with the `StaticResource` markup extension. You need to pass the key of the declared font as the parameter. In this case, `NunitoFont` is the key for our custom font.

Here's an example of how to apply our custom `Nunito` font to a `TextBlock`:

```xml
<TextBlock Text="{Binding Greeting}" 
           FontSize="70" 
           FontFamily="{StaticResource NunitoFont}" 
           HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

In the above example, the `TextBlock` control will use the `Nunito` font that we declared in our application resources. The text bound to the `TextBlock` will now appear in the `Nunito` font at the specified font size of 70.

Remember that the `FontFamily` attribute can be applied to any control that has the `FontFamily` property, meaning you can use your custom font throughout your application.

And that's it! You've successfully integrated a custom font into your Avalonia application. Now you can add a unique touch to your application's UI with the fonts of your choice.




