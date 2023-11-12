# 内置控件

以下是一些常用的 Avalonia 控件，按类别列出：

## 布局控件

| 控件                                                                             | 描述                                                                        |
|:-------------------------------------------------------------------------------|:--------------------------------------------------------------------------|
| [Border](../../../reference/controls/detailed-reference/border.md)             | 用边框和背景装饰单个子元素。                                                            |
| [Canvas](../../../reference/controls/canvas.md)                                | 在指定位置显示子控件。                                                               |
| [Dock Panel](../../../reference/controls/dockpanel.md)                         | 将子控件沿指定边缘（顶部、底部、左侧、右侧）排列，并使其中一个填充剩余空间。                                    |
| [Expander](../../../reference/controls/expander.md)                            | 具有标题区域（始终可见）和可折叠的内容区域（单个子元素）。                                             |
| [Grid](../../../reference/controls/grid.md)                                    | 将子控件排列在网格的单元格中，按行和列定位。单元格可以跨行和跨列。                                         |
| [Grid Splitter](../../../reference/controls/gridsplitter.md)                   | 可以添加到网格中，允许用户在运行时调整行或列大小。                                                 |
| [Panel](../../../reference/controls/panel.md)                                  | 将子控件堆叠在一起。                                                                |
| [Relative Panel](../../../reference/controls/relativepanel.md)                 | 允许多个子控件。子控件的位置和对齐方式可以相对于面板本身指定，也可以相对于其他子控件指定。可以指定子控件的大小，也可以根据关系和对齐方式计算大小。 |
| [Scroll Viewer](../../../reference/controls/scrollviewer.md)                   | 如果（单个）子控件大于可用空间，则添加滚动条和滚动行为。                                              |
| [Split View](../../../reference/controls/splitview.md)                         | 在其（单个子控件）内容区域的边缘添加可折叠的窗格。                                                 |
| [Stack Panel](../../../reference/controls/stackpanel.md)                       | 允许多个子控件，按顺序水平或垂直排列。                                                       |
| [Tab Control](../../../reference/controls/detailed-reference/tabcontrol.md)    | 标签控件允许将视图细分为标签项。                                                          |
| [Uniform Grid](../../../reference/controls/detailed-reference/uniform-grid.md) | 允许多个子控件，以网格形式排列，单元格具有统一的列和行大小。                                            |
| [Wrap Panel](../../../reference/controls/detailed-reference/wrappanel.md)      | 将子控件从左到右按顺序排列，当宽度不足时，换行显示。                                                |

## 按钮

| 控件                                                                              | 描述                                                            |
|:--------------------------------------------------------------------------------|:--------------------------------------------------------------|
| [Button](../../../reference/controls/buttons/button.md)                         | 基本按钮控件 - 可以显示文本、图标或两者。具有标准的“点击”行为。                            |
| [Repeat Button](../../../reference/controls/buttons/repeatbutton.md)            | 按钮在按下并保持按住时重复引发其点击事件。                                         |
| [Radio Button](../../../reference/controls/buttons/radiobutton.md)              | 按钮具有选中状态。它可以放置在一组中，以使一个按钮的选择取消所有其他按钮的选择。                      |
| [Toggle Button](../../../reference/controls/buttons/togglebutton.md)            | 按钮具有选中状态和未选中状态。后续点击“切换”此状态。通过“checked”伪类可以为选中状态和未选中状态分配不同的样式。 |
| [Button Spinner](../../../reference/controls/buttons/buttonspinner.md)          | 一个带有两个旋转按钮和内容区域的控件。                                           |
| [Split Button](../../../reference/controls/buttons/splitbutton.md)              | 此按钮具有主要和次要部分，可以独立按下。主要部分的行为类似于标准按钮，而次要部分则打开一个带有附加操作的弹出菜单。     |
| [Toggle Split Button](../../../reference/controls/buttons/togglesplitbutton.md) | 此按钮具有主要和次要部分，可以独立按下。主要部分的行为类似于切换按钮，而次要部分打开一个带有附加操作的弹出菜单。      |

## 重复数据控件

这些控件以表格或列表格式显示重复数据：

| 控件                                                             | 描述                           |
|:---------------------------------------------------------------|:-----------------------------|
| [Data Grid](../../../reference/controls/datagrid)              | 在可自定义的网格中显示数据。               |
| [Items Control](../../../reference/controls/itemscontrol.md)   | 	显示来自绑定数据源的项目集合。             |
| [Items Repeater](../../../reference/controls/itemsrepeater.md) | 显示来自绑定数据源的重复数据。它具有布局模板和数据模板。 |
| [List Box](../../../reference/controls/listbox.md)             | 一个包含可选择项的控件。                 |
| [Combo Box](../../../reference/controls/combobox.md)           | 一个带有下拉列表的控件，其中的项目可以选择。       |

## 文本显示和编辑

| Control                                                                   | Description                               |
|:--------------------------------------------------------------------------|:------------------------------------------|
| [Auto Complete Box](../../../reference/controls/autocompletebox.md)       | 一个显示文本框用于用户输入和一个下拉框，其中包含根据已输入内容可能匹配的项的控件。 |
| [Text Block](../../../reference/controls/detailed-reference/textblock.md) | 用于显示文本块的控件。只读。                            |
| [Text Box](../../../reference/controls/detailed-reference/textbox.md)     | 用于显示或编辑文本的控件，没有格式限制。                      |
| [Masked Text Box](../../../reference/controls/maskedtextbox.md)           | 用于在掩码中显示文本；或用于使用掩码编辑文本，以防止无效的用户输入。        |

## 值选择

| 控件                                                                                                      | 类型               | 描述                                                                      |
|:--------------------------------------------------------------------------------------------------------|:-----------------|:------------------------------------------------------------------------|
| [Check Box](../../../reference/controls/checkbox.md)                                                    | Boolean          | 以勾选标记形式表示的 True 值。点击交互切换值。具有显示“未知”值的选项。                                 |
| [Slider](../../../reference/controls/slider.md)                                                         | Double           | 相对于最大值和最小值的相对值，以滑动条按钮在滑动条轨道上的位置表示。拖动滑动条按钮可以在最大值和最小值之间更改值。键盘和点击交互也可以微调值。 |
| [Calendar](../../../reference/controls/detailed-reference/calendar)                                     | DateTime         | 日历是用户选择日期或日期范围的控件。                                                      |
| [Calendar Date Picker](../../../reference/controls/detailed-reference/calendar/calendar-date-picker.md) | DateTime         | 日期选择器的扩展，包括文本框和按钮。                                                      |
| [Color Picker](../../../reference/controls/colorpicker)                                                 | Color / HsvColor | 颜色选择器支持用户使用光谱、调色板和组件滑块选择和编辑颜色。它还支持可选的 alpha 分量、RGB 或 HSV 颜色模型和十六进制颜色值。  |
| [Date Picker](../../../reference/controls/datepicker.md)                                                | DateTime         | 日期选择器有三个“微调”控件，允许用户选择日期值。                                               |
| [Time Picker](../../../reference/controls/detailed-reference/timepicker.md)                             | TimeSpan         | 时间选择器有三个“微调”控件，允许用户选择小时、分钟和秒钟。                                          |

## 显示图像

| 控件                                                                       | 描述                       |
|:-------------------------------------------------------------------------|:-------------------------|
| [Image](../../../reference/controls/image.md)                            | 显示位图或矢量图像。               |
| [Path Icon](../../../reference/controls/detailed-reference/path-icon.md) | 使用当前的`Foreground`绘制矢量图像。 |

## 菜单和弹出框

| 控件                                                                    | 描述                |
|:----------------------------------------------------------------------|:------------------|
| [Menu](../../../reference/controls/menu.md)                           | 显示应用程序菜单。         |
| [Flyouts](../../../reference/controls/flyouts.md)                     | 将弹出菜单或上下文菜单附加到控件。 |
| [Tool Tip](../../../reference/controls/detailed-reference/tooltip.md) | 当鼠标悬停在控件上时显示工具提示。 |
