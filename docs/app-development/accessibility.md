---
id: accessibility
title: Accessibility
description: Implement accessible Avalonia apps with AutomationProperties, keyboard navigation, and custom peers.
doc-type: overview
---

Avalonia includes built-in accessibility support through automation peers, which expose your UI to assistive technologies like screen readers. This page covers how to make your Avalonia application accessible to all users.

## How accessibility works in Avalonia

Avalonia's accessibility model uses **automation peers**, similar to WPF and UWP. Each control has an associated `AutomationPeer` that describes the control's role, state, and content to the platform's accessibility API (UI Automation on Windows, NSAccessibility on macOS, AT-SPI on Linux).

Most built-in controls create their automation peers automatically. A `Button` reports itself as a button, a `TextBox` as an editable text field, a `CheckBox` as a checkbox, and so on.

## AutomationProperties

The `AutomationProperties` class provides attached properties that supply accessibility metadata to controls. These properties do not affect the visual appearance of your UI. They are consumed only by assistive technologies.

### Name

The most important accessibility property. It provides the text that a screen reader announces when the control receives focus:

```xml
<Button AutomationProperties.Name="Submit order"
        Content="{Binding SubmitIcon}" />
```

If a control displays text content (e.g., `Button` with a string `Content`, `TextBlock`), the automation peer uses that text automatically. Set `Name` explicitly when:
- The content is an image or icon with no text
- The visible text is ambiguous without context (e.g., multiple "Edit" buttons)
- The control has no visible content

### HelpText

Provides additional descriptive text, typically announced after the control name:

```xml
<TextBox AutomationProperties.Name="Email"
         AutomationProperties.HelpText="Enter your email address to receive notifications" />
```

### LabeledBy

Associates a control with a label control, using the label's text as the accessible name:

```xml
<TextBlock x:Name="NameLabel" Text="Full Name:" />
<TextBox AutomationProperties.LabeledBy="{Binding #NameLabel}" />
```

### AutomationId

A stable identifier for UI automation testing. Unlike `Name`, this value is not localized and does not change with the display language:

```xml
<Button AutomationProperties.AutomationId="SubmitOrderButton"
        Content="Submit" />
```

### AcceleratorKey and AccessKey

Communicate keyboard shortcuts to assistive technologies:

```xml
<Button AutomationProperties.AcceleratorKey="Ctrl+S"
        Content="Save" />

<Button AutomationProperties.AccessKey="Alt+S"
        Content="_Save" />
```

### ControlTypeOverride

Overrides the control type reported to assistive technologies. Use this when a custom control should be announced as a specific standard type:

```xml
<Border AutomationProperties.ControlTypeOverride="Button"
        AutomationProperties.Name="Custom button"
        PointerPressed="OnBorderClick">
    <TextBlock Text="Click me" />
</Border>
```

### LandmarkType

Identifies a region of the UI as a landmark for navigation. Screen readers allow users to jump between landmarks:

```xml
<StackPanel AutomationProperties.LandmarkType="Navigation">
    <!-- Navigation menu -->
</StackPanel>

<ScrollViewer AutomationProperties.LandmarkType="Main">
    <!-- Main content -->
</ScrollViewer>
```

Available landmark types: `Banner`, `Complementary`, `ContentInfo`, `Region`, `Form`, `Main`, `Navigation`, and `Search`.

:::note
On Windows, `AccessibilityView` must be set to at least `Control` for Narrator to detect landmarks and enable landmark navigation shortcuts (Narrator+N).
:::

### HeadingLevel

Marks a control as a heading at a specific level. Screen readers use headings for document navigation. Use values 1 through 6 for cross-platform compatibility (macOS supports levels 0-6, Windows supports 1-9):

```xml
<TextBlock AutomationProperties.HeadingLevel="1"
           Text="Settings" FontSize="24" />

<TextBlock AutomationProperties.HeadingLevel="2"
           Text="Appearance" FontSize="18" />
```

### LiveSetting

Controls how dynamic content changes are announced by screen readers:

```xml
<!-- Polite: announced when the screen reader is idle -->
<TextBlock AutomationProperties.LiveSetting="Polite"
           Text="{Binding StatusMessage}" />

<!-- Assertive: announced immediately, interrupting current speech -->
<TextBlock AutomationProperties.LiveSetting="Assertive"
           Text="{Binding ErrorMessage}" />
```

### ItemStatus

Describes the current status of an element. Screen readers announce this text to provide context about the element's state:

```xml
<ListBoxItem AutomationProperties.ItemStatus="Downloading (45%)"
             Content="{Binding FileName}" />
```

### ItemType

Describes the type of an element in terms meaningful to the user. This supplements the control type with application-specific context:

```xml
<ListBoxItem AutomationProperties.ItemType="PDF Document"
             Content="{Binding FileName}" />
```

### AccessibilityView

Controls whether a control appears in the automation tree:

```xml
<!-- Remove decorative elements from the accessibility tree -->
<Image Source="decorative-line.png"
       AutomationProperties.AccessibilityView="Raw" />
```

| Value | Meaning |
|---|---|
| `Default` | Determined by the control's automation peer |
| `Raw` | Included only in the raw (unfiltered) tree |
| `Control` | Included in the control view |
| `Content` | Included in the content view |

## Keyboard accessibility

Accessible applications must be fully operable with a keyboard alone:

### Tab navigation

Ensure all interactive controls are reachable by Tab. Set `IsTabStop="True"` on controls that should participate in tab navigation, and use `TabIndex` to control the order:

```xml
<TextBox TabIndex="1" />
<TextBox TabIndex="2" />
<Button TabIndex="3" Content="Submit" />
```

See [Focus](/docs/input-interaction/focus) for the full keyboard navigation model, including `KeyboardNavigation.TabNavigation` modes and `XYFocus` directional navigation.

### Keyboard shortcuts

Provide keyboard equivalents for pointer-only interactions using `HotKey` or `KeyBinding`:

```xml
<Button Content="_Save" HotKey="Ctrl+S" Command="{Binding SaveCommand}" />
```

The underscore prefix creates an access key (Alt+S on Windows/Linux). See [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys) for details.

### Focus indicators

Ensure focus is visible. Avalonia shows a `FocusAdorner` (a border around the focused control) by default when `:focus-visible` is active. If you create custom control templates, verify that focus remains visible:

```xml
<Style Selector="Button.custom:focus-visible">
    <Setter Property="BorderBrush" Value="{DynamicResource SystemAccentColor}" />
    <Setter Property="BorderThickness" Value="2" />
</Style>
```

## Creating custom automation peers

When you build a custom control, Avalonia may not have enough information to describe it to assistive technologies. Override `OnCreateAutomationPeer` to provide a custom peer:

```csharp
public class RatingControl : Control
{
    public static readonly StyledProperty<int> ValueProperty =
        AvaloniaProperty.Register<RatingControl, int>(nameof(Value));

    public int Value
    {
        get => GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }

    protected override AutomationPeer OnCreateAutomationPeer()
    {
        return new RatingControlAutomationPeer(this);
    }
}

public class RatingControlAutomationPeer : ControlAutomationPeer
{
    public RatingControlAutomationPeer(RatingControl owner) : base(owner) { }

    protected override AutomationControlType GetAutomationControlTypeCore()
        => AutomationControlType.Slider;

    protected override string? GetNameCore()
        => $"Rating: {((RatingControl)Owner).Value} out of 5";
}
```

### Key methods to override

| Method | Purpose |
|---|---|
| `GetAutomationControlTypeCore()` | The type of control (Button, TextBox, Slider, and similar) |
| `GetNameCore()` | The accessible name announced by screen readers |
| `GetHelpTextCore()` | Additional descriptive text |
| `GetAutomationIdCore()` | A stable identifier for testing |
| `IsContentElementCore()` | Whether the control appears in the content view |
| `IsControlElementCore()` | Whether the control appears in the control view |

## Data validation errors

Validation errors are automatically exposed to assistive technologies. When a control such as a `TextBox` has validation errors (from data annotations, `INotifyDataErrorInfo`, or exceptions), the `DataValidationErrors` control reports them as help text through its automation peer. Screen readers announce these errors when the control receives focus, with validation error text taking priority over tooltip text.

No additional configuration is required. As long as your controls use Avalonia's [data validation](/docs/data-binding/data-validation) system, the errors are accessible by default.

## Accessibility checklist

Use this checklist when reviewing your application:

- All interactive controls are reachable by keyboard (Tab/Shift+Tab)
- Focus indicators are clearly visible on all focusable controls
- Images and icons have accessible names via `AutomationProperties.Name`
- Form fields are labeled (via `AutomationProperties.Name`, `AutomationProperties.LabeledBy`, or text content)
- Dynamic content uses `AutomationProperties.LiveSetting` for announcements
- Color is not the only way to convey information (use shape, text, or icons as well)
- Text meets minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Custom controls have appropriate automation peers
- Decorative elements are excluded from the automation tree

## Platform support

Avalonia's accessibility support varies by platform:

| Platform | Accessibility API | Status |
|---|---|---|
| Windows | UI Automation (UIA) | Full support |
| macOS | NSAccessibility | Full support |
| Linux | [AT-SPI2](/docs/platform-specific-guides/linux#accessibility) | Full support |
| iOS | UIAccessibility | Supported |
| Android | AccessibilityNodeInfo | Supported |
| Browser (WASM) | ARIA attributes | Partial support |

On Linux, Avalonia automatically exposes the accessibility tree over D-Bus when AT-SPI2 is available. Screen readers such as Orca can discover and interact with all standard Avalonia controls. See the [Linux platform guide](/docs/platform-specific-guides/linux#accessibility) for setup and testing instructions.

## See also

- [Focus](/docs/input-interaction/focus): Keyboard focus navigation and tab ordering.
- [Keyboard and Hotkeys](/docs/input-interaction/keyboard-and-hotkeys): Keyboard shortcuts and access keys.
- [Custom Controls](/docs/custom-controls): Building custom controls with proper accessibility support.
- [Desktop Linux](/docs/platform-specific-guides/linux#accessibility): Testing accessibility with Orca and Accerciser on Linux.
