---
id: localizing
title: 使用 ResX 进行本地化
---

本地化是为全球用户提供出色用户体验的关键步骤。在 .NET 中，可以使用 `ResXResourceReader` 和 `ResXResourceWriter` 类来读取和写入基于 XML 的资源文件（.resx）。本指南将引导您通过使用 ResX 文件来本地化 Avalonia 应用程序。

<GitHubSampleLink title="本地化" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization/"/>

## 在项目中添加 ResX 文件

在进行本地化之前，您需要为每种语言添加相应的 ResX 文件。对于本指南，我们将考虑三个 ResX 文件，分别对应以下语言：

* `Resources.fil-PH.resx`（菲律宾语）
* `Resources.ja-JP.resx`（日语）
* `Resources.resx`（默认语言，通常为英语）

每个 ResX 文件将包含与应用程序中使用的键相对应的翻译文本。

在本例中，我们将新文件添加到`Lang`文件夹中。由于.NET生成器根据文件夹结构创建名称空间，可能会有所不同。

:::warning
如果您将文件添加到 `Assets` 文件夹中，请确保将 `Build Action` 切换为 `Embedded resource`，否则代码生成可能会失败。
:::

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
        Lang.Resources.Culture = new CultureInfo("fil-PH");
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

将 "fil-PH" 替换为正确的所需的文化代码。

## 在视图中使用本地化文本

要在视图中使用本地化文本，您可以在 XAML 中静态地引用资源：

```xml
<TextBlock Text="{x:Static lang:Resources.GreetingText}"/>
```

在上面的示例中，`GreetingText` 是与 ResX 文件中的字符串对应的键。`{x:Static}` 标记扩展用于引用在 .NET 类中定义的静态属性，而在这种情况下，即资源文件（`Lang:Resources.GreetingText`）。

就是这样！您现在已经成功使用 ResX 文件本地化了您的 Avalonia 应用程序。通过将文化设置为不同的区域，您可以显示所选语言的用户界面，从而创建支持多种语言并面向全球受众的应用程序。

:::warning
为了让 XAML 中的本地化属性可用，从资源文件生成的代码必须是公开可访问的。默认情况下，`Resources` 类由 `ResXFileCodeGenerator` 生成，并且是 `internal`。请确保将自定义工具更改为 `PublicResXFileCodeGenerator`。`csproj` 文件的相关部分应如下所示：

```xml
<ItemGroup>
  <EmbeddedResource Update="Resources.resx">
    <Generator>PublicResXFileCodeGenerator</Generator>
    <LastGenOutput>Resources.Designer.cs</LastGenOutput>
  </EmbeddedResource>
</ItemGroup>

<ItemGroup>
  <Compile Update="Resources.Designer.cs">
    <DesignTime>True</DesignTime>
    <AutoGen>True</AutoGen>
    <DependentUpon>Resources.resx</DependentUpon>
  </Compile>
</ItemGroup>
```

注意：还请注意，只有默认资源文件（`Resources.resx`）应该生成代码。
:::