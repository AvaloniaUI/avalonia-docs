---
description: TUTORIALS - To Do List
---

import ToDoMainWindowContentScreenshot from '/img/gitbook-import/assets/image (4) (1) (1).png';

# Main Window Content (рус: Содержимое основного окна)

Пока ваше основное окно отображает текс приветствия, созданный из шаблона.
На данной странице вы измените содержимое основного окна на новый `user control`.

Для изменения содержимого основного окна, выполните следующие действия:

- Найдите и откройте XAML-файл основного окна:`Views/MainWindow.axaml`
- Добавьте описание пространства имен `xmlns:views="clr-namespace:ToDoList.Views"`
- Измените название приложения в атрибуте `Title="Avalonia To Do List"`
- Замените элемент `<TextBlock>` на `<views:ToDoListView/>`

XAML основного окна должен выглядеть примерно так:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

  <views:ToDoListView/>

</Window>
```

## Изучите XAML

Данный XAML во многом похож на XAML `user control`, с которым вы ознакомились на предыдущей страницу.
В частности, здесь вы добавили:

```xml
<Window ... xmlns:views="clr-namespace:ToDoList.Views" ...>
```

Здесь пространство имен `ToDoList.Views` присваивается к алиасу XML `views` 

:::warning
Любой `user control`, который вы создадите, нуждается в таком присвоении,
иначе XAML-движок Avalonia UI, не сможет его найти, и вы получите сообщение об ошибке.
:::

Последним шагом, меняем содержимое окна для отображения вышего нового `user control`:

```xml
<views:ToDoListView/>
```

## Запуск приложения

Теперь запустите созданное приложение.

Если вы используете Visual Studio, нажмите кнопку **F5**.

Если вы используете .NET Core CLI, выполните команду:

```
dotnet run
```

Вы увидите основное окно, с новым заголовком и `user control`:

<img className="center" src={ToDoMainWindowContentScreenshot} alt="" />

Это всего-лишь `view`.. На самом деле еще ничего не сделано!
На следующей странице вы узнаете, как создавать рабочие части приложения: `model` и `view model`.
