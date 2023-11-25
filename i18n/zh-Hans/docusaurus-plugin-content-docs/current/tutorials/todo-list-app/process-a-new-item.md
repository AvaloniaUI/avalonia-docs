---
description: TUTORIALS - To Do List App
---

# 处理新事项

在本页面中，您将学习如何处理按下 OK 和 Cancel 按钮后的输出，并重新显示列表。如果按下 OK，我们还需要将新项目添加到列表中。我们将在 `MainWindowViewModel` 中实现此功能：

要更改主窗口视图模型，请按照以下步骤操作：

- 如果应用程序正在运行，请停止它。
- 在 **/ViewModels** 文件夹中找到 **MainWindowViewModel.cs** 文件。
- 编辑代码如下。

```csharp
using ReactiveUI;
using System;
using System.Reactive.Linq;
using ToDoList.DataModel;
using ToDoList.Services;

namespace ToDoList.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        private ViewModelBase _contentViewModel;

        // 这个视图模型依赖于 ToDoListService

        public MainWindowViewModel()
        {
            var service = new ToDoListService();
            ToDoList = new ToDoListViewModel(service.GetItems());
            _contentViewModel = ToDoList;
        }

        public ViewModelBase ContentViewModel
        {
            get => _contentViewModel;
            private set => this.RaiseAndSetIfChanged(ref _contentViewModel, value);
        }

        public ToDoListViewModel ToDoList { get; }

        public void AddItem()
        {
            AddItemViewModel addItemViewModel = new();

            Observable.Merge(
                addItemViewModel.OkCommand,
                addItemViewModel.CancelCommand.Select(_ => (ToDoItem?)null))
                .Take(1)
                .Subscribe(newItem =>
                {
                    if (newItem != null)
                    {
                        ToDoList.ListItems.Add(newItem );
                    }
                    ContentViewModel = ToDoList;
                });

            ContentViewModel = addItemViewModel;
        }
    }
}
```

仔细查看刚刚添加的代码。主要更改是 `AddItem` 方法。现在它设置了一个可观察对象，该对象订阅了两个反应式命令（上一页中定义的）的合并输出。

```csharp
Observable.Merge(
                addItemViewModel.OkCommand,
                addItemViewModel.CancelCommand.Select(_ => (ToDoItem?)null))
```

这段代码利用了反应式命令本身就是可观察对象的事实，它在每次执行时生成一个值。

合并方法将来自任意数量的可观察流的输出合并在一起，但它们必须具有相同的值类型。

您会记得两个反应式命令的声明是不同的。它们是：

```csharp
public ReactiveCommand<Unit, ToDoItem> OkCommand { get; }
public ReactiveCommand<Unit, Unit> CancelCommand { get; }
```

OK 命令在执行时生成一个 `ToDoItem` 类型的对象，而取消命令只生成一个 `Unit` 类型的对象。`Unit` 是 `void` 的反应式版本 - 它表示命令生成的值为空，但仍然通知命令已执行！

因此，为了将来自不同反应式命令的输出合并起来，代码将取消命令的输出转换为一个空的 `ToDoItem` 对象流。

```csharp
.Take(1)
```

您只对 OK 或 Cancel 按钮的第一次点击感兴趣；一旦点击了这些按钮，其他点击将被忽略。因此，[`Take(1)`](https://reactivex.io/documentation/operators/take.html) 方法表示只处理可观察序列中的第一个项。

```csharp
.Subscribe(newItem =>
{
   if (newItem != null)
   {
      ToDoListViewModel.ListItems.Add(newItem);
   }
   ContentViewModel = ToDoList;
});
```

最后，代码订阅了合并后可观察序列的第一个项。订阅从中提取出新的待办事项对象，并检查它是否为空。

如果值为空，则表示点击了取消按钮 - 此时无需进一步操作；只需恢复主窗口内容以显示（未更改的）待办事项列表。

```csharp
ContentViewModel = ToDoList;
```

如果值不为空，则表示点击了 OK 按钮；在这种情况下，值应该是包含用户输入的描述的 `ToDoItem` 对象。因此，可以将其添加到列表中。

您可能还注意到这里的另一个重要改动：待办事项列表视图模型被声明为主窗口视图模型的公共成员。这将确保列表在视图更改期间保留，它充当了应用程序的状态。

运行应用程序以检查它是否按预期工作！

在下一页中，您将了解为什么以这种方式实现应用程序，并推荐一些进一步阅读。
