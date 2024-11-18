---
id: how-to-create-a-custom-flyout
title: 如何创建自定义弹出窗口
---

# 如何创建自定义弹出窗口

## 创建自定义弹出窗口

要创建自定义的弹出窗口类型，需要从FlyoutBase派生。您需要重写抽象方法`CreatePresenter()`来指定`Flyout`应该使用哪个Presenter来显示其内容。这可以是任何类型的控件，但请注意，这是内部弹出窗口的根内容，应该使用背景、边框、圆角等样式来匹配其他弹出窗口。如果希望，仍然可以使用普通的`FlyoutPresenter`。

以下示例创建了一个简单的`Flyout`，其中包含一个图像。

```csharp
public class MyImageFlyout : FlyoutBase
{
    public static readonly StyledProperty<IImage> ImageProperty = AvaloniaProperty.Register<MyImageFlyout, IImage>(nameof(Image));

    [Content]
    public IImage Image { get; set; }

    protected override Control CreatePresenter()
    {
        // 在这个示例中，我们将使用默认的FlyoutPresenter作为根内容，并添加一个图像控件来显示我们的内容
        return new FlyoutPresenter
        {
            Content = new Image
            {
                // 在这里使用绑定，这样当属性更新时，图像会自动更新
                [!Image.SourceProperty] = this[!ImageProperty]
            }
        };
    }
}
```

##
