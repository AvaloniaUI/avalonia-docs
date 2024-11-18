---
id: release-notes
title: Release Notes
---

## XPF 1.3.0 

* Enable ECDSA-based license keys
* Fix multiple Geometry APIs
* Cache FontCollections and make them thread aware
* Fix issue with geometry hit testing non-stroked segments
* Update version on main to 1.3
* Implement BlockUIContainer
* Update Avalonia version
* Fix dispatch exception handling
* Support loading XPF into a separate ALC for poor man's multithreading
* Fixed MUCE geometry invalidation
* Fixes large image docoding
* Fix inlines TextDecorations and fix BaselineAlignment
* Fix TextDecorations
* Fix Key Mapping on macOS
* Fix GetDpiForMonitor
* Implement F32MonitorHandle and use new Screens APIs 
* Hackfix for incorrect glyph run bounds
* Don't process mouse events as touch
* Call InternalClose from the externally available Window.Close method
* Initial PDF generation support
* Add support for corner radius in rectangle geometry
* Add support for strokeless geometry segments
* Update avalonia: fix win32 window shown state
* Update avalonia- fix topmost owned window not working
* AvaloniaHostContainer needs to set transform origin to zero instead of default 50%50%
* Keep focus in avalonia host if window is reactivated
* Add dummy AdjustWindowRectEx
* Fix incorrectly set filename in save dialog
* Fix Window.Icon
* Fix "Mouse events not fired properly if another mouse button is pressed"
* Manually subscribe to all of subtree visual invalidation from MuceVisualBrush
* Fix headless platform, avoid Skia hardcoding
* Minor patcher improvement
* Add a flag to disable stackframe tweaks for devexpress
* Skip rendering content if it will be clipped away anyway
* Change the way we pool MuceRenderData states
* Fix FontAwesome.Sharp font loading
* Bump image sharp
* Stub for SHGetFileInfo
* Implement bitmap.copypixels
* Fixed DrawingImage, hackfixed parentless VisualBrush
* Publish packages from all branches
* Add regex semver checking for release tags
* Update dotnet.yml to trim trailing backslash on version
* Update Common.props
* Remove UseWinForms + misc
* Disable ImportWindowsDesktopTargets
* Allow the user to enable logging via msbuild property or environment variable
* Add XpfSingleProject property
* Update AvaloniaUI.Xpf.WinApiShim.targets
* Browser compatibility improvements
* Experimental WinAPI shims support for Browser
* Fix browser winapi shims
* Fix browser SDK
* Various WinAPI shims fixes related to the Screen API
* Some mono fixes
* SystemInformation.MouseWheelScrollDelta support
* Reset popup _positionInfo when creating a new win


## XPF 1.2.0

* Update ImageSharp
* Make DragDrop handler work with any Control rather than TopLevel
* Implement GetActiveWindow with virtual window handles
* Make HwndWrapper usable
* Ignore size to content from avalonia window
* Patch XPF assemblies to throw on DllImport
* Update GetSizeFromHwnd
* Update Avalonia nuget to 11.2 alpha
* Check if XpfHost is actually attached to something to decide if popup creation should be deferred
* Fix for situation when ExclusivelyOwnedWindow is actually null
* Port wpf popup placement logic
* Keep focus in avalonia host if window is reactivated
* Make snoop work in more cases
* Add support for corner radius in rectangle geometry
* Reset popup _positionInfo when creating a new window
* Fix for Telerik's RadTooltipWindow
* Read hotspot from .cur files
* Skip rendering content if it will be clipped away anyway
* Use absolute transform origin for WPF's Brush.Transform property
* Check if window has been activated before, when checking focus
* Fixed VisualBrush regression
* Add default bitmap cursor for Pen cursor type
* Initial support for PDF generation
* Added SystemInformation.MouseWheelScrollDelta
* Raise position changed when window position is set on initial state
* Activate window when control gains focus
* Fix bitmap encoding issues
* Block input during managed dragging
* Implemented BlockUIContainer
* X11 - Keep track of whether window activation is complete from control focus
* Fallback to setting dragpoint when position is set on linux
* Stub UnhookWindowsHookEx
* Various WinAPI shims fixes related to the Screen API
* Map more pixel formats
* Actipro docking fixes
* Don't call GetCapture from ComboBox in XPF
* Send MILCMD_BITMAP_INVALIDATE for WriteableBitmap.AddDirtyRect
* Properly configure DPI and page size metadata for PDF documents
* Don't allow resizing on maximized windows x11
* ManagedWindowDragHelper - keep track of previous positions and update position when WM_MOVING is handled
* MonitorFromWindow: Do not throw for non attached visual
* Fix unhandled exceptions
* Fix some Geometry issues
* Add support for strokeless geometry segments
* Add SKColorFilter free callback
* Allow the user to enable logging via msbuild property or environment variable
* Don't call GetCapture from MenuBase in XPF
* Update PresentationCore ref for XpfSkiaExtensions
* Add background setting to MessageBoxTheme.axaml
* Prevent non-client input when mouse is captured
* Fix screen working area for popups
* Fix crash on text box paste
* Fix some docking issues

### Known Issues

* Actipro docking: when tearing off a pane, preview is not shown on macOS
* DevExpress docking: does not always show drop adorners on X11
* Syncfusion docking: problems on all platforms
* Telerik docking: Initial drag/tear-off stops registering mouse on Windows
