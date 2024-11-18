---
id: simple
title: Тема Simple
---

## Вступление

`Simple` - это минималистичная и легковеская тема, с ограниченной встроенной стилизацией.
Что обеспечивает простую и понятную основу при создании пользовательских стилей.
Низкие визуализация и структурная сложность - это отличный выбор для приложений на встраиваемых устройств.

![Тема Simple](/img/basics/user-interface/styling/simple-theme.png)

## Начало работы

Установите nuget-пакет [Avalonia.Themes.Simple](https://www.nuget.org/packages/Avalonia.Themes.Simple/). 

:::info
Для добавления nuget-пакета, следуйте соответствующим инструкциям: [Visual Studio](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio), [Rider](https://www.jetbrains.com/help/rider/Using_NuGet.html).
:::

Добавьте тему в класс Application:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <SimpleTheme />
    // highlight-end
  </Application.Styles>
</Application>

```

:::note
Для добавление вариантов темной и светлой темы, см. документацию [Theme Variants](../../../../guides/styles-and-resources/how-to-use-theme-variants.md).
:::