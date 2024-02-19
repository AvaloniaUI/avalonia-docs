---
id: add-a-control
title: Добавление Control
---

import Highlight from '@site/src/components/Highlight';
import CalculateButton from '/img/get-started/test-drive/calculate-button.png';
import ButtonIntellisenseScreenshot from '/img/get-started/test-drive/button-intellisense.png';

Сейчас ваше основное окно отображает одну единствуенную строку.
В этом разделе вы узнаете, как добавить встроенный в _Avalonia_ элемент управления.

## Button (рус: Кнопка)

Avalonia включает в себя готовый элемент _кнопки_. Для его добавления выполните последовательность, изложенную ниже.

- Остановите приложение, если оно запущено.
- В файле `MainView.axaml` найдите строку
  `<TextBlock Text="text" HorizontalAlignment="Center" VerticalAlignment="Center"/>`
- Удалите ее.
- Добавьте тег 'Button', как показано ниже:
```xml
  <Button>Calculate</Button>
```
<img className="center" src={CalculateButton} alt="" />

:::tip
Если вы используете превьювер (Avalonia Previewer), то кнопка появится на панели сразу, как только измените XAML-файл.
Также вы можете навести курсор и нажать на кнопку, чтобы увидеть как она изменится визульно.
:::

- Запустите приложение и убедитесь, что предварительный просмотр и запущенное приложение, имеют одинаковый вид.

## Атрибуты Control

Avalonia XAML использует атрибуты для изменения вида и поведения элементов. Атрибуты могут изменять свойства, вызывать методы и события.

К примеру, как можно заметить, добавленная вами кнопка находится в левом краю экрана. Это значение ее свойства по-умочанию, для выравнивания по центру горизонтали, выполните следующие действия: 


- Добавьте атрибут в тэг Button:

```xml
<Button HorizontalAlignment="Center">Calculate</Button>
```

:::tip
При использовании IDE, вы можете увидеть подсказки по названию атрибутов элемента при вводе внутри XAML.

<img className="center" src={ButtonIntellisenseScreenshot} alt="" />
:::

Теперь кнопка переместится в центр по горизонтали.

:::info
Детально ознакомиться с элементами управления и их аттрибутами, вы можете в [справочном разделе](../../reference/controls).
:::

На следующей странице мы разберем, как добавить несколько элементов.
