---
id: visual-and-logical-trees
title: Visual and logical trees
description: Understand the logical and visual tree structures used for layout, rendering, and events.
doc-type: explanation
---

Avalonia organizes controls into two parallel tree structures: the logical tree and the visual tree. Understanding these trees is important for resource lookup, event routing, styling, and custom control development.

If you wish to view the logical and visual trees of your application, use the [Elements tool](/tools/developer-tools/elements-tool) of the Avalonia Dev Tools.

## Logical tree

The logical tree represents the hierarchy of your UI as defined in XAML. It contains the controls you explicitly declare, without the internal template structure.

The logical tree is used for:
- **Resource lookup:** `StaticResource` and `DynamicResource` walk up the logical tree.
- **Data context inheritance:** `DataContext` propagates down the logical tree.
- **Property inheritance:** Inherited properties like `FontSize`, `Foreground` or `FlowDirection` flow down the logical tree.
- **Named element lookup:** `x:Name` references resolve within the logical tree scope.

For example, the following XAML of three controls inside a [`StackPanel`](/controls/layout/panels/stackpanel) inside a [`Window`](/controls/primitives/window) produces the corresponding logical tree.

<Tabs>
<TabItem value="xaml" label="XAML">

```xml
<Window>
    <StackPanel>
        <TextBlock Text="Name:" />
        <TextBox Text="{Binding Name}" />
        <Button Content="Save" />
    </StackPanel>
</Window>
```

</TabItem>

<TabItem value="logical-tree" label="Logical tree">

```text
Window
  └─ StackPanel
       ├─ TextBlock
       ├─ TextBox
       └─ Button
```

</TabItem>
</Tabs>

### Navigating the logical tree

```csharp
// Get the logical parent
var parent = myControl.GetLogicalParent();

// Get logical children
var children = myControl.GetLogicalChildren();

// Find an ancestor of a specific type
var window = myControl.FindLogicalAncestorOfType<Window>();

// Get all logical descendants
var allTextBlocks = myPanel.GetLogicalDescendants().OfType<TextBlock>();
```

### Mutating the logical tree

It is only safe to add or remove `LogicalChildren` when the framework is not already walking the tree. Several common operations trigger such walks, most notably propagation of inherited properties such as `DataContext`. Mutating `LogicalChildren` while one of these walks is in progress can corrupt the iteration and surface as binding errors.

**Safe places to add or remove logical children:**

- The control's constructor, before it is attached to any tree.
- `OnApplyTemplate`, after calling `base.OnApplyTemplate(e)`.
- Routed input or command handlers (for example, a `Click` or `Tapped` handler).
- The `Loaded` event handler.

**Avoid mutating logical children from:**

- `OnPropertyChanged` or `PropertyChanged` callbacks. The framework may be partway through propagating an inherited property to the children you are about to modify.
- `DataContextChanged`, for the same reason.

## Visual tree

The visual tree represents everything that Avalonia is actually running. This means every visual element that participates in rendering, including the properties set on controls and the internal template parts of controls.

The visual tree is used for:
- **Rendering:** The renderer walks the visual tree to draw the UI.
- **Hit testing:** Pointer events use the visual tree to determine which element is under the cursor.
- **Layout:** Measure and arrange passes traverse the visual tree.
- **Event routing:** Routed events tunnel down or bubble up the visual tree.

For example, a single `Button` in the logical tree expands in the visual tree to include its `ContentPresenter`, `Border`, and other template elements. The same `Button` from [the previous example](#logical-tree) might have this visual tree:

```text title="Visual tree"
Button
  └─ ContentPresenter
       └─ Border
            └─ ContentPresenter
                 └─ TextBlock ("Save")
```

### Navigating the visual tree

```csharp
// Get the visual parent
var parent = myControl.GetVisualParent();

// Get visual children
var childCount = myControl.VisualChildren.Count;
var firstChild = myControl.VisualChildren[0];

// Find a visual ancestor
var scrollViewer = myControl.FindAncestorOfType<ScrollViewer>(includeSelf: false);

// Find a visual ancestor matching a predicate
var enabledPanel = myControl.FindAncestorOfType<StackPanel>(
    includeSelf: false,
    predicate: panel => panel.IsEnabled);

// Find a visual descendant matching a predicate
var visibleTextBox = myPanel.FindDescendantOfType<TextBox>(
    includeSelf: false,
    predicate: tb => tb.IsVisible);

// Get all visual descendants
var allVisuals = myControl.GetVisualDescendants();
```

## Differences between the trees

| &nbsp; | Logical tree | Visual tree |
|---|---|---|
| Contains | Controls you declare in XAML | All visual elements including template internals |
| Resource lookup | Yes | No |
| Data context inheritance | Yes | No |
| Property inheritance | Yes | No |
| Template expansion | No (templates are single nodes) | Yes (templates are expanded into parts) |
| Event routing | No | Yes (tunnel and bubble) |
| Rendering | No | Yes |
| Hit testing | No | Yes |
| Layout | Partially | Yes |

## When to use which tree

**Use the logical tree when:**
- Looking up resources or data context
- Finding named elements
- Walking from a control to its logical parent
- Working with `ItemsControl` children (items are in the logical tree)

**Use the visual tree when:**
- Finding template parts inside a control
- Walking the rendered element hierarchy
- Implementing hit testing
- Translating coordinates between elements (`TranslatePoint`)

## Examining trees at runtime

Use the Avalonia DevTools (press F12 in a debug build) to inspect both trees interactively. The DevTools Logical Tree and Visual Tree tabs show the full hierarchy with properties.

```csharp
// Print the logical tree for debugging
static void PrintLogicalTree(StyledElement element, int indent = 0)
{
    Debug.WriteLine($"{new string(' ', indent * 2)}{element.GetType().Name}");
    if (element is ILogical logical)
    {
        foreach (var child in logical.LogicalChildren)
        {
            if (child is StyledElement styledChild)
                PrintLogicalTree(styledChild, indent + 1);
        }
    }
}
```

## Template parts and the visual tree

When you create a control template, the elements inside it become part of the visual tree but not the logical tree. To access template parts from a custom control, override `OnApplyTemplate`:

```csharp
protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
{
    base.OnApplyTemplate(e);

    // Find a named element from the template
    var border = e.NameScope.Find<Border>("PART_Border");
    var textBlock = e.NameScope.Find<TextBlock>("PART_Text");
}
```

Template parts are conventionally named with a `PART_` prefix to distinguish them from logical children.

## Overlay layers

Avalonia manages several special layers above the normal control content within each window. These layers handle adorners, custom overlays, and popups:

| Layer | Purpose | Access method |
|---|---|---|
| `AdornerLayer` | Focus indicators, drag adorners, and visual decorations attached to controls. | `AdornerLayer.GetAdornerLayer(visual)` |
| `OverlayLayer` | Custom overlay content you add on top of normal controls but beneath popups. | `OverlayLayer.GetOverlayLayer(visual)` |
| Popup layer | Internal layer for hosting popups (menus, tooltips, combo box dropdowns). Managed by the framework. | Managed internally by the popup system. |

### Adding custom overlay content

Use `OverlayLayer` to display content that floats above the normal visual tree, such as a loading indicator, floating toolbar, or custom notification panel:

```csharp
var overlay = OverlayLayer.GetOverlayLayer(myControl);
if (overlay is not null)
{
    var panel = new Border
    {
        Background = Brushes.Black,
        Opacity = 0.5,
        Child = new TextBlock
        {
            Text = "Loading...",
            Foreground = Brushes.White,
            HorizontalAlignment = HorizontalAlignment.Center,
            VerticalAlignment = VerticalAlignment.Center,
        }
    };

    overlay.Children.Add(panel);

    // Remove when done
    overlay.Children.Remove(panel);
}
```

Overlay content appears above all normal controls in the window but beneath popups, menus, and tooltips.

## See also

- [UI composition](/docs/fundamentals/ui-composition): How controls compose into a UI.
- [Control trees](/docs/custom-controls/control-trees): Visual and logical trees in custom control development.
- [Events overview](/docs/events): How events route through the visual tree.
- [Templated controls](/docs/custom-controls/templated-controls): Building controls with templates.
