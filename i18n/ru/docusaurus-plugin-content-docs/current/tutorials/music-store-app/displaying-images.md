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
Обратите внимание, что на данный момент кэш недоступен, по руководству он будет реализован позже.
:::

- Чтобы увидеть, когда кэш станет доступен, установите точку останова на указанной строке:

```csharp
return File.OpenRead(CachePath + ".bmp");
```

## View Model альбома

На данном этапе, вы добавите свойство для `album view model`, чтобы сохранить обложку как растровое изображение.

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

Потратьте немного времени на изучения написанного кода, в нем описано манипулирование изображениями с помощью _Avalonia UI_.
К примеру, в приведенном выше примере используется метод `DecodeToWidth`, который преобразует поток изображений для отображения через _Avalonia UI_.
Этот метод может преобразовать поток для изображения с высоким разрешением в растровое меньшего размера, с заданной шириной и сохранением соотношения сторон.

Это означает, что вы не будете тратить много памяти для отображения обложек альбомов, несмотря на то, что Web API возвращает довольно большие файлы.

Также обратите внимание на метод `LoadCover`, он написан для асинхронного запуска в фоновом потоке.
Это делается для того, чтобы блокировать UI-поток, иначе UI будет зависать.

## Загрузка обложек

На этом шаге, вы измените поиска альбома (в `music store view model`) таким образом,
чтобы обложка загружалась для каждого найденного альбома.
Для сохранения отзывчивости приложения, вы сделаете этот процесс асинхронным, с возможностью его отмены.

Во-первых, вам необходимо добавить метод, который сможет запускать загрузку обложек альбомов при изменении результатов поиска.
Вы сделаете его асинхронным и отменяемым.

Для добавления метода загрузки обложек альбомов, выполните указанные ниже действия:

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
Вжное примечание: данный метод выполняет итерации по **копии** коллекции результатов поиска (создается методом `ToList`).
Это связано с тем, что он выполняется асинхронно в другом потоке, а исходная коллекция может быть изменена другим поток в любое время.
:::

Аргумент `cancellation token (рус: токена отмены)`, позволит вам по необходимости отменить выполнение метода по загрузке обложек альбомов.

## Отмена загрузки картинок

На этом шаге, вы вызовите метод `LoadCovers` в методе `DoSearch`, но с возможностью отмены.

Выполните указанные ниже действия:

- В файл **MusicStoreViewModel.cs**, добавьте указанное ниже поле.

```csharp
private CancellationTokenSource? _cancellationTokenSource;
```

- Для установки `cancellation token (рус: отменяемого токена)`, измените код в начале метода `DoSearch`:

```csharp
_cancellationTokenSource?.Cancel();
_cancellationTokenSource = new CancellationTokenSource();
var cancellationToken = _cancellationTokenSource.Token;
```

Теперь, если запрос загрузки обложек альбомов существует, то он будет отменен.
Опять же, поскольку `_cancellationTokenSource` может быть асинхронно заменен другим потоком,
вам придется работать с копией, сохраненной как локальная переменная.

- В конец метода `DoSearch`, добавьте указанный ниже код:

```csharp
if (!cancellationToken.IsCancellationRequested)
{
    LoadCovers(cancellationToken);
}
```

На данный момент, метод `DoSearch` должен быть похож на указанный ниже:

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

Последним шагом, вы измените `data bindings (рус: привязки данных)` в `album view`,
чтобы на тайле можно было вывести обложку альбома.
Вы также добавите проверку, чтобы заполнитель был виден в моменты, когда обложка альбома недоступна (имеет значение `null`).

Выполните указанные ниже действия:

- Найдите и откройте файл **AlbumView.axaml**.
- Добавьте `data binding (рус: привязку данных)` `Source="{Binding Cover}"` к элементу `<Image>`.
- Добавьте `data binding (рус: привязку данных)` и `converter (рус: преобразователь)` в `Panel`, как показано ниже:

```
IsVisible="{Binding Cover, Converter={x:Static ObjectConverters.IsNotNull}}"
```

`Converter (рус: преобразователь)` - это расширение `data binding expression (рус: выражения привязки данных)`, которое может преобразовать привязанное значение перед его передачей к привязанному элементу.
Значение `IsNull` возвращает логический результат, равный `true`, если объект `value` равен `null`.

:::info
Подробнее о встроенных в _Avalonia UI_ `converters (рус: преобразователях)`, см. [здесь](../../reference/built-in-data-binding-converters.md).
:::

- Нажмите кнопку **Debug**, чтобы собрать и запустить проект.
- Нажмите на кнопку с иконкой.
- Введите какой-нибудь текст.

<p><img className="image-medium-zoom" src={MusicStoreDisplayingImagesScreenshot} alt="" /></p>

Обратите внимание, что обложки альбомов загружаются один за другим, а UI не зависает.

На следующей страницу вы узнаете, как при нажатии кнопки **Buy Album**, получить выбранный в диалоговом окне альбом.
