---
id: embedding-avalonia-controls-in-XPF
title: Embedding Avalonia controls in XPF
---

## Step 1: Add an Avalonia UserControl

Add an Avalonia `UserControl` to your application which contains the Avalonia content that you wish to host. For example:

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" d:DesignWidth="800" d:DesignHeight="450"
             x:Class="MyXpfApplication.MyAvaloniaView">
  <Button>Hello Avalonia!</Button>
</UserControl>
```

```csharp
using Avalonia.Controls;

namespace MyXpfApplication;

public partial class MyAvaloniaView : UserControl
{
    public MyAvaloniaView()
    {
        InitializeComponent();
    }
}
```

## Step 2: Host the Avalonia UserControl

Intiantiate an `AvaloniaHost` to host the Avalonia content in an XPF control:

```xml
<Window x:Class="MyXpfApplication.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:MyXpfApplication"
        // highlight-next-line
        xmlns:xpf="clr-namespace:Atlantis;assembly=PresentationCore"
        mc:Ignorable="d"
        Title="MainWindow">
  // highlight-start
  <xpf:AvaloniaHost>
    <local:MyAvaloniaView/>
  </xpf:AvaloniaHost>
  // highlight-end
</Window>
```