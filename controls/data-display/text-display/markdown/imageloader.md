---
id: imageloader
title: ImageLoader
description: Customize how the Markdown control loads and resolves images by implementing a custom MarkdownImageLoader and assigning it via a style on MarkdownImage.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

The `Markdown` control supports custom image loading via the `ImageLoader` property on `MarkdownImage`. Because the Markdown control is built on the shared document model, each image is a `MarkdownImage` element (a `StyledElement`), and you assign a loader using a standard Avalonia style selector.


:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Default behavior

When you do not set a custom `ImageLoader`, images are not loaded automatically. To enable image loading, create a `MarkdownImageLoader` subclass and assign it via a style targeting `MarkdownImage`. The default `MarkdownImageLoader` base class supports `http://`, `https://`, and `file://` schemes, returning a `Bitmap` on success or `null` on failure.

## Example: loading SVG images

### Required packages

To use the custom image loader example below, you need to install the following NuGet package:

```bash
 dotnet add package Avalonia.Svg.Skia
```

### Implementation

Below is an example of a custom image loader that supports SVG images:

```csharp
using Avalonia.Controls;
using Avalonia.Media.Imaging;
using Avalonia.Svg.Skia;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class CustomImageLoader : MarkdownImageLoader
{
    public override async Task<IImage?> LoadImageAsync(string url)
    {
        IImage? image = null;

        if (Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            Stream? stream = null;

            if (uri.Scheme == "http" || uri.Scheme == "https")
            {
                stream = await DownloadImage(uri);
            }
            else if (uri.Scheme == "file" && File.Exists(uri.LocalPath))
            {
                stream = File.OpenRead(uri.LocalPath);
            }

            if (stream is null)
            {
                return null;
            }

            using (stream)
            {
                if (IsSvgFile(stream))
                {
                    var svg = new SvgImage
                    {
                        Source = SvgSource.LoadFromStream(stream)
                    };

                    image = svg;
                }
                else
                {
                    image = new Bitmap(stream);
                }
            }
        }

        return image;
    }

    private static async Task<Stream> DownloadImage(Uri url)
    {
        using var client = new HttpClient();
        using var response = await client.GetAsync(url).ConfigureAwait(false);
        using var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false);
        var memoryStream = new MemoryStream();
        await stream.CopyToAsync(memoryStream).ConfigureAwait(false);
        memoryStream.Position = 0;
        return memoryStream;
    }

    private static bool IsSvgFile(Stream stream)
    {
        if (stream == null || stream.Length == 0)
            return false;
        try
        {
            const int bufferSize = 512;
            byte[] buffer = new byte[Math.Min(bufferSize, stream.Length)];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string header = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            return header.Contains("<svg", StringComparison.OrdinalIgnoreCase);
        }
        catch
        {
            return false;
        }
        finally
        {
            stream.Position = 0;
        }
    }
}
```

## Usage

Assign your custom loader to `MarkdownImage` elements via a style. This is the recommended approach because image elements are created dynamically by the document model:

### XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:local="using:MarkdownSample">
  <Window.Resources>
    <local:CustomImageLoader x:Key="CustomImageLoader" />
  </Window.Resources>

  <Window.Styles>
    <Style Selector="MarkdownImage">
      <Setter Property="ImageLoader" Value="{StaticResource CustomImageLoader}" />
    </Style>
  </Window.Styles>

  <Markdown Text="![SVG Image](https://example.com/image.svg)" />
</Window>
```

### Code-behind

```csharp
var loader = new CustomImageLoader();

var style = new Style(x => x.OfType<MarkdownImage>());
style.Setters.Add(new Setter(MarkdownImage.ImageLoaderProperty, loader));
myMarkdownControl.Styles.Add(style);
```

Image loading is deferred until both `ImageSource` (set automatically from the Markdown source) and `ImageLoader` (set via the style) are available. This decouples the document model from image resolution.

## When to use

You should implement a custom `MarkdownImageLoader` whenever the default image resolution does not meet your needs. For example, you might need to render SVG images, load images from a remote server that requires authentication, or apply a caching strategy to avoid repeated downloads. A custom loader gives you full control over how image URIs are resolved and what image types your `Markdown` control can display.

## See also
- [Markdown control](/controls/data-display/text-display/markdown)