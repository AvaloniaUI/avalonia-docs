---
description: CONCEPTS
---

# Input

Avalonia operates on the abstraction called pointer devices.

Avalonia provides access to the Clipboard via the `IClipboard` interface.&#x20;

Various Controls that implement `ICommandSource` have a `HotKey` property



Controls most often detect and respond to user input. The Avalonia [input system](broken-reference) uses both [direct and routed events](broken-reference) to support text input, focus management, and mouse positioning.

Applications often have complex input requirements. Avalonia provides a [command system](broken-reference) that separates user-input actions from the code that responds to those actions.
