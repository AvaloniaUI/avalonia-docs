# Data Binding

Data binding provides a simple way to get data into your application's UI without having to set properties on each control each time a value changes.

Data binding is a way to establish mapping between properties of the object, to properties of UI controls. These mapping can be either bidirectional, where changes in control, apply change to underlying object, and vice versa, when changes of the object's property result in the UI changes or single-directional where changes propagated just in one direction. For example, if the user edits the value in a `TextBox`, the underlying object's property is automatically updated to include value entered by the user.

Binding is often used with the [MVVM Pattern](https://msdn.microsoft.com/en-us/library/hh848246.aspx) and for the rest of this guide we'll be assuming that you're using that pattern in your code.
