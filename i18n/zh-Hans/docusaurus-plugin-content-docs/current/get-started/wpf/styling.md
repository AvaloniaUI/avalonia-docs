# 样式（Styling）

Avalonia与其他XAML框架最明显的不同之一在于其样式系统。在Avalonia中，有两种方法可以为控件设置样式：

- [`Style`](../../basics/user-interface/styling) 是一种类似CSS的样式。样式不像在WPF中存储在`Resources`集合中，而是存储在一个独立的`Styles`集合中。
- [`ControlTheme`](../../basics/user-interface/styling/control-themes) 类似于WPF的`Style`，通常用于为无外观的控件创建主题。

## 示例

以下代码显示了一个`UserControl`，其中定义了自己的CSS样式。

```xml
<UserControl>
    <UserControl.Styles>
        <!-- 让带有 h1 样式类的 TextBlock 具有 24 点的字体大小 -->
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
        </Style>
    </UserControl.Styles>
    <TextBlock Classes="h1">Header</TextBlock>
<UserControl>
```

