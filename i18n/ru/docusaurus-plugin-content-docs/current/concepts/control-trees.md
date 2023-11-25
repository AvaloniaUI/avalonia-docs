---
описание: КОНЦЕПЦИИ
---

import ControlTreesLogicalScreenshot from '/img/gitbook-import/assets/image (61).png';
import ControlTreesVisualScreenshot from '/img/gitbook-import/assets/image (15) (2).png';
import ControlTreesEventScreenshot from '/img/gitbook-import/assets/image (1) (1) (2).png';

# Деревья элементов

_Avalonia UI_ создаем деревья элементов из XAML-файлов приложения. Они отвечают за вывод элементов интерфейса и управляют их функциональностью.

## Логические деревья

Логические деревья являются иерархическим представлением элементов приложения (включая основное окно), определенных в XAML-файлах.
К примеру, у нас есть окно, а в нем определен некий элемент, внутри которого есть элемент `Кнопка`. Тогда будет построено следующее логическое дерево:

<img src={ControlTreesLogicalScreenshot} alt=""/>

Если ваще приложение запущено, то после нажатия кнопки "F12", появится окно _Avalonia Dev Tools_. В нем можно найти логическое дерево во вкладке **Logical Tree**.

## Визуальное дерево&#x20;

The visual control tree contains everything that is actually being run by _Avalonia UI_. It shows all the properties set on the controls, and all the additional parts that have been added by _Avalonia UI_ in order to present the UI and manage the application functionality. &#x20;

<img src={ControlTreesVisualScreenshot} alt=""/>

Визульное дерево можно увидеть на вкладке **Visual Tree** в окне _Avalonia Dev Tools_.

## События&#x20;

An essential part of application functionality management performed by _Avalonia UI_, is the generation and propagation of events. The **Events** tab logs the source and propagation of events as you move around, and otherwise interact with the running application.

<img src={ControlTreesEventScreenshot} alt=""/>
