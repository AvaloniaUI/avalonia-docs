---
id: expander-how-to
title: "How to: Work with Expander"
description: Basic usage, accordion patterns, animated expansion, state binding, and custom Expander headers.
doc-type: how-to
---

This guide covers common Expander scenarios: basic usage, accordion patterns, animated expansion, binding state, and custom headers.

## Basic Expander

```xml
<Expander Header="Advanced Options">
    <StackPanel Spacing="8" Margin="8">
        <CheckBox Content="Enable logging" />
        <CheckBox Content="Verbose output" />
    </StackPanel>
</Expander>
```

## Initially Expanded

Set `IsExpanded` to `true` so the content is visible on load:

```xml
<Expander Header="Details" IsExpanded="True">
    <TextBlock Text="This content is visible by default." TextWrapping="Wrap" />
</Expander>
```

## Binding IsExpanded

Track expansion state in the view model:

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

## Expand Direction

The `ExpandDirection` property controls which direction the content expands:

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

## Custom Header with Icon

Use `Expander.Header` to add rich content to the header area:

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

## Accordion Pattern (Single Open)

Allow only one expander to be open at a time by binding each to a shared property:

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

## Animated Content Transition

Add a content transition for smooth expand/collapse:

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

## Responding to Expand/Collapse Events

Handle expansion state changes in code-behind:

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
          PropertyChanged="Expander_IsExpandedChanged">
```

Or use a property changed callback in the view model:

```csharp
[ObservableProperty]
private bool _isDetailsOpen;

partial void OnIsDetailsOpenChanged(bool value)
{
    if (value)
        LoadDetails();
}
```

## Styling the Expander

### Remove the border

```xml
<Expander.Styles>
    <Style Selector="Expander">
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="Background" Value="Transparent" />
    </Style>
</Expander.Styles>
```

### Custom expand icon

```xml
<Expander.Styles>
    <Style Selector="Expander /template/ ToggleButton#PART_toggle">
        <!-- Override the toggle button appearance -->
    </Style>
</Expander.Styles>
```

## Key Properties Reference

| Property | Type | Description |
|---|---|---|
| `Header` | `object` | Content shown in the always-visible header area. |
| `IsExpanded` | `bool` | Whether the content section is visible. |
| `ExpandDirection` | `ExpandDirection` | Direction content expands: `Down`, `Up`, `Left`, `Right`. |
| `ContentTransition` | `IPageTransition` | Animation for expand/collapse. |

## See Also

- [Expander Control Reference](/controls/layout/containers/expander): Property tables.
- [Page Transitions](/docs/graphics-animation/page-transitions): Transition types for content animation.
