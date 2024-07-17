---
description: CONCEPTS
---

# Code-Behind and XAML

Code-behind is a term used to describe the code that is joined with markup-defined objects, when a XAML control is markup-compiled. This topic describes requirements for code-behind as well as an alternative inline code mechanism for code in XAML.

## Prerequisites
This topic assumes that you have read the [XAML Overview](./introduction-to-xaml.md) and have some basic knowledge of the CLR and object-oriented programming.

## Code-Behind and the XAML Language

The XAML language includes language-level features that make it possible to associate code files with markup files, from the markup file side. Specifically, the XAML language defines the language features x:Class Directive, x:Subclass Directive, and x:ClassModifier Directive. Exactly how the code should be produced, and how to integrate markup and code, is not part of what the XAML language specifies. It is left up to frameworks such as Avalonia to determine how to integrate the code, how to use XAML in the application and programming models, and the build actions or other support that all this requires.

## Code-behind, Event Handler, and Partial Class Requirements

* The partial class must derive from the type that backs the root element.
* Note that under the default behavior of the markup compile build actions, you can leave the derivation blank in the partial class definition on the code-behind side. The compiled result will assume the controls root's backing type to be the basis for the partial class, even if it not specified. However, relying on this behavior is not a best practice.
* The event handlers you write in the code-behind must be instance methods and cannot be static methods. These methods must be defined by the partial class within the CLR namespace identified by ```x:Class```. You cannot qualify the name of an event handler to instruct a XAML processor to look for an event handler for event wiring in a different class scope.
* The handler must match the delegate for the appropriate event in the backing type system.
  
## x&#58;Code

Avalonia does not support ```x:Code``` in the same way that WPF does. In WPF, ```x:Code``` is used to include C# code directly within XAML files. However, Avalonia takes a different approach when it comes to combining code and markup. In Avalonia, you generally separate the code from the XAML. Here are some recommended ways to achieve similar functionality:

* **Code-behind Files**: Just like in WPF, you can use code-behind files in Avalonia. The logic associated with a XAML file is placed in a separate .xaml.cs file. This is the most straightforward way to handle events and other logic directly linked to the user interface.
* **View Models and MVVM Pattern:** Avalonia heavily promotes the use of the Model-View-ViewModel (MVVM) pattern. This pattern separates the user interface (View) from the business logic (ViewModel), promoting a cleaner and more maintainable codebase. Instead of embedding code within XAML, you bind the UI elements to properties and commands defined in the ViewModel.
* **Behaviors and Attached Properties**: For scenarios where you need to add code-like behaviour to XAML elements, you can use behaviors or attached properties. These allow you to encapsulate specific functionalities that can be reused across different views.