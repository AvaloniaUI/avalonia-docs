---
id: how-to-bind-image-files
title: How To Bind Image Files
---


# How To Bind Image Files


<GitHubSampleLink title="Loading Images" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/LoadingImages"/>


In Avalonia UI, binding to an image file opens up opportunities for displaying dynamic image content within your application. This guide provides an overview on how to bind image files from various sources.

## Binding to Image Files from Various Sources

Assuming you have images from various sources (i.e., a local resource or a web URL) that you want to display in your view, here's how you can achieve this:

First, in your `ViewModel`, you need to define properties that represent these image sources. The properties can be of type `Bitmap` or `Task<Bitmap>` (if loading the image involves an asynchronous operation). The `ImageHelper` class is used to load these images.

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public Bitmap? ImageFromBinding { get; } = ImageHelper.LoadFromResource(new Uri("avares://LoadingImages/Assets/abstract.jpg"));
    public Task<Bitmap?> ImageFromWebsite { get; } = ImageHelper.LoadFromWeb(new Uri("https://upload.wikimedia.org/wikipedia/commons/4/41/NewtonsPrincipia.jpg"));
}
```

You'll need to have a helper class `ImageHelper` that provides methods to load images from resources and from a web URL. Here's how you can implement this class:

```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Avalonia;
using Avalonia.Media.Imaging;
using Avalonia.Platform;

namespace ImageExample.Helpers
{
    public static class ImageHelper
    {
        public static Bitmap LoadFromResource(Uri resourceUri)
        {
            return new Bitmap(AssetLoader.Open(resourceUri));
        }

        public static async Task<Bitmap?> LoadFromWeb(Uri url)
        {
            using var httpClient = new HttpClient();
            try
            {
                var response = await httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var data = await response.Content.ReadAsByteArrayAsync();
                return new Bitmap(new MemoryStream(data));
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"An error occurred while downloading image '{url}' : {ex.Message}");
                return null;
            }
        }
    }
}
```

The `LoadFromResource` method takes a resource URI and loads the image using the `AssetLoader` class provided by Avalonia. The `LoadFromWeb` method loads an image from a web URL using the `HttpClient` class.

Then, in your view, you can bind these image sources to `Image` controls:

```xml
<Grid ColumnDefinitions="*,*,*" RenderOptions.BitmapInterpolationMode="HighQuality">
    <Image Grid.Column="0" Source="avares://LoadingImages/Assets/abstract.jpg" MaxWidth="300" />
    <Image Grid.Column="1" Source="{Binding ImageFromBinding}" MaxWidth="300" />
    <Image Grid.Column="2" Source="{Binding ImageFromWebsite^}" MaxWidth="300" />
</Grid>
```

The `Source` property of the `Image` control can accept various types of image sources including a file path, a URL, or a resource. Please note that for asynchronous image sources, you must use the `^` character after the binding expression to tell Avalonia that this is an asynchronous binding.

Ensure that local image file paths are accurate, the image file is accessible, and if it's part of your application resources, it's been correctly included in your project. If you're binding to a web image, ensure that the URL is reachable.









