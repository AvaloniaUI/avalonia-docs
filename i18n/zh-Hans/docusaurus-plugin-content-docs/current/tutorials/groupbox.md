---
id: groupbox
title: 使用 HeaderedContentControl 创建 GroupBox
sidebar_label: 创建 GroupBox
---

import groupboxscreenshot from '/img/tutorials/groupbox/groupbox.png';


虽然 Avalonia 没有内置的 `GroupBox` 控件，但您可以使用带有自定义样式的 `HeaderedContentControl` 来实现相同的功能和外观。`HeaderedContentControl` 提供了一个标题区域和内容区域，非常适合用于对相关的界面元素进行分组。

<GitHubSampleLink title="自定义 GroupBox" link="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GroupBox"/>

## 实现
将以下样式添加到您的应用程序资源（通常在 App.axaml 中）或需要 `GroupBox` 功能的特定 `Window` 或 `UserControl` 中：

```xml title='XAML'
<Style Selector="HeaderedContentControl">
    <Setter Property="Template">
        <ControlTemplate>
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto"/>
                    <RowDefinition Height="*"/>
                </Grid.RowDefinitions>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto"/>
                    <ColumnDefinition Width="*"/>
                </Grid.ColumnDefinitions>
        
                <!-- Header -->
                <Border 
                    ZIndex="1" 
                    Background="{DynamicResource SystemControlBackgroundAltHighBrush}" 
                    Padding="5,0,5,0" 
                    Margin="5,0,0,0">
                    <TextBlock 
                        Text="{TemplateBinding Header}" 
                        FontWeight="Bold"/>
                </Border>
        
                <!-- Content Area -->
                <Border 
                    Grid.RowSpan="2" 
                    Padding="0,5,0,0"
                    Grid.ColumnSpan="2"
                    CornerRadius="4"
                    Margin="0,10,0,0"
                    BorderBrush="{DynamicResource SystemControlForegroundBaseMediumBrush}"
                    BorderThickness="1">
                    <ContentPresenter 
                        Name="PART_ContentPresenter"
                        Padding="8"
                        Content="{TemplateBinding Content}"/>
                </Border>
            </Grid>
        </ControlTemplate>
    </Setter>
</Style>
```

样式设置好后，您就可以在 XAML 中使用 `HeaderedContentControl` 了：

```xml title='XAML'
<HeaderedContentControl Header="Settings">
    <StackPanel Spacing="8">
        <TextBox Text="Sample content"/>
        <Button Content="Click me"/>
    </StackPanel>
</HeaderedContentControl>
```

<img className="center" src={groupboxscreenshot} width="200"/>

该样式使用 Avalonia 的主题资源来确保控件在浅色和深色主题下看起来都很合适。标题文本通过使用与窗口匹配的背景颜色，看起来像是“打破”了边框线，从而创建了经典的 `GroupBox` 外观。内容区域具有圆角和适当的内边距，呈现出现代感。

此实现提供了传统 `GroupBox` 的所有视觉和功能优势，同时保持了与 Avalonia 设计模式和主题系统的一致性。