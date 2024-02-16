---
description: TUTORIALS - Music Store App
---

# Добавление Data Persistence

На этой странице, вы добавите немного кода в модель альбома, 
который будет сохранять на диск, а потом считывать при запуске коллекцию альбомов пользователя.

В качестве приятного бонуса, будет кэширование обложек альбомов.
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

Следующим шагом, вы добавите метод во `view model` альбома, который взаимодействует
со следующими `persistence` методами сохранения:

`SaveAsync` - сохраняет текстовые данные альбома как JSON-файл,

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

Также обратите внимание,что изображение сохраняется из копии, на случай, если свойство `Cover` изменится другим поток во время выполнения операции.

## `View Model` основного окна

Вы будете вызывать метод `SaveToDiskAsync` из `view model` нового альбома,
когда диалоговое окно будет возвращать `non-null` значение.

Для изменения `view model` основного окна, выполните следующие действия:

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

Пока вы не увидите изменений в приложении, но вы можете проверить, записываются ли на диск сохраняемые файлы.
Для этого откройте проект и перейдите в папку **/bin/Debug**.
Далее откройте папку с названием вашей версии .NET, в ней вы найдете папку **/Cache**.
Вы увидите два кэш-файла для каждого из альбомов, которые вы выбрали ранее.

## Bitmap Cache Activated

Обратите внимание, что поскольку метод `SaveToDiskAsync` пишет оба файл, и JSON-файл, и изображение альбома
в папку с кэшем, то этим повышается эффективность при последующей загрузки данных.
Смотрите сами: если обложка альбома уже была загружена ранее по Web API и сохранена в кэш,
то последующая загрузка этого же изображения будет идти с диска, а не по API.
А это экономит время и делает приложение более отзывчивым.

Чтобы увидеть работу загрузки из кэша, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В папке **/Models** найдите и откройте файл **Album.cs**.
- Проверьте, стоит ли еще точка останова в методе `LoadCoverBitmapAsync` на строке:

```csharp
return File.OpenRead(CachePath + ".bmp");
```

* Нажмите **Debug** для сборки и запуска проекта.
* Нажмите кнопку с иконкой.
* В строку поиска введите название добавленного альбома.
* Выберите один из альбомов из предыдущего запуска.
* Нажмите **Buy Album**

Точка останова должна приостановить работу приложения.
Это показывает, что обложка альбома будет считывать с диска, а не получена через Web API.

На следующей страницу, вы завершите работу над функциями сохранения и загрузки коллекции альбомов пользователя
из кэша при первом запуске приложения.