# RenderTransforms and RenderTransformOrigin

import RenderTransformOriginWpfScreenshot from '/img/get-started/wpf/rendertransformorigin-wpf.png';
import RenderTransformOriginAvaloniaScreenshot from '/img/get-started/wpf/rendertransformorigin-avalonia.png';

RenderTransformOrigins are different in WPF and Avalonia: If you apply a `RenderTransform`, keep in mind that default value for the RenderTransformOrigin in Avalonia is `RelativePoint.Center`. In WPF the default value is `RelativePoint.TopLeft` \(0, 0\). In controls like Viewbox the same code will lead to a different rendering behavior:

**In WPF:**
<img src={RenderTransformOriginWpfScreenshot} alt="WPF" />

**In Avalonia:**
<img src={RenderTransformOriginAvaloniaScreenshot} alt="Avalonia" />

In AvaloniaUI, to get the same scale transform we should indicate that the RenderTransformOrigin is the TopLeft part of the Visual.

<XpfAd/>