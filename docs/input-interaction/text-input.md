---
id: text-input
title: Text Input and IME
---

Avalonia supports text input from keyboards, on-screen keyboards, and Input Method Editors (IMEs) for languages that require character composition, such as Chinese, Japanese, and Korean.

## How text input works

Text input in Avalonia flows through several stages:

1. **KeyDown/KeyUp events** fire for raw key presses.
2. The platform's input method processes key combinations into characters.
3. **TextInput events** fire with the final composed text.

For most applications, you do not need to handle text input directly. Controls like [`TextBox`](/api/avalonia/controls/textbox) and `AutoCompleteBox` handle all text input automatically. This page covers scenarios where you need custom text input behavior.

## TextInput event

The `TextInput` event delivers composed text after IME processing. Unlike `KeyDown`, which provides the physical key pressed, `TextInput` provides the actual character(s) the user intended to type:

```csharp
myControl.AddHandler(InputElement.TextInputEvent, OnTextInput);

private void OnTextInput(object? sender, TextInputEventArgs e)
{
    // e.Text contains the composed character(s)
    if (e.Text is not null)
    {
        ProcessInput(e.Text);
    }
}
```

### When to use TextInput vs KeyDown

| Scenario | Use |
|---|---|
| Processing typed characters (text editing) | `TextInput` |
| Detecting modifier keys (Ctrl+S, Alt+F4) | `KeyDown` |
| Handling arrow keys, Enter, Escape | `KeyDown` |
| IME-aware text processing | `TextInput` |

:::tip
If you handle `KeyDown` to process typed text, you will miss IME-composed characters and may incorrectly handle dead keys (accent composition). Always use `TextInput` for character input.
:::

## Input method editors (IME)

IMEs allow users to type complex scripts by composing characters from multiple key presses. For example, typing "ni hao" on a Chinese IME produces "你好".

### IME composition in TextBox

`TextBox` supports IME composition out of the box. During composition:
- The in-progress text appears with an underline decoration
- The user can select from candidate characters
- Pressing Enter or selecting a candidate commits the text

No additional configuration is needed.

### Enabling IME on custom controls

If you build a custom text input control, you need to implement `ITextInputMethodClient` and register it with the text input method system:

```csharp
public class MyTextControl : Control, ITextInputMethodClient
{
    protected override void OnGotFocus(GotFocusEventArgs e)
    {
        base.OnGotFocus(e);
        var method = TopLevel.GetTopLevel(this)?.TextInputMethod;
        method?.SetClient(this);
    }

    protected override void OnLostFocus(RoutedEventArgs e)
    {
        base.OnLostFocus(e);
        var method = TopLevel.GetTopLevel(this)?.TextInputMethod;
        method?.SetClient(null);
    }

    // ITextInputMethodClient implementation
    public bool SupportsPreedit => true;
    public bool SupportsSurroundingText => false;

    public void SetPreeditText(string? preeditText)
    {
        // Display the in-progress composition text
    }

    // Additional interface members...
}
```

### Requesting the on-screen keyboard from a custom control

Custom text input controls that extend `TextInputMethodClient` can request the on-screen keyboard by raising the `InputPaneActivationRequested` event. The platform handles showing the input pane in response:

```csharp
public class MyTextInputClient : TextInputMethodClient
{
    public void OnTapped()
    {
        // Request the platform to show the on-screen keyboard
        RaiseInputPaneActivationRequested();
    }
}
```

## On-screen keyboards

On touch devices and mobile platforms, Avalonia can show the platform's on-screen keyboard when a text input control receives focus.

### Controlling keyboard visibility

Use the `InputPane` service to monitor or control the on-screen keyboard:

```csharp
var inputPane = TopLevel.GetTopLevel(this)?.InputPane;
if (inputPane is not null)
{
    inputPane.StateChanged += (sender, e) =>
    {
        if (e.NewState == InputPaneState.Open)
        {
            // Adjust layout to accommodate keyboard
        }
    };
}
```

### Keyboard types on mobile

On Android and iOS, the `InputScope` property on `TextBox` can hint which keyboard layout to show:

```xml
<!-- Numeric keyboard -->
<TextBox InputScope="Number" />

<!-- Email keyboard (with @ key) -->
<TextBox InputScope="EmailSmtpAddress" />

<!-- URL keyboard -->
<TextBox InputScope="Url" />

<!-- Phone dialer -->
<TextBox InputScope="TelephoneNumber" />
```

## Platform considerations

| Feature | Windows | macOS | Linux | Android/iOS | WebAssembly |
|---|---|---|---|---|---|
| IME support | Full | Full | Full (via IBus/Fcitx) | Full (platform IME) | Partial |
| On-screen keyboard | Touch devices | Touch Bar | Virtual keyboard | Full | Browser-managed |
| Dead keys | Supported | Supported | Supported | N/A | Browser-managed |

## See also

- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Key bindings and keyboard shortcuts.
- [Input Pane](/docs/services/input-pane): On-screen keyboard service.
- [TextBox Control](/controls/input/text-input/textbox): Built-in text input control.
