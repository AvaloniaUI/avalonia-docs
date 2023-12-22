---
description: TUTORIALS - To Do List App
---

import ToDoAddNewItemsScreenshot from '/img/gitbook-import/assets/image (44).png';

# Добавление новых элементов

Ранее, при создании `ToDoListView`, вы добавляли кнопку, 
которую пользователь может использовать для добавления нового элемента.
На этой странице вы добавить обработку нажатия кнопки.

Мы хотим, чтобы при нажатии кнопки пользователем,
поялвялось новое `view`, куда можно внести данные о новом элементе.

## Создание View Model

Для создания `view model` для новой `view`, выполните следующие действия:

- В окне **Solution Explorer** найдите папку **ViewModels** и нажмите ПКМ.
- Нажмите **Add**, а потом **Class**.
- Имя класса 'AddItemViewModel'. Нажмите **Add**.
- Добавьте описание свойства, как показано ниже:

```csharp
using System;

namespace ToDoList.ViewModels
{
    public class AddItemViewModel : ViewModelBase
    {
        public string Description { get; set; } = String.Empty;
    }
}
```

## Создание нового View через Visual Studio

Для создания нового `view`, выполните указанные ниже действия:

- В окне **Solution Explorer** найдите папку **Views** и нажмите ПКМ.
- Нажмите **Add**
- Выберите **Avalonia** под **C# Items** и нажмите **User Control (Avalonia)**
- В поле **Name** введите 'AddItemView'
- Нажмите **Add**

### Создание нового View через .NET Core CLI

Для создания нового `view`, выполните указанную ниже команду:

```
dotnet new avalonia.usercontrol -o Views -n AddItemView  --namespace ToDoList.Views
```

Изменить XAML как показано ниже:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:vm="using:ToDoList.ViewModels"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.AddItemView"
             x:DataType="vm:AddItemViewModel">
  <DockPanel>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">Cancel</Button>
    <Button DockPanel.Dock="Bottom" 
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">OK</Button>
    <TextBox AcceptsReturn="True"
             Text="{Binding Description}"
             Watermark="Enter your to do item"/>
  </DockPanel>
</UserControl>
```

После изменений, вы должны увидеть похожее изображение:

<img className="center" src={ToDoAddNewItemsScreenshot} alt="" />

Новое `view` содержит `TextBox`, который имеет 3 визуальных свойства:

* `AcceptsReturn` создает многострочное текствопое поле
* `Text` привязывает текст для отображения внутри `TextBox`, указанный с свойстве 
`Description` у `view model` (ее мы создали ранее).
* `Watermark` отображает справочный текст, если поле `Text` пустое.

На следующей странице вы узнаете, как поменять `view` в основном окне,
чтобы отображалось `view` создания нового элемента, а не `view` списка дел.