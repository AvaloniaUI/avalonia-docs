---
id: sharedsizegroup
title: SharedSizeGroup
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GridSharedSizeGroupScreenshot from '/img/reference/controls/grid/grid-sharedsizegroup.png';

`SharedSizeGroup` 允许在多个 `Grid` 控件之间共享自动调整大小的行和列定义的大小信息。

## 示例

以下示例演示了如何使用 `SharedSizeGroup` 在 `ListBox` 内外一致地调整列的大小。

<Tabs>
<TabItem value="xml" label="XML" default>

```xml
<StackPanel Grid.IsSharedSizeScope="True">
  <StackPanel.Styles>
    <Style Selector="ListBoxItem">
      <Setter Property="Padding" Value="0" />
    </Style>
  </StackPanel.Styles>

  <ListBox ItemsSource="{Binding People}">
    <ListBox.ItemTemplate>
      <DataTemplate>
        <Grid Name="myGrid" RowDefinitions="auto, auto" ShowGridLines="True">
          <Grid.ColumnDefinitions>
            <ColumnDefinition SharedSizeGroup="A" />
            <ColumnDefinition SharedSizeGroup="B" />
            <ColumnDefinition Width="*" />
            <ColumnDefinition SharedSizeGroup="C" />
          </Grid.ColumnDefinitions>

          <TextBlock Grid.Column="0" Margin="6,0" Text="{Binding FirstName}" />
          <TextBlock Grid.Column="1" Margin="6,0" Text="{Binding LastName}" />
          <TextBlock Grid.Column="2" Margin="6,0" Text="{Binding Age}" />
          <TextBlock Grid.Column="3" Margin="6,0" Text="{Binding Occupation}" />
        </Grid>
      </DataTemplate>
    </ListBox.ItemTemplate>
  </ListBox>
    
  <!-- Controls may appear in-between Grids with SharedSizeGroups -->
  <Separator />

  <Grid>
    <Grid.ColumnDefinitions>
      <ColumnDefinition SharedSizeGroup="A" />
      <ColumnDefinition SharedSizeGroup="B" />
      <ColumnDefinition Width="*" />
      <ColumnDefinition SharedSizeGroup="C" />
    </Grid.ColumnDefinitions>

    <Button Content="This is the First Name" HorizontalAlignment="Stretch" Grid.Column="0" />
    <Button Content="Last" HorizontalAlignment="Stretch" Grid.Column="1" />
    <Button Content="Age" HorizontalAlignment="Stretch" Grid.Column="2" />
    <Button Content="Occupation" HorizontalAlignment="Stretch" Grid.Column="3" />
  </Grid>

</StackPanel>
```

</TabItem>
<TabItem value="example" label="C#">

```csharp
public record Person(string FirstName, string LastName, int Age, string Occupation);

public partial class MainWindowViewModel : ViewModelBase
{
    public ObservableCollection<Person> People { get; } = new()
    {
        new("Jim", "Smith", 35, "Printed Circuit Board Drafter"),
        new("Charlotte", "O'Shaughnessy-Alejandro", 30, "Librarian"),
        new("Ryan", "Cullen", 40, "Ceramics Instructor"),
        new("Valentina", "Levine", 38, "Oceanologist")
    };
}
```

</TabItem>
</Tabs>

<img src={GridSharedSizeGroupScreenshot} alt="" />

请注意每列的大小：第一列由 `Button` 调整大小，第二列和第四列由 `ListBox` 内容调整大小，第三列占用剩余空间。
