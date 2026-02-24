---
id: avalonia12-breaking-changes
title: Avalonia 12 breaking changes
toc_max_heading_level: 2
---

# Avalonia 12 breaking changes

This page lists all the breaking changes between Avalonia 11 and 12 and provides migration guidance and alternatives.


## .NET support updated

Avalonia version 12 dropped support for .NET Framework and .NET Standard. Only .NET 8 and later are supported.  
We recommend targeting .NET 10.

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
We recommend choosing the latest release from the official [GitHub Releases page](https://github.com/AvaloniaUI/Avalonia/releases).

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
To install the Accelerate Dev Tools, please follow our [Dev Tools documentation](https://docs.avaloniaui.net/accelerate/tools/dev-tools/getting-started).

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

The `IBinding` interface has been removed. Its replacement is the `BindingBase` class.

All types of bindings now inherit from `BindingBase`: `ReflectionBinding`, `CompiledBinding`, `TemplateBinding`, and `IndexerBinding`. Adjust your usage accordingly; don't assume that a `BindingBase` instance represents only a "standard" binding.

The `Binding` class is kept for compatibility and always corresponds to `ReflectionBinding`. To create bindings in code, we recommend using the `CompiledBinding` and `ReflectionBinding` classes directly.

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

We recommend using compiled bindings whenever possible, as they are more performant than reflection bindings and are checked for correctness at build time.

PR: [#19712](https://github.com/AvaloniaUI/Avalonia/pull/19712)


## Configurable text shaper

The text shaper is now configurable independently of the rendering engine. For most applications, this change should be transparent, as HarfBuzz is used by default when `UsePlatformDetect` is called on the `AppBuilder`.

However, if your project explicitly configures a rendering engine, such as Skia via `UseSkia`, an `InvalidOperationException` with the message *Unable to locate 'Avalonia.Platform.ITextShaperImpl'* might be thrown on startup. In this case, the project needs to be updated with a call to `UseHarfBuzz` on the `AppBuilder`.

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


## [Windows] Direct2D1 support removed

Avalonia no longer provides a Direct2D rendering backend. This package was not maintained, and did not have feature and performance parity with our Skia backend. The Skia backend is now the recommended rendering backend for all usages.

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

## [Android] App initialization changed

In Avalonia 12, the way an Android application and its activities are initialized has changed, allowing subsequent activities to properly use the `Application` class defined in your project.

1. Change your main activity to inherit from `AvaloniaMainActivity` (non-generic) instead of `AvaloniaMainActivity<TApp>` (generic).
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


## [iOS] App initialization changed

In Avalonia 12, the way an iOS application is initialized has changed to use the ["scenes" concept](https://developer.apple.com/documentation/technotes/tn3187-migrating-to-the-uikit-scene-based-life-cycle), which Apple will make mandatory in the near future.

While most applications should work without any code changes,`AvaloniaAppDelegate.Window` will now remain `null` after the app is initialized, as the window is now managed internally by the scene delegate.

If you need to access the `UIWindow`, we recommend overriding the `AvaloniaView.MovedToWindow` method to detect when the view gets attached to it.

PR: [#20454](https://github.com/AvaloniaUI/Avalonia/pull/20454)


## [Tizen] `Avalonia.Tizen` package removed

The Tizen platform is no longer supported out of the box because it lacked a maintainer.  
Read [Moving Tizen Support Out of Main Repository](https://github.com/AvaloniaUI/Avalonia/discussions/19721) for details.

PR: [#19722](https://github.com/AvaloniaUI/Avalonia/pull/19722)


## [Browser] `Avalonia.Browser.Blazor` package removed

The `Avalonia.Browser.Blazor` package served as a temporary migration step while we upgraded from Avalonia's old browser backend, based on Blazor. We have now fully moved to a new backend based on WASM (`Avalonia.Browser`). This package was no longer maintained and has been removed.

Note that it is still possible to run Avalonia on top of Blazor by using the supported `Avalonia.Browser` package and its `AvaloniaView` class.

PR: [#20105](https://github.com/AvaloniaUI/Avalonia/pull/20105)


## [Headless] xUnit.net and NUnit supported versions updated

The underlying test frameworks supported by Avalonia's headless platform have been updated to their latest versions. The unit tests might need updates.
- xUnit.net support now targets version 3 (up from 2). Read xUnit.net's [official migration guide](https://xunit.net/docs/getting-started/v3/migration) for how to migrate your unit tests.
 - NUnit support now targets version 4 (up from 3). Read NUnit's [official migration guide](https://docs.nunit.org/articles/nunit/release-notes/Nunit4.0-MigrationGuide.html) for how to migrate your unit tests.

PR: [#20372](https://github.com/AvaloniaUI/Avalonia/pull/20372), [#20481](https://github.com/AvaloniaUI/Avalonia/pull/20481)


### [Windows] `BinaryFormatter` removed

In previous versions, Avalonia used .NET's `BinaryFormatter` on Windows to implicitly serialize and deserialize arbitrary objects placed on the clipboard.

Microsoft has been recommending [migrating away from the binary formatter](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-migration-guide/) since several .NET versions. Avalonia follows this guidance and no longer uses it.

Your project should explicitly serialize and deserialize objects using your preferred mechanism (JSON is a popular format).

PR: [#20455](https://github.com/AvaloniaUI/Avalonia/pull/20455)


## Improved touch/pen focus and selection behavior 

- Selection events in `ItemsControl` and derived classes (e.g., `ListBox`), as well as `TreeViewItem`, may behave differently. For example, items will be selected on touch/pen release. A new `ShouldTriggerSelection` virtual method can be overridden to change the default selection behavior.
- Container types (e.g., `ListBoxItem`) now always handle selection input, instead of letting the event bubble up to their `ItemsControl`.
- Focus is now changed only when touch and pen devices are released.

PR: [#19203](https://github.com/AvaloniaUI/Avalonia/pull/19203), [#19753](https://github.com/AvaloniaUI/Avalonia/pull/19753)


## Clipboard changes

Previously, we rewrote clipboard support to use a new `IAsyncDataTransfer` interface and related types. To avoid breaking compatibility, the old `IDataObject` interface was kept (and made obsolete) as a shim for the new system.

The `IDataObject` interface has been removed in Avalonia v12, along with all methods that accept that type. Its implementation, `DataObject`, no longer does anything.

The `IClipboard` interface has been simplified, with methods for reading specific formats implemented as extension methods (such as `TryGetTextAsync` and `TryGetFile`).

Read the official [clipboard documentation](/reference/services/clipboard) to know how to use `IAsyncDataTransfer`.

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


## `Dispatcher.InvokeAsync` captures the execution context

This change should make most usages of asynchronous calls behave as the user would expect. `AsyncLocal` will work as expected, and impersonation and culture will flow from the caller.  

PR: [#19163](https://github.com/AvaloniaUI/Avalonia/pull/19163)


## `FuncMultiValueConverter` accepts an `IReadOnlyList`

This change allows you to index values directly.   
Most existing usages should be unaffected.

PR: [#19936](https://github.com/AvaloniaUI/Avalonia/pull/19936)


## Data validation enabled by default in custom controls

Before v12, Avalonia properties with `enableDataValidation: true` required overriding the `UpdateDataValidation` method for data validation errors to be reported for that property. Now it happens automatically.

We recommend removing `UpdateDataValidation` overrides that only call `DataValidationErrors.SetError`.

If you need to revert to the old behavior for a given property, override `UpdateDataValidation` and do not call the base method for that property.

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

PR: [#20067](https://github.com/AvaloniaUI/Avalonia/pull/20067)


## [Windows] `Window.ExtendClientAreaToDecorationsHint` improved

On Windows, several issues with the `ExtendClientAreaToDecorationsHint` property have been fixed, and this property now works in all supported scenarios. Previously, various workarounds were suggested, such as adding or removing margins in the affected window (notably when the window is maximized). All earlier workarounds should now be removed.

PR: [#20217](https://github.com/AvaloniaUI/Avalonia/pull/20217)


## Text formatting constructors modified

`GenericTextRunProperties`, `TextCollapsingProperties`, and `TextShaperOptions` all had two constructors: one with a `FontFeatureCollection` parameter, and one without.

They have been merged into a single constructor with an optional parameter.
Depending on the overload used, you might need to reorder the arguments, since `FontFeatureCollection` is now the last parameter.

PR: [#20527](https://github.com/AvaloniaUI/Avalonia/pull/20527)


## Access keys are triggered by symbol

Previously, the underlying virtual key triggered access keys, so accented characters or numbers could not be used as access keys.

To align with other popular UI frameworks and user expectations, access keys are now triggered by the symbol printed on the key.

PR: [#20662](https://github.com/AvaloniaUI/Avalonia/pull/20662)


## `Screen` is abstract

The `Screen` class has several internal implementations, and the base class was constructible only for legacy reasons.

In Avalonia v12, it is now abstract. Do not construct a `Screen` class. Instead, get an existing instance from its members (e.g., `Screens.All`, `Screens.Primary`, `Screens.ScreenFromWindow`, etc.).

PR: [#20529](https://github.com/AvaloniaUI/Avalonia/pull/20529)


## `ResourcesChangedEventArgs` is a struct

For performance purposes, `ResourcesChangedEventArgs` is now a struct.

Most projects never construct instances of this type, as it's mainly used through the `StyledElement.ResourcesChanged` event.
If you did construct `ResourcesChangedEventArgs`, call `ResourceChangedEventArgs.Create` instead.

PR: [#20576](https://github.com/AvaloniaUI/Avalonia/pull/20576)


## Removed members

### `Avalonia.Android.Platform.IInsetsManager.DisplayEdgeToEdge` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Android.Platform.IInsetsManager.DisplayEdgeToEdgePreference` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Animation.CustomAnimatorBase/CustomAnimatorBase<T>` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Animation.InterpolatingAnimator<T>` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Animation.Easings.CubicBezierEasing` class
Reason: this class was obsolete since Avalonia 11 and did nothing.  
Resolution: use `Avalonia.Animation.Easings.SplineEasing` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.AppBuilder.LifetimeOverride` property
Reason: this property was obsolete since Avalonia 11 and did nothing.  
Resolution: use any predefined lifetime instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.AvaloniaObjectExtensions.Bind` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `AvaloniaObject.Bind` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Controls.ApplicationLifetimes.IActivatableApplicationLifetime` interface
Reason: this interface was obsolete since Avalonia 11 and did nothing.  
Resolution: use `Application.Current.TryGetFeature<IActivatableLifetime>` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.AutoCompleteBox.BindingEvaluator` class
Reason: this class is an implementation detail that was wrongly exposed publicly.  
Resolution: use an alternative implementation (not provided by Avalonia).  
PR: [#20596](https://github.com/AvaloniaUI/Avalonia/pull/20596)

### `Avalonia.Controls.ContextMenu.PlacementMode` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Controls.ContextMenu.Placement` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.FileDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.FileSystemDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.Generators.ItemContainerGenerator.ContainerFromIndex` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Controls.ItemsControl.ContainerFromIndex` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.Generators.ItemContainerGenerator.IndexFromContainer` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Controls.ItemsControl.IndexFromContainer` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.Generators.TreeContainerIndex` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `TreeView` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.Generators.TreeItemContainerGenerator` class
Reason: this was equivalent to `ItemContainerGenerator`.  
Resolution: use `Avalonia.Controls.Generator.ItemContainerGenerator` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.ItemsControl.ItemsControlFromItemContaner` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Controls.ItemsControl.ItemsControlFromItemContainer` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.NativeMenuBar.EnableMenuItemClickForwarding` property
Reason: this property did not do anything.  
Resolution: remove the usages.  
PR: [#20577](https://github.com/AvaloniaUI/Avalonia/pull/20577)

### `Avalonia.Controls.NativeMenuItemToggleType` enum
Reason: this enum was merged with `MenuItemToggleType`.  
Resolution: use `Avalonia.Controls.MenuItemToggleType` instead.  
PR: [#20577](https://github.com/AvaloniaUI/Avalonia/pull/20577)

### `Avalonia.Controls.OpenFileDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider.OpenFilePickerAsync` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.OpenFolderDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider.OpenFolderPickerAsync` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.Primitives.IPopupHost` interface
Reason: this interface is an implementation detail that was exposed publicly for legacy reasons. It's now a private API.  
Resolution: use `Avalonia.Controls.Primitives.Popup` instead.  
PR: [#20597](https://github.com/AvaloniaUI/Avalonia/pull/20597)

### `Avalonia.Controls.Primitives.OverlayPopupHost.CreatePopupHost` method
Reason: this method is an implementation detail that was exposed publicly for legacy reasons. It's now a private API.  
Resolution: use `Avalonia.Controls.Primitives.Popup` instead.  
PR: [#20597](https://github.com/AvaloniaUI/Avalonia/pull/20597)

### `Avalonia.Controls.Primitives.ToggleButton.Checked/Unchecked/Indeterminate` events
Reason: these events were obsolete since Avalonia 11.  
Resolution: use `Avalonia.Controls.Primitives.ToggleButton.IsCheckedChanged` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.TabItem.SubscribeToOwnerProperties` method
Reason: this method was obsolete since Avalonia 11 and did nothing.
Resolution: remove the usages.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Platform.Popup.PlacementMode` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Popup.Placement` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.ResourcesChangedEventArgs.Empty` field
Reason: see the [ResourcesChangedEventArgs](#resourceschangedeventargs-is-a-struct) section.  
Resolution: use `Avalonia.Controls.ResourcesChangedEventArgs.Create` instead.  
PR: [#20576](https://github.com/AvaloniaUI/Avalonia/pull/20576)

### `Avalonia.Controls.SaveFileDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider.SaveFilePickerAsync` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Controls.SystemDialog` class
Reason: this class was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Data.BindingPriority.TemplatedParent` enum value
Reason: this enum value was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Data.BindingPriority.Template` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Data.CompiledBindingPathBuilder.SetRawSource` method
Reason: this method was obsolete since Avalonia 11 and did nothing.  
Resolution: use `Avalonia.Data.CompiledBinding.Source` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Data.Core.PropertyPath` class
Reason: this class was a leftover from previous Avalonia versions and was not used at all.  
Resolution: remove the usages.  
PR: [#19133](https://github.com/AvaloniaUI/Avalonia/pull/19133)

### `Avalonia.Data.IBinding` interface
Reason: see the [Binding changes](#binding-changes) section.  
Resolution: use `Avalonia.Data.BindingBase` instead.  
PR: [#19589](https://github.com/AvaloniaUI/Avalonia/pull/19589)

### `Avalonia.Data.InstancedBinding` class
Reason: see the [Binding changes](#binding-changes) section.    
Resolution: use `Avalonia.Data.BindingExpressionBase` instead.  
PR: [#19589](https://github.com/AvaloniaUI/Avalonia/pull/19589)

### `Avalonia.Dialogs.ManagedFileDialogExtensions.ShowManagedAsync` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Storage.IStorageProvider.OpenFilePickerAsync` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Input.DataFormats.*` members
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use the matching members in `Avalonia.Input.DataFormat` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.DataObject.*` members
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.DataTransfer` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.DataObjectExtensions` class
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.AsyncDataTransferExtensions` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.DragDrop.DoDragDrop` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.DragDrop.DoDragDropAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.DragEventsArgs.Data` property
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.DragEventArgs.DataTransfer` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.IDataObject` interface
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.IAsyncDataTransfer` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.Platform.IClipboard.GetDataAsync` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.Platform.IClipboard.TryGetDataAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.Platform.IClipboard.GetFormatsAsync` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.Platform.ClipboardExtensions.GetDataFormatsAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.Platform.IClipboard.GetTextAsync` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.Platform.ClipboardExtensions.TryGetTextAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.Platform.IClipboard.SetTextAsync` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.Platform.ClipboardExtensions.SetTextAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.Platform.IClipboard.TryGetInProcessDataObjectAsync` method
Reason: see the [Clipboard changes](#clipboard-changes) section.  
Resolution: use `Avalonia.Input.Platform.IClipboard.TryGetInProcessDataAsync` instead.  
PR: [#20521](https://github.com/AvaloniaUI/Avalonia/pull/20521)

### `Avalonia.Input.TextInput.TextInputMethodClient.ShowInputPanel` method
Reason: directly showing an input panel was not correct on all platforms.  
Resolution: use the `Avalonia.Input.TextInput.TextInputMethodClient.InputPaneActivationRequested` event instead.  
PR: [#20544](https://github.com/AvaloniaUI/Avalonia/pull/20544)

### `Avalonia.Media.Color.ToUint32` method
Reason: this method was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Media.Color.ToUInt32` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Media.DrawingContext.PushPreTransform/PushPostTransform/PushTransformContainer` methods
Reason: these methods were obsolete since Avalonia 11.  
Resolution: use `Avalonia.Media.DrawingContext.PushTransform` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Media.Immutable.ImmutableRadialGradientBrush.Radius` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Media.ImmutableRadialGradientBrush.RadiusX` and `RadiusY` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Media.IRadialGradientBrush.Radius` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Media.IRadialGradientBrush.RadiusX` and `RadiusY` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Media.RadialGradientBrush.Radius` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Media.RadialGradientBrush.RadiusX` and `RadiusY` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Platform.IApplicationPlatformEvents` interface
Reason: this interface was obsolete since Avalonia 11.  
Resolution: use `Application.Current.TryGetFeature<IActivatableLifetime>` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Platform.IGeometryContext2` interface
Reason: this interface was merged with `IGeometryContext`.  
Resolution: use `Avalonia.Platform.IGeometryContext` instead.  
PR: [#20528](https://github.com/AvaloniaUI/Avalonia/pull/20528)

### `Avalonia.Platform.Screen.PixelDensity` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Screen.Scaling` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Platform.Screen.Primary` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Platform.Screen.IsPrimary` instead.  
PR: [#20617](https://github.com/AvaloniaUI/Avalonia/pull/20617)

### `Avalonia.Rendering.ICompositionGpuImportedObject.ImportCompeted` property
Reason: this property was obsolete since Avalonia 11.  
Resolution: use `Avalonia.Rendering.ICompositionGpuImportedObject.ImportCompleted` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Styling.IStyleable` interface
Reason: this interface was obsolete since Avalonia 11.  
Resolution: use `Avalonia.StyledElement` instead.  
PR: [#20613](https://github.com/AvaloniaUI/Avalonia/pull/20613)

### `Avalonia.Utilities.CharacterReader` struct
Reason: this class is an implementation detail that was wrongly exposed publicly.  
Resolution: use an alternative implementation (not provided by Avalonia).  
PR: [#19123](https://github.com/AvaloniaUI/Avalonia/pull/19123)

### `Avalonia.Utilities.StringTokenizer` struct
Reason: this class is an implementation detail that was wrongly exposed publicly.  
Resolution: use an alternative implementation (not provided by Avalonia).  
PR: [#20544](https://github.com/AvaloniaUI/Avalonia/pull/20544)


## Renamed members

### `Avalonia.Controls.PseudolassesExtensions` class
Renamed to `PseudoClassesExtensions` due to a typo.  
This type is usually used implicitly from XAML files or as part of C# extension methods; most codebases should be unaffected.  
PR: [#18717](https://github.com/AvaloniaUI/Avalonia/pull/18717)

### `Avalonia.X11PlatformOptions.ExterinalGLibMainLoopExceptionLogger` property
Renamed to `ExternalGLibMainLoopExceptionLogger` due to a typo.  
PR: [#19128](https://github.com/AvaloniaUI/Avalonia/pull/19128)

### `Avalonia.Controls.TextBox.Watermark` property
Renamed to `PlaceholderText` for consistency with other controls.  
The old property is kept for now, but is obsolete; usages should be updated.  
PR: [#20303](https://github.com/AvaloniaUI/Avalonia/pull/20303)

### `Avalonia.Controls.TextBox.UseFloatingWatermark` property
Renamed to `UseFloatingPlaceholder` for consistency with other controls.  
The old property is kept for now, but is obsolete; usages should be updated.  
PR: [#20303](https://github.com/AvaloniaUI/Avalonia/pull/20303)

### `Avalonia.Media.RenderOptions.TextRenderingMode` property
Moved to `TextOptions.TextRenderingMode`.   
`TextOptions` is new and includes several other knobs that affect text rendering.   
PR: [#20107](https://github.com/AvaloniaUI/Avalonia/pull/20107)
