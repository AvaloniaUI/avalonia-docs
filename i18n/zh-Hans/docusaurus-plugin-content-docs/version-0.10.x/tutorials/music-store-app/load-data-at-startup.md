---
info: load-data-at-startup
title: Load data at Startup
---

## Loading Albums on Startup

Our backend code provides a nice way to load the users collection from disk.

Add a method to `MainWindowViewModel.cs` like:

```csharp
private async void LoadAlbums()
{
    var albums = (await Album.LoadCachedAsync()).Select(x => new AlbumViewModel(x));

    foreach (var album in albums)
    {
        Albums.Add(album);
    }

    foreach (var album in Albums.ToList())
    {
        await album.LoadCover();
    }
}
```

Register it in the constructor of the same class like:

```csharp
RxApp.MainThreadScheduler.Schedule(LoadAlbums);
```

If you get an error about "Cannot resolve method Schedule", you may be missing the line `using System.Reactive.Concurrency;` in `MainWindowViewModel`'s using section.

As you can see it firstly uses the business logic apis to load the list of `Albums`. It then transforms each one into an `AlbumViewModel`. After this we add each `AlbumViewModel` instance to the `ObservableCollection` of `Albums`, this will instantly update the UI.

Note we then re-iterate over the `Albums` and asynchronously load each cover. Note that we do this after adding all the albums to the list, as its more important to quickly show the user all the albums available and then load the images.

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/music-store-app/load-data-at-startup/image-20210310184202271.png" />
  </div>