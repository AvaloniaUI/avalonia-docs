---
id: create-a-custom-panel
title: 如何创建自定义面板
---

# 如何创建自定义面板

这个例子展示了如何覆盖`Panel`元素的默认布局行为，并创建从`Panel`派生的自定义布局元素。

该例子定义了一个简单的自定义`Panel`元素，称为`PlotPanel`，它根据两个硬编码的x和y坐标来定位子元素。在这个例子中，`x`和`y`都设置为`50`，因此所有子元素都被定位在x和y轴上的该位置。

为了实现自定义的`Panel`行为，该例子使用了`MeasureOverride`和`ArrangeOverride`方法。每个方法返回必要的`Size`数据来定位和渲染子元素。

```csharp
public class PlotPanel : Panel
{
    // 重写Panel的默认Measure方法
    protected override Size MeasureOverride(Size availableSize)
    {
        var panelDesiredSize = new Size();

        // 在我们的例子中，这里只有一个子元素。
        // 声明我们的面板只需要其唯一子元素的大小。
        foreach (var child in Children)
        {
            child.Measure(availableSize);
            panelDesiredSize = child.DesiredSize;
        }

        return panelDesiredSize;
    }

    protected override Size ArrangeOverride(Size finalSize)
    {
        foreach (var child in Children)
        {
            double x = 50;
            double y = 50;

            child.Arrange(new Rect(new Point(x, y), child.DesiredSize));
        }
        
        return finalSize; // 返回最终排列的大小
    }
}
```
