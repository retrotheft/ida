# Instance Driven Architecture

Designed for rapid prototyping, Instance Driven Architecture lets you set up database tables and schemas quickly, and then interface with them using routes.

Further, all relational data loading and saving is handled through a class instance for each table which contains getters for components that embed the db query logic.

Benefits of this approach:
   - Components no longer contain any saving or loading logic, and are purely UI driven.
   - The same component can be used in different contexts, with different queries for loading data.
   - All possible components that can be in a class instance's view are on the instance, so less imports.

If you're looking to quickly prototype an app, you only need to do the following:
   - define the data schemas.
   - write your UI components.
   - create getters for your components in each table's class

It does require some initial setup for the data schemas and class instances, but once that's done, adding relational data becomes trivial, and your components stay super lean.
