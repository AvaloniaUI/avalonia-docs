---
id: imageloader
title: ImageLoader
description: Customize how the Markdown control loads and resolves images by setting Markdown.ImageLoader to a MarkdownImageLoader.
doc-type: reference
tags:
  - avalonia pro
  - avalonia enterprise
---

The `Markdown` control resolves image URLs through a `MarkdownImageLoader`. Set `Markdown.ImageLoader` on the control and every image in its document uses it.

:::info
This control is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

## Default behavior

No loader is set by default, so images are not loaded until you supply one. The `MarkdownImageLoader` base class already resolves the `http://`, `https://` and `file://` schemes and returns an `IImage` on success or `null` on failure, so for the common case you assign it directly and write no code:

```xml
<Markdown Text="![Logo](https://example.com/logo.png)">
  <Markdown.ImageLoader>
    <MarkdownImageLoader />
  </Markdown.ImageLoader>
</Markdown>
```

Subclass it when you need a scheme, image format, authentication or caching strategy the base class does not cover.

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

`Markdown.ImageLoader` is an attached property, so you set it on the control itself.

### XAML

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:local="using:MarkdownSample">
  <Markdown Text="![SVG Image](https://example.com/image.svg)">
    <Markdown.ImageLoader>
      <local:CustomImageLoader />
    </Markdown.ImageLoader>
  </Markdown>
</Window>
```

To share one loader across several controls, declare it as a resource and point each control at it:

```xml
<Window.Resources>
  <local:CustomImageLoader x:Key="ImageLoader" />
</Window.Resources>

<StackPanel>
  <Markdown Markdown.ImageLoader="{StaticResource ImageLoader}" Text="{Binding First}" />
  <Markdown Markdown.ImageLoader="{StaticResource ImageLoader}" Text="{Binding Second}" />
</StackPanel>
```

### Code

```csharp
var loader = new CustomImageLoader();

// Every image in this control's document uses it
markdown.ImageLoader = loader;

// Or through the static accessor, which takes any StyledElement
Markdown.SetImageLoader(markdown, loader);
```

To resolve one image differently from the rest, set `MarkdownImage.ImageLoader` on that element. A value set there wins over the one the control supplies.

Image loading is deferred until both the URL (set automatically from the Markdown source) and a loader are available, and assigning a loader later re-resolves images already in the document. This decouples the document model from image resolution.

## When to use

You should implement a custom `MarkdownImageLoader` whenever the default image resolution does not meet your needs. For example, you might need to render SVG images, load images from a remote server that requires authentication, or apply a caching strategy to avoid repeated downloads. A custom loader gives you full control over how image URIs are resolved and what image types your `Markdown` control can display.

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [CodeHighlighter](/controls/data-display/text-display/markdown/codehighlighter)