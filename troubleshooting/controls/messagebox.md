---
id: messagebox
title: MessageBox
description: Learn why Avalonia does not include a built-in MessageBox and how to add message box functionality using third-party libraries.
doc-type: troubleshooting
---

Avalonia does not include a built-in `MessageBox` control. This is a deliberate design choice, as Avalonia targets multiple platforms (desktop, mobile, browser) where a traditional modal message box does not always make sense. The feature is under consideration for future development.

For updates and discussion, see the [MessageBox feature request](https://github.com/AvaloniaUI/Avalonia/issues/670) on GitHub.

## Adding message box functionality to your app

Because there is no native `MessageBox` API, you need to use a third-party library or build your own dialog. Follow these steps to get started with a community package:

### Step 1: Choose a library

Review the options listed below and pick one that fits your project. Some are free and open-source, while others are commercial (marked with `$`).

### Step 2: Install the NuGet package

Install the package using the .NET CLI or your IDE's NuGet package manager. For example, to install `MessageBox.Avalonia`:

```bash
dotnet add package MessageBox.Avalonia
```

### Step 3: Show a message box

Each library has its own API. The following example uses `MessageBox.Avalonia` to display a simple informational dialog:

```csharp
using MsBox.Avalonia;
using MsBox.Avalonia.Enums;

var box = MessageBoxManager
    .GetMessageBoxStandard("Title", "Hello from Avalonia!", ButtonEnum.Ok);

await box.ShowAsync();
```

If you need to capture the user's response (for example, OK vs. Cancel), store the return value:

```csharp
var result = await box.ShowAsync();

if (result == ButtonResult.Ok)
{
    // Handle confirmation
}
```

### Step 4: Handle platform differences

Keep the following edge cases in mind:

- **Browser and mobile targets**: Modal dialogs may not behave the same way as on desktop. Some libraries render the dialog inline rather than as a separate window. Test your chosen library on every platform you plan to support.
- **Single-view applications**: If your app uses `SingleViewApplicationLifetime` (common on mobile and browser), you cannot create a new `Window` to host a dialog. Use a library that supports overlay or in-app dialog rendering, such as `DialogHost.Avalonia`.
- **Threading**: Always show dialogs on the UI thread. If you are calling from a background thread, dispatch the call using `Dispatcher.UIThread.InvokeAsync`.

## Third-party `MessageBox` implementations

| Library | Type |
|---|---|
| [MessageBox.Avalonia](https://github.com/AvaloniaCommunity/MessageBox.Avalonia) | Free / Open-source |
| [DialogHost.Avalonia](https://github.com/AvaloniaUtils/DialogHost.Avalonia) | Free / Open-source |
| [Ursa.Avalonia](https://github.com/irihitech/Ursa.Avalonia) | Free / Open-source |
| [AtomUI.Avalonia](https://github.com/chinware/AtomUI) | Free / Open-source |
| [Actipro Avalonia UI Controls](https://www.actiprosoftware.com/products/controls/avalonia) | Commercial |
| [Eremex Avalonia UI Controls](https://eremexcontrols.net/controls/windows-and-dialogs/messagebox/) | Commercial |

## Building your own message box

If you prefer not to take a dependency on a third-party package, you can create a simple dialog window yourself:

1. Create a new `Window` with the message content and buttons laid out in AXAML.
2. Open it using `window.ShowDialog(ownerWindow)`, which returns a `Task` you can `await`.
3. Set the dialog result before closing by assigning a value to `Window.Close(result)`.

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Confirm"
        Width="300" Height="150"
        WindowStartupLocation="CenterOwner">
    <StackPanel Margin="20" Spacing="16">
        <TextBlock Text="Are you sure?" />
        <StackPanel Orientation="Horizontal" HorizontalAlignment="Right" Spacing="8">
            <Button Content="Yes" Click="OnYesClick" />
            <Button Content="No" Click="OnNoClick" />
        </StackPanel>
    </StackPanel>
</Window>
```

```csharp
public partial class ConfirmDialog : Window
{
    public ConfirmDialog()
    {
        InitializeComponent();
    }

    private void OnYesClick(object? sender, RoutedEventArgs e)
    {
        Close(true);
    }

    private void OnNoClick(object? sender, RoutedEventArgs e)
    {
        Close(false);
    }
}
```

To show the dialog and read the result:

```csharp
var dialog = new ConfirmDialog();
var result = await dialog.ShowDialog<bool>(this);

if (result)
{
    // User clicked Yes
}
```

This approach only works in desktop applications that use `ClassicDesktopStyleApplicationLifetime`. For single-view apps, you need an overlay-based solution instead.

## See also

- [Window control](../../reference/controls/window)
- [Dialog documentation](../../guides/building-cross-platform-applications/dealing-with-platforms#dialogs)
- [MessageBox feature request (GitHub)](https://github.com/AvaloniaUI/Avalonia/issues/670)
