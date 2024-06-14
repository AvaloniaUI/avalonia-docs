---
description: REFERENCE - Built-in Controls
---

import CarouselScreenshot from '/img/reference/controls/carousel/carousel.gif';

# 轮播图

轮播图拥有一个元素集合，并且按顺序将每个元素作为一页显示，以填充整个控件。

你可以使用轮播图控件来创建幻灯片展示。

## 示例

此示例在元素集合中包含三张图片，配有前进和后退按钮来移动显示内容。这些按钮在 C# code-behind 代码中有点击事件处理程序。



```xml
<Panel>
    <Carousel Name="slides" >
      <Carousel.PageTransition >
        <CompositePageTransition>
          <PageSlide Duration="0:00:01.500" Orientation="Horizontal" />
        </CompositePageTransition>
      </Carousel.PageTransition>
      <Carousel.Items>
        <Image Source="avares://AvaloniaControls/Assets/pipes.jpg" />
        <Image Source="avares://AvaloniaControls/Assets/controls.jpg" />
        <Image Source="avares://AvaloniaControls/Assets/vault.jpg" />
      </Carousel.Items>
    </Carousel>
    <Panel Margin="20">
      <Button Background="White" Click="Previous">&lt;</Button>
      <Button Background="White" Click="Next" 
              HorizontalAlignment="Right">&gt;</Button>
    </Panel>
  </Panel>
```


```csharp title='C#'
using Avalonia.Controls;
using Avalonia.Interactivity;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void Next(object source, RoutedEventArgs args)
        {
            slides.Next();
        }

        public void Previous(object source, RoutedEventArgs args) 
        {
            slides.Previous();
        }
    }
}
```

<img src={CarouselScreenshot} alt="" />

## 更多信息

要查看此控件的完整 API 文档，请点击[此处](http://reference.avaloniaui.net/api/Avalonia.Controls/Carousel/)。

在 _GitHub_ 上查看源代码 [`Carousel.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Carousel.cs)。
