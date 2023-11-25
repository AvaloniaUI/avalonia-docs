---
id: localizing
title: 使用 ResX 进行本地化
---

本地化是为全球用户提供出色用户体验的关键步骤。在 .NET 中，可以使用 `ResXResourceReader` 和 `ResXResourceWriter` 类来读取和写入基于 XML 的资源文件（.resx）。本指南将引导您通过使用 ResX 文件来本地化 Avalonia 应用程序。

:::info
要了解这些概念在实际操作中的完整示例，请查看 [示例应用程序](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization/).
:::

## 添加 ResX 文件到项目

在进行本地化之前，您需要为每种语言添加相应的 ResX 文件。对于本指南，我们将考虑三个 ResX 文件，分别对应以下语言：

* `Resources.fil-PH.resx`（菲律宾语）
* `Resources.ja-JP.resx`（日语）
* `Resources.resx`（默认语言，通常为英语）

每个 ResX 文件将包含与应用程序中使用的键相对应的翻译文本。

在本例中，我们将新文件添加到`Assets`文件夹中。由于.NET生成器根据文件夹结构创建名称空间，可能会有所不同。

## 设置文化（Culture）

为了在应用程序中使用特定的语言，您需要设置当前的文化（Culture）。这可以在 `App.axaml.cs` 文件中完成。下面的示例将文化（Culture）设置为菲律宾语（`fil-PH`）：

```cs title="App.xaml.cs"
public partial class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        // highlight-start
        Assets.Resources.Culture = new CultureInfo("fil-PH");
        // highlight-end
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            desktop.MainWindow = new MainWindow
            {
                DataContext = new MainWindowViewModel(),
            };
        }

        base.OnFrameworkInitializationCompleted();
    }
}
```
根据需要，将 `fil-PH` 替换为适当的文化代码。

## 在视图中使用本地化文本

要在视图中使用本地化文本，您可以在 XAML 中静态地引用资源：

```xml
<TextBlock Text="{x:Static assets:Resources.GreetingText}"/>
```

在上面的示例中，`GreetingText` 是与 ResX 文件中的字符串对应的键。`{x:Static}` 标记扩展用于引用在 .NET 类中定义的静态属性，而在这种情况下，即资源文件（`assets:Resources.GreetingText`）。

就是这样！现在您已成功使用 ResX 进行了 Avalonia 应用程序的本地化。通过设置文化为不同的区域设置，您可以以所选语言显示用户界面，从而创建支持多种语言并面向全球用户的应用程序。