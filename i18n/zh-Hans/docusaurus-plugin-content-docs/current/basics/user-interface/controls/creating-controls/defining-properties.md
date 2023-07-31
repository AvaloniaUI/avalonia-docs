# 定义属性

在Avalonia UI中，控件属性允许您公开自定义控件的可配置方面，使您的控件的用户能够定制其行为和外观。本文档将介绍如何为自定义控件定义属性。

## 样式化属性

Avalonia中的样式化属性为控件提供了一种强大而灵活的定义属性的方式。这些属性专门设计用于支持Avalonia的样式化系统和数据绑定。在Avalonia中，样式化属性通过使用`AvaloniaProperty`类进行注册。

Avalonia的样式化属性具有以下主要特点：

- **样式支持**：可以通过样式和在XAML或编程中定义的setter轻松地进行定位和修改。

- **继承**：支持继承，这意味着在父控件上定义的属性值可以自动继承到其子控件上，除非明确覆盖。

- **默认值**：可以在控件级别或控件模板中指定默认值，确保在多个控件实例中保持一致的行为。

- **属性值优先级**：它们遵循明确定义的优先级顺序，允许根据本地值、样式setter、触发器和默认值等因素解析值。

- **验证和强制转换**：样式化属性允许控件验证和强制转换传递给它的值，确保控件永远不会处于无效状态。

在Avalonia中，样式化属性通常用于控件的属性，这些属性旨在通过样式轻松定制，从而实现基于各种条件的外观和行为的动态变化。

## 示例

以下是如何为假设的自定义按钮控件定义自定义样式化属性的示例：

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

在此示例中，为`MyCustomButton`控件定义了一个名为`RepeatCount`的自定义整数属性。该属性通过`AvaloniaProperty`系统进行注册，使得用户可以访问、修改、应用样式和进行数据绑定。还定义了CLR属性，以方便使用该属性，使其在使用上与标准.NET API一致。

## 进一步阅读

如需更多信息，请参阅[定义属性指南](../../../../guides/custom-controls/defining-properties.md)