# NativeMenu (原生菜单)

`NativeMenu` 可以在 _macOS_ 和一些 Linux 发行版上显示菜单。

您可以通过嵌套 `<MenuItem>` 元素来创建子菜单。

您可以通过包含 `<NativeMenuItemSeparator>` 元素或添加一个将其 `Header` 设置为减号的菜单项来添加菜单分隔线，如下所示：

```xml
<NativeMenuItemSeparator Header="-" />
```

## 常用属性

您可能会最常使用这些属性：

<table>
  <thead>
    <tr><th width="204">属性</th><th>描述</th></tr>
  </thead>
  <tbody>
    <tr><td><code>Header</code></td><td>菜单标题。</td></tr>
    <tr><td><code>Command</code></td><td>用户点击菜单项时执行的命令。</td></tr>
    <tr><td><code>Gesture</code></td><td>与菜单项关联的键盘快捷键。</td></tr>
  </tbody>
</table>

## 示例1

此示例修改 macOS 中的默认应用程序菜单。

:::info
更改应用程序的 `Name` 属性将导致应用程序菜单标题更改。在此示例中，它被设置为 *Sample Application*。
:::

![image](https://github.com/user-attachments/assets/d30bab47-f133-4f79-9bdb-d4fb4569ed61)

```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="NativeMenu

             xmlns:local="using:NativeMenuTest"
             RequestedThemeVariant="Default"
             Name="Sample Application">
             <!-- "Default" ThemeVariant follows system theme variant. "Dark" or "Light" are other available options. -->

    <Application.DataTemplates>
        <local:ViewLocator/>
    </Application.DataTemplates>

    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="About This Application…" Click="AppAbout_OnClick" />
            <NativeMenuItem Header="Preferences…" Click="AppPreferences_OnClick" />
        </NativeMenu>
    </NativeMenu.Menu>
  
    <Application.Styles>
        <FluentTheme />
    </Application.Styles>
</Application>
```

你还需要在 code-behind 中添加正确的事件处理器

```C#
private void AppAbout_OnClick(object? sender, System.EventArgs args) {

}

private void AppPreferences_OnClick(object? sender, System.EventArgs args) {
    
}
```

## 示例2

这个示例添加了 *文件* 菜单以及 *编辑* 菜单。为了说明 `NativeMenu.Menu` 元素在 XAML 中的位置上下文，此示例包含了一些其他 XML 标签；但为简洁起见，这些标签省略了应用程序正常运行所必需的属性。


```Xml
<Window>
    <Design.DataContext />

    <NativeMenu.Menu>
        <NativeMenu>
            <NativeMenuItem Header="File" IsVisible="true">
                <NativeMenu>                    
                    <NativeMenuItem Header="Open…" Click="FileOpen_OnClick" Gesture="Meta+O" />
                    <NativeMenuItem Header="Save As…" Click="FileSaveAs_OnClick" Gesture="Meta+Shift+S" />
                    <NativeMenuItem Header="Save As…" Click="FileSaveAs_OnClick" Gesture="Meta+A" />
                </NativeMenu>
            </NativeMenuItem>
            <NativeMenuItem Header="Edit" IsEnabled="true">
                <NativeMenu>
                    <NativeMenuItem Header="Cut" Command="{Binding CutCommand}" Gesture="Meta+X" />
                    <NativeMenuItem Header="Copy" Command="{Binding CopyCommand}" Gesture="Meta+C" />
                    <NativeMenuItem Header="Past" Command="{Binding PasteCommand}" Gesture="Meta+V" />
                </NativeMenu>
            </NativeMenuItem>
        </NativeMenu>
    </NativeMenu.Menu>

    <TextBlock Text="{Binding Greeting}" HorizontalAlignment="Center" VerticalAlignment="Center"/>

</Window>
```

在 视图模型中，你还需要添加以下命令函数：

```C#
public void CutCommand() { }

public void CopyCommand() { }

public void PasteCommand() { }
```

### 手势格式

`Gestrue` 属性是一个以 `+` 分隔的键修饰符列表，后跟一个 `+`，然后是一个单独的按键字符（该符号本身亦可能是 `+`）。允许的修饰符包括 `Alt`，`Control`，`Shift`，还有 `Meta`。如果 `Gestrue` 属性为空字符串或仅包含单个按键字符，则不会引发异常，但是该手势就不会再激活菜单项了。如果提供了键修饰符但没有提供按键，或者是属性值的格式不正确，则会引发 `ArgumentException`。有关的更多详细信息，请参阅：[`KeyGesture`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/KeyGesture.cs)，[`Key`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/Key.cs)，还有 [`KeyModifier`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Base/Input/IKeyboardDevice.cs)。


:::info 
请注意，如果没有代码隐藏的 `Click` 事件处理程序或使用 `Command` 属性绑定的函数，菜单项将不会启用。 
:::

:::info 
请注意，在 macOS 上，标题为 `Edit` 的菜单栏级别 `NativeMenuItem` 默认会包含一些额外的 macOS 功能。 
:::

## 示例3

此示例定义了一个可以附加到托盘图标的本机菜单：

```xml
<NativeMenu>
  <NativeMenuItem Header="Settings">
    <NativeMenu>
      <NativeMenuItem Header="Option 1"   />
      <NativeMenuItem Header="Option 2"   />
      <NativeMenuItemSeparator />
      <NativeMenuItem Header="Option 3"  />
    </NativeMenu>
  </NativeMenuItem>
</NativeMenu>
```

## 更多信息

:::info
有关此控件的完整API文档，请参阅 [此处](http://reference.avaloniaui.net/api/Avalonia.Controls/NativeMenu/).
:::

:::info
在 GitHub 上查看源代码 [NativeMenu.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/NativeMenu.cs)
:::
