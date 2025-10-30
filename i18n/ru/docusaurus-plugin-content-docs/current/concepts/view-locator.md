---
description: CONCEPTS
---

# View Locator

:::info
ViewLocator является опциональным и включен в стандартные шаблоны Avalonia. Вместо него можно использовать явные [DataTemplates](templates/data-templates-collection.md).
:::

ViewLocator разрешает View для ViewModel в MVVM-приложениях. Он реализует `IDataTemplate` для сопоставления ViewModel и View типов.

## Реализация по умолчанию

Реализация по умолчанию использует рефлексию. Она заменяет "ViewModel" на "View" в полном имени типа и ищет ожидаемый тип View.

**Пример:** `MyApp.ViewModels.MainViewModel` → `MyApp.Views.MainView`

:::tip
Хотя подход на основе рефлексии является самым простым, рекомендуется реализовать собственный ViewLocator, адаптированный к вашему приложению, используя одну из приведенных ниже альтернатив для повышения производительности, типобезопасности и совместимости с AOT.
:::

```cs
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        var name = data.GetType().FullName!.Replace("ViewModel", "View");
        var type = Type.GetType(name);

        if (type != null)
        {
            return (Control)Activator.CreateInstance(type)!;
        }
        else
        {
            return new TextBlock { Text = "Not Found: " + name };
        }
    }

    public bool Match(object data)
    {
        return data is ViewModelBase;
    }
}
```

- Метод `Match` проверяет, является ли данные экземпляром `ViewModelBase`
- Метод `Build` создает экземпляр View с помощью рефлексии или возвращает TextBlock с ошибкой, если View не найдена

## Регистрация

Зарегистрируйте ViewLocator в `App.axaml`:

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.App"
             xmlns:local="using:MyApp"
             RequestedThemeVariant="Default">
    <Application.DataTemplates>
        <local:ViewLocator />
    </Application.DataTemplates>

    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

После регистрации ViewLocator работает автоматически:

```csharp
DataContext = new MainViewModel(); // ViewLocator разрешает в MainView
```

Или с привязкой данных:

```xml
<ContentControl Content="{Binding CurrentViewModel}" />
```

## Альтернативные реализации

### Сопоставление с образцом (Pattern Matching)

Типобезопасный подход без рефлексии:

```csharp
public class ViewLocator : IDataTemplate
{
    public Control Build(object data)
    {
        return data switch
        {
            MainViewModel vm => new MainView { DataContext = vm },
            SettingsViewModel vm => new SettingsView { DataContext = vm },
            _ => new TextBlock { Text = $"View not found for {data.GetType().Name}" }
        };
    }

    public bool Match(object data) => data is ViewModelBase;
}
```

- Типобезопасность на этапе компиляции и лучшая производительность
- Совместимость с Native AOT
- Поддержка рефакторинга в IDE

### DataTemplates в XAML

Декларативное определение сопоставлений View и ViewModel:

```xml
<Application.DataTemplates>
    <DataTemplate DataType="{x:Type vm:MainViewModel}">
        <views:MainView />
    </DataTemplate>
    <DataTemplate DataType="{x:Type vm:SettingsViewModel}">
        <views:SettingsView />
    </DataTemplate>
</Application.DataTemplates>
```

См. [DataTemplates коллекция](templates/data-templates-collection.md).

### Внедрение зависимостей / IoC

При использовании DI вы можете интегрировать ViewLocator с вашим контейнером зависимостей:

- **Сопоставление с образцом + DI**: Комбинируйте сопоставление с образцом с `IServiceProvider.GetRequiredService()` для типобезопасного разрешения
- **Регистрация фабрик**: Регистрируйте View фабрики в вашем DI-контейнере, которые вызывает ViewLocator
- **Прямое разрешение**: Передайте service provider в ViewLocator (может по-прежнему требовать рефлексию, если не комбинировать с сопоставлением с образцом или генераторами исходного кода)

Выбирайте на основе того, нужно ли вам избегать рефлексии или предпочитаете более простую конфигурацию.

### Генераторы исходного кода (Source Generators)

Вы можете создать собственный генератор исходного кода для генерации ViewLocator кода во время компиляции. Это обеспечивает нулевые накладные расходы во время выполнения и полную совместимость с AOT.

Подробности о создании генераторов исходного кода см. в [документации Microsoft по генераторам исходного кода](https://learn.microsoft.com/ru-ru/dotnet/csharp/roslyn-sdk/source-generators-overview).

#### Сторонние решения

**[StaticViewLocator](https://github.com/wieslawsoltes/StaticViewLocator)** - NuGet-пакет, который автоматически обнаруживает и регистрирует View.

**[ViewLocatorGenerator](https://github.com/peaceshi/Avalonia-NativeAOT-SingleFile)** - Пример реализации генератора исходного кода для ViewLocator (не пакет, референсная реализация).

## См. также

- [DataTemplates](templates/data-templates.md)
- [Коллекция DataTemplates](templates/data-templates-collection.md)
- [Реализация IDataTemplate](templates/implement-idatatemplate.md)
