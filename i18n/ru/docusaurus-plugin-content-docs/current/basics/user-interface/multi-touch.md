---
id: multi-touch
title: Multi-Touch
---

Avalonia UI, в отличие от некоторых других фреймворков, не разделяет события касания. Вместо этого он использует систему событий указателя, которая объединяет события мыши, стилуса и прикосновений. Это означает, что вместо того, чтобы иметь отдельные события `TouchEnter` или `TouchLeave`, вы можете использовать события `PointerPressed`, `PointerMoved` и `PointerReleased` для отслеживания сенсорных вводов.


## Использование распознавания жестов

Помимо основных событий касания, Avalonia предоставляет встроенные распознаватели жестов, которые позволяют легко обрабатывать такие распространенные жесты касания, как масштабирование и прокрутка. Вот как их можно использовать:

```xml
<Image Stretch="UniformToFill"
       Margin="5"
       Name="PinchImage"
       Source="/Assets/delicate-arch-896885_640.jpg">
    <Image.GestureRecognizers>
        <PinchGestureRecognizer/>
        <ScrollGestureRecognizer CanHorizontallyScroll="True" CanVerticallyScroll="True"/>
    </Image.GestureRecognizers>
</Image>
```

В этом примере контрол `Image` настроен так, чтобы реагировать на жест масштабирования и прокрутки. `PinchGestureRecognizer` обеспечивает функцию масштабирования, и `ScrollGestureRecognizer` позволяет прокручивать изображение как по горизонтали, так и по вертикали.








