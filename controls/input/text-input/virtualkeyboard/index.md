---
id: index
title: Virtual keyboard overview
tags:
  - avalonia pro
  - avalonia enterprise
---

The virtual keyboard component provides an on-screen keyboard for Avalonia applications. It is designed for touch-based or kiosk scenarios where physical keyboards may not be available, enabling text input through touchscreens or mouse clicks.

:::info
This component is available as part of [Avalonia Pro](https://avaloniaui.net/pricing) or higher.
:::

The virtual keyboard component includes the following classes:

- [`VirtualKeyboardScope`](/controls/input/text-input/virtualkeyboard/virtualkeyboardscope): A container control that manages keyboard visibility and input methods.
- [`VirtualKeyboard`](/controls/input/text-input/virtualkeyboard/virtualkeyboard-control): The actual keyboard control that can be placed manually.
- `VirtualKeyboardInputMethod`: Represents a particular input method or keyboard layout.

## Getting started

1. Install the `Avalonia.Controls.VirtualKeyboard` NuGet package by running the `dotnet add package` command.

```
dotnet add package Avalonia.Controls.VirtualKeyboard
```

2. Include your Avalonia license key in the executable project file (`.csproj`).

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

:::tip
For multi-project solutions, you can store your license key in an [environment variable](https://learn.microsoft.com/en-us/visualstudio/msbuild/how-to-use-environment-variables-in-a-build) or a [shared props file](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022#directorybuildprops-example) to avoid duplication.
:::

3. Reference the `VirtualKeyboard` fluent theme via a `StyleInclude` in your `App.axaml` file. This adds the resources needed to properly style the virtual keyboard.

```xml
<Application.Styles>
   <StyleInclude Source="avares://Avalonia.Controls.VirtualKeyboard/Themes/Fluent.axaml"/>
   <!-- other styles -->
</Application.Styles>
```

For more information on installing Avalonia Pro controls, see [Installing Avalonia Pro](/tools/installing-avalonia-pro).

## Basic usage

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
            <TextBox PlaceholderText="Type here"/>
        </StackPanel>
    </VirtualKeyboardScope>
</Window>
```

### Using VirtualKeyboard Directly

For more control, you can use the `VirtualKeyboard` control directly and specify the target input element.

Input will be directed to the specified `Target` element regardless of the current input focus.

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

## Managing input methods

The virtual keyboard supports a wide range of input methods and keyboard layouts. Here's how to specify which input methods to include:

### XAML

```xml
<VirtualKeyboardScope InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana">
    <!-- Your content here -->
</VirtualKeyboardScope>
```

### C#

```csharp
// Get all available input methods for specific languages
var inputMethods = new List<VirtualKeyboardInputMethod>
{
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("en-US").First(),
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("de").First(),
    VirtualKeyboardInputMethod.GetInputMethodsForLanguage("ja").First()
};

// Assign to the VirtualKeyboardScope
myKeyboardScope.InputMethods = inputMethods;
```

### Retrieving input methods

```csharp
// Get all supported languages
var languages = VirtualKeyboardInputMethod.GetSupportedLanguages();

// Get input methods for a specific language
var englishInputMethods = VirtualKeyboardInputMethod.GetInputMethodsForLanguage("en-US");

// Get a specific input method by ID
var japaneseKana = VirtualKeyboardInputMethod.GetInputMethodById("ja:ime:kana");
```

## Input method identifiers

See the [virtual keyboard control](/controls/input/text-input/virtualkeyboard/virtualkeyboard-control#input-methods) page for a table of supported input methods and their identifiers.

## RIME input method engine

The virtual keyboard supports the [RIME](https://rime.im/) input method engine for Chinese text input. RIME support is provided as a separate plugin package.

See the [`VirtualKeyboard` control reference](/controls/input/text-input/virtualkeyboad/virtualkeyboard-control#rime-input-method-engine) for installation and configuration instructions.

## Text input options

You can customize how the virtual keyboard behaves with different input fields using the `TextInputOptions` attached properties:

```xml
<TextBox TextInputOptions.ContentType="Email" 
         TextInputOptions.ReturnKeyType="Search" />
```

Available `ContentType` values:
- `Normal`
- `Email`
- `Url`
- `Digits`

Available `ReturnKeyType` values:
- `Default`
- `Done`
- `Go`
- `Next`
- `Previous`
- `Return`
- `Search`
- `Send`

## See also

- [VirtualKeyboard control](/controls/input/text-input/virtualkeyboard)
- [VirtualKeyboardScope control](/controls/layout/containers/virtualkeyboardscope)
