---
id: how-to-create-a-custom-flyout
title: How To Create a Custom Flyout
---

# How To Create a Custom Flyout

## Creating Custom Flyouts

To create a custom flyout type, derive from FlyoutBase. You'll have to override the abstract method `CreatePresenter()` to specify the presenter the `Flyout` should use to display its content. This can be any type of control, but note that this is the root content for the inner popup and should be styled with background, border, corner radius, etc. to match other popups. You can still use a normal `FlyoutPresenter` if you wish

The following example creates a simple `Flyout` that hosts an image

```csharp
public class MyImageFlyout : FlyoutBase
{
    public static readonly StyledProperty<IImage> ImageProperty = AvaloniaProperty.Register<MyImageFlyout, IImage>(nameof(Image));

    [Content]
    public IImage Image { get; set; }

    protected override Control CreatePresenter()
    {
        // In this example, we'll use the default FlyoutPresenter as the root content, and add an Image control to show our content
        return new FlyoutPresenter
        {
            Content = new Image
            {
                // Use binding here so the image automatically updates when the property updates
                [!Image.SourceProperty] = this[!ImageProperty]
            }
        };
    }
}
```

##
