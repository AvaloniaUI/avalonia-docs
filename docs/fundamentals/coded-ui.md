---
id: coded-ui
title: Code-only UI
description: Build Avalonia applications entirely in C# or F# without XAML files.
doc-type: explanation
---

Avalonia does not require XAML. You can build entire applications using only C#, F#, or any .NET language. Every control, layout, style, binding, and animation that you can express in XAML has an equivalent API in code.

This works because Avalonia XAML is ultimately compiled down to IL (Intermediate Language), the same IL that C# and every other .NET language compiles to. XAML is one way to represent an object graph. If you prefer to construct that same object graph directly in C#,F# or another .NET language, that is entirely possible.

## When to choose code-only

Choosing between XAML and code-only is a matter of personal preference. Both produce the same runtime result, and you can mix them freely within a single application.

That said, you should be aware of the practical trade-offs. Avalonia is inspired by WPF, and the vast majority of resources, tutorials, community answers, and developer experience assumes XAML. If you choose a code-only approach:

- Most examples you find online will be written in XAML. You will need to translate those snippets into your language of choice.
- The community of developers working without XAML is smaller, so finding help with code-specific patterns may take more effort.
- Tools like the XAML previewer and design-time data are built around XAML workflows.

Code-only development is entirely workable, but it is not the path of least resistance when it comes to using the existing ecosystem of knowledge and resources.

## Bootstrapping a code-only application

A code-only Avalonia application needs no `.axaml` files at all. The simplest approach uses `AppBuilder` with a manual startup delegate:

```csharp title='Program.cs'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Themes.Fluent;

class Program
{
    public static void Main(string[] args)
    {
        AppBuilder.Configure<Application>()
                  .UsePlatformDetect()
                  .Start(AppMain, args);
    }

    static void AppMain(Application app, string[] args)
    {
        app.Styles.Add(new FluentTheme());

        var window = new Window
        {
            Title = "Hello from Code",
            Width = 400,
            Height = 300,
            Content = new TextBlock
            {
                Text = "No XAML here.",
                FontSize = 24,
                HorizontalAlignment = Avalonia.Layout.HorizontalAlignment.Center,
                VerticalAlignment = Avalonia.Layout.VerticalAlignment.Center,
            }
        };

        window.Show();
        app.Run(window);
    }
}
```

The project file is equally minimal:

```xml title='MyApp.csproj'
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <OutputType>Exe</OutputType>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Avalonia" Version="12.0.0" />
    <PackageReference Include="Avalonia.Desktop" Version="12.0.0" />
    <PackageReference Include="Avalonia.Themes.Fluent" Version="12.0.0" />
  </ItemGroup>
</Project>
```

That is all you need. No `App.axaml`, no `MainWindow.axaml`, no generated code.

### Using application lifetimes

For applications that need more control over window management (for example, multi-window apps that should exit when the last window closes), use `ClassicDesktopStyleApplicationLifetime` instead of the simple `Start` delegate:

```csharp title='Program.cs'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Themes.Fluent;

class Program
{
    public static void Main(string[] args)
    {
        var lifetime = new ClassicDesktopStyleApplicationLifetime
        {
            Args = args,
            ShutdownMode = ShutdownMode.OnLastWindowClose,
        };

        AppBuilder.Configure<Application>()
            .UsePlatformDetect()
            .AfterSetup(builder => builder.Instance?.Styles.Add(new FluentTheme()))
            .SetupWithLifetime(lifetime);

        lifetime.MainWindow = new MainAppWindow();
        lifetime.Start(args);
    }
}
```

:::info
For full details on lifetime options, see [Application lifetimes](/docs/fundamentals/application-lifetimes).
:::

## Creating controls

Every Avalonia control can be instantiated and configured directly in code. C# object initializers map naturally to XAML property attributes:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="csharp" label="C# Code" default>

```csharp
var button = new Button
{
    Content = "Click Me",
    FontSize = 18,
    HorizontalAlignment = HorizontalAlignment.Center,
    Background = Brushes.SteelBlue,
    Foreground = Brushes.White,
};
```

</TabItem>
<TabItem value="xaml" label="XAML Equivalent">

```xml
<Button Content="Click Me"
        FontSize="18"
        HorizontalAlignment="Center"
        Background="SteelBlue"
        Foreground="White" />
```

</TabItem>
</Tabs>

## Building layouts

Layout in code follows the same parent-child model as XAML. You create a layout panel, add children to it, and assign it as the content of a window or another control.

```csharp
var stack = new StackPanel
{
    Spacing = 12,
    Margin = new Thickness(20),
};

stack.Children.Add(new TextBlock { Text = "Name:", FontSize = 16 });
stack.Children.Add(new TextBox { PlaceholderText = "Enter your name" });
stack.Children.Add(new Button { Content = "Submit" });

window.Content = stack;
```

For grid layouts, define rows and columns, then position children using attached properties:

```csharp
var grid = new Grid
{
    RowDefinitions = RowDefinitions.Parse("Auto,*,Auto"),
    ColumnDefinitions = ColumnDefinitions.Parse("200,*"),
};

var header = new TextBlock { Text = "Header", FontSize = 24 };
Grid.SetColumnSpan(header, 2);
grid.Children.Add(header);

var sidebar = new ListBox();
Grid.SetRow(sidebar, 1);
grid.Children.Add(sidebar);

var content = new TextBlock { Text = "Main content area" };
Grid.SetRow(content, 1);
Grid.SetColumn(content, 1);
grid.Children.Add(content);
```

## Handling events

Wire up events using standard C# event handlers or lambda expressions:

```csharp
var count = 0;
var label = new TextBlock { Text = "Clicks: 0" };

var button = new Button { Content = "Click Me" };
button.Click += (sender, args) =>
{
    count++;
    label.Text = $"Clicks: {count}";
};
```

For routed events with more complex handling:

```csharp
button.AddHandler(Button.ClickEvent, (sender, args) =>
{
    // Handle the event
    args.Handled = true;
}, Avalonia.Interactivity.RoutingStrategies.Bubble);
```

## Applying styles

You can create styles programmatically and add them at any level of the control hierarchy:

```csharp
var style = new Style(x => x.OfType<Button>())
{
    Setters =
    {
        new Setter(Button.FontSizeProperty, 16.0),
        new Setter(Button.PaddingProperty, new Thickness(12, 8)),
        new Setter(Button.BackgroundProperty, Brushes.DarkSlateBlue),
        new Setter(Button.ForegroundProperty, Brushes.White),
    }
};

window.Styles.Add(style);
```

## Data binding from code

Bind control properties to data sources without XAML. The simplest approach uses string-based binding paths:

```csharp
var textBox = new TextBox();
var label = new TextBlock();

// Bind the label text to the textbox text
label.Bind(TextBlock.TextProperty,
    new ReflectionBinding("Text") { Source = textBox });
```

### Compiled bindings

For type-safe bindings with compile-time validation and full IntelliSense support, use `CompiledBinding.Create`. This accepts a LINQ expression instead of a string path, so the compiler catches property name errors before runtime:

```csharp
// Bind to a view model property with type safety
var binding = CompiledBinding.Create<MyViewModel, string>(
    expression: vm => vm.Title
);
textBlock.Bind(TextBlock.TextProperty, binding);

// With an explicit source and two-way mode
var binding = CompiledBinding.Create(
    source: viewModel,
    expression: vm => vm.Title,
    mode: BindingMode.TwoWay
);
textBox.Bind(TextBox.TextProperty, binding);
```

Compiled bindings support property access, nested properties, indexers, type casts, logical negation, and `AvaloniaProperty` access. They also perform better than reflection-based string bindings.

### Reactive patterns

You can also use `GetObservable` and `GetBindingObservable` for reactive patterns:

```csharp
textBox.GetObservable(TextBox.TextProperty).Subscribe(newText =>
{
    // React to text changes
});
```

:::info
For complete coverage of binding from code, see [Binding from code](/docs/data-binding/binding-from-code).
:::

## Custom drawing

For applications that need to render graphics directly (visualizations, games, simulations), use `Canvas` with shape controls or implement custom rendering:

```csharp
var canvas = new Canvas { Background = Brushes.Black };

// Add shapes to the canvas
var circle = new Ellipse
{
    Width = 100,
    Height = 100,
    Fill = Brushes.CornflowerBlue,
};
Canvas.SetLeft(circle, 150);
Canvas.SetTop(circle, 100);
canvas.Children.Add(circle);

// Draw lines
var line = new Line
{
    StartPoint = new Point(0, 0),
    EndPoint = new Point(200, 200),
    Stroke = Brushes.White,
    StrokeThickness = 2,
};
canvas.Children.Add(line);
```

## Threading considerations

When updating the UI from a background thread, use `Dispatcher.UIThread`:

```csharp
var label = new TextBlock { Text = "Waiting..." };

_ = Task.Run(async () =>
{
    // Do work on a background thread
    await Task.Delay(2000);

    // Update the UI on the UI thread
    Dispatcher.UIThread.Post(() =>
    {
        label.Text = "Done!";
    });
});
```

:::info
For complete threading guidance, see [Threading](/docs/app-development/threading).
:::

## F# and Avalonia.FuncUI

F# is particularly well suited to code-only UI development. As an expression-first functional language, F# has strong type inference, lightweight syntax for nested structures, and native support for building domain-specific languages through features like computation expressions, pipelines, and discriminated unions.

Where C# builds UI through object construction and property assignment, F# can express the same trees as pure data composition. The result tends to feel more like describing a UI than assembling one.

[Avalonia.FuncUI](https://github.com/fsprojects/Avalonia.FuncUI) is a community library that brings an Elm-inspired, fully functional architecture to Avalonia for F# developers. It provides:

- A declarative domain-specific language (DSL) for building views as immutable descriptions.
- An Elm/MVU (Model-View-Update) architecture with immutable state and message passing.
- Full access to every Avalonia control through a composable F# API.

```fsharp title='F# with Avalonia.FuncUI'
let view (state: State) (dispatch: Msg -> unit) =
    DockPanel.create [
        DockPanel.children [
            Button.create [
                Button.dock Dock.Bottom
                Button.onClick (fun _ -> dispatch Increment)
                Button.content "Click me"
            ]
            TextBlock.create [
                TextBlock.dock Dock.Top
                TextBlock.fontSize 48.0
                TextBlock.text (string state.Count)
            ]
        ]
    ]
```

### C# compared to F# for coded UI

Both languages are fully capable of building code-only Avalonia applications. The choice between them comes down to ergonomics and preference.

**F# strengths for coded UI:**

- Almost everything is an expression, which makes composing UI trees feel natural and direct.
- Computation expressions and pipelines allow you to build APIs that feel like a mini-language for UI.
- Immutability and algebraic data types pair well with reactive, message-passing architectures.
- Type inference keeps generic-heavy composition code clean and readable.

**C# strengths for coded UI:**

- Larger ecosystem of learning resources, libraries, and community support.
- Object initializer syntax works well for straightforward control configuration.
- More familiar to the majority of .NET developers.
- Full access to all Avalonia APIs without any wrapper layer.

C# is not fundamentally limited for coded UI, but its object-oriented heritage means deeply nested, compositional UI trees can become verbose. F# was designed for exactly that shape of code. If you are open to learning F#, Avalonia.FuncUI offers what is arguably the most ergonomic code-only experience in the .NET ecosystem.

If you prefer C#, a builder-style API with careful design can reduce ceremony significantly. The code-only patterns shown throughout this page work well for most applications.

## See also

- [Avalonia XAML](/docs/fundamentals/avalonia-xaml)
- [Code-behind](/docs/fundamentals/code-behind)
- [Application lifetimes](/docs/fundamentals/application-lifetimes)
- [Binding from code](/docs/data-binding/binding-from-code)
- [Creating data templates in code](/docs/data-templates/creating-data-templates-in-code)
- [How To: Build a Complete App Without XAML](/docs/how-to/coded-ui-how-to)
