---
id: custom-flyout
title: Custom Flyout
description: How to create a custom flyout control by extending PopupFlyoutBase.
doc-type: how-to
---

import CustomFlyoutDemo from '/img/custom-controls/custom-flyout-demo.gif';

This example demonstrates how to create a custom `Flyout` control deriving from `PopupFlyoutBase`. Custom flyouts display a versatile, self-contained UI that appears on demand and is attached to a target control of your choice. A custom flyout can host almost any content, from images to interactive forms.

<Image light={CustomFlyoutDemo} alt="A minimal app in which a button labeled 'Show image' is clicked and displays a simple bitmap image." position="center" maxWidth={400} cornerRadius="true"/>

## Creating a custom `Flyout` class

1. Add a new C# class to your project deriving from [`PopupFlyoutBase`](/api/avalonia/controls/primitives/popupflyoutbase).
2. Override the abstract method `CreatePresenter()`. This allows you to replace the default presenter with whatever control you wish to use to display the content of your custom `Flyout`. For this example, the standard `FlyoutPresenter` is used.
3. Specify the content the presenter should host. In this case, `Image` is chosen.

```csharp title="MyImageFlyout.cs"
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;
using Avalonia.Media;
using Avalonia.Metadata;

namespace CustomFlyoutDemo;

public class MyImageFlyout : PopupFlyoutBase
{
    public static readonly StyledProperty<IImage> ImageProperty =
        AvaloniaProperty.Register<MyImageFlyout, IImage>(nameof(Image));
    
    [Content]
    public IImage Image
    {
        get => GetValue(ImageProperty);
        set => SetValue(ImageProperty, value);
    }

    protected override Control CreatePresenter()
    {
        return new FlyoutPresenter
        {
            Content = new Image
            {
                Width = 240,
                Height = 160,
                [!Avalonia.Controls.Image.SourceProperty] = this[!ImageProperty]
            }
        };
    }
}
```

:::caution
`PopupFlyoutBase` is the base class that provides the popup behavior and the `CreatePresenter()` method. It is the same base used by Avalonia's built-in [`Flyout` control](/controls/layout/containers/flyout).

**Do not** use `FlyoutBase`. This is an abstract class and will block compilation if you derive from it.
:::

## Showing and dismissing

- To show the `Flyout`: Call `ShowAt` and pass the control to which it should be anchored.
- To dismiss the `Flyout`: Call `Hide`.

```csharp
// Show the flyout programmatically and have it anchored to a button
var flyout = new MyImageFlyout { Image = MyPicture };
flyout.ShowAt(targetButton);

// Dismiss the flyout programmatically
flyout.Hide();
```

## Handling events

The base class, `PopupFlyoutBase`, exposes `Opened` and `Closed` events. You can subscribe to these events to react to visibility changes.

```csharp
flyout.Opened += (s, e) => { /* flyout is now visible */ };
flyout.Closed += (s, e) => { /* flyout was dismissed */ };
```

For more information on routed events, see [Events overview](/docs/events).

## Using in XAML

1. Declare the XML namespace for your custom flyout class at the top of the file.
2. Assign the custom flyout (`MyImageFlyout`) as an attached property on a control that supports it, such as `Button`.
3. Specify the content of the custom flyout. In this example, `MyPicture` is a static resource defined in `Application.Resources`.

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:local="using:MinimalFlyoutDemo"
        x:Class="MinimalFlyoutDemo.MainWindow">
    
    <Button Content="Show image"
            HorizontalAlignment="Center"
            VerticalAlignment="Center">
        <Button.Flyout>
            <local:MyImageFlyout Image="{StaticResource MyPicture}" />
        </Button.Flyout>
    </Button>
    
</Window>
```

For more information on using resources, see [Resources overview](/docs/app-development/resources).

## Displaying interactive content

Flyouts are not limited to passive display. You can include buttons, text input, and other interactive controls inside the presenter.

The following example is a more advanced custom `Flyout`. This is a confirmation flyout that displays a "Confirm" button and raises a `Confirmed` event when the user clicks the button.

```csharp
public class ConfirmFlyout : PopupFlyoutBase
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

## See also

- [Flyout](/controls/layout/containers/flyout): Reference for the built-in flyout control.
- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to your flyout class.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to your flyout class.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types.
