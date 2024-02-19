---
description: REFERENCE - Built-in Controls
---

import ButtonSpinnerScreenshot from '/img/reference/controls/buttons/button-spinner.png';

# 按钮微调器

按钮微调器是一个包含向上和向下微调按钮的控件。该按钮的内容是灵活的，但您需要编写相当多的行为代码。

## 有用的属性

您可能经常使用以下属性：

<table><thead><tr><th width="261">属性</th><th>描述</th></tr></thead><tbody><tr><td><code>ButtonSpinnerLocation</code></td><td>微调按钮的位置：左侧或右侧。</td></tr><tr><td><code>ValidSpinDirection</code></td><td>用于限制微调方向：增加、减少或无。</td></tr></tbody></table>

## 示例

```xml
<ButtonSpinner Height="20" Width="130" ButtonSpinnerLocation="Left">
  123
</ButtonSpinner>
```

<img src={ButtonSpinnerScreenshot} alt=''/>

## More Information

:::info
有关此控件的完整API文档，请参阅 [这里](http://reference.avaloniaui.net/api/Avalonia.Controls/ButtonSpinner/).
:::

:::info
在 _GitHub_ 上查看源代码 [`ButtonSpinner.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ButtonSpinner.cs)
:::
