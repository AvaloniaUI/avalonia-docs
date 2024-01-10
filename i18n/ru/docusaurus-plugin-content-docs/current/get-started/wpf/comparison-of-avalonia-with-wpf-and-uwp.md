---
description: REFERENCE - WPF Conversion
---

# Сравнение WPF и UWP

Данная страница основана на [UWP и WPF.md](https://github.com/robloo/PublicDocs/blob/master/UWPvsWPF.md), с добавлением Avalonia.

Документ под лицензией [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Полный текст лицензии см. [здесь](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

В данном разделе перечислены основные различия (в первую очередь для XAML) между Avalonia, UWP и WPF.

Обозначения:

* ✔ Платформа **поддерживает** фунционал.
* ✖ Платформа **не поддерживает** фунционал.
* ⚡ Платформа **частично** поддерживает** функционал.

## Markup Extensions (рус: Расширение Разметки)

| Элемент                | Avalonia | WPF | UWP | Заметки                                                                                                                                                                                                                                     |
|------------------------| :------: | :-: | :-: |---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| x:Uid for localization |     ✖    |  ✖  |  ✔  | x:uid является мощным инструментом локализации, аналогичный в Windows Forms. WPF катастрафически не хватает поддержки локализации такого типа.                                                                                         |
| x:Bind                 |     ✖    |  ✖  |  ✔  | x:Bind является мощной фишкой UWP. Скомпилированные привязки можно использовать для многих вещей, а также для замены отсутствующих возможностей, такаих как MultiBinding. Другие плюсы - поддержка отладки и повышенная производительность. |
| x:Array                |     ✖    |  ✔  |  ✖  | x:Array не поддерживается UWP.                                                                                                                                                                                                              |
| x:Static               |     ✔    |  ✔  |  ⚡  | x:Static можно заменить на x:Bind                                                                                                                                                                                                           |
| x:Type                 |     ✔    |  ✔  |  ✖  |                                                                                                                                                                                                                                             |
| x:True                 |     ✔    |  ✖  |  ✖  |                                                                                                                                                                                                                                             |
| x:False                |     ✔    |  ✖  |  ✖  |                                                                                                                                                                                                                                             |
| Full Markup Extension  |     ✔    |  ✔  |  ✖  | UWP поддерживает только часть markup extension из WPF. Данный пункт нуждается в дополнии, в будущем.                                                                                                                                        |
| Compiled Bindings      |     ✔    |  ✖  |  ✖  |                                                                                                                                                                                                                                             |

## Binding (рус: Привязки)

| Элемент                             | Avalonia | WPF | UWP | Заметки                                                                                                                                                                                                                                 |
|-------------------------------------| :------: | :-: | :-: |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OneWayToSource BindingMode          |     ✔    |  ✔  |  ✖  |                                                                                                                                                                                                                                         |
| Binding to ConverterParameter       |     ✔    |  ✔  |  ✖  |                                                                                                                                                                                                                                         |
| MultiBinding / IMultiValueConverter |     ✔    |  ✔  |  ✖  | Очень полезная функция в WPF для сложных вариантов привязки, в UWP отсутствует. Однако в нем есть x:Bind, который используется для re-implement converter logic.                                                                        |
| ICommand                            |     ✔    |  ✔  |  ⚡  | Технически, интерфейс ICommand существует, но совсем отличается от того, что в WPF. Теперь программист отвечает за каждую часть выполнения команды. Начиная с Windows 10 версии 1809, были добавлены XamlUICommand и StandardUICommand. |
| RelativeSource / AncestorType       |     ✔    |  ✔  |  ⚡  | В UWP `RelativeSource` поддерживает только `{RelativeSource Self}` и `{RelativeSource TemplatedParent}`.                                                                                                                                |
| StringFormat                        |     ✔    |  ✔  |  ✖  | XAML вида `{Binding DateValue, StringFormat=Date: {0:dddd yyyy-MM-dd}}` не поддерживается в UWP и требует создания пользовательских преобразователей.                                                                                   |
| Functions in binding                |     ✖    |  ✖  |  ✔  | в UWP, x:Bind поддерживает `OneWay` и `TwoWay`, которые могут заменить преобразователи.                                                                                                                                                 |

## Styling (рус: Стилизация)

| Элемент                                                             | Avalonia | WPF | UWP | Заметки                                                                                                                                                                                                                                                                                                                                                            |
|---------------------------------------------------------------------| :------: | :-: | :-: |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataTriggers / PropertyTrigger / EventTrigger within Style.Triggers |     ✖    |  ✔  |  ✖  |                                                                                                                                                                                                                                                                                                                                                                    |
| VisualStateManager                                                  |     ✖    |  ⚡  |  ✔  | Концепция, заменившая в UWP DataTriggers из WPF. Довольно избыточный инструмент и чаще всего лишь увеличивает сложность разработки. @Felix-Dev VisualStateManager был добавлен для WPF в .NET Framework 4.0. Но в отличии от UWP, в нем отсутствует свойство VisuaStateManager.Setters. Это значит, что вы должны использовать Storyboards для изменения значений. |
| Implicit DataTemplate                                               |     ✔    |  ✔  |  ✖  | Установите свойство DataType из DataTemplate соответствующего типа, чтобы шаблон автоматически применился ко всем его экземплярам.                                                                                                                                                                                                                                 |
| Binding in Style setter                                             |     ✔    |  ✔  |  ✖  | Для UWP не поддерживается шаблон и стиль для всего, кроме TemplateBinding.                                                                                                                                                                                                                                                                                         |
| BasedOn default Style                                               |     ✔    |  ✔  |  ⚡  | `BasedOn={StaticResource {x:Type TextBlock}` не поддерживается в UWP, но работает в WPF. Но BasedOn требует использование ключа, что является проблемой, поскольку не все стили по-умолчанию определяют его. Это конкретный пример отсутствия разметки `x:Type` в UWP.          |

## Остальное

| Элемент                                                       | Avalonia | WPF | UWP | Заметки                                                                                                                                                                                                                                                                                                                 |
|---------------------------------------------------------------| :------: | :-: | :-: |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Coercion                                                      |     ✔    |  ✔  |  ✖  | Не поддерживает в UWP.                                                                                                                                                                                                                                                                                                  |
| Data (Input) Validation                                       |     ✔    |  ✔  |  ✖  | UWP не имеет системы проверки данных. Возможно она будет добавлена в WinUI 3.0.                                                                                                                                                                                                                                         |
| x:TypeArguments directive                                     |     ✔    |  ✔  |  ✖  | `TypeArguments` не реализована в UWP, что вызывает проблемы при работе с дженериками. Для решения этой проблемы, необходимо создавать не-дженерик классы для использования в XAML.                                                                                                                                      |
| UIElement.IsVisible / IsVisibleChanged                        |     ✔    |  ✔  |  ✖  | UWP не умеет отслеживать, какие Controls отображаются на экране, это затрудняют оптимизацию Controls для повышения производительности. WPF имеет свойство UIElement.IsVisible и событие IsVisibleChanged.                                                                                                               |
| UIElement.Visibility / Visibility.Hidden                      |     ⚡    |  ✔  |  ⚡  | UWP не имеет перечисления Visibility.Hidden для UIElement.Visibility. В WPF, свойство `Hidden` позволяет взаимодействовать с Coontrol, но не отрисовывает его на экране.                                                                                                                                                |
| UIElement.Clip                                                |     ✔    |  ✔  |  ⚡  | И WPF, и UWP имеют свойства UIElement.Clip. Однако, WPF поддерживает любую обрезку,а не только прямоугольную. Для обрезки, UWP может использовать только `RectangleGeometry` WPF: public `Geometry UIElement.Clip`, UWP: public `RectangleGeometry UIElement.Clip`                                                      |
| UIElement.ClipToBounds                                        |     ✔    |  ✔  |  ✖  | В WPF можно привязать содержимое в родительским границам, установив свойство `ClipToBounds` в `True`. UWP не имеет такие свойства. Как вариант, можно использовать `UIElement.Clip`, но он умеет делать **только** прямоугольную обрезку.                                                                               |
| LayoutTransform                                               |     ✔    |  ✔  |  ✖  | Layout transform необходимо для преобразования элементов перед компоновко. Он позволяет легко поменять ориентацию TextBox, а затем поместить его в таблицу. Поскольку RenderTransform применяется после компоновки, то он не меняет размеры родительских Controls для преобразования дочерних.                          |
| VisualBrush / DrawingBrush                                    |     ✔    |  ✔  |  ✖  | VisualBrush - это **не** XAML кисть в UWP. Вместо нее, надо использовать composition brushes, которые не эквиваленты. DrawingBrush не поддерживается в UWP.                                                                                                                                                             |
| Supplemental Shapes: Arrow, Callout, Star, etc                |     ✔    |  ✔  |  ✖  | Некоторые фигуры из WPF, отсутствуют в UWP.                                                                                                                                                                                                                                                                             |
| Adorner                                                       |     ✔    |  ✔  |  ✖  | [Общие сведения о декоративных элементах](https://learn.microsoft.com/ru-ru/dotnet/desktop/wpf/controls/adorners-overview?view=netframeworkdesktop-4.8)                                                                                                                                                                 |
| Thickness                                                     |     ✔    |  ✔  |  ⚡  | Структура `Thickness` предоставляет поля `Top`, `Bottom`, `Left` и `Right`, вместо зависимых свойств в WPF. Это значит, что вы не можете привязать их к ресурсам.                                                                                                                                                       |
| Size / Rect / Point                                           |     ✔    |  ✔  |  ✔  | Size, Rect и Point полностью поддерживаются в WPF и UWP. Однако UWP использует типы с плавающей точкой одинарной точности, вместо double у WPF. Это создает некоторые проблемы при переносе кода.                                                                                                                       |
| ItemsControl.AlternationIndex / ItemsControl.AlternationCount |     ✖    |  ✔  |  ✖  | В WPF можно изменить стили элементов в списке с помощью ItemsControl.AlternationIndex и ItemsControl.AlternationCount. К примеру, можно изменить цвет фона для четных и нечетных записей. UWP не имеет такой поддержки. В UWP можно создать новый Control, с переопределением метода PrepareContainerForItemOverride(). |
| Custom Cursor at runtime                                      |     ✔    |  ✔  |  ✖  |                                                                                                                                                                                                                                                                                                                         |
| Sub-pixel anti-aliasing                                       |     ✔    |  ✔  |  ✖  | В отличии от WPF, UWP имеет слабую поддержку сглаживания и рендеринга в целом.                                                                                                                                                                                                                                          |
| Nested Types in XAML                                          |     ✔    |  ✔  |  ✖  | Как правило, UWP не поддерживает вложение различных типов в XAML. К примеру, `<ListBox.ItemsSource><x:Array><s:string>foo<s/:string><x/:Array></ListBox.ItemsSource>` работает в WPF, но не в UWP.                                                                                                                      |
| Event Tunneling / Event Bubbling / Routed Events              |     ✔    |  ✔  |  ⚡  | Большинство событий встроены непостредственно в UWP. Некоторые событие, такие как s ButtonBase.Click у родителя, не поддерживаются в UWP. Tunneling события не поддерживаются в UWP.                                                                                                                                    |
| Window                                                        |     ✔    |  ✔  |  ✖  | По некоторым причинам, UWP не имеет концепции окна. Это замечательно для мобильных устройств, но является проблемой для настольных приложений. Без окна невозможно контролировать ни размер, ни положение приложения. На данный момент есть предложение добавить эту концепцию в WinUI 3.0                              |

## Controls

Данный раздер содержит различия между ванильной WPF и UWP (с библиотекой WinUI 2.x), из него испобчены некоторые примитивы и фигуры (Ellipse, Rect и т.д.)

|        Avalonia        |            WPF           |           UWP          | Заметки                                                                                                |
| :--------------------: | :----------------------: | :--------------------: |--------------------------------------------------------------------------------------------------------|
|            ✖           |             ✖            |      AppBarButton      |                                                                                                        |
|            ✖           |             ✖            |     AppBarSeparator    |                                                                                                        |
|            ✖           |             ✖            |   AppBarToggleButton   |                                                                                                        |
|     AutoCompleteBox    |             ✖            |     AutoSuggestBox     | AutoCompleteBox не поддерживает очередь событий.                                                       |
|         Border         |          Border          |         Border         |                                                                                                        |
|     BulletDecorator    |             ✖            |                        |                                                                                                        |
|         Button         |          Button          |         Button         |                                                                                                        |
|   CalendarDatePicker   |        DatePicker        |   CalendarDatePicker   | DatePicker отличается в UWP и WPF. По функциональности, WPF DatePicker ближе к UWP CalendarDatePicker. |
|        Calendar        |         Calendar         |      CalendarView      |                                                                                                        |
|         Canvas         |          Canvas          |         Canvas         |                                                                                                        |
|            ✖           |             ✖            |     CaptureElement     |                                                                                                        |
|        CheckBox        |         CheckBox         |        CheckBox        |                                                                                                        |
|            ✖           |             ✖            |       ColorPicker      |                                                                                                        |
|        ComboBox        |         ComboBox         |        ComboBox        |                                                                                                        |
|            ✖           |          ToolBar         |       CommandBar       |                                                                                                        |
|            ✖           |             ✖            |    CommandBarFlyout    | Впервые добавлен в Windows UI Library                                                                  |
|     ContentControl     |             ✖            |     ContentControl     |                                                                                                        |
|    ContentPresenter    |             ✖            |    ContentPresenter    |                                                                                                        |
|        DataGrid        |         DataGrid         |            ✖           | Доступен для UWP в Windows Community Toolkit  (albeit with many bugs)                                  |
|       DatePicker       |             ✖            |       DatePicker       | В WPF не существует DatePicker без отображения Calendar                                                |
|    DatePickerFlyout    |             ✖            |    DatePickerFlyout    |                                                                                                        |
|        DockPanel       |         DockPanel        |            ✖           | Доступен для UWP в Windows Community Toolkit                                                           |
|            ✖           |      DocumentViewer      |            ✖           |                                                                                                        |
|            ✖           |             ✖            |     DropDownButton     | Впервые добавлен в Windows UI Library                                                                  |
|        Expander        |         Expander         |            ✖           | Доступен для UWP в Windows Community Toolkit                                                           |
|        Carousel        |             ✖            |        FlipView        |                                                                                                        |
|            ✖           |  FlowDocumentPageViewer  |            ✖           |                                                                                                        |
|            ✖           |    FlowDocumentReader    |            ✖           |                                                                                                        |
|            ✖           | FlowDocumentScrollViewer |            ✖           |                                                                                                        |
|            ✖           |             ✖            |         Flyout         |                                                                                                        |
|            ✖           |           Frame          |          Frame         |                                                                                                        |
|          Grid          |           Grid           |          Grid          |                                                                                                        |
|      GridSplitter      |       GridSplitter       |            ✖           | Доступен для UWP в Windows Community Toolkit                                                           |
|            ✖           |             ✖            |        GridView        |                                                                                                        |
|            ✖           |         GroupBox         |            ✖           |                                                                                                        |
|            ✖           |             ✖            |           Hub          |                                                                                                        |
|            ✖           |             ✖            |       HubSection       |                                                                                                        |
|            ✖           |             ✖            |     HyperlinkButton    |                                                                                                        |
|          Image         |           Image          |          Image         |                                                                                                        |
|            ✖           |         InkCanvas        |                        |                                                                                                        |
|            ✖           |        InkToolbar        |                        |                                                                                                        |
|      ItemsControl      |             ✖            |      ItemsControl      |                                                                                                        |
|     ItemsPresenter     |             ✖            |     ItemsPresenter     |                                                                                                        |
|      ItemsRepeater     |             ✖            |      ItemsRepeater     | Впервые добавлен в Windows UI Library                                                                  |
|          Label         |           Label          |            ✖           | Для обеспечения совместимости с Windows Forms                                                          |
|         ListBox        |          ListBox         |         ListBox        |                                                                                                        |
|            ✖           |         ListView         |        ListView        |                                                                                                        |
|            ✖           |             ✖            |       MapControl       |                                                                                                        |
|            ✖           |             ✖            |      MediaElement      |                                                                                                        |
|            ✖           |             ✖            | MediaTransportControls |                                                                                                        |
|          Menu          |           Menu           |         MenuBar        | Впервые добавлен в Windows Community Toolkit, а после в Windows UI Library                             |
|       ContextMenu      |        ContextMenu       |       MenuFlyout       |                                                                                                        |
|            ✖           |             ✖            |     NavigationView     |                                                                                                        |
|          Panel         |           Panel          |            ✖           |                                                                                                        |
|            ✖           |             ✖            |      ParallaxView      |                                                                                                        |
| TextBox (PasswordChar) |        PasswordBox       |       PasswordBox      |                                                                                                        |
|            ✖           |             ✖            |      PersonPicture     |                                                                                                        |
|       TabControl       |        TabControl        |          Pivot         |                                                                                                        |
|         TabItem        |          TabItem         |        PivotItem       |                                                                                                        |
|          Popup         |           Popup          |          Popup         |                                                                                                        |
|            ✖           |        PrintDialog       |            ✖           |                                                                                                        |
|       ProgressBar      |        ProgressBar       |       ProgressBar      |                                                                                                        |
|            ✖           |             ✖            |      ProgressRing      |                                                                                                        |
|            ✖           |             ✖            |      PullToRefresh     |                                                                                                        |
|       RadioButton      |        RadioButton       |       RadioButton      |                                                                                                        |
|            ✖           |             ✖            |      RatingControl     |                                                                                                        |
|        Rectangle       |         Rectangle        |        Rectangle       |                                                                                                        |
|            ✖           |             ✖            |    RefreshContainer    | Впервые добавлен в Windows UI Library                                                                  |
|      RelativePanel     |             ✖            |      RelativePanel     |                                                                                                        |
|      RepeatButton      |       RepeatButton       |      RepeatButton      |                                                                                                        |
|            ✖           |        RichTextBox       |       RichEditBox      |                                                                                                        |
|            ✖           |             ✖            |      RichTextBlock     |                                                                                                        |
|            ✖           |             ✖            |  RichTextBlockOverflow |                                                                                                        |
|        ScrollBar       |         ScrollBar        |        ScrollBar       |                                                                                                        |
| ScrollContentPresenter |             ✖            | ScrollContentPresenter |                                                                                                        |
|      ScrollViewer      |       ScrollViewer       |      ScrollViewer      |                                                                                                        |
|            ✖           |             ✖            |      SemanticZoom      |                                                                                                        |
|        Separator       |         Separator        |            ✖           |                                                                                                        |
|         Slider         |          Slider          |         Slider         |                                                                                                        |
|            ✖           |             ✖            |       SplitButton      | Впервые добавлен в Windows UI Library                                                                  |
|        SplitView       |         SplitView        |                        |                                                                                                        |
|       StackPanel       |        StackPanel        |       StackPanel       |                                                                                                        |
|            ✖           |         StatusBar        |            ✖           | No longer a UI convention                                                                              |
|            ✖           |             ✖            |      SwipeControl      | Впервые добавлен в Windows UI Library                                                                  |
|            ✖           |             ✖            |         TabView        | Впервые добавлен в Windows UI Library                                                                  |
|            ✖           |             ✖            |       TeachingTip      | Впервые добавлен в Windows UI Library                                                                  |
|        TextBlock       |         TextBlock        |        TextBlock       |                                                                                                        |
|         TextBox        |          TextBox         |         TextBox        |                                                                                                        |
|       TimePicker       |             ✖            |       TimePicker       |                                                                                                        |
|    TimePickerFlyout    |             ✖            |    TimePickerFlyout    |                                                                                                        |
|      ToggleButton      |       ToggleButton       |      ToggleButton      |                                                                                                        |
|            ✖           |             ✖            |    ToggleSplitButton   | Впервые добавлен в Windows UI Library                                                                  |
|      ToggleSwitch      |             ✖            |      ToggleSwitch      |                                                                                                        |
|         ToolTip        |          ToolTip         |         ToolTip        |                                                                                                        |
|        TreeView        |         TreeView         |        TreeView        |                                                                                                        |
|            ✖           |             ✖            |       TwoPaneView      | Впервые добавлен в Windows UI Library                                                                  |
|            ✖           |             ✖            |  VariableSizedWrapGrid |                                                                                                        |
|         Viewbox        |          Viewbox         |         Viewbox        |                                                                                                        |
|            ✖           |             ✖            |         WebView        |                                                                                                        |
|        WrapPanel       |         WrapPanel        |            ✖           | Доступен для UWP в Windows Community Toolkit                                                           |
|         Window         |          Window          |            ✖           | В UWP нет концепции окна верхнего уровняю                                                              |

## Печальные особенности

* Некоторые UWP Controls, имеют проблему с переобределением событий. К примеру, изменение выбранного в ComboBox элемента через событие SelectionChanged, невозможно и приведет к сбою. Из-за этого невозможно проводить проверку значений непосредственно в обработчике.
* UWP Controls, как правило, не такие гибкие, как их аналоги в WPF. К примеру, многие годы, ComboBox из UWP, был недоступен для редактирования. DatePicker из UWP, также не позволяет вводить конкретную дату.
* UWP не поддерживает проверку вводимых данных. Это огромная проблема для бизнес-решений, которые пытаются перевести с WPF на UWP.
* Системы стилей UWP и WPF сильно отличаются, что потребует определенных усилий при переносе. UWP использует VistualStateManger, вместо DataTriggers или EventTriggers из WPF. Стили и шаблоны - это основные отличия.
* В UWP, XAML `ResourceDictionary` поддержимает меньше функций, чем в WPF.
* Похоже UWP следует только спецификации XAML/2006, вместо [XAML/2009](https://docs.microsoft.com/en-us/dotnet/desktop/xaml-services/xaml-2009-language-features) поддерживаемой WPF.
* Several UWP controls are sealed and new controls cannot derive from them
* Для расширенной отрисовки, UWP имеет меньше встроенных функций. Из-за чего требуется чаще обращаться к Win2D или же чаще перерисовывать.
* UWP и WPF имеют различия по пространствам имен. К примеру, WPF имеет `System.Windows.Media.Colors`, в то время как у UWP это `Windows.UI.Colors`.