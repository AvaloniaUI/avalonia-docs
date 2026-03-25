---
id: index
title: Migrating from WPF
description: Migrate WPF applications to Avalonia with equivalent controls, bindings, and MVVM patterns.
doc-type: migration
---

Avalonia shares many concepts with WPF, so your existing knowledge transfers directly. Most controls, layout panels, data binding, and MVVM patterns work the same way or have a clear equivalent. The main areas where the two frameworks diverge are styling, data templates, the property system, and event naming.

:::tip[Already have a large WPF codebase?]
If your goal is to run an existing WPF application on macOS, Linux, or the web, a full rewrite may not be necessary. [XPF](/xpf) runs WPF applications cross-platform with minimal code changes, so you can ship to new platforms while keeping the codebase you already have.
:::

## Key differences

**Styling** is the biggest conceptual shift. Avalonia replaces WPF's resource-dictionary styles and triggers with a CSS-like system using selectors, style classes, and pseudo-classes. See [Styling](styling) for a full walkthrough.

**Data templates** work similarly, but are stored in a `DataTemplates` collection rather than in resources, and support interface and derived-type matching. See [Data Templates](data-templates).

**The property system** uses strongly-typed generics (`StyledProperty`, `DirectProperty`, `AttachedProperty`) instead of a single `DependencyProperty` class. See [Properties](properties).

**Events** follow the same routed event model, but use pointer-based names (`PointerPressed` instead of `MouseLeftButtonDown`) and handle tunnelling through routing strategy flags rather than separate `Preview*` events. See [Events](events).

**Controls** are largely the same. A few have different names or require separate NuGet packages. See [Controls](controls).

**Layout** panels (`Grid`, `StackPanel`, `DockPanel`, etc.) are the same, with small additions like `Spacing` on `StackPanel` and shorthand `ColumnDefinitions` syntax. See [Layout](layout).

## Where to start

If you want a quick side-by-side lookup, start with the **[Cheat Sheet](cheat-sheet)**. It covers XAML namespaces, property system, styling, data binding, controls, events, commands, templates, threading, animations, graphics, and file structure in compact tables.

For deeper explanations of each topic, use the guides linked above.

## See also

- [WPF to Avalonia Cheat Sheet](cheat-sheet): Quick side-by-side reference.
- [Styling](styling): CSS-like styling system migration guide.
- [Controls](controls): Control name mappings.
- [Properties](properties): Property system differences.