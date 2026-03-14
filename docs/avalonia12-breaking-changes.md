---
id: avalonia12-breaking-changes
title: Breaking changes in Avalonia 12
description: A complete list of breaking changes between Avalonia 11 and 12, with migration guidance and code examples for each change.
doc-type: reference
sidebar_label: Breaking changes
toc_max_heading_level: 2
---

This page lists all the breaking changes between Avalonia 11 and 12 and provides migration guidance and alternatives.


## .NET support updated

Avalonia version 12 dropped support for .NET Framework and .NET Standard. Only .NET 8 and later are supported. The recommended target is .NET 10.

If your project targets Android or iOS, only .NET 10 is supported. This is to match the support Microsoft provides for the underlying .NET SDK.

Update your Avalonia projects to a supported .NET version.

**Example:**

```diff
-<TargetFramework>netstandard2.0</TargetFramework>
+<TargetFramework>net10.0</TargetFramework>
```

PR: [#19869](https://github.com/AvaloniaUI/Avalonia/pull/19869)


## Avalonia version 12

The major version of Avalonia is now 12, up from 11.

Upgrade all Avalonia package references to the latest 12 patch version, either in your favorite IDE or by editing the project files.  
Choose the latest release from the official [GitHub Releases page](https://github.com/AvaloniaUI/Avalonia/releases).

**Example:**

```diff
-<PackageReference Include="Avalonia" Version="11.3.12" />
+<PackageReference Include="Avalonia" Version="12.0.0" />
-<PackageReference Include="Avalonia.Themes.Fluent" Version="11.3.12" />
+<PackageReference Include="Avalonia.Themes.Fluent" Version="12.0.0" />
```


## `Avalonia.Diagnostics` package removed

The `Avalonia.Diagnostics` package has been removed.
The Dev Tools included with [Avalonia Accelerate](https://avaloniaui.net/accelerate) should be used instead.

Remove the `Avalonia.Diagnostics` package from your projects and replace it with `AvaloniaUI.DiagnosticsSupport`.  
To install the Accelerate Dev Tools, see the [Dev Tools documentation](https://docs.avaloniaui.net/accelerate/tools/dev-tools/getting-started).

**Example:**

Project file:

```diff
-<PackageReference Include="Avalonia.Diagnostics" Version="11.3.12" />
+<PackageReference Include="AvaloniaUI.DiagnosticsSupport" Version="2.2.0" />
```

Application file:

```diff
-AttachDevTools();
+AttachDeveloperTools();
```

PR: [#20332](https://github.com/AvaloniaUI/Avalonia/pull/20332)


## Binding class hierarchy changes

The binding class hierarchy has changed. Bindings defined in XAML files (e.g., `{Binding}`) are unaffected. However, you must update binding usages in C# code.

The `IBinding` interface has been removed. Its replacement is the [`BindingBase`](/api/avalonia/data/bindingbase) class.

All types of bindings now inherit from `BindingBase`: [`ReflectionBinding`](/api/avalonia/data/reflectionbinding), [`CompiledBinding`](/api/avalonia/data/compiledbinding), `TemplateBinding`, and `IndexerBinding`. Adjust your usage accordingly; don't assume that a `BindingBase` instance represents only a "standard" binding.

The `Binding` class is kept for compatibility and always corresponds to `ReflectionBinding`. To create bindings in code, use the `CompiledBinding` and `ReflectionBinding` classes directly.

The `InstancedBinding` class has also been removed. Its direct equivalent is `BindingExpressionBase`, which represents a binding applied to a given object and property.

**Example:**
```diff
 public record Item(string Value);

-var reflectionBinding = new Binding("SomeProperty");
 var reflectionBinding = new ReflectionBinding(nameof(Item.Value));

+var compiledBinding = CompiledBinding.Create((Item item) => item.Value);
```

PR: [#19589](https://github.com/AvaloniaUI/Avalonia/pull/19589), [#20439](https://github.com/AvaloniaUI/Avalonia/pull/20439)


## Compiled bindings are enabled by default

`<AvaloniaUseCompiledBindingsByDefault>` is now `true` by default.  
Any `Binding` usage in XAML code now maps to `CompiledBinding`.

Avalonia's official templates explicitly enabled this flag in created projects for several years, so recent codebases should not be affected. However, if your project didn't define this flag, it was `false` in previous versions.

Compiled bindings are recommended whenever possible, as they are more performant than reflection bindings and are checked for correctness at build time.

PR: [#19712](https://github.com/AvaloniaUI/Avalonia/pull/19712)


## Binding plugins removed

The binding plugins were intended as an extensibility point for adding features to bindings. In practice, they were not working with compiled bindings and were effectively unused by most people. 

Worse, users often had to turn off the default data annotations validation plugin because it conflicted with popular frameworks such as `CommunityToolkit.Mvvm`.

Starting with Avalonia v12, plugins are no longer configurable. The data annotations plugin is now disabled by default.

PR: [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623)


## Configurable text shaper

The text shaper is now configurable independently of the rendering engine. For most applications, this change should be transparent, as HarfBuzz is used by default when `UsePlatformDetect` is called on the `AppBuilder`.

However, if your project explicitly configures a rendering engine, such as Skia via `UseSkia`, an `InvalidOperationException` with the message *No text shaping system configured* might be thrown on startup. In this case, the project needs to be updated with a call to `UseHarfBuzz` on the `AppBuilder`.

**Example:**

Project file:

```diff
+<PackageReference Include="Avalonia.HarfBuzz" Version="12.0.0" />
```

Application file:

```diff
 AppBuilder.Configure<App>()
     .UseSkia()
+    .UseHarfBuzz()
```

PR: [#19852](https://github.com/AvaloniaUI/Avalonia/pull/19852)


## Improved touch/pen focus and selection behavior

Selection handling in [`SelectingItemsControl`](/api/avalonia/controls/primitives/selectingitemscontrol) (and derived controls such as `ListBox`, `ComboBox`, `TabControl`) and [`TreeView`](/api/avalonia/controls/treeview) has been unified to provide consistent, platform-appropriate behavior across input devices:

- **Touch and pen input** now triggers selection on pointer release (not press), matching native platform conventions. This allows swipe and scroll gestures to start on a selectable item without accidentally changing the selection.
- **Container types** (e.g., `ListBoxItem`, `TreeViewItem`) now handle selection input directly instead of letting events bubble up to their parent `ItemsControl`. Custom logic that relied on intercepting selection events at the `ItemsControl` level must be moved to the container or to an override of `UpdateSelectionFromEvent`.
- **Focus** is changed only on release for touch and pen devices.

### Obsoleted APIs

The following methods on `SelectingItemsControl` are obsoleted and will be removed in a future version:

| Obsoleted method | Replacement |
|---|---|
| `UpdateSelection` | `UpdateSelectionFromEvent` |
| `UpdateSelectionFromEventSource` | `UpdateSelectionFromEvent` |

### Customizing selection behavior

Override `ShouldTriggerSelection` on `SelectingItemsControl` or `TreeView` to control which pointer or key events initiate selection. Override `UpdateSelectionFromEvent` to customize how selection is applied.

The static `ItemSelectionEventTriggers` class provides helper methods for checking modifiers:

| Method | Description |
|---|---|
| `ShouldTriggerSelection(InputElement, PointerEventArgs)` | Determines whether a pointer event should trigger selection. |
| `ShouldTriggerSelection(InputElement, KeyEventArgs)` | Determines whether a key event should trigger selection. |
| `HasRangeSelectionModifier(InputElement, RoutedEventArgs)` | Checks for the Shift modifier (range select). |
| `HasToggleSelectionModifier(InputElement, RoutedEventArgs)` | Checks for the Ctrl modifier (toggle select). |

PR: [#19203](https://github.com/AvaloniaUI/Avalonia/pull/19203), [#19753](https://github.com/AvaloniaUI/Avalonia/pull/19753)


## [`TopLevel`](/api/avalonia/controls/toplevel) changes

To prepare the groundwork for advanced windowing features, notably templated drawn window decorations and virtual window scenarios, several changes happened in Avalonia v12:

- Despite its name, a `TopLevel` (this includes `Window`) object is not necessarily at the root of the visual hierarchy anymore. Code that casts the top `Visual` to `TopLevel` no longer works.
To access a `TopLevel` instance, always call `TopLevel.GetTopLevel(Visual)`.
- Interfaces that were previously only implemented by `TopLevel` classes, such as `IInputRoot`, `IRenderRoot`, `ILayoutRoot`, `ITextInputMethodRoot` and `IEmbeddableLayoutRoot`, are either removed or not accessible anymore. Use `TopLevel` instead.
- A new `IPresentationSource` interface is introduced, which represents an arbitrary host for the visual tree (while not being a visual itself). To get a hold of such an instance, call the new `GetPresentationSource(Visual)` extension method.

PR: [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624)


## Window decoration changes

Avalonia v12 overhauls how the decorations (title bar, caption buttons, resize grips, and similar elements) of a window are drawn when the system chrome is not used:

- A new [`WindowDrawnDecorations`](/api/avalonia/controls/chrome/windowdrawndecorations) class is added. Its role is to provide all the window decorations through a single control.
- Thanks to this new type, the `TitleBar`, `CaptionButtons` and `ChromeOverlayLayer` types are not necessary anymore and have been removed.
- The `Window.ExtendClientAreaChromeHints` property consisted of several flags that were not always behaving as expected. This property has been removed, as the [`WindowDecorations`](/api/avalonia/controls/windowdecorations) property in conjunction with `ExtendClientAreaToDecorationsHint` should be used instead.

PR: [#20770](https://github.com/AvaloniaUI/Avalonia/pull/20770), [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732), [#20796](https://github.com/AvaloniaUI/Avalonia/pull/20796)


## Clipboard changes

In a previous version, clipboard support was rewritten to use a new [`IAsyncDataTransfer`](/api/avalonia/input/iasyncdatatransfer) interface and related types. To avoid breaking compatibility, the old `IDataObject` interface was kept (and made obsolete) as a shim for the new system.

The `IDataObject` interface has been removed in Avalonia v12, along with all methods that accept that type. Its implementation, `DataObject`, no longer does anything.

The `IClipboard` interface has been simplified, with methods for reading specific formats implemented as extension methods (such as `TryGetTextAsync` and `TryGetFile`).

Read the official [clipboard documentation](services/clipboard) for details on using `IAsyncDataTransfer`.

**Example:**
```diff
// Setting a data object on the clipboard
-var data = new DataObject();
-data.Set(DataFormats.Text, "some text");
+var item = new DataTransferItem();
+item.Set(DataFormat.Text, "some text");
+var data = new DataTransfer();
+data.Add(item);

-await clipboard.SetDataObjectAsync(data);
+await clipboard.SetDataAsync(data);
```

**Example:**
```diff
// Reading text from the clipboard
-var text = await clipboard.GetTextAsync();
+var text = await clipboard.TryGetTextAsync();
```

PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)


## Multiple dispatchers support

While not technically a breaking change, Avalonia v12 now supports multiple dispatchers, one per thread.

Using `Dispatcher.UIThread` is still perfectly acceptable for applications. However, library and control authors should start using the `AvaloniaObject.Dispatcher` and `Dispatcher.CurrentDispatcher` properties to support multiple dispatchers properly.

Multiple UI threads are currently still unsupported.

PR: [#18686](https://github.com/AvaloniaUI/Avalonia/pull/18686)


## `Dispatcher.InvokeAsync` captures the execution context

This change should make most usages of asynchronous calls behave as the user would expect. `AsyncLocal` will work as expected, and impersonation and culture will flow from the caller.  

PR: [#19163](https://github.com/AvaloniaUI/Avalonia/pull/19163)


## `FuncMultiValueConverter` accepts an `IReadOnlyList`

The converter function parameter changed from `IEnumerable<TIn>` to `IReadOnlyList<TIn>`, allowing you to access values by index (e.g., `values[0]`) without converting to an intermediate collection. Since `IReadOnlyList<T>` extends `IEnumerable<T>`, most existing usages that iterate or use LINQ are unaffected. Code that explicitly declares the lambda parameter type as `IEnumerable<TIn>` will need to be updated.

PR: [#19936](https://github.com/AvaloniaUI/Avalonia/pull/19936)


## Data validation enabled by default in custom controls

Before v12, Avalonia properties with `enableDataValidation: true` required overriding the `UpdateDataValidation` method for data validation errors to be reported for that property. Now it happens automatically.

You should remove `UpdateDataValidation` overrides that only call `DataValidationErrors.SetError`.

**Example:**
```diff
 public class CustomControl
 {

     public static readonly StyledProperty<string?> CustomProperty = 
         AvaloniaProperty.Register<CustomControl, string?>("Custom", enableDataValidation: true)); 

-    protected override void UpdateDataValidation(AvaloniaProperty property, BindingValueType state, Exception? error)
-    {
-        if (property == CustomProperty)
-        {
-            DataValidationErrors.SetError(this, error);
-        }
-    } 
 }
```

If you need to revert to the old behavior for a given property, override `UpdateDataValidation` and do not call the base method for that property.

PR: [#20067](https://github.com/AvaloniaUI/Avalonia/pull/20067)


## Render target and platform surface interfaces reworked

Several internal rendering interfaces have been restructured:

- `IRenderTarget.CreateDrawingContext` now takes a `RenderTargetSceneInfo` parameter instead of multiple overloads.
- `IRenderTargetBitmapImpl` no longer extends `IRenderTarget`. It now extends `IReadableBitmapImpl` with a simpler `CreateDrawingContext()` method.
- `IDrawingContextLayerImpl` no longer extends `IRenderTargetBitmapImpl`. It now extends `IBitmapImpl` directly.
- Platform surfaces use the typed `IPlatformRenderSurface` interface instead of `IEnumerable<object>`.
- `ISkiaGpu` is now internal.

Several versioned and split interfaces have been merged into their base types:

- `IRenderTarget2` and `IRenderTargetWithProperties` merged into `IRenderTarget`.
- `IGlPlatformSurfaceRenderTarget2` and `IGlPlatformSurfaceRenderTargetWithCorruptionInfo` merged into `IGlPlatformSurfaceRenderTarget`.
- `ISkiaGpuRenderTarget2` merged into `ISkiaGpuRenderTarget`.
- `ISkiaGpuWithPlatformGraphicsContext` merged into `ISkiaGpu`.

Additionally, alpha format handling has been consolidated:

- `ILockedFramebuffer` now includes an [`AlphaFormat`](/api/avalonia/platform/alphaformat) property.
- `IReadableBitmapImpl` now includes an `AlphaFormat?` property, replacing the separate `IReadableBitmapWithAlphaImpl` interface.
- `Bitmap.CopyPixels()` no longer accepts an `AlphaFormat` parameter. The alpha format is now read from the `ILockedFramebuffer` directly.
- The `LockedFramebuffer` constructor requires an `AlphaFormat` parameter.

The `IPlatformRenderInterfaceContext.CreateOffscreenRenderTarget` method signature changed from `(PixelSize, double)` to `(PixelSize, Vector, bool)`, where the `double` scaling factor is replaced by a `Vector` for per-axis scaling and a `bool` for text antialiasing control. A new `MaxOffscreenRenderTargetPixelSize` property was also added to the interface.

These changes only affect code that implements custom rendering backends or directly consumes platform-level rendering interfaces. Application code using `RenderTargetBitmap` or standard drawing APIs is not affected.

PRs: [#20811](https://github.com/AvaloniaUI/Avalonia/pull/20811), [#20556](https://github.com/AvaloniaUI/Avalonia/pull/20556), [#20557](https://github.com/AvaloniaUI/Avalonia/pull/20557), [#20497](https://github.com/AvaloniaUI/Avalonia/pull/20497)

## Text formatting constructors modified

`GenericTextRunProperties`, `TextCollapsingProperties`, and `TextShaperOptions` all had two constructors: one with a `FontFeatureCollection` parameter, and one without.

They have been merged into a single constructor with an optional parameter.
Depending on the overload used, you might need to reorder the arguments, since `FontFeatureCollection` is now the last parameter.

PR: [#20527](https://github.com/AvaloniaUI/Avalonia/pull/20527)


## Access keys are triggered by symbol

Previously, the underlying virtual key triggered access keys, so accented characters or numbers could not be used as access keys.

To align with other popular UI frameworks and user expectations, access keys are now triggered by the symbol printed on the key. This means accented characters (e.g., `_é`) and numbers (e.g., `_2`) now work as access keys.

The `AccessText.AccessKey` property type changed from `char` to `string?` to support multi-byte Unicode characters. Code that reads this property will need to be updated.

PR: [#20662](https://github.com/AvaloniaUI/Avalonia/pull/20662)


## Font support updated

To ensure consistent font loading across platforms, Avalonia v12 includes its own font parser.

Some legacy fonts that are not TrueType (.ttf) or OpenType (.otf) are no longer supported. Such fonts include the ancient Type 1 Font format (.pfb/.pfm).

PR: [#19852](https://github.com/AvaloniaUI/Avalonia/pull/19852)


## [`Screen`](/api/avalonia/platform/screen) is abstract

The `Screen` class has several internal implementations, and the base class was constructible only for legacy reasons.

In Avalonia v12, it is now abstract. Do not construct a `Screen` class. Instead, get an existing instance from its members (for example, `Screens.All`, `Screens.Primary`, `Screens.ScreenFromWindow`).

PR: [#20529](https://github.com/AvaloniaUI/Avalonia/pull/20529)


## [`ResourcesChangedEventArgs`](/api/avalonia/controls/resourceschangedeventargs) is a struct

For performance purposes, `ResourcesChangedEventArgs` is now a struct.

Most projects never construct instances of this type, as it's mainly used through the `StyledElement.ResourcesChanged` event.
If you did construct `ResourcesChangedEventArgs`, call `ResourceChangedEventArgs.Create` instead.

PR: [#20576](https://github.com/AvaloniaUI/Avalonia/pull/20576)


## Gesture events moved

All the attached events previously declared in the `Gestures` class (such as `ScrollGesture`, `Pinch`, and others) have been moved to `InputElement`, making them available to all elements by default. Remove the `Gestures.` prefix from your XAML files.

The `Gestures` class is not public anymore.

Example:

```diff
-<Button Gestures.Pinch="Button_Pinch" />
+<Button Pinch="Button_Pinch" />
```

PR: [#20789](https://github.com/AvaloniaUI/Avalonia/pull/20789)

## Windows

### Direct2D1 support removed

Avalonia no longer provides a Direct2D rendering backend. This package was not maintained, and did not have feature and performance parity with the Skia backend. The Skia backend is now the recommended rendering backend for all usages.

**Example:**

Project file:

```diff
-<PackageReference Include="Avalonia.Direct2D1" Version="11.3.12" />
+<PackageReference Include="Avalonia.Skia" Version="12.0.0" />
```

Application file:

```diff
 AppBuilder.Configure<App>()
-    .UseDirect2D1()
+    .UseSkia()
```

PR: [#20132](https://github.com/AvaloniaUI/Avalonia/pull/20132)

### `BinaryFormatter` removed

In previous versions, Avalonia used .NET's `BinaryFormatter` on Windows to implicitly serialize and deserialize arbitrary objects placed on the clipboard.

Microsoft has been recommending [migrating away from the binary formatter](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-migration-guide/) since several .NET versions. Avalonia follows this guidance and no longer uses it.

Your project should explicitly serialize and deserialize objects using your preferred mechanism (JSON is a popular format).

PR: [#20455](https://github.com/AvaloniaUI/Avalonia/pull/20455)

### `Window.ExtendClientAreaToDecorationsHint` improved

On Windows, several issues with the `ExtendClientAreaToDecorationsHint` property have been fixed, and this property now works in all supported scenarios. Previously, various workarounds were suggested, such as adding or removing margins in the affected window (notably when the window is maximized). All earlier workarounds should now be removed.

PR: [#20217](https://github.com/AvaloniaUI/Avalonia/pull/20217)


## Android

### App initialization changed

In Avalonia 12, the way an Android application and its activities are initialized has changed, allowing subsequent activities to properly use the `Application` class defined in your project.

1. Change your main activity to inherit from [`AvaloniaMainActivity`](/api/avalonia/android/avaloniamainactivity) (non-generic) instead of `AvaloniaMainActivity<TApp>` (generic).
2. Add a new class deriving from `AvaloniaAndroidApplication<TApp>` and apply the `[Android.App.Application]` attribute to it.

**Example:**

```diff
[Activity]
public class MainActivity :
-AvaloniaMainActivity<App>
+AvaloniaMainActivity
{
}

+[Application]
+public class AndroidApp : AvaloniaAndroidApplication<App>
+{
+    protected AndroidApp(IntPtr javaReference, JniHandleOwnership transfer)
+        : base(javaReference, transfer)
+    {
+    }
+}
```

PR: [#18756](https://github.com/AvaloniaUI/Avalonia/pull/18756)

### [`IActivityApplicationLifetime`](/api/avalonia/controls/applicationlifetimes/iactivityapplicationlifetime) replaces [`ISingleViewApplicationLifetime`](/api/avalonia/controls/applicationlifetimes/isingleviewapplicationlifetime)

Android now uses `IActivityApplicationLifetime` instead of `ISingleViewApplicationLifetime`. This new interface provides a `MainViewFactory` property (a `Func<Control>`) instead of a single `MainView` instance, because Android can create multiple activity instances during the app's lifetime.

Update your `App.axaml.cs` to check for `IActivityApplicationLifetime` before `ISingleViewApplicationLifetime`:

```diff
 public override void OnFrameworkInitializationCompleted()
 {
     if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
         desktop.MainWindow = new MainWindow();
+    else if (ApplicationLifetime is IActivityApplicationLifetime activityLifetime)
+        activityLifetime.MainViewFactory = () => new MainView();
     else if (ApplicationLifetime is ISingleViewApplicationLifetime singleView)
         singleView.MainView = new MainView();
     base.OnFrameworkInitializationCompleted();
 }
```

The `ISingleViewApplicationLifetime` check is still needed for iOS, browser, and embedded Linux platforms.

PR: [#18893](https://github.com/AvaloniaUI/Avalonia/pull/18893)

### Removed `CreateAppBuilder` and `CustomizeAppBuilder` from `AvaloniaMainActivity`

The `CreateAppBuilder()` and `CustomizeAppBuilder(AppBuilder)` virtual methods have been removed from `AvaloniaMainActivity`. These methods were previously marked as obsolete and are no longer called by the framework. App initialization is now handled entirely through `AvaloniaAndroidApplication<TApp>`, as described in the section above.

If you were overriding these methods, move that logic into your `AvaloniaAndroidApplication<TApp>` subclass or your `App` class instead.

PR: [#20715](https://github.com/AvaloniaUI/Avalonia/pull/20715)


## iOS

### App initialization changed

In Avalonia 12, the way an iOS application is initialized has changed to use the ["scenes" concept](https://developer.apple.com/documentation/technotes/tn3187-migrating-to-the-uikit-scene-based-life-cycle), which Apple will make mandatory in the near future.

While most applications should work without any code changes, `AvaloniaAppDelegate.Window` will now remain `null` after the app is initialized, as the window is now managed internally by the scene delegate.

If you need to access the `UIWindow`, override the `AvaloniaView.MovedToWindow` method to detect when the view gets attached to it.

PR: [#20454](https://github.com/AvaloniaUI/Avalonia/pull/20454)


## Browser

### `Avalonia.Browser.Blazor` package removed

The `Avalonia.Browser.Blazor` package served as a temporary migration step during the upgrade from Avalonia's old Blazor-based browser backend. Avalonia has now fully moved to a new backend based on WASM (`Avalonia.Browser`). This package was no longer maintained and has been removed.

It is still possible to run Avalonia on top of Blazor by using the supported `Avalonia.Browser` package and its `AvaloniaView` class.

PR: [#20105](https://github.com/AvaloniaUI/Avalonia/pull/20105)


## Tizen

### `Avalonia.Tizen` package removed

The Tizen platform is no longer supported out of the box because it lacked a maintainer.
Read [Moving Tizen Support Out of Main Repository](https://github.com/AvaloniaUI/Avalonia/discussions/19721) for details.

PR: [#19722](https://github.com/AvaloniaUI/Avalonia/pull/19722)


## Headless

### xUnit.net and NUnit supported versions updated

The underlying test frameworks supported by Avalonia's headless platform have been updated to their latest versions. The unit tests might need updates.
- xUnit.net support now targets version 3 (up from 2). Read xUnit.net's [official migration guide](https://xunit.net/docs/getting-started/v3/migration) for how to migrate your unit tests.
- NUnit support now targets version 4 (up from 3). Read NUnit's [official migration guide](https://docs.nunit.org/articles/nunit/release-notes/Nunit4.0-MigrationGuide.html) for how to migrate your unit tests.

PR: [#20372](https://github.com/AvaloniaUI/Avalonia/pull/20372), [#20481](https://github.com/AvaloniaUI/Avalonia/pull/20481)


## Removed members

The following members have been removed in Avalonia 12. They are grouped by the feature area that motivated the removal.

### Binding class hierarchy

See [Binding class hierarchy changes](#binding-class-hierarchy-changes) for context.

| Removed member | Replacement | PR |
|---|---|---|
| `IBinding` interface | `BindingBase` | [#19589](https://github.com/AvaloniaUI/Avalonia/pull/19589) |
| `InstancedBinding` class | `BindingExpressionBase` | [#19589](https://github.com/AvaloniaUI/Avalonia/pull/19589) |

### Binding plugins

See [Binding plugins removed](#binding-plugins-removed) for context. Remove all usages of these types.

| Removed member | PR |
|---|---|
| `Avalonia.Data.Core.Plugins.BindingPlugins` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.DataValidationBase` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.ExceptionValidationPlugin` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.IDataValidationPlugin` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.IndeiValidationPlugin` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.IPropertyAccessorPlugin` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.IStreamPlugin` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.PropertyAccessorBase` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |
| `Avalonia.Data.Core.Plugins.PropertyError` | [#20623](https://github.com/AvaloniaUI/Avalonia/pull/20623) |

### Clipboard and drag-drop

See [Clipboard changes](#clipboard-changes) for context.

| Removed member | Replacement | PR |
|---|---|---|
| `DataFormats.*` members | `DataFormat.*` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `DataObject.*` members | `DataTransfer` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `DataObjectExtensions` class | `AsyncDataTransferExtensions` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `DragDrop.DoDragDrop` method | `DragDrop.DoDragDropAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `DragEventArgs.Data` property | `DragEventArgs.DataTransfer` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IDataObject` interface | `IAsyncDataTransfer` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IClipboard.GetDataAsync` | `IClipboard.TryGetDataAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IClipboard.GetFormatsAsync` | `ClipboardExtensions.GetDataFormatsAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IClipboard.GetTextAsync` | `ClipboardExtensions.TryGetTextAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IClipboard.SetTextAsync` | `ClipboardExtensions.SetTextAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |
| `IClipboard.TryGetInProcessDataObjectAsync` | `IClipboard.TryGetInProcessDataAsync` | [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521) |

### TopLevel

See [`TopLevel` changes](#toplevel-changes) for context.

| Removed member | Replacement | PR |
|---|---|---|
| `IInputRoot` interface | `TopLevel` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `ITextInputMethodRoot` interface | `TopLevel` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `IEmbeddedLayoutRoot` interface | `TopLevel` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `ILayoutRoot` interface | `TopLevel` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `IRenderRoot` interface | `TopLevel` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `LayoutManager` class | `ILayoutManager` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `TopLevel.PlatformSettings` property | `VisualExtensions.GetPlatformSettings` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `TopLevel.PointerOverElement` property | Remove usages | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `TopLevel.StartRendering/StopRendering` | `Embedding.StartRendering/StopRendering` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |
| `VisualExtensions.GetVisualRoot` method | `GetPresentationSource` + `IPresentationSource.RootVisual` | [#20624](https://github.com/AvaloniaUI/Avalonia/pull/20624) |

### Window decorations

See [Window decoration changes](#window-decoration-changes) for context.

| Removed member | Replacement | PR |
|---|---|---|
| `Chrome.CaptionButtons` class | `WindowDrawnDecorations` | [#20770](https://github.com/AvaloniaUI/Avalonia/pull/20770) |
| `Chrome.TitleBar` class | `WindowDrawnDecorations` | [#20770](https://github.com/AvaloniaUI/Avalonia/pull/20770) |
| `ChromeOverlayLayer` class | `WindowDrawnDecorations` | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `VisualLayerManager.AdornerLayer` property | `AdornerLayer.GetAdornerLayer` | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `VisualLayerManager.ChromeOverlayLayer` property | `WindowDrawnDecorations` | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `VisualLayerManager.LightDismissOverlayLayer` property | Remove usages | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `VisualLayerManager.OverlayLayer` property | `OverlayLayer.GetOverlayLayer` | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `Window.ExtendClientAreaChromeHints` property | `Window.WindowDecorations` | [#20770](https://github.com/AvaloniaUI/Avalonia/pull/20770) |
| `SystemDecorations` enum | `WindowDecorations` | [#20796](https://github.com/AvaloniaUI/Avalonia/pull/20796) |
| `ExtendClientAreaChromeHints` enum | `WindowDecorations` | [#20770](https://github.com/AvaloniaUI/Avalonia/pull/20770) |
| `IPopupHostProvider` interface | [`Popup`](/api/avalonia/controls/primitives/popup) | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `IPopupHost` interface | `Popup` | [#20597](https://github.com/AvaloniaUI/Avalonia/pull/20597) |
| `LightDismissOverlayLayer` class | `VisualLayerManager` | [#20732](https://github.com/AvaloniaUI/Avalonia/pull/20732) |
| `OverlayPopupHost.CreatePopupHost` method | `Popup` | [#20597](https://github.com/AvaloniaUI/Avalonia/pull/20597) |

### Gesture events

See [Gesture events moved](#gesture-events-moved) for context.

| Removed member | Replacement | PR |
|---|---|---|
| `Gestures` class (all attached events) | Events on `InputElement` | [#20789](https://github.com/AvaloniaUI/Avalonia/pull/20789) |

### Other specific removals

| Removed member | Replacement | Notes | PR |
|---|---|---|---|
| `ResourcesChangedEventArgs.Empty` | `ResourcesChangedEventArgs.Create` | See [`ResourcesChangedEventArgs` is a struct](#resourceschangedeventargs-is-a-struct) | [#20576](https://github.com/AvaloniaUI/Avalonia/pull/20576) |
| `TextInputMethodClient.ShowInputPanel` | `InputPaneActivationRequested` event | Showing input panel directly was not correct on all platforms | [#20544](https://github.com/AvaloniaUI/Avalonia/pull/20544) |
| `NativeMenuBar.EnableMenuItemClickForwarding` | Remove usages | Property did nothing | [#20577](https://github.com/AvaloniaUI/Avalonia/pull/20577) |
| `NativeMenuItemToggleType` enum | `MenuItemToggleType` | Merged with `MenuItemToggleType` | [#20577](https://github.com/AvaloniaUI/Avalonia/pull/20577) |
| `IGeometryContext2` interface | `IGeometryContext` | `isStroked`/`isFilled` are now optional parameters on `IGeometryContext` methods | [#20528](https://github.com/AvaloniaUI/Avalonia/pull/20528) |
| `IWindowImpl.GetWindowsZOrder` | `IWindowingPlatform.GetWindowsZOrder` | Parameter type changed from `Span<Window>` to `ReadOnlySpan<IWindowImpl>` | [#20633](https://github.com/AvaloniaUI/Avalonia/pull/20633) |
| `AutoCompleteBox.BindingEvaluator` | Provide your own implementation | Was an implementation detail exposed publicly | [#20596](https://github.com/AvaloniaUI/Avalonia/pull/20596) |
| `CharacterReader` struct | Provide your own implementation | Was an implementation detail exposed publicly | [#19123](https://github.com/AvaloniaUI/Avalonia/pull/19123) |
| `StringTokenizer` struct | Provide your own implementation | Was an implementation detail exposed publicly | [#20544](https://github.com/AvaloniaUI/Avalonia/pull/20544) |
| `Data.Core.PropertyPath` class | Remove usages | Leftover from previous versions, unused | [#19133](https://github.com/AvaloniaUI/Avalonia/pull/19133) |
| `Remote.RemoteServer` class | Remove usages | Leftover, not working correctly | [#20767](https://github.com/AvaloniaUI/Avalonia/pull/20767) |
| `Remote.RemoteWidget` class | Remove usages | Leftover, not working correctly | [#20767](https://github.com/AvaloniaUI/Avalonia/pull/20767) |

### Obsolete since Avalonia 11

The following members were marked obsolete in Avalonia 11 and have now been removed.

| Removed member | Replacement | PR |
|---|---|---|
| `IInsetsManager.DisplayEdgeToEdge` | `IInsetsManager.DisplayEdgeToEdgePreference` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `CustomAnimatorBase` / `CustomAnimatorBase<T>` | `InterpolatingAnimator<T>` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `CubicBezierEasing` | `SplineEasing` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `AppBuilder.LifetimeOverride` | Use any predefined lifetime | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `AvaloniaObjectExtensions.Bind` | `AvaloniaObject.Bind` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `IActivatableApplicationLifetime` | `Application.Current.TryGetFeature<IActivatableLifetime>` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ContextMenu.PlacementMode` | `ContextMenu.Placement` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `FileDialog` / `FileSystemDialog` / `SystemDialog` | `IStorageProvider` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `OpenFileDialog` | `IStorageProvider.OpenFilePickerAsync` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `OpenFolderDialog` | `IStorageProvider.OpenFolderPickerAsync` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `SaveFileDialog` | `IStorageProvider.SaveFilePickerAsync` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ManagedFileDialogExtensions.ShowManagedAsync` | `IStorageProvider.OpenFilePickerAsync` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ItemContainerGenerator.ContainerFromIndex` | `ItemsControl.ContainerFromIndex` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ItemContainerGenerator.IndexFromContainer` | `ItemsControl.IndexFromContainer` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `TreeContainerIndex` | `TreeView` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `TreeItemContainerGenerator` | `ItemContainerGenerator` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ItemsControl.ItemsControlFromItemContaner` | `ItemsControl.ItemsControlFromItemContainer` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ToggleButton.Checked/Unchecked/Indeterminate` events | `ToggleButton.IsCheckedChanged` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `TabItem.SubscribeToOwnerProperties` | Remove usages | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `BindingPriority.TemplatedParent` | `BindingPriority.Template` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `CompiledBindingPathBuilder.SetRawSource` | `CompiledBinding.Source` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `Color.ToUint32` | `Color.ToUInt32` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `DrawingContext.PushPreTransform/PushPostTransform/PushTransformContainer` | `DrawingContext.PushTransform` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `ImmutableRadialGradientBrush.Radius` | `RadiusX` and `RadiusY` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `IRadialGradientBrush.Radius` | `RadiusX` and `RadiusY` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `RadialGradientBrush.Radius` | `RadiusX` and `RadiusY` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `IApplicationPlatformEvents` | `Application.Current.TryGetFeature<IActivatableLifetime>` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `Popup.PlacementMode` | `Popup.Placement` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `Screen.PixelDensity` | `Screen.Scaling` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `Screen.Primary` | `Screen.IsPrimary` | [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617) |
| `ICompositionGpuImportedObject.ImportCompeted` | `ImportCompleted` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |
| `IStyleable` interface | `StyledElement` | [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613) |


## Renamed members

| Old name | New name | Notes | PR |
|---|---|---|---|
| `PseudolassesExtensions` | `PseudoClassesExtensions` | Typo fix. Most codebases are unaffected since this type is used implicitly from XAML or as C# extension methods. | [#18717](https://github.com/AvaloniaUI/Avalonia/pull/18717) |
| `X11PlatformOptions.ExterinalGLibMainLoopExceptionLogger` | `ExternalGLibMainLoopExceptionLogger` | Typo fix. | [#19128](https://github.com/AvaloniaUI/Avalonia/pull/19128) |
| `TextBox.Watermark` | `TextBox.PlaceholderText` | Old property kept as obsolete. | [#20303](https://github.com/AvaloniaUI/Avalonia/pull/20303) |
| `TextBox.UseFloatingWatermark` | `TextBox.UseFloatingPlaceholder` | Old property kept as obsolete. | [#20303](https://github.com/AvaloniaUI/Avalonia/pull/20303) |
| `Window.SystemDecorations` | `Window.WindowDecorations` | Old property kept as obsolete. See [Window decoration changes](#window-decoration-changes). | [#20796](https://github.com/AvaloniaUI/Avalonia/pull/20796) |
| `RenderOptions.TextRenderingMode` | `TextOptions.TextRenderingMode` | `TextOptions` also includes `TextHintingMode` and `BaselinePixelAlignment`. See [Text options](graphics-animation/text-options). | [#20107](https://github.com/AvaloniaUI/Avalonia/pull/20107) |
| `TextBlock.LetterSpacing` | `TextElement.LetterSpacing` | Now an inherited attached property available on all templated controls. XAML on `TextBlock` is source-compatible; update code referencing `TextBlock.LetterSpacingProperty` to `TextElement.LetterSpacingProperty`. | [#20141](https://github.com/AvaloniaUI/Avalonia/pull/20141) |

## See also

- [Avalonia 12 release notes](https://github.com/AvaloniaUI/Avalonia/releases)
