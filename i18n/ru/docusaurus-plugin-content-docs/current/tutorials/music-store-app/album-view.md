---
description: TUTORIALS - Music Store App
---

import MusicStoreBeforeTemplateScreenshot from '/img/gitbook-import/assets/image (6) (1) (3) (1).png';
import MusicStoreBeforeWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310010932979.png';
import MusicStoreWrapPanelScreenshot from '/img/tutorials/music-store-app/add-content-to-dialog/image-20210310011526700.png';

# Album View

На это странице мы продолжим разработку списка результатов поиска.
Заменим отображаемый текст на графические плитки альбомов.

## Icon Resource

Первым шагом мы добавим в ресурсы иконку 'music note'.
Она будет заглушкой для обложек альбомов, пока они не будет загружены для отображения.

Для добавления иконки музыкальной ноты, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Чтобы найти Fluent Icons, перейдите на _GitHub_ _Avalonia UI_ по ссылке [https://avaloniaui.github.io/icons.html](https://avaloniaui.github.io/icons.html)
- Используйте встроенный поиск браузера, чтобы найти иконку с именем 'music_regular'.
  Ее описание должно быть похоже на указанное ниже:

```xml
<StreamGeometry x:Key="music_regular">M11.5,2.75 C11.5,2.22634895 12.0230228,1.86388952 12.5133347,2.04775015 L18.8913911,4.43943933 C20.1598961,4.91511241 21.0002742,6.1277638 21.0002742,7.48252202 L21.0002742,10.7513533 C21.0002742,11.2750044 20.4772513,11.6374638 19.9869395,11.4536032 L13,8.83332147 L13,17.5 C13,17.5545945 12.9941667,17.6078265 12.9830895,17.6591069 C12.9940859,17.7709636 13,17.884807 13,18 C13,20.2596863 10.7242052,22 8,22 C5.27579485,22 3,20.2596863 3,18 C3,15.7403137 5.27579485,14 8,14 C9.3521238,14 10.5937815,14.428727 11.5015337,15.1368931 L11.5,2.75 Z M8,15.5 C6.02978478,15.5 4.5,16.6698354 4.5,18 C4.5,19.3301646 6.02978478,20.5 8,20.5 C9.97021522,20.5 11.5,19.3301646 11.5,18 C11.5,16.6698354 9.97021522,15.5 8,15.5 Z M13,3.83223733 L13,7.23159672 L19.5002742,9.669116 L19.5002742,7.48252202 C19.5002742,6.75303682 19.0477629,6.10007069 18.3647217,5.84393903 L13,3.83223733 Z</StreamGeometry>
```

- Скопируйте весь код иконки.
- Найдите и откройте ранее созданный файл **Icons.axaml**.
- Вставьте скопированный элемент `<StreamGeometry>` внутрь элемента `<Style.Resources>`.

## Album View

Следующим шагом мы создадим графический 'tile' для альбома.
Он будет отображаться на месте текста каждого альбома из списка.

Для его создания, выполните следующие действия:

- В обозревателе решений, нажмите ПКМ по папке **/Views** и выберите **Add**.
- Нажмите **Avalonia User Control**.
- В поле названия, введите 'AlbumView'.
- Нажмите `Enter`.
- Добавьте атрибут `Width="200"` к элементу `<UserControl>`.
- Замените зону содержимого в XAML, указанным ниже текстом:

```xml
<StackPanel Spacing="5" Width="200">
    <Border CornerRadius="10" ClipToBounds="True">
        <Panel Background="#7FFF22DD">
            <Image Width="200" Stretch="Uniform" />
            <Panel Height="200">
                <PathIcon Height="75" Width="75" Data="{StaticResource music_regular}" />
            </Panel>
        </Panel>
    </Border>    
</StackPanel>
```

На панели предпросмотра должен отобразиться тайл с иконкой музыкальной ноты по центру.

## View Locator

В конечном итоге, `view model` альбома будет содержать название альбома, исполнителя и загруженную обложку,
но на данном этапе, вы пока будете использовать заглушку, в виде иконки музыкальной ноты.

Как вы могли заметить, пока отображается только название и полный путь класса `AlbumViewModel`.

<img className="center" src={MusicStoreBeforeTemplateScreenshot} alt="" />

На этом шаге вы будете использовать класс `view locator` (файл **ViewLocator.cs**),
который был добавлен в проект шаблоном решения.
Данный класс был зарегистрирован в качестве `data template (рус: шаблона данных)` верхнего уровня для приложения
в файле **App.axaml**.
Его регистрация выглядит следующим образом:

```
<Application ...
             xmlns:local="using:Avalonia.MusicStore"
             ... >
    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
    ...
</Application>
```

Поэтому `view locator` всегда может быть найден _Avalonia UI_, когда она ищет `data template (рус: шаблон данных)`.

:::info
Подробнее о **data template (рус: шаблонах данных)**, см. [здесь](../../concepts/templates/).
:::

`View locator` выступает `data template (рус: шаблоном данных)` для `view model`, в данном случае `album view model`,
при выполнении следующих условий:

* `View model` наследуется от класса `ViewModelBase`
* Существует `view` с таким же базовым именем.

`AlbumView` и `AlbumViewModel` уже содержат базовое имя 'Album', а также существует `AlbmView`.
Поэтому, чтобы `view locator` смог работать с указанной `view model`, осталось добавить в нее наследование от класса `ViewModelBase`.

Выполните следующие действия:

- Найдите и откройте ранее созданный файл **AlbumViewModel.cs**.
- Для наследование класса от `ViewModelBase`, добавьте код, как показано ниже:

```csharp
public class AlbumViewModel : ViewModelBase
{        
}
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите кнопку с иконкой.

<p><img className="image-medium-zoom" src={MusicStoreBeforeWrapPanelScreenshot} alt="" /></p>

`View locator` находит и ипользует `AlbumView` в качестве шаблона для списка элементов.

## List Items Panel Template

На этом шаге вы упорядочите отображение списка обложек альбомов, чтобы они занимали все свободное место.

`ListBox` имеет свойство, которое содержит ItemsPanel - шаблон для размещения элементов списка.
По-умолчание это `Stack Panel`. Чтобы обложки альбомов начали заполнять все свободное место,
необходимо изменить шаблон на `Wrap Panel`.

Вы также добавите некоторые атрибуты стилей для `List Box`.

Выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MusicStoreView.axaml**.
- Раскройте элемент `<ListBox>`, чтобы у него был начальный и конечный теги.
- Добавьте в XAML `<ListBox.ItemsPanel>`, как показано ниже:

```xml
<ListBox ItemsSource="{Binding SearchResults}" SelectedItem="{Binding SelectedAlbum}"
    Background="Transparent" Margin="0 20">
    <ListBox.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapPanel />
        </ItemsPanelTemplate>
    </ListBox.ItemsPanel>
</ListBox>
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите на кнопку с иконкой.

<p><img className="image-medium-zoom" src={MusicStoreWrapPanelScreenshot} alt="" /></p>

На следующей странице вы узнаете, какую бизнес-логику надо добавить, для работы с сервисом данных,
из которого мы сможем получить реальные данные по альбомам при поиске.

