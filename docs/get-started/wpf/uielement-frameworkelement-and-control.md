# UIElement, FrameworkElement and Control

WPF's `UIElement` and `FrameworkElement` are non-templated control base classes, which roughly equate to the Avalonia `Control` class. WPF's `Control` class on the other hand is a templated control - Avalonia's equivalent of this is `TemplatedControl`.

- In WPF/UWP you would inherit from the `Control` class to create a new templated control, but in Avalonia you should inherit from `TemplatedControl.`
- In WPF/UWP you would inherit from the `FrameworkElement` class to create a new custom-drawn control, but in Avalonia you should inherit from `Control.`

So to recap:

* `UIElement` 🠞 `Control`
* `FrameworkElement`🠞 `Control`
* `Control` 🠞 `TemplatedControl`

<XpfAd/>