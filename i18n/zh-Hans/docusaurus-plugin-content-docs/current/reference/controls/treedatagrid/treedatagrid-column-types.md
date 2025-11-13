---
description: REFERENCE - Built-in Controls
---

# 树形数据表格列类型

:::warning
自 2025 年 10 月起，`TreeDataGrid` 已作为 Avalonia Accelerate 的一部分进行维护。请参阅[Accelerate 文档中关于 `TreeDataGrid` 列类型的说明](/accelerate/components/treedatagrid/column-types)。
:::

树形数据网格支持三种不同的列类型：

* 文本列
* 层次结构展开列
* 模板列

### 文本列

文本列（类 `TextColumn`）在您希望列中的单元格具有文本值时非常有用。可以这样创建文本列：

```csharp
new TextColumn<ItemClass, string>("Column Header", x => x.Property)
```

这里的第一个泛型参数是构成网格行的项目的类。第二个泛型参数是属性的类型。

![](https://user-images.githubusercontent.com/53405089/157456551-dd394781-903a-4c7b-8874-e631e21534a1.png)

上图是 `TextColumn` 构造函数的签名。前两个参数是必需的：第一个是列标题，第二个是获取属性值的表达式。

`TextColumn` 类实现了列接口 `IColumn`。

### 层次结构展开列

层次结构展开列（类：`HierarchicalExpanderColumn`）只能与 _层次结构_ 数据操作模式一起使用，并且必须与数据源类 `HierarchicalTreeDataGridSource` 一起使用。此列类型必须包含一个内部列（接口 `IColumn`）来定义其标题和值属性。层次结构展开列在层次树数据网格中显示展开和收缩的按钮。

这种列类型可以这样创建：

```csharp
new HierarchicalExpanderColumn<ItemClass>(
    new TextColumn<ItemClass, string>("Column Header", x => x.Property), 
    x => x.Children)
```

泛型参数是构成网格行的项目的类。这与内部列的项目类相同。

![](https://user-images.githubusercontent.com/53405089/157536079-fd14f1ed-0a7d-438a-abba-fd56766709a9.png)

上图是 `HierarchicalExpanderColumn` 构造函数的签名。构造函数中的第一个参数是内部列，第二个参数是（可为空的）子元素选择器。

### 模板列

模板列（类 `TemplateColumn`）是一种完全可定制的方式来创建列。它本质上为列形成一个**数据模板**。

您可以这样创建模板列：

```csharp
new TemplateColumn<ItemClass>("Column Header",
       new FuncDataTemplate<T>((a,e) => new SomeControl()))
```

![](https://user-images.githubusercontent.com/53405089/157664231-8653bce9-f8d6-4fbc-8e78-e3ff93f1ace2.png)

上图是 `TemplateColumn` 构造函数的签名。它有两个必需的参数：第一个是列标题，第二个是返回 `IDataTemplate` 的函数。

:::info
有关在代码中创建**数据模板**概念的更多信息，请参见[此处](../../../concepts/templates/creating-data-templates-in-code)。
:::

