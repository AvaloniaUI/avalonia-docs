---
id: respond-to-an-event
title: Обработка событий
---

import SolutionCodeBehindScreenshot from '/img/get-started/test-drive/solution-code-behind.png';
import ButtonIntellisenseClickScreenshot from '/img/get-started/test-drive/button-intellisense-click.png';
import EventDebugOutputScreenshot from '/img/get-started/test-drive/event-debug-output.png';

Есть несколько способов обработки событий на Avalonia.
На этой странице вы узнаете, как использовать один из самых распостраненных: нажатие кнопки.

В начале, вы напишите обработку нажатия кнопки, которое никак не взаимодействует с другими Controls.

## Code-behind

XAML файл главного окна, связан с файлом C#. Если вы используете IDE, то можете найти этот файл в *Solution Explorer (рус: обозреватель решений)* - подпункт файла `.axaml`.

<img className="center" src={SolutionCodeBehindScreenshot} alt="" />

Для его изменения:

- Откройте файл `MainWindows.axaml.cs`

Вы увидите код C#, похожий на нижеуказанный:

```csharp
using Avalonia.Controls;

namespace GetStartedApp
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

Частичный класс `MainWindow`, соотстветстует объекту `Window`, который создается Avalonia UI
на основании существующего файла XAML. Вы можете найти его по тегу:

```xml
<Window 
    ...
    x:Class="GetStartedApp.MainWindow" >
</Window>
```

To add an event handler for the button, follow this procedure:
- В файле `MainWindows.axaml.cs`, найдите конструктор `MainWindows` (инструкция была ранее)
- Добавьте следующий код после конструктора:

```csharp
public void ButtonClicked(object source, RoutedEventArgs args)
{
    Debug.WriteLine("Click!");
}
```

Также необходимо подключить зависимости:

```cs
using Avalonia.Interactivity;
using System.Diagnostics;
```

- Переключитесь на файл XAML и найдите тег `<Button>`
- Добавить в него атрибут, как показано ниже:

```xml
<Button
   ...
   Click="ButtonClicked">
</Button>
```

:::tip
Если вы используете IDE, то при вводе должны отобразиться возможные варианты.

<img className="center" src={ButtonIntellisenseClickScreenshot} alt="" />
:::

- Запустите приложение и нажмите кнопку.

В окне отладки, вы дожны увидеть сообщения, например:

<img className="center" src={EventDebugOutputScreenshot} alt="" />

На следующей странице вы узнаете, как использовать Code-Behind для чтение и изменения свойств Controls во время работы программы.