---
description: TUTORIALS - Music Store App
---

import MusicStoreLoadedDataStartScreenshot from '/img/tutorials/music-store-app/load-data-at-startup/image-20210310184202271.png';

# Load Data at Start-up

On this page you will add code to load the user's album collection from disk when the app starts.

You have already added code to the business service that can load both the files you will need from disk. All that remains for you to do, is to add some code to the main window view model to handle the start-up.

Follow this procedure to add a method to load the user's album collection from disk:

- Stop the app if it is running
- Locate and open the **MainWindowViewModel.cs** file.
- Add the code as shown:

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

As you can see this method uses the business service to load the list of albums from the disk cache. It then transforms each data model (`Album` class) into a view model (`AlbumViewModel` class). After this all the album view models are added to the observable collection - this will instantly update the UI with the text data for the albums.

You will notice that after the JSON album files are loaded, the second loop loads the cover art image files. This provides your user with visual feedback as quickly as possible (in the form of album tiles with text and the placeholder music note icon) about what albums are in the collection. The cover art is then loaded asynchronously. This ensures that the app remains responsive during the image loading process.

You next step is to schedule the `LoadAlbum` method to run when the app starts.

To schedule the method on the main thread, follow this procedure:

- Keep the **MainWindowViewModel.cs** file open.
- Add a reference to `using System.Reactive.Concurrency;`
- Add this code to the class constructor:

```csharp
RxApp.MainThreadScheduler.Schedule(LoadAlbums);
```

- Click **Debug** to compile and run the project.

<p><img className="image-medium-zoom" src={MusicStoreLoadedDataStartScreenshot} alt="" /></p>
