---
id: how-to-bind-tabs
title: 如何绑定选项卡
---


## 绑定支持示例

您可以使用**数据绑定**来动态创建选项卡项。为此，请将选项卡控件的 `ItemsSource` 属性绑定到一个表示选项卡标题和内容的对象集合。

然后，您可以使用**数据模板(`DataTemplate`)**来显示这些对象。

此示例使用从 `ItemViewModel` 类创建的对象集合：

```csharp
namespace MyApp.ViewModel;
public class ItemViewModel
{
    public string Header { get; }
    public string Content { get; }
    public ItemViewModel(string header, string content)
    {
        Header = header;
        Content = content;
    }
}
```

创建一个包含两个 `TabItemModel` 实例的集合。

```csharp
public ObservableCollection<ItemViewModel> Items { get; set; } = new() { 
    new ItemViewModel("One", "Some content on first tab"),
    new ItemViewModel("Two", "Some content on second tab"),
};
```

`TabStrip` 头部内容由 `ItemTemplate` 属性定义，而 `TabItem` 的内容由 `ContentTemplate` 属性定义。

最后，创建一个 `TabControl`，并将其 `ItemsSource` 属性绑定到`Items`。

```xml
<TabControl ItemsSource="{Binding Items}">
    <TabControl.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Header}" />
      </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
        <!-- ContentTemplate's DataTemplate must specify the view model in DataType.
        The alias 'vm' references the specification of the view model's namespace in 
        an attribute of the XAML's root element, which will look like
            xmlns:vm="using:MyApp.ViewModel"
        or
            xmlns:vm="clr-namespace:MyApp.ViewModel;assembly=MyApp.ViewModel" -->
      <DataTemplate DataType="vm:ItemViewModel">
        <DockPanel LastChildFill="True">
          <TextBlock Text="This is content of selected tab" DockPanel.Dock="Top" FontWeight="Bold" />
          <TextBlock Text="{Binding Content}" />
        </DockPanel>
      </DataTemplate>
    </TabControl.ContentTemplate>
  </TabControl>
```
