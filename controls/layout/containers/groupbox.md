---
id: groupbox
title: GroupBox
description: A container control that visually groups related content under a header label with a surrounding border.
doc-type: reference
---

The [`GroupBox`](/api/avalonia/controls/groupbox) control visually groups related content under a header label, surrounded by a border. The header text overlaps the top edge of the border, creating the classic "group box" appearance familiar from desktop UI frameworks.

`GroupBox` extends `HeaderedContentControl`, so it supports a `Header` (displayed at the top of the border) and a single `Content` child.

## Common use cases

Use a `GroupBox` when you need to:

- Organize form fields into logical sections (for example, "Personal Details" and "Billing Address").
- Visually separate groups of related options such as checkboxes or radio buttons.
- Add a labeled frame around a section of your UI so that the purpose of the grouped controls is immediately clear.

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

## Data binding the header

You can bind the `Header` property to a view-model property, which is useful when the section label needs to update at runtime:

```xml
<GroupBox Header="{Binding SectionTitle}">
  <TextBlock Text="{Binding SectionContent}" />
</GroupBox>
```

```csharp
public class MyViewModel : ViewModelBase
{
    private string _sectionTitle = "Details";

    public string SectionTitle
    {
        get => _sectionTitle;
        set => this.RaiseAndSetIfChanged(ref _sectionTitle, value);
    }
}
```

## Nesting group boxes

You can nest `GroupBox` controls inside each other to create sub-sections. Keep nesting shallow (one or two levels) to avoid cluttering your layout:

```xml
<GroupBox Header="Account">
  <StackPanel Spacing="12">
    <GroupBox Header="Login credentials">
      <StackPanel Spacing="8">
        <TextBox PlaceholderText="Username" />
        <TextBox PlaceholderText="Password" PasswordChar="*" />
      </StackPanel>
    </GroupBox>
    <GroupBox Header="Profile">
      <StackPanel Spacing="8">
        <TextBox PlaceholderText="Display name" />
        <TextBox PlaceholderText="Bio" />
      </StackPanel>
    </GroupBox>
  </StackPanel>
</GroupBox>
```

## Styling

You can customize the `GroupBox` appearance through theme resources:

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

- [Border](border)
- [Expander](../expander)
- [HeaderedContentControl](../../../concepts/headered-content-control)
- [GroupBox API reference](/api/avalonia/controls/groupbox)
- [`GroupBox.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/GroupBox.cs)
