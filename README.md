# PalettePopper

Captivating brick-breaker experience where color theory takes center stage.

## Implementation

### Architecture

The game utilizes Entity-Component-System (ECS) to manage the complexity and scalability of the game's codebase. This decision was made after careful consideration of various architectural approaches (like Object-Oriented or Component-Based architectures).

**Reasons for Choosing ECS:**

* Modularity and Flexibility:
  ECS promotes a modular design by separating entities (game objects), components (data), and systems (behavior). This modular approach allows us to independently modify and extend different aspects of the game without affecting other parts. For example, adding new features or entities becomes more straightforward as we can plug in new components and systems without rewriting existing code.
* Scalability and Performance:
  By organizing entities based on their components and processing them in separate systems, ECS improves scalability and performance. Systems can operate on batches of entities with similar components, enabling efficient processing and optimization.
* Separation of Concerns:
  ECS enforces a clear separation of concerns by decoupling data from behavior. Entities are composed of components that represent their properties and attributes, while systems define the logic that operates on these components. This separation makes the codebase more maintainable, understandable, and easier to extend.
* Dynamic Level Design:
  ECS facilitates dynamic level design by allowing us to define reusable components and systems for generating and populating levels.
* Adaptability and Iteration:
  ECS architecture is highly adaptable to change, making it easier to iterate on and evolve the game over time. As the requirements or scope of the game evolve during development, we can easily modify existing components, systems, or add new ones without causing ripple effects throughout the codebase.

#### Resources

Getting Started:

* ['Learn JavaScript by Building 7 Games - Full Course' by freeCodeCamp.org](https://youtu.be/ec8vSKJuZTk?si=NRVQajK8dl4IUJ6z)
* ['Creating a Brickbreaker style game in JavaScript, CSS, and HTML' by Nate McGraw](https://nmcgr001.medium.com/)
* ['JS for Game'](https://jsforgames.com)

ESC Framework Design:

* ['Building an ECS' by Sander Mertens](https://ajmmertens.medium.com/building-an-ecs-1-where-are-my-entities-and-components-63d07c7da742)
* ['ECS back and forth' by Michele Caini](https://skypjack.github.io/2019-02-14-ecs-baf-part-1/)
* ['Building a fast ECS on top of a slow ECS' by UnitOfTime](https://youtu.be/71RSWVyOMEY?si=FTp15Vik_aTjxvuH)
* [How to Build an Entity Component System Game in Javascript](http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript)

Physics:

*[Physics for a Block Breaker Game](https://www.smilingcatentertainment.com/physics-for-a-block-breaker-game/)
