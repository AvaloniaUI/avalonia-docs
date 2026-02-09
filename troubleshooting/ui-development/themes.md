---
id: themes
title: Themes
---

## My control theme isn't being found

If you're having trouble getting Avalonia to find your theme, make sure it's returning a [style key](/concepts/ui-concepts/styling/styles) which matches the `x:Key` and `TargetType` of your control theme.

## My control theme is breaking other controls

Many Avalonia controls consist of a combination of other Avalonia controls. If you create a style or control theme that applies to all controls of a type, you might get unexpected results. For example, if you create a style that targets the `TextBlock` type in a `Window`, the style is applied to all `TextBlock` controls in the window, even if the `TextBlock` is part of another control, such as a `ListBox`.

## Application window is transparent or there is no content rendered

Make sure you have installed and included Avalonia themes in your application. See [Themes](/concepts/ui-concepts/styling/themes) for more information on how to install.

If you use third party themes, please contact their maintainers.
