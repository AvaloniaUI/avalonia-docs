---
description: TUTORIALS - To Do List App
---

# Изучение XAML

Наступило самое время взглянуть на сгенерированный шаблоном `view` код.

Начнем с корня элемента, в нем объявлены пространства имен и настройки:

```xml
 <UserControl 
    xmlns="https://github.com/avaloniaui"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450"
    x:Class="ToDoList.Views.ToDoListView">
```

Корневой элемент в XAML-файле начинается с `<UserControl` и за ним объявляются несколько пространств имен XML `xmlns`,
общих для _Avalonia UI_ `controls`.
Самое важное объявление, на которое стоит обратить внимание, указано первым:

```xml
<UserControl xmlns="https://github.com/avaloniaui" ... >
```

Оно указывает, что данный XAML-файл использует _Avalonia UI_ XAML.

:::warning
Без данной строки, ваш проект _Avalonia UI_ не будет работать!
:::

Следующее пространство имен - это `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"`.
Оно используется для импорта Microsoft XAML, используемых _Avalonia UI_.

:::info
Подробнее в документации Microsoft, см. [здесь](https://learn.microsoft.com/en-us/dotnet/desktop/xaml-services/namespace-language-features).
:::

Оставшиеся два пространства имен, используются для взаимодействия в _Avalonia UI_ между кодом и панелью предварительного просмотра.

```xml
<UserControl ...
     xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
     xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ... > 
```

К примеру, рассмотрим изменение высоты и ширины `control` в предварительном просмотре, как вы уже делали ранее:

<pre class="language-xml"><code class="lang-xml">&#x3C;UserControl ...
<strong>mc:Ignorable="d" d:DesignWidth="250" d:DesignHeight="450" ... ></strong></code></pre>

Запись `mc:Ignorable="d"`, указывает движку _Avalonia UI_ XAML, что записи, начинающиеся с `d:`, надо пропускать при запуске.

Последняя строка, связывает XAML-файл с его `code-behind` классом.
Обратите внимание, что здесь используется полное имя класса.

```xml
<UserControl ...
   x:Class="ToDoList.Views.ToDoListView">
```

## Содержимое Control

В зоне содержимого `user control` указана `dock panel`:

```xml
<DockPanel>
```

:::info
Подробнее о зонах макета, см. [здесь](../../concepts/layout/layout-zones).
:::

`user control` может содержать только один-единственных дочерний `control` в своей зоне содержимого;
По этой причине, вам почти всегда придется использовать `panel controls` из _Avalonia UI_,
которые которые позволяют указывать внутри себя несколько `control`.

:::info
Подробнее о `panel controls`, используемых в _Avalonia UI_, см. [здесь](../../reference/controls/panel.md).
:::

В этом примере, вы используете `panel control`, называемую `<DockPanel>`.
Данный тип панели, размещает дочерние элементы по краям своей зоны содержимого.
Каждому дочернему элементу можно задать привязку: top, bottom, left или right.
Она указывается в атрибуте `DockPanel.Dock`.
В указанном ниже примере, кнопка притягивается к нижней части и растягивается по ширине, а ее текст центрируется.

```xml
<Button DockPanel.Dock="Bottom"
    HorizontalAlignment="Stretch"
    HorizontalContentAlignment="Center">Add Item</Button>
```

В `dock panel` должен быть хотя бы один `control` в зоне содержимого, который заполнит оставшееся место в зоне содержимого.
Иначе он будет отображаться некорректно. Данный `control` *не должен* содержать атрибут `DockPanel.Dock`.
Для заполнения свободного места, в руководстве используется `stack panel`:

```xml
<StackPanel>
```

`Stack Panel` размещает дочерние элементы друг за другом (по-умолчанию, вертикально).
Вы можете указать горизонтальное расположение элементов в атрибуте `Orientation`.
Вы будете часто использовать `stack panel` в _Avalonia UI_.

:::info
Подробную информацию о `Stack Panel`, см. [здесь](../../reference/controls/stackpanel.md).
:::

Оставшийся XAML добавит захардкоженные элементы списка дел в виде флажков:

```xml
<CheckBox Margin="4">Walk the dog</CheckBox>
<CheckBox Margin="4">Buy some milk</CheckBox>
```

Обратите внимание, что для указанных выше элементов, указан атрибут `margin`.
Он добавит пространства между элементами, что визуально разделит их.

:::info
`margin` является одной из зон макета в `control` _Avalonia UI`. Подробнее о концепте зон макета, см. [здесь](../../concepts/layout/layout-zones).
:::

На следующей страницу узнаете, как отображать созданную `view` в основном окне приложения.