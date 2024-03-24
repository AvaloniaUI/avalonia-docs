---
id: how-to-bind-tabs
title: 如何绑定选项卡
---


## 绑定支持示例

您可以使用**数据绑定**来动态创建选项卡项。为此，请将选项卡控件的 `Items` 属性绑定到一个代表选项卡标题和内容的对象数组。

然后，您可以使用**数据模板(`DataTemplate`)**来显示这些对象。

此示例使用从 `TabItemModel` 类创建的对象数组：

```csharp
public class TabItemModel
{
    public string Header { get; }
    public string Content { get; }
    public TabItemModel(string header, string content)
    {
        Header = header;
        Content = content;
    }
}
```

创建一个包含两个 `TabItemModel` 实例的数组，并将其绑定到数据上下文。

```csharp
DataContext = new TabItemModel[] { 
    new TabItemModel("One", "Some content on first tab"),
    new TabItemModel("Two", "Some content on second tab"),
};
```

`TabStrip` 头部内容由 `ItemTemplate` 属性定义，而 `TabItem` 的内容由 `ContentTemplate` 属性定义。

最后，创建一个 `TabControl`，并将其 `Items` 属性绑定到数据上下文(`DataContext`)。

```xml
<TabControl ItemsSource="{Binding}">
    <TabControl.ItemTemplate>
      <DataTemplate>
        <TextBlock Text="{Binding Header}" />
      </DataTemplate>
    </TabControl.ItemTemplate>
    <TabControl.ContentTemplate>
      <DataTemplate>
        <DockPanel LastChildFill="True">
          <TextBlock Text="This is content of selected tab" DockPanel.Dock="Top" FontWeight="Bold" />
          <TextBlock Text="{Binding Content}" />
        </DockPanel>
      </DataTemplate>
    </TabControl.ContentTemplate>
  </TabControl>
```
