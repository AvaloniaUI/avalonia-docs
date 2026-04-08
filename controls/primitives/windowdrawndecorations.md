---
id: windowdrawndecorations
title: WindowDrawnDecorations
description: A logical element that manages the client-side presentation of window decorations, such as the titlebar and frame. It also defines interactions with caption buttons.
doc-type: reference
---

`WindowDrawnDecorations` is not a visual control, but a logical element that holds the template and properties of window decorations, such as the titlebar and frame, in order to manage their client-side presentation.

In addition, `WindowDrawnDecorations` defines the interaction logic of caption buttons.

This control replaces the `TitleBar`, `CaptionButtons` and `ChromeOverlayLayer` classes in earlier versions of Avalonia (before version 12).

## When to use

Use `WindowDrawnDecorations` to create customized window decorations—titlebar, frame, caption buttons, resize grips, etc.

## Namespace

Located in `Avalonia.Controls.Chrome`.

## Visual tree structure

Visual elements in `WindowDrawnDecorations` are divided into **underlay**, **overlay** and **popover** layers. They are built into a visual tree according to this structure:

```
Visual root
├── Underlay layer        (from template: borders, background, shadow area content)
├── TopLevel/Window       (client area: Window.Bounds matches this)
├── Overlay layer         (from template: titlebar, caption buttons)
├── FullscreenPopover     (from template: hover-triggered titlebar for full-screen)
└── Resize hit-test zones (automatic)
```

See [`WindowDrawnDecorationsContent`](#windowdrawndecorationscontent) for how these layers are implemented in code.

## WindowDrawnDecorationsTemplate

Custom template type that builds `WindowDrawnDecorationsContent`. (See [WindowDrawnDecorationsContent](#windowdrawndecorationscontent).)

## WindowDrawnDecorationsContent

Holds the three template slots used by `WindowDrawnDecorationsTemplate`. Logical children are divided into visual tree layers as described in [visual tree structure](#visual-tree-structure) above.

```csharp
public class WindowDrawnDecorationsContent : StyledElement
{
    public Control? Overlay { get; set; }           // titlebar, caption buttons
    public Control? Underlay { get; set; }          // borders, background, shadow
    public Control? FullscreenPopover { get; set; } // hover-triggered fullscreen titlebar
}
```

## Properties

| Property | Type | Visibility | Description |
| --- | --- | --- | --- |
| `Template` | `WindowDrawnDecorationsTemplate` | Styled | Decorations template. |
| `DefaultTitleBarHeight` | `double` | Styled | Default titlebar height. Decided by theme if unset. |
| `DefaultFrameThickness` | `Thickness` | Styled | Default frame thickness. Decided by theme if unset. |
| `DefaultShadowThickness` | `Thickness` | Styled | Default shadow thickness. Decided by theme if unset. |
| `TitleBarHeight` | `double` | Styled | Effective titlebar height. Local value set by `Window` overrides this. |
| `FrameThickness` | `Thickness` | Styled | Effective frame thickness. Local value set by `Window` overrides this. |
| `ShadowThickness` | `Thickness` | Styled | Effective shadow thickness. Local value set by `Window` overrides this. |
| `Content` | `WindowDrawnDecorationsContent?` | Read-only | Built template content. |

## Decoration parts

The following decoration parts are available:

- Shadow
- Border
- Titlebar
- Resize grips

Usable decoration parts may vary depending on platform, e.g., macOS handles its own resize grips.

## Pseudoclasses

Pseudoclasses are applied whenever window state changes, e.g., when `Window` goes from normal to full-screen. They are also applied when [decoration parts](#decoration-parts) are enabled or disabled, e.g., when going to full-screen would cause `Shadow` to be disabled.

- `:normal`
- `:maximized`
- `:minimized`
- `:fullscreen`
- `:has-shadow`
- `:has-border`
- `:has-titlebar`

## Template parts

`WindowDrawnDecorations` obtains template parts during template application and resolves whichever parts are specified. All template parts are optional, e.g., you may omit the full-screen button.

This functionality replaces the `CaptionButtons` class in earlier versions of Avalonia.

| Part | Type | Description |
| --- | --- | --- |
| `PART_CloseButton` | `Button?` | Close button. |
| `PART_MinimizeButton` | `Button?` | Minimize button. |
| `PART_MaximizeButton` | `Button?` | Maximize toggle button. |
| `PART_FullScreenButton` | `Button?` | Fullscreen toggle button. |

## Element roles

`ElementRole` is an [attached property](/docs/properties#attached-properties) that marks each visual element with a specific role for cross-platform, non-client hit testing. It can be applied to any element in the visual tree, not only decoration children elements.

The following element roles are available:

| Role | Description |
| --- | --- |
| `None` | No role. Element is invisible to hit testing. |
| `DecorationsElement` | Interactive element set on decoration template elements. Input is passed through to the element. |
| `User` | Interactive element set by user code. Input is passed through to the element. |
| `TitleBar` | Titlebar drag area. Clicking and dragging this element moves the window. |
| `ResizeN` | Resize grip for the top edge (north). |
| `ResizeS` | Resize grip for the bottom edge (south). |
| `ResizeE` | Resize grip for the right edge (east). |
| `ResizeW` | Resize grip for the left edge (west). |
| `ResizeNE` | Resize grip for the top right corner (northeast). |
| `ResizeSE` | Resize grip for the bottom right corner (southeast). |
| `ResizeNW` | Resize grip for the top left corner (northwest). |
| `ResizeSW` | Resize grip for the bottom left corner (southwest). |
| `CloseButton` | Element performs window close behavior. |
| `MaximizeButton` | Element performs window maximize behavior. |
| `MinimizeButton` | Element performs window minimize behavior. |
| `FullScreenButton` | Element performs window full-screen toggle behavior. |

In the [example below](#example), an element role is marked for a `TextBlock` acting as a titlebar: `ElementRole="TitleBar"`.

## Example

```xml
<ControlTheme x:Key="{x:Type WindowDrawnDecorations}" TargetType="WindowDrawnDecorations">
    <Setter Property="DefaultTitleBarHeight" Value="32"/>
    <Setter Property="DefaultFrameThickness" Value="0,0,0,0"/>
    <Setter Property="DefaultShadowThickness" Value="16"/>
    <Setter Property="Template">
        <WindowDrawnDecorationsTemplate>
            <WindowDrawnDecorationsContent>

                <WindowDrawnDecorationsContent.Underlay>
                    <!-- Full-size: covers shadow area + frame + behind client area -->
                    <Panel>
                        <Border Margin="{TemplateBinding ShadowThickness}"
                                Background="{DynamicResource WindowBackground}"
                                BorderThickness="1"
                                BorderBrush="{DynamicResource WindowBorderBrush}"
                                BoxShadow="0 8 32 0 #40000000"/>
                    </Panel>
                </WindowDrawnDecorationsContent.Underlay>

                <WindowDrawnDecorationsContent.Overlay>
                    <!-- Positioned over the titlebar area -->
                    <DockPanel Height="{TemplateBinding TitleBarHeight}"
                               VerticalAlignment="Top"
                               Margin="{TemplateBinding ShadowThickness}">
                        <StackPanel DockPanel.Dock="Right" Orientation="Horizontal">
                            <Button x:Name="PART_MinimizeButton" Content="─"/>
                            <Button x:Name="PART_MaximizeButton" Content="□"/>
                            <Button x:Name="PART_CloseButton" Content="✕"/>
                        </StackPanel>
                        <TextBlock Text="{Binding Title}"
                                   VerticalAlignment="Center"
                                   Margin="12,0"
                                   chrome:WindowDecorations.ElementRole="TitleBar"/>
                    </DockPanel>
                </WindowDrawnDecorationsContent.Overlay>

                <WindowDrawnDecorationsContent.FullscreenPopover>
                    <!-- Shown on hover at top edge in fullscreen -->
                    <DockPanel Height="{TemplateBinding TitleBarHeight}"
                               Background="#E0000000">
                        <StackPanel DockPanel.Dock="Right" Orientation="Horizontal">
                            <Button x:Name="PART_MinimizeButton" Content="─"/>
                            <Button x:Name="PART_MaximizeButton" Content="□"/>
                            <Button x:Name="PART_CloseButton" Content="✕"/>
                        </StackPanel>
                        <TextBlock Text="{Binding Title}"
                                   Foreground="White"
                                   VerticalAlignment="Center"
                                   Margin="12,0"/>
                    </DockPanel>
                </WindowDrawnDecorationsContent.FullscreenPopover>

            </WindowDrawnDecorationsContent>
        </WindowDrawnDecorationsTemplate>
    </Setter>

    <!-- Pseudoclass styling -->
    <Style Selector="^:maximized /template/ Border">
        <Setter Property="BorderThickness" Value="0"/>
    </Style>
    <Style Selector="^:fullscreen /template/ DockPanel">
        <Setter Property="IsVisible" Value="False"/>
    </Style>
</ControlTheme>
```

## See aslo

- [Window control](/controls/primitives/window)
- [Avalonia v12 breaking changes](/docs/avalonia12-breaking-changes)