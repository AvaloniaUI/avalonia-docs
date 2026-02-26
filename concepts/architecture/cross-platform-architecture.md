---
id: cross-platform-architecture
title: Cross-platform architecture
---

## Summary

Unlike the Xamarin.Forms and MAUI approach, which tends to yield applications with a lowest-common-denominator feature-set and a generic-looking user interface, Avalonia UI encourages leveraging its drawn UI capabilities. It allows developers to write their data storage and business logic code once, while offering a responsive and high-performing UI across all platforms. This document discusses a general architectural approach to achieve this goal.

Here is a summary of the key points for creating Avalonia cross-platform apps:

1. **Use .NET** - Develop your apps in C#, F# or VB.NET. Existing code written with .NET can be seamlessly ported to Windows, Linux, macOS, iOS, Android and WebAssembly using Avalonia.
2. **Utilize the MVVM design pattern** - Develop your application’s User Interface using the `Model/View/ViewModel` pattern. This approach promotes a clear separation between the "Model” and the "View", with the "ViewModel" acting as an intermediary. This ensures that your UI logic remains agnostic of the underlying platform, thereby promoting code reuse and maintainability.
3. **Leverage Avalonia's drawing capabilities** - Avalonia doesn't rely on native UI controls, instead, it operates similarly to Flutter, drawing the entire UI. This not only ensures a consistent look and feel across all platforms but also offers an unparalleled level of customization, allowing you to tailor the UI to your exact needs.
4. **Balance between core and platform-specific code** - The key to achieving high code reuse is striking the right balance between platform-agnostic core code and platform-specific code. The core code comprises everything that does not interact directly with the underlying operating system.

## Architecture principles

A crucial aspect of building cross-platform applications with Avalonia is creating an architecture that enables maximum code sharing across different platforms. By adhering to the fundamental principles of Object-Oriented Programming, you can establish a well-structured application:

1. **Encapsulation** – This involves ensuring that classes and architectural layers only expose a minimal API that performs their necessary functions while concealing the internal implementation details. In practical terms, this means that objects operate as 'black boxes', and the code utilizing them doesn't need to comprehend their internal workings. Architecturally, it implies implementing patterns like the Façade that promote a simplified API orchestrating more complex interactions on behalf of the code in higher abstract layers. Hence, the UI code should focus solely on displaying screens and accepting user input, never directly interacting with databases or other lower-level operations.
2. **Separation of Responsibilities** – Every component, whether at the architectural or class level, should have a clear and defined purpose. Each component should perform its specified tasks and expose that functionality via an API accessible to other classes needing to use it.
3. **Polymorphism** – Programming to an interface (or an abstract class) supporting multiple implementations allows core code to be written and shared across platforms while still interacting with platform-specific features offered by Avalonia.

The result of these principles is an application modelled after real-world or abstract entities with distinct logical layers. 

Separating code into layers makes the application easier to understand, test, and maintain. It's advisable to keep the code in each layer physically separate (either in different directories or even separate projects for larger applications) as well as logically separate (using namespaces). With Avalonia, you can share not just the business logic, but the UI code too across platforms, reducing the need for multiple UI projects and further enhancing code reuse.

### Typical Application Layers

In this document and the relevant case studies, we reference the following five application layers:

1. **Data Layer** – This is where non-volatile data persistence occurs, likely through a database like SQLite or LiteDB, but could be implemented with XML files or other suitable mechanisms.
2. **Data Access Layer** – This layer is a wrapper around the Data Layer providing Create, Read, Update, Delete (CRUD) operations on the data without revealing implementation details to the caller. For instance, the DAL might contain SQL queries to interact with the data, but the code referencing it doesn't need to be aware of this.
3. **Business Layer** – Sometimes referred to as the Business Logic Layer or BLL, this layer houses business entity definitions (the Model) and business logic. It is a prime candidate for the Business Facade pattern.
4. **Service Access Layer** – This layer is used to access services in the cloud, ranging from complex web services (REST, JSON) to simple retrieval of data and images from remote servers. It encapsulates networking behaviour and provides a streamlined API for consumption by the Application and UI layers.
5. **Application Layer** – This layer contains code that is generally platform-specific or code that is specific to the application (not typically reusable). In the Avalonia framework, this layer is where you decide which platform-specific features to leverage if any. The distinction between this layer and the UI layer becomes clearer with Avalonia since the UI code can be shared across platforms.
6. **User Interface (UI) Layer** – This user-facing layer contains views and the view-models that manage them. Avalonia makes it possible for this layer shared across every supported platform, unlike traditional architectures where the UI layer would be platform-specific.

An application might not contain all layers – for instance, the Service Access Layer would not be present in an application that doesn't access network resources. A simpler application might merge the Data Layer and Data Access Layer because the operations are extremely basic. With Avalonia, you have the flexibility to shape your application architecture to suit your specific needs, enjoying a high degree of code reusability across platforms.

### Common Architectural Patterns

Patterns are a well-established approach to capture recurring solutions to common problems. There are several key patterns that are valuable to comprehend when building maintainable and understandable applications with Avalonia.

#### Model, View, ViewModel (MVVM) 
A popular and often misunderstood pattern, MVVM is primarily employed when constructing User Interfaces and promotes a separation between the actual definition of a UI Screen (View), the logic behind it (ViewModel), and the data that populates it (Model). The ViewModel acts as an intermediary between the View and the Model. The Model, although crucial, is a distinct and optional piece, and thus, the essence of understanding this pattern resides in the relationship between the View and ViewModel.

:::info
[Learn more about MVVM](/concepts/architecture/the-mvvm-pattern).
:::

#### Business Façade
Also known as the Manager Pattern, this provides a simplified point of entry for intricate operations. For instance, in a Task Tracking application, you might have a TaskManager class with methods such as GetAllTasks(), GetTask(taskID), SaveTask (task), etc. The TaskManager class provides a Façade to the inner mechanisms of saving/retrieving tasks objects.

#### Singleton 
The Singleton pattern ensures that only a single instance of a particular object can ever exist. For example, when using SQLite in applications, you typically want only one instance of the database. The Singleton pattern is an efficient method to enforce this.

#### Provider
A pattern originally coined by Microsoft to promote code re-use across Silverlight, WPF and WinForms applications. Shared code can be written against an interface or abstract class, and platform-specific concrete implementations are written and passed in when the code is utilised. In Avalonia, since we can share both UI and application logic, this pattern can help handle platform-specific exceptions or leverage platform-specific features.

#### Async
Not to be confused with the `Async` keyword, the Async pattern is used when long-running tasks need to be executed without holding up the UI or current processing. In its simplest form, the Async pattern describes that long-running tasks should be kicked off in another thread (or a similar thread abstraction such as a Task) while the current thread continues to process and listens for a response from the background process, updating the UI when data and/or state is returned. This is essential in maintaining a responsive UI in Avalonia applications.

Each of the aforementioned patterns will be explored in-depth as their practical application is demonstrated in our case studies. For a more comprehensive understanding of the [Facade](https://en.wikipedia.org/wiki/Facade_pattern), [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern), and [Provider](https://en.wikipedia.org/wiki/Provider_model) patterns, as well as [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) in general, you may want to delve into resources available on platforms like Wikipedia.

## Managing Platform Differences and Capabilities

Platform differences aren't just an issue in cross-platform development; even devices within the same platform can possess diverse capabilities.

Most notably, this includes differences in screen size, but numerous other device characteristics may also vary, requiring the application to verify certain capabilities and adapt its behavior based on their presence (or absence). This is especially important when designing for cross paradigm situations, with desktop and mobile operating systems providing very different interaction models.  

Therefore, all applications must be equipped to handle a graceful scaling back of functionality, or risk presenting a minimal feature set that does not leverage the full potential of the underlying platform. 

### Examples of Platform Divergence

There are certain fundamental characteristics inherent to applications that are universally applicable. These are high-level concepts that hold true across all devices and platforms and can thus form the core of your application's design:

* A screen, which can display your application UI.
* Some form of input devices, typically touch for mobile and mouse and keyboard for desktop. 
* Display views of data.
* Editing data.
* Navigation capabilities. 

### Platform-specific features

Beyond the universal application characteristics, you will also have to address key platform differences in your design. You may need to consider, and possibly write or tweak code specifically to handle, these differences:

* **Screen Sizes**: While some platforms (like iOS) have standardized screen sizes that are relatively easy to target, others, like Desktop and WebAssembly, enable an unlimited variety of screen dimensions which would require more effort to support in your application.

* **Navigation Metaphors**: These can vary across platforms (e.g., hardware 'back' button) and even within platforms (e.g., differences between Android 2 and 4, iPhone vs iPad).

* **Keyboards**: Some devices may come with physical keyboards, while others only feature a software keyboard. Code that detects when a soft-keyboard is obscuring part of the screen needs to be sensitive to these differences.

These platform-specific differences should be carefully considered when designing your Avalonia application to ensure a seamless user experience across all platforms. While you should strive to maximize your code reuse, you should also avoid attempting to reuse 100% of your code across all supported platforms. Instead, tailor each platform UIs to the feel at home on the device. 

### Dealing with Platform Divergence

Supporting multiple platforms from the same code-base can be achieved through abstracting platform features or [conditional code](/docs/platform-specific-guides/dotnet). 

* **Platform Abstraction**: This approach leverages the Business Façade pattern to provide uniform access across platforms. It abstracts the unique platform implementations into a single, cohesive API. The primary advantage is the ability to write platform-agnostic code, enhancing code reusability and maintainability. However, this approach may not fully exploit the unique features and capabilities of each platform.

## Platform Abstraction

In Avalonia, you can employ class abstractions to streamline your development process across different platforms. This can be achieved using interfaces or base classes defined in the shared code, then implemented or extended in platform-specific projects.

### Interfaces

The utilization of interfaces empowers you to create platform-specific classes that can be incorporated into your shared libraries for code reuse.

#### How it works
The interface is defined within the shared code and passed into the shared library as a parameter or property. The platform-specific applications can then implement the interface, allowing shared code to process it effectively.

#### Advantages
The main advantage of this approach is that the implementation can contain platform-specific code and even reference platform-specific external libraries, offering high flexibility.

####  Disadvantages
A potential disadvantage is the need to create and pass implementations into the shared code. If the interface is employed deep within the shared code, it may have to be passed through multiple method parameters, which might lead to a more complex call chain. If the shared code uses numerous different interfaces, they all must be created and set within the shared code.

### Inheritance
Your shared code can implement abstract or virtual classes that could be extended in one or more platform-specific projects. This technique resembles the use of interfaces but provides some already implemented behaviors.

#### How it works
By using inheritance, you can create base classes in your shared code that can be optionally extended in your platform-specific projects. However, as C# allows only single inheritance, this approach may influence your future API design. Hence, use inheritance with caution.

#### Advantages and Disadvantages
The advantages and disadvantages of using interfaces apply equally to inheritance. However, an additional advantage of inheritance is that the base class can contain some implementation code. This potentially could provide an entire platform-agnostic implementation that can be optionally extended as needed.

## Using Maui.Essentials

Another approach would be to use any library that abstracts some features under a common higher level API.
[Maui.Essentials](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/?view=net-maui-8.0) is one of these libraries, that can be used with Avalonia on .NET 8 or higher via [Microsoft.Maui.Essentials](https://www.nuget.org/packages/Microsoft.Maui.Essentials) nuget package.
Alternatively, you can use full set of MAUI packages with [Avalonia.Maui](https://github.com/AvaloniaUI/AvaloniaMauiHybrid) hybrid package. This package provides a deeper integration with MAUI packages.

:::note
While `Maui.Essentials` is a great library that abstracts platform APIs, MAUI itself has a limited set of supported platforms. It doesn't provide APIs for Linux, Browser and macOS (non macCatalyst) platforms.
:::