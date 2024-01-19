---
id: main-window
title: The Main Window
---

import LayoutZonesDiagram from '/img/gitbook-import/assets/image (25) (2) (1).png';
import MainWindowScreenshot from '/img/get-started/the-main-window/main-window-screenshot.png';
import RunningAppWindowScreenshot from '/img/get-started/the-main-window/runningrapp-window-screenshot.png';
import VsDesignerScreenshot from '/img/get-started/the-main-window/vs-designer-screenshot.png';
import VsPreviewPaneScreenshot from '/img/get-started/the-main-window/image (6) (2).png';

Теперь вы можете приступить к изучению проекта на Avalonia. Для начала, мы изучим основное окно приложения.
Откройте файл **MainWindow.axaml**.

:::info
Обратите внимание, что Avalonia использует XAML-файлы с расширением **.axaml** (а не .xaml).
Название расшифровывается как 'Avalonia XAML', и было введено по техническим причинам.
:::

## Что внутри?

В файле **MainWindow.axaml**, тег `<Window> ... </Window>` обозначает окно.
Как и другие Controls, окно будет отрисовано на целевой платформе с **4 зонами**: Margin, Border, Padding и Content.


<img className="center" src={LayoutZonesDiagram} alt="" />

В текущем приложении, для зоны Content указана ссылка на другое view: **<views:MainView />**.
Оно находится внутри файла MainView.axaml, и является User Control, который будет отображаться у окна внутри зоны **Content**.

## The MainView User Control

Внутри User Control, вы можете увидеть тег `<TextBlock>...</TextBlock>`.
Он представляет собой блок текста, а его свойство `Text`, привязано к свойству **Greeting** класса **MainViewModel**.
Данное свойство было задано в конструкторе класса.

```
<TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
```
Вы можете изменить значение **Greeting** в **MainViewModel**, 
чтобы увидеть, как измениться отображаемый текст в интерфейсе.

<img className="center" src={MainWindowScreenshot} alt="" />
<img className="center" src={RunningAppWindowScreenshot} alt="" />

:::info
Подробную информацию о зонах размемщения, см. [здесь](../../concepts/layout/layout-zones).
:::

## Предварительный просмотр в Visual Studio

Если вы используете Visual Studio, то вы можете открыть окно с кодом XAML и окно предварительного просмотра.
Откройте файл **MainWindow.axaml** и нажмите кнопку **Design View**, она находится в верхней части редактора.

<img className="center" src={VsDesignerScreenshot} alt="" />

:::info
Если вы видете значок красного восклицательного знака и сообщение **The designer is loading...**,
то необходимо собрать проект, прежде чем панель предварительного просмотра сможет что-то отобразить.
:::

- Соберить проект.
- Скрольте панель предварительного просмотра, чтобы увидеть окно и отображаемы текст, в его левом верхнем углу.

<img className="center" src={VsPreviewPaneScreenshot} alt="" />

- Удалите привязку `{Binding Greeting}` и измените текст `<TextBlock Text="my text">...`

Вы увидите, как новый текст в панели предварительного просмотра меняется по мере ввода. Это пример работы предварительного просмотра во время проектирования Avalonia (**design-time preview behaviour**), который поможет вам точно и быстро разработать пользовательский интерфейс.

- Запустите проект, чтобы убедиться, что новый текст также появляется по время выполнения программы.

На следующей странице вы узнаете, как добавить обычную кнопку.
