---
id: index
title: Headless Platform
---

## 介绍
AvaloniaUI 中的无头平台提供了在没有可见图形用户界面（GUI）的情况下运行 Avalonia 应用程序的能力。这允许在缺乏图形环境的系统上进行测试和自动化场景，例如服务器或持续集成/持续部署（CI/CD）环境。

通过利用无头平台，您可以在无头环境中执行 UI 测试、执行应用程序场景并验证功能，相较于手动测试，节省时间和资源。

## 入门指南

虽然无头平台可以在没有任何依赖项的情况下初始化，但为了方便起见，我们为常见的单元测试平台创建了集成包：

- [使用 XUnit 进行无头测试](./headless-xunit)
- [使用 NUnit 进行无头测试](./headless-nunit)
- 如果您使用其他平台或需要更多控制：[手动设置无头平台](./headless-custom)

## 模拟用户输入

由于无头平台没有任何实际输入，每个事件都需要从单元测试中触发。Avalonia.Headless 包附带了一些可用的辅助方法：

#### `Window.KeyPress(Key key, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的键盘按键。

#### `Window.KeyRelease(Key key, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的键盘释放。

#### `Window.KeyTextInput(string text)`

模拟在无头窗口/顶层上的文本输入事件。

:::note
此事件与 KeyPress 和 KeyRelease 独立。如果需要模拟文本输入到 TextBox 或类似控件，请使用 KeyTextInput。
:::

#### `Window.MouseDown(Point point, MouseButton button, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的鼠标按下事件。

:::note
在无头平台中，有一个单一的鼠标指针。没有用于触摸或笔输入的辅助方法。
:::

#### `Window.MouseMove(Point point, MouseButton button, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的鼠标移动事件。

#### `Window.MouseUp(Point point, MouseButton button, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的鼠标释放事件。

#### `Window.MouseWheel(Point point, Vector delta, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的鼠标滚轮事件。

#### `Window.DragDrop(Point point, RawDragEventType type, DataObject data, DragDropEffects effects, RawInputModifiers modifiers)`

模拟在无头窗口/顶层上的拖放目标事件。此事件模拟用户从另一个应用程序将文件移动到当前应用程序。

一个典型的简单按钮点击测试是这些方法可以使用的典型示例：

```csharp
// 创建窗口和按钮：
var button = new Button
{
    HorizontalAlignment = HorizontalAlignment.Stretch,
    VerticalAlignment = VerticalAlignment.Stretch
};
var window = new Window
{
    Width = 100,
    Height = 100,
    Content = button
};

// 订阅按钮点击事件：
var buttonClicked = false;
button.Click += (_, _) => buttonClicked = true;

// 显示窗口：
window.Show();

// 模拟鼠标事件进行点击（鼠标按下 + 释放）：
window.MouseDown(new Point(50, 50), MouseButton.Left);
window.MouseUp(new Point(50, 50), MouseButton.Left);

// 断言按钮已被点击：
Assert.True(buttonClicked);
```

:::tip
就像在任何其他 Avalonia 应用程序中一样，也可以直接触发事件。例如，通过按钮点击 `button.RaiseEvent(new RoutedEventArgs(Button.ClickEvent))`。这对于大多数用例来说可能更加方便，但在输入参数方面缺少一些灵活性。
:::

## 捕获最后渲染的帧

默认情况下，无头平台不会渲染任何内容，而是启用了一个虚假/无头的绘图后端。但是，可以启用 Skia 渲染器并使用它来捕获最后渲染的帧，然后与预期的图像进行比较或以其他方式使用。

要启用 Skia 渲染器，请调整 AppBuilder 代码如下：

```csharp title=App.axaml.cs
public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<TestApplication>()
    .UseSkia() // 启用 Skia 渲染器
    .UseHeadless(new AvaloniaHeadlessPlatformOptions
    {
        UseHeadlessDrawing = false // 禁用无头绘制
    });
```

启用真实渲染器后，可以使用 `Window.CaptureRenderedFrame` 辅助方法：

```csharp
var window = new Window
{
    Content = new TextBlock
    {
        Text = "Hello World"
    }
};
window.Show();

var frame = window.CaptureRenderedFrame();
frame.Save("file.png");
```

:::tip
`CaptureRenderedFrame` 方法返回一个 WriteableBitmap，允许您锁定并读取像素数据，以便在内存中进行比较。
:::

## 模拟用户延迟

在真实的 UI 应用程序中，用户交互之间总会存在一些延迟，这使得操作系统有时间运行应用程序中的各种任务。这些任务通常会被延迟执行，可能包括诸如窗口调整之类的操作，在大多数平台上（包括 Headless）都是异步的。

当某些操作尚未执行时，这种延迟可能导致意想不到的行为。

显而易见的解决方案是在这些操作之间添加 `Task.Delay`，但在 Avalonia 中更高效的选项是使用 `Dispatcher` API，它允许直接刷新作业队列：

```csharp
var window = new Window();
window.Show();

window.Width = 100;
window.Height = 100;

// highlight-start
Dispatcher.UIThread.RunJobs();
// highlight-end

Assert.AreEqual(new Size(100, 100), window.ClientSize);
```

此外，无头平台还提供了一种强制渲染计时器进行触发的方法，这在某些场景下可能很有用：

```csharp
AvaloniaHeadlessPlatform.ForceRenderTimerTick();
```

:::tip
所有输入辅助方法和 `CaptureRenderedFrame` 在内部都使用这些用户延迟方法，因此无需运行两次！
:::