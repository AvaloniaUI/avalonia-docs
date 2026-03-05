---
id: windowdrawndecorations
title: WindowDrawnDecorations
description: A logical element that manages the client-side presentation of window decorations, such as the titlebar and frame. It also defines interactions with caption buttons.
---

`WindowDrawnDecorations` is not a visual control, but a logical element that holds the template and properties of window decorations, such as the titlebar and frame, in order to manage their client-side presentation.

In addition, `WindowDrawnDecorations` defines the interaction logic of caption buttons.

This control replaces the `TitleBar`, `CaptionButtons` and `ChromeOverlayLayer` classes in earlier versions of Avalonia (before version 12).

## When to use

Use `WindowDrawnDecorations` to customize your window decorations—titlebar, caption buttons, resize grips, etc.—when you wish them to look different from the system default.

## Namespace

Located in `Avalonia.Controls.Chrome`.

## Visual tree structure

Visual elements in `WindowDrawnDecorations` are divided into **underlay**, **overlay** and **popover** layers.  `TopLevelHost` builds the visual tree according to this structure:

```
TopLevelHost              (visual root, rendered by PresentationSource)
├── Underlay layer        (from template: borders, background, shadow area content)
├── TopLevel/Window       (client area — Window.Bounds matches this)
├── Overlay layer         (from template: titlebar, caption buttons)
├── FullscreenPopover     (from template: hover-triggered titlebar for fullscreen)
└── Resize hit-test zones (automatic, invisible, based on FrameThickness)
```

See [`WindowDrawnDecorationsContent`](#windowdrawndecorationscontent) for how these layers are implemented in code.

## WindowDrawnDecorationsTemplate

Custom template type marked with `[ControlTemplateScope]`. Builds `WindowDrawnDecorationsContent`.

```csharp
[ControlTemplateScope]
public class WindowDrawnDecorationsTemplate : ITemplate
{
    [Content]
    [TemplateContent(TemplateResultType = typeof(WindowDrawnDecorationsContent))]
    public object? Content { get; set; }

    public TemplateResult<WindowDrawnDecorationsContent> Build() =>
        TemplateContent.Load<WindowDrawnDecorationsContent>(Content);
}
```

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
| `Template` | `WindowDrawnDecorationsTemplate` | Public, Styled | Decorations template. |
| `DefaultTitleBarHeight` | `double` | Public, Styled | Default titlebar height. Decided by theme if unset. |
| `DefaultFrameThickness` | `Thickness` | Public, Styled | Default frame thickness. Decided by theme if unset. |
| `DefaultShadowThickness` | `Thickness` | Public, Styled | Default shadow thickness. Decided by theme if unset. |
| `TitleBarHeight` | `double` | Public, Styled | Effective titlebar height. Local value set by `Window` overrides this. |
| `FrameThickness` | `Thickness` | Public, Styled | Effective frame thickness. Local value set by `Window` overrides this. |
| `ShadowThickness` | `Thickness` | Public, Styled | Effective shadow thickness. Local value set by `Window` overrides this. |
| `EnabledParts` | `DecorationParts` | Internal | Flags controlling which template parts are active. See below section on [template parts](#template-parts). |
| `Content` | `WindowDrawnDecorationsContent?` | Public, Read-only | Built template content. |

## Pseudoclasses

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
| `PART_CloseButton` | `Button?` | Close button. Calls `Window.Close()`. |
| `PART_MinimizeButton` | `Button?` | Minimize button. Sets `WindowState.Minimized`. |
| `PART_MaximizeButton` | `Button?` | Maximize toggle button. |
| `PART_FullScreenButton` | `Button?` | Fullscreen toggle button. |

### Button state management

- Subscribes to the attached `Window`'s `CanMaximize`, `CanMinimize`, `CanResize` and `WindowState` properties.
- Updates [pseudoclasses](#pseudoclasses) on itself.
- Enables or disables template part buttons based on window capabilities.
- Associates click handlers directly, e.g., `PART_CloseButton` → `Window.Close()`.

## DecorationParts

```csharp
[Flags]
internal enum DecorationParts
{
    None = 0,
    Shadow = 1,
    Border = 2,
    TitleBar = 4,
    ResizeGrips = 8,
    All = Shadow | Border | TitleBar | ResizeGrips
}
```

Usable decoration parts may vary depending on platform, e.g., maxOS handles its own resize grips.

## ElementRole

This is a cross-platform, non-client hit-test role. It complements, but does not replace, `Win32Properties.NonClientHitTestResult`.

```csharp
public enum ElementRole
{
    None,
    TitleBar,
    ResizeN,
    ResizeS,
    ResizeE,
    ResizeW,
    ResizeNE,
    ResizeNW,
    ResizeSE,
    ResizeSW
}
```

`ElementRole` can be used as an attached property on a static class. This works on any element in the visual tree, not only decoration children elements. In the [example below](#example), a `ElementRole="TitleBar"` is marked, which can allow custom titlebar interactions.

```csharp
public static class WindowDecorations
{
    public static readonly AttachedProperty<ElementRole> ElementRoleProperty =
        AvaloniaProperty.RegisterAttached<WindowDecorations, Visual, ElementRole>("ElementRole");
}
```

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