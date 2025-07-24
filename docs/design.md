# Design Notes

## Instance Context

Instance callbacks should be obtainable using Svelte's context. With this in mind we might be able to change our with function to provide a context layer for the instance. This would also line up better with the `withProps` function, and (to a degree), the `BoundarySave` and `BoundaryLoad` components.

This essentially means that any time an instance is made, it should be placed into context. How to determine where this should happen? This is made difficult by virtue of the page load functions being the original sources of any instances.

To move to a more remote functions friendly solution, I could:

- merge the db adapter and remote.ts concepts (indexedDB would require a non-remote.ts)
- create a
