---
id: upgrade-from-0.10
title: 从 0.10 升级
---

Avalonia 11 版本引入了许多与 0.10 版本不兼容的变化。以下指南涵盖了最常见的更改，并提供了解决方法。

## 更新项目

1. 将 Avalonia 包更新为 11.x 版本。
2. Avalonia.Desktop 包不再包含主题，因此您需要添加以下任一包引用：
    - `Avalonia.Themes.Fluent`
    - `Avalonia.Themes.Simple`
3. 移除对`XamlNameReferenceGenerator`包的引用，Avalonia 现在默认包含内置的生成器。
4. 如有需要，将`<LangVersion>`更新至至少 9，以便使用仅限初始化属性 (init-only properties)。
5. 如果需要与 0.10 版本相同的字体，还需包括`Avalonia.Fonts.Inter`包，并在应用程序构建器中添加`.WithInterFont()`。在 11.0 版本中，默认情况下不包含任何自定义字体。

## 主题处理

在 0.10 版本中，主题直接在`Application.axaml`文件的`Application.Styles`标签内指定。以下是示例：

```xml
<Application.Styles>
    <FluentTheme Mode="Light"/>
</Application.Styles>
```

在这个示例中，`FluentTheme`标签的`Mode`属性用于指定主题模式，可以是 "Light" 或 "Dark"。

引入了一个新属性`RequestedThemeVariant`，用于`Application`标签，该属性用于设置应用程序的主题，如果指定了，则会覆盖系统当前的主题。如果要遵循系统当前的主题，可以将其设置为 "Default"。其他可用选项为 "Dark" 和 "Light"。

以下示例展示了如何使用该属性：

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="ILoveAvaloniaUI.App"
             xmlns:local="using:ILoveAvaloniaUI"
             RequestedThemeVariant="Default">
```

`FluentTheme`标签不再需要`Mode`属性，可以将其留空：

```xml
<Application.Styles>
    <FluentTheme />
</Application.Styles>
```

### 主题字典和主题变体

根据 PR [#8166](https://github.com/AvaloniaUI/Avalonia/pull/8166)，现在方法 `Styles.TryGetResource` 需要一个可为空的 `ThemeVariant` 参数。这允许用户指定 `Light`、`Dark` 和 `Default`。

使用 `ThemeVariant.Default` 作为键将特定的主题字典标记为一种回退（fallback），以防在其他主题字典中找不到主题变体或资源键。

除了内置的 `Light`、`Dark` 和 `Default` 值外，任何对象值都可以用作键（_因为它包装在 `ThemeVariant(object key)` 结构中_）。如果开发人员希想要在 XAML 代码中定义多个自定义主题作为静态属性并从中引用它们，则可以在此处使用 `{x:Static}` 标记扩展。

```cs
// 以前
bool TryGetResource(object key, out object? value)

// Avalonia v11
bool TryGetResource(object key, ThemeVariant? theme, out object? value)
```

## System.Reactive/Observables

Avalonia 不再依赖`System.Reactive`。如果您使用了响应式特性，请将`System.Reactive`包添加到您的项目中。

如果您不需要`System.Reactive`的全部功能，只是想对`IObservable<T>`进行简单的订阅，可以使用 Avalonia 提供的实用类`AnonymousObserver<T>`，例如：

```csharp
observable.Subscribe(new AnonymousObserver<string>(() => { /* 当可观察对象发生更改时执行的代码 */ }));
```

如果需要订阅属性或事件更改，可以使用 `AddClassHandler` 而不是 observables。

更多信息请参见[#9749](https://github.com/AvaloniaUI/Avalonia/pull/9749)和[#10105](https://github.com/AvaloniaUI/Avalonia/pull/10105)。

## 更新接口

在 Avalonia 11 中移除了许多接口。您可以通过全局查找/替换将每个接口替换为其具体类型：

- `IAvaloniaObject` -> `AvaloniaObject`
- `IBitmap` -> `Bitmap`
- `IContentPresenter` -> `ContentPresenter`
- `IControl` -> `Control`
- `IInteractive` -> `Interactive`
- `IItemsPresenter` -> `ItemsPresenter`
- `ILayoutable` -> `Layoutable`
- `IPanel` -> `Panel`
- `IStyledElement` -> `StyledElement`
- `ITemplatedControl` -> `TemplatedControl`
- `IVisual` -> `Visual`

如果您有自己的接口派生自上述接口之一，您需要移除接口继承，并在使用点上显式地将其转换为具体类。

更多信息请参见[#9553](https://github.com/AvaloniaUI/Avalonia/pull/9553)和[#11495](https://github.com/AvaloniaUI/Avalonia/pull/11495)。

### 推荐的可选择更改：

`IStyleable`接口现在已被弃用。在 Avalonia 0.10.x 中，要覆盖控件的样式键，您需要实现`IStyleable`并为`StyleKey`添加显式接口实现：

```csharp
class MyButton : Button, IStyleable
{
    Type IStyleable.StyleKey => typeof(Button);
}
```

在 Avalonia 11 中，`IStyleable`引用将显示弃用警告。改为使用以下代码：

```csharp
class MyButton : Button
{
    protected override Type StyleKeyOverride => typeof(Button);
}
```

更多信息请参见[#11380](https://github.com/AvaloniaUI/Avalonia/pull/11380)。

## 视图

以`.axaml`/`.axaml.cs`（或`.xaml`/`.xaml.cs`）形式的视图现在具有自动生成的 C# 代码。要实现此目的，请执行以下操作：

- 将 .cs 文件中的类设置为`partial`。
- 移除 `private void InitializeComponent()` 方法。
- 在构造函数中**不要**移除对 `InitializeComponent()` 的调用，因为该方法现在是生成的方法，仍然需要调用。
- 从构造函数中移除 `this.AttachDevTools()` 调用——`InitializeComponent` 现在有一个参数，该参数控制是否在调试模式下附加 DevTools，默认值为 `true`。

以前，要查找在 XAML 文件中声明的具有名称的控件，需要调用 `this.FindControl<T>(string name)` 或 `this.GetControl<T>(string name)`。现在不再需要——在 XAML 文件中带有 `Name` 或 `x:Name` 属性的控件将自动在类中生成一个字段，用于访问命名的控件（与 WPF/UWP 等类似）。

请注意，此源生成器仅适用于 C#。对于 F#，没有进行任何更改。

## ItemsControl

`ItemsControl` 和派生类（例如 `ListBox` 和 `ComboBox`）现在都有 `Items` 属性和 `ItemsSource` 属性，与 WPF/UWP 类似。

`Items` 是一个只读集合属性，预先填充数据，而 `ItemsSource` 是读写版本，其默认值为 null。

将所有绑定到 `Items` 的绑定更改为绑定到 `ItemsSource`：

```xml
<ListBox Items="{Binding Items}">
```

替换为：

```xml
<ListBox ItemsSource="{Binding Items}">
```

此外：

- `ListBox.VirtualizationMode` 已移除，虚拟化模式通过更改 `ItemsPanel` 实现：
  - 禁用虚拟化，请使用 `StackPanel`。
  - 启用虚拟化，请使用 `VirtualizingStackPanel`。
- `Carousel.IsVirtualizing` 已移除，现在只有 `Carousel` 的虚拟化模式。
- 项容器查找已移至 `ItemsControl`，类似 UWP（旧方法保留在 ItemContainerGenerator 上，并标记为 [Obsolete]）：
  - `ItemsControl.ContainerFromIndex(object item)`。
  - `ItemsControl.IndexFromContainer(Control container)`。
- `ItemsPresenter` 上的 `Items` 和 `ItemTemplate` 属性已移除。在控件模板中对这些属性的模板绑定可以直接移除。

更多信息请参见[#10590](https://github.com/AvaloniaUI/Avalonia/pull/10590)和[#10827](https://github.com/AvaloniaUI/Avalonia/pull/10827)。

## Classes

`StyledElement.Classes` 现在是一个只读属性。在对象初始化器中使用时，以前的代码如下：

```csharp
var c = new Control
{
    Classes = new Classes("foo", "bar"),
};
```

现在可以更改为：

```csharp
var c = new Control
{
    Classes = { "foo", "bar" },
};
```

在对象初始化器之外操作 `Classes` 集合时，请使用标准的 `IList<string>` 方法。

更多信息请参见[#11013](https://github.com/AvaloniaUI/Avalonia/pull/11013)。

## Windows

`TopLEvel.PlatformImpl` API 不再适用于 `Window` 等控件。相关方法已移至 `TopLevel`、`WindowBase` 或 `Window` 自身：

- `window.PlatformImpl.Handle` 变为 `window.TryGetPlatformHandle()`
- `window.PlatformImpl.BeginMove(e)` 变为 `window.BeginMove()`
- `window.PlatformImpl.Resized` 变为 `window.Resized`

## AssetLoader

`IAssetLoader` 接口不再可用。请使用静态类 `AssetLoader`：

```csharp
var assets = AvaloniaLocator.Current.GetService<IAssetLoader>();
var bitmap = new Bitmap(assets.Open(new Uri(uri)));
```

替换为：

```csharp
var bitmap = new Bitmap(AssetLoader.Open(new Uri(uri)));
```

## OnPropertyChanged

虚拟的 `AvaloniaObject.OnPropertyChanged` 方法现在是非泛型的。将：

```csharp
protected override void OnPropertyChanged<T>(AvaloniaPropertyChangedEventArgs<T> change)
```

替换为：

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
```

还有一种方法可以从 `AvaloniaPropertyChangedEventArgs` 中获取旧值和新值，而无需装箱：

- 将 `change.NewValue.GetValueOrDefault<T>()` 替换为 `change.GetNewValue<bool>()`
- 将 `change.OldValue.GetValueOrDefault<T>()` 替换为 `change.GetOldValue<bool>()`
- 您还可以使用 `change.GetOldAndNewValue<T>()` 来获取这两个值

更多信息请参见[#7980](https://github.com/AvaloniaUI/Avalonia/pull/7980)。

## 事件

以下事件已更名：

- `PointerEnter` -> `PointerEntered`
- `PointerLeave` -> `PointerExited`
- `ContextMenu`
  - `ContextMenuClosing` -> `Closing`
  - `ContextMenuOpening` -> `Opening`
- `MenuBase`
  - `MenuClosed` -> `Closed`
  - `MenuOpened` -> `Opened`

`RoutedEventArgs.Source` 的类型从 `IInteractive` 更改为 `object`: ：需要将其转换为具体类型（如 `Control`）才能使用它。

## 布局

以前，可以通过获取布局根并在布局管理器上调用方法来实现完整的布局过程：

```csharp
((ILayoutRoot)control).LayoutManager.ExecuteLayout();
```

`LayoutManager` 不再从 `ILayoutRoot` 暴露出来，而是与 WPF/UWP 一样，在任何控件上调用 `UpdateLayout` 方法：

```csharp
control.UpdateLayout();
```

在 0.10.x 版本中，使用 `ILayoutable` 来获取先前的测量约束和排列边界。由于 `ILayoutable` 不再可用，现在可以从 `LayoutInformation` 中获取它们：

- `Size? LayoutInformation.GetPreviousMeasureConstraint(Layoutable control)`
- `Rect? LayoutInformation.GetPreviousArrangeBounds(Layoutable control)`

## 焦点

焦点管理器不再通过 `FocusManager.Instance` 访问，而是移至 `TopLevel`：

```csharp
var focusManager = FocusManager.Instance;
```

替换为:

```csharp
var focusManager = TopLevel.GetTopLevel(control).FocusManager;
```

此外，`IFocusManager` API 已更改。

- 要获取当前聚焦的元素，请使用 `IFocusManager.GetFocusedElement()`
- 要聚焦一个控件，请使用 `control.Focus()`

目前没有监听 `IFocusManager` 的焦点更改的事件。要监听焦点更改，请添加一个监听器到 `InputElement.GotFocusEvent`：

```csharp
InputElement.GotFocusEvent.AddClassHandler<InputElement>((element, args) => { });
```

键盘设备也是如此，不再可访问。请使用与焦点相关的相同 API 进行替换。

更多信息请参见[#11407](https://github.com/AvaloniaUI/Avalonia/pull/11407)。

## 视觉树

在 0.10.x 版本中，使用 `IVisual` 暴露控件的视觉父级和视觉子级。由于 `IVisual` 不再可用，现在将其作为扩展方法暴露在 `Avalonia.VisualTree` 命名空间中：

```csharp
using Avalonia.VisualTree;

var visualParent = control.GetVisualParent();
var visualChildren = control.GetVisualChildren();
```

## 渲染

某些控件的 `Render` 方法现在已被标记为 sealed。这是因为计划让这些控件使用组合原语而不是通过 `DrawingContext` 进行渲染。

如果您的控件的 `Render` 方法被重载但现在被标记为 sealed，请考虑使用一个基类，例如不使用 `Border` 而是使用 `Decorator`。请注意，您现在需要自行绘制背景/边框。

更多信息请参见[#10299](https://github.com/AvaloniaUI/Avalonia/pull/10299)。

## 定位器

`AvaloniaLocator` 不再可用。现在大多数通过定位器可用的服务都有替代方法：

1. `AssetLoader` 现在是一个静态类，具有所有旧方法。
2. `IPlatformSettings` 已移到 `TopLevel.PlatformSettings` 和 `Application.PlatformSettings`。请注意，始终应优先使用特定顶级（窗口）的设置，而不是全局设置。
3. `IClipboard` 已移到 `TopLevel.Clipboard`。请注意，`Application.Clipboard` 也已被移除。
4. `PlatformHotkeyConfiguration` 已移到 `PlatformSettings.HotkeyConfiguration`。

一些应用程序将 `AvaloniaLocator` 用作通用服务定位器。这从未是 `AvaloniaLocator` 的预期用法，这些应用程序应该转向专为此目的设计的服务定位器或依赖注入容器，例如 [`Splat`](https://www.reactiveui.net/docs/handbook/dependency-inversion/) 或 `Microsoft.Extensions.DependencyInjection`。

## 杂项/高级场景

- `IRenderer`/`DeferredRenderer`/`ImmediateRenderer` 现在已移除。出于性能原因，不再允许提供自己的渲染器，现在所有内容都使用新的组合渲染器。
- `Renderer.Diagnostics` 现在是 `RendererDiagnostics`
- `ICustomDrawOperation.Render` 现在使用 `ImmediateDrawingContext` 而不是 `DrawingContext`
- 在直接返回 `Task` 的方法中，在对 `Dispatcher.UIThread.InvokeAsync` 进行调用时，请在调用结尾添加 `.GetTask()`。
- `IRenderRoot.RenderScaling`  已移至 `TopLevel.RenderScaling`
- `LightweightObservableBase` 和 `SingleSubscriberObservableBase` 现在已变为内部类。这些实用程序类设计用于 Avalonia 中的特定目的，并不打算由客户端使用，因为它们不能处理某些边缘情况。使用 `System.Reactive`  提供的机制来创建可观察对象，例如 `Observable.Create`
- 在绑定到方法时，方法必须没有参数或仅有一个对象参数。
- `OpenFileDialog` 和 `SaveFileDialog` 现在已移除。对于文件系统存储服务，请在 `TopLevel` 使用 `IStorageProvider`。
