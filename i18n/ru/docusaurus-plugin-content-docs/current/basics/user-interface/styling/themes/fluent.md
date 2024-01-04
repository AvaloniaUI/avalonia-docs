---
id: fluent
title: Тема Fluent
---

import FluentThemeNormalScreenshot from '/img/basics/user-interface/styling/fluent-theme-normal.png';
import FluentThemeForestScreenshot from '/img/basics/user-interface/styling/fluent-theme-forest.png';

## Вступление

Тема `Fluent` для Avalonia, была вдохновлена `Microsoft's Fluent Design System`, 
которая представляет собой набор рекомендаций по дизайну и компонентам для создания визуально-приятных и интерактивных
пользовательских интерфейсов.
Систему дизайна `Fluent`, выделяет современность, эстетичность, плавная анимация и интуитивно-понятный интерфейс для взаимодействия.
Все это обеспечивает единообразный и безупречный интерфейс для разных платформ, а также предоставляет разработчикам гибкость в использовании системы стилей.

<p><img className="medium-image-zoom" src={FluentThemeNormalScreenshot} alt="Fluent Theme" /></p>

## Начало работы

Установите nuget-пакет  [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent/).

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
    <FluentTheme />
    // highlight-end
  </Application.Styles>
</Application>
```

:::note
Для добавление вариантов темной и светлой темы, см. документацию [Theme Variants](../../../../guides/styles-and-resources/how-to-use-theme-variants.md).
:::

## Изменение плотности темы

Тема `Fluent` имеет два предопределенных набора плотности.
Для переключение к компактному виду, вы должны изменить свойство `DensityStyle`:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    // highlight-start
    <FluentTheme DensityStyle="Compact" />
    // highlight-end
  </Application.Styles>
</Application>
```

## Создание пользовательской цветовой палитры

Хоть во `FluentTheme` и есть встроенные ресурсы для темного и светлого варианта, вы все-равно можете переопределить основную палитру для этих вариантов.
Это полезно, когда вы используете одну и ту же основную тему, но в разных цветах.

Для это вы должны определить их, как показано ниже:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme>
    // highlight-start
      <FluentTheme.Palettes>
        <!-- Palette for Light theme variant -->
        <ColorPaletteResources x:Key="Light" Accent="Green" RegionColor="White" ErrorText="Red" />
        <!-- Palette for Dark theme variant -->
        <ColorPaletteResources x:Key="Dark" Accent="DarkGreen" RegionColor="Black" ErrorText="Yellow" />
      </FluentTheme.Palettes>
    // highlight-end
    </FluentTheme>
  </Application.Styles>
</Application>
```
`ColorPaletteResources` имеет множество цветовых свойств для переопределения, которые можно указывать, в том числе только для одного варианта.
Также нет необходимости переопределять все свойства, вы можете указать только необходимые свойства, в то время как оставшиеся
будут использовать значения по-умолчанию.
К примеру, ранее были переопределены только некоторые из цветов.

Если не указано свойство `Accent`, то Avalonia берет его значение из системы, если оно доступно.
Также, `Accent` поддерживает `bindings (рус: привязки)`, что позволяет менять его во время работы.
Однако другие свойства менять нельзя, в целях производительности, они инициализируются один раз при старте приложения.

Можно создавать палитры из исходного кода, но они подчиняются тем же правилам - только `Accent` можно изменить динамически,
а палитры должны быть инициализированы один раз.

:::note
`FluentTheme` поддерживает только темную и светлую темы, в ней нельзя определить иные.
:::

## Создание пользовательских цветовых палитр в онлайн редакторе

`Microsoft Fluent Theme Editor` был портирован на Avalonia и теперь доступен для использования с наше `FluentTheme`.
Он доступен на страницу https://theme.xaml.live/ и поддерживает следующие функции:

1. Переключение цветовой палитры на светлую или темную.
2. Предварительный просмотр текущей палитры.
3. Экспортирование текущей палитры в XAML-код, которые можно вставить в файл `App.axaml`.
4. Сохранение текущих цветов в json-файл, а также загрузка из него.
5. Автоматические подсказки при низкой контрастности между цветами.
6. Пара предустановок для быстрого старта.

Пример `FluentTheme` с предустановленной палитрой `Forest`, доступный в веб-приложении:
<p><img className="medium-image-zoom" src={FluentThemeForestScreenshot} alt="Fluent Theme Forest Palette" /></p>