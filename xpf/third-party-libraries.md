---
id: third-party-libraries
title: Third party libraries
---

Avalonia XPF implements WPF's API surface, however a variety of third party libraries also depend on various win32 APIs which are obviously not available cross-platform.
To deal with this problem, Avalonia XPF implements a win32 API emulation layer that allows 3rd party libraries to work on non-windows platforms. This emulation
layer needs to be enabled explictly in your XPF application.

This feature must be enabled before any assembly attempts to call a win32 API, so the constructor of your `App` class or `Program.Main` is a good place to enable it.

To enable win32 API emulation application-wide you can add the following call:

```cs
  AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.AutoEnable();
```

You can exclude libraries that are known to provide non-windows platform support like this:

```cs
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup.
  .AutoEnable(asm =>
  {
    var name = asm.GetName().Name.ToLowerInvariant();
    if (name is "iface.oik.tm.native" or "sqlite" or "jint" or "esprima")
      return true;
    return false;
  });
```

Alternatively the layer can be enabled on per-library basis:

```cs
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup
  .AddLibrary(typeof(Type.In.Third.Party.Library).Assembly);
```

