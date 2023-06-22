---
id: control-themes
title: Control Themes
---

Control Themes build upon [Styles](styles) to create switchable themes for controls. Control themes are analogous to Styles in WPF/UWP, though their mechanism is slightly different.

## Introduction

Before Avalonia 11, control themes were created using standard styles. However, this approach had a fundamental problem: once a style was applied to a control, there was no way to remove it. Consequently, if you wanted to change the theme for a specific instance of a control or a section of the user interface (UI), the only option was to apply a second theme to the control and hope that it would override all the properties set in the original theme.

The solution for this was introduced in Avalonia 11 in the form of Control Themes.

Control Themes are themselves styles, but with two important differences:

- Control Themes don't have a selector: instead they have a "target type" which is simply the style key of the control that they will apply to