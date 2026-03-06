---
id: index
title: Testing
---

Avalonia supports several testing strategies, each suited to different goals. You can combine them to build a layered test suite that covers view model logic, control behavior, visual output, and end-to-end user flows.

## Testing strategies

| Strategy | What it tests | Speed | Requires UI |
|---|---|---|---|
| **Unit tests** | View model logic, services, converters | Fast | No |
| **Headless tests** | Controls, layout, data binding, input | Fast | No (in-process) |
| **Visual regression tests** | Rendered pixel output | Medium | No (headless + Skia) |
| **Appium UI tests** | Full application, platform integration, accessibility | Slow | Yes (real window) |

### Unit tests

Standard .NET unit tests for code that has no dependency on Avalonia controls. View models, value converters, services, and business logic can all be tested with xUnit, NUnit, or MSTest without any Avalonia-specific setup.

```csharp
[Fact]
public void ViewModel_Increments_Count()
{
    var vm = new MainViewModel();
    vm.IncrementCommand.Execute(null);
    Assert.Equal(1, vm.Count);
}
```

### Headless tests

The [headless platform](setting-up-the-headless-platform) runs Avalonia's full control tree, layout engine, styling, and data binding in memory without opening a window. You simulate keyboard and mouse input through helper methods. This is the right choice for testing control behavior, data binding, focus management, and command execution.

Avalonia provides integration packages for [xUnit](headless-xunit) and [NUnit](headless-nunit) that handle setup automatically.

```csharp
[AvaloniaFact]
public void TextBox_Accepts_Input()
{
    var textBox = new TextBox();
    var window = new Window { Content = textBox };
    window.Show();

    textBox.Focus();
    window.KeyTextInput("Hello");

    Assert.Equal("Hello", textBox.Text);
}
```

### Visual regression tests

By enabling the Skia renderer in headless mode, you can capture rendered frames as bitmaps and compare them against baseline images. This catches unintended visual changes in control rendering, theming, and layout. See [Capturing the last rendered frame](setting-up-the-headless-platform#visual-regression-testing) for setup details.

### Appium UI tests

[Appium](ui-testing-with-appium) launches your compiled application in a real window and drives it through the platform accessibility tree. This tests the full stack: native windowing, menus, focus, platform-specific behavior, and accessibility. Appium tests are slower but verify that your application works as a user would experience it.

Avalonia uses Appium internally to test the framework across Windows and macOS.

## Choosing the right approach

- **Start with unit tests** for view models and services. These are fast, reliable, and need no special setup.
- **Add headless tests** for control behavior that depends on Avalonia's property system, layout, or input handling.
- **Add visual regression tests** if your application has custom controls or themes where pixel-level correctness matters.
- **Add Appium tests** for critical user flows, platform-specific features, and accessibility validation.

## See also

- [Headless Testing Platform](setting-up-the-headless-platform): Input simulation, frame capture, and async handling.
- [Headless Testing with XUnit](headless-xunit): XUnit integration setup.
- [Headless Testing with NUnit](headless-nunit): NUnit integration setup.
- [UI Testing with Appium](ui-testing-with-appium): End-to-end testing with a real window.
