---
description: CONCEPTS
---

# 视图定位器（View Locator）

:::info  
ViewLocator是可选的，且已包含在默认的 Avalonia 模板中。你也可以选择改用显式的 [DataTemplates](templates/data-templates-collection.md)。  
:::

ViewLocator用于在 MVVM（Model-View-ViewModel）应用程序中，为一个视图模型（ViewModel）解析出对应的视图（View）。它实现了 `IDataTemplate` 接口，用于将视图模型类型映射到视图类型。

## 默认实现

默认实现基于反射：它将视图模型类型的完全限定名中所有 “ViewModel” 字符串替换为 “View”，然后尝试查找该视图类型。

**示例**： `MyApp.ViewModels.MainViewModel` → `MyApp.Views.MainView`

:::tip  
虽然基于反射的方法是最容易入门的方式，但建议你根据应用的实际情况实现一个自定义的 ViewLocator，以获得更好的性能、类型安全性以及对 AOT（提前编译）环境的支持。  
:::

```cs
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        var name = data.GetType().FullName!.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type)!;
        }
        else
        {
            return new TextBlock { Text = "Not Found: " + name };
        }
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

- `Match` 方法用于判断传入的数据是否`ViewModelBase`。
- `Build` 方法根据视图模型类型反射查找对应视图，若未找到则返回一个带有提示文字的 TextBlock。

## 注册

在 `App.axaml` 中注册 ViewLocator：

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             xmlns:local="using:MyApp"
             RequestedThemeVariant="Default">
    <Application.DataTemplates>
        <local:ViewLocator />
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

注册完成后，ViewLocator 会自动工作：

```csharp
DataContext = new MainViewModel(); // 会被 ViewLocator 解析为 MainView
```

或者通过数据绑定：

```xml
<ContentControl Content="{Binding CurrentViewModel}" />
```

## 可替代的实现方式

### 模式匹配（Pattern Matching）

一种避免反射、提升类型安全和性能的方式：

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        return data switch
        {
            MainViewModel vm => new MainView { DataContext = vm },
            SettingsViewModel vm => new SettingsView { DataContext = vm },
            _ => new TextBlock { Text = $"未找到对应视图：{data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

- 编译时期就能检查类型，运行时效率更高。
- 支持 AOT 环境。
- 更利于 IDE 重构支持。

### 在 XAML 中定义 DataTemplate

以声明式方式定义视图模型与视图的映射关系：

```xml
<Application.DataTemplates>
    <DataTemplate DataType="{x:Type vm:MainViewModel}">
        <views:MainView />
    </DataTemplate>
    <DataTemplate DataType="{x:Type vm:SettingsViewModel}">
        <views:SettingsView />
    </DataTemplate>
</Application.DataTemplates>
```

参见 [DataTemplates Collection]((templates/data-templates-collection.md))。

### 结合依赖注入 / IoC

在使用依赖注入(DI)容器的情况下，你可以将 ViewLocator 与容器集成，以解析具有依赖项的视图：

- **模式匹配 + DI**：结合 `IServiceProvider.GetRequiredService()` 实现。
- **工厂注册**：在 DI 容器中注册视图工厂由 ViewLocator 调用。
- **直接解析**：将服务提供程序传入 ViewLocator（但若仍用反射，可能仍有性能或修剪问题）。

请根据是否需要避免反射选择上述方案。

### 源码生成器（Source Generators）

你还可以创建一个源码生成器，在编译时为 ViewLocator 生成代码，从而实现零运行时反射、完全类型安全且适用于 AOT 环境。

有关详情，请参见[微软源码生成器文档](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview)。

#### 第三方选项

**[StaticViewLocator](https://github.com/wieslawsoltes/StaticViewLocator)**：一个自动发现并注册视图的 NuGet 包。

**[ViewLocatorGenerator](https://github.com/peaceshi/Avalonia-NativeAOT-SingleFile)**：一个 ViewLocator 源码生成器示例（非 NuGet 包，仅供参考）

## 另请参阅

- [DataTemplates](templates/data-templates.md)
- [DataTemplates Collection](templates/data-templates-collection.md)
- [实现 IDataTemplate](templates/implement-idatatemplate.md)
