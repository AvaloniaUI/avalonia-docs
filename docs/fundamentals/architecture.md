---
id: architecture
title: Avalonia architecture
description: How controls are measured, arranged, rendered, and connected to platform backends.
doc-type: explanation
---

This page describes the internal architecture of Avalonia: how controls are measured, arranged, and rendered, how the compositor schedules frames, and how platform backends connect to the rendering pipeline.

## High-level overview

Avalonia is built in layers. Each layer depends only on the layers below it:

| Layer | Responsibility |
|---|---|
| **Controls** | User-facing controls (Button, TextBox, DataGrid), data binding, templates, styling |
| **Layout** | Measure/arrange system, panel logic, scrolling |
| **Visual** | Visual tree, render transforms, opacity, clipping |
| **Rendering** | Drawing primitives (brushes, geometries, text), scene graph, composition |
| **Platform Abstraction** | Windowing, input, clipboard, file dialogs, GPU context |
| **Platform Backends** | Win32, Cocoa, X11/Wayland, Android, iOS, Browser (WASM) |

Application code interacts primarily with the Controls and Layout layers. The rendering and platform layers operate behind the scenes.

## The rendering pipeline

Avalonia uses a retained-mode rendering model. Controls do not draw themselves directly. Instead, they declare their visual structure through templates, and the framework builds a scene graph that is rendered each frame.

### Frame lifecycle

Each frame follows this sequence:

1. **Input processing**: The platform backend delivers pointer, keyboard, and touch events. Events bubble and tunnel through the visual tree.
2. **Property changes**: Input handlers and timers trigger property changes, which may invalidate layout or rendering.
3. **Layout pass**: Controls that need re-measurement go through `Measure` then `Arrange`. Layout starts at the root and walks down the tree, giving each control its final size and position.
4. **Render pass**: Controls with dirty visuals rebuild their portion of the scene graph via `Render(DrawingContext)`. The framework diffs the new scene against the previous one.
5. **Composition**: The compositor takes the updated scene graph and submits draw calls to the GPU backend (Skia or the platform's native compositor).

### Layout: Measure and Arrange

Avalonia follows the same two-pass layout model as WPF and UWP:

- **Measure**: The parent tells each child how much space is available. The child returns its desired size.
- **Arrange**: The parent assigns each child its final position and size within the available area.

Layout invalidation propagates up the tree. When a control's `Width`, `Margin`, or content changes, it calls `InvalidateMeasure()`, which marks it and all ancestors as needing a new layout pass. The framework coalesces these invalidations so only one layout pass runs per frame.

```csharp
// Custom panel: override MeasureOverride and ArrangeOverride
protected override Size MeasureOverride(Size availableSize)
{
    foreach (var child in Children)
    {
        child.Measure(availableSize);
    }

    return new Size(200, 200); // desired size
}

protected override Size ArrangeOverride(Size finalSize)
{
    foreach (var child in Children)
    {
        child.Arrange(new Rect(child.DesiredSize));
    }

    return finalSize;
}
```

### Scene graph and composition

After layout, the render pass builds a scene graph: a lightweight tree of drawing instructions (fill rectangle, draw text, apply clip, and similar operations). The compositor walks this graph each frame and issues GPU draw calls through the active rendering backend.

Avalonia supports two composition modes:

- **Software composition**: The scene graph is rasterized on the CPU using Skia, then blitted to the platform window. This is the default on most platforms and works everywhere.
- **GPU composition**: Where the platform supports it (e.g., Direct3D on Windows, Metal on macOS, OpenGL/Vulkan on Linux), Avalonia can issue draw calls directly to the GPU for better performance with complex scenes.

## Platform abstraction

Avalonia isolates all platform-specific code behind interfaces. The key abstractions are:

| Interface | Purpose |
|---|---|
| `IWindowImpl` | Window creation, sizing, positioning, native chrome |
| `ITopLevelImpl` | Rendering surface, input delivery, scaling |
| `IClipboard` | Clipboard read/write |
| `IStorageProvider` | File and folder picker dialogs |
| `ILauncher` | Opening URIs and files with the system handler |
| `IInsetsManager` | Safe area insets (notch, status bar) |
| `IPlatformSettings` | Theme detection, accent color, animation preferences |
| `IRenderTarget` | GPU surface for rendering |

Each platform backend (Win32, Cocoa, X11, Android, iOS, Browser) implements these interfaces. The application selects a backend at startup through the `AppBuilder`:

```csharp
AppBuilder.Configure<App>()
    .UsePlatformDetect() // auto-select based on OS
    .StartWithClassicDesktopLifetime(args);
```

`UsePlatformDetect()` chooses the correct backend automatically. You can also select a specific backend for testing or embedded scenarios.

## The property system

Avalonia has its own property system that supports styling, animation, data binding, and value inheritance. There are three property types:

- **StyledProperty**: The default property type. Supports styling, animation, value inheritance, and data binding. Most control properties are styled properties.
- **DirectProperty**: A lightweight property backed by a CLR field. Faster than StyledProperty but does not support styling or animation. Used for properties that change frequently (e.g., `TextBox.Text`).
- **AttachedProperty**: A StyledProperty registered against a different owner type. Used for layout properties like `Grid.Row` and `DockPanel.Dock`.

Property values are resolved through a precedence system. See [Property Value Precedence](/docs/properties/value-precedence) for the full priority order.

## The styling system

Avalonia uses a CSS-inspired styling system rather than WPF's resource-lookup-based triggers. Styles are declared with selectors that match controls by type, class, pseudo-class, and name:

```xml
<Style Selector="Button.primary:pointerover">
    <Setter Property="Background" Value="#818CF8" />
</Style>
```

The style system evaluates selectors in declaration order. When multiple styles match, later declarations override earlier ones for the same property, similar to CSS specificity (though Avalonia uses a simpler order-based model).

Control themes are special styles that provide the default template and property values for a control type. Themes are resolved through the `Theme` property, which allows per-control or per-subtree theme switching.

## The visual and logical trees

Every Avalonia UI is represented as two parallel tree structures:

- **Logical tree**: The tree of controls as declared in XAML or code. DataContext, resources, and property inheritance flow through this tree.
- **Visual tree**: The tree of rendered elements, including template-expanded content. Hit testing, rendering, and event routing use this tree.

See [Visual and Logical Trees](/docs/fundamentals/visual-and-logical-trees) for detailed coverage.

## Threading model

Avalonia is single-threaded for UI operations. All property changes, layout, and rendering happen on the UI thread. Background work must marshal results back to the UI thread through the `Dispatcher`:

```csharp
var data = await Task.Run(() => LoadData());
// Back on UI thread automatically with async/await
Items = new ObservableCollection<Item>(data);
```

See [Threading](/docs/app-development/threading) for the full threading model.

## See also

- [Cross-platform architecture](/docs/fundamentals/cross-platform-architecture): Solution structure and platform-specific code patterns.
- [Visual and logical trees](/docs/fundamentals/visual-and-logical-trees): How the two trees work and when to use each.
- [Property system](/docs/properties): StyledProperty, DirectProperty, and AttachedProperty.
- [Threading](/docs/app-development/threading): Dispatcher and async patterns.
- [Performance optimization](/docs/app-development/performance): Layout, rendering, and binding performance tips.
