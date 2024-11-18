---
id: window
title: Window 窗口
---

`Window` 是一个顶级的 [`ContentControl`](contentcontrol)。

通常情况下，你不会直接创建 `Window` 类的实例；相反，通常会为应用程序要显示的每种类型的窗口子类化 `Window` 类。有关如何从模板创建新窗口类的信息，请参见 [快速入门](../../get-started/getting-started)。

### 常见属性

| 属性 | 描述 |
| :--- | :--- |
| `Title` | 窗口标题 |
| `Icon` | 窗口图标 |
| `SizeToContent` | 描述窗口的自动调整大小行为 |
| `WindowState` | 窗口的最小化/最大化状态 |

### 源代码

[Window.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Window.cs)

### 显示、隐藏和关闭窗口

你可以使用 `Show` 方法显示一个窗口：

```csharp
var window = new MyWindow();
window.Show();
```

可以使用 `Close` 方法关闭窗口。这与用户点击窗口的关闭按钮时的效果相同：

```csharp
window.Close();

// 已关闭的窗口不能再次显示。
window.Show();
```

请注意，一旦窗口被关闭，就不能再次显示。如果你想重新显示窗口，应该使用 `Hide` 方法：

```csharp
window.Hide();

// 现在窗口可以在以后再次显示
window.Show();
```

另见 [阻止窗口关闭](../controls/window#prevent-a-window-from-closing)

### 以对话框形式显示窗口

你可以通过调用 `ShowDialog` 方法以模态对话框形式显示一个窗口。`ShowDialog` 需要传递一个所有者窗口：

```csharp
// 这里我们假设这段代码是在我们当前的 Window 类中执行的，"this" 对象是一个 Window。
// 或者你可以从 Application.ApplicationLifetime 获取全局的 MainWindow 并转换为 IClassicDesktopStyleApplicationLifetime。
var ownerWindow = this;
var window = new MyWindow();
window.ShowDialog(ownerWindow);
```

`ShowDialog` 方法将立即返回。如果你想等待对话框关闭，可以 `await` 调用：

```csharp
var window = new MyWindow();
await window.ShowDialog(ownerWindow);
```

对话框可以通过调用带有对象的 `Close` 方法返回一个结果。然后，调用 `ShowDialog` 的方可以读取这个结果。例如：

```csharp
public class MyDialog : Window
{
    public MyDialog()
    {
        InitializeComponent();
    }

    private void OkButton_Click(object sender, EventArgs e)
    {
        Close("OK Clicked!");
    }
}
```

```csharp
var dialog = new MyDialog();

// 结果是一个字符串，所以调用 `ShowDialog<string>`。
var result = await dialog.ShowDialog<string>(ownerWindow);
```

### 阻止窗口关闭

可以通过处理 `Closing` 事件并设置 `e.Cancel = true` 来阻止窗口关闭：

```csharp
window.Closing += (s, e) =>
{
    e.Cancel = true;
};
```

你也可以选择隐藏窗口。这允许在用户点击关闭按钮后重新显示窗口：

```csharp
window.Closing += (s, e) =>
{
    ((Window)s).Hide();
    e.Cancel = true;
};
```

## 额外资源

- [主窗口](../../get-started/test-drive/main-window)