---
id: controls-and-layouts
title: Controls & Layouts
---

### Controls

Avalonia provides many core controls. Here are some of the most common:

* Buttons: [`Button`](../../controls/buttons/button), [`RepeatButton`](../../controls/buttons/repeatbutton)
* Data Display: [`ItemsControl`](../../controls/itemscontrol), [`ItemsRepeater`](../../controls/itemsrepeater), [`ListBox`](../../controls/listbox), [`TreeView`](../../controls/treeview)
* Input: [`CheckBox`](../../controls/checkbox), [`ComboBox`](../../controls/combobox), [`RadioButton`](../../controls/buttons/radiobutton), [`Slider`](../../controls/slider), [`TextBox`](../../controls/textbox)
* Layout: [`Border`](../../controls/border), [`Canvas`](../../controls/canvas), [`DockPanel`](../../controls/dockpanel), [`Expander`](../../controls/expander), [`Grid`](../../controls/grid), [`GridSplitter`](../../controls/gridsplitter), [`Panel`](../../controls/panel), [`Separator`](../../controls/separator), [`ScrollBar`](../../controls/scrollbar), [`ScrollViewer`](../../controls/scrollviewer), [`StackPanel`](../../controls/stackpanel), [`Viewbox`](../../controls/viewbox), [`WrapPanel`](../../controls/wrappanel)
* Menus: [`ContextMenu`](../../controls/contextmenu), [`Menu`](../../controls/menu), [`NativeMenu`](../../controls/nativemenu)
* Navigation: [`TabControl`](../../controls/tabcontrol), [`TabStrip`](../../controls/tabstrip)
* User Information: [`ProgressBar`](../../controls/progressbar), [`TextBlock`](../../controls/textblock), [`ToolTip`](../../controls/tooltip)

## Input and Commands

Controls most often detect and respond to user input. The Avalonia [input system](../../input/) uses both [direct and routed events](../../input/routed-events) to support text input, focus management, and mouse positioning.

Applications often have complex input requirements. Avalonia provides a [command system](../../data-binding/binding-to-commands) that separates user-input actions from the code that responds to those actions.

### Layout

When you create a user interface, you arrange your controls by location and size to form a layout. A key requirement of any layout is to adapt to changes in window size and display settings. Rather than forcing you to write the code to adapt a layout in these circumstances, Avalonia provides a first-class, extensible layout system for you.

The cornerstone of the layout system is relative positioning, which increases the ability to adapt to changing window and display conditions. In addition, the layout system manages the negotiation between controls to determine the layout. The negotiation is a two-step process: first, a control tells its parent what location and size it requires; second, the parent tells the control what space it can have.

The layout system is exposed to child controls through base Avalonia classes. For common layouts such as grids, stacking, and docking, Avalonia includes several layout controls

* [`Panel`](../../controls/panel): Child controls are stacked on top of each other to fill the panel
* [`DockPanel`](../../controls/dockpanel): Child controls are aligned to the edges of the panel
* [`StackPanel`](../../controls/stackpanel): Child controls are stacked either vertically or horizontally
* [`WrapPanel`](../../controls/wrappanel): Child controls are positioned in left-to-right order and wrapped to the next line when there are more controls on the current line than space allows
* [`Grid`](../../controls/grid): Child controls are positioned by rows and columns
* [`Canvas`](../../controls/canvas): Child controls provide their own layout

You can also create your own layouts by deriving from the [`Panel`](../../controls/panel) class.
