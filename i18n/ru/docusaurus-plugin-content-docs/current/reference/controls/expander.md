---
description: REFERENCE - Built-in Controls
---

import ExpanderClosedScreenshot from '/img/reference/controls/expander/expander-closed.png';
import ExpanderOpenedScreenshot from '/img/reference/controls/expander/expander-opened.png';

# Expander

The expander control has a header area (always visible) and a collapsible content section that can contain a single child control.

## Useful Properties

You will probably use these properties most often:

<table><thead><tr><th width="266">Property</th><th>Description</th></tr></thead><tbody><tr><td>Expander.Header</td><td>Defines what appears in the header area. </td></tr></tbody></table>

## Example

```xml
<Expander VerticalAlignment="Top">
    <Expander.Header>
        Hidden Search
    </Expander.Header>
    <Grid RowDefinitions="*,*" ColumnDefinitions="150,*">
        <TextBlock Grid.Row="0" Grid.Column="0"
                   VerticalAlignment="Center">Search</TextBlock>
        <TextBox Grid.Row="0" Grid.Column="1"
                 Watermark="Search text" Width="200" />
        <TextBlock Grid.Row="1" Grid.Column="0"
                   VerticalAlignment="Center">Case sensitive?</TextBlock>
        <CheckBox Grid.Row="1" Grid.Column="1" />
    </Grid>
</Expander>
```

<img src={ExpanderClosedScreenshot} alt="" />

<img src={ExpanderOpenedScreenshot} alt="" />

## More Information

:::info
For the complete API documentation about this control, see [here](http://reference.avaloniaui.net/api/Avalonia.Controls/Expander/).
:::

:::info
View the source code on _GitHub_ [`Expander.cs`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Expander.cs)
:::
