---
id: numericupdown
title: NumericUpDown issues
description: Troubleshoot problems with the NumericUpDown selector control
doc-type: troubleshooting
sidebar_label: NumericUpDown
---

## Invalid cast exception when `NumericUpDown` text box is cleared

When the text box of `NumericUpDown` is entirely cleared of input, the control may throw an invalid cast exception, e.g., `Invalid cast from string to decimal?`

To prevent these exceptions appearing, try the following:

- Set `TargetNullValue` and `FallbackValue` on your `Binding` (both to `0`). Ensure the values are explicitly typed to match the source property type (usually `decimal` or `int`) so they are treated as numbers rather than a `string`. This stops the empty text box from logging as a binding failure.
- (Optional) Set `UpdateSourceTrigger=LostFocus` to stop the view model updating during edit states. This can reduce occurrences, but doesn't prevent them entirely.

```xml
<NumericUpDown Minimum="0" Maximum="10000000">
  <NumericUpDown.Value>
    <Binding Path="Units">
      <Binding.TargetNullValue><x:Decimal>0</x:Decimal></Binding.TargetNullValue>
      <Binding.FallbackValue><x:Decimal>0</x:Decimal></Binding.FallbackValue>
    </Binding>
  </NumericUpDown.Value>
</NumericUpDown>
```

## See also

- [NumericUpDown control](/controls/input/selectors/numericupdown)
- [Data binding syntax](/docs/data-binding/data-binding-syntax)