---
id: xaml
title: 特定平台的XAML
---

## OnPlatform 标记扩展

### 概述

Avalonia中的OnPlatform标记扩展(Markup Extension)允许开发人员根据应用程序运行的操作系统指定属性的不同值。这对于创建需要根据平台调整其 UI 或行为的跨平台应用程序特别有用。

### 标记扩展语法的基本用法

您可以在标记扩展语法中为每个平台指定值，并为未找到特定平台匹配的情况指定默认值：

```xml
<TextBlock Text="{OnPlatform Default='Unknown', Windows='Im Windows', macOS='Im macOS', Linux='Im Linux'}"/>
```

或者，您可以使用构造函数语法直接定义默认值，跳过 `Default` 关键字。但是平台特定的属性仍需定义：

```xml
<TextBlock Text="{OnPlatform 'Hello World', Android='Im Android'}"/>
```

您可以将此标记扩展搭配任何其他类型使用，而不仅仅是字符串：

```xml
<Border Height="{OnPlatform 10, Windows=50.5}"/>
```

### 指定类型参数

您可以使用自定义的TypeArguments 显式指定值的类型：

```xml
<TextBlock Tag="{OnPlatform '0, 0, 0, 0', Windows='10, 10, 10, 10', x:TypeArguments=Thickness}"/>
```

在上面的示例中，`Tag` 属性的类型为 `object`，因此编译器没有足够的信息来解析输入字符串。如果不指定 TypeArguments，属性在所有平台上都将具有 `string` 类型。但由于我们有 `TypeArguments`，编译器将解析它们为 `Thickness` 值。

### 嵌套标记扩展

OnPlatform 扩展支持在其内部嵌套其他标记扩展：

```xml
<Border Background="{OnPlatform Default={StaticResource DefaultBrush}, Windows={StaticResource WindowsBrush}}"/>
```

### XML 语法

OnPlatform 也可以在 XML 语法中用于定义属性值：

```xml
<StackPanel>
    <OnPlatform>
        <OnPlatform.Default>
            <ToggleButton Content="Hello World" />
        </OnPlatform.Default>
        <OnPlatform.iOS>
            <ToggleSwitch Content="Hello iOS" />
        </OnPlatform.iOS>
    </OnPlatform>
</StackPanel>
```

注意，在此示例中，`OnPlatform` 是 `StackPanel` 的子元素。但在运行时，只会创建一个实际的控件（`ToggleButton` 或 `ToggleSwitch`）并添加到 `StackPanel` 中。

### 复杂属性设置器

类似于前面的示例，OnPlatform 可以作为复杂属性设置器的一部分，用于资源字典或其他字典或集合中：

```xml
<ResourceDictionary>
    <OnPlatform x:Key="MyBrush">
        <OnPlatform.Default>
            <SolidColorBrush Color="Blue" />
        </OnPlatform.Default>
        <OnPlatform.iOS>
            <SolidColorBrush Color="Yellow" />
        </OnPlatform.iOS>
    </OnPlatform>
</ResourceDictionary>
```

### XML 组合语法

为了避免分支重复，可以在单个分支中定义多个平台。另一个有用的示例是包含平台特定的样式：

```xml
<Application.Styles>
    <!-- 始终包含 -->
    <FluentTheme />

    <!-- 运行时只执行一个分支 -->
    <OnPlatform>
        <!-- if (Android || iOS) -->
        <On Options="Android, iOS">
            <StyleInclude Source="/Styles/Mobile.axaml" />
        </On>
        <!-- else -->
        <On Options="Default">
            <StyleInclude Source="/Styles/Default.axaml" />
        </On>
    </OnPlatform>
</Application.Styles>
```

### 其他细节

OnPlatform 标记扩展的工作方式类似于 C# 代码中的 switch-case。编译器将为所有可能的值生成分支，但在运行时仅根据条件执行一个分支。

还值得注意的是，如果应用程序是使用特定的 [运行时标识符](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog) 并且启用了 [Trim](https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/trimming-options)，OnPlatform 扩展将只保留可能的分支。例如，如果OnPlatform有Windows和macOS的分支，但仅构建为 Windows，其他分支将被移除，这也减少了应用程序的大小。

## OnFormFactor 标记扩展

`OnFormFactor` 标记扩展的功能类似于 `OnPlatform`，并且具有相同的通用语法。主要区别在于，它允许根据设备的外形因素（如桌面和移动设备）而不是平台来定义值：

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <TextBlock Text="{OnFormFactor 'Default value', Mobile='Im Mobile', Desktop='Im Desktop'}"/>
</UserControl>
```

`OnFormFactor` 没有编译时的修剪优化，因为外形因素在编译时无法确定。这些标记扩展都不是动态的；一旦设置了值，就不会再改变。