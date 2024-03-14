---
id: radiobutton
title: RadioButton
---

The `RadioButton` control allows users to select one or more things from a collection of presented things.

```xml
<!-- First Group -->
<RadioButton IsChecked="{Binding Option1Enabled }"
             GroupName="First Group"
             Content="First Option"/>
<RadioButton IsChecked="{Binding Option2Enabled }"
             GroupName="First Group"
             Content="Second Option"/>
<RadioButton IsChecked="{Binding Option3Enabled }"
             GroupName="First Group"
             Content="Third Option"/>

<!-- Second Group -->
<RadioButton IsChecked="{Binding Option4Enabled }"
             GroupName="Second Group"
             Content="Fourth Option"/>
<RadioButton IsChecked="{Binding Option5Enabled }"
             GroupName="Second Group"
             Content="Fifth Option"/>
```

### Reference

[RadioButton](http://reference.avaloniaui.net/api/Avalonia.Controls/RadioButton/)

### Source code

[RadioButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/RadioButton.cs)