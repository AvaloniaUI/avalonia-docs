---
id: custom-fonts
title: Custom fonts
---

Avalonia supports custom TrueType (`.ttf`) and OpenType (`.otf`) fonts. You can embed font files in your application and reference them in XAML, removing any dependency on fonts installed on the host system.

There are three approaches to using custom fonts, each suited to different scenarios:

| Approach | Best for |
|----------|----------|
| [Static resource](#static-resource-fonts) | Using a font in specific places via a named resource key |
| [Embedded font collection](#embedded-font-collections) | Referencing fonts by family name without resource keys |
| [Pre-built font package](#pre-built-font-packages) | Using a shared font package across multiple projects |

## Font URI format

All three approaches use the same URI format to locate embedded font files:

```text
avares://AssemblyName/Path/To/Fonts#Font Family Name
```

- `avares://AssemblyName/Path/To/Fonts` is the path to the directory or file containing the font, using the Avalonia asset protocol.
- `#Font Family Name` is the internal family name of the font (not the file name).

:::caution
The `#FontFamilyName` suffix is required. Without it, Avalonia cannot identify which typeface to load and the font will silently fall back to the default. The family name must match the font's internal metadata name, not the file name on disk.
:::

For your font files to be available at runtime, your project file must include them as an `AvaloniaResource`:

```xml title="MyApp.csproj"
<AvaloniaResource Include="Assets\Fonts\*" />
```

## Static resource fonts

You can declare a font as a XAML resource and reference it by key with the `StaticResource` markup extension. This approach gives you explicit control over where the font is used.

Define the font in your application or window resources:

```xml title="App.axaml"
<Application.Resources>
    <FontFamily x:Key="NunitoFont">avares://MyApp/Assets/Fonts#Nunito</FontFamily>
</Application.Resources>
```

Then reference it on any control with a `FontFamily` property:

```xml
<TextBlock FontFamily="{StaticResource NunitoFont}"
           FontSize="24"
           Text="Hello in Nunito" />
```

:::caution
Application-level resources involve resource dictionary merging, which can cause font definitions to fail silently. If your font does not appear when defined in `<Application.Resources>`, wrap the resource in a `ResourceDictionary.MergedDictionaries` structure:

```xml title="App.axaml"
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary>
                <FontFamily x:Key="NunitoFont">avares://MyApp/Assets/Fonts#Nunito</FontFamily>
            </ResourceDictionary>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

Alternatively, define your font resources in a separate AXAML file and include them with `ResourceInclude`. Fonts defined at `<Window.Resources>` scope are not affected by this issue.
:::

## Embedded font collections

An [`EmbeddedFontCollection`](/api/avalonia/media/fonts/embeddedfontcollection) registers a directory of font files under a custom URI scheme. This lets you reference fonts by family name directly in XAML without declaring individual resource keys.

The collection maps a custom URI (for example, `fonts:MyFonts`) to an asset directory (for example, `avares://MyApp/Assets/Fonts`). You create the collection by subclassing `EmbeddedFontCollection`:

```csharp
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

Register the collection in your app configuration:

```csharp title="Program.cs"
public static AppBuilder BuildAvaloniaApp() =>
    AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .ConfigureFonts(fontManager =>
        {
            fontManager.AddFontCollection(new MyFontCollection());
        })
        .LogToTrace();
```

Then reference any font in the collection using the `{scheme}:{collection-key}#{font-family-name}` format:

```xml
<TextBlock FontFamily="fonts:MyFonts#Nunito"
           FontSize="24"
           Text="Hello in Nunito" />
```

`EmbeddedFontCollection` searches every file in the specified directory and loads files matching the requested font family name. Your collection can contain many font families and font files. To use a different font from the same collection, change the name after `#`.

## Pre-built font packages

Font packages bundle an `EmbeddedFontCollection` into a NuGet package that you can share across projects. The [`Avalonia.Fonts.Inter`](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Fonts.Inter) package is an example of this pattern.

To use the Inter font, install the `Avalonia.Fonts.Inter` NuGet package and add `.WithInterFont()` to your app configuration:

```csharp title="Program.cs"
public static AppBuilder BuildAvaloniaApp() =>
    AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .WithInterFont()
        .LogToTrace();
```

Then reference the font in XAML:

```xml
<TextBlock FontFamily="fonts:Inter#Inter"
           FontSize="24"
           Text="Hello in Inter" />
```

## OpenType font features

The `FontFeatures` property controls OpenType features such as ligatures, tabular numbers, and alternate glyphs. Features are specified as comma-separated tags using [HarfBuzz syntax](https://harfbuzz.github.io/harfbuzz-hb-common.html#hb-feature-from-string):

```xml
<!-- Disable contextual alternates and enable tabular numbers -->
<TextBlock Text="111111 x64 ->" FontFeatures="-calt,+tnum" />
```

You can apply font features on individual `Run` elements within a `TextBlock`:

```xml
<TextBlock>
    <Run Text="Regular: 12345" />
    <Run Text="Tabular: 12345" FontFeatures="+tnum" />
</TextBlock>
```

Or set them on a container using the attached property:

```xml
<StackPanel TextElement.FontFeatures="+tnum">
    <TextBlock Text="12345" />
    <TextBlock Text="67890" />
</StackPanel>
```

Common OpenType feature tags:

| Tag | Feature |
|---|---|
| `+tnum` / `-tnum` | Enable/disable tabular (fixed-width) numbers. |
| `+liga` / `-liga` | Enable/disable standard ligatures. |
| `+calt` / `-calt` | Enable/disable contextual alternates. |
| `+smcp` | Enable small capitals. |
| `+onum` | Enable old-style (proportional) numbers. |

:::info
Available features depend on the font. Not all fonts support all OpenType features.
:::

## Customizing font matching

For advanced font handling, you can override methods on your font collection to control how Avalonia selects fallback fonts and creates synthetic typefaces.

### Custom character matching

Override `TryMatchCharacter` to control which font is used when a character is not found in the requested font family. This is useful for providing application-specific fallback chains:

```csharp
public sealed class MyFontCollection : EmbeddedFontCollection
{
    public MyFontCollection() : base(
        new Uri("fonts:MyFonts", UriKind.Absolute),
        new Uri("avares://MyApp/Assets/Fonts", UriKind.Absolute))
    {
    }

    public override bool TryMatchCharacter(
        int codepoint,
        FontStyle fontStyle,
        FontWeight fontWeight,
        FontStretch fontStretch,
        CultureInfo? culture,
        out Typeface typeface)
    {
        // Custom logic to match characters to specific fonts
        // Return true if a match was found, false to fall through
        // to the default matching behavior
        return base.TryMatchCharacter(
            codepoint, fontStyle, fontWeight, fontStretch,
            culture, out typeface);
    }
}
```

### Controlling synthetic typefaces

When Avalonia cannot find an exact match for a requested weight or style, it creates a synthetic (algorithmically styled) typeface. You can prevent this for specific font families by implementing `IFontCollection2` on your collection and overriding the synthetic typeface creation behavior.

## Supported font formats

Most TrueType (`.ttf`) and OpenType (`.otf`, `.ttf`) fonts are supported. Variable fonts are not currently supported (see [Issue #11092](https://github.com/AvaloniaUI/Avalonia/issues/11092)).

## Troubleshooting

### Font not appearing (falls back to default)

If your custom font silently falls back to the default font, check the following common causes:

**1. Font files not included as AvaloniaResource**

Your project file must explicitly include font files as an `AvaloniaResource`. Without this, the font files are not embedded in the build output and Avalonia cannot find them.

```xml title="MyApp.csproj"
<AvaloniaResource Include="Assets\Fonts\*" />
```

After adding this, rebuild your project. You should see the assembly file size increase, confirming the fonts are embedded.

**2. Missing font family name in the URI**

The font URI must include the font family name after a `#` separator. The collection path alone is not enough.

```xml
<!-- Wrong: missing #FontFamilyName -->
<FontFamily x:Key="MyFont">avares://MyApp/Assets/Fonts</FontFamily>

<!-- Correct: includes the font family name -->
<FontFamily x:Key="MyFont">avares://MyApp/Assets/Fonts#Roboto Mono</FontFamily>
```

The same rule applies to `EmbeddedFontCollection` URIs:

```xml
<!-- Wrong -->
<TextBlock FontFamily="fonts:MyFonts" />

<!-- Correct -->
<TextBlock FontFamily="fonts:MyFonts#Source Code Pro" />
```

The font family name after `#` must match the internal name of the font, not the file name. You can find the internal name by opening the font file in a font viewer or by checking the font's metadata.

**3. Font not working in WebAssembly (WASM)**

Browser environments do not have access to system fonts. If your font works on desktop but not in WASM, the browser is falling back to a system font that does not exist.

To fix this, use the full font collection URI syntax rather than relying on system font fallback. For example, when using the `Avalonia.Fonts.Inter` package:

```xml
<!-- May fail in WASM -->
<TextBlock FontFamily="Inter" />

<!-- Works in all environments -->
<TextBlock FontFamily="fonts:Inter#Inter" />
```

This ensures Avalonia resolves the font from the embedded collection rather than attempting a system font lookup.

## See also

- [Typography](typography): Font size, weight, style, letter spacing, line height, and text decorations.
- [How to add a custom font](../how-to/custom-font-how-to)
- [Assets](../fundamentals/assets)
- [Styles](styles)
