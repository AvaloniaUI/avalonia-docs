# Styling

The most obvious difference from other XAML frameworks is that Avalonia uses a [CSS-like styling system](https://docs.avaloniaui.net/docs/styling/styles). Styles aren't stored in a `Resources` collection as in WPF, they are stored in a separate `Styles` collection:

```markup
<UserControl>
    <UserControl.Styles>
        <!-- Make TextBlocks with the h1 style class have a font size of 24 points -->
        <Style Selector="TextBlock.h1">
            <Setter Property="FontSize" Value="24"/>
        </Style>
    </UserControl.Styles>
    <TextBlock Classes="h1">Header</TextBlock>
<UserControl>
```

