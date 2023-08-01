---
id: how-to-create-advanced-custom-controls
title: 如何创建高级自定义控件
---

# 如何创建高级自定义控件

从自定义控件指南中摘录的内容。

这是`Border`控件如何定义其`Background`属性的方式：

`AvaloniaProperty.Register`方法还接受其他一些参数：

* `defaultValue`：为属性设置默认值。请确保只传递值类型和不可变类型，因为传递引用类型将导致所有注册了该属性的实例使用同一个对象。
* `inherits`：指定属性的默认值应来自父控件。
* `defaultBindingMode`：属性的默认绑定模式。可以设置为`OneWay`、`TwoWay`、`OneTime`或`OneWayToSource`。
* `validate`：一个类型为`Func<TOwner, TValue, TValue>`的验证/强制函数。该函数接受正在设置属性的类的实例和值，并返回强制后的值，或者对于无效值抛出异常。

> 一个样式化属性类似于其他XAML框架中的`DependencyProperty`。

> 属性的命名约定及其对应的`AvaloniaProperty`字段的命名是重要的。字段的名称始终是属性的名称，后面附加了`Property`后缀。

### 在另一个类上使用`StyledProperty`

有时，您想要添加到自定义控件的属性已经存在于另一个控件上，`Background`就是一个很好的例子。要注册在另一个控件上定义的属性，您需要调用`StyledProperty.AddOwner`：

```csharp
public static readonly StyledProperty<IBrush> BackgroundProperty =
    Border.BackgroundProperty.AddOwner<Panel>();

public Brush Background
{
    get { return GetValue(BackgroundProperty); }
    set { SetValue(BackgroundProperty, value); }
}
```

> 注意：与WPF/UWP不同，属性必须在类上注册，否则无法在该类的对象上设置属性。但这可能会在将来发生改变。

### 只读属性

要创建一个只读属性，您可以使用`AvaloniaProperty.RegisterDirect`方法。以下是`Visual`如何注册只读的`Bounds`属性：

```csharp
public static readonly DirectProperty<Visual, Rect> BoundsProperty =
    AvaloniaProperty.RegisterDirect<Visual, Rect>(
        nameof(Bounds),
        o => o.Bounds);

private Rect _bounds;

public Rect Bounds
{
    get { return _bounds; }
    private set { SetAndRaise(BoundsProperty, ref _bounds, value); }
}
```

可以看到，只读属性被存储为对象的字段。在注册属性时，传递了一个getter，用于通过`GetValue`访问属性值，然后使用`SetAndRaise`通知属性更改的监听器。

### 附加属性

[附加属性](../../concepts/attached-property)的定义与样式化属性几乎相同，只是它们使用`RegisterAttached`方法进行注册，并且它们的访问器被定义为静态方法。

以下是`Grid`如何定义其`Grid.Column`附加属性：

```csharp
public static readonly AttachedProperty<int> ColumnProperty =
    AvaloniaProperty.RegisterAttached<Grid, Control, int>("Column");

public static int GetColumn(Control element)
{
    return element.GetValue(ColumnProperty);
}

public static void SetColumn(Control element, int value)
{
    element.SetValue(ColumnProperty, value);
}
```

### 直接的Avalonia属性

顾名思义，`RegisterDirect`不仅用于注册只读属性。您还可以将一个_setter_传递给`RegisterDirect`，将标准的C#属性公开为Avalonia属性。

使用`AvaloniaProperty.Register`注册的`StyledProperty`维护了一个优先级列表，其中包含允许样式工作的值和绑定。然而，对于许多属性来说，这是不必要的，比如`ItemsControl.Items`——它永远不会被样式化，使用样式化属性的开销是不必要的。

以下是`ItemsControl.Items`的注册方式：

```csharp
public static readonly DirectProperty<ItemsControl, IEnumerable> ItemsProperty =
    AvaloniaProperty.RegisterDirect<ItemsControl, IEnumerable>(
        nameof(Items),
        o => o.Items,
        (o, v) => o.Items = v);

private IEnumerable _items = new AvaloniaList<object>();

public IEnumerable Items
{
    get { return _items; }
    set { SetAndRaise(ItemsProperty, ref _items, value); }
}
```

直接属性是样式化属性的轻量级版本，支持以下功能：

* AvaloniaObject.GetValue
* AvaloniaObject.SetValue（非只读属性）
* PropertyChanged
* Binding（仅具有LocalValue优先级）
* GetObservable
* AddOwner
* Metadata

它们不支持以下功能：

* 验证/强制（尽管可以在属性setter中完成）
* 覆盖默认值。
* 继承的值

### 在另一个类上使用DirectProperty

与样式化属性一样，您可以在直接属性上调用`AddOwner`来添加一个所有者。由于直接属性引用控件上的字段，因此您还必须为该属性添加一个字段：

```csharp
public static readonly DirectProperty<MyControl, IEnumerable> ItemsProperty =
    ItemsControl.ItemsProperty.AddOwner<MyControl>(
        o => o.Items,
        (o, v) => o.Items = v);

private IEnumerable _items = new AvaloniaList<object>();

public IEnumerable Items
{
    get { return _items; }
    set { SetAndRaise(ItemsProperty, ref _items, value); }
}
```

### 何时使用Direct属性和Styled属性

通常情况下，应将属性声明为样式化属性。但是，直接属性具有优点和缺点：

优点：

* 每个实例不需要额外的对象来存储属性
* 属性getter是标准的C#属性getter
* 属性setter是引发事件的标准C#属性setter
* 您可以添加[数据验证](../../guides/development-guides/data-validation.md)支持

缺点：

* 无法从父控件继承值
* 无法利用Avalonia的样式系统
* 属性值是一个字段，因此无论属性是否在对象上设置，都会被分配内存

因此，当满足以下要求时，请使用直接属性：

* 属性不需要样式化
* 属性通常或总是具有值

### 数据验证支持

如果要允许属性验证数据并显示验证错误消息，则该属性必须实现为`DirectProperty`，并且必须启用验证支持（`enableDataValidation: true`）。

**启用数据验证的属性示例**

```cs
public static readonly DirectProperty<MyControl, int> ValueProperty =
    AvaloniaProperty.RegisterDirect<MyControl, int>(
        nameof(Value),
        o => o.Value,
        (o, v) => o.Value = v, 
        enableDataValidation: true);
```

如果要[重用另一个类的直接属性](how-to-create-advanced-custom-controls.md#using-a-directproperty-on-another-class)，也可以启用数据验证。在这种情况下，请使用`AddOwnerWithDataValidation`。

**示例：TextBox.TextProperty属性重用TextBlock.TextProperty，但添加了验证支持**

```cs
public static readonly DirectProperty<TextBox, string?> TextProperty =
    TextBlock.TextProperty.AddOwnerWithDataValidation<TextBox>(
        o => o.Text,
        (o, v) => o.Text = v,
        defaultBindingMode: BindingMode.TwoWay,
        enableDataValidation: true);
```