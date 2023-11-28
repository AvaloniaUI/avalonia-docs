---
id: add-some-layout
title: Добавление Нескольких Элементов
---

import StackPanelDiagram from '/img/get-started/add-some-layout/image (40) (1) (1).png';
import StackPanelSampleScreenshot from '/img/get-started/add-some-layout/image (41) (1).png';

Avalonia содержит встроенные элементы. На это страницу вы увидите некоторые из них, а также как их использовать.

Сейчас, на вашем экране одна единственная кнопка.

Avalonia позволяет добавлять **только один** элемент внутри содержимого окна. Для добавления нескольких элементов, следует исользовать встроенные элементы компоновки, допускающие использование нескольких дочерних элементов.

## Stack Panel

Данный элемент размещает дочерние элементы последовательно по вертикали.

<img className="center" src={StackPanelDiagram} alt="" />

```xml
<StackPanel>
    <TextBlock>1</TextBlock>
    <TextBlock>2</TextBlock>
</StackPanel>
```

## Text Block

Блок текста позволяет производить любые манипуляции с содержащимся в нем тексте.

```xml
<StackPanel>
    <Border Margin="5" 
      CornerRadius="10"
      Background="LightBlue">
      <TextBlock Margin="5"
         FontSize="24" 
         HorizontalAlignment="Center"
         Text="Temperature Converter">
      </TextBlock>
    </Border>
    <StackPanel>
    </StackPanel>    
    <Button HorizontalAlignment="Center">Calculate</Button>
  </StackPanel>
```

<img className="center" src={StackPanelSampleScreenshot} alt="" />

:::info
Для ознакомления с другими элементами компоновки, перейдите по [ссылке](../../reference/controls/layout-controls.md).
:::

Не следующей страницу, вы добавить элементы ввода по центру окна.
