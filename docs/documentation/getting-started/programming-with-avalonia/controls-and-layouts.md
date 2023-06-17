# Controls & Layouts

### Controls <a id="controls"></a>

Avalonia provides many core controls. Here are some of the most common:

* Buttons: [`Button`](../../controls/button.md), [`RepeatButton`](../../controls/repeatbutton.md)
* Data Display: [`ItemsControl`](../../controls/itemscontrol.md), [`ItemsRepeater`](../../controls/itemsrepeater.md), [`ListBox`](../../controls/listbox.md), [`TreeView`](../../controls/treeview-1.md)
* Input: [`CheckBox`](../../controls/checkbox.md), [`ComboBox`](../../controls/combobox.md), [`RadioButton`](../../controls/radiobutton.md), [`Slider`](../../controls/slider.md), [`TextBox`](../../controls/textbox.md)
* Layout: [`Border`](../../controls/border.md), [`Canvas`](../../controls/canvas.md), [`DockPanel`](../../controls/dockpanel.md), [`Expander`](../../controls/expander.md), [`Grid`](../../controls/grid.md), [`GridSplitter`](../../controls/gridsplitter.md), [`Panel`](../../controls/panel.md), [`Separator`](../../controls/separator.md), [`ScrollBar`](../../controls/scrollbar.md), [`ScrollViewer`](../../controls/scrollviewer.md), [`StackPanel`](../../controls/stackpanel.md), [`Viewbox`](../../controls/viewbox.md), [`WrapPanel`](../../controls/wrappanel.md)
* Menus: [`ContextMenu`](../../controls/contextmenu.md), [`Menu`](../../controls/menu.md), [`NativeMenu`](../../controls/nativemenu.md)
* Navigation: [`TabControl`](../../controls/tabcontrol.md), [`TabStrip`](../../controls/tabstrip.md)
* User Information: [`ProgressBar`](../../controls/progressbar.md), [`TextBlock`](../../controls/textblock.md), [`ToolTip`](../../controls/tooltip.md)

## Input and Commands

Controls most often detect and respond to user input. The Avalonia [input system](../../input/) uses both [direct and routed events](../../input/routed-events.md) to support text input, focus management, and mouse positioning.

Applications often have complex input requirements. Avalonia provides a [command system](../../data-binding/binding-to-commands.md) that separates user-input actions from the code that responds to those actions.

### Layout <a id="layout"></a>

When you create a user interface, you arrange your controls by location and size to form a layout. A key requirement of any layout is to adapt to changes in window size and display settings. Rather than forcing you to write the code to adapt a layout in these circumstances, Avalonia provides a first-class, extensible layout system for you.

The cornerstone of the layout system is relative positioning, which increases the ability to adapt to changing window and display conditions. In addition, the layout system manages the negotiation between controls to determine the layout. The negotiation is a two-step process: first, a control tells its parent what location and size it requires; second, the parent tells the control what space it can have.

The layout system is exposed to child controls through base Avalonia classes. For common layouts such as grids, stacking, and docking, Avalonia includes several layout controls

* [`Panel`](../../controls/panel.md): Child controls are stacked on top of each other to fill the panel
* [`DockPanel`](../../controls/dockpanel.md): Child controls are aligned to the edges of the panel
* [`StackPanel`](../../controls/stackpanel.md): Child controls are stacked either vertically or horizontally
* [`WrapPanel`](../../controls/wrappanel.md): Child controls are positioned in left-to-right order and wrapped to the next line when there are more controls on the current line than space allows
* [`Grid`](../../controls/grid.md): Child controls are positioned by rows and columns
* [`Canvas`](../../controls/canvas.md): Child controls provide their own layout

You can also create your own layouts by deriving from the [`Panel`](../../controls/panel.md) class.

