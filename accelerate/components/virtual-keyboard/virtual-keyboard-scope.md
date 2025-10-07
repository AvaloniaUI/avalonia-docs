# VirtualKeyboardScope

The `VirtualKeyboardScope` is a container control that manages virtual keyboard visibility automatically based on the current input focus. It displays the keyboard when a text input control within it gains focus, and hides it when focus is lost or moved to a non-text control.

## Overview

`VirtualKeyboardScope` is the recommended way to integrate the virtual keyboard into your application. It provides a seamless experience where the keyboard appears only when needed and properly handles input focus and positioning to prevent the keyboard from obscuring the active input control.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| InputMethods | IEnumerable\<VirtualKeyboardInputMethod> | Gets or sets the collection of input methods (keyboard layouts and IMEs) available to users. |


## Usage Examples

### Basic Usage

```xml
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

### Multiple Input Methods

```xml
<VirtualKeyboardScope InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana">
    <StackPanel>
        <TextBox Watermark="Type here" />
        <TextBlock>The keyboard will support English, German, and Japanese input</TextBlock>
    </StackPanel>
</VirtualKeyboardScope>
```

### Binding InputMethods Dynamically

```xml
<VirtualKeyboardScope InputMethods="{Binding SelectedInputMethods}">
    <StackPanel>
        <TextBox />
        <ListBox ItemsSource="{Binding AvailableInputMethods}"
                 SelectionMode="Multiple"
                 Selection="{Binding SelectedInputMethodsCollection}" />
    </StackPanel>
</VirtualKeyboardScope>
```

### Code-Behind Configuration

```csharp
// Get input methods for specific languages using SelectMany + ToList
var inputMethods = new[] { "en-US", "ja", "de" }
    .SelectMany(VirtualKeyboardInputMethod.GetInputMethodsForLanguage)
    .ToList();

// Assign to the VirtualKeyboardScope
myKeyboardScope.InputMethods = inputMethods;
```

## Working with TextInputOptions

You can customize how input fields work with the virtual keyboard using `TextInputOptions` attached properties:

```xml
<VirtualKeyboardScope InputMethods="en-US:kbd:standard">
    <StackPanel>
        <TextBox TextInputOptions.ContentType="Email" 
                 Watermark="Enter email address" />
                 
        <TextBox TextInputOptions.ContentType="Digits"
                 TextInputOptions.ReturnKeyType="Done"
                 Watermark="Enter PIN code" />
                 
        <TextBox TextInputOptions.ReturnKeyType="Search"
                 Watermark="Search..." />
    </StackPanel>
</VirtualKeyboardScope>
```

## Multiple Scopes

You can have multiple `VirtualKeyboardScope` controls in your application, but be aware that only one keyboard will be shown at a time:

```xml
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

## Best Practices

1. **Place at the Right Level**:
   - Place the `VirtualKeyboardScope` at the root of your Window/UserControl or at a level that contains all text input controls that should use the keyboard.

2. **Input Methods Selection**:
   - Provide input methods relevant to your target audience.
   - Consider offering at least one language layout for each region your application targets.

3. **Content Scrolling**:
   - `VirtualKeyboardScope` automatically handles scrolling to keep the focused input element visible when the keyboard appears.
   - Ensure that your layout can accommodate the reduced screen space when the keyboard is visible. While `VirtualKeyboardScope` automatically provides an scrolling container, you may still need to adjust your layout for optimal user experience.

4. **Read-Only and Disabled Controls**:
   - The keyboard won't appear for read-only or disabled text input controls.
   - Use `IsReadOnly="True"` for text that should be selectable but not editable.


## Related Components

- [VirtualKeyboard](virtual-keyboard.md) - The standalone keyboard control for manual placement
- [Input Method Identifiers](input-method-identifiers.md) - List of available input method IDs
