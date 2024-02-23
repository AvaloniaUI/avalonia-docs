---
id: headless-xunit
title: Headless Testing with XUnit
---

## 准备

本页假定 XUnit 项目已经创建。
如果没有，请按照 XUnit 的 "入门" 和 "安装" 在这里 https://xunit.net/docs/getting-started/netfx/visual-studio。

## 安装包

除了 XUnit 包外，我们还需要安装两个包：
- [Avalonia.Headless.XUnit](https://www.nuget.org/packages/Avalonia.Headless.XUnit) 这也包括了 Avalonia。
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) 因为即使是无头控件也需要一个主题。

:::提示
无头平台不需要任何特定的主题，可以用任何其他主题替换 FluentTheme。
:::

## 设置应用程序

与任何其他 Avalonia 应用一样，需要创建一个 `Application` 实例，并应用主题。在使用无头平台时，设置与常规 Avalonia 应用并没有太大区别，大部分代码都可以重用。

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

和代码：

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

:::注意
通常，`BuildAvaloniaApp` 方法是在 Program.cs 文件中定义的，但 NUnit/XUnit 测试没有它，所以在 `App` 文件中定义它。
:::

## 初始化 XUnit 测试

`[AvaloniaTestApplication]` 属性将当前项目中的测试与特定应用程序连接起来。需要在任何文件中每个项目中定义一次。

```csharp
[assembly: AvaloniaTestApplication(typeof(TestAppBuilder))]

public class TestAppBuilder
{
    public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<App>()
        .UseHeadless(new AvaloniaHeadlessPlatformOptions());
}
```

## 测试示例

```csharp
[AvaloniaFact]
public void Should_Type_Text_Into_TextBox()
{
    // 设置控件：
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // 打开窗口：
    window.Show();

    // 焦点在文本框上：
    textBox.Focus();

    // 模拟文本输入：
    window.KeyTextInput("Hello World");

    // 断言：
    Assert.Equal("Hello World", textBox.Text);
}
```

与典型的 `[Fact]` 属性不同，我们需要使用 `[AvaloniaFact]`，因为它设置了 UI 线程。类似地，不是 `[Theory]`，而是 `[AvaloniaTheory]` 属性。