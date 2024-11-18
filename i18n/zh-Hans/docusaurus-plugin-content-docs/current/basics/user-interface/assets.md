---
id: assets
title: 资产和图像
---

import AssetFileDiagram from '/img/basics/user-interface/asset-file.png';
import AssetLibraryDiagram from '/img/basics/user-interface/asset-library.png';

# 资产(Assets)

许多应用程序需要包含位图、样式和资源字典等资产。资源字典包含可以在XAML中声明的图形基础元素。样式也可以用XAML编写，但位图资产是二进制文件，例如PNG和JPEG格式的图像。

## 包含资产

<img src={AssetFileDiagram} alt=''/>

您可以通过在项目文件中使用`<AvaloniaResource>`元素来将资产包含在应用程序中。

例如，Avalonia .NET Core MVVM应用程序解决方案模板会创建一个名为`Assets`的文件夹（包含`avalonia-logo.ico`文件），并在项目文件中添加一个元素来包含其中的任何文件，如下所示：

```xml
<ItemGroup>
  <AvaloniaResource Include="Assets\**"/>
</ItemGroup>
```

您可以通过在该项组中添加额外的`<AvaloniaResource>`元素来包含所需的任何文件。

:::tip
这里的元素名`AvaloniaResource`只表示这些资源将在构建过程中以.NET资源的形式进行内部存储。但是，在 _Avalonia UI_ 中，这些文件被称为“资产（Assets）”以区别于“XAML资源（XAML resources）”。
:::


### 引用包含的资产

一旦资产文件被包含，您可以根据需要在定义用户界面的XAML中引用它们。例如，可以通过指定相对路径来引用这些资产：

```xml
<Image Source="icon.png"/>
<Image Source="images/icon.png"/>
<Image Source="../icon.png"/>
```

或者，您可以使用根路径：

```xml
<Image Source="/Assets/icon.png"/>
```

## 库资产

<img src={AssetLibraryDiagram} alt=''/>

如果资产包含在与XAML文件不同的程序集中，则可以使用 `avares:` URI方案。例如，如果资产包含在名为`MyAssembly.dll`的程序集中的`Assets`文件夹中，则可以使用：

```xml
<Image Source="avares://MyAssembly/Assets/icon.png"/>
```

### 资产类型转换

Avalonia UI内置了用于加载位图、图标和字体资产的转换器。因此，资产URI可以自动转换为以下任意一种类型：

* 图像 - `Image` 类型
* 位图 - `Bitmap` 类型
* 窗口图标 - `WindowIcon` 类型
* 字体 - `FontFamily` 类型

### 在代码中加载资产

您可以编写代码来使用`AssetLoader`静态类加载资产。例如：

```csharp
var bitmap = new Bitmap(AssetLoader.Open(new Uri(uri)));
```

上面代码中的`uri`变量可以包含任何带有`avares:`方案的有效URI（如上所述）。

_Avalonia UI_ 不支持 `file://`，`http://`或 `https://` 等方案。如果要从磁盘或Web加载文件，您必须自己实现该功能或使用社区提供的实现。

:::info
Avalonia UI社区提供了一个图像加载器实现，地址是 https://github.com/AvaloniaUtils/AsyncImageLoader.Avalonia
:::
