---
description: CONCEPTS - The MVVM Pattern
---

import MvvmDataBindingDiagram from '/img/concepts/mvvm/mvvm.png';

# Avalonia UI and MVVM

On this page you will learn how the MVVM pattern is realised when used with _Avalonia UI_.

## Views and View Models

When you use the MVVM pattern with _Avalonia UI_, you implement a view with an AXAML file, attached to a corresponding code-behind file, and a view model with a plain-old code class file. 

In _Avalonia UI_, a view is implemented as a composition of UI elements in a window or a user control (both AXAML files with code-behind). The UI elements in a composition can be a mixture of _Avalonia UI_ built-in controls, user controls and (more advanced) controls of your own design and implementation.

:::info
For a full list of the _Avalonia UI_ built-in controls, see the reference section [here](../../reference/controls/).
:::

:::info
To learn more about the concept of UI composition, see [here](../ui-composition.md).
:::

:::info
To learn how to design and implement your own controls, see [here](../../guides/custom-controls/how-to-create-a-custom-controls-library.md).
:::

## Data Binding

Data binding is the key technology that allows an _Avalonia UI_ MVVM application to separate views from view models. You can visualise the view to view model relationship as two layers connected by the data bindings:

<img src={MvvmDataBindingDiagram} alt=""/>

Notice how some of the data bindings are represented by a two way arrow and others by a single-headed arrow. For example, the name and address inputs are two ways - you want both changes in the view model to be notified to the view, and for inputs to the view to be updated on the view model.

The buttons however have one-direction commands, issued by the view and acted out by the view model. 

Notice how the view model class is not dependent on the view layer, or how it will be rendered on the target platform by _Avalonia UI_. Because the view model class is independent, it can be unit tested like any other code.

When you use the MVVM pattern in practice, you will use a corresponding view model for each view, and the view model class contains all the application logic for the view.

## The MVVM Model

The model is the other part of the MVVM pattern. Models are much less precisely defined in the pattern as they represent 'the rest of the architecture'. This is often data storage or other services.

The important principle for you to maintain is separation. You should implement the relationship between view model and model using some form of the Dependency Injection (DI) pattern.

## ReactiveUI

There are a number of frameworks designed to help write applications using the MVVM pattern.

In the following pages, you will learn about the _ReactiveUI_ framework which is one of the most popular and is supported by one of the _Avalonia UI_ packages.
