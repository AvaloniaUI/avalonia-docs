---
id: hyperlinkbutton
title: HyperlinkButton
description: A button styled as a text hyperlink that opens a URI using the platform's default handler.
doc-type: reference
---

The [`HyperlinkButton`](/api/avalonia/controls/hyperlinkbutton) is a button that appears as a text hyperlink and opens a URI when you click it. It uses the platform's default mechanism to launch URIs (opening a browser, email client, and so on).

## Useful properties

| Property | Type | Description |
|---|---|---|
| `NavigateUri` | `Uri` | The URI to open when the button is clicked. |
| `Content` | `object` | The content displayed in the button (typically text). |
| `IsVisited` | `bool` | Whether the link has been visited. Automatically set to `true` after the URI is launched. |
| `Command` | `ICommand` | An optional command executed when the button is clicked. |

## Basic example

```xml
<HyperlinkButton NavigateUri="https://avaloniaui.net"
                 Content="Visit Avalonia" />
```

## Custom content

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

## Platform behavior

When you click a `HyperlinkButton`, URI launching is delegated to the operating system's default handler. The browser or application that opens depends on your platform settings. For example, a `https://` link opens in your default web browser, while a `mailto:` link opens in your default email client.

## Pseudoclasses

| Pseudoclass | Description |
|---|---|
| `:visited` | Applied when `IsVisited` is `true`. |
| `:pressed` | Applied while the button is being pressed. |

## See also

- [Button](/controls/input/buttons/button): Standard push button.
- [RepeatButton](/controls/input/buttons/repeatbutton)
- [Launcher](/docs/services/launcher): Programmatic URI and file launching.
