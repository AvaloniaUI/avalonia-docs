# PropertyChangedCallback

在WPF中，监听DependencyProperties的变化可能会变得复杂。当您注册一个`DependencyProperty`时，可以提供一个静态的`PropertyChangedCallback`，但如果您想从其他地方监听属性变化，[事情可能会变得复杂和容易出错](https://stackoverflow.com/questions/23682232)。

在Avalonia中，注册时没有`PropertyChangedCallback`，而是在控件的静态构造函数中添加了一个类监听器，方式与[添加事件类监听器的方式非常相似](../../guides/data-binding/binding-from-code#subscribing-to-a-property-on-any-object)。

