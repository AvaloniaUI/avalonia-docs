---
id: gradients
title: 如何使用渐变效果
---

# 如何使用渐变

本指南解释了如何在 Avalonia 中使用线性渐变画笔(LinearGradientBrush) 高效地创建美丽的渐变效果。

## 基本语法
线性渐变画笔使用以下基本结构定义：

```xml
<LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,0%">
    <GradientStop Color="#COLOR1" Offset="0.0"/>
    <GradientStop Color="#COLOR2" Offset="1.0"/>
</LinearGradientBrush>
```

## 关键属性

### StartPoint 和 EndPoint

* 定义渐变的方向
* 使用百分比值（例如，“0%,0%”）或小数值（0,0）
* 常见模式：
  * 水平：StartPoint="0%,50%" EndPoint="100%,50%"
  * 垂直：StartPoint="50%,0%" EndPoint="50%,100%"
  * 对角线：StartPoint="0%,0%" EndPoint="100%,100%"

### GradientStop 元素

* 定义渐变中的颜色及其位置
* 属性：
  * `Color`：颜色值（十六进制代码或命名颜色）
  * `Offset`：渐变中的位置（0.0 到 1.0）

## 常见的渐变模式

### 1. 简单的水平渐变

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### 2. 多色渐变

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#FF8E53" Offset="0.3"/>
    <GradientStop Color="#FF5E3A" Offset="0.6"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### 3. 垂直渐变

```xml
<LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">
    <GradientStop Color="#A8E6CF" Offset="0.0"/>
    <GradientStop Color="#3D84A8" Offset="1.0"/>
</LinearGradientBrush>
```

## 常见用例

### 按钮背景

```xml
<Button>
    <Button.Background>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="0%,100%">
            <GradientStop Color="#4CAF50" Offset="0.0"/>
            <GradientStop Color="#45A049" Offset="1.0"/>
        </LinearGradientBrush>
    </Button.Background>
</Button>
```

### 面板背景

```xml
<Border CornerRadius="8">
    <Border.Background>
        <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
            <GradientStop Color="#FF9A9E" Offset="0.0"/>
            <GradientStop Color="#FAD0C4" Offset="0.5"/>
            <GradientStop Color="#FFD1FF" Offset="1.0"/>
        </LinearGradientBrush>
    </Border.Background>
</Border>
```

## 示例

根据下面的代码可以复现下面示例

![Gradient Sample](/img/guides/gradients/gradients.png)

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
        x:Class="SampleApp.MainWindow"
        Title="Gradient Example">
        
    <StackPanel Spacing="20" Margin="20">
        <!-- Horizontal gradient with multiple color stops -->
        <Border Height="100" CornerRadius="8">
            <Border.Background>
                <LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
                    <GradientStop Color="#FF6B6B" Offset="0.0"/>
                    <GradientStop Color="#FF8E53" Offset="0.3"/>
                    <GradientStop Color="#FF5E3A" Offset="0.6"/>
                    <GradientStop Color="#4ECDC4" Offset="1.0"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="Horizontal Gradient"
                     HorizontalAlignment="Center"
                     VerticalAlignment="Center"
                     Foreground="White"/>
        </Border>

        <!-- Vertical gradient with smooth transitions -->
        <Border Height="100" CornerRadius="8">
            <Border.Background>
                <LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">
                    <GradientStop Color="#A8E6CF" Offset="0.0"/>
                    <GradientStop Color="#3D84A8" Offset="0.5"/>
                    <GradientStop Color="#46CDCF" Offset="1.0"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="Vertical Gradient"
                     HorizontalAlignment="Center"
                     VerticalAlignment="Center"
                     Foreground="White"/>
        </Border>

        <!-- Diagonal gradient with multiple stops -->
        <Border Height="100" CornerRadius="8">
            <Border.Background>
                <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
                    <GradientStop Color="#FF9A9E" Offset="0.0"/>
                    <GradientStop Color="#FAD0C4" Offset="0.25"/>
                    <GradientStop Color="#FFB6C1" Offset="0.5"/>
                    <GradientStop Color="#FFD1FF" Offset="1.0"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="Diagonal Gradient"
                     HorizontalAlignment="Center"
                     VerticalAlignment="Center"
                     Foreground="Black"/>
        </Border>

        <!-- Custom angle gradient with cycling effect -->
        <Border Height="100" CornerRadius="8">
            <Border.Background>
                <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,50%">
                    <GradientStop Color="#08AEEA" Offset="0.0"/>
                    <GradientStop Color="#2AF598" Offset="0.3"/>
                    <GradientStop Color="#08AEEA" Offset="0.6"/>
                    <GradientStop Color="#2AF598" Offset="1.0"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="Custom Angle Gradient"
                     HorizontalAlignment="Center"
                     VerticalAlignment="Center"
                     Foreground="White"/>
        </Border>
    </StackPanel>
</Window>
```