---
description: TUTORIALS - Music Store App
---

# Add Data Persistence

On this page, you will add some code to the album model (business service) to save the user's album collection to disk, so that it can be recovered when the app next runs.

As a welcome side-effect, this will also activate the album cover cache - so that album cover images can be retrieved from disk (if they exist), rather than from the Web API.

## Album Model 

Follow this procedure to add persistence services (save and load) to the album model:

- Stop the app if it is running.
- Locate and open the **Album.cs** file in the **/Models** folder.
- Add the code to implement save to disk, as shown:

```csharp
public async Task SaveAsync()
{
    if (!Directory.Exists("./Cache"))
    {
        Directory.CreateDirectory("./Cache");
    }

    using (var fs = File.OpenWrite(CachePath))
    {
        await SaveToStreamAsync(this, fs);
    }
}

public Stream SaveCoverBitmapStream()
{
    return File.OpenWrite(CachePath + ".bmp");
}

private static async Task SaveToStreamAsync(Album data, Stream stream)
{
    await JsonSerializer.SerializeAsync(stream, data).ConfigureAwait(false);
}
```

- Add the code to implement load from disk, as shown:

```csharp
public static async Task<Album> LoadFromStream(Stream stream)
{
    return (await JsonSerializer.DeserializeAsync<Album>(stream).ConfigureAwait(false))!;
}

public static async Task<IEnumerable<Album>> LoadCachedAsync()
{
    if (!Directory.Exists("./Cache"))
    {
        Directory.CreateDirectory("./Cache");
    }

    var results = new List<Album>();

    foreach (var file in Directory.EnumerateFiles("./Cache"))
    {
        if (!string.IsNullOrWhiteSpace(new DirectoryInfo(file).Extension)) continue;

        await using var fs = File.OpenRead(file);
        results.Add(await Album.LoadFromStream(fs).ConfigureAwait(false));
    }

    return results;
}
```

## Album View Model

Your next step is to add a method to the album view model that it can call the business service persistence save methods:

`SaveAsync` - persists the album text data as a JSON file,

`SaveCoverBitmapStream` - saves the cover art as a bitmap (.BMP) file.

To alter the album view model , follow this procedure:

- Locate and open the **AlbumViewModel.cs** file.
- Add the method as shown:

```csharp
public async Task SaveToDiskAsync()
{
    await _album.SaveAsync();

    if (Cover != null)
    {
        var bitmap = Cover;

        await Task.Run(() =>
        {
            using (var fs = _album.SaveCoverBitmapStream())
            {
                bitmap.Save(fs);
            }
        });
    }
}
```

Once again, you will notice that the bitmap is saved from a copy in case the `Cover` property gets changed mid-operation by another thread.

## Main Window View Model

Lastly, you will call the new album view model persistence method `SaveToDiskAsync` whenever the dialog returns with a non-null result.

To alter the main window view model, follow this procedure:

- Locate and open the **MainWindowViewModel.cs** file.
- Add the code `await result.SaveToDiskAsync();` as shown below.

Your code to initialize the reactive command will now look like this:

```csharp
BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
{
    var store = new MusicStoreViewModel();

    var result = await ShowDialog.Handle(store);

    if (result != null)
    {
        Albums.Add(result);
        await result.SaveToDiskAsync();
    }
});
```

- Click **Debug** to compile and run the project.
- Click the icon button.
- Type some search text.
- Click an album to select it.
- Click **Buy Album**.
- Repeat another time for a different album.

You will not see any difference in the app yet. But you can check to see that the persistence files are being written. To do this open the project location and browse to the **/bin/Debug** folder. Open the folder for your .NET version, and you will find the **/Cache** folder there. You will see two cache files for each of the albums that you just selected.

## Bitmap Cache Activated

Notice that because the `SaveToDiskAsync` method writes both the JSON data and the album cover art bitmap to the cache folder, this step has effectively activated the bitmap loading cache behaviour that you built earlier. This is where: if an album cover has already been retrieved from the Web API and saved to the cache, the next bitmap load will be from the file not the API - saving time and making the app more responsive.

To show that the bitmap loading cache is now in operation, follow this procedure:

- Stop the app if it is running.
- Locate and open the **Album.cs** file in the **/Models** folder.
- Check to see that there is still a debug breakpoint in the `LoadCoverBitmapAsync` method at this line:

```csharp
return File.OpenRead(CachePath + ".bmp");
```

* Click **Debug** to compile and run the project.
* Click the icon button.
* Type the same search text you just used.
* Select one of the _same_ albums from the previous test run.
* Click **Buy Album**

The debug breakpoint should stop the app. This demonstrates that the album art is about to be read from disk, rather than retrieved from the Web API.

On the next page, you will complete the persistence feature, and load the user's album collection from the cache when the app first starts up.

