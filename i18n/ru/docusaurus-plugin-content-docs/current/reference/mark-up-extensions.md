---
description: REFERENCE
---

# Markup Extensions (Расширение разметки)

В этом разделе представлены некоторые расширения XAML разметки. Их структура определяется по шаблону:

```xml
<Element Attribute={Extension Value, Parameter=Value}  ... >
```

| Расширение | Описание | Подробнее |
|-----------------|----------------------------------------------------------------------------------------------------------------|---------------|
| `Binding`         | Используется для привязки данных. Avalonia UI будет искать контекст данных для разрешения привязок.                       | [Концепт](/docs/basic/data/data-binding) |
| `TemplateBinding` | Используется для создания шаблона элемента для привязки к шаблону родительского элемента.                                     | [Концепт](/docs/basic/data/data-binding) |
| `StaticResource`  | Статические ресурсы загружаются **только один раз** и не меняются во время выполенния приложения. | [Гайд](/docs/guides/styles-and-resources/resources)   |
| `DynamicResource` | Динамические ресурсы позволяют отображать изменения в коде во время выполнения приложения.            | [Гайд](/docs/guides/styles-and-resources/resources)   |
| `OnPlatform`  | Используется для выбора значения в зависимости от платформы. | [Гайд](/docs/guides/platforms/platform-specific-code/xaml)   |
| `OnFormFactor`  | Используется для выбора значения в зависимости от форм-фактора устройства. | [Гайд](/docs/guides/platforms/platform-specific-code/xaml)   |
