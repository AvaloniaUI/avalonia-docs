# Binding Classes

In Avalonia, you also can bind classes. Sometimes it could be useful to switch classes depending on some logic, and for those purposes, you can use Binding Classes API. There is the sample usage of Binding Classes. We have two different styles and we want to switch between them depending on `MyProperty` state.

```markup
 <ListBox Items="{Binding MyItems}">
    <ListBox.Styles>
        <Style Selector="TextBlock.myClass">
            <Setter Property="Background" Value="Red" />
        </Style>
        <Style Selector="TextBlock.myClass2">
            <Setter Property="Background" Value="Green" />
        </Style>
    </ListBox.Styles>
    <ListBox.ItemTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock
                    Classes.myClass="{Binding MyProperty}"
                    Classes.myClass2="{Binding !MyProperty}"
                    Text="{Binding Name}"/>
            </StackPanel>
        </DataTemplate>
    </ListBox.ItemTemplate>
 </ListBox>
```

When you bind to classes Avalonia would expect bool value. This API was introduced in 0.10.1

