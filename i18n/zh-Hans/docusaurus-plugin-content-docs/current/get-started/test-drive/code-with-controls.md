---
id: code-with-controls
title: 用代码修改控件
---

在本章节，您将实现根据摄氏温度的输入值更新华氏温度的核心逻辑。

## 控件名称

Avalonia 会为每个 XAML 层级中定义的控件创建对象。您的代码可以在运行时访问这些控件，但是为了更容易访问它们，您需要为其命名。

要添加控件名称，请按照以下步骤进行操作：

- 如果应用程序正在运行，请停止它。
- 找到摄氏度的 `TextBox` 控件。
- 添加 `Name` 属性，如下所示：

```xml
<TextBox ... Name="Celsius"/>
```

- 对于华氏度输入控件，重复上述步骤：

```xml
<TextBox ... Name="Fahrenheit"/>
```

## 在 Code-Behind 中获取控件值

为了演示如何访问 `celsius` 输入的文本值，请按照以下步骤进行操作：

- 切换到 **MainView.axaml.cs** 的 Code-Behind 文件。
- 找到 `Button_OnClick` 事件处理程序。
- 修改 `Debug` 语句以显示 `celsius` 输入的文本属性，如下所示：

```csharp
Debug.WriteLine($"Click! Celsius={Celsius.Text}");
```

- 以 debug 模式运行应用程序，确认您可以在调试窗口中看到摄氏度的值。

## 在 Code-Behind 设置控件值

为了使用将摄氏温度转换为华氏温度的简单公式，您需要首先确保将摄氏度输入文本转换为数字。公式如下：

```
Tf = Tc * (9/5) + 32
```

要添加转换公式，请按照以下步骤进行操作：

- 找到 `Button_OnClick` 事件处理程序。
- 检查摄氏度输入控件的文本是否可以转换为数字。
- 使用转换公式。
- 更新华氏度输入控件的 `Text` 。
- 运行应用程序，检查您的工作。

以下是上述操作的一种实现方式：

```csharp
private void Button_OnClick(object? sender, RoutedEventArgs e)
{
    if (double.TryParse(Celsius.Text, out double C))
    {
        var F = C * (9d / 5d) + 32;
        Fahrenheit.Text = F.ToString("0.0");
    }
    else
    {
        Celsius.Text = "0";
        Fahrenheit.Text = "0";
    }
}
```

您可以使用以下转换表来检查您的工作：

| 摄氏度 | 华氏度 |
|---------|------------|
| -10     | 14.0       |
| 0       | 32.0       |
| 10      | 50.0       |
| 21      | 69.8       |
| 25      | 77.0       |
| 32      | 89.6       |

### 练习

您现在已经使用事件处理程序在运行时获取和设置控件属性。您现在可以尝试一些练习：

- 停止显示网格线（简单）。
- 通过设置 `IsReadOnly` 属性，阻止用户更改华氏度输入的文本（简单）。
- 当用户输入摄氏度时，通过 `TextChanged` 事件实时计算转换结果（中等）。

:::info
有关 Avalonia 内置控件、事件和属性的完整信息，请参阅[此处](../../reference/controls/)的控件参考部分。
:::
