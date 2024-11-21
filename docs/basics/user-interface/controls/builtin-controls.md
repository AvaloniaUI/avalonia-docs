# Built-in Controls

Here are some of the more commonly-used Avalonia controls, organized by category:

## Layout controls

| Control                                                                        |Description|
|:-------------------------------------------------------------------------------|:----|
| [Border](../../../reference/controls/border.md)             |Decorates a single child with a border and background.|
| [Canvas](../../../reference/controls/canvas.md)                                |Displays child controls at specified positions.|
| [Dock Panel](../../../reference/controls/dockpanel.md)                         |Arranges child controls along specified edges (top, bottom, left, right) with one filling any remaining space.|
| [Expander](../../../reference/controls/expander.md)                            |Has a header area (always visible) and a collapsible content section (single child).|
| [Grid](../../../reference/controls/grid/README.md)                             |Arranges child controls in the cells of a grid, positioned by row and column. The cells can span rows and columns.|
| [Grid Splitter](../../../reference/controls/gridsplitter.md)                   |Can be added to a grid to allow the user to resize rows or columns at runtime.|
| [Panel](../../../reference/controls/panel.md)                                  |Stacks child controls on top of one another.|
| [Relative Panel](../../../reference/controls/relativepanel.md)                 |Allows multiple child controls. The position and alignment of the child controls can be specified in relation to the panel itself, or in relation to other child controls.  The size of child controls can be specified, or calculated from relations and alignments.|
| [Scroll Viewer](../../../reference/controls/scrollviewer.md)                   |Adds scroll bars and scrolling behavior if the (single) child is larger than the space available.|
| [Split View](../../../reference/controls/splitview.md)                         |Adds a collapsible pane to the edge of its (single child) content zone.|
| [Stack Panel](../../../reference/controls/stackpanel.md)                       |Allows multiple child controls, arranged in sequence, horizontally or vertically.|
| [Tab Control](../../../reference/controls/tabcontrol.md)    |The tab control allows you to sub-divide a view into tab items.|
| [Uniform Grid](../../../reference/controls/uniform-grid.md) |Allows multiple child controls, arranged in a grid with cells of uniform column and row size.|
| [Wrap Panel](../../../reference/controls/wrappanel.md)      |Arranges child controls in sequence from left to right, while they fit in the width. Starts a new line when there is no space left.|

## Buttons

|Control|Description|
|:----|:----|
|[Button](../../../reference/controls/buttons/button.md)|The basic button control - can display text, an icon or both. Has standard 'click' behavior.|
|[RepeatButton](../../../reference/controls/buttons/repeatbutton.md)|A button that raises its click event repeatedly when it is pressed and held.|
|[RadioButton](../../../reference/controls/buttons/radiobutton.md)|A button that has a selected state. It can be placed in a group so that selection of one button deselects all the others in the group.|
|[ToggleButton](../../../reference/controls/buttons/togglebutton.md)|A button that has a selected state and a unselected state. Subsequent clicks 'toggle' this state. A 'checked' pseudo class allows different styles to be allocated to the selected  and unselected states.|
|[ButtonSpinner](../../../reference/controls/buttons/buttonspinner.md)|A control with two spin buttons and a content zone.|
|[SplitButton](../../../reference/controls/buttons/splitbutton.md)|This functions as a button with primary and secondary parts that can be pressed independently. The primary part behaves like standard button, and the secondary part opens a flyout with additional actions.|
|[ToggleSplitButton](../../../reference/controls/buttons/togglesplitbutton.md)|This functions as a button with primary and secondary parts that can be pressed independently. The primary part behaves like toggle button, and the secondary part opens a flyout with additional actions.|

## Repeating Data Controls

These controls display repeating data, in either a tabular or list format:

|Control|Description|
|:----|:----|
|[DataGrid](../../../reference/controls/datagrid)|Displays data in a customizable grid.|
|[ItemsControl](../../../reference/controls/itemscontrol.md)|Displays a collection of items from a bound data source.|
|[ItemsRepeater](../../../reference/controls/itemsrepeater.md)|Displays repeating data from a bound data source. It has both a layout template and a data template.|
|[ListBox](../../../reference/controls/listbox.md)|A control with items that can be selected.|
|[ComboBox](../../../reference/controls/combobox.md)|A control with a drop-down list with items that can be selected.|

## Text display and editing

|Control|Description|
|:----|:----|
|[AutoCompleteBox](../../../reference/controls/autocompletebox.md)|A control that shows a text box for user input and a drop-down that contains possible matches based on what has been typed.|
|[TextBlock](../../../reference/controls/textblock.md)|A control that displays a block of text. Read-only.|
|[TextBox](../../../reference/controls/textbox.md)|Used to display or edit text without formatting restrictions.|
|[SelectableTextBlock](../../../reference/controls/selectable-textblock.md)|Used to display or edit text without formatting restrictions. Allows selecting and copying.|
|[MaskedTextBox](../../../reference/controls/maskedtextbox.md)|Used to display text in the format contained in a mask; or used to edit text using the format mask to prevent invalid user input.|

## Value selection

|Control|Type|Description|
|:----|:----|:----|
|[CheckBox](../../../reference/controls/checkbox.md)|Boolean|True value presented as a check mark. Click interaction toggles the value. Has an option to display an 'unknown' value.|
|[Slider](../../../reference/controls/slider.md)|Double|Relative value compared to a maximum and minimum value presented as the position along the length of the slider track of the slider button. Drag interaction on the slider button can alter the value between the maximum and minimum values. Keyboard and click interactions can also nudge the value.|
|[Calendar](../../../reference/controls/calendar)|DateTime|The calendar is a control for users to select dates or date ranges.|
|[CalendarDatePicker](../../../reference/controls/calendar/calendar-date-picker.md)|DateTime|An extension of the calendar control that includes a text box and button.|
|[ColorPicker](../../../reference/controls/colorpicker)|Color / HsvColor|The color picker supports user-selection and editing of colors using a spectrum, palette and component sliders. It also supports an optional alpha component, RGB or HSV color models and hexadecimal color values.|
|[DatePicker](../../../reference/controls/datepicker.md)|DateTime|The date picker has three 'spinner' controls to allow the user to pick a date value.|
|[TimePicker](../../../reference/controls/timepicker.md)|TimeSpan|The time picker has three 'spinner' controls to allow the user to pick a time from hours, minutes and seconds.|

## Displaying images

|Control|Description|
|:----|:----|
|[Image](../../../reference/controls/image.md)|Displays a bitmap or vector image.|
|[PathIcon](../../../reference/controls/path-icon.md)|Draws a vector image using the current `Foreground`.|

## Menus and Popups

|Control|Description|
|:----|:----|
|[Menu](../../../reference/controls/menu.md)|Displays an application menu.|
|[Flyouts](../../../reference/controls/flyouts.md)|Attaches a popup or a context menu to a control.|
|[ToolTip](../../../reference/controls/tooltip.md)|Displays a tool tip when a control is hovered.|
