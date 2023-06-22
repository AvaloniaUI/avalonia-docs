---
id: mvvm
title: MVVM Architecture
---

The Model-View-ViewModel pattern (MVVM) is a common way of structuring a UI application. It takes advantage of Avalonia's [binding](https://docs.avaloniaui.net/docs/data-binding) system to separate the logic of the application from the display of the application.

MVVM might be overkill for a simple application, but as applications grow over time, they usually reach a point where tracking logic in [code-behind](https://docs.avaloniaui.net/guides/basics/code-behind) becomes problematic for two main reasons:

* The interactions between UI components becomes overly complicated and error-prone
* It's very difficult to unit test code in code-behind

MVVM solves this by abstracting the user interface into regular .NET classes that can be unit tested like any other classes.

This is intended as a brief introduction to MVVM, there are many resources online that go into this subject in more depth.

## When to use MVVM

First of all, MVVM has overhead in terms of complexity.

Because the advantages of using the MVVM pattern usually only become apparent when an application becomes more complex, it is often difficult to understand from simple examples _why_ MVVM should be used. Indeed if your application is going to remain small, using code-behind may well be easier to understand and maintain.

Many people prefer to start off their application using code-behind and once this starts proving problematic, refactor to use the MVVM pattern. This step usually happens while the application is relatively simple so generally doesn't take too much time.

## Views and ViewModels

When we talk about the MVVM pattern, the most important parts are the **View** layer and the **ViewModel** layer. Views are usually implemented as [`Window`](https://docs.avaloniaui.net/docs/controls/window)s and [`UserControl`](https://docs.avaloniaui.net/docs/controls/usercontrol)s while ViewModels are .NET classes.

One way to imagine an MVVM application is to imagine these two layers as hovering over one another, connected by bindings:

  <div style={{textAlign: 'center'}}>
    <img src="/img/guides/basics/mvvm/mvvm.png" alt="Diagram of MVVM" />
  </div>

The above example has, at the View layer:

* A `MainWindow` which is an Avalonia `Window` containing;
* A `Document` which is an Avalonia `UserControl` containing;
* Two `TextBox`es: `Name` and `Address`
* Two `Button`s: `OK` and `Cancel`
* Various bindings, indicated by arrows

At the ViewModel layer there are .NET classes which mirror the view layer:

* A `MainWindowViewModel` which has a property containing;
* A `DocumentViewModel` which has;
* Two `string` properties: `Name` and `Address`
* Two methods: `Ok` and `Cancel`

The ViewModel layer knows nothing of the view layer, so it is _independent_ of Avalonia. Each View usually has a corresponding ViewModel which contains all of the logic for the View. The View layer is connected to the ViewModel layer by bindings. Because the ViewModel layer is independent of Avalonia, it can be unit tested like any other code.

## Models

The Model layer is the lowest layer in an MVVM application. Models usually represent data read from a database, or classes from a low-level library which implements the business logic of the application. The Model layer will be very specific to each application.

An example of a model might be a table row read from a database using Entity Framework.

## Services

In addition, most applications will add _services_ to this mix, which usually implement the reading and writing of models and other application-specific logic.

## Frameworks

There are a number of frameworks designed to help write applications using the MVVM pattern. [ReactiveUI](https://reactiveui.net) is one of the most popular and has support for Avalonia which can be added via the [Avalonia.ReactiveUI NuGet package](https://www.nuget.org/packages/Avalonia.ReactiveUI/).