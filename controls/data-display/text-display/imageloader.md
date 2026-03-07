---
id: imageloader
title: ImageLoader
description: Customize how the Markdown control loads and resolves images by implementing a custom MarkdownImageLoader.
doc-type: reference
tags:
  - accelerate
---

The `Markdown` control supports custom image loading via the `ImageLoader` property. This allows you to handle image formats such as SVG, remote images, or any custom logic for image resolution.


:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Business or higher.
:::

## Default behavior

When you do not set a custom `ImageLoader`, the `Markdown` control resolves image URIs using `avares://` URIs from your application's embedded resources. This means any image bundled as an Avalonia resource can be displayed without additional configuration. If you need to load images from other sources (such as the web or the local file system) or support formats like SVG, you must provide a custom `MarkdownImageLoader`.

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

Assign your custom loader to the `ImageLoader` property:

```csharp
var markdown = new Markdown
{
    Text = "![SVG Image](https://example.com/image.svg)",
    ImageLoader = new CustomImageLoader()
};
```

## When to use

You should implement a custom `MarkdownImageLoader` whenever the default image resolution does not meet your needs. For example, you might need to render SVG images, load images from a remote server that requires authentication, or apply a caching strategy to avoid repeated downloads. A custom loader gives you full control over how image URIs are resolved and what image types your `Markdown` control can display.

## See also
- [Markdown control](/controls/data-display/text-display/markdown)
- [Rendering markdown](/docs/app-development/rendering-markdown)