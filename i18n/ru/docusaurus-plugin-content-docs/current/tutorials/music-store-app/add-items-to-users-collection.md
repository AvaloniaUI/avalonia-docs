---
description: TUTORIALS - Music Store App
---

import MusicStoreAddedAlbumsScreenshot from '/img/tutorials/music-store-app/add-items-to-users-collection/image-20210310175949319.png';

# Добавление элементов в пользовательскую коллекцию

На этой странице вы реализуете коллекцию из альбомов, которые пользователь добавил, 
путем выбора в диалоговом окне поиска и нажатии кнопки **Buy Album**.
Также вы отобразите их в основном окне.

## Observable Collection (рус: Наблюдаемая коллекция)

Первым шагом, вы добавите `observable` коллекцию во `view model` основного окна.
Она будет содержать альбомы, которые пользователь выбрал в диалоговом окне поиска.

Выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindowViewModel.cs**.
- Добавьте `observable` коллекцию, как показано ниже:

```csharp
public ObservableCollection<AlbumViewModel> Albums { get; } = new();
```

## Обработка результата диалогового окна

Вторым шагом, мы изменим реактивную команду покупки альбома так, чтобы диалоговое окно возвращало
объект (`AlbumViewModel`) в `observable` коллекцию.

Выполните следующие действия:

- Измените код инициализации реактивной команды, как показано ниже:

```csharp
BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
{
    var store = new MusicStoreViewModel();
    var result = await ShowDialog.Handle(store);
    if (result != null)
    {
        Albums.Add(result);
    }
});
```

## `View` основного окна

Теперь вы добавите XAML во `view` основного окна, чтобы отобразить элементы `observable` коллекции.
Вы снова будете использовать **data template (рус: шаблон данных)**, но в этот раз внутри `ItemsControl`.
Это базовый класс для всех компонентов UI, которые отображают несколько элементов, к примеру `ListBox`,
поэтому кое-что вам уже будет знакомо.

Для добавления `ItemsControl` и его `data template (рус: шаблона данных)`, выполните следующие действия:

- Найдите и откройте файл **MainWindow.axaml**.
- В элемент `<Window>` добавьте следующее пространство имен:

```
xmlns:views="clr-namespace:Avalonia.MusicStore.Views"
```

- Под элементом `button` добавьте следующий XAML, как показано ниже:

```xml
<ItemsControl Margin="0 40 0 0" ItemsSource="{Binding Albums}">
  <ItemsControl.ItemsPanel>
    <ItemsPanelTemplate>
      <WrapPanel />
    </ItemsPanelTemplate>
  </ItemsControl.ItemsPanel>

  <ItemsControl.ItemTemplate>
    <DataTemplate>
      <views:AlbumView Margin="0 0 20 20" />
    </DataTemplate>
  </ItemsControl.ItemTemplate>
</ItemsControl>
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите на кнопку с иконкой.
- Введите текст.
- Выберите альбом нажав на него.
- Нажмите **Buy Album**.
- Повторите еще раз.

<p><img className="image-medium-zoom" src={MusicStoreAddedAlbumsScreenshot} alt="" /></p>

По мере поиска и выбора альбомов, вы увидите увеличение пользовательской коллекции.
Однако после перезапуска приложения, коллекция будет снова пуста.

На следующей странице вы узнаете, как добавить в приложение `persistence` данные.