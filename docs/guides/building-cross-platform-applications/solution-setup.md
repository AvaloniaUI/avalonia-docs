---
id: solution-setup
title: Setting Up A Cross Platform Solution
---

Despite the platform diversity, Avalonia projects all leverage the same solution file format (the Visual Studio ".SLN” file format). Solutions can be shared across development environments, providing a unified approach to multi-platform app development.

The first step to creating a new cross platform application is to create a solution. This section will elaborate on what happens next: the process of setting up the projects for building cross-platform applications with Avalonia.

## Populating the Solution

The `Avalonia Cross Platform Application` template creates a solution structure that includes the following projects to allow seamless sharing and reusability of code across multiple platforms:

:::info
[Ensure you've installed the Avalonia Templates.](../../get-started/install#install-avalonia-ui-templates)
:::

### Core Project
This forms the heart of your application and is designed to be platform-agnostic. It contains all the reusable components of your application, including business logic, view models, and views. All other projects reference this core project. The majority of your development efforts should reside here.

### Desktop Project
This project enables running the app to run on Windows, macOS, and Linux platforms, with an output type of 'WinExe'.

### Android Project 
This is a `NET-Android` based project that references the Core Project. It features a MainActivity that inherits from `AvaloniaMainActivity`, acting as the entry point for the Android application.

### iOS Project 
This is a `NET-iOS` project tailored for iOS and iPadOS platforms. The entry point for this project is the `AppDelegate`, which inherits from `AvaloniaAppDelegate`. 

### Browser Project
This WebAssembly (WASM) project allows your Avalonia application to run in a web browser. Its RuntimeIdentifier is `'browser-wasm'`.

## Core Project

Shared code projects should only reference assemblies that are universally available across all platforms. This generally includes common framework namespaces like `System`, `System.Core`, and `System.Xml`.

These shared projects aim to implement as much application functionality as possible, including UI components, thereby maximizing the reusability of code. 

By separating functionalities into distinct layers, code becomes easier to manage, test, and reuse across multiple platforms. This layered architecture approach in Avalonia UI projects promotes efficiency and scalability in application development.

## Platform-Specific Application Projects

Platform-Specific projects must reference the Core Project. The Platform Specific projects exist to enable the application to run on unique platforms including iOS, Android and WASM. 

While desktop platforms can share a single project, it may be beneficial to create a separate project for macOS using the [Xamarin.Mac Target Framework](https://learn.microsoft.com/en-us/xamarin/mac/platform/target-framework). This will enable easier distribution and packaging of your application.   




















