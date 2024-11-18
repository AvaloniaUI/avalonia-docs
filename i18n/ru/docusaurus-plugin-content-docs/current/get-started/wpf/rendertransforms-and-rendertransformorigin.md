# RenderTransforms и RenderTransformOrigin

import RenderTransformOriginWpfScreenshot from '/img/get-started/wpf/rendertransformorigin-wpf.png';
import RenderTransformOriginAvaloniaScreenshot from '/img/get-started/wpf/rendertransformorigin-avalonia.png';

RenderTransformOrigins отличается в WPF и Avalonia:

|          | RenderTransformOrigin (по-умолчанию) |
|----------|--------------------------------------|
| Avalonia | `RelativePoint.Center`               |
| WPF      | `RelativePoint.TopLeft` \(0, 0\)     |


- Один и тот же код в Controls типа ViewBox, отобразится следующим образом:

**WPF:**
<img src={RenderTransformOriginWpfScreenshot} alt="WPF" />

**Avalonia:**
<img src={RenderTransformOriginAvaloniaScreenshot} alt="Avalonia" />

Чтобы получить в Avalonia такое же преобразование, мы должны указать, что RenderTransformOrigin относится к левой верхней части отображения.
