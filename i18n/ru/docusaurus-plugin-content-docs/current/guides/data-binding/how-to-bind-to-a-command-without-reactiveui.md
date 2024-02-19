---
id: how-to-bind-to-a-command-without-reactiveui
title: How to Bind to a Command without ReactiveUI
---

import BindCommandMethodScreenshot from '/img/guides/data-binding/bind-method.gif';
import BindCanExecuteMethodScreenshot from '/img/guides/data-binding/bind-method-canexecute.gif';

# How to Bind to a Command without ReactiveUI

Sometimes you just want to call a method when a button is clicked without the full ceremony of creating a reactive command, using the _ReactiveUI_ framework.

:::info
To see how to how to bind to a command **with** _ReactiveUI_, see [here](how-to-bind-to-a-command-with-reactiveui.md).
:::

_Avalonia UI_ data binding allows you to implement directly both a view model method that performs an action, and a property that can control whether the method can execute.

For example, using the XAML as follows:

```xml
<Window xmlns="https://github.com/avaloniaui">
   ...
   <StackPanel Margin="20">
      <Button Command="{Binding PerformAction}"
              CommandParameter="From the button, without ReactiveUI">
              Run the example</Button>
   </StackPanel>
</Window>
```

You can write a view model capable of running the action, like this

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public void PerformAction(object msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }
    }
}
```

<img src={BindCommandMethodScreenshot} alt=""/>

## Can Execute?

_Avalonia UI_ data binding provides a simple way of implementing a 'can execute?' feature using a naming convention.

If you need to have execution dependent on the value of a command parameter or a view model property, then you can write a second Boolean method to check if the action m,ethod can execute.

To make this work, _Avalonia UI_ uses the naming convention that the Boolean method has the same root name as the action method, but with the added prefix 'Can'.

For example:

```csharp
namespace AvaloniaGuides.ViewModels
{
    public class MainWindowViewModel 
    {
        public void PerformAction(object msg)
        {
            Debug.WriteLine($"The action was called. {msg}");
        }

        public bool CanPerformAction(object msg)
        {
            if (msg!=null) return !string.IsNullOrWhiteSpace( msg.ToString() );
            return false;
        }
    }
}
```

So, extending the example XAML to supply the parameter (string) from a text box:

```xml
<StackPanel Margin="20">
  <TextBox Margin="0 5" x:Name="message" 
           Watermark="Add a message to enable the button"/>
  <Button Command="{Binding PerformAction}"
          CommandParameter="{Binding #message.Text}">
    Run the example
  </Button>
</StackPanel>
```

:::info
This example uses the technique of binding directly to another control. You can see how to do this, [here](binding-to-controls.md).
:::

You will see that the button becomes enables only when the text box contains a string. 

<img src={BindCanExecuteMethodScreenshot} alt=""/>

## **Trigger Can Execute**

If you want to trigger the 'can execute?' method from another property in your view model, then you will have to decorate the property with one or more `DependsOn` attributes, and write the code to invoke property changed events yourself.

:::info
This technique applies to a view model that is not using the _ReactiveUI_ framework.
:::
