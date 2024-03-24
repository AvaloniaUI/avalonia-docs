# Styling (рус: Стилизация)

В Avalonia существует два способа стилизации Controls:

- [`Style (рус: Стили)`](../../basics/user-interface/styling) - это CSS-подобные стили.
Они хранятся в коллекции `Styles`, а не `Resources`, как у WPF. 
- [`ControlTheme`](../../basics/user-interface/styling/control-themes) подобны `Style` у WPF, 
и обычно используются при создании тем для Lookless Controls

## Пример

Нижеуказанный код показывает, как использовать CSS-подобный стиль в `UserControl`.

```xml
<UserControl>
    <UserControl.Styles>
        <!-- Make TextBlocks with the h1 style class have a font size of 24 points -->
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
        </Style>
    </UserControl.Styles>
    <TextBlock Classes="h1">Header</TextBlock>
<UserControl>
```

