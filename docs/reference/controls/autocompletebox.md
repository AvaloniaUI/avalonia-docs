---
title: AutoCompleteBox
description: REFERENCE - Built-in Controls
---

import AutoCompleteBoxScreenshot from '/img/reference/controls/autocompletebox/autocompletebox.gif';

# AutoCompleteBox

The `AutoCompleteBox` presents a text box for user input and a drop-down that contains possible matches from an items source collection, for the text typed in. The drop-down shows when the user starts to type, and the match is updated for each character typed. The user can select from the drop-down.

The way in which the text is matched to possible items in the items source is configurable.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="233">Property</th><th>Description</th></tr></thead><tbody><tr><td><code>Items</code></td><td>The list of items to match from. </td></tr><tr><td><code>FilterMode</code></td><td>Option for how the matching is to be done. See table below.</td></tr><tr><td><code>AsyncPopulator</code></td><td>An asynchronous function that can can provide the list of matches for a given (string) criteria. This </td></tr></tbody></table>

These are the options for the filter mode property:

<table><thead><tr><th width="350">Filter Mode</th><th>Description</th></tr></thead><tbody><tr><td><code>StartsWith</code></td><td>A culture-sensitive, case-insensitive filter where the returned items start with the specified text.</td></tr><tr><td><code>StartsWithCaseSensitive</code></td><td>A culture-sensitive, case-sensitive filter where the returned items start with the specified text.</td></tr><tr><td><code>StartsWithOrdinal</code></td><td>An ordinal, case-insensitive filter where the returned items start with the specified text.</td></tr><tr><td><code>StartsWithOrdinalCaseSensitive</code></td><td>An ordinal, case-sensitive filter where the returned items start with the specified text.</td></tr><tr><td><code>Contains</code></td><td>A culture-sensitive, case-insensitive filter where the returned items contain the specified text.</td></tr><tr><td><code>ContainsCaseSensitive</code></td><td>A culture-sensitive, case-sensitive filter where the returned items contain the specified text.</td></tr><tr><td><code>ContainsOrdinal</code></td><td>An ordinal, case-insensitive filter where the returned items contain the specified text.</td></tr><tr><td><code>ContainsOrdinalCaseSensitive</code></td><td>An ordinal, case-sensitive filter where the returned items contain the specified text.</td></tr><tr><td><code>Equals</code></td><td>A culture-sensitive, case-insensitive filter where the returned items equal the specified text.</td></tr><tr><td><code>EqualsCaseSensitive</code></td><td>A culture-sensitive, case-sensitive filter where the returned items equal the specified text.</td></tr><tr><td><code>EqualsOrdinal</code></td><td>An ordinal, case-insensitive filter where the returned items equal the specified text.</td></tr><tr><td><code>EqualsOrdinalCaseSensitive</code></td><td>An ordinal, case-sensitive filter where the returned items equal the specified text.</td></tr></tbody></table>

:::info
In an **ordinal** string comparison, each character is compared using its simple byte value (independent of language).
:::

## Examples

This example has a fixed items source (array) that is set in the C# code-behind.

```xml
<StackPanel Margin="20">
  <TextBlock Margin="0 5">Choose an animal:</TextBlock>
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
            .OrderBy(x=>x);
        }
    }
}
```

<img src={AutoCompleteBoxScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/AutoCompleteBox/).
:::

:::info
View the source code on _GitHub_ [`AutoCompleteBox.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/AutoCompleteBox/AutoCompleteBox.cs)
:::
