---
description: CONCEPTS - Input
---

# 键盘和快捷键

实现了`ICommandSource`接口的各种控件都有一个`HotKey`属性，您可以设置或绑定它。按下快捷键将执行与控件绑定的命令。

```xml
<Menu>
    <MenuItem Header="_File">
        <MenuItem x:Name="SaveMenuItem" Header="_Save" Command="{Binding SaveCommand}" HotKey="Ctrl+S"/>
    </MenuItem>
</Menu>
```

您还可以使用`HotKeyManager`类的静态方法来从代码中设置和获取快捷键：

```csharp
InitializeComponent();
HotKeyManager.SetHotKey(saveMenuItem, new KeyGesture(Key.S, KeyModifiers.Control));
```

## 键和修饰键

一个快捷键必须有一个[Key](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_Key)和零个或多个[KeyModifiers](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyModifiers)。在XAML中使用`HotKey`属性设置快捷键时，字符串将被解析为[KeyGesture](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyGesture)。解析键和修饰键使用了[Enum.Parse](https://docs.microsoft.com/en-us/dotnet/api/system.enum.parse)，但可以使用`Ctrl`代替`Control`或`Win`代替`Meta`等同义词。

### 参考

* [HotKeyManager](https://api-docs.avaloniaui.net/docs/T_Avalonia_Controls_HotKeyManager)
* [KeyGesture](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyGesture)
* [KeyModifiers](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_KeyModifiers)
* [Key](https://api-docs.avaloniaui.net/docs/T_Avalonia_Input_Key)

### 源代码

* [HotkeyManager.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/HotkeyManager.cs)
* [KeyGesture.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Input/KeyGesture.cs)