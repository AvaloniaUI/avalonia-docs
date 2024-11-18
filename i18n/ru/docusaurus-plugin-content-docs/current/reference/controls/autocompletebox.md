---
description: REFERENCE - Built-in Controls
---

import AutoCompleteBoxScreenshot from '/img/reference/controls/autocompletebox/autocompletebox.gif';

# Поле автозаполнения

Поле автозаполнения собой текстовое поле для пользовательского ввода, совмещенное с выпадающим списком элементов, имеющих возможно совпадение введенному значению.
Список появляетя, когда пользователь начинает вводить текст. (список возможных элементов обновляется после ввода каждого символа). Пользователь может выбирать значения из списка.

Отдельно, можно настроить правила сравнения элементов при вводе. .

## Useful Properties

Часто используемые свойства:

| Свойство         | Описание                                                                |
|------------------|-------------------------------------------------------------------------|
| `Items`          | Список элементов для сравнения                                          |
| `FilterMode`     | Правила сравнения.                                                      |
| `AsyncPopulator` | Асинхронная функция, вывдающая список совпадений по заданному сравнению |

Ниже представлены все возможные режимы для фильтрации:

| Режим фильтрации                 | Описание                                                                    |
|----------------------------------|-----------------------------------------------------------------------------|
| `StartsWith`                     | Регионо-зависимая проверка начала строки, регистр **не** учитывается.       |
| `StartsWithCaseSensitive`        | Регионо-зависимая проверка начала строки, регистр учитывается.              |
| `StartsWithOrdinal`              | Побайтовая проверка начала строки, регистр **не** учитывается.              |
| `StartsWithOrdinalCaseSensitive` | Побайтовая проверка начала строки, регистр учитывается.                     |
| `Contains`                       | Проверка наличия регионо-зависимой "подстроки", регистр **не** учитывается. |
| `ContainsCaseSensitive`          | Проверка наличия регионо-зависимой "подстроки", регистр учитывается.        |
| `ContainsOrdinal`                | Проверка наличия побайтовой "подстроки", регистр **не** учитывается.        |
| `ContainsOrdinalCaseSensitive`   | Проверка наличия побайтовой "подстроки", регистр учитывается.               |
| `Equals`                         | Полное совпадение регионо-зависимой, регистр **не** учитывается             |
| `EqualsCaseSensitive`            | Полное совпадение регионо-зависимой, регистр учитывается                    |
| `EqualsOrdinal`                  | Полное побайтовое совпадение, регистр **не** учитывается.                   |
| `EqualsOrdinalCaseSensitive`     | Полное побайтовое совпадение, регистр учитывается.                          |

:::info
При использовании **ordinal**, происходит побайтовое сравнение (не зависит от языка).
:::

## Примеры

В примере ниже, используется статический массив значений, определенный в коде C#.

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">Выберите животное:</TextBlock>
  <AutoCompleteBox x:Name="animals" FilterMode="StartsWith" />
</StackPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.ItemsSource = new string[] 
                {"кот", "верблюд", "корова", "хамелеон", "мышь", "лев", "зебра" }
            .OrderBy(x=>x);
        }
    }
}
```

<img src={AutoCompleteBoxScreenshot} alt="" />

## Больше информации

:::info
Детальная информация об API элемента, смотрите [здесь](http://reference.avaloniaui.net/api/Avalonia.Controls/AutoCompleteBox/).
:::

:::info
Исходный код на _GitHub_ [`AutoCompleteBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/AutoCompleteBox/AutoCompleteBox.cs)
:::
