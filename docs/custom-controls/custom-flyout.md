---
id: custom-flyout
title: Custom Flyout
description: How to create a custom flyout control by extending FlyoutBase.
doc-type: how-to
---

This example demonstrates how to create a custom `Floyout` control.

Custom flyouts let you display rich, self-contained UI that appears on demand and is attached to a target control. By deriving from `FlyoutBase`, you can build flyouts that host any content, from simple images to fully interactive forms.

## Creating the custom `Flyout` class

1. Add a new C# class to your project deriving from `FlyoutBase`.
2. Override the abstract method `CreatePresenter()`. This allows you to replace the default presenter with whatever control you wish to use to display the content of your custom `Flyout`. For this example, the standard `FlyoutPresenter` is used.
3. Specify the content the presenter should host. In this case, `Image` is chosen.

```csharp
public class MyImageFlyout : FlyoutBase
{
    public static readonly StyledProperty<IImage> ImageProperty = AvaloniaProperty.Register<MyImageFlyout, IImage>(nameof(Image));

    [Content]
    public IImage Image { get; set; }

    protected override Control CreatePresenter()
    {
        // Use FlyoutPresenter as the root content, then add an Image control to show our content
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

## Showing and closing

1. To show the `Flyout`, call `ShowAt` and pass the control to which it should be anchored.
2. To close the `Flyout`, call `Hide`.

```csharp
// Show the flyout and have it anchored to a button
var flyout = new MyImageFlyout { Image = myBitmap };
flyout.ShowAt(targetButton);

// Close programmatically
flyout.Hide();
```

## Handling flyout events

`FlyoutBase` exposes `Opened` and `Closed` events you can subscribe to for reacting to visibility changes.

```csharp
flyout.Opened += (s, e) => { /* flyout is now visible */ };
flyout.Closed += (s, e) => { /* flyout was dismissed */ };
```

## Custom flyout with interactive content

Flyouts are not limited to passive display. You can include buttons, text inputs, and other interactive controls inside the presenter. The following example creates a confirmation flyout that raises an event when the user clicks a button, then automatically closes itself.

```csharp
public class ConfirmFlyout : FlyoutBase
{
    public event EventHandler? Confirmed;

    protected override Control CreatePresenter()
    {
        var confirmButton = new Button { Content = "Confirm" };
        confirmButton.Click += (s, e) =>
        {
            Confirmed?.Invoke(this, EventArgs.Empty);
            Hide();
        };

        return new FlyoutPresenter
        {
            Content = new StackPanel
            {
                Spacing = 8,
                Children =
                {
                    new TextBlock { Text = "Are you sure?" },
                    confirmButton
                }
            }
        };
    }
}
```

## Using in XAML

You can assign custom flyouts directly in XAML using the `Flyout` attached property on controls that support it, such as `Button`. Make sure the XML namespace for your flyout class is declared at the top of the file.

```xml
<Button Content="Show Image">
    <Button.Flyout>
        <local:MyImageFlyout Image="{StaticResource MyImage}" />
    </Button.Flyout>
</Button>
```

## See also

- [Custom Controls](/docs/custom-controls)
