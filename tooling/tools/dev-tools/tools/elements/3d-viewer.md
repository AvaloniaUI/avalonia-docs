# Element 3D Viewer

The 3D Viewer provides a three-dimensional visualization of your application's visual tree, allowing you to explore the layering and hierarchy of UI elements in a spatial context.

![3D Viewer Tab](../../../../../static/img/dev-tools/3d-viewer-mini-demo.gif)
## Accessing the 3D Viewer

Open the 3D Viewer from the Developer Tools panel by toggling the "3D Viewer" button on the [Properties](./properties.md) view toolbar.
Or from "Open 3D Viewer" context menu in the [Elements](./elements.md) Tree.

Any visual element subtree can be viewed. Templates and root Application cannot.

:::note

This feature requires Avalonia 11.2.0 or newer.

:::

## Features

The 3D Viewer renders each layer of your visual tree as a separate plane in 3D space.

Elements are positioned according to their Z-index and rendering order. Allowing to easily identify overlapping elements and their stacking context

### Navigation Controls

Navigate the 3D space to examine your UI from different angles:

- **Rotate**: Click and drag to rotate the view
- **Pan**: Right-click and drag to move the camera position
- **Zoom**: Use the mouse wheel to zoom in and out
- **Reset**: Double-click to reset the view to the default position

### Visualization Settings

Customize how the 3D view renders elements:

- **Draw as Gradient**: Toggle to visualize elements with gradient coloring for better depth perception
- **Draw Borders**: Enable or disable element border rendering for cleaner visualization
- **Layer Distance**: Adjust the spacing between visual tree layers
- **Layer Range**: Set minimum and maximum layer indexes to focus on specific depth ranges in the visual tree

## Use Cases

- **Debugging Z-Index Issues**: Identify and resolve element stacking problems
- **Understanding Complex Layouts**: Visualize how nested panels and controls relate to each other
- **Optimizing Visual Tree**: Identify unnecessary nesting or redundant containers
- **Explaining UI Architecture**: Use as a teaching tool to demonstrate visual tree concepts
