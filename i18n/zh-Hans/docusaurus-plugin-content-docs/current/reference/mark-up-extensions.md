---
description: REFERENCE
---

# 标记扩展

此参考列出了 _Avalonia UI_ 使用的一些 XAML 标记扩展。标记扩展的格式如下：

```xml
<Element Attribute={Extension Value}  ... >
```

| 扩展                | 描述                                 | 参考                                             |
|-------------------|:-----------------------------------|------------------------------------------------|
| `Binding`         | 用于数据绑定。Avalonia UI 将查找数据上下文以解析此绑定。 | [概念](../basics/data/data-binding)              |
| `DynamicResource` | 用于资源绑定。动态资源绑定可以在运行时反映代码中所做的更改。     | [概念](../basics/data/data-binding)              |
| `StaticResource`  | 用于资源绑定。静态资源在加载后在应用程序的生命周期内保持不变。    | [指南](../guides/styles-and-resources/resources) |
| `TemplateBinding` | 用于创建控件模板并绑定到模板的父级。                 | [指南](../guides/styles-and-resources/resources) |
| `OnPlatform`  |  | [指南](../guides/platforms/platform-specific-code/xaml)   |
| `OnFormFactor`  |  | [指南](../guides/platforms/platform-specific-code/xaml)   |
