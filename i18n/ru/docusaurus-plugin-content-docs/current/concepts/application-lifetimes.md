---
description: КОНЦЕПЦИИ
---

# Жизненные циклы приложения

Не все платформы созданы одинаковыми! Например, управление жизненным циклом, с которым вы, возможно, привыкли работать в Windows Forms или WPF, может функционировать только на платформах в стиле настольных приложений. _Avalonia UI_ - это кроссплатформенный фреймворк; поэтому, чтобы сделать ваше приложение переносимым, он предоставляет несколько различных моделей жизненного цикла для вашего приложения, а также позволяет управлять всем вручную, если целевая платформа это позволяет.

## Как работают жизненные циклы?

Для настольного приложения вы инициализируете его следующим образом:

```csharp
class Program
{
  // Этот метод необходим для инфраструктуры предпросмотра IDE
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // Точка входа. На этом этапе всё ещё не готово,
  // поэтому не следует использовать какие-либо типы Avalonia или что-либо,
  // что ожидает готовности SynchronizationContext
  public static int Main(string[] args) 
    => BuildAvaloniaApp().StartWithClassicDesktopLifetime(args);
}
```

Затем главное окно создается в классе `Application`:

```csharp
public override void OnFrameworkInitializationCompleted()
{
  if (ApplicationLifetime 
                  is IClassicDesktopStyleApplicationLifetime desktop)
    desktop.MainWindow = new MainWindow();
  else if (ApplicationLifetime 
                  is ISingleViewApplicationLifetime singleView)
    singleView.MainView = new MainView();
  base.OnFrameworkInitializationCompleted();
}
```

Этот метод вызывается, когда фреймворк инициализирован, и свойство `ApplicationLifetime` содержит выбранный жизненный цикл, если таковой имеется.

:::info
Если вы запускаете приложение в режиме дизайна (это использует процесс предпросмотра IDE), то `ApplicationLifetime` будет равен null.
:::

## Интерфейсы жизненного цикла

_Avalonia UI_ предоставляет набор интерфейсов, позволяющих выбрать уровень контроля, подходящий для вашего приложения. Они предоставляются семейством методов `BuildAvaloniaApp().Start[Something]`.

### IControlledApplicationLifetime

Предоставляется:

* `StartWithClassicDesktopLifetime`
* `StartLinuxFramebuffer`

Позволяет подписаться на события `Startup` и `Exit` и дает возможность явно завершить работу приложения, вызывая метод `Shutdown`. Этот интерфейс дает вам контроль над процедурами завершения приложения.

### IClassicDesktopStyleApplicationLifetime

Наследует: `IControlledApplicationLifetime`

Предоставляется:

* `StartWithClassicDesktopLifetime`

Позволяет управлять жизненным циклом вашего приложения по образцу приложения Windows Forms или WPF. Этот интерфейс предоставляет способ доступа к списку открытых в данный момент окон, установки главного окна и имеет три режима завершения работы:

* `OnLastWindowClose` - завершает работу приложения при закрытии последнего окна
* `OnMainWindowClose` - завершает работу приложения при закрытии главного окна (если оно было установлено).
* `OnExplicitShutdown` - отключает автоматическое завершение работы приложения, вам нужно вызвать метод `Shutdown` в вашем коде.

### ISingleViewApplicationLifetime

Предоставляется:

* `StartLinuxFramebuffer`
* мобильные платформы

Некоторые платформы не имеют концепции главного окна рабочего стола и позволяют отображать только один вид на экране устройства одновременно. Для этих платформ жизненный цикл позволяет вместо этого установить и изменить класс главного представления (`MainView`).

:::info
Для реализации стека навигации на таких платформах (с одним главным представлением) вы можете использовать [маршрутизацию _ReactiveUI_](https://www.reactiveui.net/docs/handbook/routing/) или другой элемент управления маршрутизацией.
:::

## Ручное управление жизненным циклом

При необходимости вы можете взять полный контроль над управлением жизненным циклом вашего приложения. Например, на настольной платформе вы можете передать делегат в `AppMain` методу `BuildAvaloniaApp.Start`, а затем управлять всем вручную оттуда:

```csharp
class Program
{
  // Этот метод необходим для инфраструктуры предпросмотра IDE
  public static AppBuilder BuildAvaloniaApp() 
    => AppBuilder.Configure<App>().UsePlatformDetect();

  // Точка входа. На этом этапе всё ещё не готово,
  // поэтому не следует использовать какие-либо типы Avalonia или что-либо,
  // что ожидает готовности SynchronizationContext
  public static int Main(string[] args) 
    => BuildAvaloniaApp().Start(AppMain, args);

  // Точка входа приложения. Avalonia полностью инициализирована.
  static void AppMain(Application app, string[] args)
  {
     // Источник токена отмены, который будет
     // использоваться для остановки основного цикла
     var cts = new CancellationTokenSource();

     // Здесь ваш код запуска
     new Window().Show();

     // Запуск основного цикла
     app.Run(cts.Token);
  }
}
```
