---
id: custom-itemspanel
title: Custom ItemsPanel
description: Replace the default items panel in an ItemsControl with a custom panel to achieve unique layouts not provided by the built-in controls.
doc-type: how-to
---

import ItemsControlCanvasScreenshot from '/img/custom-controls/itemscontrol-with-canvas.png';

Some controls, such as `ItemsControl`, use an `ItemsPanel` to arrange child elements. In most cases, the default panel is a `StackPanel` or `VirtualizingStackPanel`. which organize items as simple horizontal or vertical lists.

If you need more complex, non-linear layouts, you can override the default panel and replace it with a custom panel.

## Example use cases

- Use a [`Canvas`](/controls/layout/panels/canvas) for absolute positioning. Place items at specific coordinates.
- Use a [`WrapPanel`](/controls/layout/panels/wrappanel) for wrapping layouts. Flow items across rows or columns.
- For complex, fully custom layouts, use a [custom panel](/docs/custom-controls/custom-panel) with your own `ArrangeOverride` logic.

:::warning[Performance]
If you replace the default panel with a non-virtualizing panel such as `Canvas` or `WrapPanel`, the control creates a UI element for every item in the collection. For large collections (hundreds or thousands of items), this can significantly increase memory usage and degrade rendering performance. If you need a custom layout with large datasets, consider building a custom panel that extends `VirtualizingPanel` to retain virtualization.
:::

## Compatibility

The following controls support a custom `ItemsPanel`:

- [`ItemsControl`](/controls/data-display/collections/itemscontrol)
- [`TreeView`](/controls/data-display/structured-data/treeview)
- [`Carousel`](/controls/data-display/collections/carousel)
- [`Menu`](/controls/menus/menu)
- [`ComboBox`](/controls/input/selectors/combobox)
- [`ListBox`](/controls/data-display/collections/listbox)

## Creating a custom `ItemsControl` with a `Canvas` panel

This example creates a display of rectangular tiles. The tiles are defined as an `ObservableCollection` in the view model, then bound to an `ItemsControl` in XAML. The `ItemsPanel` is a `Canvas` that uses a style to position the tiles within the canvas.

<Image light={ItemsControlCanvasScreenshot} alt="ItemsControl with a Canvas panel displaying positioned rectangles" position="center" maxWidth={200} cornerRadius="true"/>
<br />

1. In your view model file, add a class for the tiles.

    ```csharp title="MainWindowViewModel.cs"
    namespace MyApp.ViewModels;

    public record Tile (int Size, int TopX, int TopY);
    ```

2. In your view model file, define an observable collection containing some tiles.

    ```csharp title="MainWindowViewModel.cs"
    using System.Collections.Generic;
    using System.Collections.ObjectModel;

    namespace MyApp.ViewModels;

    public record Tile (int Size, int TopX, int TopY);

    public partial class MainWindowViewModel : ViewModelBase
    {
        public ObservableCollection<Tile> TileList { get; set; }
        
        public MainWindowViewModel()
        {
            TileList = new ObservableCollection<Tile>(new List<Tile>
            {
                new Tile(10, 10, 10),
                new Tile(10, 20, 20),
                new Tile(10, 30, 30),
            });    
        }
    }
    ```

3. In your XAML, add the `ItemsControl` and bind it to the observable collection of tiles.

    ```xml title="MainWindow.axaml"
    <ItemsControl ItemsSource="{Binding TileList}">
    </ItemsControl>
    ```
  
4. In your XAML, add an `ItemsPanel` inside the `ItemsControl` tags. Use `ItemsPanelTemplate` to override the default panel. Then, add the `Canvas` and give it the appropriate data bindings and styling.

    ```xml title="MainWindow.axaml"
    <ItemsControl ItemsSource="{Binding TileList}">
            <ItemsControl.ItemsPanel>
                    <ItemsPanelTemplate>
                            <Canvas Width="50" Height="50"
                                    Background="Yellow"
                                    Margin="3"/>
                    </ItemsPanelTemplate>
            </ItemsControl.ItemsPanel>
            <ItemsControl.ItemTemplate>
                    <DataTemplate>
                            <Rectangle Fill="Green"
                                       Height="{Binding Size}"
                                       Width="{Binding Size}"/>
                    </DataTemplate>
            </ItemsControl.ItemTemplate>
            <ItemsControl.Styles>
                    <Style Selector="ContentPresenter"
                           x:DataType="vm:Tile">
                            <Setter Property="Canvas.Left"
                                    Value="{Binding TopX}"/>
                            <Setter Property="Canvas.Top"
                                    Value="{Binding TopY}"/>
                    </Style>
            </ItemsControl.Styles>
    </ItemsControl>
    ```

## See also

- [Custom Panel](/docs/custom-controls/custom-panel): Write your own panel by overriding `MeasureOverride` and `ArrangeOverride`.
- [Attached properties](/docs/custom-controls/defining-properties#attached-properties): Position items in a panel that reads per-child values.
- [`ItemsControl`](/controls/data-display/collections/itemscontrol): Reference for the control whose items panel you are replacing.
- [Layout](/docs/layout): How the measure and arrange system works.