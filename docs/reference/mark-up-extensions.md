---
description: REFERENCE
---

# Mark-up Extensions

This reference lists some of the XAML mark-up extensions used by _Avalonia UI_. A mark-up extension is formatted in this pattern:

```xml
<Element Attribute={Extension Value}  ... >
```

| Extension       | Description                                                                                                    | See           |
|-----------------|----------------------------------------------------------------------------------------------------------------|---------------|
| `Binding`         | Used for data binding. Avalonia UI will look for a data context to resolve this binding.                       | [Concept](../basics/data/data-binding) |
| `DynamicResource` | Used for resource binding. A dynamic resource binding can reflect changes made in code at run-time.            | [Concept](../basics/data/data-binding)   |
| `StaticResource`  | Used for resource binding. A static resource is loaded and then remains the same for the application lifetime. | [Guide](../guides/styles-and-resources/resources)   |
| `TemplateBinding` | Used when creating a control template for binding to the templated parent.                                     | [Guide](../guides/styles-and-resources/resources) |
