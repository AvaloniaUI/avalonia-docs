---
description: REFERENCE
---

# Mark-up Extensions

This reference lists some of the XAML mark-up extensions used by _Avalonia UI_. A mark-up extension is formatted in this pattern:

```xml
<Element Attribute={Extension Value}  ... >
```

<table><thead><tr><th width="187.33333333333331">Extension</th><th width="392">Description</th><th>See</th></tr></thead><tbody><tr><td>Binding</td><td>Used for data binding. <em>Avalonia UI</em> will look for a data context to resolve this binding.</td><td>Concept <a href="../concepts/data-binding/">here</a>.</td></tr><tr><td>DynamicResource</td><td>Used for resource binding. A dynamic resource binding can reflect changes made in code at run-time.</td><td>Guide <a href="../guides/styles-and-resources/resources.md">here</a>.</td></tr><tr><td>StaticResource</td><td>Used for resource binding. A static resource is loaded and then remains the same for the application lifetime.</td><td>Guide <a href="../guides/styles-and-resources/resources.md">here</a>.</td></tr><tr><td>TemplateBinding</td><td>Used when creating a control template for binding to the templated parent.</td><td>Concept here.</td></tr></tbody></table>

