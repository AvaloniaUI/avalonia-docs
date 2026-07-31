---
id: usercontrol
title: UserControl
description: A base class for creating reusable composite controls with a predefined XAML layout.
doc-type: reference
---

import UserControlStyledProperty from '/static/img/controls/usercontrol/user-control-styled-property.png';

[`UserControl`](/api/avalonia/controls/usercontrol) is a [ContentControl](/controls/data-display/contentcontrol) that composes a reusable collection of controls in a predefined layout. In general, it is the quickest way to create a [custom control](/docs/custom-controls/) for reuse within an app. The most common use case is a view or page that must appear repeatedly in an app, such as a settings panel or a user profile card.

## When to use `UserControl`

`UserControl` is the standard approach for creating views in MVVM applications. Each view in your application is typically a `UserControl` subclass, paired with a corresponding view model.

If you need a general-purpose control that can be re-styled for use across different apps, use a [templated control](/docs/custom-controls/templated-controls) instead. If you need a control with a unique appearance not provided by Avalonia's [built-in controls](/controls/), use a [custom-drawn control](/docs/custom-controls/custom-drawn-controls) instead.

## Basic example

### Creating a confirmation view

The following example creates a simple confirmation view. `UserControl` is used as the container for a composition of [`StackPanel`](/controls/layout/panels/stackpanel), [`TextBlock`](/controls/data-display/text-display/textblock) and [`Button`](/controls/input/buttons/button) controls.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
    <StackPanel Margin="20" Spacing="12">
        <TextBlock Text="Are you sure?"
                   HorizontalAlignment="Center"/>
        <StackPanel Orientation="Horizontal"
                    HorizontalAlignment="Center"
                    Spacing="12">
            <Button Content="Yes" />
            <Button Content="No" />
        </StackPanel>
    </StackPanel>
</UserControl>
```

</XamlPreview>

### Reusing the confirmation view

To reuse the confirmation view in your app, set an `x:Class` in the opening tag of `<UserControl>`. You can then reference its namespace in a `Window` or any other container to bring up another instance of the same user control.

<Tabs>

<TabItem value="usercontrol" label="UserControl">

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             // highlight-next-line
             x:Class="UserControlExample.ConfirmationView">
    <!-- Same control composition as above -->
</UserControl>
```

</TabItem>

<TabItem value="window" label="Window">

```xml
<Window xmlns:local="clr-namespace:UserControlExample">
    <local:ConfirmationView />
</Window>
```

</TabItem>

</Tabs>

## Adding code-behind

In a real project, the confirmation view demonstrated above would typically live in a standalone XAML file named `ConfirmationView.axaml`. To give it additional functionality, such as event handling or [styled properties](/docs/custom-controls/defining-properties#styled-properties), you would pair the XAML with a matching code-behind file named `ConfirmationView.axaml.cs`.

For more information on code-behind, see [Code-behind](/docs/fundamentals/code-behind).

### Handling events

This example adds event handling logic to allow the Yes/No buttons in the confirmation view to respond to clicks.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui">
    <StackPanel Margin="20" Spacing="12">
        <TextBlock Text="Are you sure?"
                   HorizontalAlignment="Center"/>
        <StackPanel Orientation="Horizontal"
                    HorizontalAlignment="Center"
                    Spacing="12">
            <Button Content="Yes" Click="OnClick" />
            <Button Content="No" Click="OnClick" />
        </StackPanel>
    </StackPanel>
</UserControl>
```

```csharp
using Avalonia.Controls;
using Avalonia.Interactivity;

public partial class ConfirmationView : UserControl
{

    private void OnClick(object? sender, RoutedEventArgs args)
    {
        if (sender is Button button)
        {
            button.Content = "Clicked!";
        }
    }
}

```

</XamlPreview>

### Adding a styled property

This example creates a styled property named `Title`, which displays a title at the top of `ConfirmationView`. Using a styled property means the title is variable and can be set to something different per instance of the `ConfirmationView`.

:::warning
You must explicitly name the root element in the `<UserControl>` tag, and then call it wherever you wish the styled property to apply. Doing so ensures the template can reference the control's properties. `root` is highlighted in the sample below to demonstrate how this is done.
:::

<br />
<Image light={UserControlStyledProperty} maxWidth={400} position="center" cornerRadius="true" alt="An app window displaying the title text 'Quit the application', which is shown next to the same text coded in a XAML file." />
<br />

<Tabs>

<TabItem value="mainwindow" label="MainWindow.axaml">

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="using:UserControlExample.ViewModels"
        xmlns:local="clr-namespace:UserControlExample"
        x:Class="UserControlExample.Views.MainWindow"
        x:DataType="vm:MainWindowViewModel"
        Title="UserControlExample">

    <local:ConfirmationView Title="Quit the application" />

</Window>
```

</TabItem>

<TabItem value="usercontrol-xaml" label="ConfirmationView.axaml">

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="UserControlExample.ConfirmationView"
             // highlight-next-line
             x:Name="root">

    <StackPanel Margin="20" Spacing="12">
            // highlight-next-line
            <TextBlock Text="{Binding #root.Title}"
                       HorizontalAlignment="Center"
                       FontWeight="Bold" />
            <TextBlock Text="Are you sure?"
                       HorizontalAlignment="Center"/>
            <StackPanel Orientation="Horizontal"
                        HorizontalAlignment="Center"
                        Spacing="12">
                <Button Content="Yes" />
                <Button Content="No" />
            </StackPanel>
        </StackPanel>
    
</UserControl>
```

</TabItem>

<TabItem value="usercontrol-codebehind" label="ConfirmationView.axaml.cs">

```csharp
using Avalonia;
using Avalonia.Controls;

namespace UserControlExample;

public partial class ConfirmationView : UserControl
{
    public ConfirmationView()
    {
        InitializeComponent();
    }
    
    public static readonly StyledProperty<string?> TitleProperty =
        AvaloniaProperty.Register<ConfirmationView, string?>(nameof(Title));
    
    public string? Title
    {
        get => GetValue(TitleProperty);
        set => SetValue(TitleProperty, value);
    }
}
```

</TabItem>

</Tabs>

## See also

- [ContentControl](/controls/data-display/contentcontrol)
- [Creating custom controls](/docs/custom-controls/)
- [Templated controls](/docs/custom-controls/templated-controls)
- [Custom-drawn controls](/docs/custom-controls/custom-drawn-controls)
- [UserControl API reference](/api/avalonia/controls/usercontrol)
- [`UserControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/UserControl.cs)
