---
description: TUTORIALS - Music Store App
---

import MusicStoreiTunesSearchNugetScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310013703557.png';
import MusicStoreAlbumViewScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310110401944.png';

# Album Service

On this page, you will add some business logic to the app This will allow you to replace the mock data and get some real album data from the search. This business logic code forms the 'Model' part of the MVVM pattern.

To implement a real album search in the app, you will use a _NuGet_ package that can call the _Apple iTunes_ Web API album search.

## Apple Web API Package

Follow this procedure to add the required _NuGet_ package:

- Stop the app if it is still running.
- Right-click the project.
- Click **Manage NuGet Packages**.

<p><img className="image-medium-zoom" src={MusicStoreiTunesSearchNugetScreenshot} alt="" /></p>

- Type 'itunes' in the search box (top-left).
- Click **iTunesSearch**, then click **Install**.

## MVVM Model

In this tutorial the application is simple, and you can implement the business services required for the 'Model' part of the MVVM pattern, in one class. This class will contain both the data model for an album, and the method needed for the search.

Follow this procedure to add the album business logic:

- In the solution explorer, right-click the **/Models** folder and then click **Add**. 
- Click **Class**.
- When prompted for the name, type 'Album'.
- Add the following code:

```csharp
using iTunesSearch.Library;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Avalonia.MusicStore.Models
{
    public class Album
    {
        private static iTunesSearchManager s_SearchManager = new();

        public string Artist { get; set; }
        public string Title { get; set; }
        public string CoverUrl { get; set; }

        public Album(string artist, string title, string coverUrl)
        {
            Artist = artist;
            Title = title;
            CoverUrl = coverUrl;
        }

        public static async Task<IEnumerable<Album>> SearchAsync(string searchTerm)
        {
            var query = await s_SearchManager.GetAlbumsAsync(searchTerm)
                .ConfigureAwait(false);
                
            return query.Albums.Select(x =>
                new Album(x.ArtistName, x.CollectionName, 
                    x.ArtworkUrl100.Replace("100x100bb", "600x600bb")));
        }
    }  
}
```

## Album View Model

In order to display the data from the Web API for each album (data model) in the search results list, you will create an album view model, and this will be bound to the album view (tile) for display.

Your album view model is currently empty. It will need to be able to store the album data from the search, and have some properties for the artist name and album title. These will then be bound to the view for display.

In this step you will use a common pattern for the dependent relationship between a view model and a (business logic) model. This is where the view model contains an instance of the data model, and then exposes certain of its properties, as required for display.

Follow this procedure to prepare the album view model:

- Locate and open the **AlbumViewModel.cs** file.
- Add the code as shown:

```csharp
private readonly Album _album;

public AlbumViewModel(Album album)
{
    _album = album;
}

public string Artist => _album.Artist;

public string Title => _album.Title;
```

Note that as the view model properties will not change in the UI during runtime, they have no setter and a plain getter.

## Start the Search

In this step, you will add some code to the music store view model so that whenever the search text changes, the `SearchAsync` method on the album model (business service) is started. When it finishes, the search places its results in the observable collection `SearchResults`. This collection is already bound to the list box, so with a small adjustment to the album view, the results of the search will display as the tiles you prepared earlier.  

Follow this procedure to trigger the search when the search text changes:

- Locate and open the **MusicStoreViewModel.cs** file.
- Use the following logic in your constructor and supporting methods:

```csharp
         public MusicStoreViewModel()
        {
            PropertyChanged += async (s, e) =>
            {
                if (e.PropertyName == nameof(SearchText))
                {
                    await SearchWithDelayAsync(SearchText);
                }
            };
        }
```
This event handler listens for changes to any property, but filters specifically for changes to SearchText. When the user types, this event is raised and triggers a debounced search.
To avoid making a request on every keystroke, a small delay is used before starting the actual search:
```csharp
private async Task SearchWithDelayAsync(string? term)
{
    _searchDebounceCts?.Cancel();
    _searchDebounceCts = new CancellationTokenSource();
    var token = _searchDebounceCts.Token;

    try
    {
        await Task.Delay(400, token);
        if (!token.IsCancellationRequested && !string.IsNullOrWhiteSpace(term))
        {
            await DoSearch(term);
        }
    }
    catch (TaskCanceledException)
    {
    }
}
```
This method introduces a 400ms delay. If the user continues typing before the delay completes, the previous search is canceled. This prevents unnecessary calls to the album API and ensures the app only performs the search once the user pauses.

Once the debounce period completes, the actual search logic runs:
```csharp
private async Task DoSearch(string term)
{
    _cancellationTokenSource?.Cancel();
    _cancellationTokenSource = new CancellationTokenSource();
    var cancellationToken = _cancellationTokenSource.Token;

    IsBusy = true;
    SearchResults.Clear();

    var albums = await Album.SearchAsync(term);

    foreach (var album in albums)
    {
        var vm = new AlbumViewModel(album);
        SearchResults.Add(vm);
    }

    IsBusy = false;
}
```
This method:
- Cancels any previous ongoing search (_cancellationTokenSource).
- Sets a busy flag to show the loading spinner in the UI.
- Clears existing results.
- Calls the album model's SearchAsync method to fetch data from the iTunes API.
- Wraps each result in an AlbumViewModel and adds it to SearchResults.

Now your **MusicStoreViewModel** file should now look like this:
```csharp
using Avalonia.MusicStore.Models;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

namespace Avalonia.MusicStore.ViewModels
{
    public partial class MusicStoreViewModel : ViewModelBase
    {
        private CancellationTokenSource? _cancellationTokenSource;
        private CancellationTokenSource? _searchDebounceCts;

        [ObservableProperty] private string? searchText;

        [ObservableProperty] private bool isBusy;

        public ObservableCollection<AlbumViewModel> SearchResults { get; } = new();


        public MusicStoreViewModel()
        {
            PropertyChanged += async (s, e) =>
            {
                if (e.PropertyName == nameof(SearchText))
                {
                    await SearchWithDelayAsync(SearchText);
                }
            };
        }

        private async Task SearchWithDelayAsync(string? term)
        {
            _searchDebounceCts?.Cancel();
            _searchDebounceCts = new CancellationTokenSource();
            var token = _searchDebounceCts.Token;

            try
            {
                await Task.Delay(400, token);
                if (!token.IsCancellationRequested && !string.IsNullOrWhiteSpace(term))
                {
                    DoSearch(term);
                }
            }
            catch (TaskCanceledException)
            {
            }
        }

        private async Task DoSearch(string term)
        {
            _cancellationTokenSource?.Cancel();
            _cancellationTokenSource = new CancellationTokenSource();
            var cancellationToken = _cancellationTokenSource.Token;

            IsBusy = true;
            SearchResults.Clear();

            var albums = await Album.SearchAsync(term);

            foreach (var album in albums)
            {
                var vm = new AlbumViewModel(album);
                SearchResults.Add(vm);
            }

            IsBusy = false;
        }

    }
}

```

## Bind the Album View

Your work on the previous page to format the album 'tile' view did not add any way to display the text results of the search.

Follow this procedure to add the album name and artist name to the tile:

- Locate and open the **AlbumView.axaml** file.
- Add the two text block controls with their data bindings, as shown:
- To have compiled binding working, you need to indicate the datatype used in the view : AlbumViewModel.

```xml
<UserControl ...
  xmlns:vm="using:Avalonia.MusicStore.ViewModels"
  x:DataType="vm:AlbumViewModel" >

  <StackPanel Spacing="5" Width="200">
    <Border CornerRadius="10" ClipToBounds="True">
      <Panel Background="#7FFF22DD">
        <Image Width="200" Stretch="Uniform" />
        <Panel Height="200">
          <PathIcon Height="75" Width="75" Data="{StaticResource music_regular}" />
        </Panel>
      </Panel>
    </Border>
    <TextBlock HorizontalAlignment="Center" Text="{Binding Title}"/>
    <TextBlock HorizontalAlignment="Center" Text="{Binding Artist}"/>
  </StackPanel>
</UserControl>
```

- Click **Debug** to compile and run the project.
- Click the icon button.
- Type some search text.

<p><img className="image-medium-zoom" src={MusicStoreAlbumViewScreenshot} alt="" /></p>

On the next page, you will learn how to improve the look of the app by retrieving the cover art for each album. This will be displayed on the tile instead of the note icon.
