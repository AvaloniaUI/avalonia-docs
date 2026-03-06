---
id: setting-up-the-headless-platform
title: Headless Testing Platform
---

The headless platform runs Avalonia without a visible window, making it ideal for automated testing in CI/CD environments and on machines without a display. It provides the full Avalonia control tree, layout, styling, and data binding, but replaces the real windowing and rendering backends with in-memory implementations.

## Simulating user input

The headless platform has no real input devices, so you simulate input using extension methods on `Window`. These methods raise the same events that real input would trigger.

### Keyboard input

| Method | Description |
|---|---|
| `Window.KeyPress(Key, RawInputModifiers, PhysicalKey, string?)` | Simulates a key press. |
| `Window.KeyRelease(Key, RawInputModifiers, PhysicalKey, string?)` | Simulates a key release. |
| `Window.KeyPressQwerty(PhysicalKey, RawInputModifiers)` | Simulates a key press using QWERTY layout mapping. |
| `Window.KeyReleaseQwerty(PhysicalKey, RawInputModifiers)` | Simulates a key release using QWERTY layout mapping. |
| `Window.KeyTextInput(string)` | Simulates text input (independent of key press/release). Use this for typing into `TextBox` and similar controls. |

### Mouse input

| Method | Description |
|---|---|
| `Window.MouseDown(Point, MouseButton, RawInputModifiers)` | Simulates a mouse button press at the given position. |
| `Window.MouseUp(Point, MouseButton, RawInputModifiers)` | Simulates a mouse button release. |
| `Window.MouseMove(Point, MouseButton, RawInputModifiers)` | Simulates mouse movement. |
| `Window.MouseWheel(Point, Vector, RawInputModifiers)` | Simulates a mouse wheel scroll. |

### Drag and drop

| Method | Description |
|---|---|
| `Window.DragDrop(Point, RawDragEventType, DataObject, DragDropEffects, RawInputModifiers)` | Simulates an external drag-and-drop operation (for example, a user dragging files from the OS into your app). |

## Common test patterns

### Testing a button click

```csharp
[AvaloniaTest]
public void Button_Click_Updates_ViewModel()
{
    var vm = new MyViewModel();
    var button = new Button
    {
        Command = vm.IncrementCommand,
        HorizontalAlignment = HorizontalAlignment.Stretch,
        VerticalAlignment = VerticalAlignment.Stretch
    };
    var window = new Window { Width = 100, Height = 100, Content = button };
    window.Show();

    window.MouseDown(new Point(50, 50), MouseButton.Left);
    window.MouseUp(new Point(50, 50), MouseButton.Left);

    Assert.Equal(1, vm.Count);
}
```

:::tip
You can also raise events directly with `button.RaiseEvent(new RoutedEventArgs(Button.ClickEvent))`. This is convenient but does not execute bound commands. To test a command via keyboard, use `button.Focus()` followed by `window.KeyReleaseQwerty(PhysicalKey.Space, RawInputModifiers.None)`.
:::

### Testing text input

```csharp
[AvaloniaTest]
public void TextBox_Accepts_Text_Input()
{
    var textBox = new TextBox();
    var window = new Window { Content = textBox };
    window.Show();

    textBox.Focus();
    window.KeyTextInput("Hello World");

    Assert.Equal("Hello World", textBox.Text);
}
```

### Testing data binding

```csharp
[AvaloniaTest]
public void TextBox_Binds_To_ViewModel()
{
    var vm = new MyViewModel { Name = "Alice" };
    var textBox = new TextBox
    {
        [!TextBox.TextProperty] = new Binding("Name")
    };
    var window = new Window
    {
        DataContext = vm,
        Content = textBox
    };
    window.Show();

    Assert.Equal("Alice", textBox.Text);

    // Simulate user editing the text
    textBox.Focus();
    textBox.Text = "Bob";

    Assert.Equal("Bob", vm.Name);
}
```

### Testing keyboard shortcuts

```csharp
[AvaloniaTest]
public void Ctrl_S_Triggers_Save()
{
    var saved = false;
    var window = new Window();
    window.KeyBindings.Add(new KeyBinding
    {
        Gesture = new KeyGesture(Key.S, KeyModifiers.Control),
        Command = ReactiveCommand.Create(() => saved = true)
    });
    window.Show();

    window.KeyPress(Key.S, RawInputModifiers.Control, PhysicalKey.S, "s");
    window.KeyRelease(Key.S, RawInputModifiers.Control, PhysicalKey.S, "s");

    Assert.True(saved);
}
```

### Testing a view with loaded XAML

You can instantiate your actual views in headless tests:

```csharp
[AvaloniaTest]
public void MainView_Shows_Welcome_Message()
{
    var vm = new MainViewModel();
    var view = new MainView { DataContext = vm };
    var window = new Window { Content = view };
    window.Show();

    var textBlock = window.FindControl<TextBlock>("WelcomeText");
    Assert.Equal("Welcome to Avalonia!", textBlock?.Text);
}
```

## Flushing async operations

Some operations in Avalonia are asynchronous (window resize, layout passes, deferred dispatcher jobs). If you set a property and immediately assert, the change may not have taken effect yet.

Use `Dispatcher.UIThread.RunJobs()` to flush the dispatcher queue:

```csharp
var window = new Window();
window.Show();

window.Width = 100;
window.Height = 100;

Dispatcher.UIThread.RunJobs();

Assert.Equal(new Size(100, 100), window.ClientSize);
```

You can also force the render timer to tick, which is useful when testing animations or render-dependent behavior:

```csharp
AvaloniaHeadlessPlatform.ForceRenderTimerTick();
```

:::tip
The input helper methods and `CaptureRenderedFrame` call these internally, so you do not need to flush manually when using them.
:::

## Visual regression testing

By default, the headless platform uses a fake drawing backend that does not produce pixels. You can enable the Skia renderer to capture rendered frames and compare them against baseline images.

### Enabling the Skia renderer

```csharp title="App.axaml.cs"
public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<TestApplication>()
    .UseSkia()
    .UseHeadless(new AvaloniaHeadlessPlatformOptions
    {
        UseHeadlessDrawing = false
    });
```

### Capturing a frame

```csharp
var window = new Window
{
    Content = new TextBlock { Text = "Hello World" }
};
window.Show();

var frame = window.CaptureRenderedFrame();
frame.Save("output.png");
```

`CaptureRenderedFrame` returns a `WriteableBitmap`. You can lock it and read pixel data for in-memory comparison.

### Comparing against a baseline

A common pattern for visual regression tests is to render a control, save the output, and compare it pixel-by-pixel against a known-good reference image:

```csharp
[AvaloniaTest]
public void Border_Renders_Correctly()
{
    var control = new Border
    {
        Width = 100,
        Height = 100,
        Background = Brushes.Blue,
        BorderBrush = Brushes.Black,
        BorderThickness = new Thickness(2),
        CornerRadius = new CornerRadius(8)
    };
    var window = new Window { Content = control };
    window.Show();

    var actual = window.CaptureRenderedFrame();

    // Compare against a baseline image stored in your test project
    var expected = new Bitmap("expected/Border_Renders_Correctly.png");
    AssertImagesMatch(expected, actual, tolerance: 0.02);
}

private static void AssertImagesMatch(Bitmap expected, WriteableBitmap actual,
    double tolerance)
{
    // Implement pixel comparison logic, or use an image comparison library
}
```

:::tip
Avalonia uses this approach internally in its [render test suite](https://github.com/AvaloniaUI/Avalonia/tree/master/tests/Avalonia.RenderTests). Each test renders a control, saves the output as PNG, and compares it to a baseline image with a configurable error tolerance.
:::

## Testing view models without UI

View models that implement `INotifyPropertyChanged` or use `ReactiveUI` can be tested with plain unit tests without the headless platform. You only need the headless platform when your test involves Avalonia controls, layout, or input.

```csharp
// No [AvaloniaTest] needed, just a regular [Fact]
[Fact]
public void ViewModel_Increments_Count()
{
    var vm = new MainViewModel();

    vm.IncrementCommand.Execute(null);

    Assert.Equal(1, vm.Count);
}
```

## Manual setup

:::caution
This is an advanced usage scenario. For most cases, use the [XUnit](headless-xunit) or [NUnit](headless-nunit) integration, which handles setup automatically.
:::

### Install packages

You need two packages:
- [Avalonia.Headless](https://www.nuget.org/packages/Avalonia.Headless) (includes Avalonia)
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) (headless controls need a theme)

:::tip
The headless platform does not require a specific theme. You can swap `FluentTheme` for any other theme.
:::

### Setup application

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

```csharp title="App.axaml.cs"
using Avalonia;
using Avalonia.Headless;

public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }
}
```

### Run a headless session

```csharp title="Program.cs"
using Avalonia.Controls;
using Avalonia.Headless;

using var session = HeadlessUnitTestSession.StartNew(typeof(App));

await session.Dispatch(() =>
{
    var textBox = new TextBox();
    var window = new Window { Content = textBox };
    window.Show();

    textBox.Focus();
    window.KeyTextInput("Hello World");

    if (textBox.Text != "Hello World")
        throw new Exception("Text input failed");
}, CancellationToken.None);
```

## See also

- [Headless Testing with XUnit](headless-xunit): XUnit integration with `[AvaloniaFact]`.
- [Headless Testing with NUnit](headless-nunit): NUnit integration with `[AvaloniaTest]`.
- [UI Testing with Appium](ui-testing-with-appium): End-to-end testing with a real application window.
- [Avalonia's test suite](https://github.com/AvaloniaUI/Avalonia/tree/master/tests): How Avalonia tests itself.
