---
id: dealing-with-platforms
title: Dealing with Multiple Platforms
---

## Managing Platform Differences & Capabilities

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

### Platform-Specific features

Beyond the universal application characteristics, you will also have to address key platform differences in your design. You may need to consider, and possibly write or tweak code specifically to handle, these differences:

* **Screen Sizes**: While some platforms (like iOS) have standardized screen sizes that are relatively easy to target, others, like Desktop and WebAssembly, enable an unlimited variety of screen dimensions which would require more effort to support in your application.

* **Navigation Metaphors**: These can vary across platforms (e.g., hardware 'back' button) and even within platforms (e.g., differences between Android 2 and 4, iPhone vs iPad).

* **Keyboards**: Some devices may come with physical keyboards, while others only feature a software keyboard. Code that detects when a soft-keyboard is obscuring part of the screen needs to be sensitive to these differences.

These platform-specific differences should be carefully considered when designing your Avalonia application to ensure a seamless user experience across all platforms. While you should strive to maximize your code reuse, you should also avoid attempting to reuse 100% of your code across all supported platforms. Instead, tailor each platform UIs to the feel at home on the device. 

### Dealing with Platform Divergence

Supporting multiple platforms from the same code-base can be achieved through abstracting platform features or [conditional code](../../guides/platforms/platform-specific-code/dotnet.md). 

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