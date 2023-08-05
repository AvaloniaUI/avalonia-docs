---
id: flyouts
title: Flyouts
---

## Overview

Flyouts are light dismissible containers that show arbitrary UI content. Flyouts are not controls and can be declared as a resource and shared between multiple elements within your app.

## FlyoutBase

`FlyoutBase` is the base class for all flyout implementations.

## Common Properties for all Flyouts

| Property | Description |
| :--- | :--- |
| `IsOpen` | Gets whether the Flyout is currently open. |
| `Placement` | Gets or sets where the Flyout opens relative to its target |
| `ShowMode` | Gets or sets the desired show mode of the Flyout, which determines if it is a transient (no focus) UI or not |
| `Target` | Gets the target the Flyout is currently assigned to |

## Common Methods for all Flyouts

| Property | Description |
| :--- | :--- |
| `ShowAt(Control)` | Shows the Flyout at the specified target |
| `ShowAt(Control, bool)` | Shows the Flyout at the specified target, but places it at the current pointer position |
| `Hide` | Hides the Flyout |

## Reference

[FlyoutBase](http://reference.avaloniaui.net/api/Avalonia.Controls/FlyoutBase/)

## Source code

[FlyoutBase.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/FlyoutBase.cs)

[FlyoutShowMode.cs (enum)](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/FlyoutShowMode.cs)

[FlyoutPlacementMode.cs (enum)](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/FlyoutPlacementMode.cs)

## Flyout Types

There are two built-in types of Flyouts: `Flyout` and `MenuFlyout`. A regular `Flyout` has no special logic and is just a simple container for any arbitrary UI content.

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/flyouts/flyoutpreview.png" alt="Basic Flyout" />
  </div>

`MenuFlyout`, as the name implies, creates a Menu.

  <div style={{textAlign: 'center'}}>
    <img src="/img/controls/flyouts/menuflyoutpreview.png" alt="Basic MenuFlyout" />
  </div>

## Reference

[Flyout](http://reference.avaloniaui.net/api/Avalonia.Controls/Flyout/)

[MenuFlyout](http://reference.avaloniaui.net/api/Avalonia.Controls/MenuFlyout/)

## Source code

[Flyout.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/Flyout.cs)

[MenuFlyout.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Flyouts/MenuFlyout.cs)

## Creating Flyouts

In order to be shown Flyouts have to be attached to a specific control, though this is not a static assignment and can be changed at runtime. `Button` has a `Flyout` property that can be used to open a Flyout upon click.

```markup
<Button Content="Click me">
    <Button.Flyout>
        <Flyout>
            <TextBlock Text="Flyout Content!" />
        </Flyout>
    </Button.Flyout>
</Button>
```

### Attached Flyouts

For other controls that don't have built-in support for flyouts, one can be assigned using attached flyouts

```markup
<Border Background="Red" PointerPressed="Border_PointerPressed">
    <FlyoutBase.AttachedFlyout>
        <Flyout>
            <TextBlock Text="AttachedFlyout Content!" />
        </Flyout>
    </FlyoutBase.AttachedFlyout>
</Border>
```

Attached Flyouts can be shown by calling the `ShowAttachedFlyout` method

```csharp
public void Border_PointerPressed(object sender, RoutedEventArgs args)
{
    FlyoutBase.ShowAttachedFlyout(sender as Control);
}
```

### Context Flyouts

Controls can also utilize Context Flyouts, which is an alternative/replacement to `ContextMenu`s that provides a sharable, richer UI experience than simple context menus. NOTE: A control cannot have both a `ContextFlyout` and `ContextMenu` at the same time.

ContextFlyouts are invoked automatically like normal `ContextMenu`s. Although custom behaviors and logic an be implemented by invoking it manually (like any other flyout: `ContextFlyout.ShowAt(Control)`) or responding to the `ContextRequested` event

## Sharing Flyouts

As previously mentioned, Flyouts can be shared between various elements within your app.

```markup
<Window.Resources>
    <Flyout x:Key="MySharedFlyout">
        <!-- Flyout content here -->
    </Flyout>
</Window.Resources>

<Button Content="Click me!" Flyout="{StaticResource MySharedFlyout}" />

<Button Content="Now click me!" Flyout="{StaticResource MySharedFlyout}" />
```

## Styling Flyouts

Although `Flyout`s are not controls themselves, their general appearance can still be customized by targeting the presenter the `Flyout` uses to display its content. For a normal `Flyout` this is `FlyoutPresenter` and for `MenuFlyout` this is `MenuFlyoutPresenter`. Because flyout presenters are not exposed, special style classes that should pertain to specific flyouts can be passed using the `FlyoutPresenterClasses` property on `FlyoutBase`

```markup
<Style Selector="FlyoutPresenter.mySpecialClass">
    <Setter Property="Background" Value="Red" />
</Style>

<Flyout FlyoutPresenterClasses="mySpecialClass">
    <!-- Flyout content here -->
</Flyout>
```

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