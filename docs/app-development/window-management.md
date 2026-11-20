---
id: window-management
title: Window management
description: Create, configure, and manage windows and dialogs in Avalonia desktop applications.
doc-type: overview
---

Avalonia provides a flexible windowing system for creating single-window and multi-window desktop applications. This page covers common window management patterns.

## Multi-window patterns

### Tracking open windows

```csharp
public static class WindowManager
{
    private static readonly List<Window> _openWindows = new();

    public static IReadOnlyList<Window> OpenWindows => _openWindows;

    public static void Register(Window window)
    {
        _openWindows.Add(window);
        window.Closed += (_, _) => _openWindows.Remove(window);
    }

    public static void CloseAll()
    {
        foreach (var window in _openWindows.ToList())
            window.Close();
    }
}
```

## See also

- [Main Window](/docs/fundamentals/main-window): The primary application window.
- [Application Lifetimes](/docs/fundamentals/application-lifetimes): How the application lifecycle manages windows.
