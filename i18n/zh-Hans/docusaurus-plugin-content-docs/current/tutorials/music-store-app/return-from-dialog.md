---
description: TUTORIALS - Music Store App
---

# 对话框返回

在这一页中，您将添加代码，从搜索对话框返回选定的专辑传递给主窗口。

## 购买专辑命令

首先，您需要在音乐商店视图模型中添加一个响应式命令。您将把它绑定到音乐商店视图上的 **购买专辑** 按钮。

按照以下步骤添加响应式命令：

- 如果应用程序正在运行，请停止它。
- 找到并打开 **MusicStoreViewModel.cs** 文件。
- 添加响应式命令声明，如下所示：

```csharp
public ReactiveCommand<Unit, AlbumViewModel?> BuyMusicCommand { get; }
```

- 在构造函数中添加代码以初始化响应式命令，如下所示：

```csharp
public MusicStoreViewModel()
{
    BuyMusicCommand = ReactiveCommand.Create(() =>
    {
         return SelectedAlbum;
    });
    
    ...
}
```

注意这里使用了 `ReactiveCommand`。这是由 _ReactiveUI_ 框架提供的，用于实现一些 MVVM 交互。具体来说，它将允许我们在按钮被点击时将一个 `AlbumViewModel` 类的参数传递回主窗口视图模型。

## 按钮数据绑定

您的下一步是将 **购买专辑** 按钮绑定到音乐商店视图模型中的响应式命令，按照以下步骤操作：

- 找到并打开 **MusicStoreView.axaml** 文件。
- 将数据绑定 `Command="{Binding BuyMusicCommand}"` 添加到按钮元素中。

## 关闭对话框

在这一步中，您将添加一些窗口管理代码，以便在用户单击 **购买专辑** 按钮时关闭对话框。这是除了您刚刚添加的数据绑定之外所需的。

正如您在打开对话框的代码中所看到的，您可以在窗口的代码后台实现窗口管理，并使用 _ReactiveUI_ 框架的 `ReactiveWindow` 功能。

按照以下步骤添加关闭对话框的代码：

- 找到并打开 **MusicStoreWindow.axaml.cs** 文件。
- 添加对 `using System;` 的引用。
- 更改基类，使视图继承自 `ReactiveWindow<MusicStoreViewModel>`。
- 在构造函数的末尾添加以下行：

```csharp
this.WhenActivated(action => action(ViewModel!.BuyMusicCommand.Subscribe(Close)));
```

_ReactiveUI_ 的 `WhenActivated` 方法定义了窗口激活时（在屏幕上可见）发生的操作。Lambda 表达式将被调用，并传递一个可释放的操作，以便在窗口不再处于活动状态时取消订阅。

您的音乐商店窗口代码后台现在应该如下所示：

```csharp
using Avalonia.ReactiveUI;
using AvaloniaApplication11.ViewModels;
using ReactiveUI;
using System;

namespace Avalonia.MusicStore.Views
{
    public partial class MusicStoreWindow : ReactiveWindow<MusicStoreViewModel>
    {
        public MusicStoreWindow()
        {
            InitializeComponent();
            this.WhenActivated(d => d(ViewModel!.BuyMusicCommand.Subscribe(Close)));
        }
    }
}
```

- 点击 **调试** 编译并运行项目。
- 点击图标按钮。
- 输入一些搜索文本。
- 点击一个专辑进行选择。
- 点击 **购买专辑**。

您将看到对话框关闭，但主窗口中没有任何变化！在下一页中，您将学习如何将所选专辑添加到主窗口的集合中。
