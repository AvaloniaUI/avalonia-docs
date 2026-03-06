---
id: hyperlinkbutton
title: HyperlinkButton
---

The `HyperlinkButton` is a button that appears as a text hyperlink and opens a URI when clicked. It uses the platform's default mechanism to launch URIs (opening a browser, email client, etc.).

## Useful Properties

| Property | Type | Description |
|---|---|---|
| `NavigateUri` | `Uri` | The URI to open when the button is clicked. |
| `Content` | `object` | The content displayed in the button (typically text). |
| `IsVisited` | `bool` | Whether the link has been visited. Automatically set to `true` after the URI is launched. |
| `Command` | `ICommand` | An optional command executed when the button is clicked. |

## Basic Example

```xml
<HyperlinkButton NavigateUri="https://avaloniaui.net"
                 Content="Visit Avalonia" />
```

## Custom Content

Like `Button`, `HyperlinkButton` supports arbitrary content:

```xml
<HyperlinkButton NavigateUri="https://github.com/AvaloniaUI/Avalonia">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <PathIcon Data="{StaticResource github_icon}" />
        <TextBlock Text="View on GitHub" />
    </StackPanel>
</HyperlinkButton>
```

## Binding the URI

```xml
<HyperlinkButton NavigateUri="{Binding ProjectUrl}"
                 Content="{Binding ProjectName}" />
```

## Pseudoclasses

| Pseudoclass | Description |
|---|---|
| `:visited` | Applied when `IsVisited` is `true`. |
| `:pressed` | Applied while the button is being pressed. |

## See Also

- [Button](/controls/input/buttons/button): Standard push button.
- [Launcher](/docs/services/launcher): Programmatic URI and file launching.
