---
description: TUTORIALS - Music Store App
---

import MusicStoreAddWindowScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/add-window.png';
import MusicStoreDialogOpenedScreenshot from '/img/tutorials/music-store-app/opening-a-dialog/dialog-opened.png';

# Открытие диалогового окна

На этой страницу вы узнаете, как используя _ReactiveUI_ можно управлять другим окном в приложении.
Новое окно будет иметь возможность поиска, а также кнопку для добавления одного из найденных альбомов в список основного окна.
Новое окно будет открывать как далоговое, из-за чего, во время его отображения, основное окно будет блокироваться.

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

```markup
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
Она будет создана и связана с ним, в момент когда диалоговое окно должно будет отобразиться.

Similarly, the result of the users interaction with the dialog will eventually have 
to be passed back to the application logic for the main window for processing.

At this stage you will create two empty view model classes to act as placeholders for the dialog view model, 
and the dialog return (selected album) object. To create these view models, follow this procedure:

- В обозревателе решений нажмите ПКМ по папке **/ViewModels** и выберите **Add**.
- Нажмите **Class**.
- Укажите имя класса 'MusicStoreViewModel' и выберите **Add**.
- Повторно нажмите ПКМ по папке **/ViewModels** и выберите **Add**.
- Нажмите **Class**.
- Укажите имя класса 'AlbumViewModel' и выберите **Add**.

## Отображение диалогового окна

Now you have a new window for the dialog, and some view model classes for its interaction; 
there are two steps to create the dialog interaction:

* The main window view model starts the interaction.
* The main window view knows how to start the interaction.

Firstly, to alter the main window view model code so it starts the interaction to show the dialog, 
follow this procedure:

- Найдите и откройте файл **MainWindowViewModel.cs**.
- Add a declaration for the interaction with the new dialog window, as shown:

```csharp
public Interaction<MusicStoreViewModel, AlbumViewModel?> ShowDialog { get; }
```

- Alter the constructor code to create the reactive command from a asynchronous task, as shown:

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

At this point, the code for the interaction is still incomplete. 
If you attempt to run the app now and click the icon button,
you will get an exception of class `ReactiveUI.UnhandledInteractionException`.

Your next step is to make sure that the main window view knows how to start the interaction.
This is implemented in the code-behind file for the main window view, 
and uses some features of the _ReactiveUI_ framework.  Follow this procedure:

- Locate and open the code-behind **MainWindow.axaml.cs** file. (You may need to expand the **MainWindow.axaml** file to find it.)
- Alter the class wo that it inherits from `ReactiveWindow<MainWindowViewModel>`.
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

- Add the following code to the end of the constructor:

```csharp
this.WhenActivated(action => 
         action(ViewModel!.ShowDialog.RegisterHandler(DoShowDialogAsync)));
```

This means that whenever the main window view is activated, the `DoShowDialogAsync` handler is registered.
The action is disposable, so that _ReactiveUI_ can clean up the registration when 
the main window view is not on the screen.

Your whole file should now look like this:

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

It all works - but the dialog window opens at the same size as the main window, and offset from it.

## Позиция и размер диалогового окна

In the last step here, you will make the dialog smaller that the main window, and open centered on it. 
You will also make the main window open in the center of the user's screen.

Выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindow.axaml**.
- К элементу `<Window>`, добавьте атрибут, как показано ниже:

```xml
<Window ...
    WindowStartupLocation="CenterScreen">
```

- Найдите и откройте файл **MusicStoreWindow.axaml**.
- Add attributes for the width and height of the dialog, set at 1000 and 550 respectively.
- Добавьте атрибут начальной позиции измените его значение на `CenterOwner`, как показано ниже:

```
<Window ...
    Width="1000" Height="550"
    WindowStartupLocation="CenterOwner">
```

- Нажмите **Debug** для сборки и запуска проекта.
- Нажмите кнопку с иконкой.

<p><img className="image-medium-zoom" src={MusicStoreDialogOpenedScreenshot} alt="" /></p>

The dialog window is now opened centered inside the main window.

On the next page, you will learn how to add some content to the dialog window to represent a search for albums,
and present the results.
