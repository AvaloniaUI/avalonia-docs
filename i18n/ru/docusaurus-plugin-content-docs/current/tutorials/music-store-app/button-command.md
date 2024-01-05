---
description: TUTORIALS - Music Store App
---

# Команда кнопки

До этого, в рамках руководства, вы изменяли файлы относящие к части `view` паттерна MVVM. 
На этой страницу вы узнаете, как связать кнопку во `view` основного окна и команду из `view model`.
Это позволит пользователю влиять на логику приложения во `view model` при взаимодействии со `view`.

Когда вы используете для разработки _Avalonia UI_ и паттерн MVVM,
шаблон решения предоставляет возможность выбора инструментария для MVVM.
Данное руководство использует фреймворк _ReactiveUI_, также шаблон решения уже содержит все необходимые пакеты.

## Реактивная команда

Первым шагом в связывании `view` и `view model`, является добавление во `view model` возможность работать с командами.
Этого можно добиться, путем добавления интерфейса `ICommand` из .NET, а также последующей реализации с помощью
`ReactiveCommand` из _ReactiveUI_. Для этого, выполните следующие действия:

- Остановите приложение, если оно запущено.
- В папке **/ViewModels**, найдите и откройте файл **MainWindowViewModel.cs**.
- Удалите текущее содержимое класса и добавьте код, как показано ниже:

```csharp
using ReactiveUI;
using System.Windows.Input;

namespace AvaloniaApplication11.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public ICommand BuyMusicCommand { get; }

        public MainWindowViewModel()
        {
            BuyMusicCommand = ReactiveCommand.Create(() =>
            {
                // Code here will be executed when the button is clicked.
            });
        }
    }
}
```

- Установите точку останова в открытую фигурную скобку, которая чуть выше комментария.

Для завершения связывания `view` и нового свойства `BuyMusicCommand` из `view model`,
вам необходимо добавить `data binding (рус: привязку данных)` для кнопки.

:::info
Подробнее о `data binding (рус: привязке данных)`, см. [здесь](../../basics/data/data-binding).
:::

Для добавления кнопке `data binding (рус: привязки данных)`, выполните следующие действия:

- Найдите и откройте файл **MainWindow.axaml**.
- Найдите XAML для `button` и добавьте атрибут `command`, а также укажите `binding (рус: привязку)`, как показано ниже:

```
<Button HorizontalAlignment="Right" VerticalAlignment="Top"
        Command="{Binding BuyMusicCommand}">
   <PathIcon Data="{StaticResource store_microsoft_regular}"/>
</Button>
```

Атрибут `Command` определяет события у кнопки, которое происходит при ее нажатии.
В данном случае, выражение `data binding (рус: привязки данных)` связано со свойством `BuyMusicCommand` из  `view model`.
Чтобы убедиться в описанном ранее, выполните следующие действия:

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.
- Нажмите на кнопку с иконкой.

Вы увидите, что приложение остановилось на установленной вами точке остановки во `view model`.

На следующей странице вы создадите новое диалоговое окно,а потом добавите немного кода для его отображения
(в то самое место, где сейчас установлена точка останова во `view model`).