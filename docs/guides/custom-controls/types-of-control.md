---
id: types-of-control
title: Types of Control
---

If you want to create your own controls, there are three main categories of control in Avalonia. The first thing to do is choose the category of control that best suits your use-case.

### User Controls

UserControls are the simplest way to author controls. This type of control is best for "views" or "pages" that are specific to an application. UserControls are authored in the same way as you would author a Window: by creating a new UserControl from a template and adding controls to it.

### Templated Controls

TemplatedControls are best used for generic controls that can be shared among various applications. They are lookless controls, meaning that they can be restyled for different themes and applications. The majority of standard controls defined by Avalonia fit into this category.

:::info
In WPF/UWP you would inherit from the Control class to create a new templated control, but in Avalonia you should inherit from TemplatedControl. 
:::

:::info
If you want to provide a Style for your TemplatedControl in a separate file, remember to include this file in your Application via StyleInclude. 
:::

### Basic Controls

Basic Controls are the foundation of user interfaces - they draw themselves using geometry by overriding the Visual.Render method. Controls such as TextBlock and Image fall into this category.

:::info
In WPF/UWP you would inherit from the FrameworkElement class to create a new basic control, but in Avalonia you should inherit from Control. 
:::
