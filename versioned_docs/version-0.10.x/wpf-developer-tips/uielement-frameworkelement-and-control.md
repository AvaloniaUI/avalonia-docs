---
info: uielement-frameworkelement-and-control
title: UIElement, FrameworkElement and Control
---

WPF's `UIElement` and `FrameworkElement` are non-templated control base classes, which roughly equate to the Avalonia `Control` class. WPF's `Control` class on the other hand is a templated control - Avalonia's equivalent of this is `TemplatedControl`.

So to recap:

* `UIElement`: `Control`
* `FrameworkElement`: `Control`
* `Control`: `TemplatedControl`