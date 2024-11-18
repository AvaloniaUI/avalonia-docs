---
description: TUTORIALS - Music Store App
---

import MusicStoreLoadedDataStartScreenshot from '/img/tutorials/music-store-app/load-data-at-startup/image-20210310184202271.png';

# Загрузка данных при запуске

На этой странице вы узнаете, как добавить в код загрузку с диска пользовательской коллекции альбомов при запуске приложения.

Ранее, вы уже добавили код сервиса, который может загрузить данные из обоих файлов на диске.
Все что осталось, так это добавить немного кода во `view model` основного окна для загрузки при запуске.

Выполните указанные ниже действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindowViewModel.cs**.
- Добавьте код, указанный ниже:

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
Как вы могли заметить, данный метод использует сервис для загрузки списка альбомов с диска.
Далее, каждая модель данных (класс `Album`), преобразуется во `view model` (класс `AlbumViewModel`).
И наконец, все `view model` альбомов добавляются в `observable` коллекцию, которая моментально обновляет UI.

Как видно из метода, после обработки JSON-файлов с альбомами, идет второй цикл, в котором загружаются обложки альбомов.
Данный способ позволяет отобразить для пользователя данные по альбомам так быстро, насколько это возможно.
Поскольку загрузка обложек может занять время, то чтобы не заставлять пользователя ждать, она происходит асинхронно.
По этой причине, пока не загрузится обложка, будет отображать иконка музыкальной ноты.

Следующим шагом вы добавить запуск метода `LoadAlbum` при старте приложения.

Выполните указанные ниже действия:

- Оставьте открытым файл **MainWindowViewModel.cs**.
- Добавьте ссылку на `using System.Reactive.Concurrency;`
- В класс конструктора добавьте указанный ниже код:

```csharp
RxApp.MainThreadScheduler.Schedule(LoadAlbums);
```

- Нажмите **Debug** для сборки и запуска проекта.

<p><img className="image-medium-zoom" src={MusicStoreLoadedDataStartScreenshot} alt="" /></p>

