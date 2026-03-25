---
id: virtualkeyboardscope
title: VirtualKeyboardScope
description: A container control that automatically shows and hides the virtual keyboard based on input focus.
doc-type: reference
tags:
  - accelerate
---

The `VirtualKeyboardScope` control is a container that automatically manages [virtual keyboard](/controls/input/text-input/virtualkeyboard) visibility based on input focus. When a text input control inside the scope receives focus, the keyboard appears. When focus moves to a non-text control or is lost entirely, the keyboard hides.


:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Overview

`VirtualKeyboardScope` is the recommended way to integrate the virtual keyboard into your application. It provides a seamless experience where the keyboard appears only when needed and handles input focus and positioning so that the keyboard does not obscure the active input control.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| InputMethods | IEnumerable\<VirtualKeyboardInputMethod> | Gets or sets the collection of input methods (keyboard layouts and IMEs) available to users. |

## Usage examples

### Basic usage

```xml title="AXAML"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <VirtualKeyboardScope InputMethods="en-US:kbd:standard">
        <StackPanel>
            <TextBlock>Enter your name:</TextBlock>
            <TextBox />
            <TextBlock>Comments:</TextBlock>
            <TextBox AcceptsReturn="True" Height="100" />
        </StackPanel>
    </VirtualKeyboardScope>
</Window>
```

### Multiple input methods

```xml title="AXAML"
<VirtualKeyboardScope InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana">
    <StackPanel>
        <TextBox PlaceholderText="Type here" />
        <TextBlock>The keyboard will support English, German, and Japanese input</TextBlock>
    </StackPanel>
</VirtualKeyboardScope>
```

### Binding InputMethods dynamically

```xml title="AXAML"
<VirtualKeyboardScope InputMethods="{Binding SelectedInputMethods}">
    <StackPanel>
        <TextBox />
        <ListBox ItemsSource="{Binding AvailableInputMethods}"
                 SelectionMode="Multiple"
                 Selection="{Binding SelectedInputMethodsCollection}" />
    </StackPanel>
</VirtualKeyboardScope>
```

### Code-behind configuration

```csharp title="C#"
// Get input methods for specific languages using SelectMany + ToList
var inputMethods = new[] { "en-US", "ja", "de" }
    .SelectMany(VirtualKeyboardInputMethod.GetInputMethodsForLanguage)
    .ToList();

// Assign to the VirtualKeyboardScope
myKeyboardScope.InputMethods = inputMethods;
```

## Working with `TextInputOptions`

You can customize how input fields interact with the virtual keyboard using the `TextInputOptions` attached properties:

```xml title="AXAML"
<VirtualKeyboardScope InputMethods="en-US:kbd:standard">
    <StackPanel>
        <TextBox TextInputOptions.ContentType="Email" 
                 PlaceholderText="Enter email address" />
                 
        <TextBox TextInputOptions.ContentType="Digits"
                 TextInputOptions.ReturnKeyType="Done"
                 PlaceholderText="Enter PIN code" />
                 
        <TextBox TextInputOptions.ReturnKeyType="Search"
                 PlaceholderText="Search..." />
    </StackPanel>
</VirtualKeyboardScope>
```

## Multiple scopes

You can place multiple `VirtualKeyboardScope` controls in your application. Only one keyboard is shown at a time, corresponding to the scope that currently holds focus:

```xml title="AXAML"
<Grid ColumnDefinitions="*, *">
    <!-- First scope with English and German -->
    <VirtualKeyboardScope Grid.Column="0" InputMethods="en-US:kbd:standard, de:kbd:standard">
        <StackPanel>
            <TextBlock>Form 1</TextBlock>
            <TextBox />
        </StackPanel>
    </VirtualKeyboardScope>
    
    <!-- Second scope with English and Japanese -->
    <VirtualKeyboardScope Grid.Column="1" InputMethods="en-US:kbd:standard, ja:ime:kana">
        <StackPanel>
            <TextBlock>Form 2</TextBlock>
            <TextBox />
        </StackPanel>
    </VirtualKeyboardScope>
</Grid>
```

## Best practices

- **Place the scope at the right level.** Position `VirtualKeyboardScope` at the root of your `Window` or `UserControl`, or at a level that wraps all the text input controls that should trigger the keyboard.
- **Choose relevant input methods.** Provide input methods that match your target audience. Consider offering at least one language layout for each region your application supports.
- **Account for reduced screen space.** `VirtualKeyboardScope` automatically scrolls to keep the focused input visible when the keyboard appears. However, you may still need to adjust your layout so that content remains usable while the keyboard is on screen.
- **Understand read-only and disabled behavior.** The keyboard does not appear for read-only or disabled text input controls. Use `IsReadOnly="True"` for text that should be selectable but not editable.

## Practical notes

- `VirtualKeyboardScope` is typically used in kiosk and embedded-Linux scenarios where no physical keyboard is available. On desktop platforms with a hardware keyboard, users will not see the on-screen keyboard.
- If you need full control over where the keyboard appears in your layout, use the standalone `VirtualKeyboard` control instead.
- The `InputMethods` property accepts either a comma-separated string (for example, `"en-US:kbd:standard, de:kbd:standard"`) or a bound collection of `VirtualKeyboardInputMethod` objects. Use the string form for quick prototyping and the binding form when your available languages are determined at runtime.

## See also

- [VirtualKeyboard](/controls/input/text-input/virtualkeyboard) for manual keyboard placement
- [TextBox](/controls/input/text-input/textbox) for the standard text input control
- [Adding a virtual keyboard](/docs/platform-specific-guides/embedded-linux/virtual-keyboard) for embedded-Linux setup guidance