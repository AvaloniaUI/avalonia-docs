---
id: gradients
title: Creating gradient effects
---

import Gradients from '/img/guides/ui-development/graphics/gradients.png';

This guide explains how to effectively use LinearGradientBrush in Avalonia to create beautiful gradient effects.

## Basic Syntax
A LinearGradientBrush is defined using the following basic structure:

```xml
<LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,0%">
    <GradientStop Color="#COLOR1" Offset="0.0"/>
    <GradientStop Color="#COLOR2" Offset="1.0"/>
</LinearGradientBrush>
```

## Key Properties

### StartPoint and EndPoint

* Defines the direction of the gradient
* Uses percentage values (e.g., "0%,0%") or decimal values (0,0)
* Common patterns:
  * Horizontal: StartPoint="0%,50%" EndPoint="100%,50%"
  * Vertical: StartPoint="50%,0%" EndPoint="50%,100%"
  * Diagonal: StartPoint="0%,0%" EndPoint="100%,100%"

### GradientStop Elements

* Define colors and their positions in the gradient
* Properties:
  * `Color`: The color value (Hex code or named color)
  * `Offset`: Position in the gradient (0.0 to 1.0)

## Common Gradient Patterns

### 1. Simple Horizontal Gradient

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### 2. Multi-Color Gradient

```xml
<LinearGradientBrush StartPoint="0%,50%" EndPoint="100%,50%">
    <GradientStop Color="#FF6B6B" Offset="0.0"/>
    <GradientStop Color="#FF8E53" Offset="0.3"/>
    <GradientStop Color="#FF5E3A" Offset="0.6"/>
    <GradientStop Color="#4ECDC4" Offset="1.0"/>
</LinearGradientBrush>
```

### 3. Vertical Gradient

```xml
<LinearGradientBrush StartPoint="50%,0%" EndPoint="50%,100%">
    <GradientStop Color="#A8E6CF" Offset="0.0"/>
    <GradientStop Color="#3D84A8" Offset="1.0"/>
</LinearGradientBrush>
```

## Common Use Cases

### Button Backgrounds

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

### Panel Backgrounds

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

## Example 

Below is the code to replicate the following example. 

<Image light={Gradients} alt="A series of four brightly colored boxes, demonstrating different implementations of gradient effects." position="center" maxWidth={400} cornerRadius="true"/>

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