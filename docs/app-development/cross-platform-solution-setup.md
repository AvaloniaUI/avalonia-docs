---
index: cross-platform-solution-setup
title: Setting up a cross-platform solution
description: Structure an Avalonia solution with a shared core project and platform-specific project heads.
doc-type: explanation
---

Despite the platform diversity, Avalonia projects all use the same solution file format (the Visual Studio `.SLN` file format). Solutions can be shared across development environments, providing a unified approach to multi-platform app development.

The first step to creating a new cross platform application is to create a solution. This section will elaborate on what happens next: the process of setting up the projects for building cross-platform applications with Avalonia.

## Populating the solution

The `Avalonia Cross Platform Application` template creates a solution structure that includes the following projects to allow sharing and reuse of code across multiple platforms:

:::info
[Ensure you've installed the Avalonia Templates.](/docs/get-started/#installing-avalonia-templates)
:::

### Core project
This forms the heart of your application and is designed to be platform-agnostic. It contains all the reusable components of your application, including business logic, view models, and views. All other projects reference this core project. The majority of your development efforts should reside here.

### Desktop project
This project enables the app to run on Windows, macOS, and Linux platforms, with an output type of `WinExe`.

### Android project
This is a `NET-Android` based project that references the core project. It features a `MainActivity` that inherits from `AvaloniaMainActivity`, acting as the entry point for the Android application.

### iOS project
This is a `NET-iOS` project tailored for iOS and iPadOS platforms. The entry point for this project is the `AppDelegate`, which inherits from `AvaloniaAppDelegate`.

### Browser project
This WebAssembly (WASM) project allows your Avalonia application to run in a web browser. Its `RuntimeIdentifier` is `browser-wasm`.

## Core project

Shared code projects should only reference assemblies that are universally available across all platforms. This generally includes common framework namespaces like `System`, `System.Core`, and `System.Xml`.

These shared projects aim to implement as much application functionality as possible, including UI components, thereby maximizing the reusability of code. 

By separating functionalities into distinct layers, code becomes easier to manage, test, and reuse across multiple platforms. This layered architecture approach in Avalonia projects promotes efficiency and scalability in application development.

## Platform-specific application projects

Platform-specific projects must reference the core project. The platform-specific projects exist to enable the application to run on unique platforms including iOS, Android and WASM.

While desktop platforms can share a single project, it may be beneficial to create a separate project for macOS using the [Xamarin.Mac Target Framework](https://learn.microsoft.com/en-us/xamarin/mac/platform/target-framework). This will enable easier distribution and packaging of your application.

## See also

- [Cross-Platform Architecture](/docs/fundamentals/cross-platform-architecture): Solution structure and platform branching patterns.