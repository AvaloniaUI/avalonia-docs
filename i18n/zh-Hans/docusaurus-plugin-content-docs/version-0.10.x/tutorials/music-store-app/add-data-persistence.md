---
id: add-data-persistence
title: Add Data Persistence
---

## Persisting Music Collection

Persistence is the job of the business logic \(`model`\) code. However here we will see it's very simple to wire this up to the UI.

Add the following method to `AlbumViewModel` this will call our backend logic to save the Album to the users collection. The backend also provides a way to cache the album bitmap. It provides us a stream we can save our bitmap to.

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

Now we can simply call this method when our dialog returns its result in `MainWindowViewModel.cs`.

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
