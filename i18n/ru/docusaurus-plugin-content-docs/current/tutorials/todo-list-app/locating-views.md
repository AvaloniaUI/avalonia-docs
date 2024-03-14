---
description: TUTORIALS - To Do List App
---

import ToDoViewLocatorArchitectureDiagram from '/img/gitbook-import/assets/image (45).png';

# The View Locator

На этой странице вы узнаете, для чего используется `view locator`, который был добавлен из шаблона решения.
Вы увидите, как реализуется парадигма 'Соглашения по конфигурации' внутри
содержимого вашего основного окна.

Для понимания, как это работает, ознакомьтесь с классом `view locator`:

```csharp
using Avalonia.Controls;
using Avalonia.Controls.Templates;
using System;
using ToDoList.ViewModels;

namespace ToDoList
{
    public class ViewLocator : IDataTemplate
    {
        public Control Build(object data)
        {
            var name = data.GetType().FullName!.Replace("ViewModel", "View");
            var type = Type.GetType(name);

            if (type != null)
            {
                return (Control)Activator.CreateInstance(type)!;
            }
            else
            {
                return new TextBlock { Text = "Not Found: " + name };
            }
        }

        public bool Match(object data)
        {
            return data is ViewModelBase;
        }
    }
}
```

Класс `view locator` определяет шаблон данных в коде, который принимает `view model` и возвращает соответствующую `view`.
Это работает благодаря двум метода:

* `Match(object data)` проверяет, что ваши `view model` наследуются от класса `ViewModelBase` - как это и делают обе ваши `view models`!
При усмушном прохождении проверки, вызывается метод `Build`:
* `Build(object data)` принимает полное имя вашей `view model`, и заменяет ее часть `"ViewModel"` на `"View"`.
Затем он пытается создать тип `view` и, в случае успеха, возвращает его.

Экземпляр `ViewLocator` находит внутри файла проекта **App.xaml** (он был добавлен шаблоном решения).
Он выглядит примерно так:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="ToDoList.App"
             xmlns:local="using:ToDoList"
             RequestedThemeVariant="Default">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>
  
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

В вашем приложении списка дел, содержимое основного окна указывает на объект, который не является встроенным `control`,
`user control` или пользовательским `control`.
Поэтому _Avalonia UI_ ищет **data template (рус: шаблон данных)** в дереве `controls`, который соответствует классу в содержимом основного окна.

:::info
Подробнее о концепте `data templates (рус: шаблоны данных)`,  см [здесь](../../concepts/templates/).
:::

Поскольку никаких других data templates (рус: шаблонов данных) нет, то поиск укажет на `ViewLocator` - элемент `data templates` приложения.
Он запустит свои проверки и, в случае успеха, веренет соответствующий экземпляр `view`. 
В вашем приложении, это будет `view` списка дел.

<img className="center" src={ToDoViewLocatorArchitectureDiagram} alt="" />

Таким образом, содержимому основного окна присваивается нужная `view`, согласно типу `view model` и соглашения об именовании.

## Source not Framework

Обратите внимание, что класс `View Locator`, включен в исходники проекта, и не является часть фреймворка _Avalonia UI_.
Это связано с тем, что парадигма 'Соглашение по конфигурации', является архитектурным выбором разработчика прилоежения.

Поэтому, если вы не ходите использовать `view locator` (в другом приложении), то удалит его из проекта и файла **App.axaml**.

На следующей странице вы узнаете, как добавить функкционал и события для кнопок **OK** и **Cancel**.