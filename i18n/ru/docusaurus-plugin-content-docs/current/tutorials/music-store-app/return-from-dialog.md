---
description: TUTORIALS - Music Store App
---

# Результат диалогового окна

На этой страницу вы узнаете, как добавить в код возврат выбранного альбома в основное окно из диалогового окна поиска.

## Команда покупки альбома

Первым шагом мы добавим реактивную команду во `view model` музыкального магазина.
А также привяжем ее к кнопке **Buy Album** во `view`.

Выполните указанные ниже действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MusicStoreViewModel.cs**.
- Добавьте объявление реактивной команды, как показано ниже:

```csharp
public ReactiveCommand<Unit, AlbumViewModel?> BuyMusicCommand { get; }
```

- Для инициализации реактивной команды, добавьте в конструктор указанный ниже код:

```csharp
public MusicStoreViewModel()
{
    BuyMusicCommand = ReactiveCommand.Create(() =>
    {
         return SelectedAlbum;
    });
    
    ...
}
```

Обратите внимание, что здесь вы используете `ReactiveCommand`.
Она поставляется фреймворком _RectiveUI_ для реализации взаимодействия по MVVM.
Кстати, именно она поможет нам передать аргумент класса `AlbumViewModel` во `view model` основного окна при нажатии кнопки.

## Data Binding (рус: Привязка данных) кнопки

На этом шаге, к кнопке **Buy Album** вы привяжете реактивную команду из `view model` музыкального магазина.
Выполните следующие действия:

- Найдите и откройте файл **MusicStoreView .axaml**. 
- Добавьте `data binding (рус: привязку данных)` `Command="{Binding BuyMusicCommand}"` к элементу кнопки.

## Закрытие диалогового окна

Теперь вы добавите немного управления окном, чтобы диалоговое окно закрывалось при нажатии кнопки **Buy Album**.
Это необходимое дополнение к добавленной вам ранее `data binding (рус: привязки данных)`.

Как вы могли заметить при написании кода открытия диалогового окна, вы реализуете управление окном внутри кода для самого окна,
и используете функции `ReactiveWindow` из фреймворка _ReactiveUI_.

Выполните указанные ниже действия:

- Найдите и откройте файл **MusicStoreWindow.axaml.cs**.
- Добавьте ссылку `using System;`
- Change the base class so the view inherits from `ReactiveWindow<MusicStoreViewModel>`.
- Добавьте в конструктор указанную ниже строку:

```csharp
this.WhenActivated(action => action(ViewModel!.BuyMusicCommand.Subscribe(Close)));
```

Метод `WhenActivated` из _ReactiveUI_, определяет действия, которые должны произойти при активации окна (когда оно появляется на экране).
Будет вызвано лямбда-выражение, которое получит на вход одноразовое действие, поэтому от него можно отписаться, когда окно перестанет быть активным.

Ваш код окна музыкального приложения должен быть похож на указанный ниже:

```csharp
using Avalonia.ReactiveUI;
using AvaloniaApplication11.ViewModels;
using ReactiveUI;
using System;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : ReactiveWindow<MusicStoreViewModel>
    {
        public MusicStoreWindow()
        {
            InitializeComponent();
            this.WhenActivated(d => d(ViewModel!.BuyMusicCommand.Subscribe(Close)));
        }
    }
}
```

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.
- Нажмите кнопку с иконкой.
- Введите текст для поиска
- Нажмите на альбом для его выбора.
- Нажмите **Buy Album**.

Диалоговое окно закрывается и... В основном окне ничего не происходит!
На следующей страницу вы узнаете, как добавить  выбранный альбом в коллекцию основного окна.