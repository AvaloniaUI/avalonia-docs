---
id: how-to-create-a-user-control
title: How To Create a User Control
---

import ExampleUserControlScreenshot from '/img/guides/custom-controls/how-to-uc-example.png';

# How To Create a User Control

UserControls are one of the [types of controls](./types-of-control.md) available for authoring custom controls, User Controls being the simplest way to do so. This type of control is best for big "views" or "pages", but also very good for creating smaller modular controls that can be sprinkled throughout the UI.

UserControls are authored in the same way as you would author a Window: by creating a new UserControl from a template and then adding controls to it.

### Binding data

Then there are two common ways to bind data on your User Control:

For "big" User Controls that need business logic, like a full "view" for a tab, it's recommended to follow the [MVVM pattern](../../concepts/the-mvvm-pattern/index.md) and create a ViewModel for that specific User Control.

For smaller User Controls that does not require any business logic, like a "welcome badge" for the user, a simple way to bind data is to create some custom [Styled Properties](./defining-properties.md) on the code-behind and Bind the controls attributes to it. This makes the User Control "modular" and able to bind to many different use cases as needed.

### Example User Control

Here's an example on how to make a small UserControl and Bind the Attributes to the Styled Properties defined on the code-behind:

1. Create a `UserControls` folder
2. Inside of it add a new *Avalonia User Control*, call it `GreetingCard`
3. In the `GreetingCard.axaml.cs` (code-behind), define the Styled Properties needed.

:::info
It is **NOT** recommended to put *any* business logic in here, if needed use a ViewModel instead. These should be kept as simple "data pass-through" properties.
:::

:::info
Note that the getter/setter of the public property uses the special Avalonia UI `GetValue` and `SetValue` methods and should not be changed to something else nor do any extra work inside of the get/set.
:::

```csharp title='UserGreetingCard.axaml.cs (Code Behind)'
using Avalonia;
using Avalonia.Controls;
using Avalonia.Media;

namespace Example.UserControls;

public partial class GreetingCard : UserControl
{
    public GreetingCard()
    {
        InitializeComponent();
        AffectsRender<GreetingCard>(UserNameProperty, UserPictureProperty);
    }
    
    public static readonly StyledProperty<string> UserNameProperty =
        AvaloniaProperty.Register<GreetingCard,string>(nameof(UserName),"Unknown");

    public string UserName
    {
        get => GetValue(UserNameProperty);
        set => SetValue(UserNameProperty, value);
    }
    
    public static readonly StyledProperty<IImage?> UserPictureProperty =
        AvaloniaProperty.Register<GreetingCard,IImage?>(nameof(UserPicture));
    
    public IImage? UserPicture
    {
        get => GetValue(UserPictureProperty);
        set => SetValue(UserPictureProperty, value);
    }
}
```

4. In the `GreetingCard.axaml`, define how the User Control will look.
5. Inside the `UserControl` main tag, define a name in the `x:Name` attribute. This name will be used for the Data Binding.
6. In the controls that need access to the code-behind styled properties, Bind them using the [Data Binding Short Hand Syntax](../../basics/data/data-binding/data-binding-syntax.md#data-binding-sources) `#ParentXName.Property`

```xml title='UserGreetingCard.axaml'
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="300" d:DesignHeight="90"
             MaxHeight="90"
             x:Class="Example.UserControls.GreetingCard"
             x:Name="UserControlXName">
    <Border Background="White" Margin="10" Padding="10" CornerRadius="10" BoxShadow="0 5 10 0 DarkGray">
        <StackPanel Orientation="Horizontal" ClipToBounds="True">
            <Image Width="50" Height="50"
                   Source="{Binding #UserControlXName.UserPicture}"/>
            <TextBlock Margin="10,0,0,0" VerticalAlignment="Center">
                <Run Text="Logged in as:"/>
                <Run Text="{Binding #UserControlXName.UserName}"/>
            </TextBlock>
        </StackPanel>
    </Border>
</UserControl>
```

8. In the `MainWindow.axaml` file, Import the User Controls [xml namespace](../../basics/user-interface/introduction-to-xaml.md#xml-namespaces) as `xmlns:uc`
9. Add the new GreetingCard User Control tag by specifying the namespace:ControlName, in this case it's `uc:GreetingCard`.
10. Now the Attributes defined previously can be set directly or be defined by a Binding.

```xml title='MainWindow.axaml'
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:uc="using:Example.UserControls"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="Example.MainWindow"
        Title="Avalonia User Control">

        <Panel Margin="40">
            <uc:GreetingCard UserName="Avalonia" UserPicture="/Assets/avalonia-logo.ico"/>
        </Panel>
</Window>
```

This is the result of the example:
<img src={ExampleUserControlScreenshot} alt=''/>