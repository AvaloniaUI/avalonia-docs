---
id: setting-up-the-headless-platform
title: Setting up the headless platform
---

The headless platform in AvaloniaUI provides the capability to run Avalonia applications without a visible graphical user interface (GUI). This allows for testing and automation scenarios on systems that lack a graphical environment, such as servers or continuous integration/continuous deployment (CI/CD) environments.

By utilizing the headless platform, you can perform UI testing, execute application scenarios, and validate functionality in a headless environment, saving time and resources compared to manual testing.

## Simulating User Input

As the headless platform doesn't have any real input, every event needs to be raised from the unit test. The Avalonia.Headless package is shipped with a number of helper methods that can be used:

<table>
  <tr>
    <td>`Window.KeyPress(Key key, RawInputModifiers modifiers, PhysicalKey physicalKey, string? keySymbol)`<br/><br/>`Window.KeyPressQwerty(PhysicalKey physicalKey, RawInputModifiers modifiers)`</td>
    <td>Simulates a keyboard press on the headless window/toplevel.</td>
  </tr>
  <tr>
    <td>`Window.KeyRelease(Key key, RawInputModifiers modifiers, PhysicalKey physicalKey, string? keySymbol)`<br/><br/>`Window.KeyReleaseQwerty(PhysicalKey physicalKey, RawInputModifiers modifiers)`</td>
    <td>Simulates a keyboard release on the headless window/toplevel.</td>
  </tr>
  <tr>
    <td>`Window.KeyTextInput(string text)`</td>
    <td>Simulates a text input event on the headless window/toplevel. This event is independent of KeyPress and KeyRelease. If you need to simulate text input to a TextBox or a similar control, please use KeyTextInput.</td>
  </tr>
  <tr>
    <td>`Window.MouseDown(Point point, MouseButton button, RawInputModifiers modifiers)`</td>
    <td>Simulates a mouse down event on the headless window/toplevel. In the headless platform, there is a single mouse pointer. There are no helper methods for touch or pen input.</td>
  </tr>
  <tr>
    <td>`Window.MouseMove(Point point, MouseButton button, RawInputModifiers modifiers)`</td>
    <td>Simulates a mouse move event on the headless window/toplevel.</td>
  </tr>
  <tr>
    <td>`Window.MouseUp(Point point, MouseButton button, RawInputModifiers modifiers)`</td>
    <td>Simulates a mouse up event on the headless window/toplevel.</td>
  </tr>
  <tr>
    <td>`Window.MouseWheel(Point point, Vector delta, RawInputModifiers modifiers)`</td>
    <td>Simulates a mouse wheel event on the headless window/toplevel.</td>
  </tr>
  <tr>
    <td>`Window.DragDrop(Point point, RawDragEventType type, DataObject data, DragDropEffects effects, RawInputModifiers modifiers)`</td>
    <td>Simulates a drag and drop target event on the headless window/toplevel. This event simulates a user moving files from another app to the current app.</td>
  </tr>
</table>

## Example: Button click

A simple button click test is a typical example where these methods can be used:

```csharp
// Create window and button:
var button = new Button
{
    HorizontalAlignment = HorizontalAlignment.Stretch,
    VerticalAlignment = VerticalAlignment.Stretch
};
var window = new Window
{
    Width = 100,
    Height = 100,
    Content = button
};

// Subscribe to the button click event:
var buttonClicked = false;
button.Click += (_, _) => buttonClicked = true;

// Show the window:
window.Show();

// Simulate mouse events with a click (mouse down + up):
window.MouseDown(new Point(50, 50), MouseButton.Left);
window.MouseUp(new Point(50, 50), MouseButton.Left);

// Assert that the button was clicked:
Assert.True(buttonClicked);
```

:::tip
Just like in any other Avalonia application, it's also possible to raise events directly. For example, with button click `button.RaiseEvent(new RoutedEventArgs(Button.ClickEvent))`. This can be more convenient for most use cases but lacks some flexibility with input parameters. RaiseEvent will trigger the click event on the button but a bound command will not be executed. If you need to test a button command you can use `button.Focus()` together with `window.KeyReleaseQwerty(PhysicalKey.Space, RawInputModifiers.None)`.
:::

## Capturing the Last Rendered Frame

By default, the Headless platform doesn't render anything and instead has a fake/headless drawing backend enabled. However, it is possible to enable the Skia renderer and use it to capture the last rendered frame, which can be compared with an expected image or used in another way.

To enable the Skia renderer, adjust the AppBuilder code as follows:

```csharp title=App.axaml.cs
public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<TestApplication>()
    .UseSkia() // enable Skia renderer
    .UseHeadless(new AvaloniaHeadlessPlatformOptions
    {
        UseHeadlessDrawing = false // disable headless drawing
    });
```

With the real renderer enabled, you can use the `Window.CaptureRenderedFrame` helper method:

```csharp
var window = new Window
{
    Content = new TextBlock
    {
        Text = "Hello World"
    }
};
window.Show();

var frame = window.CaptureRenderedFrame();
frame.Save("file.png");
```

:::tip
The `CaptureRenderedFrame` method returns a WriteableBitmap, allowing you to lock it and read pixel data that can be compared in memory.
:::

## Simulating User Delay

In real UI applications, there is always some delay between user interactions, which gives the operating system time to run various tasks in the application. These tasks are often delayed and might include operations such as window resize, which on most platforms (including Headless), is asynchronous.

This delay can result in unexpected behavior when some operations have not yet executed.

Obvious solution would be to add `Task.Delay` between these operations, but a more efficient option in Avalonia would be to use the `Dispatcher` API, which allows flushing the jobs queue directly:

```csharp
var window = new Window();
window.Show();

window.Width = 100;
window.Height = 100;

// highlight-start
Dispatcher.UIThread.RunJobs();
// highlight-end

Assert.AreEqual(new Size(100, 100), window.ClientSize);
```

Additionally, the headless platform provides a method to force the render timer to tick, which can be useful in some scenarios:

```csharp
AvaloniaHeadlessPlatform.ForceRenderTimerTick();
```

:::tip
All input helper methods and `CaptureRenderedFrame` internally use these user delay methods, so there is no need to run them twice!
:::

## Manual setup

:::warning
This is an advanced usage scenario of the Headless platform.
We recommend using the [XUnit](headless-xunit.md) or [NUnit](headless-nunit.md) testing frameworks instead.
:::

### Install Packages

To set up the Headless platform, you need to install two packages:
- [Avalonia.Headless](https://www.nuget.org/packages/Avalonia.Headless), which also includes Avalonia.
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent), as even headless controls need a theme.

:::tip
The Headless platform doesn't require any specific theme, and it is possible to swap FluentTheme with any other.
:::

### Setup Application

As in any other Avalonia app, an `Application` instance needs to be created, and themes need to be applied. When using the Headless platform, the setup is not much different from a regular Avalonia app and can mostly be reused.

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

And the code:

```csharp title=App.axaml.cs
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

### Run Headless Session

```csharp title=Program.cs
using Avalonia.Controls;
using Avalonia.Headless;

// Start Headless session passing Application type.
using var session = HeadlessUnitTestSession.StartNew(typeof(App));

// Since the Headless session has its own thread internally, we need to dispatch actions there:
await session.Dispatch(() =>
{
    // Setup controls:
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // Open window:
    window.Show();

    // Focus text box:
    textBox.Focus();

    // Simulate text input:
    window.KeyTextInput("Hello World");

    // Assert:
    if (textBox.Text != "Hello World")
    {
        throw new Exception("Assert");
    }
}, CancellationToken.None);
```