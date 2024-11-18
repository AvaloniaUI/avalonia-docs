---
id: install
title: Установка
---

## Установка шаблонов Avalonia UI

Лучший выбором для начала работы с Avalonia - это создание приложение из шаблона.

Для установки шаблонов Avalonia, выполните следующую команду:

```bash
dotnet new install Avalonia.Templates
```

:::note
Для .NET 6.0 или более ранней версии, замените `install` на `--install`
:::

Для отображения списка установленных шаблонов выполните следующую команду:

```bash
 dotnet new list
```

Вы должны увидеть следующие шаблоны Avalonia:

```
Template Name                                 Short Name                  Language    Tags
--------------------------------------------  --------------------------  ----------  ---------------------------------------------------------
Avalonia App                                  avalonia.app                [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia MVVM App                             avalonia.mvvm               [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Cross Platform Application           avalonia.xplat              [C#],F#     Desktop/Xaml/Avalonia/Web/Mobile
Avalonia Resource Dictionary                  avalonia.resource                       Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Styles                               avalonia.styles                         Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia TemplatedControl                     avalonia.templatedcontrol   [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia UserControl                          avalonia.usercontrol        [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
Avalonia Window                               avalonia.window             [C#],F#     Desktop/Xaml/Avalonia/Windows/Linux/macOS
```