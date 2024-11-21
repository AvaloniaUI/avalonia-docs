---
id: macos
title: macOS
---

## Key Mapping

macOS has different modifier keys to Windows and Linux. By default modifier keys are mapped as follows:

- Control -> `Key.LeftCtrl` / `Key.RightCtrl` / `ModifierKeys.Control`
- Option -> `Key.LeftAlt` / `Key.RightAlt` / `ModifierKeys.Alt`
- Command -> `Key.LWin` / `Key.RWin` / `ModifierKeys.Windows`

However there are problems with this mapping:

1. macOS applications generally use the Command key where the Control key would usually be used on Windows and Linux. For example "Copy" is Command-C on macOS instead of Control+C
2. `ModifierKeys.Windows` is actually [not set in `Keyboard.Modifiers` in WPF](https://github.com/dotnet/wpf/blob/6634719e22053aab8e5e0db37618170494aea334/src/Microsoft.DotNet.Wpf/src/PresentationCore/System/Windows/Input/KeyboardDevice.cs#L207-L219)
3. Common controls such as text boxes are expected to have different keyboard shortcuts in macOS, such as "Move the insertion point to the beginning of the previous word" being Option+Left Arrow on macOS instead of Control+Left Arrow

## Automatic macOS Key Mapping

To fix many of these problems, one can call the `XpfKeyboard.MapMacOSKeys()` method on startup. This would usually be done in the same place as [the XPF WinAPI shim setup](../third-party-libraries); that is, in the constructor of your `App` class or `Program.Main`:

```csharp
using System.Windows;
using Atlantis;

namespace XpfKeyboardMappingExample;

public partial class App : Application
{
    public App()
    {
        XpfKeyboard.MapMacOSKeys();
    }
}
```

Calling this method on macOS:

- Maps the Command key to the Control key
- Maps some common text box keyboard shortcuts to their XPF equivalents
  - Command+Left -> Home
  - Command+Right -> End
  - Option+Left Arrow-> Ctrl+Left Arrow
  - Option+Left Arrow -> Ctrl+Left Arrow

## Automatic macOS Keyboard Mapping

For more flexible key mapping you can [add custom key mappings](../advanced/key-mapping).