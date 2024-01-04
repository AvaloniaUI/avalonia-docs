---
description: TUTORIALS - Music Store App
---

import MusicStoreLoadedDataStartScreenshot from '/img/tutorials/music-store-app/load-data-at-startup/image-20210310184202271.png';

# Загрузка данных при запуске

На этой страницу вы добавите код для загрузки с диска альбомов пользователя при запуске приложения.

Ранее, вы уже добавили код в сервис, который может загрузить нужные файлы с диска.
Все что осталось сделать - это добавить немного кода во `view model` основного окна для обработки запуска.

Для добавления метода загрузки с диска коллекции альбомов пользователя, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindowViewModel.cs**.
- Добавьте код, как показано ниже:

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

Как вы можете заметить, метод использует сервис для загрузки списка альбомов из кэша диска.
Далее, мы преобразовываем каждую `data model` (класс `Album`) во `view model` (класс `AlbumViewModel`).
После этого, все `view models` альбомов добавлены в `observable` коллекцию, что позволяет моментально обновлять UI
данными из альбомов.

Обратите внимание, что после загрузки альбомов из JSON-файла, вторым циклом идет загрузка обложек альбомов.
Это позволяет пользователю сразу увидеть, какие альбомы есть в коллекции (в виде плиток и значком по-умолчанию вместо иконки).
После происходит **асинхронная** загрузка обложек, что гарантирует отзывчивость приложения.

Теперь осталось добавить включение метода `LoadAlbum` при запуске приложения.

Для запуска метода в основном потоке, выполните следующие действия:

- Оставьте открытым файл **MainWindowViewModel.cs**.
- Добавьте зависимость `using System.Reactive.Concurrency;`
- Добавьте код в конструктор класса:

```csharp
RxApp.MainThreadScheduler.Schedule(LoadAlbums);
```

- Нажмите  **Debug** для сборки и запуска проекта.

<p><img className="image-medium-zoom" src={MusicStoreLoadedDataStartScreenshot} alt="" /></p>
