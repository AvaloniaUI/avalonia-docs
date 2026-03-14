---
id: imageloader
title: ImageLoader
description: Learn how to create a custom ImageLoader for the Avalonia Markdown control to handle SVG, remote, and authenticated image sources.
doc-type: reference
tags:
  - accelerate
---

import Pill from '/src/components/global/Pill';

<Pill variant="primary" href="/tools">Accelerate</Pill>
<br/><br/>

The `Markdown` control supports custom image loading through the `ImageLoader` property. By subclassing `MarkdownImageLoader` and overriding `LoadImageAsync`, you can handle image formats such as SVG, load images from remote servers, apply authentication headers, or add caching logic.

The default image loader resolves standard bitmap formats from absolute URIs. When you need behavior beyond that, create your own loader and assign it to `ImageLoader`.

## Example: loading SVG images

### Required packages

To render SVG content you need the `Avalonia.Svg.Skia` package:

```bash
dotnet add package Avalonia.Svg.Skia
```

### Implementation

The following custom loader detects SVG content by inspecting the first bytes of the stream and delegates to `SvgSource` when appropriate. For all other formats it falls back to a standard `Bitmap`.

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

Assign your custom loader to the `ImageLoader` property in code-behind:

```csharp
var markdown = new Markdown
{
    Text = "![SVG Image](https://example.com/image.svg)",
    ImageLoader = new CustomImageLoader()
};
```

You can also set `ImageLoader` in AXAML by declaring your loader as a static resource:

```xml
<Window.Resources>
    <local:CustomImageLoader x:Key="SvgImageLoader" />
</Window.Resources>

<Markdown Text="![logo](https://example.com/logo.svg)"
          ImageLoader="{StaticResource SvgImageLoader}" />
```

## When to use a custom image loader

- You need to render SVG images inside Markdown content.
- Your images require authentication headers or custom HTTP handling.
- You want to cache downloaded images to avoid repeated network requests.
- You need to resolve images from application resources or embedded assets rather than file or HTTP URIs.

## See also

- [Markdown control](/controls/data-display/text-display/markdown)
- [Rendering markdown](/docs/app-development/rendering-markdown)