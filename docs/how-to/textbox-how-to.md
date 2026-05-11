---
id: textbox-how-to
title: "How to: Work with TextBox"
description: Validation, formatting, input masking, selection, and TextBox customization in Avalonia.
doc-type: how-to
---

This guide covers common TextBox scenarios: validation, formatting, input masking, selection, and customization.

## Basic Text Binding

Bind the `Text` property with `TwoWay` mode (the default for TextBox.Text):

```xml
<TextBox Text="{Binding Username}" PlaceholderText="Enter username" />
```

```csharp
[ObservableProperty]
private string _username = "";
```

## Placeholder Text

Show hint text when the TextBox is empty:

```xml
<TextBox PlaceholderText="Search..." />
<TextBox PlaceholderText="Enter email address" />
```

The placeholder disappears when the user starts typing and reappears when the text is cleared.

To customize the placeholder color, set `PlaceholderForeground`:

```xml
<TextBox PlaceholderText="Search..." PlaceholderForeground="Gray" />
```

By default, placeholder text is rendered at 50% opacity. Override the `TextControlPlaceholderOpacity` theme resource to change this globally, for example to improve contrast for accessibility:

```xml
<Application.Resources>
    <x:Double x:Key="TextControlPlaceholderOpacity">0.7</x:Double>
</Application.Resources>
```

## Password Input

Hide typed characters using `PasswordChar`:

```xml
<TextBox PasswordChar="*" PlaceholderText="Password" />
<TextBox PasswordChar="●" PlaceholderText="Password" />
```

For a reveal toggle, bind `RevealPassword`:

```xml
<Grid ColumnDefinitions="*,Auto">
    <TextBox x:Name="PasswordBox" PasswordChar="●" Text="{Binding Password}" />
    <ToggleButton Grid.Column="1" Content="Show"
                  IsChecked="{Binding #PasswordBox.RevealPassword}" />
</Grid>
```

## Multi-Line Input

Enable multi-line text entry:

```xml
<TextBox AcceptsReturn="True"
         TextWrapping="Wrap"
         Height="120"
         PlaceholderText="Enter your message..." />
```

| Property | Effect |
|---|---|
| `AcceptsReturn="True"` | Allows pressing Enter to create new lines |
| `TextWrapping="Wrap"` | Wraps long lines instead of scrolling horizontally |
| `AcceptsTab="True"` | Allows pressing Tab to insert tab characters |

## Read-Only and Disabled

```xml
<!-- Read-only: can select and copy, but not edit -->
<TextBox Text="{Binding DisplayValue}" IsReadOnly="True" />

<!-- Disabled: cannot interact at all -->
<TextBox Text="{Binding DisabledValue}" IsEnabled="False" />
```

## Text Selection

### Select all on focus

Select all text when the TextBox receives focus:

```csharp
private void OnTextBoxGotFocus(object? sender, GotFocusEventArgs e)
{
    if (sender is TextBox textBox)
    {
        textBox.SelectAll();
    }
}
```

```xml
<TextBox GotFocus="OnTextBoxGotFocus" Text="{Binding Value}" />
```

### Programmatic selection

```csharp
// Select a range
myTextBox.SelectionStart = 5;
myTextBox.SelectionEnd = 10;

// Select all
myTextBox.SelectAll();

// Get selected text
string selected = myTextBox.SelectedText;
```

## Input Validation

### With data annotations

Use `INotifyDataErrorInfo` to show validation errors directly on the TextBox:

```csharp
public partial class FormViewModel : ObservableValidator
{
    [ObservableProperty]
    [NotifyDataErrorInfo]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    private string _email = "";
}
```

```xml
<TextBox Text="{Binding Email}" PlaceholderText="Email" />
```

When validation fails, the TextBox displays a red border and error message. See [Validation in Data Binding](/docs/data-binding/binding-validation) for details.

### Restricting input characters

Handle the `TextChanging` event to filter input:

```csharp
private void OnTextChanging(object? sender, TextChangingEventArgs e)
{
    // Allow only digits
    if (sender is TextBox textBox)
    {
        var newText = textBox.Text;
        if (newText is not null && !newText.All(char.IsDigit))
        {
            e.Cancel = true;
        }
    }
}
```

## Max Length

Limit the number of characters:

```xml
<TextBox MaxLength="50" PlaceholderText="Max 50 characters" />
```

## Text Changed Event

React to text changes for search-as-you-type or live preview:

```xml
<TextBox Text="{Binding SearchText}" />
```

```csharp
[ObservableProperty]
private string _searchText = "";

partial void OnSearchTextChanged(string value)
{
    ApplyFilter(value);
}
```

For debounced search (avoiding filtering on every keystroke), see [Performance](/docs/app-development/performance#debounce-rapid-input).

## Inner Content (Left/Right)

Add icons or buttons inside the TextBox using `InnerLeftContent` and `InnerRightContent`:

```xml
<TextBox PlaceholderText="Search..." InnerLeftContent="🔍">
    <TextBox.InnerRightContent>
        <Button Content="✕" Command="{Binding ClearSearchCommand}"
                Background="Transparent" BorderThickness="0"
                Padding="4" />
    </TextBox.InnerRightContent>
</TextBox>
```

## Undo and Redo

TextBox supports undo/redo with standard keyboard shortcuts (Ctrl+Z / Ctrl+Shift+Z). These work automatically with no additional code.

To clear the undo history:

```csharp
myTextBox.Clear(); // Clears text and undo history
```

## Styling

### Custom appearance

```xml
<Style Selector="TextBox.custom">
    <Setter Property="Background" Value="#F8F8F8" />
    <Setter Property="BorderBrush" Value="#E0E0E0" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="CornerRadius" Value="8" />
    <Setter Property="Padding" Value="12,8" />
</Style>

<Style Selector="TextBox.custom:focus">
    <Setter Property="BorderBrush" Value="#6366F1" />
    <Setter Property="BorderThickness" Value="2" />
</Style>

<Style Selector="TextBox.custom:error">
    <Setter Property="BorderBrush" Value="#EF4444" />
</Style>
```

### Removing the focus border

```xml
<Style Selector="TextBox.borderless">
    <Setter Property="BorderThickness" Value="0" />
    <Setter Property="Background" Value="Transparent" />
</Style>

<Style Selector="TextBox.borderless:focus">
    <Setter Property="BorderThickness" Value="0" />
</Style>
```

## Context Menu

TextBox has a built-in context menu with Cut, Copy, and Paste. To customize it:

```xml
<TextBox Text="{Binding Value}">
    <TextBox.ContextMenu>
        <ContextMenu>
            <MenuItem Header="Cut" Command="{Binding $parent[TextBox].Cut}" InputGesture="Ctrl+X" />
            <MenuItem Header="Copy" Command="{Binding $parent[TextBox].Copy}" InputGesture="Ctrl+C" />
            <MenuItem Header="Paste" Command="{Binding $parent[TextBox].Paste}" InputGesture="Ctrl+V" />
            <Separator />
            <MenuItem Header="Select All" InputGesture="Ctrl+A" />
        </ContextMenu>
    </TextBox.ContextMenu>
</TextBox>
```

## See Also

- [TextBox Control Reference](/controls/input/text-input/textbox): Property summary.
- [Validation in Data Binding](/docs/data-binding/binding-validation): Data annotation and INotifyDataErrorInfo validation.
- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding modes and parameters.
