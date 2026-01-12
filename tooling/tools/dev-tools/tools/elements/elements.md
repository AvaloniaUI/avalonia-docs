# Application Elements Tool

The Elements Tree presents a unified view that combines both visual and logical hierarchies. It loads only visible elements to optimize performance, while organizing the structure with the logical tree as the foundation. Template contents are collapsed away within `/template/` node contents.

![Elements Tool](../../../../../static/img/dev-tools/elements-tool.png)

Related Pages:
- [Element Properties](./properties.md) - Inspect and modify element properties
- [Element 3D Viewer](./3d-viewer.md) - Visualize element layout in 3D space
- [In-App Overlay](./overlay.md) - Display debug information directly in your application

## Inspect Mode

The Elements Tool offers ways to identify and select specific UI elements directly from your running application:

- **Focus Tracking** - When enabled, this feature automatically selects the currently focused element in your application within the Elements tree. Toggle this mode with `Ctrl+Shift+K` (or `Cmd+Shift+K` on macOS) to seamlessly track focus changes as you interact with your app.

- **Inspect Element** - This mode transforms your cursor into an element selector. Once activated with `Ctrl+Shift+C` (or `Cmd+Shift+C` on macOS), simply click any element in your application to immediately locate and select it in the Elements tree. This provides a direct bridge between what you see in your application and its underlying structure.

These inspection modes eliminate the need for manual searching through complex element hierarchies, making debugging and UI analysis significantly more efficient.

## Context Menu

The context menu provides essential actions for navigating and manipulating the element tree:

When right-clicking on an element, you can access various expansion options to explore the hierarchy at different levels of detail. The "Expand Children" option reveals immediate children, while "Recursively" and "Recursively with templates" provide deeper exploration capabilities.

Additional actions include collapsing nodes, copying elements or their selectors, focusing elements, bringing them into view, and invalidating visuals. Window elements offer the special capability to render debug overlays such as `FPS`.

The entire tree supports search functionality, allowing you to quickly locate specific elements by name or type.

![Elements Tree Context Menu](../../../../../static/img/dev-tools/elements-context-menu.png)

## Pseudoclasses selector

For each element, the tool displays pseudoclasses that were defined on it. This feature is particularly valuable for testing how elements respond to different states without having to manually trigger them through user interaction.

When developing custom controls with pseudoclasses, adding the `[PseudoClassesAttribute]` improves integration with the Developer Tools and also enhances IDE auto-completion support.