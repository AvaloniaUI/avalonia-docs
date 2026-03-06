---
id: expander
title: Expander
---

The `Expander` control has a header area (always visible) and a collapsible content section that can contain a single child control. Click the header to toggle the content visibility.

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `Header` | `object` | Content displayed in the always-visible header area. |
| `IsExpanded` | `bool` | Whether the content section is currently visible. Default: `false`. |
| `ExpandDirection` | `ExpandDirection` | Direction the content expands: `Down` (default), `Up`, `Left`, or `Right`. |
| `ContentTransition` | `IPageTransition` | Transition animation for expand/collapse. |

## Basic Example

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             Padding="5">
  <Expander VerticalAlignment="Top">
      <Expander.Header>
          Hidden Search
      </Expander.Header>
      <Grid RowDefinitions="*,*" ColumnDefinitions="150,*">
        <TextBlock Grid.Row="0" Grid.Column="0"
                   VerticalAlignment="Center">Search</TextBlock>
        <TextBox Grid.Row="0" Grid.Column="1"
                 PlaceholderText="Search text" Width="200" />
        <TextBlock Grid.Row="1" Grid.Column="0"
                   VerticalAlignment="Center">Case sensitive?</TextBlock>
        <CheckBox Grid.Row="1" Grid.Column="1" />
      </Grid>
  </Expander>
</UserControl>
```

</XamlPreview>

## Initially Expanded

Set `IsExpanded` to `True` to show the content when the control first loads:

```xml
<Expander Header="Details" IsExpanded="True">
    <TextBlock Text="This content is visible by default." TextWrapping="Wrap" />
</Expander>
```

## Expand Direction

Control the direction in which the content section appears:

```xml
<Expander ExpandDirection="Up" Header="Expand Upward" VerticalAlignment="Bottom">
    <TextBlock Text="Content above the header" />
</Expander>
```

## Custom Header Content

The `Header` property accepts any content, not just strings:

```xml
<Expander>
    <Expander.Header>
        <StackPanel Orientation="Horizontal" Spacing="8">
            <PathIcon Data="{StaticResource settings_regular}" Width="16" />
            <TextBlock Text="Settings" VerticalAlignment="Center" />
        </StackPanel>
    </Expander.Header>
    <StackPanel Spacing="8" Margin="8">
        <CheckBox Content="Enable notifications" />
        <CheckBox Content="Auto-save" />
    </StackPanel>
</Expander>
```

## Binding IsExpanded

Bind the expansion state to a view model property for programmatic control:

```xml
<Expander Header="Advanced" IsExpanded="{Binding ShowAdvanced}">
    <TextBox PlaceholderText="Custom path" />
</Expander>
```

## Content Transition

Animate the expand/collapse with a page transition:

```xml
<Expander Header="Animated Section">
    <Expander.ContentTransition>
        <CrossFade Duration="0:0:0.2" />
    </Expander.ContentTransition>
    <TextBlock Text="Fades in and out" />
</Expander>
```

## Accessibility

The `Expander` provides built-in accessibility support through its `ExpanderAutomationPeer`. Screen readers report the control as expandable/collapsible and announce its current state. The expand/collapse action is exposed to assistive technologies through the `IExpandCollapseProvider` pattern, allowing users to toggle the content without using the pointer.

## See also

- [Expander API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_Expander)
- [`Expander.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Expander.cs)
