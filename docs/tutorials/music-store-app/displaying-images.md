---
description: TUTORIALS - Music Store App
---

import MusicStoreDisplayingImagesScreenshot from '/img/tutorials/music-store-app/displaying-images/image-20210310173858088.png';

# Displaying Images

On this page, you will learn how to retrieve the cover art bitmap for each album in the search results. You will then be able to display the image on each album tile view instead of the placeholder note icon.

## Album Service

Your first step is to modify the business service to retrieve the album cover art from the _Apple iTunes_ Web API.

Follow this procedure to get the album cover art from the Web API:

- Stop the app if it is still running.
- Locate and open the **Album.cs** file in the **/Models** folder.
- Add the code as shown:

```csharp
private static HttpClient s_httpClient = new();
private string CachePath => $"./Cache/{Artist} - {Title}";

public async Task<Stream> LoadCoverBitmapAsync()
{
    if (File.Exists(CachePath + ".bmp"))
    {
        return File.OpenRead(CachePath + ".bmp");
    }
    else
    {
        var data = await s_httpClient.GetByteArrayAsync(CoverUrl);
        return new MemoryStream(data);
    }
}
```

This method returns a stream that can be used to load a bitmap from, either from a cache file or from the API.

:::info
Note that the cache is not active at this time, you will implement it later in the tutorial.
:::

- So that you will see as soon as the cache becomes active, place a debug breakpoint at the following line:;

```csharp
return File.OpenRead(CachePath + ".bmp");
```

## Album View Model

In this step , you will add a property to the album view model to store the cover art as a bitmap.

:::warning
Note: You must reference `Avalonia.Media.Imaging` in the album view model because you must use the _Avalonia UI_ bitmap here, and **not** the .NET `System.Bitmap`.
:::

Follow this procedure to update the album view model:

- Locate and open the **AlbumViewModel.cs** file.
- Add the `using Avalonia.Media.Imaging;` reference.
- Add the extra code for the album cover, as shown:

```csharp
using Avalonia.Media.Imaging;
...

public class AlbumViewModel : ViewModelBase
{
    ...
    
    private Bitmap? _cover;

    public Bitmap? Cover
    {
        get => _cover;
        private set => this.RaiseAndSetIfChanged(ref _cover, value);
    }
    
    public async Task LoadCover()
    {
        await using (var imageStream = await _album.LoadCoverBitmapAsync())
        {
            Cover = await Task.Run(() => Bitmap.DecodeToWidth(imageStream, 400));
        }
    }
}   
```

Take some time to examine this code because it gives an insight into manipulating images with _Avalonia UI._ For example, the above uses the `DecodeToWidth` method to convert the image stream for display in _Avalonia UI_. This method can convert a stream for a large high resolution image into a smaller bitmap, at a specified width and while maintaining the aspect ratio.

This means that you will not waste large amounts of memory to display the album cover art, even though the Web API returns quite large files.

Also notice how the `LoadCover` method is coded to run asynchronously, and on a background thread. This is so that the UI thread does not get blocked and make the UI unresponsive.

## Load Cover Art

In this step you will alter the album search (in the music store view model) so that the cover art is loaded for each album that is found. To maintain the responsiveness of the app, you will make this process both asynchronous and cancellable.

Firstly, you will need to add a method that can start loading the album covers whenever search results are returned. You will make this method asynchronous and cancellable.

To add the method to load album cover art, follow this procedure:

- Locate and open the **MusicStoreViewModel.cs** file.
- Add the code as shown:

```csharp
private async void LoadCovers(CancellationToken cancellationToken)
{
    foreach (var album in SearchResults.ToList())
    {
        await album.LoadCover();

        if (cancellationToken.IsCancellationRequested)
        {
            return;
        }
    }
}
```

:::warning
Important note: this method iterates through a **copy** of the search results collection  (created by the `ToList` method). This is because it runs asynchronously on its own thread, and the original  results collection could get changed at any time by another thread.
:::

The cancellation token argument will allow you to stop the method loading album covers whenever needed.

## Cancellable Image Load

In this step you will call the `LoadCovers` method in the `DoSearch` method (in the music store view model) but with full cancellation management.

Follow this procedure:

- Add this field to the **MusicStoreViewModel.cs** file.

```csharp
private CancellationTokenSource? _cancellationTokenSource;
```

- Modify the code at the beginning of the `DoSearch` method to set up the cancellation token:

```csharp
_cancellationTokenSource?.Cancel();
_cancellationTokenSource = new CancellationTokenSource();
var cancellationToken = _cancellationTokenSource.Token;
```

So if there is an existing request still loading album art, this will cancel it. Again, because `_cancellationTokenSource` might be replaced asynchronously by another thread, you have to work with a copy stored as a local variable.

- Add the following code to the end of `DoSearch` method:

```csharp
if (!cancellationToken.IsCancellationRequested)
{
    LoadCovers(cancellationToken);
}
```

At this stage, your `DoSearch` method should look like this:

```csharp
private async void DoSearch(string s)
{
    IsBusy = true;
    SearchResults.Clear();

    _cancellationTokenSource?.Cancel();
    _cancellationTokenSource = new CancellationTokenSource();
    var cancellationToken = _cancellationTokenSource.Token;

    if (!string.IsNullOrWhiteSpace(s))
    {
        var albums = await Album.SearchAsync(s);

        foreach (var album in albums)
        {
            var vm = new AlbumViewModel(album);

            SearchResults.Add(vm);
        }

        if (!cancellationToken.IsCancellationRequested)
        {
            LoadCovers(cancellationToken);
        }
    }

    IsBusy = false;
}
```

## Album View

In the last step here, you will alter the data bindings in the album view so that the tile can display the album cover image. You will also add a test so that the placeholder panel is visible only when the album cover image is not available (is null).

Follow this procedure:

- Locate and open the **AlbumView.axaml** file.
- Add the data binding `Source="{Binding Cover}"` to the `<Image>` element:
- Add this data binding and converter to the panel element below:

```
IsVisible="{Binding Cover, Converter={x:Static ObjectConverters.IsNull}}"
```

A converter is an extension of a data binding expression that can convert the binding value before it is passed to the bound control. The `IsNull` converter returns a Boolean that is true when the value object is null.

:::info
For more information about the _Avalonia UI_ built-in binding converters, see the reference [here](../../reference/built-in-data-binding-converters.md).
:::

- Click **Debug** to compile and run the project.
- Click the icon button.
- Type some search text.

<p><img className="image-medium-zoom" src={MusicStoreDisplayingImagesScreenshot} alt="" /></p>

Notice how the album covers load one by one, and the UI remains responsive.

On the next page, you will learn how to return the selected album from dialog, when the user clicks  **Buy Album**.
