---
id: control-themes
title: Темы элементов управления
---

import StylingEllipseButtonScreenshot from '/img/basics/user-interface/styling/ellipse-button.png';

Темы элементов управления основаны на [стилях](styles) для создания переключаемых тем для элементов управления. Темы элементов управления аналогичны стилям в WPF/UWP, хотя их механизм немного отличается.

:::tip
Поскольку темы элементов управления основаны на стилях, важно сначала понять [систему стилизации](styles) Avalonia.
:::

## Введение

До Avalonia 11 темы элементов управления создавались с использованием стандартных стилей. Однако у этого подхода была фундаментальная проблема: как только стиль применялся к элементу управления, не было способа удалить его. Следовательно, если вы хотели изменить тему для конкретного экземпляра элемента управления или раздела пользовательского интерфейса, единственным вариантом было применить вторую тему к элементу управления и надеяться, что она переопределит все свойства, установленные в исходной теме.

Решение для этого было представлено в Avalonia 11 в виде _тем элементов управления_.

Темы элементов управления сами по себе являются стилями, но с некоторыми важными отличиями:

- Темы элементов управления не имеют селектора: вместо этого у них есть свойство `TargetType`, которое описывает целевой элемент управления
- Темы элементов управления хранятся в `ResourceDictionary` вместо коллекции `Styles`
- Темы элементов управления назначаются элементу управления путем установки свойства `Theme`, обычно с использованием расширения разметки `{StaticResource}`

:::info
Темы элементов управления обычно применяются к [шаблонным (без внешнего вида)](../controls/creating-controls/choosing-a-custom-control-type.md) элементам управления, но фактически могут быть применены к любому элементу управления. Однако для нешаблонных элементов управления часто удобнее использовать стандартные стили.
:::

## Пример: круглая кнопка

Следующий пример показывает простую тему `Button`, которая отображает кнопку с эллиптическим фоном в эстетике 90-х Geocities:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    // highlight-start
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </ControlTheme>
    // highlight-end
  </Application.Resources>
</Application>
```

```xml title='MainWindow.xaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
        x:Class="Sandbox.MainWindow">
  // highlight-start
  <Button Theme="{StaticResource EllipseButton}"
          HorizontalAlignment="Center"
          VerticalAlignment="Center">
    Привет, мир!
  </Button>
  // highlight-end
</Window>
```

<p><img className="medium-image-zoom" src={StylingEllipseButtonScreenshot} alt="Эллиптическая кнопка" /></p>

## Взаимодействие в темах элементов управления

Как и стандартные стили, темы элементов управления поддерживают [вложенные стили](../styling/styles.md#nesting-styles), которые можно использовать для добавления взаимодействий, таких как состояния при наведении указателя и нажатии.

## Пример: состояние наведения для круглой кнопки

Используя вложенные стили, мы можем сделать так, чтобы наша кнопка меняла цвет при наведении на неё указателя:

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      // highlight-start
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
      // highlight-end
    </ControlTheme>
  </Application.Resources>
</Application>
```

## Поиск темы элемента управления

Существует два способа, которыми может быть найдена тема элемента управления:

- Если свойство `Theme` элемента управления установлено, то будет использована эта тема элемента управления; в противном случае
- Avalonia будет искать вверх по логическому дереву ресурс `ControlTheme` с `x:Key`, соответствующим [ключу стиля](styles#style-key) элемента управления

:::tip
Если у вас возникают проблемы с поиском вашей темы в Avalonia, убедитесь, что она возвращает [ключ стиля](styles#style-key), соответствующий `x:Key` и `TargetType` вашей темы элемента управления
:::

По сути это означает, что у вас есть два варианта определения темы элемента управления:

- **Если вы хотите, чтобы тема элемента управления применялась ко всем экземплярам элемента управления**, используйте `{x:Type}` в качестве ключа ресурса. Например,
  `<ControlTheme x:Key="{x:Type Button}" TargetType="Button">`
- **Если вы хотите, чтобы тема элемента управления применялась к выбранным экземплярам элемента управления**, используйте что-то другое в качестве ключа ресурса и ищите этот ресурс с помощью `{StaticResource}`. Обычно этот ключ будет `string`

:::info
Обратите внимание, что это означает, что к элементу управления в любой момент времени может быть применена только одна тема элемента управления.
:::

## Пример: сделать все кнопки круглыми

Мы можем применить нашу новую тему элемента управления ко всем кнопкам в приложении, просто изменив `x:Key` темы элемента управления, чтобы он соответствовал типу `Button`.

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="AvaloniaApplication.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>

  <Application.Resources>
      // highlight-next-line
    <ControlTheme x:Key="{x:Type Button}" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
      
      <Style Selector="^:pointerover">
        <Setter Property="Background" Value="Red"/>
        <Setter Property="Foreground" Value="White"/>
      </Style>
    </ControlTheme>
  </Application.Resources>
</Application>
```

## TargetType

Свойство `ControlTheme.TargetType` указывает тип, к которому применяются свойства установщика. Если вы не указываете `TargetType`, вы должны квалифицировать свойства в ваших объектах Setter с именем класса, используя синтаксис `Property="ClassName.Property"`. Например, вместо установки Property="FontSize", вы должны установить Property в `TextBlock.FontSize` или `Control.FontSize`.

## Дополнительные ресурсы

- Пример [ButtonCustomize](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize) имеет `WinClassicButtonTheme`
- Вы можете увидеть темы элементов управления для встроенных элементов управления Avalonia здесь:
  - [Simple Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Simple/Controls)
  - [Fluent Theme](https://github.com/AvaloniaUI/Avalonia/tree/master/src/Avalonia.Themes.Fluent/Controls)
