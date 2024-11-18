---
id: avalonia-interop
title: Accessing Avalonia Features
---

## Overview

Sometimes WPF APIs may not provide the specific features you need. In these cases, there is often an Avalonia API that you can use to fill that gap.

## Getting the Avalonia Window

Many Avalonia features are exposed via the top-level `Window` class. Because an XPF `Window` is also an Avalonia `Window`, you can use the following pattern to get a reference to the underlying Avalonia `Window`:

```csharp
if (XpfWpfAbstraction.GetAvaloniaWindowForWindow(xpfWindow) is { } avaloniaWindow)
{
    // You now have an Avalonia Window.
}
```