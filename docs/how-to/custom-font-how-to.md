---
id: custom-font-how-to
title: How to add a custom font
description: Add a custom font to an Avalonia application as a static resource or embedded font collection.
doc-type: how-to
---

This guide walks you through adding a custom font to an Avalonia application using two approaches: as a static resource and as an embedded font collection.

## Prerequisites

- An Avalonia project. The [Google Fonts sample project](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts) is used throughout this guide, but you can adapt the steps to your own project.
- A font file (`.ttf` or `.otf`). This guide uses [Nunito](https://fonts.google.com/specimen/Nunito).

## Add the font files to your project

1. Copy your font files into an **Assets/Fonts** directory in your project.
2. Open your `.csproj` file and ensure the directory is included as an `AvaloniaResource`:

```xml title="MyApp.csproj"
<AvaloniaResource Include="Assets\**" />
```

This embeds the font files into the build output so Avalonia can find them at runtime. If you already have an `AvaloniaResource` entry covering your **Assets** folder, you do not need to add another one.

## Option A: Use the font as a static resource

This approach declares the font as a named XAML resource.

### Declare the font resource

1. Open **App.axaml**.
2. Add a [`FontFamily`](/api/avalonia/media/fontfamily) resource inside `<Application.Resources>`, using the [font URI format](../styling/custom-fonts#font-uri-format):

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             RequestedThemeVariant="Default">
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>

    <Application.Resources>
        <FontFamily x:Key="NunitoFont">avares://MyApp/Assets/Fonts#Nunito</FontFamily>
    </Application.Resources>
</Application>
```

Replace `MyApp` with your assembly name and `Nunito` with the internal family name of your font.

### Apply the font

3. Open a XAML view (for example, **MainWindow.axaml**).
4. Set the `FontFamily` attribute using the `StaticResource` markup extension:

```xml title="MainWindow.axaml"
<TextBlock Text="Hello in Nunito"
           FontSize="24"
           FontFamily="{StaticResource NunitoFont}" />
```

5. Build and run the app. The text should display in your custom font.

The `FontFamily` attribute can be set on any control that has a `FontFamily` property, so you can use your custom font on `TextBlock`, `Button`, `TextBox`, and similar controls.

## Option B: Use an embedded font collection

This approach registers a directory of fonts under a custom URI scheme, letting you reference fonts by name without resource keys.

### Create the font collection class

1. Add a new C# file (for example, **MyFontCollection.cs**) to your project.
2. Define a class that extends `EmbeddedFontCollection`:

```csharp title="MyFontCollection.cs"
using System;
using Avalonia.Media.Fonts;

public sealed class MyFontCollection : EmbeddedFontCollection
{
    public MyFontCollection() : base(
        new Uri("fonts:MyFonts", UriKind.Absolute),
        new Uri("avares://MyApp/Assets/Fonts", UriKind.Absolute))
    {
    }
}
```

The first URI (`fonts:MyFonts`) is the scheme and key you will use in XAML. The second URI points to the asset directory containing your font files. Replace `MyApp` with your assembly name.

### Register the collection

3. Open **Program.cs**.
4. Use `AppBuilder.ConfigureFonts` to register the collection:

```csharp title="Program.cs"
using Avalonia;
using System;

class Program
{
    [STAThread]
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);

    public static AppBuilder BuildAvaloniaApp() =>
        AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .ConfigureFonts(fontManager =>
            {
                fontManager.AddFontCollection(new MyFontCollection());
            })
            .LogToTrace();
}
```

### Apply the font

5. Open a XAML view (for example, **MainWindow.axaml**).
6. Set the `FontFamily` attribute using the `{scheme}:{collection-key}#{font-family-name}` format:

```xml title="MainWindow.axaml"
<TextBlock Text="Hello in Nunito"
           FontSize="24"
           FontFamily="fonts:MyFonts#Nunito" />
```

7. Build and run the app. The text should display in your custom font.

To use a different font from the same collection, change the name after `#`. For example, `fonts:MyFonts#Roboto` would load the Roboto font from the same **Assets/Fonts** directory.

## See also

- [Custom fonts](../styling/custom-fonts)
- [Assets](../fundamentals/assets)
