---
id: custom-flyout
title: How to create a custom flyout
description: Create a custom flyout control by extending PopupFlyoutBase in Avalonia.
doc-type: how-to
---

Custom flyouts let you display rich, self-contained UI that appears on demand and is attached to a target control. By deriving from `FlyoutBase`, you can build flyouts that host any content, from simple images to fully interactive forms.

## Creating a basic custom flyout

To create a custom flyout type, derive from FlyoutBase. You'll have to override the abstract method `CreatePresenter()` to specify the presenter the [`Flyout`](/api/avalonia/controls/flyout) should use to display its content. This can be any type of control, but note that this is the root content for the inner popup and should be styled with background, border, corner radius, and similar styling to match other popups. You can still use a normal `FlyoutPresenter` if you wish.

The following example creates a simple `Flyout` that hosts an image.

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

## Showing and closing

You can show a flyout programmatically by calling `ShowAt` and passing the control it should be anchored to. To dismiss it, call `Hide`.

```csharp
// Show the flyout attached to a control
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

- [Custom Controls](index.md)
