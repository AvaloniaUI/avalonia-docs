---
id: image-how-to
title: "How to: Display and Manipulate Images"
description: Load images from various sources, handle aspect ratios, and manipulate bitmaps in Avalonia.
doc-type: how-to
---

This guide covers Image control patterns: loading images from various sources, aspect ratio handling, dynamic images, and bitmap manipulation.

## Loading Images from Assets

Include images in your project as embedded resources and reference them with the `avares://` URI scheme:

```xml
<Image Source="avares://MyApp/Assets/logo.png" Width="200" />
```

Ensure the file is set to `AvaloniaResource` in your `.csproj`:

```xml
<ItemGroup>
    <AvaloniaResource Include="Assets\**" />
</ItemGroup>
```

## Loading Images from a File Path

Bind to a `Bitmap` loaded from disk:

```csharp
[ObservableProperty]
private Bitmap? _photo;

[RelayCommand]
private async Task LoadPhoto()
{
    var topLevel = TopLevel.GetTopLevel(App.Current?.ApplicationLifetime
        is IClassicDesktopStyleApplicationLifetime desktop ? desktop.MainWindow : null);
    if (topLevel is null) return;

    var files = await topLevel.StorageProvider.OpenFilePickerAsync(
        new FilePickerOpenOptions
        {
            Title = "Select an image",
            FileTypeFilter = new[] { FilePickerFileTypes.ImageAll }
        });

    if (files.Count > 0)
    {
        await using var stream = await files[0].OpenReadAsync();
        Photo = new Bitmap(stream);
    }
}
```

```xml
<Image Source="{Binding Photo}" MaxWidth="400" />
```

## Loading Images from a URL

Use an `AsyncImageLoader` or load the bitmap in the view model:

```csharp
[RelayCommand]
private async Task LoadFromUrl(string url)
{
    using var client = new HttpClient();
    var bytes = await client.GetByteArrayAsync(url);
    using var stream = new MemoryStream(bytes);
    Photo = new Bitmap(stream);
}
```

## Stretch Modes

The [`Stretch`](/api/avalonia/media/stretch) property controls how the image fills its bounds:

```xml
<!-- Preserves aspect ratio, fits within bounds -->
<Image Source="{Binding Photo}" Stretch="Uniform" />

<!-- Fills the entire area, may crop -->
<Image Source="{Binding Photo}" Stretch="UniformToFill" />

<!-- Stretches to fill, ignores aspect ratio -->
<Image Source="{Binding Photo}" Stretch="Fill" />

<!-- No scaling, displays at original size -->
<Image Source="{Binding Photo}" Stretch="None" />
```

| Stretch | Description |
|---|---|
| `Uniform` | Scale to fit, preserving aspect ratio (default). |
| `UniformToFill` | Scale to fill, preserving aspect ratio, clipping if needed. |
| `Fill` | Stretch to fill exactly, ignoring aspect ratio. |
| `None` | Display at original pixel size. |

## Circular Image (Avatar)

Clip an image to a circle using `Clip`:

```xml
<Border CornerRadius="50" ClipToBounds="True"
        Width="100" Height="100">
    <Image Source="{Binding Avatar}" Stretch="UniformToFill" />
</Border>
```

## Image with Fallback

Show a placeholder when no image is available:

```xml
<Panel Width="200" Height="200">
    <!-- Fallback shown when Source is null -->
    <Border Background="#F3F4F6" IsVisible="{Binding Photo, Converter={x:Static ObjectConverters.IsNull}}">
        <TextBlock Text="No Image" HorizontalAlignment="Center" VerticalAlignment="Center"
                   Foreground="Gray" />
    </Border>
    <Image Source="{Binding Photo}" Stretch="Uniform" />
</Panel>
```

## Image Interpolation

Control the rendering quality when images are scaled:

```xml
<!-- Sharp pixels for pixel art -->
<Image Source="{Binding PixelArt}"
       RenderOptions.BitmapInterpolationMode="None" />

<!-- Smooth scaling for photos -->
<Image Source="{Binding Photo}"
       RenderOptions.BitmapInterpolationMode="HighQuality" />
```

| Mode | Description |
|---|---|
| `None` | Nearest-neighbor, sharp pixels. |
| `LowQuality` | Bilinear filtering. |
| `MediumQuality` | Bilinear with some improvements. |
| `HighQuality` | Bicubic or high-quality resampling. |
| `Default` | Platform default. |

## DrawingImage (Vector Graphics)

Use `DrawingImage` for resolution-independent vector images:

```xml
<Image Width="48" Height="48">
    <Image.Source>
        <DrawingImage>
            <GeometryDrawing Brush="Red"
                             Geometry="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5
                                       C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08
                                       C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5
                                       C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </DrawingImage>
    </Image.Source>
</Image>
```

## PathIcon

For simple monochrome icons, use `PathIcon` instead of `Image`:

```xml
<PathIcon Data="{StaticResource home_regular}" Width="24" Height="24"
          Foreground="{DynamicResource SystemAccentColor}" />
```

PathIcon inherits `Foreground` from parent styles, making it easy to theme.

## RenderTargetBitmap (Screenshots)

Capture a control to a bitmap:

```csharp
var renderTarget = new RenderTargetBitmap(new PixelSize(800, 600));
renderTarget.Render(myControl);
renderTarget.Save("screenshot.png");
```

## Key Properties

| Property | Type | Description |
|---|---|---|
| `Source` | `IImage` | The image to display (`Bitmap`, `DrawingImage`, and similar). |
| `Stretch` | `Stretch` | How the image fills its bounds. |
| `StretchDirection` | `StretchDirection` | `Both`, `UpOnly`, `DownOnly`. |

## See Also

- [Image Control Reference](/controls/media/image): Property tables.
- [PathIcon Control Reference](/controls/media/pathicon): Vector icon control.
- [DrawingImage Control Reference](/controls/media/drawingimage): Vector image source.
- [How to Bind Image Files](/docs/data-binding/how-to-bind-image-files): Binding images in data templates.
- [Image Interpolation](/docs/graphics-animation/image-interpolation): Bitmap rendering quality.
- [Assets](/docs/fundamentals/assets): Asset loading and URI schemes.
