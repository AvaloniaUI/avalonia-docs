# 切换分裂按钮

import ToggleSplitButtonClosedUncheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-closed-unchecked.png';
import ToggleSplitButtonClosedCheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-closed-checked.png';
import ToggleSplitButtonOpenedCheckedScreenshot from '/img/reference/controls/buttons/togglesplitbutton-opened-checked.png';
import ToggleSplitButtonTextListScreenshot from '/img/reference/controls/buttons/togglesplitbutton-text-list.png';

`ToggleSplitButton` 作为一个带有主要和次要部分的 [`ToggleButton`](togglebutton)，每个部分都可以单独按下。主要部分的行为类似于普通的 `ToggleButton`，而次要部分会打开一个带有附加操作的 [`Flyout`](../flyouts)。

:::info
`ToggleSplitButton` 仅有两个状态：选中和未选中。与标准的 `ToggleButton` 一样，不支持不确定状态。这是有意为之，这是为了匹配 WinUI 并限制控件的使用。`ToggleSplitButton` 应仅用于打开/关闭功能。除此之外的任何用法目前都被认为是不良实践。
:::

## 这是正确的控件吗？

`ToggleSplitButton` 是一个相当专门化的控件，其使用应该限制在从用户角度清晰合理的地方。它的用途是在打开/关闭功能的同时允许指定一些附加配置，而不是使用默认配置。

与 [`SplitButton`](../buttons/splitbutton) 一样，最常见的操作应该是默认操作，显示在主要部分中。然而，与 `SplitButton` 不同，按下主要部分会打开或关闭该功能，而不仅仅是调用一个操作。为功能添加附加配置应该在按下次要（下拉）部分时显示的 `Flyout` 中进行。

:::info
在 `Flyout` 中按下配置应该是要么（1）使用所选配置打开功能，要么（2）将功能更改为所选配置。在 `Flyout` 中按下配置不能关闭该功能，只能通过切换主要部分来关闭功能。
:::

## 常见属性

| 属性          | 描述                              |
|-------------|---------------------------------|
| `Content`   | 要显示在主要部分的内容                     |
| `Flyout`    | 当点击次要部分时显示的 `Flyout`            |
| `Command`   | 主按钮点击时要调用的命令                    |
| `IsChecked` | 获取或设置 `ToggleSplitButton` 是否被选中 |

## 伪类

| 伪类             | 描述                                                            |
|----------------|---------------------------------------------------------------|
| `:pressed`     | 当使用键盘输入（如空格或回车）按下整个 `ToggleSplitButton` 时设置。在此状态下，主要或次要部分没有区别 |
| `:flyout-open` | 当 `Flyout` 打开时设置                                              |
| `:checked`     | 当 `ToggleSplitButton` 被选中时设置。（`IsChecked="true"`）             |

## API 参考

[ToggleSplitButton](http://reference.avaloniaui.net/api/Avalonia.Controls/ToggleSplitButton/)

## 源代码

[ToggleSplitButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitButton/ToggleSplitButton.cs)

## 示例

### 基本示例

```xml
<ToggleSplitButton Content="Content"
                   IsChecked="{Binding IsChecked}">
    <ToggleSplitButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuItem Header="Item 1">
                <MenuItem Header="Subitem 1" />
                <MenuItem Header="Subitem 2" />
                <MenuItem Header="Subitem 3" />
            </MenuItem>
            <MenuItem Header="Item 2"
                      InputGesture="Ctrl+A" />
            <MenuItem Header="Item 3" />
        </MenuFlyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>
```

<img src={ToggleSplitButtonClosedUncheckedScreenshot} alt=""/>

_SplitButton (Flyout closed, unchecked)_

<img src={ToggleSplitButtonClosedCheckedScreenshot} alt=""/>

_SplitButton (Flyout closed, checked)_

<img src={ToggleSplitButtonOpenedCheckedScreenshot} alt=""/>

_SplitButton (Flyout opened, checked)_

### 带编号或项目符号列表的文本编辑器示例

延续 `SplitButton` 的文本编辑器示例，`ToggleSplitButton` 的常见用例是向文本添加项目符号/编号列表。在此示例中，主要部分将切换列表的打开/关闭状态，而次要部分将打开一个 `Flyout`，允许选择项目符号或编号样式。

```xml
<!-- We have the following Icons defined in our Resources -->
<PathGeometry x:Key="IconData.NumberedList"> {{ Path Data }} </PathGeometry>
<PathGeometry x:Key="IconData.BulletedList"> {{ Path Data }} </PathGeometry>
```

```xml
<ToggleSplitButton IsChecked="{Binding TextEditorHasList}">
    <ToggleSplitButton.Content>
        <!-- Note: For this example we keep the content static, but you can use dynamic content -->
        <PathIcon Data="{DynamicResource IconData.BulletedList}" />
    </ToggleSplitButton.Content>
    <ToggleSplitButton.Flyout>
        <Flyout Placement="Bottom">
            <!-- Note: For this example we keep the content static, but you can use dynamic content -->
            <ListBox Height="200" Width="200" >
                <ListBoxItem>
                    <StackPanel Orientation="Horizontal">
                        <PathIcon Data="{DynamicResource IconData.NumberedList}" />
                        <TextBlock Text="Numbered List" />
                    </StackPanel>
                </ListBoxItem>
                <ListBoxItem>
                    <StackPanel Orientation="Horizontal">
                        <PathIcon Data="{DynamicResource IconData.BulletedList}" />
                        <TextBlock Text="Bulleted List" />
                    </StackPanel>
                </ListBoxItem>
            </ListBox>
        </Flyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>
```

<img src={ToggleSplitButtonTextListScreenshot} alt=""/>

_Sample of ToggleSplitButton for toggle text lists on and off and selecting the list format_
