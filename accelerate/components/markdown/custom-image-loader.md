# Customizing Image Loading in Markdown

The `Markdown` control supports custom image loading via the `ImageLoader` property. This allows you to handle image formats such as SVG, remote images, or any custom logic for image resolution.

## Example: Loading SVG Images


### Required Packages

To use the custom image loader example above, you need to install the following NuGet packages:

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
            if (uri.Scheme == "http" || uri.Scheme == "https")
            {
                using var stream = await DownloadImage(uri);
                var isSvg = IsSvgFile(stream);
                if (isSvg)
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
            else if (uri.Scheme == "file" && File.Exists(uri.LocalPath))
            {
                image = new Bitmap(uri.LocalPath);
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

## When to Use
- To support SVG images in Markdown
- To implement custom caching or authentication for images

## See Also
- [Markdown Control Quick Start](quickstart.md)
- [Markdown Styling and Customization](styling.md)
