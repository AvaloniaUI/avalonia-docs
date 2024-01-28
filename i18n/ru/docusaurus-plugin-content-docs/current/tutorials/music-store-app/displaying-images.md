---
description: TUTORIALS - Music Store App
---

import MusicStoreDisplayingImagesScreenshot from '/img/tutorials/music-store-app/displaying-images/image-20210310173858088.png';

# Отображение картинок

На этой страницу вы узнаете, как получить растровое изображения для каждого альбома из результатов поиска.
После этого, вы сможете отображать на картинку внутри тайла альбома во `view`, вместо заглушки в виде иконки музыкальной ноты.

## Album Service

Первым делом мы изменим бизнес-сервис, чтобы получать обложки альбомов через Web API _Apple iTunes_.

Выполните указанные ниже действия:

- Остановите приложение, если оно запущено.
- В папке **/Models** найдите и откройте файл **Album.cs**.
- Добавьте код, как показано ниже:

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

Данный метод возвращает поток, который можно использовать для загрузки изображения из кэш-файла или API.

:::info
Обратите внимание, что на данный момент кэш недоступен, по руковдству он будет реализван позже.
:::

- Чтобы увидеть, когда кэш станет доступен, установите точку останова на указанной строке:

```csharp
return File.OpenRead(CachePath + ".bmp");
```

## View Model альбома

На данном этапе, вы добавите свойство для `album view model`, чтобы сохранить обловку как растровое изображение.

:::warning
Вы должны использовать ссылку на `Avalonia.Media.Imaging`, поскольку `album view model` должен использовать 
растровое изображение _Avalonia UI_, а **не** `System.Bitmap` из .NET.
:::

Выполните указанные ниже действия:

- Найдите и откройте файл **AlbumViewModel.cs**.
- Добавьте ссылку на `using Avalonia.Media.Imaging;`.
- Добавьте дополнительный код для обложки альбома, как показано ниже:

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

Take some time to examine this code because it gives an insight into manipulating images with _Avalonia UI._ 
For example, the above uses the `DecodeToWidth` method to convert the image stream for display in _Avalonia UI_. 
This method can convert a stream for a large high resolution image into a smaller bitmap, at a specified width and while maintaining the aspect ratio.

This means that you will not waste large amounts of memory to display the album cover art, even though the Web API returns quite large files.

Also notice how the `LoadCover` method is coded to run asynchronously, and on a background thread. 
This is so that the UI thread does not get blocked and make the UI unresponsive.

## Загрузка обложек

In this step you will alter the album search (in the music store view model) so that the cover art is loaded for each album that is found. 
To maintain the responsiveness of the app, you will make this process both asynchronous and cancellable.

Firstly, you will need to add a method that can start loading the album covers whenever search results are returned. 
You will make this method asynchronous and cancellable.

To add the method to load album cover art, follow this procedure:

- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Добавьте код, как показано ниже:

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
Important note: this method iterates through a **copy** of the search results collection  (created by the `ToList` method). 
This is because it runs asynchronously on its own thread, and the original  results collection could get changed at any time by another thread.
:::

The cancellation token argument will allow you to stop the method loading album covers whenever needed.

## Отмена загрузки картинок

In this step you will call the `LoadCovers` method in the `DoSearch` method (in the music store view model) but with full cancellation management.

Выполните указанные ниже действия:

- В файл **MusicStoreViewModel.cs**, добавьте указанное ниже поле.

```csharp
private CancellationTokenSource? _cancellationTokenSource;
```

- Для установки `cancellation token (рус: оменяемого токена)`, измените код в начале метода `DoSearch`:

```csharp
_cancellationTokenSource?.Cancel();
_cancellationTokenSource = new CancellationTokenSource();
var cancellationToken = _cancellationTokenSource.Token;
```

So if there is an existing request still loading album art, this will cancel it. 
Again, because `_cancellationTokenSource` might be replaced asynchronously by anther thread, 
you have to work with a copy stored as a local variable.

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

## View альбома

In the last step here, you will alter the data bindings in the album view so that the tile can display the album cover image. 
You will also add a test so that the placeholder panel is visible only when the album cover image is not available (is null).

Follow this procedure:

- Найдите и откройте файл **AlbumView.axaml**.
- Добавьте `data binding (рус: привязку данных)` `Source="{Binding Cover}"` к элементу `<Image>`.
- Add this data binding and converter to the panel element below:

```
IsVisible="{Binding Cover, Converter={x:Static ObjectConverters.IsNotNull}}"
```

A converter is an extension of a data binding expression that can convert the binding value before it is passed to the bound control. 
The `IsNull` converter returns a Boolean that is true when the value object is null.

:::info
For more information about the _Avalonia UI_ built-in binding converters, see the reference [here](../../reference/built-in-data-binding-converters.md).
:::

- Нажмите кнопку **Debug**, чтобы собрать и запустить проект.
- Нажмите на кнопку с иконкой.
- Введите какой-нибудь текст.

<p><img className="image-medium-zoom" src={MusicStoreDisplayingImagesScreenshot} alt="" /></p>

Обратите внимание, что обложки альбомов загружаются один за другим, а UI не зависает.

На следйющей страницу вы узнаете, как при нажатии кнопки **Buy Album**, получить выбранный в диалоговом окне альбом.