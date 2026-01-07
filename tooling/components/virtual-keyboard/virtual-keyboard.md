# VirtualKeyboard

The `VirtualKeyboard` is a standalone control that provides an on-screen keyboard that can be manually placed in your application's layout. Unlike `VirtualKeyboardScope`, which automatically manages keyboard visibility based on focus, `VirtualKeyboard` is explicitly directed at a specific target input element.

## Overview

`VirtualKeyboard` gives you more control over keyboard placement and behavior. It sends input directly to its designated target regardless of which control has input focus. This makes it useful for specialized input scenarios where automatic focus-based keyboard display isn't appropriate.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| Target | IInputElement | Gets or sets the input element that will receive keystrokes from the keyboard. |
| InputMethods | IEnumerable\<VirtualKeyboardInputMethod> | Gets or sets the collection of input methods (keyboard layouts and IMEs) available to users. |

## Usage Examples

### Basic Usage

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <StackPanel>
        <TextBox x:Name="InputField" />
        <VirtualKeyboard Target="{Binding ElementName=InputField}"
                         InputMethods="en-US:kbd:standard" />
    </StackPanel>
</Window>
```

### Multiple Input Methods

```xml
<StackPanel>
    <TextBox x:Name="EmailField" Watermark="Email address" />
    <VirtualKeyboard Target="{Binding ElementName=EmailField}"
                     InputMethods="en-US:kbd:standard, de:kbd:standard, ja:ime:kana" />
</StackPanel>
```

### Code-Behind Configuration

```csharp
// Get input methods for specific languages using SelectMany + ToList
var inputMethods = new[] { "en-US", "ja", "de" }
    .SelectMany(VirtualKeyboardInputMethod.GetInputMethodsForLanguage)
    .ToList();

// Create and configure a VirtualKeyboard
var keyboard = new VirtualKeyboard
{
    Target = myTextBox,
    InputMethods = inputMethods
};

// Add it to the visual tree
myContainer.Children.Add(keyboard);
```

## Working with TextInputOptions

`TextInputOptions` attached properties can be applied to the target element to customize keyboard behavior:

```xml
<StackPanel>
    <TextBox x:Name="EmailField" 
             TextInputOptions.ContentType="Email" 
             TextInputOptions.ReturnKeyType="Next" />
             
    <VirtualKeyboard Target="{Binding ElementName=EmailField}"
                     InputMethods="en-US:kbd:standard" />
</StackPanel>
```

## When to Use VirtualKeyboard vs. VirtualKeyboardScope

### Choose VirtualKeyboard when:
- 
- **Fixed Target**: You need the keyboard to always target a specific input control, regardless of focus.
- **Specialized Input**: You're building a custom input experience where focus doesn't drive the keyboard target.

### Choose VirtualKeyboardScope when:
- 
- **Standard Input**: You want the keyboard to follow focus automatically.
- **Simpler Integration**: You prefer a container-based approach with fewer configuration options.
- **Automatic Visibility**: You want automatic show/hide behavior based on focus changes.

## Best Practices

1. **Set a Valid Target**:
   - Always set the `Target` property to a valid input element that can receive keystrokes.
   - Without a valid target, keyboard input will have nowhere to go.

2. **Keyboard Placement**:
   - Position the keyboard where it won't obscure important content, typically at the bottom of the screen.
   - Unlike `VirtualKeyboardScope`, `VirtualKeyboard` doesn't automatically manage content scrolling.

3. **Input Methods Selection**:
   - Choose input methods appropriate for your target audience.
   - For international applications, include layouts for all supported regions.

4. **Memory Management**:
   - If creating keyboards dynamically, remember to remove them from the visual tree when no longer needed.

5. **Responsive Design**:
   - Plan your layout to accommodate the keyboard's space requirements.
   - Consider using a Grid with row definitions to allocate space for the keyboard.

## Related Components

- [VirtualKeyboardScope](virtual-keyboard-scope.md) - A container control that automatically manages keyboard visibility
- [Input Method Identifiers](input-method-identifiers.md) - List of available input method IDs
