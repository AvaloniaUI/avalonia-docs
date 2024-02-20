---
id: architecture
title: Architecture
---

A crucial aspect of building cross-platform applications with Avalonia is creating an architecture that enables maximum code sharing across different platforms. By adhering to the fundamental principles of Object-Oriented Programming, you can establish a well-structured application:

1. **Encapsulation** – This involves ensuring that classes and architectural layers only expose a minimal API that performs their necessary functions while concealing the internal implementation details. In practical terms, this means that objects operate as 'black boxes', and the code utilizing them doesn't need to comprehend their internal workings. Architecturally, it implies implementing patterns like the Façade that promote a simplified API orchestrating more complex interactions on behalf of the code in higher abstract layers. Hence, the UI code should focus solely on displaying screens and accepting user input, never directly interacting with databases or other lower-level operations.
2. **Separation of Responsibilities** – Every component, whether at the architectural or class level, should have a clear and defined purpose. Each component should perform its specified tasks and expose that functionality via an API accessible to other classes needing to use it.
3. **Polymorphism** – Programming to an interface (or an abstract class) supporting multiple implementations allows core code to be written and shared across platforms while still interacting with platform-specific features offered by Avalonia.

The result of these principles is an application modelled after real-world or abstract entities with distinct logical layers. 

Separating code into layers makes the application easier to understand, test, and maintain. It's advisable to keep the code in each layer physically separate (either in different directories or even separate projects for larger applications) as well as logically separate (using namespaces). With Avalonia, you can share not just the business logic, but the UI code too across platforms, reducing the need for multiple UI projects and further enhancing code reuse.

## Typical Application Layers

In this document and the relevant case studies, we reference the following five application layers:

1. **Data Layer** – This is where non-volatile data persistence occurs, likely through a database like SQLite or LiteDB, but could be implemented with XML files or other suitable mechanisms.
2. **Data Access Layer** – This layer is a wrapper around the Data Layer providing Create, Read, Update, Delete (CRUD) operations on the data without revealing implementation details to the caller. For instance, the DAL might contain SQL queries to interact with the data, but the code referencing it doesn't need to be aware of this.
3. **Business Layer** – Sometimes referred to as the Business Logic Layer or BLL, this layer houses business entity definitions (the Model) and business logic. It is a prime candidate for the Business Facade pattern.
4. **Service Access Layer** – This layer is used to access services in the cloud, ranging from complex web services (REST, JSON) to simple retrieval of data and images from remote servers. It encapsulates networking behaviour and provides a streamlined API for consumption by the Application and UI layers.
5. **Application Layer** – This layer contains code that is generally platform-specific or code that is specific to the application (not typically reusable). In the Avalonia framework, this layer is where you decide which platform-specific features to leverage if any. The distinction between this layer and the UI layer becomes clearer with Avalonia since the UI code can be shared across platforms.
6. **User Interface (UI) Layer** – This user-facing layer contains views and the view-models that manage them. Avalonia makes it possible for this layer shared across every supported platform, unlike traditional architectures where the UI layer would be platform-specific.

An application might not contain all layers – for instance, the Service Access Layer would not be present in an application that doesn't access network resources. A simpler application might merge the Data Layer and Data Access Layer because the operations are extremely basic. With Avalonia, you have the flexibility to shape your application architecture to suit your specific needs, enjoying a high degree of code reusability across platforms.

## Common Architectural Patterns

Patterns are a well-established approach to capture recurring solutions to common problems. There are several key patterns that are valuable to comprehend when building maintainable and understandable applications with Avalonia.

### Model, View, ViewModel (MVVM) 
A popular and often misunderstood pattern, MVVM is primarily employed when constructing User Interfaces and promotes a separation between the actual definition of a UI Screen (View), the logic behind it (ViewModel), and the data that populates it (Model). The ViewModel acts as an intermediary between the View and the Model. The Model, although crucial, is a distinct and optional piece, and thus, the essence of understanding this pattern resides in the relationship between the View and ViewModel.

:::info
[Learn more about MVVM](../../concepts/the-mvvm-pattern/).
:::

### Business Façade
Also known as the Manager Pattern, this provides a simplified point of entry for intricate operations. For instance, in a Task Tracking application, you might have a TaskManager class with methods such as GetAllTasks(), GetTask(taskID), SaveTask (task), etc. The TaskManager class provides a Façade to the inner mechanisms of saving/retrieving tasks objects.

### Singleton 
The Singleton pattern ensures that only a single instance of a particular object can ever exist. For example, when using SQLite in applications, you typically want only one instance of the database. The Singleton pattern is an efficient method to enforce this.

### Provider
A pattern originally coined by Microsoft to promote code re-use across Silverlight, WPF and WinForms applications. Shared code can be written against an interface or abstract class, and platform-specific concrete implementations are written and passed in when the code is utilised. In Avalonia, since we can share both UI and application logic, this pattern can help handle platform-specific exceptions or leverage platform-specific features.

### Async
Not to be confused with the `Async` keyword, the Async pattern is used when long-running tasks need to be executed without holding up the UI or current processing. In its simplest form, the Async pattern describes that long-running tasks should be kicked off in another thread (or a similar thread abstraction such as a Task) while the current thread continues to process and listens for a response from the background process, updating the UI when data and/or state is returned. This is essential in maintaining a responsive UI in Avalonia applications.

---
Each of the aforementioned patterns will be explored in-depth as their practical application is demonstrated in our case studies. For a more comprehensive understanding of the [Facade](https://en.wikipedia.org/wiki/Facade_pattern), [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern), and [Provider](https://en.wikipedia.org/wiki/Provider_model) patterns, as well as [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) in general, you may want to delve into resources available on platforms like Wikipedia.
















