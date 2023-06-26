---
id: animations
title: Animations
---

# Animations

The *Avalonia UI* animation system enables the creation of visually dynamic and interactive applications. This system is built around the principle of modifying properties over time, allowing for both simple and complex state transitions.  

## **Fundamental Concepts**

Before we delve into *Avalonia UI*'s powerful animation system, we must grasp the fundamental concepts
that form the basis of  *Avalonia UI*'s animation capabilities: *Avalonia Properties* and the Layout system.

*[Avalonia Properties](https://docs.avaloniaui.net/docs/authoring-controls/defining-properties)* are a
core part of *Avalonia UI*'s infrastructure, influencing everything from rendering to layout to animation.
They are different from standard .NET properties, as their value can be influenced by numerous factors,
such as animations, styles, or data bindings. This dynamic nature makes them well-suited for animations,
as their values can be changed over a period of time, thereby creating an animated effect on the UI elements.

The *[Layout system](https://v11.docs.avaloniaui.net/concepts/layout#the-layout-system)*, 
on the other hand, is a mechanism that arranges UI elements on the screen. 
It determines the size and position of these elements through a 'measure' and 'arrange' process,
thereby deciding the space each element occupies and where it is positioned. 
A deep understanding of this system is necessary as it often interacts with animations; 
for instance, when animating a visual transformation, the layout system decides how and where the transformation occurs.

In essence, animations are about manipulating these properties over a time period, 
creating an illusion of motion or transformation. With this understanding, we can 
now delve deeper into the specific types of animations *Avalonia UI* offers, and how 
to effectively apply them to create interactive and engaging applications.

## Types of Animations

- **Transitions**: Transitions are designed to provide a simple mechanism for animating
  a change in a property value. Rather than abrupt changes between states, transitions
  enable a smooth progression from one state to another over a specified duration.
  This type of animation is ideally suited for straightforward changes,
  such as altering the color of a button when hovered over.
  
- **Keyframe Animations**:  This type of animation is for situations
  that requires a higher degree of control. It also allows developers to
  define multiple stages, or 'keyframes', throughout the animation's timeline,
  each with distinct property values. It is best suited for more complex
  animations that need to manage multiple states over time.
