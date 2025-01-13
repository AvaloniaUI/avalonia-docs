---
id: code-behind
title: Code-behind
---

import VsSolutionExplorerScreenshot from '/img/basics/user-interface/code-behind/vs-solution-explorer.png';

# Code-behind

Помимо XAML-файла, большинство элементов управления Avalonia также имеют файл _code-behind_, который обычно пишется на C#. По соглашению файл code-behind имеет расширение `.axaml.cs` и часто отображается вложенным под XAML-файлом в вашей IDE.

Например, в обозревателе решений Visual Studio можно увидеть файл `MainWindow.axaml` вместе с его файлом code-behind `MainWindow.axaml.cs`:

<p><img src={VsSolutionExplorerScreenshot} className="medium-zoom-image" /></p>

Файл code-behind содержит класс с тем же именем, что и у XAML-файла. Например:

```csharp title='MainWindow.axaml.cs'
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```

Обратите внимание, что имя класса совпадает с именем XAML-файла и также указано в атрибуте `x:Class` элемента окна.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        x:Class="AvaloniaApplication1.Views.MainWindow">
        ...
        </Window>
```

:::tip
Если вы изменяете имя класса в коде или его пространство имен, убедитесь, что атрибут `x:Class` всегда совпадает, иначе произойдет ошибка.
:::

Когда файл code-behind создается впервые, он содержит только конструктор, который вызывает метод `InitializeComponent()`. Этот вызов обязателен для загрузки XAML во время выполнения.

## Поиск элементов управления

При работе с code-behind часто возникает необходимость получить доступ к элементам управления, определенным в XAML.

Для этого сначала нужно получить ссылку на нужный элемент управления. Назначьте элементу управления имя с помощью атрибута `Name` (или `x:Name`) в XAML.

Пример XAML-файла с именованной кнопкой:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication5.MainWindow">
    // highlight-next-line
    <Button Name="greetingButton">Hello World</Button>
</Window>
```

Теперь вы можете получить доступ к кнопке через автоматически созданное поле `greetingButton` из code-behind:

```csharp title='MainWindow.axaml.cs'
using Avalonia.Controls;

namespace AvaloniaApplication1.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            // highlight-next-line
            greetingButton.Content = "Goodbye Cruel World!";
        }
    }
}
```

## Установка свойств

Имея ссылку на элемент управления в code-behind, вы можете установить его свойства. Например, можно изменить фон кнопки следующим образом:

```csharp
greetingButton.Background = Brushes.Blue;
```

## Обработка событий

Полезное приложение требует выполнения каких-либо действий! При использовании подхода code-behind вы пишете обработчики событий в файле code-behind.

Обработчики событий пишутся как методы в файле code-behind и затем указываются в XAML с помощью атрибута события. Например, чтобы добавить обработчик для события клика кнопки:

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication4.MainWindow">
    <Button Click="GreetingButtonClickHandler">Hello World</Button>
</Window>
```

```csharp title='MainWindow.axaml.cs'
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public void GreetingButtonClickHandler(object sender, RoutedEventArgs e)
    {
        // код здесь
    }
}
```

Обратите внимание, что многие обработчики событий Avalonia передают специальный аргумент класса `RoutedEventArgs`. Этот аргумент содержит информацию о том, как событие было создано и распространено.

:::info
Для получения дополнительной информации о концепциях маршрутизации событий см. [здесь](../../concepts/input/routed-events.md).
:::