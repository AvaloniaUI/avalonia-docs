---
id: upgrade-from-0.10
title: Обновление с версии 0.10
---

Avalonia 11 introduces a number of breaking changes from 0.10. The following guide converse the most commonly-encountered changes and gives solutions for them.

## Обновление проекта

1. Обновите пакеты Avalonia до версии 11.x
2. Themes больше не находятся в пакете `Avalonia.Desktop`, поэтому вам необходимо добавить один из следующих:
    - `Avalonia.Themes.Fluent`
    - `Avalonia.Themes.Simple`
3. Удалите ссылку на пакет `XamlNameReferenceGenerator` - теперь Avalonia по-умолчанию имеет встроенный генератор.
4. Если требуется, обновите `<LangVersion>` хотя бы до 9 версии, чтобы использовать `Init-only Properties`
5. Если вы хотите использовать те же шрифты, что и в версии `0.10`, то добавьте пакет `Avalonia.Fonts.Inter`, 
а также `.WithInterFont()` в `app builder`. С версии 11.0, по-умолчанию **не поддерживаются** сторонние шрифты.

## Theme Handling

Для версии `0.10`, тема указывается внутри тега `Application.Styles` в файле `Application.axaml`.
Пример:

```xml
<Application.Styles>
    <FluentTheme Mode="Light"/>
</Application.Styles>
```

В примере выше, для тега `FluentTheme` указывается атрибут `Mode`, через который задается режим темы. 
Он может быть как `Light`, так и `Dark`.

Для улучшения управления темами, в тег `Application` был добавлен атрибут `RequestedThemeVariant`.
Он используется для установки темы приложения, в обход системной.
Если требуется, чтобы приложение соответствовала системной теме, то необходимо установить значение `Default`.
Другие доступные варианты: `Light` и `Dark`.

Пример использования:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="ILoveAvaloniaUI.App"
             xmlns:local="using:ILoveAvaloniaUI"
             RequestedThemeVariant="Default">
```

Тег `FluentTheme` больше не требует обязательного указания атрибута `Mode`.

```xml
<Application.Styles>
    <FluentTheme />
</Application.Styles>
```

### Theme Dictionary and Theme Variant

Согласно PR [#8166](https://github.com/AvaloniaUI/Avalonia/pull/8166), теперь метод `Styles.TryGetResource` требует, чтобы параметр `ThemeVariant` был `nullable`.
Это позволяет указывать темы `Light`, `Dark` и `Default`.

Параметр `ThemeVariant.Default` позволяет указать тему по-умолчанию, если искомый вариант не найден.

Помимо встроенных значений `Light`, `Dark` и `Default`, любое другое значение объекта можно использовать в качестве ключа
(_поскольку оно заключено в структуру `ThemeVariant(object key)`_).
Расширение разметки `{x:Static}`, можно использовать для определения тем в качестве статических,
что позволит ссылаться на них в коде XAML.

```cs
// Before
bool TryGetResource(object key, out object? value)

// Avalonia v11
bool TryGetResource(object key, ThemeVariant? theme, out object? value)
```

## System.Reactive/Observables

Avalonia больше не зависит от `System.Reactive`. Если вы используете его, то необходимо добавить пакет `System.Reactive` в ваш проект.

Если вы не используете весь `System.Reactive`, но при этом хотите использовать простые подписки `IObservable<T>`,
то можно использовать служебный класс Avalonia `AnonymousObserver<T>`, например:

```csharp
observable.Subscribe(new AnonymousObserver<string>(() => { /* Code to execute when the observable changes. */ }));
```

Если вам требуется подписаться на изменения свойств или событий, то вместо `observables` можно использовать `AddClassHandler`.

Подробнее в [#9749](https://github.com/AvaloniaUI/Avalonia/pull/9749), [#10105](https://github.com/AvaloniaUI/Avalonia/pull/10105)

## Updating Interfaces

Множество интерфейсов были убраны в Avalonia 11.
У вас не должно быть проблем, чтобы используя глобальный поиск/замену, провести указанную ниже замену интерфейса на реализацию:
interfaces with its concrete type:

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

Если вы используете собственный интерфейсы на базе одного из вышеперечисленных,
то необходимо удалить базовый интерфейс и провести приведение к конкретному классу.

Подробнее в [#9553](https://github.com/AvaloniaUI/Avalonia/pull/9553), [#11495](https://github.com/AvaloniaUI/Avalonia/pull/11495).

### Опционально (рекомендуем):

Интерфейс `IStyleable` стал `Deprecated`, В версии `0.10.x`, для переопределения ключа стиля `Control`,
вам требовалось переопределять `IStyleable` и добавлять явную реализацию для `StyleKey`:

```csharp
class MyButton : Button, IStyleable
{
    Type IStyleable.StyleKey => typeof(Button);
}
```
С версии `11`, при использовании `IStyleable`, вы получите предупреждение `Deprecated`.
Теперь следует делать так:

```csharp
class MyButton : Button
{
    protected override Type StyleKeyOverride => typeof(Button);
}
```

Подробнее в [#11380](https://github.com/AvaloniaUI/Avalonia/pull/11380).

## Views

Теперь ваши `View`, которые представлены парами `.axaml`/`.axaml.cs` (или `.xaml`/`.xaml.cs`),
имеют автоматически-сгенерированный код на C#.

Для этого?

- В файле `.cs`, пометьте класс как `partial`
- Удалите метод `private void InitializeComponent()`
- **НЕ** удаляйте вызов `InitializeComponent()` из конструктора: данный метод теперь генерируется автоматически, но все также необходим.
- Удалите вызов `this.AttachDevTools()` из конструктора.
Теперь `InitializeComponent` имеет параметр, который управляет подключением `DevTools` в режиме отладки, по-умолчанию он включен.

Previously, to find a named control declared in the XAML file, a call to `this.FindControl<T>(string name)` 
or `this.GetControl<T>(string name)` was needed. This is now unnecessary - controls in the XAML file with a 
`Name` or `x:Name` attribute will automatically cause a field to be generated in
the class to access the named control (as in WPF/UWP etc).

Обратите внимание, что автомамтически, код генерируется только для C#. Для F# изменений не было.

## ItemsControl

`ItemsControl`, а также его производные классы, такие как `ListBox` и `ComboBox`,
теперь имеют свойства `Items` и `ItemsSource`, по-аналогии с WPF/UWP.

`Items` - это коллекция, доступная только для чтения, предварительно заполняется.
`ItemsSource` - это коллекция, которая' используется для чтения и записи, по-умолчанию равна `null`.

Замените все привязки к `Items` на `ItemsSource`:

```xml
<ListBox Items="{Binding Items}">
```

Стало:

```xml
<ListBox ItemsSource="{Binding Items}">
```

Дополнительно:

- Был удален `ListBox.VirtualizationMode`, теперь виртуализация указывается через `ItemsPanel`:
  - Для отключения виртуализации, используйте `StackPanel`.
  - Для включения виртуализации, используйте `VirtualizingStackPanel`.

- Был удален `Carousel.IsVirtualizing`, теперь для `Carousel` **всегда** используется виртуализация.
- Item container lookup перенесен в `ItemsControl`, как в UWP (старые методы остались в ItemContainerGenerator, но помечены как [Obsolete]):
  - `ItemsControl.ContainerFromIndex(object item)`
  - `ItemsControl.IndexFromContainer(Control container)`
- В `ItemsPresenter` были удалены свойства `Items` и `ItemTemplate`. 
Привязку шаблона к ним, можно просто удалить.

Подрбнее в [#10590](https://github.com/AvaloniaUI/Avalonia/pull/10590), [#10827](https://github.com/AvaloniaUI/Avalonia/pull/10827).

## Classes

`StyledElement.Classes` теперь доступен только для чтения.
Нижеуказанный код инициализации:
```csharp
var c = new Control
{
    Classes = new Classes("foo", "bar"),
};
```

Замените на:

```csharp
var c = new Control
{
    Classes = { "foo", "bar" },
};
```

Для работы с `Classes` вне инициализации объекта, следует использовать стандартные функции `IList<string>`.

Подробнее в [#11013](https://github.com/AvaloniaUI/Avalonia/pull/11013).

## Windows

API `TopLEvel.PlatformImpl` больше недоступно для Controls, таких как `Window`.
Соответствующие методы были перемещены в `TopLevel`, `WindowBase` или `Window`:

- `window.PlatformImpl.Handle` -> `window.TryGetPlatformHandle()`
- `window.PlatformImpl.BeginMove(e)` -> `window.BeginMove()`
- `window.PlatformImpl.Resized` -> `window.Resized`

## AssetLoader

Интерфейс `IAssetLoader` больше не доступен. Используйте статический класс `AssetLoader`:

```csharp
var assets = AvaloniaLocator.Current.GetService<IAssetLoader>();
var bitmap = new Bitmap(assets.Open(new Uri(uri)));
```

Стало:

```csharp
var bitmap = new Bitmap(AssetLoader.Open(new Uri(uri)));
```

## OnPropertyChanged

Виртуальный метод `AvaloniaObject.OnPropertyChanged`, больше не использует дженерики. Замените

```csharp
protected override void OnPropertyChanged<T>(AvaloniaPropertyChangedEventArgs<T> change)
```

на

```csharp
protected override void OnPropertyChanged(AvaloniaPropertyChangedEventArgs change)
```

Также изменился способ старых и новых значений из `AvaloniaPropertyChangedEventArgs` без `boxing`:

- Замените `change.NewValue.GetValueOrDefault<T>()` на `change.GetNewValue<bool>()`
- Замените `change.OldValue.GetValueOrDefault<T>()` на `change.GetOldValue<bool>()`
- Можно использовать `change.GetOldAndNewValue<T>()` для получения обеих значений.

See [#7980](https://github.com/AvaloniaUI/Avalonia/pull/7980) for more information.

## Events

Нижеуказанный события были переименованы:

- `PointerEnter` -> `PointerEntered`
- `PointerLeave` -> `PointerExited`
- `ContextMenu`
  - `ContextMenuClosing` -> `Closing`
  - `ContextMenuOpening` -> `Opening`
- `MenuBase`
  - `MenuClosed` -> `Closed`
  - `MenuOpened` -> `Opened`

`RoutedEventArgs.Source` поменяли тип с `IInteractive` на `object`: сделайте приведение к конкретному типу, скажем `Control`, и используйте.

## Layout

Previously a full layout pass was achieved by getting the layout root and calling a method on the layout manager:

```csharp
((ILayoutRoot)control).LayoutManager.ExecuteLayout();
```

`LayoutManager` не доступен из `ILayoutRoot`, испоьзуйте метод `UpdateLayout` на любом control, как в WPF/UWP:

```csharp
control.UpdateLayout();
```

`ILayoutable` was used in 0.10.x to get the previous measure constraints and arrange bounds. Because `ILayoutable` is no longer available, these are now exposed from `LayoutInformation`:

- `Size? LayoutInformation.GetPreviousMeasureConstraint(Layoutable control)`
- `Rect? LayoutInformation.GetPreviousArrangeBounds(Layoutable control)`

## Focus

Focus Manager был перемещен из `FocusManager.Instance` в `TopLevel`:

Было:

```csharp
var focusManager = FocusManager.Instance;
```

Стало:

```csharp
var focusManager = TopLevel.GetTopLevel(control).FocusManager;
```

Также было изменено API `IFocusManager`.

- Для получения элемента, находящегося в фокусе, используйте `IFocusManager.GetFocusedElement()`
- Для установки фокуса на `control`, используйту `control.Focus()`

There is currently no event for listening to focus changes on `IFocusManager`. To listen for focus changes, add a listener to the `InputElement.GotFocusEvent`:

```csharp
InputElement.GotFocusEvent.AddClassHandler<InputElement>((element, args) => { });
```

The same applied to KeyboardDevice, which isn't accessible anymore. Use the same focus related APIs as a replacement.

See [#11407](https://github.com/AvaloniaUI/Avalonia/pull/11407) for more information.

## Visual Tree

`IVisual` was used in 0.10.x to expose the visual parent and visual children of a control. Because `IVisual` is no longer available, these are now exposed as extension methods in the `Avalonia.VisualTree` namespace:

```csharp
using Avalonia.VisualTree;

var visualParent = control.GetVisualParent();
var visualChildren = control.GetVisualChildren();
```

## Rendering

The `Render` method on certain controls is now sealed. This is because it is planned to make these controls use composition primitives instead of rendering via `DrawingContext`.

If you have a control whose `Render` method was being overloaded but it's now sealed, consider using a base class, for example instead of `Border` use `Decorator`. Note that you will now be responsible for drawing the background/border.

See [#10299](https://github.com/AvaloniaUI/Avalonia/pull/10299) for more information.

## Locator

The `AvaloniaLocator` is no longer available. Most services that were available via the locator now have alternative methods of access:

1. `AssetLoader` is a static class now with all of the old methods.
2. `IPlatformSettings` was moved to `TopLevel.PlatformSettings` and `Application.PlatformSettings`. Note, it's always preferred to use settings of the specific top level (window) rather than global ones.
3. `IClipboard` was moved to the `TopLevel.Clipboard`. Note, that `Application.Clipboard` was removed as well.
4. `PlatformHotkeyConfiguration` was moved to the `PlatformSettings.HotkeyConfiguration`.

Some applications were using the `AvaloniaLocator` as a general-purpose service locator. This was never an intended usage of `AvaloniaLocator` and those application should move to a service locator or DI container designed for the purpose, e.g. [`Splat`](https://www.reactiveui.net/docs/handbook/dependency-inversion/) or `Microsoft.Extensions.DependencyInjection`.

## Miscellaneous/Advanced Scenarios

- `IRenderer`/`DeferredRenderer`/`ImmediateRenderer` have now been removed. For performance reasons it is no longer possible to supply your own renderer, everything uses the new composition renderer.
- `Renderer.Diagnostics` is now `RendererDiagnostics`
- `ICustomDrawOperation.Render` now takes an `ImmediateDrawingContext` instead of a `DrawingContext`
- Add `.GetTask()` to the end of calls to `Dispatcher.UIThread.InvokeAsync` if directly returning the value in a method which returns a `Task`
- `IRenderRoot.RenderScaling` has been moved to `TopLevel.RenderScaling`
- `LightweightObservableBase` and `SingleSubscriberObservableBase` have been made internal. These were utility classes designed for a specific purpose in Avalonia and were not intended to be used by clients as they do not handle certain edge cases. Use the mechanisms provided by `System.Reactive` to create observables, such as `Observable.Create`
- When binding to methods, the method must either have no parameters or a single object parameter.
- `OpenFileDialog` and `SaveFileDialog` have been removed. For file system storage service use `IStorageProvider` on the Top Level.
