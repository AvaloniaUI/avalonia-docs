---
id: resources
title: 如何使用资源
---


# 👉 如何使用资源

您经常需要在应用程序中标准化图形基础元素，比如（但不限于）笔刷和颜色。您可以将这些定义为资源，放在 _Avalonia UI_ 应用程序的不同层级中，也可以将它们放在需要的文件中引用。

资源总是定义在资源字典内。这意味着每个资源都有一个关键属性。

资源字典的级别定义了其中资源的范围：资源在定义它们的文件及其子级中都可用。因此，您可以通过选择资源字典的位置来定制资源的范围。

## 声明资源

例如，您可能希望在整个应用程序中标准化笔刷颜色。在这种情况下，您可以在应用程序的 XAML 文件**App.axaml**中声明一个资源字典，如下所示：

```xml title="App.axaml"
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App">
    // highlight-start
  <Application.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Application.Resources>
    // highlight-end
</Application>
```

或者，您可能希望一组资源仅适用于特定的窗口或用户控件。在这种情况下，您将在窗口或用户控件文件中定义一个资源字典。例如：

```xml title="MyUserControl.axaml"
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MyUserControl">
    // highlight-start
  <UserControl.Resources>
    <SolidColorBrush x:Key="Warning">LightYellow</SolidColorBrush>
  </UserControl.Resources>
    // highlight-end
</UserControl>
```

实际上，您可以在控件级别定义资源，如果需要：

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.MainWindow">
  <StackPanel>
    // highlight-start
    <StackPanel.Resources>
      <SolidColorBrush x:Key="Warning">PaleGoldenRod</SolidColorBrush>
    </StackPanel.Resources>
    // highlight-end
  </StackPanel>
</Window>
```

您还可以声明特定于样式的资源。

```xml title="MyStyle.axaml"
<Style Selector="TextBlock.warning">
  <Style.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </Style.Resources>
  <Setter ... />
</Style>
```

:::note
请注意，此资源在特定样式块之外是不可见的，这意味着它不会让所有具有“warning”类的TextBlock意识到样式块之外的资源。
:::

还可以为特定主题变体定义资源：Dark、Light 或自定义主题。从下面的示例中，`BackgroundBrush` 和 `ForegroundBrush` 将根据系统或应用程序设置的当前主题变体具有不同的值。有关主题变体的更多信息，请阅读 [主题变体](how-to-use-theme-variants) 页面。

```xml
<ResourceDictionary>
    <ResourceDictionary.ThemeDictionaries>
        <ResourceDictionary x:Key='Light'>
            <SolidColorBrush x:Key='BackgroundBrush'>White</SolidColorBrush>
            <SolidColorBrush x:Key='ForegroundBrush'>Black</SolidColorBrush>
        </ResourceDictionary>
        <ResourceDictionary x:Key='Dark'>
            <SolidColorBrush x:Key='BackgroundBrush'>Black</SolidColorBrush>
            <SolidColorBrush x:Key='ForegroundBrush'>White</SolidColorBrush>
        </ResourceDictionary>
    </ResourceDictionary.ThemeDictionaries>
</ResourceDictionary>
```

## 资源字典文件

通过在单独的文件中定义资源字典，您可以提高 _Avalonia UI_ 应用程序项目的组织性，使资源定义易于查找和维护。

位于资源字典文件中的资源可在整个应用程序中访问。

要添加资源字典文件，请按照以下步骤操作：

-  在您要创建新文件的位置，右键单击项目。
-  单击 **添加**，然后选择 **新建项**。
-  在左侧的列表中单击 **Avalonia**：

<img src="/img/gitbook-import/assets/image (8) (1) (2).png" alt=""/>

-  选择 **Resource Dictionary (Avalonia)**。
-  输入要使用的文件名。
-  单击 **添加**。

现在，您可以在指定的位置添加要定义的资源。如下所示：

```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <!-- 在此添加资源 -->
</ResourceDictionary>
```

## 使用资源

您可以使用 `{DynamicResource}` 标记扩展从处于范围内的资源字典中使用资源。

例如，要直接在边框元素的背景属性上使用资源，可以使用以下 XAML：

```xml
<Border Background="{DynamicResource Warning}">
  Look out!
</Border>
```

### 静态资源

或者，您可以选择使用 `StaticResource` 标记扩展。例如：

```xml
<Border Background="{StaticResource Warning}">
  Look out!
</Border>
```

静态资源不同之处在于它不会响应代码中（运行时）对资源的更改。一旦加载，静态资源将不可更改。

使用静态资源的好处是它的工作量较小，因此加载速度稍快，并且使用的内存稍少。

## 资源优先级

_Avalonia UI_ 通过从 `DynamicResource` 或 `StaticResource` 标记扩展所在的逻辑控件树级别向上搜索来解析要使用的资源，直到找到具有所请求的关键字的资源。

这意味着具有相同关键字的资源的优先级是基于它们与正在解析的资源标记扩展之间的距离来确定的。因此，逻辑控件树中较高级别的资源定义实际上会被处于较低级别的资源定义“覆盖”。例如，请考虑以下 XAML：

```xml
<UserControl ... >
  <UserControl.Resources>
    <SolidColorBrush x:Key="Warning">Yellow</SolidColorBrush>
  </UserControl.Resources>

  <StackPanel>
    <StackPanel.Resources>
      <SolidColorBrush x:Key="Warning">Orange</SolidColorBrush>
    </StackPanel.Resources>

    <Border Background="{DynamicResource Warning}">
      Look out!
    </Border>
  </StackPanel>
</UserControl>
```

在这里，边框控件使用了关键字为`Warning`的资源。这个资源在父控件（堆栈面板）级别上定义了两次，并且在用户控件级别上也定义了一次。_Avalonia UI_ 将确定边框的背景应该是橙色，因为它的父堆栈面板是在从边框本身开始沿着逻辑控件树向上搜索的第一个拥有此关键字资源的控件。

## 包含和合并资源

可以从资源字典文件中包含资源，并将其与另一个文件中定义的资源合并（即使没有任何资源）。

<img src="/img/gitbook-import/assets/image (1) (3).png" alt=""/>

这意味着您可以在一个文件中实现样式，并在另一个文件中使用定义的资源。这样可以使您的样式一致，使应用程序解决方案组织良好，易于维护。

要在样式文件中包含来自文件的资源字典，请添加以下 XAML：

```xml
<Styles.Resources>
    <ResourceDictionary>
      <ResourceDictionary.MergedDictionaries>
        <ResourceInclude Source="/Assets/AppResources.axaml"/>
      </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
  </Styles.Resources>
```

在上面的示例中，资源文件 `AppResources.axaml` 位于 `/Assets` 项目文件夹中。然后，您可以使用这些资源定义样式，例如：

```xml
<Style Selector="Button.btn-info">
    <Setter Property="Background" Value="{StaticResource InfoColor}"/>
</Style>
```

其中，资源 `InfoColor` 在导入的文件中被定义为 `SolidColorBrush`。

:::info
请注意，资源已使用 `StaticResource` 引用，因为它不能更改——这里的要求是保持样式一致。
:::

## 合并的资源优先级

如前所述，资源通过从标记扩展所在的点开始向上搜索逻辑控件树来解析。

然而，各个级别的应用程序中定义的样式和合并的字典的存在，引入了额外的优先级规则，如下所示：

* Control resources -> Merged dictionaries
* Style resources -> Merged dictionaries
* App resources -> Merged dictionaries

例如，在下面的理论应用程序中，搜索用于底部边框控件上使用的资源将遵循`[]`中指示的顺序：

```
Application
 |- Resources [11]
     |- Merged dictionary [12]
     |- Merged dictionary [13]
 |- Styles
     |- Resources [14]
         |- Merged dictionary [15]
         |- Merged dictionary [16]

Window
 |- Resources [6]
     |- Merged dictionary [7]
 |- Styles
     |- Resources [8]
         |- Merged dictionary [9]
         |- Merged dictionary [10]
 |- StackPanel
     |- Resources [1]
         |- Merged dictionary [2]
         |- Merged dictionary [3]
     |- Styles
         |- Resources [4]
             |- Merged dictionary [5]
     |- Border
```

从边框控件开始，首先搜索父级（StackPanel）控件中定义的任何资源。然后再考虑同一级别的任何合并的字典 - 按照 XAML 中它们出现的顺序。

然后，搜索父级（StackPanel）控件中定义的任何样式，接着再搜索同一级别的任何合并的字典。

在逻辑控件树中向上搜索，每个级别都以类似的方式行为。最后到达应用程序级别的资源和样式。

## 从代码中使用资源

Avalonia 提供了不同的选项来从代码中访问资源。

:::note

在下面的示例中，`ResourceNode` 可以是支持 `Resource` 的任何节点，比如 `Appliction.Current`、`Window`、`UserControl` 等等。

:::

- **ResourceNode.Resources["TheKey"]**: <br/>
  这将直接访问底层的 `Dictionary`。请注意：合并的字典和父级将不会被扫描。
- **ResourceNode.TryGetResource**: <br/>
  此函数将尝试获取特定资源，并在成功时返回 `true`，否则返回 `false`。将扫描合并的字典，但不会遵循逻辑树。
- **ResourceNode.TryFindResource**:  <br/>
  此扩展方法将尝试获取特定资源，并在成功时返回 `true`，否则返回 `false`。将扫描合并字典和逻辑树。
- **ResourceNode.GetResourceObservable**: <br/>
  这将返回一个可用于观察资源更改的 [`IObservable`](https://learn.microsoft.com/en-us/dotnet/api/System.IObservable-1)。例如，您可以绑定到它。

```cs
// 在此示例中，我们在 App.axaml 中定义了资源，并且希望在 MainWindow 构造函数中查找该值。
//
//    </Application.Resources>
//         <x:String x:Key="TheKey">HelloWorld</x:String>
//    </Application.Resources>

public MainWindow()
{
    InitializeComponent();

    // found1 = false | result1 = null
    var found1 = this.TryGetResource("TheKey", this.ActualThemeVariant, out var result1);

    // found2 = true | result2 = "Hello World" 
    var found2 = this.TryFindResource("TheKey", this.ActualThemeVariant, out var result2);

    // 从代码中找到资源并将其绑定到 TextBlock
    myTextBlock.Bind(TextBlock.TextProperty, Resources.GetResourceObservable("TheKey"));

    // 通过绑定的 observable 更新 myTextBlock.Text
    this.Resources["TheKey"] = "Hello from code behind"; 
}
```

