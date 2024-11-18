---
id: troubleshooting
title: Troubleshooting
---

## My Control Theme isn't being found

If you're having trouble getting Avalonia to find your theme, make sure it's returning a [style key](styles#style-key) which matches the `x:Key` and `TargetType` of your control theme.

## My Control Theme is Breaking Other Controls

Many Avalonia controls consist of a combination of other Avalonia controls. If you create a style or control theme that applies to all controls of a type, you might get unexpected results. For example, if you create a style that targets the `TextBlock` type in a `Window`, the style is applied to all `TextBlock` controls in the window, even if the `TextBlock` is part of another control, such as a `ListBox`.

## Application Window is transparent or there is no content rendered

Make sure you have installed and included Avalonia theme in your application. 
If you use built-in [Fluent](themes/fluent.md) or [Simple](themes/simple.md) themes, please visit their corresponding pages on how to install them.

If you use third party themes, please contact their maintainers.
