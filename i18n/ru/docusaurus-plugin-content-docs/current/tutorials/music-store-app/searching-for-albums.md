---
description: TUTORIALS - Music Store App
---

import MusicStoreiTunesSearchNugetScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310013703557.png';
import MusicStoreAlbumViewScreenshot from '/img/tutorials/music-store-app/searching-for-albums/image-20210310110401944.png';

# Album Service

На этой страницу вы расширите бизнес-логику приложения, заменив фейковые данные при поиске альбомов на реальные.
Код бизнес-логики относится к 'Model (рус: модели)' паттерна MVVM.

Для реализации реального поиска альбомов в приложении, вы будете использовать _NuGet_ пакет,
именуемый _Apple iTunes_ Web API.

## Пакет Apple Web API

Для добавления требуемого _NuGet_ пакета, выполните указанные ниже действия:

- Остановите приложение, если оно запущено.
- Нажмите ПКМ по проекту.
- Нажмите **Manage NuGet Packages**.

<p><img className="image-medium-zoom" src={MusicStoreiTunesSearchNugetScreenshot} alt="" /></p>

- Введите 'itunes' в строку поиска (слева-сверху).
- Нажмите **iTunesSearch**, а после **Install**.

## MVVM Model

Поскольку в данном руководстве рассматривается простое приложение,
то вы можете реализовать требуемую бизнес-логику для 'Model (рус: модели)' паттерна MVVM, в одном классе.
Данный класс будет включать как модель данных альбома, так и методы поиска.

Для добавления бизнес логики альбома, выполните указанные ниже действия:

- В обозревателе решений нажмите ПКМ по папке **/Models** и выберите **Add**.
- Нажмите **Class**.
- Введите название 'Album'.
- Добавьте указанный ниже код:

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

Чтобы отобразить список альбомов по результатам поиска через Web API, вы создадите `album view model`,
которая будет связана с `album view` (тайл).

На данный момент, вы имеете пустую `album view model`.
В нее необходимо добавить возможность сохранения данных об альбоме из поиска, такое как исполнитель и название альбома.
Затем, эти данные будут связаны с `view` для отображения.

На данном этапе, вы будете обычный шаблон для связи `view model` и `model` (бизнес-логика).
Наша `view model` содержит экземпляр модели данных, из которого она считывает требуемые для отображения свойства.

Для подготовки `album view model`, выполните указанные ниже действия:

- Найдите и откройте файл **AlbumViewModel.cs**.
- Добавьте код, как показано ниже:

```csharp
private readonly Album _album;

public AlbumViewModel(Album album)
{
    _album = album;
}

public string Artist => _album.Artist;

public string Title => _album.Title;
```

Обратите внимание, что поскольку свойства `view model` не будут изменяться через UI во время работы приложения,
поэтому здесь нет `setter`, а также используется обычный `getter`. Отсутствует необходимость использовать метод `RaiseAndSetIfChanged`.

## Запуск поиска

На этом шаге, вы добавите код в `music store view model`, который будет запускать метод `SearchAsync` из `album model`,
при каждом изменении текста поиска.
По завершению поиска, полученные данные будут помещены в `observable (рус: наблюдаемую)` коллекцию `SearchResults`.
Данная коллекция уже связана с `ListBox`, и при небольших изменениях, вы сможете настроить отображение
результатов поиска в виде тайлов, которые мы подготовили ранее.

Для запуска поиска всякий раз, как меняется текст, выполните указанный ниже действия:

- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Замените код конструктора и добавьте дополнительный код, как показано ниже:

```csharp
using Avalonia.MusicStore.Models;
using ReactiveUI;
using System;
using System.Collections.ObjectModel;
using System.Reactive.Linq;
using System.Threading;

namespace Avalonia.MusicStore.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
        ...
       
        public MusicStoreViewModel()
        {
            this.WhenAnyValue(x => x.SearchText)
                .Throttle(TimeSpan.FromMilliseconds(400))
                .ObserveOn(RxApp.MainThreadScheduler)
                .Subscribe(DoSearch!);
        }
       
        private async void DoSearch(string s)
        {
            IsBusy = true;
            SearchResults.Clear();

            if (!string.IsNullOrWhiteSpace(s))
            {
                var albums = await Album.SearchAsync(s);

                foreach (var album in albums)
                {
                    var vm = new AlbumViewModel(album);
                    SearchResults.Add(vm);
                }
            }

            IsBusy = false;
        }
    }
}
```

Метод `WhenAnyValue` поставляется фреймворком _ReactiveUI_, как часть `ReactiveObject` (наследуется через `ViewModelBase`).
Он принимает лямбда-выражение, которое возвращает `observable (рус: наблюдаемое)` свойство при его изменении.
Итак, в приведенном выше коде, событие возникает каждый раз, когда пользователь меняет строку поиска.

Хорошей идеей будет немного подождать, пока пользователь не перестанет вводите текст, прежде чем запустить поиск.
Метод `Throttle` ожидает указанное время (400 мс), прежде чем запустить обработку события.
Это означает, что поиск не запустится, пока пользователь не перестанет вводить текст в течение 400 мс или более.

:::info
Метод `ObserveOn` необходим для обеспечения вызова подписанного метода в UI-потоке.
В приложениях на _Avalonia UI_, вы должны обновлять UI **только** в UI-потоке.
:::

Метод `Subscribe` вызывает метод `DoSearch` для каждого наблюдаемого события.
Метод `DoSearch` запускается асинхронно, а также не имеет возвращаемого значения.

## Bind the Album View

На предыдущей странице, наши действия по изменению тайла `album view`, не включали никакого способа отображения текстовых данных результата поиска.

Для добавления названия альбома и исполнителя в тайл, выполните указанные действия:

- Найдите и откройте файл **AlbumView.asaml**.
- Добавьте два элемента `TextBlock` и их `data bindings (рус: привязки данных)`, как показано ниже:
- Для корректной работы с `compiled binding (рус: собранными привязками)`, необходимо указать используемый во `view` тип данных: AlbumViewModel.


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

- Нажмите кнопку **Debug**, чтобы собрать и запустить проект.
- Нажмите на кнопку с иконкой.
- Введите какой-нибудь текст.

<p><img className="image-medium-zoom" src={MusicStoreAlbumViewScreenshot} alt="" /></p>

На следующей странице вы узнаете, как улучшить внешний вид приложения, путем загрузки обложки для каждого альбома.
Они будут отображаться вместо иконки музыкальной ноты.
