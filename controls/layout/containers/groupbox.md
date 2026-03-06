---
id: groupbox
title: GroupBox
---

The `GroupBox` control visually groups related content under a header label, surrounded by a border. The header text overlaps the top edge of the border, creating the classic "group box" appearance familiar from desktop UI frameworks.

`GroupBox` extends `HeaderedContentControl`, so it supports a `Header` (displayed at the top of the border) and a single `Content` child.

## Useful properties

You will probably use these properties most often:

<table><thead><tr><th width="261">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Header</code></td><td>The text or content displayed at the top of the border.</td></tr><tr><td><code>Content</code></td><td>The child control or layout hosted inside the group box.</td></tr><tr><td><code>BorderBrush</code></td><td>The color of the surrounding border.</td></tr><tr><td><code>BorderThickness</code></td><td>The thickness of the surrounding border.</td></tr><tr><td><code>CornerRadius</code></td><td>The radius of the border's corners.</td></tr><tr><td><code>Padding</code></td><td>The spacing between the border and the content.</td></tr></tbody></table>

## Example

This example creates two group boxes to organize a form:

<XamlPreview>

```xml
<StackPanel xmlns="https://github.com/avaloniaui"
            Spacing="16" Margin="16">
  <GroupBox Header="Personal Details">
    <StackPanel Spacing="8">
      <TextBox PlaceholderText="First name" />
      <TextBox PlaceholderText="Last name" />
      <TextBox PlaceholderText="Email" />
    </StackPanel>
  </GroupBox>
  <GroupBox Header="Preferences">
    <StackPanel Spacing="8">
      <CheckBox Content="Receive notifications" />
      <CheckBox Content="Dark mode" />
    </StackPanel>
  </GroupBox>
</StackPanel>
```

</XamlPreview>

## Custom header content

The `Header` property accepts any content, not just text. You can use it to display icons, formatted text, or any other control:

```xml
<GroupBox>
  <GroupBox.Header>
    <StackPanel Orientation="Horizontal" Spacing="6">
      <PathIcon Data="{StaticResource SettingsIcon}" />
      <TextBlock Text="Advanced Settings" FontWeight="Bold" />
    </StackPanel>
  </GroupBox.Header>
  <StackPanel Spacing="8">
    <CheckBox Content="Enable logging" />
    <CheckBox Content="Verbose output" />
  </StackPanel>
</GroupBox>
```

## Styling

The GroupBox appearance can be customized through theme resources:

| Resource | Default | Description |
|---|---|---|
| `GroupBoxPadding` | `4` | Internal padding around the content. |
| `GroupBoxHeaderFontSize` | `16` | Font size of the header text. |
| `GroupBoxHeaderMargin` | `0,4,0,12` | Margin around the header. |
| `GroupBoxBorderThickness` | `1` | Thickness of the surrounding border. |
| `GroupBoxBackground` | Transparent | Background fill of the content area. |
| `GroupBoxBorderBrush` | `SystemControlForegroundBaseMediumBrush` | Color of the border. |
| `GroupBoxHeaderForeground` | `SystemBaseHighColor` | Color of the header text. |

## See also

- [GroupBox API reference](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_GroupBox)
- [`GroupBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GroupBox.cs)
