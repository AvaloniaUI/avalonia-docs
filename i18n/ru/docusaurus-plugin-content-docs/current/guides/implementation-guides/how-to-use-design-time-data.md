---
id: how-to-use-design-time-data
title: How To Use Design-time Data
---

import DesignTimeMockDiagram from '/img/guides/implementation-guides/design-time-mock.png';
import DesignTimeMockPreviewDiagram from '/img/guides/implementation-guides/design-time-mock-preview.png';

# How To Use Design-time Data

Design-time data can help you style and position your UI layer without having to build the rest of the application. This is especially useful when you are trying to achieve a pixel-perfect presentation.

The _Avalonia UI_ solution templates all add design-time code to the main window for you to copy.

This guide shows you how to use design-time data with the MVVM pattern to create a realistic UI with only mock data (that is without a data service layer). 

<img src={DesignTimeMockDiagram} alt=""/>

This implementation pattern is based on the concept of deriving a design version of any view model that you create, and adding mock data to its constructor. Your XAML files can then declare a design data context, and reference the design version of the view model to display mock data in the preview pane for you.

In this example you are working on the UI for an appointment card to display an appointment view model, like this:

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

This code creates the design version of this view model:

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

To continue with this example: you are next working on a user control to present the appointment card. Firstly, you must first add a reference to the view models. Next check that you have set a suitable design width and/or height. Then you can add some XAML for the design data context, as shown:

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

This means that when you start to write the XAML for the UI, you can see your progress in the preview pane. When completed, this example has XAML like this:

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

The preview pane shows the completed UI design with the mock data:

<img src={DesignTimeMockPreviewDiagram} alt=""/>
