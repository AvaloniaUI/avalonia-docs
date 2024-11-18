---
id: how-to-bind-to-a-task-result
title: 如何绑定任务结果
---


# 如何绑定任务结果

内容正在准备中。

## 示例2：绑定到任务

如果您需要进行一些繁重的工作来加载属性的内容，您可以绑定到 `async Task<TResult>` 的结果。

假设您有以下的视图模型，它在一个长时间运行的过程中生成一些文本：

```csharp
public Task<string> MyAsyncText => GetTextAsync();

private async Task<string> GetTextAsync()
{
  await Task.Delay(1000); // 仅为演示目的而进行延迟
  return "Hello from async operation";
}
```

您可以按照以下方式绑定到结果：

```xml
<TextBlock Text="{Binding MyAsyncText^, FallbackValue='Wait a second'}" />
```

:::info
注意：您可以使用 `FallbackValue` 来显示一些加载指示器。
:::
