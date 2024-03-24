---
description: CONCEPTS - ReactiveUI
---
# 绑定到已排序/过滤的数据

应用程序常见的UI任务之一是显示已排序和/或过滤的数据视图。在Avalonia中，可以通过将`SourceCache<TObject, TKey>`或`SourceList<T>`连接到`ReadOnlyObservableCollection<T>`并绑定到该集合来实现。

## 创建Source Cache

`SourceCache<TObject, TKey>`或`SourceList<T>`来自于[ReactiveUI中的Dynamic Data](https://www.reactiveui.net/docs/handbook/collections/)。示例：

```csharp
// (x => x.Id) 用作缓存的唯一键的属性
private SourceCache<TestViewModel, Guid> _sourceCache = new (x => x.Id);
```

然后，可以通过`AddOrUpdate`方法来填充`_sourceCache`。

## 创建已排序或过滤的视图

接下来，可以将`ReadOnlyObservableCollection<T>`绑定到已过滤或已排序的`_sourceCache`。排序/过滤类似于linq。

```csharp
private readonly ReadOnlyObservableCollection<TestViewModel> _testViewModels;
public ReadOnlyObservableCollection<TestViewModel> TestViewModels => _testViewModels;
...
public MainWindowViewModel(){
    // 通过_sourceCache.AddOrUpdate填充源缓存
    ...
    _sourceCache.Connect()
        // 根据OrderIndex属性进行升序排序
        .Sort(SortExpressionComparer<TestViewModel>.Ascending(t => t.OrderIndex))
        .Filter(x => x.Id.ToString().EndsWith('1'))
        // 绑定到我们的ReadOnlyObservableCollection<T>
        .Bind(out _testViewModels)
        // 订阅更改
        .Subscribe();
}
```

## 绑定

现在，`_sourceCache`已创建并填充，`ReadOnlyObservableCollection<T>`已创建并绑定，我们可以像通常使用`ObservableCollection<T>`一样在视图中进行绑定。

```xml
    <Design.DataContext>
        <vm:MainWindowViewModel/>
    </Design.DataContext>

    <TreeView ItemsSource="{Binding TestViewModels}">
        <TreeView.DataTemplates>
            <!-- DataTemplate Definitions -->
        </TreeView.DataTemplates> 
    </TreeView>
```