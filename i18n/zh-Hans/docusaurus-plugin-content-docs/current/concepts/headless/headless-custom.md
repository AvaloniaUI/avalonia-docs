---
id: headless-custom
title: Manual Setup of Headless Platform
---

:::warning
这个页面介绍了Headless平台的一个高级使用场景。我们建议使用[XUnit](headless-xunit.md)或[NUnit](headless-nunit.md)测试框架。
:::

## 安装包

要设置Headless平台，您需要安装两个包：
- [Avalonia.Headless](https://www.nuget.org/packages/Avalonia.Headless)，其中也包括了Avalonia。
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent)，因为即使是无头控件也需要一个主题。

:::tip
Headless平台不需要任何特定的主题，可以用任何其他主题替换FluentTheme。
:::

## 设置应用程序

与任何其他Avalonia应用程序一样，需要创建一个`Application`实例，并应用主题。在使用Headless平台时，设置与常规Avalonia应用程序并没有太大区别，大部分可以重用。

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

以及代码：

```csharp title=App.axaml.cs
using Avalonia;
using Avalonia.Headless;

public class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }
}
```

## 运行Headless会话

```csharp title=Program.cs
using Avalonia.Controls;
using Avalonia.Headless;

// 启动Headless会话，传递Application类型。
using var session = HeadlessUnitTestSession.StartNew(typeof(App));

// 由于Headless会话在内部有自己的线程，我们需要在那里分发操作：
await session.Dispatch(() =>
{
    // 设置控件：
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // 打开窗口：
    window.Show();

    // 焦点放在文本框上：
    textBox.Focus();

    // 模拟文本输入：
    window.KeyTextInput("Hello World");

    // 断言：
    if (textBox.Text != "Hello World")
    {
        throw new Exception("Assert");
    }
}, CancellationToken.None);
```