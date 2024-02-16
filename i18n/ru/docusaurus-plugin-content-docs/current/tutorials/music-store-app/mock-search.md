---
description: TUTORIALS - Music Store App
---

import MusicStoreMockSearchScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/text-list.png';

# Mock Search (рус: Фейковый поиск)

На этой страницу вы узнаете, как создать `view model` для поиска альбомов, а потом связать ее с компонентами UI на новом `user control`.
На этом шаге вы будете использовать фейковый поиск, что позволит сосредоточиться на `view model`.

## Reactive View Model

Фреймворк _ReactiveUI_ предоставляет собственную систему `data binding (рус: привязки данных)`.
Вы можете добавить ее во `view model` через класс `ViewModelBase`,
который наследуется от `ReactiveObject`.
Эти действия были выполнены при сощлании проекта через `solution template (рус: шаблон решений)`.

Для наследования от класса `ReactiveObject`, выполните указанные ниже действия:

- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Добавьте код для наследования от `ViewModelBase`.

```csharp
namespace Avalonia.MusicStore.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
    }
}
```

Данное действие добавило во `view model` важный метод `RaiseAndSetIfChanged`,
который позволяет указанным свойствам уведомлять `view` об изменениях.

:::info
Подробнее о принципах паттерна MVVM и уведомлениях, см. [здесь](../../concepts/the-mvvm-pattern/).
:::

На текущем этапе вы добавить два свойств для логики поиска:

* Текстовая строка (критерий поиска)
* Логическое значение (индикатор поиска)

- Для добавления указанных ранее свойств, добавьте указанный ниже код:

```csharp
using ReactiveUI;

namespace AvaloniaApplication11.ViewModels
{
    public class MusicStoreViewModel : ViewModelBase
    {
        private string? _searchText;
        private bool _isBusy;

        public string? SearchText
        {
            get => _searchText;
            set => this.RaiseAndSetIfChanged(ref _searchText, value);
        }

        public bool IsBusy
        {
            get => _isBusy;
            set => this.RaiseAndSetIfChanged(ref _isBusy, value);
        }

    }
}
```

Как вы могли заметить, данные свойства имеют обычный публичный `getter`, который возвращает значение приватного поля.
Но вот `setter` вызывает метод `RaiseAndSetIfChanged` - уведомление об изменении.

## Data Binding (рус: Привязка данных)

Теперь вы добавите `data binding (рус: привязку данных)` для связи `view` и `view model`.
Текстовое поле будет привязано к `SearchText`, а индикатор прогресса к `IsBusy`.

Выполните указанные ниже действия:

- Найдите и откройте файл **MusicStoreView.axaml**.
- Добавьте выражение `binding (рус: привязки)`, как показано ниже:

```xml
<UserControl ...>
    <!-- ... -->
    <DockPanel>
      <StackPanel DockPanel.Dock="Top">
        <TextBox Text="{Binding SearchText}" Watermark="Search for Albums...." />
        <ProgressBar IsIndeterminate="True" IsVisible="{Binding IsBusy}" />
      </StackPanel>
      <Button Content="Buy Album"
              DockPanel.Dock="Bottom"
              HorizontalAlignment="Center" />
      <ListBox/>
    </DockPanel>
    <!-- ... -->
</UserControl>
```

## Поиск и выбор альбома

Ваш следующий шаг - это создать свойства необходимые для обработки альбомов во `music store view model`.

* коллекция `view models` альбомов  (найденные во время поиска альбомы)
* свойство для хранения выбранных пользователем альбомов

Здесь мы будем использовать `ObservableCollection` - это коллекция может уведомлять об изменениях,
а также поставляется самим фреймворком .NET.

Выполните указанные ниже действия:

- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Добавьте в класс указанный ниже код:

```csharp
private AlbumViewModel? _selectedAlbum;

public ObservableCollection<AlbumViewModel> SearchResults { get; } = new();

public AlbumViewModel? SelectedAlbum
{
    get => _selectedAlbum;
    set => this.RaiseAndSetIfChanged(ref _selectedAlbum, value);
}
```

Для привязки свойств ко списку по `view`, выполните указанные ниже действия:

- Найдите и откройте файл **MusicStoreView.axaml**.
- Добавьте выражение `binding (рус: привязки)` к элементу `<ListBox>`:

```xml
<ListBox ItemsSource="{Binding SearchResults}" SelectedItem="{Binding SelectedAlbum}" />
```

## Mock Data (рус: Фейковые данные)

Для тестирования приложения, добавьте немного фейковых данных во `view model`.

Выполните следующие действия:

- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Добавьте конструктор класса, как показано ниже:

```csharp
public MusicStoreViewModel()
{
    SearchResults.Add(new AlbumViewModel());
    SearchResults.Add(new AlbumViewModel());
    SearchResults.Add(new AlbumViewModel());
}
```

- Нажмите **Debug** для сборки и запуска проекта.

<p><img className="image-medium-zoom" src={MusicStoreMockSearchScreenshot} alt="" /></p>

Как вы можете видеть, `data binding (рус: привязка данных)` из списка к коллекции альбомов из `view model` работает,
но наша `view` еще не является графической.
На следующей страницу вы уузнаете, как заменить текст на графические тайлы альбомов.
