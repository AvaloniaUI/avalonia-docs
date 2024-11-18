---
description: CONCEPTS - ReactiveUI
---

import ReactiveObjectDiagram from '/img/concepts/reactiveui/reactiveobject.png';

# 响应式视图模型

本页面介绍了如何使用_ReactiveUI_的`ReactiveObject`作为视图模型的基础，以实现与_Avalonia UI_的MVVM绑定。

_ReactiveUI_提供了`ReactiveObject`作为视图模型的基类。它实现了属性更改的通知和可观察对象以监视对象的更改。

:::info
有关`ReactiveObject`的详细_ReactiveUI_文档，请参见[此处](https://www.reactiveui.net/api/reactiveui/reactiveobject/)。
:::

一旦您安装并配置了_ReactiveUI_，您可以将您的视图模型基于这个类：

```csharp
public class ViewModelBase : ReactiveObject
{
}
```

<img src={ReactiveObjectDiagram} alt=""/>

:::info
如果您使用了Avalonia MVVM应用程序解决方案模板，那么您会发现这个基类已经添加到项目的/ViewModels文件夹中。
:::

例如，您可以像这样实现一个简单的视图模型：

```csharp
public class MyViewModel : ViewModelBase
{
   private string _description = string.Empty;
   public string Description
   {
      get => _description;
      set => this.RaiseAndSetIfChanged(ref _description, value);
   }
}
```

## 通知视图的更改

_Avalonia UI_使用底层的`ReactiveObject`来**通知**视图模型中的更改，通过在XAML中定义的任何绑定将更改传递回视图。例如，如果您将_Avalonia UI_文本输入控件绑定如下：

```xml
<TextBox AcceptsReturn="True"
         Text="{Binding Description}"
         Watermark="Enter a description"/>
```

通过使用`set`访问器对视图模型的描述属性进行更改，会引发更改并导致_Avalonia UI_在UI上显示新值。

## 从输入更新视图模型

当_Avalonia UI_使用绑定来**更新**视图模型时，`set`访问器确保任何依赖于描述属性的视图模型的其他部分也可以根据需要对更改做出反应。

在下一页中，您将了解到响应式命令作为视图模型更新的特殊情况。
