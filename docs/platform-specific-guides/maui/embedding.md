---
id: embedding
title: Embedding Avalonia controls in .NET MAUI
description: Use Avalonia controls inside a native .NET MAUI app on Android, iOS, Mac Catalyst, and Windows with AvaloniaView or a custom handler.
doc-type: how-to
---

In embedding mode, a .NET MAUI app keeps its native handlers, and you add Avalonia controls to its pages. This lets you use an Avalonia control in a native .NET MAUI app, or move an app to Avalonia one page at a time.

There are two ways to embed an Avalonia control:

- **`AvaloniaView`**: put an existing Avalonia control in a .NET MAUI page, with no other code.
- **A custom handler**: make a .NET MAUI control with bindable properties that an Avalonia control draws.

## Supported platforms

`UseAvaloniaEmbedding<TApp>` selects the Avalonia backend for the target framework:

| Target framework | Avalonia backend |
|---|---|
| `net11.0-android` | `Avalonia.Android` |
| `net11.0-ios`, `net11.0-maccatalyst` | `Avalonia.iOS` |
| `net11.0-windows10.0.19041.0` | `Avalonia.WinUI`. The Avalonia content renders in a WinUI 3 `SwapChainPanel`, with input, IME, cursor, and drag-and-drop support. |

The `Avalonia.Controls.Maui` package references these backends, so you do not add them yourself.

## Enable embedding

1. Add the `Avalonia.Controls.Maui` package to the project.

2. In `MauiProgram.cs`, call `UseAvaloniaEmbedding<TApp>`. In a .NET MAUI single-project app, use the generated `AvaloniaApp` class as `TApp`:

   ```csharp
   public static class MauiProgram
   {
       public static MauiApp CreateMauiApp()
       {
           var builder = MauiApp.CreateBuilder();
           builder
               .UseMauiApp<App>()
               .UseAvaloniaEmbedding<AvaloniaApp>();

           return builder.Build();
       }
   }
   ```

   If the app also has the Avalonia `net11.0` or `net11.0-browser` target frameworks, use full hosting for those target frameworks:

   ```csharp
   builder
       .UseMauiApp<App>()
   #if !IOS && !MACCATALYST && !ANDROID && !WINDOWS
       .UseAvaloniaApp()
   #else
       .UseAvaloniaEmbedding<AvaloniaApp>()
   #endif
       ;
   ```

To configure the Avalonia `AppBuilder`, pass a callback:

```csharp
builder.UseAvaloniaEmbedding<AvaloniaApp>(avaloniaBuilder =>
{
    avaloniaBuilder.WithInterFont();
});
```

## Use AvaloniaView

`AvaloniaView` is a .NET MAUI `View` that shows an Avalonia control. Use it when you want to show an existing Avalonia control and do not need .NET MAUI bindings on that control.

1. Create an Avalonia control, or use an existing one. A .NET MAUI project has global `using` directives for .NET MAUI namespaces, so use the full name for Avalonia types that have the same name as a .NET MAUI type, such as `Button` and `Slider`:

   ```csharp
   using Avalonia.Controls;

   namespace MyMauiApp.Controls;

   public class EmbedDemoControl : UserControl
   {
       public EmbedDemoControl()
       {
           Content = new StackPanel
           {
               Spacing = 16,
               Children =
               {
                   new TextBlock { Text = "Hello from Avalonia!", FontSize = 28 },
                   new Avalonia.Controls.Button { Content = "Avalonia Button" },
                   new TextBox { Watermark = "Type something here..." },
                   new Avalonia.Controls.Slider { Minimum = 0, Maximum = 100, Value = 50 },
               },
           };
       }
   }
   ```

2. In the .NET MAUI page, add the XML namespaces for `AvaloniaView` and for your control. Then put the control in an `AvaloniaView`:

   ```xml
   <ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
                xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
                xmlns:avalonia="clr-namespace:Avalonia.Controls.Maui.Controls;assembly=Avalonia.Controls.Maui"
                xmlns:controls="clr-namespace:MyMauiApp.Controls"
                x:Class="MyMauiApp.DemoPage">
       <Grid RowDefinitions="Auto,*" Margin="10">
           <Label Text="A .NET MAUI label above an Avalonia control:" />
           <avalonia:AvaloniaView Grid.Row="1"
                                  HorizontalOptions="Fill"
                                  VerticalOptions="Fill">
               <controls:EmbedDemoControl />
           </avalonia:AvaloniaView>
       </Grid>
   </ContentPage>
   ```

`AvaloniaView` takes part in .NET MAUI layout, so you can set `HorizontalOptions`, `VerticalOptions`, `HeightRequest`, `Margin`, and the other layout properties.

## Use a custom handler

A custom handler makes a .NET MAUI control that an Avalonia control draws. You can use the .NET MAUI control in XAML without `AvaloniaView`, and bind to its properties.

A custom handler has three parts:

1. A .NET MAUI control that defines the bindable properties.
2. An Avalonia control that draws the content.
3. A handler that copies the property values from the .NET MAUI control to the Avalonia control.

### Define the .NET MAUI control

```csharp
namespace MyMauiApp.Views;

public class CounterView : Microsoft.Maui.Controls.View
{
    public static readonly BindableProperty CountProperty =
        BindableProperty.Create(nameof(Count), typeof(int), typeof(CounterView), 0);

    public int Count
    {
        get => (int)GetValue(CountProperty);
        set => SetValue(CountProperty, value);
    }
}
```

### Create the Avalonia control

The Avalonia control has a styled property that matches the .NET MAUI property:

```csharp
using Avalonia;
using Avalonia.Controls;

namespace MyMauiApp.Controls;

public class CounterControl : UserControl
{
    public static readonly StyledProperty<int> CountProperty =
        AvaloniaProperty.Register<CounterControl, int>(nameof(Count));

    private readonly TextBlock _countText = new()
    {
        HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Center,
        FontSize = 24,
    };

    public CounterControl()
    {
        var button = new Avalonia.Controls.Button
        {
            Content = "Increment",
            HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Center,
        };
        button.Click += (_, _) => Count++;

        Content = new StackPanel
        {
            VerticalAlignment = Avalonia.Layout.VerticalAlignment.Center,
            Spacing = 16,
            Children = { _countText, button },
        };

        UpdateText();
    }

    public int Count
    {
        get => GetValue(CountProperty);
        set => SetValue(CountProperty, value);
    }

    protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
    {
        base.OnPropertyChanged(change);

        if (change.Property == CountProperty)
        {
            UpdateText();
        }
    }

    private void UpdateText() => _countText.Text = $"Count: {Count}";
}
```

### Create the handler

Derive the handler from `AvaloniaControlHandler<TVirtualView, TControl>`. Its property mapper calls a method for each property that changes. Chain your mapper from the base mapper, which handles the common view properties:

```csharp
using Avalonia.Controls.Maui.Handlers;
using Microsoft.Maui;
using MyMauiApp.Controls;
using MyMauiApp.Views;

namespace MyMauiApp.Handlers;

public class CounterViewHandler : AvaloniaControlHandler<CounterView, CounterControl>
{
    public static new readonly IPropertyMapper<CounterView, CounterViewHandler> Mapper =
        new PropertyMapper<CounterView, CounterViewHandler>(
            AvaloniaControlHandler<CounterView, CounterControl>.Mapper)
        {
            [nameof(CounterView.Count)] = MapCount,
        };

    public CounterViewHandler() : base(Mapper)
    {
    }

    public static void MapCount(CounterViewHandler handler, CounterView view)
    {
        if (handler.AvaloniaControl is not null)
        {
            handler.AvaloniaControl.Count = view.Count;
        }
    }
}
```

`AvaloniaControl` is the instance of the Avalonia control. `AvaloniaControlHandler` also has these virtual methods:

| Method | Purpose |
|---|---|
| `CreateAvaloniaControl()` | Creates the Avalonia control. The default is `new TControl()`. |
| `OnAvaloniaControlCreated(TControl control)` | Called after the control is created. Use it to subscribe to events. |
| `OnAvaloniaControlDestroying(TControl? control)` | Called before the control is removed. Use it to unsubscribe from events. |

### Register the handler and use the control

Register the handler in `MauiProgram.cs`:

```csharp
builder
    .UseMauiApp<App>()
    .UseAvaloniaEmbedding<AvaloniaApp>()
    .ConfigureMauiHandlers(handlers =>
    {
        handlers.AddHandler<CounterView, CounterViewHandler>();
    });
```

Then use the control in XAML, as you use any .NET MAUI control:

```xml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:views="clr-namespace:MyMauiApp.Views"
             x:Class="MyMauiApp.CounterPage">
    <views:CounterView Count="{Binding Count}" HeightRequest="200" />
</ContentPage>
```

## Choose an approach

| | `AvaloniaView` | Custom handler |
|---|---|---|
| Use when | You show an existing Avalonia control. | You make a reusable .NET MAUI control that Avalonia draws. |
| .NET MAUI bindings | Not on the Avalonia control. | Yes, through bindable properties. |
| XAML | The control is inside `<AvaloniaView>`. | The control is used directly. |
| Code to write | None. | A .NET MAUI control, an Avalonia control, and a handler. |

## See also

- [Custom handlers](/docs/platform-specific-guides/maui/custom-handlers)
- [Configuration](/docs/platform-specific-guides/maui/configuration)
- [.NET MAUI handlers](https://learn.microsoft.com/dotnet/maui/user-interface/handlers/) on Microsoft Learn
