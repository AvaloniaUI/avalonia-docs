---
description: TUTORIALS - Music Store App
---

import MusicStoreDarkModePreviewScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/dark-mode-preview.png';
import MusicStoreAcrylicMaterialScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/acrylic-material.png';
import MusicStoreFullAcrylicWindowScreenshot from '/img/tutorials/music-store-app/creating-a-modern-looking-window/full-acrylic-window.png';

# Стилизация окна

На следующей страницу вы узнаете, как добавить современный темный фон с акриловым размытием.

На этой странице вы измените вид основного окна на современное,
путем добавления темной темы и акрилового размытия.

## Темная тема

Для окраса основного окна в темную тему, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите и откройте файл **App.axaml**.
- В нем, у элемента `<Application>`,
поменяйте атрибут `RequestedThemeVariant` со значения "Default" на "Dark".

```xml
<Application ...
    RequestedThemeVariant="Dark">
```

- В папке **/Views**, найдите и откройте файл **MainWindow.axaml**.

Обратите внимание, что панель предпросмотра по-прежнему отображает окно со светлой темой.
Для исправления данной ситуации, необходимо пересобрать проект.

- В меню **Build** нажмите **Build Startup Project**.

Панель предпросмотра должна измениться на темную.

<p><img className="image-medium-zoom" src={MusicStoreDarkModePreviewScreenshot} alt="" /></p>

## Acrylic Blur (рус: Акриловое размытие)

Для задания фону акрилового размытия, выполните следующие действия:

- В папке **/Views** найдите и откройте файл **MainWindow.axaml**.
- Найдите окончания открывающего тега `<Window>`.
- После атрибута `Title="Avalonia.MusicStore"`, добавьте два новых, как показано ниже:

```xml
<Window ...
        Title="Avalonia.MusicStore"

        TransparencyLevelHint="AcrylicBlur"
        Background="Transparent">
```

- Для применения акрилового эффекта на все окно, замените элемент `<TextBlock>` в зоне содержимого
основного окна, как показано ниже:

```xml
<Window ... >
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
       </Panel>
   </Window>
```

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.


<p><img className="image-medium-zoom" src={MusicStoreAcrylicMaterialScreenshot} alt="" /></p>

Обратите внимание, что хоть акриловый эффект и распространился на всю зону содержимого основного окна,
но он не влияет на строку заголовка.

:::warning
На _Linux_, в силу ограничений версии X11, данный эффект не будет работать частично или полностью, но в остальном приложение будет работать корректно.
:::

Для применения акрилового эффекта на строку заголовка, выполните следующие действия:

- Остановите приложение, если оно запущено.
- Найдите окончания открывающего тега `<Window>`.
- Добавьте атрибут `ExtendClientAreaToDecorationsHint`, как показано ниже

```xml
   <Window ...
           TransparencyLevelHint="AcrylicBlur"
           Background="Transparent"

           ExtendClientAreaToDecorationsHint="True">
```

- Нажмите кнопку **Debug** в правом верхнем углу IDE, чтобы собрать и запустить проект.

<p><img className="image-medium-zoom" src={MusicStoreFullAcrylicWindowScreenshot} alt="" /></p>

Теперь эффект акрилового размытия распространяется и на строку заголовка.
На следующей странице вы узнаете, как добавить и расположить компоненты UI в окне.