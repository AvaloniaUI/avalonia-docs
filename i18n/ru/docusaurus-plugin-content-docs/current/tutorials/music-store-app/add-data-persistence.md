---
description: TUTORIALS - Music Store App
---

# Add Data Persistence

На этой странице, вы добавите немного кода в модель альбома, 
который будет сохранять на диск, а потом считывать при запуске коллекцию альбомов пользователя.

В качестве приятного бонуса, будут кэшироваться обложки альбомов.
Благодаря чему, они тоже будут считываться с диска (при наличии), а не загружать по Web API.

## Модель альбома

Для добавления `persistance` сервиса (сохранение и загрузка) в модель альбом, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В папке **/Models** найдите и откройте файл **Album.cs**.
- Добавьте код реализации сохранения на диск, как показано ниже:

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

- Добавьте код реализации загрузки с диска, как показано ниже:

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

## `View Model` альбома

Your next step is to add a method to the album view model 
that it can call the business service persistence save methods:

`SaveAsync` - сохраняет тектовые данные альбома как JSON-файл,

`SaveCoverBitmapStream` - сохраняет обложку в виде файла изображения формата `.BMP`.

Для изменения `view model` альбома, выполните следующие действия:

- Найдите и откройте файл **AlbumViewModel.cs**.
- Добавьте метод, как показано ниже:

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

Once again, you will notice that the bitmap is saved from 
a copy in case the `Cover` property gets changed mid-operation by another thread.

## `View Model` основного окна

Lastly, you will call the new album view model persistence method `SaveToDiskAsync`
whenever the dialog returns with a non-null result.

To alter the main window view model, follow this procedure:

- Найдите и откройте файл **MainWindowViewModel.cs**.
- Добавьте код `await result.SaveToDiskAsync();`, как показано ниже.

Ваш код инициализации реактивной команды, теперь выглядит следующим образом:

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

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите кнопку с иконкой.
- В строку поиска введите название.
- Нажмите на альбом, чтобы выбрать его.
- Нажмите **Buy Album**.
- Повторите действия для другого альбома.

You will not see any difference in the app yet. 
But you can check to see that the persistence files are being written. 
To do this open the project location and browse to the **/bin/Debug** folder. 
Open the folder for your .NET version, and you will find the **/Cache** folder there. 
You will see two cache files for each of the albums that you just selected.

## Bitmap Cache Activated

Notice that because the `SaveToDiskAsync` method writes both the JSON data and the album cover art bitmap to the cache folder, this step has effectively activated the bitmap loading cache behaviour that you built earlier. This is where: if an album cover has already been retrieved from the Web API and saved to the cache, the next bitmap load will be from the file not the API - saving time and making the app more responsive.

To show that the bitmap loading cache is now in operation, follow this procedure:

- Остановите приложение, если оно запущено.
- В папке **/Models** найдите и откройте файл **Album.cs**.
- Проверье, стоит ли еще точка останова в методе `LoadCoverBitmapAsync` на строке:

```csharp
return File.OpenRead(CachePath + ".bmp");
```

* Нажмите **Debug** для сборки и запуска проекта.
* Нажмите кнопку с иконкой.
* В строку поиска введите название добавленного альбома.
* Выберите один из альбомов из предыдущегозапуска.
* Нажмите **Buy Album**

Точка останова должна приостановить работу приложения.
Это показывает, что обложка альбома будет считывать с диска, а не получена через Web API.

На следующей страницу, вы завершите работу над функциями сохранения и загрузки коллекции альбомов пользователя
из кэша при первом запуске приложения.