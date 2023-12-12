---
description: CONCEPTS
---

# Input

Avalonia operates on the abstraction called pointer devices.

Various Controls that implement `ICommandSource` have a `HotKey` property



Controls most often detect and respond to user input. The Avalonia input system uses both [direct and routed events](../input/routed-events) to support text input, focus management, and mouse positioning.

Applications often have complex input requirements. Avalonia provides a [command system](../../basics/user-interface/adding-interactivity) that separates user-input actions from the code that responds to those actions.
