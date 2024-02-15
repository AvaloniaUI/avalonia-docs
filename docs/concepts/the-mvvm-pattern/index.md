---
description: CONCEPTS
---

import MvvmPatternDiagram from '/img/guides/implementation-guides/mvvm-architecture.png';

# The MVVM Pattern

<img src={MvvmPatternDiagram} alt=""/>

The Model-View-View Model (MVVM) pattern is a common way of structuring a UI application. It uses a data binding system that helps move data between its view and view model parts. This means it achieves separation of application logic (view model) from the display of the UI (view).

Separation between the application logic and the business services (model) is commonly achieved by a Dependency Injection (DI) system.

MVVM might be overkill for a simple application; but as applications grow over time, they will often reach a point where keeping display definition and application logic in the same UI component modules becomes a problem:

* Interactions between UI components become complicated and error-prone.
* It becomes difficult to unit test UI components due to dependencies on the target UI platform.

MVVM solves this by abstracting the application logic into code-only classes that do not depend on the target UI platform, and can therefore be unit tested independently.

:::info
To discover more about the background to the MVVM pattern, see the _Microsoft Patterns and Practices_ article [here](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/hh848246\(v=pandp.10\)).
:::

## When to use MVVM?

MVVM is a more complex pattern of programming compared to the event-driven code-behind pattern. You have an additional learning overhead to master the techniques of the _ReactiveUI_ framework which you will use to implement MVVM with _Avalonia UI_. 

In fact, the code-behind pattern may well be easier for you to understand and maintain for a small simple application.

:::info
For details of how to program _Avalonia UI_ with the code-behind pattern, see [here](../../basics/user-interface/code-behind).
:::

The advantages of using the MVVM pattern may only become apparent when an application grows and becomes more complex. You therefore have two development strategies to consider:

1. Start by using the simpler code-behind pattern. Aim to convert to MVVM should the application become difficult to maintain.
2. Use MVVM from the start because you expect the application to grow. 

You can use the following pages to learn about using MVVM with _Avalonia UI_ whichever of the above strategies you adopt.


