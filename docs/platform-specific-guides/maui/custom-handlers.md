---
id: custom-handlers
title: Custom handlers for Avalonia.Controls.Maui
description: Write an Avalonia handler for your own .NET MAUI control, replace a built-in handler, or change a handler mapping in Avalonia.Controls.Maui.
doc-type: how-to
---

A .NET MAUI handler maps a cross-platform control, called the virtual view, to the control that draws it, called the platform view. In full hosting mode, the platform view of every handler is an Avalonia control.

This page shows how to write a handler for your own control, how to replace a built-in handler, and how to change one property mapping of a built-in handler. For handlers in a native .NET MAUI app that uses embedding mode, see [Use a custom handler](/docs/platform-specific-guides/maui/embedding#use-a-custom-handler).

## Create a handler

The handler in this example draws a `RatingView` control as an Avalonia `StackPanel`. The virtual view is a .NET MAUI control with bindable properties:

```csharp
namespace MyMauiApp.Views;

public class RatingView : Microsoft.Maui.Controls.View
{
    public static readonly BindableProperty ValueProperty =
        BindableProperty.Create(nameof(Value), typeof(int), typeof(RatingView), 0);

    public static readonly BindableProperty MaximumProperty =
        BindableProperty.Create(nameof(Maximum), typeof(int), typeof(RatingView), 5);

    public int Value
    {
        get => (int)GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }

    public int Maximum
    {
        get => (int)GetValue(MaximumProperty);
        set => SetValue(MaximumProperty, value);
    }
}
```

The handler derives from `ViewHandler<TVirtualView, TPlatformView>` in the `Avalonia.Controls.Maui.Handlers` namespace. Its property mapper calls a static method when a property of the virtual view changes. The method reads the virtual view and updates `handler.PlatformView`:

```csharp
using Avalonia.Controls;
using Avalonia.Controls.Maui.Handlers;
using Microsoft.Maui;
using MyMauiApp.Views;

namespace MyMauiApp.Handlers;

public class RatingViewHandler : ViewHandler<RatingView, StackPanel>
{
    public static IPropertyMapper<RatingView, RatingViewHandler> Mapper =
        new PropertyMapper<RatingView, RatingViewHandler>(ViewHandler.ViewMapper)
        {
            [nameof(RatingView.Value)] = MapStars,
            [nameof(RatingView.Maximum)] = MapStars,
        };

    public RatingViewHandler() : base(Mapper)
    {
    }

    protected override StackPanel CreatePlatformView() => new StackPanel
    {
        Orientation = Avalonia.Layout.Orientation.Horizontal,
        Spacing = 4,
    };

    private static void MapStars(RatingViewHandler handler, RatingView view)
    {
        handler.PlatformView.Children.Clear();
        for (var i = 1; i <= view.Maximum; i++)
        {
            handler.PlatformView.Children.Add(new TextBlock
            {
                Text = i <= view.Value ? "★" : "☆",
                FontSize = 24,
            });
        }
    }
}
```

:::caution
Do not derive from `ViewHandler<TVirtualView, TPlatformView>` in the `Microsoft.Maui.Handlers` namespace. On the `net11.0` and `net11.0-browser` target frameworks, .NET MAUI uses its portable build. In that build, the .NET MAUI base class gives a size of zero, does not arrange the platform view, and ignores view properties such as `Margin`, `IsVisible`, and `Opacity`, so the control does not appear. The build shows warning `ACMSG004` for such a handler.

The `Avalonia.Controls.Maui.Handlers` base class measures and arranges the Avalonia control, and maps the common view properties to it.
:::

## Register a handler

Register the handler with `ConfigureMauiHandlers`, after `UseAvaloniaApp`:

```csharp
builder
    .UseMauiApp<App>()
    .UseAvaloniaApp()
    .ConfigureMauiHandlers(handlers =>
    {
        handlers.AddHandler<RatingView, RatingViewHandler>();
    });
```

If the app also has native .NET MAUI target frameworks, register the handler for the Avalonia target frameworks only, and register a native handler for the others.

## Replace a built-in handler

To replace the Avalonia handler of a built-in .NET MAUI control, register your own handler for that control type. A registration that you make after `UseAvaloniaApp` replaces the default registration:

```csharp
builder
    .UseMauiApp<App>()
    .UseAvaloniaApp()
    .ConfigureMauiHandlers(handlers =>
    {
        handlers.AddHandler<Microsoft.Maui.Controls.Button, MyButtonHandler>();
    });
```

## Change a handler mapping

To change only part of a built-in handler, add to its property mapper with `AppendToMapping`. The Avalonia handlers are in the `Avalonia.Controls.Maui.Handlers` namespace, and their `PlatformView` is the Avalonia control.

This example, from the [MauiConverter sample](https://github.com/AvaloniaUI/avalonia-maui-samples/tree/main/Apps/MauiConverter), makes the Avalonia window a fixed size:

```csharp
builder
    .UseMauiApp<App>()
#if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
    .UseAvaloniaApp()
#endif
    .ConfigureMauiHandlers(handlers =>
    {
#if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
        Avalonia.Controls.Maui.Handlers.WindowHandler.Mapper.AppendToMapping(
            "DisableMinMaxButtons", (handler, view) =>
            {
                if (handler.PlatformView is Avalonia.Controls.Window avaloniaWindow)
                {
                    avaloniaWindow.CanMinimize = false;
                    avaloniaWindow.CanMaximize = false;
                    avaloniaWindow.CanResize = false;
                }
            });
#endif
    });
```

With a single-view lifetime, such as in the browser, the `Window` handler is `SingleViewWindowHandler`, and the platform view is not an Avalonia `Window`. The `is` check in this example makes sure that the code runs only when there is a window.

## See also

- [Embedding Avalonia controls](/docs/platform-specific-guides/maui/embedding)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [Create a custom control with handlers](https://learn.microsoft.com/dotnet/maui/user-interface/handlers/create) on Microsoft Learn
- [Customize controls with handlers](https://learn.microsoft.com/dotnet/maui/user-interface/handlers/customize) on Microsoft Learn
