# Defining Properties (рус: Определяющие свойства)

Свойства компонентов UI в Avalonia позволяют раскрывать настраиваемые аспекты ваших пользовательких компонентов, что позволяет настраивать их поведение и внешний вид любому из пользователей означенных компонентов.
В текущем документе будет представлен процесс определения свойств пользовательских компонентов.

## Styled Properties (рус: Стилизованные свойства)

Стилизованные свойства предоставляют мощный и гибкий способ определения свойств компонентов в Avalonia.
Данные свойства разработаны специально для поддержки в Avalonia системы стилей и `data bindong (рус: привязки данных)`.
Стилизованные свойства регистрируются через класс `AvaloniaProperty`.

Стилизованные свойства обладают следующими ключевыми характеристиками в Avalonia:

- **Поддержка стилей**: Они легко указываются и изменяются через стили, путем определения в XAML или программно. Наследование: Поддержка наследования означает, что значение свойств, определенное в родительском компоненте, может автоматически наследоваться его дочерними компонентами, если оно не переопределено явно.

- **Значения по-умолчанию**: Они могут иметь значения по-умолчанию, указанные внутри компонента или через `control templates (рус: шаблоны компонентов)`, что обеспечивает согласованное поведение в разных экземплярах компонента.

- **Приоритет значения свойств**: Они следуют явно определенному порядку приоритета, что позволяет разрешать значения на основе таких факторов, как локальные значения, установщики стилей, триггеры и значения по-умолчанию. Стилизованные свойства Avalonia, обычно используют для управления свойствами, которые предназначены для простой настройки через стили, позволяющие динамически менять внешний вид и поведение в зависимости от различных условий.

- **Проверка и применение**: Стилизованные свойства позволяют компоненту проверять и применять передаваемые ему значения, что гарантирует нахождение компонента только в допустимом состоянии.

## Пример

Ниже указан пример, как определить свойство пользовательского стиля для гипотетического пользовательского компонента типа `Button (рус: кнопка)`:

```csharp
public class MyCustomButton : Button
{
    public static readonly StyledProperty<int> RepeatCountProperty =
        AvaloniaProperty.Register<MyCustomButton, int>(nameof(RepeatCount), defaultValue: 1);

    public int RepeatCount
    {
        get => GetValue(RepeatCountProperty);
        set => SetValue(RepeatCountProperty, value);
    }
}
```

В данном примере, пользовательское свойство определено под именем `RepeatCount`, как целочисленное свойство для компонента `MyCustomButton`.
Система `AvaloniaProperty` регистрирует свойство, что дает ее пользователям доступ к свойству, его изменению, стилизации и привязки данных.
Для удобства также определено CLR-свойство, что позволяет его использовать способом, совместимым со стандартами .NET API.

## Дальнейшее изучение

Подробнее смотрите по [ссылке](../../../../guides/custom-controls/defining-properties.md)
