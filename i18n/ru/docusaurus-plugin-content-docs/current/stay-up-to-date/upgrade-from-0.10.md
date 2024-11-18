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

Раньше, чтобы найти именнованый элемент объявленный в XAML файлы, нужен был вызов `this.FindControl<T>(string name)` 
или `this.GetControl<T>(string name)`. Сейчас это не обязательно - XAML элементы с выставленными
`Name` или `x:Name` атрибутами будут автоматически сгенерированны для доступа в C# классах (так же как это работало в WPF и UWP).

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

Раньше, чтобы вызвать полный перепросчет макета элементов, нужно было вытащить корневой элемент и на нем вызвать следующий код:

```csharp
((ILayoutRoot)control).LayoutManager.ExecuteLayout();
```

Сейчас же `LayoutManager` больше не доступен из `ILayoutRoot`. Вместо него испоьзуйте метод `UpdateLayout` на любом Control, как в WPF/UWP:

```csharp
control.UpdateLayout();
```

`ILayoutable` использовался в версии `0.10.x` для доступа к `Constraints` и `Arrange Bounds`.
Теперь они доступны через `LayoutInformation`:

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

На данный момент нет события для отслеживания смены фокуса в `IFocusManager`. 
Для отслеживания изменений, добавьте событие `InputElement.GotFocusEvent`:

```csharp
InputElement.GotFocusEvent.AddClassHandler<InputElement>((element, args) => { });
```

Вышесказанное относится и к `KeyboardDevice`, который больше недоступен.
The same applied to KeyboardDevice, which isn't accessible anymore. 
В качестве замены, ипользуйте API, связанное с фокусом.

Подробнее в [#11407](https://github.com/AvaloniaUI/Avalonia/pull/11407).

## Visual Tree

В версии `0.10.x`, `IVisual` использовался для получения элементов Control.
Поскольку `IVisual` больше недоступен, то теперь их можно использовать из `Avalonia.VisualTree`:

```csharp
using Avalonia.VisualTree;

var visualParent = control.GetVisualParent();
var visualChildren = control.GetVisualChildren();
```

## Rendering (рус: Отрисовка)

Метод `Render` теперь недоступен для некоторых `Controls`.
Это связано с планами использовать для их отрисовки примитивы, вместо отрисовки через `DrawingContext`.

Подробнее в [#10299](https://github.com/AvaloniaUI/Avalonia/pull/10299).

## Locator

`AvaloniaLocator` больше недоступен.
Большинство сервисов, использовавших его, теперь имеют альтернативные способы доступа:

1. Теперь `AssetLoader` стал статических, методы не изменились.
2. `IPlatformSettings` был разделен между `TopLevel.PlatformSettings` и `Application.PlatformSettings`. 
Обратите внимание, что желательно использовать настройки окна, а не глобальные.
3. `IClipboard` перемещен в `TopLevel.Clipboard`. Обратите внимание, что `Application.Clipboard` также был удален.
4. `PlatformHotkeyConfiguration` перемещен в `PlatformSettings.HotkeyConfiguration`.

Вы могли использовать `AvaloniaLocator` в качестве локатора общего назначения.
Такое использовани никогда не предполагалось, и теперь вы должны использовать `Service Locator` или DI-контейнер,
например [`Splat`](https://www.reactiveui.net/docs/handbook/dependency-inversion/) или `Microsoft.Extensions.DependencyInjection`.

## Прочие особенности

- `IRenderer`/`DeferredRenderer`/`ImmediateRenderer` были удалены. По соображениям  производительности, больше нельзя использовать собственную отрисовку.
- `Renderer.Diagnostics` стал `RendererDiagnostics`
- `ICustomDrawOperation.Render` теперь использует `ImmediateDrawingContext` вместо `DrawingContext`
- Если вы напрямую возвращаете значения метода с `Task`, то в конце вызова `Dispatcher.UIThread.InvokeAsync`, добавьте `.GetTask()`.
- `IRenderRoot.RenderScaling` перемещен в `TopLevel.RenderScaling`
- `LightweightObservableBase` и `SingleSubscriberObservableBase` стали `internal`. Это служебные классы, созданные для обработки кокнкретных ситуаций в Avalonia. 
Они не предназначены для клиентского использования. Используйте `System.Reactive` для создания `observables`, таких как `Observable.Create`.
- При привязке к методам, метод должен быть либо без параметров, либо только с одним параметром.
- `OpenFileDialog` и `SaveFileDialog` были удалены. Для работы с файловой системой, используйте `IStorageProvider`.
