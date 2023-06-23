---
info: propertychangedcallback
title: PropertyChangedCallback
---

Listening to changes on DependencyProperties in WPF can be complex. When you register a `DependencyProperty` you can supply a static `PropertyChangedCallback` but if you want to listen to changes from elsewhere [things can get complicated and error-prone](https://stackoverflow.com/questions/23682232).

In Avalonia, there is no `PropertyChangedCallback` at the time of registration, instead a class listener is [added to the control's static constructor in much the same way that event class listeners are added](../data-binding/binding-from-code#subscribing-to-a-property-on-any-object).

As side effect of this change, you may need to dispatch events yourself.
**WPF**
```csharp
treeView.SelectedItemChanged += TreeView_SelectedItemChanged;

// ...

private void TreeView_SelectedItemChanged(object sender, RoutedPropertyChangedEventArgs<object> e)
{
    var item = treeView.SelectedItem;
    // work with selected item.
}
```

**Avalonia**
```csharp
treeView.PropertyChanged += TreeView_SelectedItemChanged;

// ...

private void TreeView_SelectedItemChanged(object sender, AvaloniaPropertyChangedEventArgs e)
{
    if (e.Property != TreeView.SelectedItemProperty) return;

    var item = treeView.SelectedItem;
    // work with selected item.
}
```

Even plain text box should be handled in same way.
**WPF**
```csharp
searchTextBox.TextChanged += new TextChangedEventHandler(searchTextBox_TextChanged);

private void searchTextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    // handle text change
}
```

**Avalonia**
```csharp
searchTextBox.PropertyChanged += searchTextBox_TextChanged;

// ...

private void searchTextBox_TextChanged(object sender, AvaloniaPropertyChangedEventArgs e)
{
    if (e.Property != TextBox.TextProperty) return;

    // handle text change
}
```