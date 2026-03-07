---
id: coded-ui-how-to
title: "How to: Build a Complete App Without XAML"
description: Build a fully functional Avalonia application using only C# with no XAML files.
doc-type: how-to
---

This guide walks through building a fully functional Avalonia application using only C#, with no XAML files at all. You will create a simple counter app with styled controls, layout, event handling, and data binding, all from code.

## Prerequisites

- .NET 10 SDK or later
- A text editor or IDE (Visual Studio, Rider, or VS Code)

## Step 1: Create the project

Create a new console application and add the Avalonia packages:

```bash
dotnet new console -n CodedUIApp
cd CodedUIApp
dotnet add package Avalonia --version 12.0.0
dotnet add package Avalonia.Desktop --version 12.0.0
dotnet add package Avalonia.Themes.Fluent --version 12.0.0
```

Your `.csproj` should look like this:

```xml title='CodedUIApp.csproj'
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

Notice there is no `Avalonia.Markup.Xaml` package. You do not need it.

## Step 2: Bootstrap the application

Replace the contents of `Program.cs` with:

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
        // Apply the Fluent theme so controls look polished
        app.Styles.Add(new FluentTheme());

        var window = new CounterWindow();
        window.Show();
        app.Run(window);
    }
}
```

The `Start` method accepts a delegate that runs after Avalonia is fully initialized. Inside that delegate, you have access to the `Application` instance and can add themes, create windows, and start the event loop.

## Step 3: Build the window

Create a new file called `CounterWindow.cs`:

```csharp title='CounterWindow.cs'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Layout;
using Avalonia.Media;

class CounterWindow : Window
{
    private readonly TextBlock _countLabel;
    private int _count;

    public CounterWindow()
    {
        Title = "Counter App (No XAML)";
        Width = 400;
        Height = 300;
        WindowStartupLocation = WindowStartupLocation.CenterScreen;

        _countLabel = new TextBlock
        {
            Text = "0",
            FontSize = 48,
            HorizontalAlignment = HorizontalAlignment.Center,
        };

        var incrementButton = new Button
        {
            Content = "Increment",
            FontSize = 18,
            HorizontalAlignment = HorizontalAlignment.Center,
            HorizontalContentAlignment = HorizontalAlignment.Center,
            Width = 160,
        };
        incrementButton.Click += OnIncrementClick;

        var decrementButton = new Button
        {
            Content = "Decrement",
            FontSize = 18,
            HorizontalAlignment = HorizontalAlignment.Center,
            HorizontalContentAlignment = HorizontalAlignment.Center,
            Width = 160,
        };
        decrementButton.Click += OnDecrementClick;

        var resetButton = new Button
        {
            Content = "Reset",
            FontSize = 14,
            HorizontalAlignment = HorizontalAlignment.Center,
        };
        resetButton.Click += (_, _) =>
        {
            _count = 0;
            _countLabel.Text = "0";
        };

        var buttonRow = new StackPanel
        {
            Orientation = Orientation.Horizontal,
            HorizontalAlignment = HorizontalAlignment.Center,
            Spacing = 12,
            Children = { incrementButton, decrementButton },
        };

        Content = new StackPanel
        {
            VerticalAlignment = VerticalAlignment.Center,
            Spacing = 20,
            Children =
            {
                _countLabel,
                buttonRow,
                resetButton,
            },
        };
    }

    private void OnIncrementClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        _count++;
        _countLabel.Text = _count.ToString();
    }

    private void OnDecrementClick(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        _count--;
        _countLabel.Text = _count.ToString();
    }
}
```

Run the application:

```bash
dotnet run
```

You should see a window with a large counter display and three buttons that increment, decrement, and reset the value.

## Step 4: Add custom styles

Enhance the appearance by adding programmatic styles. Update the constructor to apply styles before setting up the content:

```csharp title='CounterWindow.cs (add to constructor, before Content assignment)'
// Style all buttons in this window
Styles.Add(new Avalonia.Styling.Style(x => x.OfType<Button>())
{
    Setters =
    {
        new Avalonia.Styling.Setter(Button.PaddingProperty, new Thickness(16, 8)),
        new Avalonia.Styling.Setter(Button.CornerRadiusProperty, new CornerRadius(8)),
    }
});
```

Styles added to the window's `Styles` collection apply to all matching controls within that window, just as they would in a XAML `<Window.Styles>` block.

## Step 5: Add data binding

For more complex scenarios, you can use data binding from code instead of directly updating control properties. Here is how to bind controls to a view model:

```csharp title='CounterViewModel.cs'
using System.ComponentModel;
using System.Runtime.CompilerServices;

class CounterViewModel : INotifyPropertyChanged
{
    private int _count;

    public int Count
    {
        get => _count;
        set
        {
            if (_count != value)
            {
                _count = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(CountText));
            }
        }
    }

    public string CountText => Count.ToString();

    public void Increment() => Count++;
    public void Decrement() => Count--;
    public void Reset() => Count = 0;

    public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged([CallerMemberName] string? name = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
```

Then bind the label to the view model. You can use a string-based binding or a compiled binding. Compiled bindings are type-safe, validated at compile time, and provide full IntelliSense:

```csharp title='CounterWindow.cs (updated constructor, string-based)'
var viewModel = new CounterViewModel();
DataContext = viewModel;

_countLabel.Bind(TextBlock.TextProperty, new Avalonia.Data.Binding("CountText"));

incrementButton.Click += (_, _) => viewModel.Increment();
decrementButton.Click += (_, _) => viewModel.Decrement();
resetButton.Click += (_, _) => viewModel.Reset();
```

```csharp title='CounterWindow.cs (updated constructor, compiled binding)'
var viewModel = new CounterViewModel();
DataContext = viewModel;

_countLabel.Bind(TextBlock.TextProperty,
    CompiledBinding.Create<CounterViewModel, string>(
        expression: vm => vm.CountText));

incrementButton.Click += (_, _) => viewModel.Increment();
decrementButton.Click += (_, _) => viewModel.Decrement();
resetButton.Click += (_, _) => viewModel.Reset();
```

This separates your UI logic from presentation, giving you the same MVVM benefits you would get with XAML, all expressed in code. The compiled binding variant catches property name errors at build time rather than silently failing at runtime.

## Step 6: Add a grid layout

As your UI grows, you may want more precise layout control. Here is an example replacing the simple `StackPanel` with a `Grid`:

```csharp
var grid = new Grid
{
    RowDefinitions = RowDefinitions.Parse("*,Auto,Auto"),
    ColumnDefinitions = ColumnDefinitions.Parse("*,*"),
    Margin = new Thickness(20),
};

// Counter display spans both columns
Grid.SetColumnSpan(_countLabel, 2);
grid.Children.Add(_countLabel);

// Buttons in the second row
Grid.SetRow(incrementButton, 1);
Grid.SetColumn(incrementButton, 0);
grid.Children.Add(incrementButton);

Grid.SetRow(decrementButton, 1);
Grid.SetColumn(decrementButton, 1);
grid.Children.Add(decrementButton);

// Reset button spans both columns in the third row
Grid.SetRow(resetButton, 2);
Grid.SetColumnSpan(resetButton, 2);
grid.Children.Add(resetButton);

Content = grid;
```

## Step 7: Add custom drawing (optional)

For applications that need direct rendering, you can use a `Canvas` with shape controls:

```csharp title='DrawingWindow.cs'
using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Shapes;
using Avalonia.Media;

class DrawingWindow : Window
{
    private readonly Canvas _canvas;

    public DrawingWindow()
    {
        Title = "Code-Only Drawing";
        Width = 640;
        Height = 480;
        _canvas = new Canvas { Background = Brushes.Black };
        Content = _canvas;
        Resized += OnResized;
    }

    private void OnResized(object? sender, WindowResizedEventArgs e)
    {
        _canvas.Children.Clear();

        double cx = Width / 2;
        double cy = Height / 2;
        double radius = Math.Min(Width, Height) * 0.35;
        int segments = 80;

        for (int i = 0; i < segments; i++)
        {
            double angle1 = 2 * Math.PI * i / segments;
            double angle2 = 2 * Math.PI * (i + 1) / segments;

            _canvas.Children.Add(new Line
            {
                StartPoint = new Point(cx + radius * Math.Cos(angle1),
                                       cy + radius * Math.Sin(angle1)),
                EndPoint = new Point(cx + radius * Math.Cos(angle2),
                                     cy + radius * Math.Sin(angle2)),
                Stroke = Brushes.CornflowerBlue,
                StrokeThickness = 2,
            });
        }
    }
}
```

## Multi-window applications

For apps with multiple windows, use `ClassicDesktopStyleApplicationLifetime` to manage application shutdown:

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
            .AfterSetup(b => b.Instance?.Styles.Add(new FluentTheme()))
            .SetupWithLifetime(lifetime);

        lifetime.MainWindow = new CounterWindow();
        lifetime.Start(args);
    }
}
```

You can open additional windows from anywhere in your code:

```csharp
var secondWindow = new DrawingWindow();
secondWindow.Show();
```

With `ShutdownMode.OnLastWindowClose`, the application exits only after every open window has been closed.

## Summary

This guide demonstrated that you can build a complete, well-structured Avalonia application without a single line of XAML. The key patterns are:

| Concern | Code-Only Approach |
|---|---|
| Bootstrap | `AppBuilder.Configure<Application>().UsePlatformDetect().Start(delegate)` |
| Theme | `app.Styles.Add(new FluentTheme())` |
| Controls | Instantiate with object initializers |
| Layout | Add children to panels (`StackPanel`, `Grid`, `DockPanel`) |
| Events | Wire handlers with `+=` or lambdas |
| Styles | Create `Style` objects and add to `Styles` collection |
| Binding | `control.Bind(property, new ReflectionBinding(...))` or `CompiledBinding.Create(expression)` |
| Drawing | `Canvas` with `Line`, `Ellipse`, `Rectangle`, and other shapes |
| Multi-window | `ClassicDesktopStyleApplicationLifetime` with `ShutdownMode` |

:::tip
For a deeper look at the concepts behind each of these patterns, see [Code-Only UI](/docs/fundamentals/coded-ui).
:::

## See also

- [Code-Only UI](/docs/fundamentals/coded-ui)
- [Application lifetimes](/docs/fundamentals/application-lifetimes)
- [Binding from code](/docs/data-binding/binding-from-code)
- [Creating data templates in code](/docs/data-templates/creating-data-templates-in-code)
- [Threading](/docs/app-development/threading)
