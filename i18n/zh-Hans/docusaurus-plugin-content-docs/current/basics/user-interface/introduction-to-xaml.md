---
description: CONCEPTS
---

# Avalonia XAML

_Avalonia UI_ 使用XAML来定义用户界面。XAML是一种基于XML的标记语言，被许多用户界面框架使用。

:::info
这些页面将为您介绍XAML在 _Avalonia UI_ 中的具体用法。关于XAML在Microsoft技术中的其他用法的背景信息，您可以参考以下资料：

* WPF的Microsoft XAML文档，请参阅[这里](https://docs.microsoft.com/en-us/dotnet/framework/wpf/advanced/xaml-overview-wpf)；
* UWP的Microsoft XAML文档，请参阅[这里](https://docs.microsoft.com/en-us/windows/uwp/xaml-platform/xaml-overview)。
:::

## AXAML文件扩展名

其他地方使用XAML文件的扩展名是`.xaml`，但由于与Visual Studio的技术问题整合，_Avalonia UI_ 使用了自己的`.axaml`扩展名——'Avalonia XAML'。

:::info
从 _Avalonia UI_ 版本0.9.11开始，所有在Visual Studio中创建的XAML文件都具有`.axaml`扩展名；从版本0.10开始，所有 _Avalonia UI_ 模板都使用`.axaml`扩展名创建文件。
:::

## 文件格式

一个典型的Avalonia XAML文件如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="AvaloniaApplication1.MainWindow">
</Window>
```

与所有XML文件一样，有一个根元素。根元素标签`<Window></Window>`定义了根的类型。这将对应于Avalonia UI控件的一种类型，在上面的例子中是一个窗口。

上面的示例使用了三个有趣的属性：

* `xmlns="https://github.com/avaloniaui"` ——这是 _Avalonia UI_ 本身的XAML命名空间声明。这是必需的，否则文件将无法被识别为Avalonia XAML文档；
* `xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"` ——这是XAML语言命名空间的声明；
* `x:Class="AvaloniaApplication1.MainWindow"` ——这是上面声明的扩展（用于'x'）告诉XAML编译器在文件中找到相关联的类的位置。这个类在代码后台文件中定义，通常用C#编写。

:::info
有关`code-behind`概念的信息，请参阅[这里](code-behind).
:::

## 控件元素

您可以通过添加表示 _Avalonia UI_ 控件之一的XML元素来构建应用程序的用户界面。元素标签使用与控件类名相同的名称。

:::info
一个UI可以由多种不同类型的控件组成。要了解有关UI组合概念的更多信息，请参阅[这里](../../concepts/ui-composition.md)。
:::

例如，下面的XAML将按钮添加到窗口的内容中：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button>Hello World!</Button>
</Window>
```

:::info
要获取 _Avalonia UI_ 内置控件的完整列表，请参阅[此处](../../reference/controls)的参考资料。
:::

## 控件属性

表示控件的XML元素具有与可设置的控件属性对应的属性。您可以通过向元素添加属性来设置控件属性。

例如，要为按钮控件指定蓝色背景，您可以添加`Background`属性并将值设置为`"Blue"`。如下所示：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Background="Blue">Hello World!</Button>
</Window>
```

## 控件内容

您可能已经注意到上面示例中的按钮的内容（"Hello World"字符串）放置在其打开和关闭标签之间。或者，您可以使用Content属性来设置内容。

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="Hello World!"/>
</Window>
```

这种行为是 _Avalonia UI_ 控件内容特有的。

## 数据绑定

您经常会使用 _Avalonia UI_ 绑定系统将控件属性链接到底层对象。链接是通过`{Binding}`标记扩展来声明的。例如：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Content="{Binding Greeting}"/>
</Window>
```

:::info
有关数据绑定背后的概念的更多信息，请参阅[这里](../data/data-binding)。
:::

## Code-behind文件

许多XAML文件还有一个关联的code-behind文件，通常用C#编写，并具有`.xaml.cs`文件扩展名来处理事件和其他逻辑。

:::info
有关使用code-behind文件进行编程的指南，请参阅[这里](code-behind).
:::

## XML命名空间

与任何XML格式一样，在Avalonia XAML文件中，您可以声明命名空间。这允许XML处理器找到文件中使用的元素的定义。

:::info
有关背景信息，请参阅Microsoft的[XML命名空间文档](https://docs.microsoft.com/en-us/dotnet/standard/data/xml/managing-namespaces-in-an-xml-document)。
:::

您可以使用`xmlns`属性添加命名空间。命名空间声明的格式如下：

```xml
xmlns:alias="definition"
```

通常在根元素中定义您要使用的所有命名空间是标准做法。

只能在文件中定义一个命名空间而不使用别名部分的属性名。别名必须在文件内始终保持唯一。

命名空间声明的定义部分可以是URL或代码定义。这两者都用于定位文件中元素的定义。

:::info
有关命名空间声明的详细指导，请参阅[这里](../../guides/custom-controls/how-to-create-a-custom-controls-library.md).
:::

命名空间属性的定义部分有两种有效的语法选项，可以引用代码：

### **CLR命名空间前缀**

有一个`clr-namespace:`前缀，您可以用于引用当前程序集中的代码和引用程序集中的代码。

例如，当代码存在于与XAML相同的程序集中时，您可以使用此语法：

```xml
<Window ...
    xmlns:myAlias1="clr-namespace:MyNamespace.AppNameSpace.UI" 
... >
```

如果代码在另一个被引用的程序集中（例如一个库中），您必须扩展说明以包含被引用程序集的名称：

```xml
<Window ...
    xmlns:myAlias2="clr-namespace:MyNameSpace.OtherAssembly;assembly=OtherAssembly"
 ... >
```

### **Using前缀**

有一个替代前缀`using:`，您可以用来引用当前程序集中的代码。例如：

```xml
xmlns:myAlias3="using:MyNamespace.AppNameSpace.UI"
```
