---
id: visual-and-logical-trees
title: Visual and logical trees
description: Understand the logical and visual tree structures used for layout, rendering, and events.
doc-type: explanation
---

Avalonia organizes controls into two parallel tree structures: the logical tree and the visual tree. Understanding these trees is important for resource lookup, event routing, styling, and custom control development.

## Logical tree

The logical tree represents the structure of your UI as you define it in XAML. It contains the controls you explicitly declare, without the internal template structure.

For example, this XAML:

```xml
<Window>
    <StackPanel>
        <TextBlock Text="Name:" />
        <TextBox Text="{Binding Name}" />
        <Button Content="Save" />
    </StackPanel>
</Window>
```

Produces a logical tree:

```text
Window
  └─ StackPanel
       ├─ TextBlock
       ├─ TextBox
       └─ Button
```

The logical tree is used for:
- **Resource lookup**: `StaticResource` and `DynamicResource` walk up the logical tree.
- **Data context inheritance**: `DataContext` propagates down the logical tree.
- **Property inheritance**: Inherited properties like `FontSize`, `Foreground`, and `FlowDirection` flow down the logical tree.
- **Named element lookup**: `x:Name` references resolve within the logical tree scope.

### Navigating the logical tree

```csharp
// Get the logical parent
var parent = myControl.Parent;

// Get logical children
foreach (var child in myPanel.Children)
{
    // Process child
}

// Find an ancestor of a specific type
var window = myControl.FindAncestorOfType<Window>();

// Get all logical descendants
var allTextBlocks = myPanel.GetLogicalDescendants().OfType<TextBlock>();
```

## Visual tree

The visual tree includes every visual element that participates in rendering, including the internal template parts of controls. A `Button` in the logical tree expands in the visual tree to include its `ContentPresenter`, `Border`, and other template elements.

The same `Button` from above might have this visual tree:

```text
Button
  └─ ContentPresenter
       └─ Border
            └─ ContentPresenter
                 └─ TextBlock ("Save")
```

The visual tree is used for:
- **Rendering**: The renderer walks the visual tree to draw the UI.
- **Hit testing**: Pointer events use the visual tree to determine which element is under the cursor.
- **Layout**: Measure and arrange passes traverse the visual tree.
- **Event tunneling and bubbling**: Routed events tunnel down and bubble up the visual tree.

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

| Aspect | Logical tree | Visual tree |
|---|---|---|
| What it contains | Controls you declare in XAML | All visual elements including template internals |
| Resource lookup | Yes | No |
| Data context inheritance | Yes | No |
| Property inheritance | Yes | No |
| Event routing | No | Yes (tunnel and bubble) |
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
| `PopupOverlayLayer` | Internal layer for hosting popups (menus, tooltips, combo box dropdowns). Managed by the framework. | `PopupOverlayLayer.GetPopupOverlayLayer(visual)` |

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
