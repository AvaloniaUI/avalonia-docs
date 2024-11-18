---
id: headless-nunit
title: Headless Testing with NUnit
---

## 准备

本页面假设 NUnit 项目已经创建。
如果没有，请按照 NUnit 的“入门”和“安装”步骤在这里进行安装 https://docs.nunit.org/articles/nunit/getting-started/installation.html。

## 安装包

除了 NUnit 包外，我们还需要安装两个包：
- [Avalonia.Headless.NUnit](https://www.nuget.org/packages/Avalonia.Headless.NUnit) 这也包含了 Avalonia。
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) 因为即使是无头控件也需要一个主题

:::tip
无头平台不需要任何特定的主题，可以将 FluentTheme 替换为其他主题。
:::

## 设置应用程序
就像在任何其他 Avalonia 应用程序中一样，需要创建一个 `Application` 实例，并应用主题。在使用无头平台时，设置与常规的 Avalonia 应用程序并没有太大的不同，大部分代码都可以重用。

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

代码部分：

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

:::note
通常，`BuildAvaloniaApp` 方法是在 Program.cs 文件中定义的，但是 NUnit/XUnit 测试没有，所以它是在 `App` 文件中定义的。
:::

## 初始化 NUnit 测试

`[AvaloniaTestApplication]` 属性将当前项目中的测试与特定应用程序连接起来。它需要在任何文件中每个项目中定义一次。

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
[AvaloniaTest]
public void Should_Type_Text_Into_TextBox()
{
    // 设置控件:
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // 打开窗口:
    window.Show();

    // 焦点在文本框上:
    textBox.Focus();

    // 模拟文本输入:
    window.KeyTextInput("Hello World");

    // 断言:
    Assert.AreEqual("Hello World", textBox.Text);
}
```

我们需要使用 `[AvaloniaTest]` 而不是典型的 `[Test]` 属性，因为它设置了 UI 线程。类似地，而不是 `[Theory]`，有一个 `[AvaloniaTheory]` 属性。## 准备

本页面假设 NUnit 项目已经创建。
如果没有，请按照 NUnit 的“入门”和“安装”步骤在这里进行安装 https://docs.nunit.org/articles/nunit/getting-started/installation.html。

## 安装包

除了 NUnit 包外，我们还需要安装两个包：
- [Avalonia.Headless.NUnit](https://www.nuget.org/packages/Avalonia.Headless.NUnit) 这也包含了 Avalonia。
- [Avalonia.Themes.Fluent](https://www.nuget.org/packages/Avalonia.Themes.Fluent) 因为即使是无头控件也需要一个主题

:::tip
无头平台不需要任何特定的主题，可以将 FluentTheme 替换为其他主题。
:::

## 设置应用程序
就像在任何其他 Avalonia 应用程序中一样，需要创建一个 `Application` 实例，并应用主题。在使用无头平台时，设置与常规的 Avalonia 应用程序并没有太大的不同，大部分代码都可以重用。

```xml title=App.axaml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="Tests.App">
  <Application.Styles>
    <FluentTheme />
  </Application.Styles>
</Application>
```

代码部分：

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

:::note
通常，`BuildAvaloniaApp` 方法是在 Program.cs 文件中定义的，但是 NUnit/XUnit 测试没有，所以它是在 `App` 文件中定义的。
:::

## 初始化 NUnit 测试

`[AvaloniaTestApplication]` 属性将当前项目中的测试与特定应用程序连接起来。它需要在任何文件中每个项目中定义一次。

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
[AvaloniaTest]
public void Should_Type_Text_Into_TextBox()
{
    // 设置控件:
    var textBox = new TextBox();
    var window = new Window { Content = textBox };

    // 打开窗口:
    window.Show();

    // 焦点在文本框上:
    textBox.Focus();

    // 模拟文本输入:
    window.KeyTextInput("Hello World");

    // 断言:
    Assert.AreEqual("Hello World", textBox.Text);
}
```

我们需要使用 `[AvaloniaTest]` 而不是典型的 `[Test]` 属性，因为它设置了 UI 线程。类似地，而不是 `[Theory]`，有一个 `[AvaloniaTheory]` 属性。