---
id: index
title: How To Create a Custom Control
---

# How To Create a Custom Control

This guide will show you how to create a simple custom control with _Avalonia UI_.

Before you start to create your own control, you must decide which type of custom control you want to implement, the choices are:

* Custom Control
* Templated Custom Control

### Custom Control

A custom control draws itself using the _Avalonia UI_ graphics system, using basic methods for shapes, lines, fills, text, and many others. You can define your own properties, events and pseudo classes.

Some of the _Avalonia UI_ built-in controls are like this. For example, the text block control (`TextBlock` class) and the image control (`Image` class).

### Templated Custom Controls

A templated custom control creates a 'look-less' control that can be styled by themes or style dictionaries included in your project. The control has code for properties and events, and processing, but no properties or instructions about how to draw. A templated control defers to a theme or styles to select properties like brush colors, line thickness, corner radius etc. The drawing instructions are in the theme. 

The majority of the _Avalonia UI_ built-in controls are templated.

:::info
For guidance on how to create templated controls, see [here](../../basics/user-interface/controls/creating-controls).
:::

The following pages show you how to create a simple custom control (inherited from `Control`).
