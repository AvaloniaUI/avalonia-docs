# RenderTransforms和RenderTransformOrigin

import RenderTransformOriginWpfScreenshot from '/img/get-started/wpf/rendertransformorigin-wpf.png';
import RenderTransformOriginAvaloniaScreenshot from '/img/get-started/wpf/rendertransformorigin-avalonia.png';

在 WPF 和 Avalonia 中，RenderTransformOrigin 是不同的：如果应用了 `RenderTransform`，需要注意在 Avalonia 中 RenderTransformOrigin 的默认值是 `RelativePoint.Center` \(中心点\)，而在 WPF 中默认值是 `RelativePoint.TopLeft`\(0, 0\)。在像 Viewbox 这样的控件中，相同的代码会导致不同的渲染行为：

**在WPF中：**
<img src={RenderTransformOriginWpfScreenshot} alt="WPF" />

**在Avalonia中：**
<img src={RenderTransformOriginAvaloniaScreenshot} alt="Avalonia" />

在 AvaloniaUI 中，要获得相同的缩放变换，我们应该指定控件的 RenderTransformOrigin 为控件左上角。

