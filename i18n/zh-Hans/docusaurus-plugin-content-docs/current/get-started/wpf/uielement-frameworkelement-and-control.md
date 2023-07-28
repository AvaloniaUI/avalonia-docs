# UIElement、FrameworkElement和Control

WPF中的`UIElement`和`FrameworkElement`是非模板控件的基类，大致对应于Avalonia中的`Control`类。而WPF中的`Control`类则是一个模板控件，Avalonia中相应的类是`TemplatedControl`。

- 在WPF/UWP中，您将从`Control`类继承来创建新的模板控件，而在Avalonia中，您应该从`TemplatedControl`继承。
- 在WPF/UWP中，您将从`FrameworkElement`类继承来创建新的自定义绘制控件，而在Avalonia中，您应该从`Control`继承。

因此，简要总结如下：

* `UIElement` 🠞 `Control`
* `FrameworkElement`🠞 `Control`
* `Control` 🠞 `TemplatedControl`
