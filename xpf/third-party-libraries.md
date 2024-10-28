---
id: third-party-libraries
title: Third party libraries
---

Avalonia XPF implements WPF's API surface, however a variety of third party libraries also depend on various win32 APIs which are obviously not available cross-platform.

To deal with this problem, Avalonia XPF implements a win32 API emulation layer that allows 3rd party libraries to work on non-windows platforms. This emulation layer needs to be enabled explictly in your XPF application.

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
    if (name is "sqlite" or "jint" or "esprima" or "magick.net" or "magick.net.core")
      return true;
    return false;
  });
```

Alternatively the layer can be enabled on per-library basis:

```cs
AvaloniaUI.Xpf.WinApiShim.WinApiShimSetup
  .AddLibrary(typeof(Type.In.Third.Party.Library).Assembly);
```

## Compatibility Database

We maintain a comprehensive [compatibility database](avaloniaui.net/xpf/packages) for third-party controls. This database provides up-to-date status information for controls from major vendors.

:::info 
If you find that a control marked as `Fix In Progress` or `Untested` is mission-critical for your application, please contact our support team. We're committed to working with you to ensure compatibility.
:::

### Compatibility Notes

* **Pure WPF Controls**: Third-party controls that are implemented purely in WPF typically work without any issues, even if not listed in our compatibility database.
* **Unlisted Vendors**: The absence of a control vendor from our database doesn't indicate incompatibility. We encourage you to test any controls you need.
* **Known Challenges**: Issues most commonly arise with controls that utilize GDI or WinForms components. 
  
