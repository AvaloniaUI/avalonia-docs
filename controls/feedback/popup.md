---
id: popup
title: Popup
---

The [`Popup`](/api/avalonia/controls/primitives/popup) is a low-level control that displays content in a floating window above other content. It serves as the foundation for higher-level controls like `Flyout`, [`ToolTip`](/api/avalonia/controls/tooltip), `ComboBox` dropdowns, and context menus. Use `Popup` directly when you need custom positioning or dismissal behavior that those controls do not provide.

:::info
For most scenarios, prefer `Flyout`, `ToolTip`, or `ContextMenu` instead of `Popup`. These higher-level controls handle accessibility, keyboard navigation, and light-dismiss behavior automatically.
:::

## Useful properties

| Property | Type | Description |
|---|---|---|
| `IsOpen` | `bool` | Controls whether the popup is currently visible. |
| `Child` | `Control` | The content displayed inside the popup. |
| `Placement` | `PlacementMode` | How the popup is positioned relative to its target. Options include `Bottom`, `Top`, `Left`, `Right`, `Center`, `Pointer`, `AnchorAndGravity`. Default: `Bottom`. |
| `PlacementTarget` | `Control` | The control the popup is positioned relative to. Defaults to the popup's parent. |
| `PlacementAnchor` | `PopupAnchor` | The anchor point on the target control. |
| `PlacementGravity` | `PopupGravity` | The direction the popup expands from the anchor point. |
| `HorizontalOffset` | `double` | Horizontal offset from the calculated position. |
| `VerticalOffset` | `double` | Vertical offset from the calculated position. |
| `IsLightDismissEnabled` | `bool` | When `true`, the popup closes when the user clicks outside it. Default: `false`. |
| `Topmost` | `bool` | Whether the popup appears above all other windows. Default: `false`. |
| `WindowManagerAddShadowHint` | `bool` | Whether a drop shadow is applied (platform-dependent). Default: `true`. |
| `OverlayDismissEventPassThrough` | `bool` | When `true`, pointer events that dismiss the popup also pass through to the underlying control. Default: `false`. |
| `CustomPopupPlacementCallback` | `Action<CustomPopupPlacement>` | A callback for fully custom popup positioning. When set, overrides the `Placement` property. |

## Events

| Event | Description |
|---|---|
| `Opened` | Raised after the popup opens. |
| `Closed` | Raised after the popup closes. |

## Basic example

```xml
<Panel>
    <Button x:Name="ToggleButton" Content="Show Popup"
            Click="OnTogglePopup" />

    <Popup x:Name="MyPopup"
           PlacementTarget="{Binding #ToggleButton}"
           Placement="Bottom"
           IsLightDismissEnabled="True">
        <Border Background="{DynamicResource SystemControlBackgroundAltHighBrush}"
                BorderBrush="{DynamicResource SystemControlForegroundBaseMediumBrush}"
                BorderThickness="1" CornerRadius="4" Padding="12">
            <TextBlock Text="This is popup content." />
        </Border>
    </Popup>
</Panel>
```

```csharp
private void OnTogglePopup(object sender, RoutedEventArgs e)
{
    MyPopup.IsOpen = !MyPopup.IsOpen;
}
```

## Placement modes

The `Placement` property controls where the popup appears:

| Mode | Behavior |
|---|---|
| `Bottom` | Below the target, left-aligned. |
| `Top` | Above the target, left-aligned. |
| `Left` | To the left of the target, top-aligned. |
| `Right` | To the right of the target, top-aligned. |
| `Center` | Centered over the target. |
| `Pointer` | At the current pointer position. |
| `AnchorAndGravity` | Uses `PlacementAnchor` and `PlacementGravity` for precise positioning. |

## Binding `IsOpen`

You can bind `IsOpen` to a view model property for MVVM control:

```xml
<Popup IsOpen="{Binding IsPopupVisible}"
       PlacementTarget="{Binding #AnchorControl}"
       Placement="Bottom"
       IsLightDismissEnabled="True">
    <Border Background="White" Padding="16" CornerRadius="4"
            BoxShadow="0 2 8 0 #40000000">
        <StackPanel Spacing="8">
            <TextBlock Text="Choose an option:" FontWeight="SemiBold" />
            <Button Content="Option A" Command="{Binding SelectOptionCommand}"
                    CommandParameter="A" />
            <Button Content="Option B" Command="{Binding SelectOptionCommand}"
                    CommandParameter="B" />
        </StackPanel>
    </Border>
</Popup>
```

## Custom placement

For positioning logic beyond the built-in placement modes, use `CustomPopupPlacementCallback`. The callback receives a `CustomPopupPlacement` object pre-initialized with defaults, and you modify its properties to control positioning:

```csharp
myPopup.CustomPopupPlacementCallback = placement =>
{
    placement.Anchor = PopupAnchor.TopRight;
    placement.Gravity = PopupGravity.BottomRight;
    placement.Offset = new Point(8, 0);
};
```

This callback is also available on `PopupFlyoutBase`, `ContextMenu`, and as an attached property on `ToolTip`:

```csharp
ToolTip.SetCustomPopupPlacementCallback(myControl, placement =>
{
    placement.Offset = new Point(0, -10);
});
```

## Popup vs Flyout vs ToolTip

| Feature | Popup | Flyout | ToolTip |
|---|---|---|---|
| Level | Low-level primitive | High-level, attached | High-level, attached |
| Trigger | Manual (`IsOpen`) | Programmatic or attached | Hover |
| Light dismiss | Optional | Built-in | Built-in |
| Keyboard support | Manual | Automatic | N/A |
| Best for | Custom overlay behavior | Menus, confirmations, pickers | Hover hints |

## See also

- [Flyout](/controls/layout/containers/flyout): A higher-level popup attached to a control.
- [ToolTip](/controls/feedback/tooltip): Hover-activated popups for supplementary text.
- [ContextMenu](/controls/menus/contextmenu): Right-click menus.
