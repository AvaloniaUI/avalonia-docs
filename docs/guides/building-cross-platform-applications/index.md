---
id: index
title: Building Cross-Platform Applications
---

This guide introduces Avalonia and outlines how to architect a cross-platform application to maximize code re-use and deliver a high-quality UI experience across all major platforms: Windows, Linux, macOS, iOS, Android and WebAssembly.

Unlike the Xamarin.Forms and MAUI approach, which tends to yield applications with a lowest-common-denominator feature-set and a generic-looking user interface, Avalonia UI encourages leveraging its drawn UI capabilities. It allows developers to write their data storage and business logic code once, while offering a responsive and high-performing UI across all platforms. This document discusses a general architectural approach to achieve this goal.


Here is a summary of the key points for creating Avalonia cross-platform apps:

1. **Use .NET** - Develop your apps in C#, F# or VB.NET. Existing code written with .NET can be seamlessly ported to Windows, Linux, macOS, iOS, Android and WebAssembly using Avalonia.
2. **Utilize the MVVM design pattern** - Develop your application’s User Interface using the `Model/View/ViewModel` pattern. This approach promotes a clear separation between the "Model” and the "View", with the "ViewModel" acting as an intermediary. This ensures that your UI logic remains agnostic of the underlying platform, thereby promoting code reuse and maintainability.
3. **Leverage Avalonia's drawing capabilities** - Avalonia doesn't rely on native UI controls, instead, it operates similarly to Flutter, drawing the entire UI. This not only ensures a consistent look and feel across all platforms but also offers an unparalleled level of customization, allowing you to tailor the UI to your exact needs.
4. **Balance between core and platform-specific code** - The key to achieving high code reuse is striking the right balance between platform-agnostic core code and platform-specific code. The core code comprises everything that does not interact directly with the underlying operating system.















