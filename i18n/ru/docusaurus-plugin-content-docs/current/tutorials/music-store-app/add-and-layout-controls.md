---
description: TUTORIALS - Music Store App
---

import MusicStoreBuyButtonScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/buy-button.png';
import MusicStoreAddStylesScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/add-styles.png';
import MusicStorePrettyButtonScreenshot from '/img/tutorials/music-store-app/add-and-layout-controls/pretty-button.png';

# Добавление и размещение компонентов UI

В конечном итоге, основное окно приложения будет отображать обложки альбомов из коллекции пользователя. 
А в правом верхнем углу будет кнопка, которая будет открывать окно для поиска и добавления альбомов.

На этой странице вы узнаете, как расположить кнопку в правом верхнем углу основного окна.

## Расположение кнопки

Для отображения кнопки в зоне содержимого основного окна, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **MainWindow.axaml**.
- Внутри элемента `panel`, добавьте XAML кнопки. Содержимое файла должно выглядеть, как показано ниже:

```xml
<Panel>
    <ExperimentalAcrylicBorder IsHitTestVisible="False">
        <ExperimentalAcrylicBorder.Material>
            <ExperimentalAcrylicMaterial
                 BackgroundSource="Digger"
                 TintColor="Black"
                 TintOpacity="1"
                 MaterialOpacity="0.65" />
        </ExperimentalAcrylicBorder.Material>
     </ExperimentalAcrylicBorder>

     <Button Content="Buy Music"/>
</Panel>
```

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.

<p><img className="image-medium-zoom" src={MusicStoreBuyButtonScreenshot} alt="" /></p>

Вы можете увидеть кнопку, но ее текущая позиция не в правом верхнем углу окна.
Для правильного позиционирования кнопки, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Оберните элемент `button` в **новый** элемент `panel`.
- В него добавьте атрибут `margin` со значением **40**.
- Добавьте атрибуты `HorizontalAlignment` и `VerticalAlignment` в элемент `button`, как показано ниже:

```xml
<Panel Margin="40">
  <Button Content="Buy Music" 
     HorizontalAlignment="Right" VerticalAlignment="Top" />
</Panel>
```

Вы должны видеть изменения в панели предпросмотра по мере изменения кода.

## Иконка кнопки

Посмотрите еще раз на [изображение готового приложения](./). 

Как вы могли заметить, кнопка отображается иконкой и не имеет текста.
Данная иконка называется `Microsoft Store`, и она является частью коллекции `Fluent Icons`.

Для использования иконки `Microsoft Store`, выполните следующие действия:

- Для получения списка `Fluent Icons`, перейдите на _GitHub_ _Avalonia UI_ по ссылке [https://avaloniaui.github.io/icons.html](https://avaloniaui.github.io/icons.html)
- Используйте поиск по страницу, чтобы найти иконку с именем 'store\_microsoft\_regular'. 
Там должен быть код, похожий на указанный ниже:

```xml
<StreamGeometry x:Key="store_microsoft_regular">M11.5 9.5V13H8V9.5H11.5Z M11.5 17.5V14H8V17.5H11.5Z M16 9.5V13H12.5V9.5H16Z M16 17.5V14H12.5V17.5H16Z M8 6V3.75C8 2.7835 8.7835 2 9.75 2H14.25C15.2165 2 16 2.7835 16 3.75V6H21.25C21.6642 6 22 6.33579 22 6.75V18.25C22 19.7688 20.7688 21 19.25 21H4.75C3.23122 21 2 19.7688 2 18.25V6.75C2 6.33579 2.33579 6 2.75 6H8ZM9.5 3.75V6H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H9.75C9.61193 3.5 9.5 3.61193 9.5 3.75ZM3.5 18.25C3.5 18.9404 4.05964 19.5 4.75 19.5H19.25C19.9404 19.5 20.5 18.9404 20.5 18.25V7.5H3.5V18.25Z</StreamGeometry>
```

- Полностью скопируйте код иконки.
- Нажмите ПКМ по проекту в обозревателе решений _Rider_.
- Нажмите **Add** и выберите **Avalonia Styles**

<p><img className="image-medium-zoom" src={MusicStoreAddStylesScreenshot} alt="" /></p>

- Введите название 'Icons' и нажмите `enter`.
- Найдите и откройте созданный файл **Icons.axaml**. Его XAML будет выглядеть, как показано ниже:

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Design.PreviewWith>
        <Border Padding="20">
            <!-- Add Controls for Previewer Here -->
        </Border>
    </Design.PreviewWith>

    <!-- Add Styles Here -->
</Styles>
```

- Внутри элемента `<Style>`, добавьте элемент `<Style>` с открывающим и закрывающим тегами.
- Вставьте вашу иконку внутрь элемента `<Style.Resources>`.

Файл `Icons` должен выглядеть примерно так:

```xml
<Styles xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Design.PreviewWith>
        <Border Padding="20">
            <!-- Add Controls for Previewer Here -->
        </Border>
    </Design.PreviewWith>

    <!-- Add Styles Here -->
    <Style>
        <Style.Resources>
            <StreamGeometry x:Key="store_microsoft_regular">M11.5 9.5V13H8V9.5H11.5Z M11.5 17.5V14H8V17.5H11.5Z M16 9.5V13H12.5V9.5H16Z M16 17.5V14H12.5V17.5H16Z M8 6V3.75C8 2.7835 8.7835 2 9.75 2H14.25C15.2165 2 16 2.7835 16 3.75V6H21.25C21.6642 6 22 6.33579 22 6.75V18.25C22 19.7688 20.7688 21 19.25 21H4.75C3.23122 21 2 19.7688 2 18.25V6.75C2 6.33579 2.33579 6 2.75 6H8ZM9.5 3.75V6H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H9.75C9.61193 3.5 9.5 3.61193 9.5 3.75ZM3.5 18.25C3.5 18.9404 4.05964 19.5 4.75 19.5H19.25C19.9404 19.5 20.5 18.9404 20.5 18.25V7.5H3.5V18.25Z</StreamGeometry>
        </Style.Resources>
    </Style>
</Styles>
```

Теперь, после подготовки файла с иконками, вы должны включить его в ваше приложение.

Для включения файла иконок, выполните следующие действия:

- Найдите и откройте файл **App.axaml**.
- Добавьте элемент `<StyleInclude>`, как показано ниже:

```xml
<Application.Styles>
    <FluentTheme />
    <StyleInclude Source="avares://Avalonia.MusicStore/Icons.axaml" />
</Application.Styles>
```

Для отображения иконки в предпросмотре, необходимо собрать ваше приложение.

Для изменения содержимого кнопки с текста на иконку, выполните следующие действия:

- Найдите и откройте файл **MainWindow.axaml**.
- Измените XAML кнопки, как показано ниже:

```xml
<Button HorizontalAlignment="Right" VerticalAlignment="Top">       
    <PathIcon Data="{StaticResource store_microsoft_regular}" /> 
</Button>
```

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.

<p><img className="image-medium-zoom" src={MusicStorePrettyButtonScreenshot} alt="" /></p>

На следующей странице вы узнаете, как связать кнопку из `view` с командой во `view model`,
чтобы она могла взаимодействовать с логикой приложения.
