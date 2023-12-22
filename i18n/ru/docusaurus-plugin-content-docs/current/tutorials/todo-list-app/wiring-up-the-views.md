---
description: TUTORIALS - To Do List App
---

import ToDoDataContextWiringDiagram from '/img/gitbook-import/assets/image (7) (3).png';
import ToDoBlankAfterWiringScreenshot from '/img/gitbook-import/assets/image (42) (2).png';

# Data Binding (рус: Привязка данных)

Теперь, когда у вас добавлены `view model` и `model (data service)`,
необходимо связать `views` и `view models`, чтобы отобразить элементы списка.

Для этого мы будем использовать концепты _Avalonia UI_, 
такие как `data templates (рус: шаблоны данных)` и `data binding (рус: привязка данных)`.
Шаблоны данных задают отображение элементов внутри `control` для элементов списка дел,
а привязка данных указывает, как получить этот список и данные по каждому его элементу.

Для адаптации вашего `user control` для использования `items control`, 
выполните следующие действия:

- Найдите и откройте файл **ToDoListView.axaml**.
- Добавьте атрибуты `xmlns:vm="using:ToDoList.ViewModels"` и `x:DataType="vm:ToDoListViewModel"`
в элемент `<UserControl>`. 
- Замените элемент `<StackPanel>`, как показано ниже:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:vm="using:ToDoList.ViewModels"
             mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
             x:Class="ToDoList.Views.ToDoListView"
             x:DataType="vm:ToDoListViewModel">
  <DockPanel>
    <Button DockPanel.Dock="Bottom"
            HorizontalAlignment="Stretch"
            HorizontalContentAlignment="Center">
      Add Item
    </Button>
    <ItemsControl ItemsSource="{Binding ListItems}">
      <ItemsControl.ItemTemplate>
        <DataTemplate>
          <CheckBox Margin="4"
                    IsChecked="{Binding IsChecked}"
                    Content="{Binding Description}"/>
        </DataTemplate>
      </ItemsControl.ItemTemplate>
    </ItemsControl>
  </DockPanel>
</UserControl>
```

Потратьте некоторое время на изучение только что добавленного кода:

Для отрисовки каждого элемента коллекции, используется `<ItemsControl>`.
Сам `<ItemsControl>` повторяет отрисовку для каждого элемента коллекции,
которая определена в атрибуте `ItemsSource`. 
Также, выражение привязки данных `{Binding ListItems}`, говорит о том,
что мы ищем контекст данных с таким именем свойства.

За вид отображаемого элемента, внутри `<ItemsControl>`, отвечает шаблон `ItemTemplate>`.
Он может содержать любую комбинацию `controls`, но в данном примере используется **data template**.

:::info
Подробнее о концепции Data Template, см. [здесь](../../concepts/templates/).
:::

Встроенные `controls` внутри шаблона данных, будут ожидать обнаруженя свойств `IsChecked` и `Description`.
Они будут получены из элементов свойства `ListItems`, находящегося в первом подходящем
контексте данных, который найден `user control`.

Теперь схема связей между `views` и `view models`, выглядит следующим образом:

<img className="center" src={ToDoDataContextWiringDiagram} alt="" />

Это будет работать, если у любого родителя `items control` есть объект контекста данных со
свойством `ListItems`.
Привязка _Avalonia UI_ выполнит поиск по дереву элментов,чтобы найти подходящий контекст данных.
Пусть контекст данных основного окна и был установлен
(во время инициализации приложения - см. файл **App.axaml.cs**),
но по прежнему отсутствует контекст данных со свойством `ListItems`.

Если вы запустите приложение, то список по-прежнему будет пуст!

<img className="center" src={ToDoBlankAfterWiringScreenshot} alt="" />
