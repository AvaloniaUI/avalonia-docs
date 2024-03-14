---
description: TUTORIALS - Music Store App
---

import MusicStoreAddWindowScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/add-window.png';
import MusicStoreDialogOpenedScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/dialog-opened.png';

# Открытие диалогового окна

На этой страницу вы узнаете, как используя _ReactiveUI_ можно управлять другим окном в приложении.
Новое окно будет иметь возможность поиска, а также кнопку для добавления одного из найденных альбомов в список основного окна.
Новое окно будет открывать как диалоговое, из-за чего, во время его отображения, основное окно будет блокироваться.

## Добавление нового диалогового окна

В самом файле `window view` нет ничего, что может сделать его диалоговым.
Это зависит от способа управления окном в приложении, и для этих целей вы будете использовать _ReactiveUI_.

Для создания нового окна, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В обозревателе решений, нажмите ПКМ по папке **/Views** и выберите **Add**.
- Нажмите **Avalonia Window**.
- Когда будет предложено ввести название, укажите 'MusicStoreWindow'
- Нажмите `Enter`.

<p><img className="image-medium-zoom" src={MusicStoreAddWindowScreenshot} alt="" /></p>

## Стилизация диалогового окна

Для стилизации нового диалогового окна, также как и в основном окне, выполните следующие действия:

- Найдите и откройте файл **MusicStoreWindow.axaml**.
- Для добавления акрилового размытия фона и строки заголовка, измените код, как показано ниже:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Avalonia.MusicStore.Views.MusicStoreWindow"
        Title="MusicStoreWindow"
        TransparencyLevelHint="AcrylicBlur"
        ExtendClientAreaToDecorationsHint="True">
    <Panel>
        <ExperimentalAcrylicBorder IsHitTestVisible="False">
            <ExperimentalAcrylicBorder.Material>
                <ExperimentalAcrylicMaterial
                    BackgroundSource="Digger"
                    TintColor="Black"
                    TintOpacity="1"
                    MaterialOpacity="0.65" />
            </ExperimentalAcrylicBorder.Material>
        </ExperimentalAcrylicBorder>

        <Panel Margin="40">

        </Panel>
    </Panel>
</Window>
```

## Ввод и вывод диалогового окна

Работа диалогового окна будет обрабатываться его собственной `view model`.
Она будет создана и связана с ним в момент, когда диалоговое окно должно будет отобразиться.

Аналогичным образом, результат взаимодействия пользователя с диалоговым окном,
должен быть передан обратно для обработки в основном окне.

На этом этапе вы создадите два пустых класса `view model`, которые будут выступать в качестве заполнителей для `dialog view model`
и объекта `dialog return` (выбранный альбом).
Выполните следующие действия:

- В обозревателе решений нажмите ПКМ по папке **/ViewModels** и выберите **Add**.
- Нажмите **Class**.
- Укажите имя класса 'MusicStoreViewModel' и выберите **Add**.
- Повторно нажмите ПКМ по папке **/ViewModels** и выберите **Add**.
- Нажмите **Class**.
- Укажите имя класса 'AlbumViewModel' и выберите **Add**.

## Отображение диалогового окна

Теперь у нас есть новое окно, которое можно будет использовать как диалоговое.
А также классы `view model` для взаимодействия с ним. Для создания самого взаимодействия, нужно выполнить 2 условия:

* `View model` основного окна запускает взаимодействие.
* `View` основного окна знает "как" начать взаимодействие.

Первым делом изменим код `view model` основного окна так,
чтобы он запускал взаимодействие для отображения диалогового окна.
Выполните следующие действия:

- Найдите и откройте файл **MainWindowViewModel.cs**.
- Добавьте объявление взаимодействия с новым диалоговым окном, как показано ниже:

```csharp
public Interaction<MusicStoreViewModel, AlbumViewModel?> ShowDialog { get; }
```

- Для создания реактивной команды из асинхронный задачи, измените код конструктора, как показано ниже:

```csharp
using System;
using System.Collections.Generic;
using System.Reactive.Linq;
using System.Text;
using System.Windows.Input;
using ReactiveUI;

namespace Avalonia.MusicStore.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public MainWindowViewModel()
        {
            ShowDialog = new Interaction<MusicStoreViewModel, AlbumViewModel?>();

            BuyMusicCommand = ReactiveCommand.CreateFromTask(async () =>
            {
                var store = new MusicStoreViewModel();

                var result = await ShowDialog.Handle(store);
            });
        }

        public ICommand BuyMusicCommand { get; }

        public Interaction<MusicStoreViewModel, AlbumViewModel?> ShowDialog { get; }
    }
}
```

На данный момент, код для взаимодействия все еще не закончен.
При запуске приложения и попытке нажать кнопку с иконой, вы получите исключение `ReactiveUI.UnhandledInteractionException`.

Нашим следующим шагом станет внесение изменений во `view` основного окна, чтобы она знала "как" запустить взаимодействие.
Они добавляются в код нашей `view`, и используют функционал из фреймворка _ReactiveUI_.
Выполните указанные ниже действия:

- Найдите и откройте файл **MainWindow.axaml.cs**. (Чтобы найти его, вы можете раскрыть файл **MainWindow.axaml**)
- Измените класс, чтобы он наследовался от `ReactiveWindow<MainWindowViewModel>`.
- Добавьте метод `DoShowDialogAsync`, как показано ниже:

```csharp
private async Task DoShowDialogAsync(InteractionContext<MusicStoreViewModel,
                                        AlbumViewModel?> interaction)
{
     var dialog = new MusicStoreWindow();
     dialog.DataContext = interaction.Input;

     var result = await dialog.ShowDialog<AlbumViewModel?>(this);
     interaction.SetOutput(result);
}
```

- В конец конструктора добавьте следующий код:

```csharp
this.WhenActivated(action => 
         action(ViewModel!.ShowDialog.RegisterHandler(DoShowDialogAsync)));
```

Данный код означает, что когда активируется `view` основного окна, то регистрируется событие `DoShowDialogAsync`,
Данное действие является `disposable`, поэтому _ReactiveUI_ может очистить регистрацию,
когда `view` основного экрана уйдет с экрана.

Теперь ваш файл должен выглядеть следующим образом:

```csharp
using Avalonia.ReactiveUI;
using AvaloniaApplication11.ViewModels;
using ReactiveUI;
using System.Threading.Tasks;

namespace AvaloniaApplication11.Views
{
    public partial class MainWindow : ReactiveWindow<MainWindowViewModel>
    {
        public MainWindow()
        {
            InitializeComponent();
            this.WhenActivated(action =>
                action(ViewModel!.ShowDialog.RegisterHandler(DoShowDialogAsync)));
        }

        private async Task DoShowDialogAsync(InteractionContext<MusicStoreViewModel, 
                                                AlbumViewModel?> interaction)
        {
            var dialog = new MusicStoreWindow();
            dialog.DataContext = interaction.Input;

            var result = await dialog.ShowDialog<AlbumViewModel?>(this);
            interaction.SetOutput(result);
        }
    }
}
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите кнопку с иконкой.

Все работает, но диалоговое окно имеет такой же размер что и основное, а также сдвинуто от него.

## Позиция и размер диалогового окна

На заключительном этапе, вы уменьшите размер диалогового окна относительно основного, но и разместите прямо по его центру.
Вы также настроите, чтобы основное окно открывалось по центру экрана пользователя.

Выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindow.axaml**.
- К элементу `<Window>`, добавьте атрибут, как показано ниже:

```xml
<Window ...
    WindowStartupLocation="CenterScreen">
```

- Найдите и откройте файл **MusicStoreWindow.axaml**.
- В диалоговое окно добавьте атрибуты ширины и высоты, а их значения установите `1000` и `500`, соответственно.
- Добавьте атрибут начальной позиции измените его значение на `CenterOwner`, как показано ниже:

```
<Window ...
    Width="1000" Height="550"
    WindowStartupLocation="CenterOwner">
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите кнопку с иконкой.

<p><img className="image-medium-zoom" src={MusicStoreDialogOpenedScreenshot} alt="" /></p>

Теперь диалоговое окно открывается прямо по центру, внутри основного окна.

На следующей странице вы узнаете, как изменить содержимое диалогового окна для поиска альбомов и их отображения.
