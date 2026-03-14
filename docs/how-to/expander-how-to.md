---
id: expander-how-to
title: "How to: Work with Expander"
description: Learn how to use the Avalonia Expander control for collapsible content sections, accordion patterns, animated transitions, state binding, and custom headers.
doc-type: how-to
---

This guide covers common [`Expander`](/api/avalonia/controls/expander) scenarios including basic usage, accordion patterns, animated expansion, binding state, and custom headers.

## Basic expander

The simplest `Expander` wraps content you want to show or hide behind a clickable header:

```xml
<Expander Header="Advanced Options">
    <StackPanel Spacing="8" Margin="8">
        <CheckBox Content="Enable logging" />
        <CheckBox Content="Verbose output" />
    </StackPanel>
</Expander>
```

The `Expander` can host any single child element. If you need multiple controls, wrap them in a layout panel such as `StackPanel` or `Grid`.

## Initially expanded

Set `IsExpanded` to `True` so the content is visible when the control first loads:

```xml
<Expander Header="Details" IsExpanded="True">
    <TextBlock Text="This content is visible by default." TextWrapping="Wrap" />
</Expander>
```

:::tip
Use an initially expanded `Expander` for content that most users need to see right away, while still allowing them to collapse it to save space.
:::

## Binding `IsExpanded`

You can track expansion state in your view model so other parts of your UI can react to it:

```csharp
[ObservableProperty]
private bool _showAdvanced;
```

```xml
<Expander Header="Advanced" IsExpanded="{Binding ShowAdvanced}">
    <StackPanel Spacing="8">
        <TextBox PlaceholderText="Custom path" />
    </StackPanel>
</Expander>
```

This two-way binding keeps the view model property in sync whenever the user opens or closes the `Expander`.

## Expand direction

The [`ExpandDirection`](/api/avalonia/controls/expanddirection) property controls which direction the content expands relative to the header:

```xml
<!-- Expands upward -->
<Expander ExpandDirection="Up" Header="Details" VerticalAlignment="Bottom">
    <TextBlock Text="Content above the header" />
</Expander>

<!-- Expands to the right -->
<Expander ExpandDirection="Right" Header="More">
    <TextBlock Text="Content beside the header" />
</Expander>
```

| Value | Description |
|---|---|
| `Down` | Content appears below the header (default). |
| `Up` | Content appears above the header. |
| `Left` | Content appears to the left of the header. |
| `Right` | Content appears to the right of the header. |

:::note
When you use `Up`, place the `Expander` at the bottom of its parent (for example, with `VerticalAlignment="Bottom"`) so the expanded content has room to grow upward. The same principle applies to `Left` and `Right` with horizontal alignment.
:::

## Custom header with icon

Use `Expander.Header` to place rich content in the header area:

```xml
<Expander>
    <Expander.Header>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <PathIcon Data="{StaticResource settings_regular}" Width="16" />
            <TextBlock Text="Settings" VerticalAlignment="Center" />
        </StackPanel>
    </Expander.Header>
    <StackPanel Spacing="8" Margin="8">
        <TextBlock Text="Configuration options here" />
    </StackPanel>
</Expander>
```

Because `Header` is of type `object`, you can assign any control tree. Common patterns include icons paired with text, badges, or status indicators.

## Accordion pattern (single open)

To allow only one `Expander` to be open at a time, bind each `IsExpanded` property to a shared backing field in your view model:

```csharp
public partial class AccordionViewModel : ObservableObject
{
    [ObservableProperty]
    private int _openSection = -1;

    public bool IsSection0Open
    {
        get => OpenSection == 0;
        set { if (value) OpenSection = 0; else if (OpenSection == 0) OpenSection = -1; }
    }

    public bool IsSection1Open
    {
        get => OpenSection == 1;
        set { if (value) OpenSection = 1; else if (OpenSection == 1) OpenSection = -1; }
    }

    public bool IsSection2Open
    {
        get => OpenSection == 2;
        set { if (value) OpenSection = 2; else if (OpenSection == 2) OpenSection = -1; }
    }

    partial void OnOpenSectionChanged(int value)
    {
        OnPropertyChanged(nameof(IsSection0Open));
        OnPropertyChanged(nameof(IsSection1Open));
        OnPropertyChanged(nameof(IsSection2Open));
    }
}
```

```xml
<StackPanel Spacing="4">
    <Expander Header="General" IsExpanded="{Binding IsSection0Open}">
        <TextBlock Text="General content" Margin="8" />
    </Expander>
    <Expander Header="Appearance" IsExpanded="{Binding IsSection1Open}">
        <TextBlock Text="Appearance content" Margin="8" />
    </Expander>
    <Expander Header="Advanced" IsExpanded="{Binding IsSection2Open}">
        <TextBlock Text="Advanced content" Margin="8" />
    </Expander>
</StackPanel>
```

Setting `OpenSection` to `-1` means all sections are collapsed. When the user opens one section, the previously open section closes automatically.

## Animated content transition

Add a `ContentTransition` for a smooth expand and collapse animation:

```xml
<Expander Header="Animated Section">
    <Expander.ContentTransition>
        <CrossFade Duration="0:0:0.2" />
    </Expander.ContentTransition>
    <StackPanel Spacing="8" Margin="8">
        <TextBlock Text="This content fades in and out." />
    </StackPanel>
</Expander>
```

You can substitute `CrossFade` with other transition types such as `PageSlide` or `CompositePageTransition`. See [Page transitions](../graphics-animation/page-transitions.md) for a full list of built-in options.

## Responding to expand and collapse events

Handle expansion state changes in code-behind by subscribing to the `IsExpandedChanged` event:

```csharp
private void Expander_IsExpandedChanged(object sender, RoutedEventArgs e)
{
    if (sender is Expander expander && expander.IsExpanded)
    {
        // Load data when first expanded
    }
}
```

```xml
<Expander Header="Lazy Content"
          PropertyChanged="Expander_IsExpandedChanged" />
```

Alternatively, use a property-changed callback in your view model for the same effect without code-behind:

```csharp
[ObservableProperty]
private bool _isDetailsOpen;

partial void OnIsDetailsOpenChanged(bool value)
{
    if (value)
        LoadDetails();
}
```

:::tip
Lazy loading is a useful pattern for expanders that contain expensive-to-render content. Defer the work until the user actually opens the section.
:::

## Styling the expander

### Remove the border

You can strip the default border and background to create a more minimal look:

```xml
<Expander.Styles>
    <Style Selector="Expander">
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="Background" Value="Transparent" />
    </Style>
</Expander.Styles>
```

### Custom expand icon

Override the template toggle button to change the expand/collapse indicator:

```xml
<Expander.Styles>
    <Style Selector="Expander /template/ ToggleButton#PART_toggle">
        <!-- Override the toggle button appearance -->
    </Style>
</Expander.Styles>
```

### Disabled state

When you set `IsEnabled="False"` on an `Expander`, the header is no longer interactive and the user cannot toggle the content. The expand/collapse state at the time of disabling is preserved.

```xml
<Expander Header="Read-only section" IsEnabled="False" IsExpanded="True">
    <TextBlock Text="This section cannot be collapsed." Margin="8" />
</Expander>
```

## Key properties reference

| Property | Type | Description |
|---|---|---|
| `Header` | `object` | Content shown in the always-visible header area. |
| `IsExpanded` | `bool` | Whether the content section is visible. Default is `False`. |
| `ExpandDirection` | `ExpandDirection` | Direction content expands: `Down`, `Up`, `Left`, `Right`. Default is `Down`. |
| `ContentTransition` | `IPageTransition` | Animation used for expand and collapse. |
| `IsEnabled` | `bool` | Whether the user can interact with the header to toggle expansion. |

## See also

- [Expander control reference](../../controls/layout/containers/expander.md): Full property and event tables.
- [Page transitions](../graphics-animation/page-transitions.md): Transition types you can use for content animation.
- [Introduction to data binding](../data-binding/introduction-to-data-binding.md): Fundamentals of binding properties like `IsExpanded` to your view model.
