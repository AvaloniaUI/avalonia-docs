---
title: 图像插值
description: 概念
---

在 Avalonia 中显示图像时，尤其是在将图像缩放到与其原始分辨率不同的尺寸时，渲染质量取决于所使用的插值模式。本指南介绍了如何在 Avalonia 应用程序中控制图像插值。

## 默认行为

自 Avalonia 11 起，默认插值模式设置为 `LowQuality`。此设置优先考虑性能，但在缩放图像时可能会导致图像渲染不够平滑，尤其是在以远小于其原始尺寸的尺寸显示图像时。

## 插值模式

Avalonia 支持多种可应用于图像渲染的位图插值模式：

- `None`: 无插值
- `LowQuality`: 基本插值（默认）
- `MediumQuality`: 平衡插值
- `HighQuality`: 平滑插值，最适合缩小图像

## 设置插值模式

### 单个控件设置

您可以使用 `RenderOptions.BitmapInterpolationMode` 附加属性在单个控件上设置插值模式：

```xml
<Image Source="assets/myimage.png" 
       RenderOptions.BitmapInterpolationMode="HighQuality" />
```

这也可以应用于容器：

```xml
<Border RenderOptions.BitmapInterpolationMode="HighQuality">
    <Image Source="assets/myimage.png" />
</Border>
```

### 常见用例

1.  **图标显示**：当显示被缩小的图标时，使用 `HighQuality` 插值可以防止出现锯齿边缘：
```xml
<Button>
    <Image Source="assets/icon.png" 
           Width="16" 
           Height="16"
           RenderOptions.BitmapInterpolationMode="HighQuality" />
</Button>
```

2.  **图像展示**：对于需要高质量画面的图像展示：
```xml
<ItemsControl RenderOptions.BitmapInterpolationMode="HighQuality">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Image Source="{Binding ImagePath}" />
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## 性能考量

出于性能原因，插值模式是按控件设置的。更高质量的插值需要更多的计算资源，因此请考虑以下准则：

- 对以下情况使用 `HighQuality`：
  - 重要的 UI 元素，如徽标
  - 质量至关重要的缩小图像
  - 照片画廊或以图像为中心的界面

- 对以下情况使用默认的 `LowQuality`：
  - 背景图像
  - 质量不太关键的装饰元素
  - 对性能敏感的应用程序

## 创建全局设置

虽然 Avalonia 没有提供内置的方法来设置全局插值模式，但您可以创建自定义附加属性或行为来在整个应用程序中管理此设置。以下是一个示例方法：

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

然后在您的 XAML 中：

```xml
<Style Selector="Image">
    <Setter Property="(local:GlobalImageOptions.InterpolationMode)"
            Value="HighQuality" />
</Style>
```

## 获得最佳效果的技巧

1.  **素材准备**：
    -   提供适合其预期显示尺寸的适当分辨率的图像
    -   考虑为重要素材包含多种分辨率
    -   尽可能使用矢量格式 (SVG) 以获得与分辨率无关的图形

2.  **布局注意事项**：
    -   注意原始图像尺寸与显示尺寸的关系
    -   使用适当的容器和布局面板来管理图像缩放
    -   考虑将 `UniformToFill` 或 `Uniform` 拉伸模式与高质量插值结合使用

3.  **测试**：
    -   在不同屏幕密度上测试图像渲染
    -   验证在许多图像上使用高质量插值时的性能影响
    -   检查不同插值设置下的内存使用情况
