---
description: REFERENCE - Built-in Controls
---

import TreeDataGridFilesScreenshot from '/img/reference/controls/treedatagrid/treedataggrid-files.png';
import TreeDataGridCountriesScreenshot from '/img/reference/controls/treedatagrid/treedataggrid-countries.png';
import TreeDataGridNuGetScreenshot from '/img/reference/controls/treedatagrid/treedataggrid-nuget.png';

# TreeDataGrid 树状数据表格

`TreeDataGrid` 在单个视图中同时显示分层数据和表格数据。它是树视图和数据网格的组合。

:::info
有关树视图控件的完整信息，请参见[此处](../treeview-1.md)的参考。
:::

:::info
有关数据网格控件的完整信息，请参见[此处](../datagrid/)的参考。
:::

该控件有两种操作模式：

* _分层 -_ 数据以树形结构显示，并带有可选列
* _平面 -_ 数据以二维表格显示，类似于数据网格控件

## 分层数据

这是一个显示分层数据的树数据网格的示例：

<img src={TreeDataGridFilesScreenshot} alt="" />

## 平面数据

这是一个显示平面数据的树数据网格的示例：

<img src={TreeDataGridCountriesScreenshot} alt="" />

# 配置步骤

## NuGet 包引用

您必须安装数据网格的 _NuGet_ 包，有几种方法可以做到这一点。您可以使用 IDE 项目菜单中的 **Manage NuGet Packages**：

<img src={TreeDataGridNuGetScreenshot} alt=""/>
或者，您可以从命令行运行以下指令：

```bash
dotnet add package Avalonia.Controls.TreeDataGrid
```

或者直接将包引用添加到项目 (`.csproj`) 文件中：

```xml
<PackageReference Include="Avalonia.Controls.TreeDataGrid" Version="11.0.0" />
```

:::warning
注意，您必须始终安装与您使用的 _Avalonia UI_ 版本匹配的数据网格版本。
:::

## 包含数据网格样式

您必须引用数据网格主题以包含树数据网格使用的附加样式。您可以通过在应用程序 (`App.axaml` 文件) 中添加 `<StyleInclude>` 元素来实现这一点。否则运行之后，可能会只显示空白。

例如：

```xml
<Application xmlns="https://github.com/avaloniaui"
       xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
       x:Class="AvaloniaApplication.App">
  <Application.Styles>
  <FluentTheme/>
  <StyleInclude 
    Source="avares://Avalonia.Controls.TreeDataGrid/Themes/Fluent.axaml"/>
  </Application.Styles>
</Application>
```
#补充说明

## 有用的属性

您可能最常使用这些属性：

| 属性                   | 描述                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `Source`               | 用作控件数据源的绑定集合。                                                                     |
| `CanUserResizeColumns` | 指示用户是否可以使用指针调整列宽。（默认值为 false。）                                         |
| `CanUserSortColumns`   | 指示用户是否可以通过单击列标题对列进行排序。（默认值为 true。）                                |

## Source

您将使用 `Source` 属性绑定到代码中定义的视图模型。视图模型包括列如何映射到保存网格项的类的属性的定义。

## 更多信息

:::info
有关此控件的完整 API 文档，请参见此处。
:::

:::info
在 GitHub 上查看源代码 [TreeDataGrid.cs](https://github.com/AvaloniaUI/Avalonia.Controls.TreeDataGrid)
:::

下一页展示了创建带有列的分层树数据网格的示例。

