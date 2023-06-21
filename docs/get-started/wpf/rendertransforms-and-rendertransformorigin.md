# RenderTransforms and RenderTransformOrigin

RenderTransformOrigins are different in WPF and Avalonia: If you apply a `RenderTransform`, keep in mind that default value for the RenderTransformOrigin in Avalonia is `RelativePoint.Center`. In WPF the default value is `RelativePoint.TopLeft` \(0, 0\). In controls like Viewbox the same code will lead to a different rendering behavior:

**In WPF:** ![WPF](https://files.gitter.im/AvaloniaUI/Avalonia/cDrM/image.png)

**In Avalonia:** ![Avalonia](https://files.gitter.im/AvaloniaUI/Avalonia/KGk7/image.png)

In AvaloniaUI, to get the same scale transform we should indicate that the RenderTransformOrigin is the TopLeft part of the Visual.

