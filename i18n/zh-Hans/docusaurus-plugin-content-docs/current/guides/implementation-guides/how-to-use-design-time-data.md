---
id: how-to-use-design-time-data
title: 如何使用设计时数据
---

import DesignTimeMockDiagram from '/img/guides/implementation-guides/design-time-mock.png';
import DesignTimeMockPreviewDiagram from '/img/guides/implementation-guides/design-time-mock-preview.png';

# 如何使用设计时数据

设计时数据可以帮助您在不必构建整个应用程序的情况下为UI层添加样式和定位。当您试图实现完美的像素级展示时，这尤其有用。

_Avalonia UI_ 解决方案模板会为您的主窗口添加设计时代码供您复制。

本指南将向您展示如何使用MVVM模式和设计时数据创建一个真实的UI，仅使用模拟数据（即没有数据服务层）。

<img src={DesignTimeMockDiagram} alt=""/>

这个实现模式基于以下概念：您可以从您创建的任何视图模型派生出一个设计版本，并将模拟数据添加到它的构造函数中。然后，您的XAML文件可以声明一个设计数据上下文，并引用该视图模型的设计版本，以在预览窗格中显示模拟数据。

这个示例是关于为约会卡片的UI工作，以展示约会视图模型，如下所示：

```csharp
public class AppointmentViewModel: ViewModelBase
{
    public string ServerName { get; set; } = null!;
    public string ServiceTitle { get; set; } = null!;    
    public decimal ServicePrice { get; set; }
    public DateTime ServiceDateTime { get; set; }
    public string Description { get; set; } = null!;   
}
```

下面的代码创建了该视图模型的设计版本：

```csharp
public class DesignAppointmentViewModel: AppointmentViewModel
{
    public DesignAppointmentViewModel()
    {
        ServerName = "John Price";
        ServiceTitle = "Hair Cut and Beard Trim";
        ServicePrice = (decimal)25.5;
        ServiceDateTime = new DateTime(2023, 1, 3, 11, 15, 0);
        Description = "Please allow 30 minutes.";
    }
}
```

接下来，您将在一个用户控件中展示约会卡片。首先，您必须添加对视图模型的引用。然后，检查是否已设置适当的设计宽度和/或高度。然后，您可以添加一些XAML代码用于设计数据上下文，如下所示：

```
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:vm="using:DesignTimeData.ViewModels"
             mc:Ignorable="d" d:DesignWidth="400" 
             x:Class="DesignTimeData.Views.AppointmentView">
   
   <Design.DataContext>    
       <vm:DesignAppointmentViewModel/>
   </Design.DataContext>

</UserControl>
```

这意味着当您开始编写UI的XAML代码时，您可以在预览窗格中看到进展。完成后，这个示例的XAML如下所示：

```xml
<Border CornerRadius="10" Background="LightBlue"  Width="350" Margin="20">
  <DockPanel Width="350" >
      
    <StackPanel Height="10"
                    DockPanel.Dock="Bottom"
                    IsVisible="{Binding !IsCancelVisible, }" >
    </StackPanel>

    <Button Margin="0 10"
            HorizontalAlignment="Center"
            DockPanel.Dock="Bottom"
            ClickMode="Release"
            Command="{Binding CancelAppointmentCommand}"
            IsVisible="{Binding IsCancelVisible}">Cancel</Button>

    <StackPanel DockPanel.Dock="Left" Margin="10 10 0 0" Width="200" >
      <TextBlock Text="{Binding ServiceTitle}" FontWeight="Bold"/>
      <TextBlock Text="{Binding ServerName, StringFormat='with {0}'}"/>
      <TextBlock Margin="0 5 0 0" 
                 Text="{Binding ServiceDateTime, StringFormat={}{0:dd MMM yyyy}}"/>
      <TextBlock Text="{Binding ServiceDateTime, StringFormat={}{0:HH:mm}}"/>
      <TextBlock Margin="0 5" FontSize="20" 
                 Text="{Binding ServicePrice, StringFormat={}{0:£0.00}}"/>
      <TextBlock Text="{Binding Description, StringFormat={}{0:£0.00}}"/>
    </StackPanel>

    <Border DockPanel.Dock="Right"
      Background="Gainsboro" CornerRadius="10"
            Width="75" Height="75"
            Margin="0 20 20 0">
      <Image ToolTip.Tip="{Binding ServerName}" />
    </Border>

    <Rectangle/>

  </DockPanel>
</Border>
```

预览窗格显示了使用模拟数据完成的UI设计：

<img src={DesignTimeMockPreviewDiagram} alt=""/>
