---
id: custom-fonts
title: Using custom fonts
---

Customizing your Avalonia application with unique fonts can add a distinctive look and feel. This guide explains how to integrate custom fonts into your Avalonia application.

## Using a custom font as a static resource

### Clone the Google Fonts sample

Start by cloning our [Google Fonts sample project](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts). This project includes files for the [Nunito](https://fonts.google.com/specimen/Nunito) font, which we will be using throughout this guide.

### Add your custom font to the project

Before you can use a custom font, you must include it in your project.

Open **GoogleFonts.csproj** in the sample project you cloned. You can see that the `Assets` directory has already been set as an `AvaloniaResource`. This ensures that fonts in the directory are correctly built at runtime.

Resources in this directory can be accessed through `avares://GoogleFonts/Assets/Fonts`.

```xml title="GoogleFonts.csproj"
<AvaloniaResource Include="Assets\**" />
```

### Declare your font in application resources

1. In your Avalonia application, open `App.axaml`.
2. Include your custom font inside the `<Application.Resources>` tag.
3. Assign it a key to use as reference in your application. In this case, we have assigned the key `NunitoFont`.

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

### Apply your custom font

Once your font is declared in the application resources, you can use it in your application.

To reference your custom font, use the `FontFamily` attribute with the `StaticResource` markup extension. Pass the key of the declared font as the parameter, which in this case is `NunitoFont`.

In the below example, the text displayed in the `TextBlock` control is now size 70, and uses the Nunito font.

```xml
<TextBlock Text="{Binding Greeting}" 
           FontSize="70" 
           FontFamily="{StaticResource NunitoFont}" 
           HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

The `FontFamily` attribute can be applied to any control with the `FontFamily` property, meaning you can use your custom font throughout your application.

---

## Creating an embedded font collection

### About embedded font collections

`EmbeddedFontCollection` provides a way to add fonts to your application as a collection, so that you can use them without a reference to a static resource.

For example, instead of setting the font family to `{StaticResource NunitoFont}`, as described in the previous section, you can reference the font family as `#Nunito`.

```xml
<TextBlock
    Text="{Binding Greeting}"
    FontSize="70"
// highlight-start
    FontFamily="fonts:MyFonts#Nunito"
// highlight-end
    HorizontalAlignment="Center" VerticalAlignment="Center" />
```

This requires additional setup, but removes the need to use a unique resource key when authoring your controls.

### Defining a font collection

These instructions continue with the [Google Fonts sample project](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts) you used in the [previous section](#using-a-custom-font-as-a-static-resource).

1. (Optional) In the **App.axaml** file, delete the `NunitoFont` application resource. It is no longer needed. ~~`<FontFamily x:Key="NunitoFont">avares://GoogleFonts/Assets/Fonts#Nunito</FontFamily>`~~
2. Open the **Program.cs** file.
3. At the top of the file, add the declaration `using Avalonia.Media.Fonts;`

```csharp
using Avalonia;
using System;
// highlight-start
using Avalonia.Media.Fonts;
// highlight-end
```

4. Above the `Program` class, add a new class to create the `EmbeddedFontCollection`. In this example, we have named it `MyFontCollection`.

```csharp
public sealed class MyFontCollection : EmbeddedFontCollection
{
    public MyFontCollection() : base(
        new Uri("fonts:MyFonts", UriKind.Absolute),
        new Uri("avares://GoogleFonts/Assets/Fonts", UriKind.Absolute))
    {
    }
}
```

This class acts as a resource locator for the directory containing the custom font files. Here, the directory is `avares://GoogleFonts/Assets/Fonts`, and it is accessed with the key `fonts:MyFonts`.

For more information on how to create a resource locator, see [Assets](/docs/basics/user-interface/assets).

### Adding the font collection to the app

Next, we need to add `MyFontCollection` to the application.

1. Continue working in the file **Program.cs**.
2. Within the Avalonia configuration code, i.e. the code portion starting `public static AppBuilder BuildAvaloniaApp()`, use `AppBuilder.ConfigureFonts` to configure a font manager that includes the font collection when the app is constructed.

Your `class Program` should now look something like this:

```csharp title="Program.cs"
class Program
    {
        [STAThread]
        public static void Main(string[] args) => BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);

        public static AppBuilder BuildAvaloniaApp()
            => AppBuilder.Configure<App>()
                .UsePlatformDetect()
                .ConfigureFonts(fontManager =>
                {
                    fontManager.AddFontCollection(new MyFontCollection());
                })
                .LogToTrace();
    }
```

### Applying a font from the font collection

1. Open the file **MainWindow.axaml**.
2. Update the `FontFamily` attribute of the `TextBlock` to use `FontFamily="fonts:MyFonts#Nunito"`.

```xml title="MainWindow.axaml"
<TextBlock Text="{Binding Greeting}"
           FontSize="70"
// highlight-start
           FontFamily="fonts:MyFonts#Nunito"
// highlight-end
           HorizontalAlignment="Center" VerticalAlignment="Center"/>
```

3. Build and run the app. Confirm the text is displayed in Nunito font.

The `FontFamily` value `fonts:MyFonts#Nunito` acts as a URI for the font file resource in your **Assets** folder. Its format is `{scheme}:{collection-key}#{font-family-name}`. In this case, the directory indicated by `fonts:MyFonts` is `/GoogleFonts/Assets/Fonts`, and the target font family, as marked by the `#` symbol, is `Nunito`.

 `EmbeddedFontCollection` searches every file in the specified directory and loads files with the target font family name.

Your font collection can contain many font families and font files. To switch to another font within the **Assets** folder, change the `FontFamily` value to the desired font, e.g. `fonts:MyFonts#ComicSans`.

---

## Pre-built font packages

The [`Avalonia.Fonts.Inter`](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Fonts.Inter) package is an example of a pre-built font package that contains fonts you can utilize across multiple projects. The fonts in the package can be accessed with a single method call in your app configuration file.

If you wish to use the Inter font as included in the `Avalonia.Fonts.Inter` NuGet package, you can install the package and add `.WithInterFont()` to your Avalonia configuration code.

```csharp title="Program.cs"
public static class Program
{
    [STAThread]
    public static void Main(string[] args) =>
        BuildAvaloniaApp()
            .StartWithClassicDesktopLifetime(args);

    public static AppBuilder BuildAvaloniaApp() =>
        AppBuilder.Configure<App>()
            .UsePlatformDetect()
// highlight-start
            .WithInterFont()
// highlight-end
            .LogToTrace();
}
```

## Which fonts are supported?

Most TrueType (`.ttf`) and OpenType (`.otf`, `.ttf`) fonts are supported. However, some font features, such as "Variable fonts" are not currently supported (See [Issue #11092](https://github.com/AvaloniaUI/Avalonia/issues/11092)).
