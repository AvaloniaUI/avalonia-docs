---
description: REFERENCE - Built-in Controls
---

import AutoCompleteBoxScreenshot from '/img/reference/controls/autocompletebox/autocompletebox.gif';

# AutoCompleteBox 自动补全输入框

自动补全输入框提供了一个供用户输入的文本框和一个包含可能匹配项的下拉列表。下拉列表会在用户开始输入时显示，并且每输入一个字符，匹配项都会更新。用户可以从下拉列表中选择匹配项。

文本与可能项匹配的方式是可配置的。

## 常用属性

你可能最常使用这些属性：

<table>
<thead>
<tr><th width="233">属性</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code>Items</code></td><td>要匹配的项目列表。</td></tr>
<tr><td><code>FilterMode</code></td><td>匹配方式的选项。请参见下表。</td></tr>
<tr><td><code>AsyncPopulator</code></td><td>一个异步函数，可以根据给定的（字符串）条件提供匹配列表。</td></tr>
</tbody>
</table>

以下是过滤模式属性的选项：

<table>
<thead>
<tr><th width="350">筛选模式</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td><code>StartsWith</code></td><td>一种文化敏感的、不区分大小写的筛选器，返回的项目以指定的文本开头。</td></tr>
<tr><td><code>StartsWithCaseSensitive</code></td><td>一种文化敏感的、区分大小写的筛选器，返回的项目以指定的文本开头。</td></tr>
<tr><td><code>StartsWithOrdinal</code></td><td>一种基于序数的、不区分大小写的筛选器，返回的项目以指定的文本开头。</td></tr>
<tr><td><code>StartsWithOrdinalCaseSensitive</code></td><td>一种基于序数的、区分大小写的筛选器，返回的项目以指定的文本开头。</td></tr>
<tr><td><code>Contains</code></td><td>一种文化敏感的、不区分大小写的筛选器，返回的项目包含指定的文本。</td></tr>
<tr><td><code>ContainsCaseSensitive</code></td><td>一种文化敏感的、区分大小写的筛选器，返回的项目包含指定的文本。</td></tr>
<tr><td><code>ContainsOrdinal</code></td><td>一种基于序数的、不区分大小写的筛选器，返回的项目包含指定的文本。</td></tr>
<tr><td><code>ContainsOrdinalCaseSensitive</code></td><td>一种基于序数的、区分大小写的筛选器，返回的项目包含指定的文本。</td></tr>
<tr><td><code>Equals</code></td><td>一种文化敏感的、不区分大小写的筛选器，返回的项目等于指定的文本。</td></tr>
<tr><td><code>EqualsCaseSensitive</code></td><td>一种文化敏感的、区分大小写的筛选器，返回的项目等于指定的文本。</td></tr>
<tr><td><code>EqualsOrdinal</code></td><td>一种基于序数的、不区分大小写的筛选器，返回的项目等于指定的文本。</td></tr>
<tr><td><code>EqualsOrdinalCaseSensitive</code></td><td>一种基于序数的、区分大小写的筛选器，返回的项目等于指定的文本。</td></tr>
</tbody>
</table>


:::info
在**序数**字符串比较中，每个字符使用其简单的字节值进行比较（独立于语言）。
:::

:::info
**文化敏感**指的是在设计和技术实现中考虑到不同文化背景的用户需求。这包括基于不同语言采用不同的字符串处理和排序模式。例如，英文通常按照首字母A-Z排序，中文则可能根据拼音或笔画排序，而其他语言的排序规则也有所不同。
:::


## 示例

此示例有一个固定的数据源（数组），在 C# code-behind 中设置。

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">选择一个动物：</TextBlock>
  <AutoCompleteBox x:Name="animals" FilterMode="StartsWith" />
</StackPanel>
```

```csharp title='C#'
using Avalonia.Controls;
using System.Linq;

namespace AvaloniaControls.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            animals.ItemsSource = new string[] 
                {"cat", "camel", "cow", "chameleon", "mouse", "lion", "zebra" }
            .OrderBy(x => x);
        }
    }
}
```

<img src={AutoCompleteBoxScreenshot} alt="" />

## 更多信息

:::info
有关此控件的完整 API 文档，请参见[这里](http://reference.avaloniaui.net/api/Avalonia.Controls/AutoCompleteBox/)。
:::

:::info
在 _GitHub_ 上查看源代码 [`AutoCompleteBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/AutoCompleteBox/AutoCompleteBox.cs)。
:::
