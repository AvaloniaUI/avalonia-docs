# 内置控件

以下是一些常用的 Avalonia 控件，按类别列出：

## 布局控件

| 控件                                                                             | 描述                                                                        |
|:-------------------------------------------------------------------------------|:--------------------------------------------------------------------------|
| [Border](/docs/reference/controls/border)             | 用边框和背景装饰单个子元素。                                                            |
| [Canvas](/docs/reference/controls/canvas)                                | 在指定位置显示子控件。                                                               |
| [Dock Panel](/docs/reference/controls/dockpanel)                         | 将子控件沿指定边缘（顶部、底部、左侧、右侧）排列，并使其中一个填充剩余空间。                                    |
| [Expander](/docs/reference/controls/expander)                            | 具有标题区域（始终可见）和可折叠的内容区域（单个子元素）。                                             |
| [Grid](/docs/reference/controls/grid)                                    | 将子控件排列在网格的单元格中，按行和列定位。单元格可以跨行和跨列。                                         |
| [Grid Splitter](/docs/reference/controls/gridsplitter)                   | 可以添加到网格中，允许用户在运行时调整行或列大小。                                                 |
| [Panel](/docs/reference/controls/panel)                                  | 将子控件堆叠在一起。                                                                |
| [Relative Panel](/docs/reference/controls/relativepanel)                 | 允许多个子控件。子控件的位置和对齐方式可以相对于面板本身指定，也可以相对于其他子控件指定。可以指定子控件的大小，也可以根据关系和对齐方式计算大小。 |
| [Scroll Viewer](/docs/reference/controls/scrollviewer)                   | 如果（单个）子控件大于可用空间，则添加滚动条和滚动行为。                                              |
| [Split View](/docs/reference/controls/splitview)                         | 在其（单个子控件）内容区域的边缘添加可折叠的窗格。                                                 |
| [Stack Panel](/docs/reference/controls/stackpanel)                       | 允许多个子控件，按顺序水平或垂直排列。                                                       |
| [Tab Control](/docs/reference/controls/tabcontrol)    | 标签控件允许将视图细分为标签项。                                                          |
| [Uniform Grid](/docs/reference/controls/uniform-grid) | 允许多个子控件，以网格形式排列，单元格具有统一的列和行大小。                                            |
| [Wrap Panel](/docs/reference/controls/wrappanel)      | 将子控件从左到右按顺序排列，当宽度不足时，换行显示。                                                |

## 按钮

| 控件                                                                              | 描述                                                            |
|:--------------------------------------------------------------------------------|:--------------------------------------------------------------|
| [Button](/docs/reference/controls/buttons/button)                         | 基本按钮控件 - 可以显示文本、图标或两者。具有标准的“点击”行为。                            |
| [Repeat Button](/docs/reference/controls/buttons/repeatbutton)            | 按钮在按下并保持按住时重复引发其点击事件。                                         |
| [Radio Button](/docs/reference/controls/buttons/radiobutton)              | 按钮具有选中状态。它可以放置在一组中，以使一个按钮的选择取消所有其他按钮的选择。                      |
| [Toggle Button](/docs/reference/controls/buttons/togglebutton)            | 按钮具有选中状态和未选中状态。后续点击“切换”此状态。通过“checked”伪类可以为选中状态和未选中状态分配不同的样式。 |
| [Button Spinner](/docs/reference/controls/buttons/buttonspinner)          | 一个带有两个旋转按钮和内容区域的控件。                                           |
| [Split Button](/docs/reference/controls/buttons/splitbutton)              | 此按钮具有主要和次要部分，可以独立按下。主要部分的行为类似于标准按钮，而次要部分则打开一个带有附加操作的弹出菜单。     |
| [Toggle Split Button](/docs/reference/controls/buttons/togglesplitbutton) | 此按钮具有主要和次要部分，可以独立按下。主要部分的行为类似于切换按钮，而次要部分打开一个带有附加操作的弹出菜单。      |

## 重复数据控件

这些控件以表格或列表格式显示重复数据：

| 控件                                                             | 描述                           |
|:---------------------------------------------------------------|:-----------------------------|
| [Data Grid](/docs/reference/controls/datagrid)              | 在可自定义的网格中显示数据。               |
| [Items Control](/docs/reference/controls/itemscontrol)   | 	显示来自绑定数据源的项目集合。             |
| [Items Repeater](/docs/reference/controls/itemsrepeater) | 显示来自绑定数据源的重复数据。它具有布局模板和数据模板。 |
| [List Box](/docs/reference/controls/listbox)             | 一个包含可选择项的控件。                 |
| [Combo Box](/docs/reference/controls/combobox)           | 一个带有下拉列表的控件，其中的项目可以选择。       |

## 文本显示和编辑

| Control                                                                   | Description                               |
|:--------------------------------------------------------------------------|:------------------------------------------|
| [Auto Complete Box](/docs/reference/controls/autocompletebox)       | 一个显示文本框用于用户输入和一个下拉框，其中包含根据已输入内容可能匹配的项的控件。 |
| [Text Block](/docs/reference/controls/textblock) | 用于显示文本块的控件。只读。                            |
| [Text Box](/docs/reference/controls/textbox)     | 用于显示或编辑文本的控件，没有格式限制。                      |
| [Masked Text Box](/docs/reference/controls/maskedtextbox)           | 用于在掩码中显示文本；或用于使用掩码编辑文本，以防止无效的用户输入。        |

## 值选择

| 控件                                                                                                      | 类型               | 描述                                                                      |
|:--------------------------------------------------------------------------------------------------------|:-----------------|:------------------------------------------------------------------------|
| [Check Box](/docs/reference/controls/checkbox)                                                    | Boolean          | 以勾选标记形式表示的 True 值。点击交互切换值。具有显示“未知”值的选项。                                 |
| [Slider](/docs/reference/controls/slider)                                                         | Double           | 相对于最大值和最小值的相对值，以滑动条按钮在滑动条轨道上的位置表示。拖动滑动条按钮可以在最大值和最小值之间更改值。键盘和点击交互也可以微调值。 |
| [Calendar](/docs/reference/controls/calendar)                                     | DateTime         | 日历是用户选择日期或日期范围的控件。                                                      |
| [Calendar Date Picker](/docs/reference/controls/calendar/calendar-date-picker) | DateTime         | 日期选择器的扩展，包括文本框和按钮。                                                      |
| [Color Picker](/docs/reference/controls/colorpicker)                                                 | Color / HsvColor | 颜色选择器支持用户使用光谱、调色板和组件滑块选择和编辑颜色。它还支持可选的 alpha 分量、RGB 或 HSV 颜色模型和十六进制颜色值。  |
| [Date Picker](/docs/reference/controls/datepicker)                                                | DateTime         | 日期选择器有三个“微调”控件，允许用户选择日期值。                                               |
| [Time Picker](/docs/reference/controls/timepicker)                             | TimeSpan         | 时间选择器有三个“微调”控件，允许用户选择小时、分钟和秒钟。                                          |

## 显示图像

| 控件                                                                       | 描述                       |
|:-------------------------------------------------------------------------|:-------------------------|
| [Image](/docs/reference/controls/image)                            | 显示位图或矢量图像。               |
| [Path Icon](/docs/reference/controls/path-icon) | 使用当前的`Foreground`绘制矢量图像。 |

## 菜单和弹出框

| 控件                                                                    | 描述                |
|:----------------------------------------------------------------------|:------------------|
| [Menu](/docs/reference/controls/menu)                           | 显示应用程序菜单。         |
| [Flyouts](/docs/reference/controls/flyouts)                     | 将弹出菜单或上下文菜单附加到控件。 |
| [Tool Tip](/docs/reference/controls/tooltip) | 当鼠标悬停在控件上时显示工具提示。 |
