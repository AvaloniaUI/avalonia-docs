---
id: numericupdown
title: NumericUpDown issues
description: Troubleshoot problems with the NumericUpDown selector control
doc-type: troubleshooting
sidebar_label: NumericUpDown
---

## Invalid cast exception when NumericUpDown textbox is cleared

When the textbox of `NumericUpDown` is entirely cleared of input, the control may throw an invalid cast exception, e.g., `Invalid cast from string to decimal?`

To prevent these exceptions appearing:

- Set `UpdateSourceTrigger=LostFocus` to stop the view model updating during edit states.
- Set `TargetNullNValue=0` and `FallbackValue=0` to stop the empty textbox from logging as a binding failure.
- Explicitly type `TargetNullValue` and `FallbackValue` in your XAML as the same type as the source property (usually `decimal` or `int`), to ensure `0` reads as the correct numerical type instead of `string`.

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