---
description: TUTORIALS - To Do List App
---

import ToDoDataContextResolvedArchitectureDiagram from '/img/gitbook-import/assets/image (20) (3).png';
import ToDoDataContextResolvedScreenshot from '/img/gitbook-import/assets/image (5) (1) (2).png';

# Добавление Data Context (рус: Контекст Данных)

На это страницу вы научитесь указывать контекст данных для списка дел, как свойство `ToDoList`.

Для изменения контекста данных, выполните следующие действия:

- В папке **Views** найдите файл **MainWindow.axaml**.
- Полностью удалите тег `<Design.DataContext>`.
- Добавьте атрибут `x:DataType="vm:MainWindowViewModel"` к тегу `<Window>`.
- Найдите содержимое `<views:ToDoListView/>`
- Добавить атрибут `DataContext="{Binding ToDoList}"` как показано ниже:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:ToDoList.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
        xmlns:views="clr-namespace:ToDoList.Views"
        x:Class="ToDoList.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Icon="/Assets/avalonia-logo.ico"
        Title="Avalonia To Do List">
  <views:ToDoListView DataContext="{Binding ToDoList}"/>
</Window>
```

Теперь `views` и `view models` имеют дополнительный контекст данных,
указанный как привязка, что позволяет `Avalonia UI binder` 
найти свойства `ToDoList` в объекте `ToDoListViewModel`.
Данный объект был создал в коде во время инициализации приложения.

Ниже указана схема, актуальная после привязки контекста данных:

<img className="center" src={ToDoDataContextResolvedArchitectureDiagram} alt="" />

Теперь вы можете запустить приложение и убедиться,
что указанное `view` имеет привязку к нужному контексту данных,
а элементы отобразятся в следующем виде:

<img className="center" src={ToDoDataContextResolvedScreenshot} alt="" />
