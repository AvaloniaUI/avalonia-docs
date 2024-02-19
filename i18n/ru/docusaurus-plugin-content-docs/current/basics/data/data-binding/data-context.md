---
description: CONCEPTS
---

import DataContextOverviewDiagram from '/img/basics/data-binding/data-context/data-context-overview.png';
import DataContextTreeSearchDiagram from '/img/basics/data-binding/data-context/data-context-tree-search.png';
import DataContextGreetingBindingScreenshot from '/img/basics/data-binding/data-context/data-context-greeting.png';
import DataContextPreviewerScreenshot from '/img/basics/data-binding/data-context/data-context-previewer.png';

# Data Context (рус: Контекст Данных)

Для привязки данных, Avalonia должна найти объект привязки.
Расположение такого объекта в приложении и  называется контекстом данных.

<img src={DataContextOverviewDiagram} alt=''/>

Каждый элемент Avalonia содержит свойство `DataContext`.
К ним относятся Controls, User Controls и Window.

При привязке, Avalonia выполняет иерархический поиск по логическому дереву, 
в котором определены элементы, пока не найдет контекст данных для использования.

<img src={DataContextTreeSearchDiagram} alt=''/>

Это значит, что элемент определенный в окне, может использовать его контекст данных; 
или, как показано выше, элемент в элементе, тоже может использовать контекст данных окна.

:::info
Подробную информацию о Control Trees (рус: Деревья элементов), см. [здесь](../../../concepts/control-trees).
:::

## Пример

Вы можете увидеть, каким образом можно указать контекст данных для окна, 
если создадите новый проект по шабону _Avalonia MVVM Application_. 
После, найдите и откройте файл **App.axaml.cs**, чтобы увидеть код:

```csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        desktop.MainWindow = new MainWindow
        {
            DataContext = new MainWindowViewModel(),
        };
    }

    base.OnFrameworkInitializationCompleted();
}
```

Указанный в контекте данных объект, вы можете найти в файле **MainWindowViewModel.cs**. Код выглядит следующим образом:

```csharp
public class MainWindowViewModel : ViewModelBase
{
    public string Greeting => "Welcome to Avalonia!";
}
```
В файле основного окна, вы можеье увидеть, что его содержимое состоит из `TextBlock`,
у которого свойство `Text`, устанавливается через привязанное свойство `Greeting`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:AvaloniaMVVMApplication2.ViewModels"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="AvaloniaMVVMApplication2.Views.MainWindow"
        Icon="/Assets/avalonia-logo.ico"
        Title="AvaloniaMVVMApplication2">

    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

После запуска проекта, `Data Binder` (рус: Привязщик Данных) ищет контекст данных в логическом дереве и находит его на уровне основного окна.
Пример привязанного текста:

<img src={DataContextGreetingBindingScreenshot} alt=""/>

## Design Data Context (рус: Контекст Данных для предварительного просмотра)

Возможно вы заметили, что после сборки проекта, на панели предварительного просмотра также отображается привязанный объект.

<img src={DataContextPreviewerScreenshot} alt=""/>

Это связано с тем, что Avalonia может определить контекст данных на этапе разработки.
Это может помочь вам, чтобы видеть некоторые реальные данные, пока происходит настройка макета и стилей.

Вы можете установить контекст данных для предварительного просмотра в файле XAML:

```xml
<Design.DataContext>
    <vm:MainWindowViewModel/>
</Design.DataContext>
```

:::tip
Подробную информацию о Design-Time Data Context, см. [здесь](../../../guides/implementation-guides/how-to-use-design-time-data.md).
:::

:::info
Дальнейшее изучение привязки данных, требует от вам понимание шаблона MVVM. Подробную информацию о нем, см. [здесь](../../../concepts/the-mvvm-pattern).
:::

Дополнительный материал

Bind to Commands (рус: Привязка к Командам)
