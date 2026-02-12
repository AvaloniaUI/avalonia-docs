---
id: image-interpolation
title: Image Interpolation
---

When displaying images in Avalonia, particularly when scaling them to sizes different from their native resolution, the quality of the rendering depends on the interpolation mode being used. This guide explains how to control image interpolation in your Avalonia applications.

## Default Behavior

As of Avalonia 11, the default interpolation mode is set to `LowQuality`. This setting prioritizes performance but may result in less smooth image rendering when scaling images, particularly when displaying them at sizes significantly smaller than their original dimensions.

## Interpolation Modes

Avalonia supports several bitmap interpolation modes that can be applied to image rendering:

- `None`: No interpolation
- `LowQuality`: Basic interpolation (default)
- `MediumQuality`: Balanced interpolation
- `HighQuality`: Smooth interpolation, best for downsizing images

## Setting the Interpolation Mode

### Per-Control Setting

You can set the interpolation mode on individual controls using the `RenderOptions.BitmapInterpolationMode` attached property:

```xml
<Image Source="assets/myimage.png" 
       RenderOptions.BitmapInterpolationMode="HighQuality" />
```

This can also be applied to containers:

```xml
<Border RenderOptions.BitmapInterpolationMode="HighQuality">
    <Image Source="assets/myimage.png" />
</Border>
```

### Common Use Cases

1. **Icon Display**: When displaying icons that are being scaled down, using `HighQuality` interpolation can prevent jagged edges:
```xml
<Button>
    <Image Source="assets/icon.png" 
           Width="16" 
           Height="16"
           RenderOptions.BitmapInterpolationMode="HighQuality" />
</Button>
```

2. **Image Galleries**: For image galleries where quality is important:
```xml
<ItemsControl RenderOptions.BitmapInterpolationMode="HighQuality">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Image Source="{Binding ImagePath}" />
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## Performance Considerations

The interpolation mode is set per-control by design for performance reasons. Higher quality interpolation requires more computational resources, so consider these guidelines:

- Use `HighQuality` for:
  - Important UI elements like logos
  - Scaled-down images where quality is crucial
  - Photo galleries or image-focused interfaces
  
- Use default `LowQuality` for:
  - Background images
  - Decorative elements where quality is less critical
  - Performance-sensitive applications

## Creating a Global Setting

While Avalonia doesn't provide a built-in way to set a global interpolation mode, you can create a custom attached property or behavior to manage this across your application. Here's an example approach:

```csharp
public static class GlobalImageOptions
{
    public static readonly AttachedProperty<BitmapInterpolationMode> InterpolationModeProperty =
        AvaloniaProperty.RegisterAttached<Image, BitmapInterpolationMode>(
            "InterpolationMode",
            typeof(GlobalImageOptions),
            defaultValue: BitmapInterpolationMode.HighQuality);

    public static void SetInterpolationMode(Image image, BitmapInterpolationMode value)
    {
        image.SetValue(RenderOptions.BitmapInterpolationModeProperty, value);
    }
}
```

Then in your XAML:

```xml
<Style Selector="Image">
    <Setter Property="(local:GlobalImageOptions.InterpolationMode)"
            Value="HighQuality" />
</Style>
```

## Tips for Best Results

1. **Asset Preparation**:
   - Provide images at appropriate resolutions for their intended display size
   - Consider including multiple resolutions for important assets
   - Use vector formats (SVG) when possible for resolution-independent graphics

2. **Layout Considerations**:
   - Be mindful of the original image dimensions versus display size
   - Use appropriate containers and layout panels to manage image scaling
   - Consider using `UniformToFill` or `Uniform` stretch modes with high-quality interpolation

3. **Testing**:
   - Test image rendering on different screen densities
   - Verify performance impact when using high-quality interpolation on many images
   - Check memory usage with different interpolation settings
