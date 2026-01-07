---
description: CONCEPTS
---

# Avalonia XAML

_Avalonia UI_ использует XAML для описания пользовательского интерфейса. XAML — это язык разметки, основанный на XML, который применяется во многих фреймворках пользовательского интерфейса.

:::info
На этих страницах вы узнаете, как именно XAML используется в _Avalonia UI_. Для получения общей информации о применении XAML в других технологиях Microsoft, вы можете обратиться к следующим ресурсам:

- Документация по XAML в WPF: [ссылка](https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/xaml-overview-wpf).
- Документация по XAML в UWP: [ссылка](https://docs.microsoft.com/en-us/windows/uwp/xaml-platform/xaml-overview).
  :::

## Расширение файлов AXAML

В то время как стандартное расширение файлов XAML — `.xaml`, в _Avalonia UI_ используется собственное расширение `.axaml` (Avalonia XAML) из-за технических особенностей интеграции с Visual Studio.

## Формат файла

Пример файла Avalonia XAML:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow">
</Window>
```

Как и в любом XML-документе, в файле есть корневой элемент. В данном примере это `<Window></Window>`, который определяет тип корневого элемента. Этот элемент соответствует определённому контролу Avalonia UI, в данном случае окну.

Пример выше использует три важных атрибута:

- `xmlns="https://github.com/avaloniaui"` — объявляет пространство имён XAML для _Avalonia UI_. Без него файл не будет распознан как документ Avalonia XAML.
- `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` — объявляет пространство имён для языка XAML.
- `x:Class="AvaloniaApplication1.MainWindow"` — указывает XAML-компилятору, где находится связанный класс для данного файла. Этот класс обычно описывается в C#-файле (code-behind).

:::info
Подробнее о концепции "code-behind" можно прочитать [здесь](code-behind).
:::

## Элементы управления

Вы можете создать пользовательский интерфейс (UI), добавляя XML-элементы, представляющие элементы управления _Avalonia UI_. Имя элемента совпадает с именем класса контрола.

:::info
Интерфейс может состоять из множества разных элементов управления. Подробнее о создании сложного интерфейса можно прочитать [здесь](/docs/concepts/ui-composition.md).
:::

Например, следующий код добавляет кнопку в окно:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button>Hello World!</Button>
</Window>
```

:::info
Список встроенных контролов Avalonia UI можно найти [здесь](/docs/reference/controls).
:::

## Атрибуты элементов управления

Атрибуты XML-элементов соответствуют свойствам контролов. Свойства можно задать, добавляя атрибуты к элементам.

Например, чтобы задать синий фон для кнопки, добавьте атрибут `Background`:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Background="Blue">Hello World!</Button>
</Window>
```

## Содержимое элементов управления

Содержимое кнопки в примере выше задаётся строкой "Hello World!", расположенной между открывающим и закрывающим тегами. Альтернативный способ — использование атрибута `Content`:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="Hello World!"/>
</Window>
```

Это поведение характерно для содержимого элементов управления в _Avalonia UI_.

## Привязка данных

Система привязки данных _Avalonia UI_ позволяет связывать свойства элементов управления с объектами. Это делается с помощью расширения разметки `{Binding}`. Например:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="{Binding Greeting}"/>
</Window>
```

:::info
Подробнее о концепции привязки данных можно прочитать [здесь](/docs/basics/data/data-binding).
:::

## Файлы "code-behind"

Многие файлы XAML имеют связанный файл "code-behind", обычно написанный на C#, с расширением `.xaml.cs`.

:::info
Руководство по программированию с использованием "code-behind" доступно [здесь](code-behind).
:::

## Пространства имён XML

В Avalonia XAML можно объявлять пространства имён, как и в любом XML-документе. Это позволяет процессору XML находить определения элементов.

:::info
Подробнее о пространствах имён XML читайте в [документации Microsoft](https://docs.microsoft.com/en-us/dotnet/standard/data/xml/managing-namespaces-in-an-xml-document).
:::

Пространства имён добавляются с помощью атрибута `xmlns`. Формат объявления:

```xml
xmlns:alias="definition"
```

Чаще всего пространства имён объявляют в корневом элементе.

### **Префикс CLR Namespace**

Для ссылок на код в текущей или подключённой сборке используется префикс `clr-namespace:`:

```xml
xmlns:myAlias1="clr-namespace:MyNamespace.AppNameSpace.UI"
        xmlns:myAlias2="clr-namespace:MyNamespace.OtherAssembly;assembly=OtherAssembly"
```

### **Префикс Using**

Альтернативный префикс `using:` позволяет ссылаться на код в текущей сборке:

```xml
xmlns:myAlias3="using:MyNamespace.AppNameSpace.UI"
```