---
id: ui-testing-with-appium
title: UI Testing with Appium
---

Appium is an open-source automation framework that drives your application through its accessibility tree, simulating real user interactions such as clicking buttons, typing text, and verifying control states. Unlike [headless tests](setting-up-the-headless-platform), which run without a visible window and simulate input programmatically, Appium tests launch your compiled application in a real window and interact with it the same way a user would.

This makes Appium tests well suited for end-to-end validation, accessibility verification, and testing platform-specific behaviors. Avalonia uses Appium internally to test the framework itself across Windows and macOS.

## When to use Appium vs headless

| Consideration | Headless | Appium |
|---|---|---|
| Speed | Fast (in-process, no GUI) | Slower (launches real app) |
| Scope | Unit and component tests | End-to-end and integration tests |
| Platform behavior | Simulated | Real (native windowing, menus, focus) |
| Accessibility | Not tested | Tested (drives via accessibility tree) |
| CI/CD | Runs anywhere | Requires a display (or virtual display on Linux) |

Use headless tests for fast feedback on control logic and data binding. Use Appium tests to verify that your application works correctly as a whole, including native platform integration.

## Prerequisites

### Windows

Install [WinAppDriver](https://github.com/microsoft/WinAppDriver/releases). WinAppDriver acts as the Appium server on Windows and requires Windows 10 or later. Enable **Developer Mode** in Windows Settings.

### macOS

Install Appium and the Mac2 driver:

```bash
npm install -g appium
appium driver install mac2
```

You also need to grant accessibility permissions to the terminal or IDE you run tests from. Go to **System Settings > Privacy & Security > Accessibility** and add your terminal application.

## Project setup

Create a new xUnit test project and install the Appium client:

```bash
dotnet new xunit -n MyApp.UITests
cd MyApp.UITests
dotnet add package Appium.WebDriver
```

## Creating a test fixture

The fixture manages the Appium driver session. It starts your application, connects to it, and tears it down after tests complete.

```csharp
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Windows;
using Xunit;

public class AppFixture : IDisposable
{
    public AppiumDriver Session { get; }

    public AppFixture()
    {
        if (OperatingSystem.IsWindows())
        {
            var options = new AppiumOptions();
            options.AddAdditionalAppiumOption("app", @"path\to\your\MyApp.exe");
            options.AddAdditionalAppiumOption("platformName", "Windows");
            options.AddAdditionalAppiumOption("deviceName", "WindowsPC");
            Session = new WindowsDriver(new Uri("http://127.0.0.1:4723"), options);
        }
        else if (OperatingSystem.IsMacOS())
        {
            var options = new AppiumOptions();
            options.AddAdditionalAppiumOption("platformName", "mac");
            options.AddAdditionalAppiumOption("automationName", "mac2");
            options.AddAdditionalAppiumOption("bundleId", "com.mycompany.myapp");
            Session = new AppiumDriver(new Uri("http://127.0.0.1:4723/wd/hub"), options);
        }
        else
        {
            throw new PlatformNotSupportedException();
        }
    }

    public void Dispose()
    {
        try { Session?.Quit(); } catch { }
    }
}

[CollectionDefinition("Default")]
public class DefaultCollection : ICollectionFixture<AppFixture> { }
```

:::tip
On macOS, use `bundleId` to identify your application rather than a file path. Build your app as an `.app` bundle first.
:::

## Writing tests

Tests use `FindElementByAccessibilityId` to locate controls. This works because Avalonia exposes the `AutomationProperties.AutomationId` value (or the control's `Name`) through the platform accessibility API.

### Setting AutomationId on controls

Give your controls an `AutomationId` so that tests can find them reliably:

```xml
<Button AutomationProperties.AutomationId="SubmitButton" Content="Submit" />
<TextBox AutomationProperties.AutomationId="NameInput" />
<CheckBox AutomationProperties.AutomationId="AgreeCheckBox" Content="I agree" />
```

### A basic test

```csharp
using OpenQA.Selenium.Appium;
using Xunit;

[Collection("Default")]
public class ButtonTests
{
    private readonly AppiumDriver _session;

    public ButtonTests(AppFixture fixture)
    {
        _session = fixture.Session;
    }

    [Fact]
    public void Click_Button_Updates_Text()
    {
        var button = _session.FindElement(MobileBy.AccessibilityId("SubmitButton"));
        var output = _session.FindElement(MobileBy.AccessibilityId("OutputText"));

        button.Click();

        Assert.Equal("Submitted", output.Text);
    }
}
```

### Testing checkbox state

```csharp
[Fact]
public void CheckBox_Toggles_On_Click()
{
    var checkBox = _session.FindElement(MobileBy.AccessibilityId("AgreeCheckBox"));

    // Read initial state via the accessibility attribute
    var initialState = checkBox.GetAttribute("Toggle.ToggleState");
    Assert.Equal("0", initialState); // 0 = unchecked

    checkBox.Click();

    var newState = checkBox.GetAttribute("Toggle.ToggleState");
    Assert.Equal("1", newState); // 1 = checked
}
```

### Testing text input

```csharp
[Fact]
public void TextBox_Accepts_Input()
{
    var textBox = _session.FindElement(MobileBy.AccessibilityId("NameInput"));

    textBox.Clear();
    textBox.SendKeys("Avalonia");

    Assert.Equal("Avalonia", textBox.Text);
}
```

## Platform-specific tests

Some tests only make sense on certain platforms (for example, native menu tests on macOS). You can create a custom attribute to skip tests on unsupported platforms:

```csharp
using System.Runtime.InteropServices;
using Xunit;

[Flags]
public enum TestPlatforms
{
    Windows = 0x01,
    MacOS = 0x02,
    Linux = 0x04,
    All = Windows | MacOS | Linux
}

public sealed class PlatformFactAttribute : FactAttribute
{
    public PlatformFactAttribute(TestPlatforms platforms)
    {
        if (!IsSupported(platforms))
        {
            Skip = $"Test is not supported on {RuntimeInformation.OSDescription}";
        }
    }

    private static bool IsSupported(TestPlatforms platforms)
    {
        if (OperatingSystem.IsWindows()) return platforms.HasFlag(TestPlatforms.Windows);
        if (OperatingSystem.IsMacOS()) return platforms.HasFlag(TestPlatforms.MacOS);
        if (OperatingSystem.IsLinux()) return platforms.HasFlag(TestPlatforms.Linux);
        return false;
    }
}
```

Use it on tests that target specific platforms:

```csharp
[PlatformFact(TestPlatforms.MacOS)]
public void Native_Menu_Shows_App_Name()
{
    // macOS-only test
}
```

## Cross-platform helpers

Attribute names and element lookup can differ between WinAppDriver and the macOS driver. Utility methods help keep tests clean:

```csharp
public static class ElementExtensions
{
    public static string GetName(this AppiumElement element)
    {
        if (OperatingSystem.IsWindows())
            return element.GetAttribute("Name");
        return element.GetAttribute("title");
    }

    public static bool? GetIsChecked(this AppiumElement element)
    {
        var value = element.GetAttribute("Toggle.ToggleState")
            ?? element.GetAttribute("value");

        return value switch
        {
            "0" => false,
            "1" => true,
            _ => null // indeterminate
        };
    }
}
```

## Running tests

### Windows

Start WinAppDriver first (it runs as a local server):

```
"C:\Program Files (x86)\Windows Application Driver\WinAppDriver.exe"
```

Then run your tests:

```bash
dotnet test
```

### macOS

Start the Appium server:

```bash
appium
```

Then run your tests in another terminal:

```bash
dotnet test
```

## CI/CD considerations

- **Windows**: WinAppDriver must be running before tests start. In CI, add a setup step to launch it.
- **macOS**: Appium and the mac2 driver must be installed. Grant accessibility permissions to the CI agent.
- **Linux**: Appium does not have a stable Linux desktop driver. For Linux CI, use [headless tests](setting-up-the-headless-platform) instead.

## See also

- [Headless Testing with XUnit](headless-xunit): Fast, in-process unit testing.
- [Headless Testing with NUnit](headless-nunit): NUnit integration for headless tests.
- [Headless Platform Setup](setting-up-the-headless-platform): Simulating input and capturing frames.
- [Avalonia's own Appium tests](https://github.com/AvaloniaUI/Avalonia/tree/master/tests/Avalonia.IntegrationTests.Appium): The test suite Avalonia uses internally.
- [Appium documentation](https://appium.io/docs/en/latest/): Official Appium guides.
