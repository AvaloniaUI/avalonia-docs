---
id: the-mvvm-pattern
title: The MVVM Pattern
---

import MvvmPatternDiagram from '/img/concepts/architecture/mvvm/mvvm-architecture.png';
import MvvmDataBindingDiagram from '/img/concepts/architecture/mvvm/mvvm.png';

<img src={MvvmPatternDiagram} alt=""/>

The Model-View-View Model (MVVM) pattern is a common way of structuring a UI application. It uses a data binding system that helps move data between its view and view model parts. This means it achieves separation of application logic (view model) from the display of the UI (view).

Separation between the application logic and the business services (model) is commonly achieved by a Dependency Injection (DI) system.

MVVM might be overkill for a simple application; but as applications grow over time, they will often reach a point where keeping display definition and application logic in the same UI component modules becomes a problem:

* Interactions between UI components become complicated and error-prone.
* It becomes difficult to unit test UI components due to dependencies on the target UI platform.

MVVM solves this by abstracting the application logic into code-only classes that do not depend on the target UI platform, and can therefore be unit tested independently.

There are three core components in the MVVM pattern, each with a distinct role:

- **View**: Responsible for the structure, layout, and appearance of what the user sees. Ideally defined purely in XAML with minimal code-behind. The view gets data from its view model through bindings.
- **View model**: Acts as an intermediary between the view and the model. It handles the view logic, provides data in a form the view can use, and implements commands that respond to user actions. The view model raises `PropertyChanged` events to notify the view of updates.
- **Model**: Represents the application's domain model, including data, business logic, and validation. Examples include repositories, data transfer objects (DTOs), and plain CLR objects.

At the highest level, the view "knows about" the view model, and the view model "knows about" the model, but the model is unaware of the view model, and the view model is unaware of the view. This decoupling enables components to be swapped, developed, and unit tested independently.

The main benefits of MVVM are:

- **Separation of concerns**: Application logic is decoupled from the UI, making the code easier to test, maintain, and evolve.
- **Natural fit for XAML platforms**: The rich data binding capabilities in Avalonia provide the connection between views and view models, making MVVM a natural architectural choice.
- **Testability**: View models can be unit tested without any UI dependency, exercising the same functionality used by the view.
- **UI flexibility**: The view can be redesigned without changing any application logic, because the view is implemented entirely in XAML.

## When to use MVVM?

MVVM is a more complex pattern of programming compared to the event-driven code-behind pattern. You have an additional learning overhead to master the techniques of the _ReactiveUI_ framework which you will use to implement MVVM with Avalonia. 

In fact, the code-behind pattern may well be easier for you to understand and maintain for a small simple application.

:::info
For details of how to program Avalonia with the code-behind pattern, see [Code-behind](/docs/fundamentals/code-behind).
:::

The advantages of using the MVVM pattern may only become apparent when an application grows and becomes more complex. You therefore have two development strategies to consider:

1. Start by using the simpler code-behind pattern. Aim to convert to MVVM should the application become difficult to maintain.
2. Use MVVM from the start because you expect the application to grow. 

## The MVVM Model

The model is the other part of the MVVM pattern. Models are much less precisely defined in the pattern as they represent 'the rest of the architecture'. This is often data storage or other services.

The important principle for you to maintain is separation. You should implement the relationship between view model and model using some form of the Dependency Injection (DI) pattern.

## Avalonia and MVVM

### Views and View Models

When you use the MVVM pattern with Avalonia, you implement a view with an AXAML file, attached to a corresponding code-behind file, and a view model with a plain-old code class file. 

In Avalonia, a view is implemented as a composition of UI elements in a window or a user control (both AXAML files with code-behind). The UI elements in a composition can be a mixture of Avalonia built-in controls, user controls and (more advanced) controls of your own design and implementation.

:::info
For a full list of the Avalonia built-in controls, see the [Controls reference](/controls).
:::

:::info
To learn more about the concept of UI composition, see [UI composition](/docs/fundamentals/ui-composition).
:::

:::info
To learn how to design and implement your own controls, see [Custom controls](/docs/custom-controls).
:::

### Data Binding

Data binding is the key technology that allows an Avalonia MVVM application to separate views from view models. You can visualise the view to view model relationship as two layers connected by the data bindings:

<img src={MvvmDataBindingDiagram} alt=""/>

Notice how some of the data bindings are represented by a two way arrow and others by a single-headed arrow. For example, the name and address inputs are two ways - you want both changes in the view model to be notified to the view, and for inputs to the view to be updated on the view model.

The buttons however have one-direction commands, issued by the view and acted out by the view model. 

Notice how the view model class is not dependent on the view layer, or how it will be rendered on the target platform by Avalonia. Because the view model class is independent, it can be unit tested like any other code.

When you use the MVVM pattern in practice, you will use a corresponding view model for each view, and the view model class contains all the application logic for the view.

### ReactiveUI

There are a number of frameworks designed to help write applications using the MVVM pattern.

In the following pages, you will learn about the _ReactiveUI_ framework which is one of the most popular and is supported by one of the Avalonia packages.

## See also

- [Code-behind](/docs/fundamentals/code-behind)
- [UI composition](/docs/fundamentals/ui-composition)
- [Introduction to data binding](/docs/data-binding/introduction-to-data-binding)
