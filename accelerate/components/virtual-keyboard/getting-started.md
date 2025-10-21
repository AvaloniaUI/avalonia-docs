# Virtual Keyboard Quick Start Guide

## Overview

The Avalonia Virtual Keyboard component provides an on-screen keyboard for Avalonia applications. It is designed for touch-based or kiosk scenarios where physical keyboards may not be available, enabling text input through touchscreens or mouse clicks.

The Virtual Keyboard component includes two main controls:

- `VirtualKeyboardScope` - A container that manages keyboard visibility and input methods
- `VirtualKeyboard` - The actual keyboard control that can be placed manually

## Installation

See the [Installation Guide](../../installation.md) for step-by-step instructions on how to install Accelerate components.

Add the Virtual Keyboard package to your project:

```bash
dotnet add package Avalonia.Controls.VirtualKeyboard
```

### Add the License Key

Include your Avalonia UI license key in the executable project file (`.csproj`):

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

### Include the Control Theme

To ensure the virtual keyboard is properly styled, add the keyboard theme to your application. Open your `App.axaml` file and include the following within the `Application.Styles` section:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="YourNamespace.App">
    <Application.Styles>
        <FluentTheme />
        <!-- Include the Virtual Keyboard theme -->
        <StyleInclude Source="avares://Avalonia.Controls.Keyboard/Themes/Fluent.axaml"/>
    </Application.Styles>
</Application>
```

## Requirements

- Avalonia 11.3.7 or newer

## Basic Usage

### Using VirtualKeyboardScope (Recommended)

The simplest way to add a virtual keyboard to your application is to use the `VirtualKeyboardScope` control, which automatically shows and hides the keyboard when text input controls are focused:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="600" d:DesignHeight="600"
        Width="600" Height="600"
        x:Class="YourNamespace.YourWindow"
        Title="Virtual Keyboard Sample">
    <VirtualKeyboardScope InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana">
        <StackPanel>
            <TextBlock>Hello world!</TextBlock>
            <TextBox Watermark="Type here"/>
        </StackPanel>
    </VirtualKeyboardScope>
</Window>
```

### Using VirtualKeyboard Directly

For more control, you can also use the `VirtualKeyboard` control directly and specify the target input element:

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Virtual Keyboard Sample"
        Width="400" Height="600">
    <StackPanel>
        <TextBox x:Name="InputBox" Width="300" Margin="10"/>
        <VirtualKeyboard Target="{Binding ElementName=InputBox}" 
                           InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana"
                           Margin="10"/>
    </StackPanel>
</Window>
```

Note, that input will be directed to the specified `Target` element regardless of the current input focus.

## Managing Input Methods

The virtual keyboard supports a wide range of input methods and keyboard layouts. You can specify which input methods to include:

### In XAML

```xml
<VirtualKeyboardScope InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana">
    <!-- Your content here -->
</VirtualKeyboardScope>
```

### In C#

```csharp
// Get all available input methods for specific languages
var inputMethods = new List<VirtualKeyboardInputMethod>
{
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("en-US").First(),
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("ja").First(),
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("de").First()
};

// Assign to the VirtualKeyboardScope
myKeyboardScope.InputMethods = inputMethods;
```

### Retrieving Available Input Methods

```csharp
// Get all supported languages
var languages = VirtualKeyboardInputMethod.GetSupportedLanguages();

// Get input methods for a specific language
var englishInputMethods = VirtualKeyboardInputMethod.GetInputMethodsForLanguage("en-US");

// Get a specific input method by ID
var japaneseKana = VirtualKeyboardInputMethod.GetInputMethodById("ja:ime:kana");
```

## Input Method Identifiers

The virtual keyboard component supports a wide range of input method identifiers for different languages. See the [Input Method Identifiers](input-method-identifiers.md) page for a complete list of supported identifiers.

## TextInputOptions

You can customize how the virtual keyboard behaves with different input fields using the `TextInputOptions` attached properties:

```xml
<TextBox TextInputOptions.ContentType="Email" 
         TextInputOptions.ReturnKeyType="Search" />
```

Available ContentType values:
- Normal
- Email
- Url
- Digits

Available ReturnKeyType values:
- Default
- Done
- Go
- Next
- Previous
- Return
- Search
- Send

## API Reference

For more detailed information about the Virtual Keyboard API, refer to the following classes:

- `VirtualKeyboardScope`: A container control that manages keyboard visibility
- `VirtualKeyboard`: The actual keyboard control for manual placement
- `VirtualKeyboardInputMethod`: Represents a particular input method/keyboard layout

## Platform Support

The Virtual Keyboard is a managed component and works on all platforms supported by Avalonia.