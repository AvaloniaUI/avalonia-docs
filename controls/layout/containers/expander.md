---
id: expander
title: Expander
description: A container control with an always-visible header and a collapsible content section that you can toggle open or closed.
doc-type: reference
---

The [`Expander`](/api/avalonia/controls/expander) control has a header area that is always visible and a collapsible content section that can contain a single child control. Users click the header to toggle the content visibility. This is useful when you want to let users reveal or hide supplementary information, such as search filters, advanced settings, or optional form fields, without navigating away from the current view.

## Useful properties

You will probably use these properties most often:

| Property | Type | Description |
|---|---|---|
| `Header` | `object` | Content displayed in the always-visible header area. Accepts strings, controls, or data templates. |
| `IsExpanded` | `bool` | Whether the content section is currently visible. Default is `false`. |
| [`ExpandDirection`](/api/avalonia/controls/expanddirection) | `ExpandDirection` | Direction the content expands: `Down` (default), `Up`, `Left`, or `Right`. |
| `ContentTransition` | `IPageTransition` | Transition animation played when the content expands or collapses. |

## Events

| Event | Description |
|---|---|
| `Expanding` | Raised when the content section begins to expand. |
| `Collapsed` | Raised when the content section finishes collapsing. |

## Basic example

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

## Initially expanded

Set `IsExpanded` to `True` to show the content when the control first loads:

```xml
<Expander Header="Details" IsExpanded="True">
    <TextBlock Text="This content is visible by default." TextWrapping="Wrap" />
</Expander>
```

## Expand direction

You can control the direction in which the content section appears by setting `ExpandDirection`. The default is `Down`, but you can also use `Up`, `Left`, or `Right`:

```xml
<Expander ExpandDirection="Up" Header="Expand Upward" VerticalAlignment="Bottom">
    <TextBlock Text="Content above the header" />
</Expander>
```

When you use `Left` or `Right`, the header rotates and the content appears horizontally. This can be useful for side panels or tool drawers.

## Custom header content

The `Header` property accepts any content, not just strings. You can use this to create rich headers with icons, badges, or other controls:

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

## Binding `IsExpanded`

You can bind the expansion state to a view model property for programmatic control. This lets you expand or collapse the section from your code:

```xml
<Expander Header="Advanced" IsExpanded="{Binding ShowAdvanced}">
    <TextBox PlaceholderText="Custom path" />
</Expander>
```

```csharp
public class MyViewModel : ViewModelBase
{
    private bool _showAdvanced;

    public bool ShowAdvanced
    {
        get => _showAdvanced;
        set => this.RaiseAndSetIfChanged(ref _showAdvanced, value);
    }
}
```

## Content transition

You can animate the expand and collapse actions with a page transition. Set the `ContentTransition` property to control the animation:

```xml
<Expander Header="Animated Section">
    <Expander.ContentTransition>
        <CrossFade Duration="0:0:0.2" />
    </Expander.ContentTransition>
    <TextBlock Text="Fades in and out" />
</Expander>
```

## Nesting expanders

You can nest `Expander` controls to create collapsible hierarchies. Place an inner `Expander` inside the content of an outer one:

```xml
<Expander Header="General Settings" IsExpanded="True">
    <StackPanel Spacing="8" Margin="8">
        <CheckBox Content="Enable dark mode" />
        <Expander Header="Advanced">
            <StackPanel Spacing="8" Margin="8">
                <CheckBox Content="Hardware acceleration" />
                <CheckBox Content="Verbose logging" />
            </StackPanel>
        </Expander>
    </StackPanel>
</Expander>
```

:::tip
When you nest expanders, keep the hierarchy shallow (two levels at most) to avoid overwhelming your users.
:::

## Accessibility

The `Expander` provides built-in accessibility support through its `ExpanderAutomationPeer`. Screen readers report the control as expandable or collapsible and announce its current state. The expand and collapse action is exposed to assistive technologies through the `IExpandCollapseProvider` pattern, allowing users to toggle the content without using a pointer.

To improve accessibility in your application, set the `Header` to a meaningful label so that screen readers can describe the purpose of each collapsible section.

## See also

- [Expander API reference](/api/avalonia/controls/expander)
- [`Expander.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Expander.cs)
- [SplitView](splitview.md)
- [GroupBox](groupbox.md)
