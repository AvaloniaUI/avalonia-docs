# RenderTransforms и RenderTransformOrigin

RenderTransformOrigins отличается в WPF и Avalonia:

|          | RenderTransformOrigin (по-умолчанию) |
|----------|--------------------------------------|
| Avalonia | `RelativePoint.Center`               |
| WPF      | `RelativePoint.TopLeft` \(0, 0\)     |


- Один и тот же код в Controls типа ViewBox, отобразится следующим образом:

**WPF:** ![WPF](https://files.gitter.im/AvaloniaUI/Avalonia/cDrM/image.png)

**Avalonia:** ![Avalonia](https://files.gitter.im/AvaloniaUI/Avalonia/KGk7/image.png)

Чтобы получить в Avalonia такое же преобразование, мы должны указать, что RenderTransformOrigin относится к левой верхней части отображения.
