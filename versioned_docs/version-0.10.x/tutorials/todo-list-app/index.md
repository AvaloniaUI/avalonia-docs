# ToDo List App

In this tutorial we're going to be creating a simple TODO application in Avalonia using the Model-View-ViewModel \(MVVM\) pattern.

:::info
You can find the code for the completed application [here](https://github.com/grokys/todo-tutorial).
:::

  <div style={{textAlign: 'center'}}>
    <img src="/img/tutorials/todo-list-app/image%20%2814%29.png" alt="Decription" />
  </div>

## Model-View-ViewModel \(MVVM\)

We're going to be using the [Model-View-ViewModel pattern \(MVVM\)](https://docs.avaloniaui.net/guides/basics/mvvm) for this tutorial. MVVM is a common pattern used for writing GUI applications, and is the recommended pattern to use when writing Avalonia applications. We'll be assuming a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) application here, but most of these concepts can be applied to all types of applications.

:::warning
For this guide we're going to be using [ReactiveUI](https://reactiveui.net/) which is a MVVM framework based on [.NET Reactive Extensions](https://reactivex.io/). This guide will explain how to use MVVM and ReactiveUI with Avalonia but you can also see the [ReactiveUI documentation](https://reactiveui.net/docs/) for more detailed information.
:::
