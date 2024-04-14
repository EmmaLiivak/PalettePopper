# PalettePopper

Captivating brick-breaker experience where color theory takes center stage.

## Implementation

### Architecture

The game utilizes Entity-Component-System (ECS) to manage the complexity and scalability of the game's codebase. This decision was made after careful consideration of various architectural approaches (like Object-Oriented or Component-Based architectures).

**Reasons for Choosing ECS:**

* Modularity and Flexibility:
  ECS promotes a modular design by separating entities (game objects), components (data), and systems (behavior). This modular approach makes adding new features or entities more straightforward as we can plug in new components and systems without rewriting existing code.
* Scalability and Performance:
  By organizing entities based on their components and processing them in separate systems, ECS improves scalability and performance. Systems can operate on batches of entities with similar components, enabling efficient processing and optimization.

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
* [Entity-Component-System For React JS](https://medium.com/@clevyr/entity-component-system-for-react-js-e3ab6e9be776)
* [Entity Component Systems For The Web](https://medium.com/@drvondevious/entity-component-systems-for-the-web-22065c95de4c)

Physics:

* [Physics for a Block Breaker Game](https://www.smilingcatentertainment.com/physics-for-a-block-breaker-game/)

Game States:

* [Managing States in Entity-Component-System (aka Finite-State-Machine)](https://medium.com/@ben.rasooli/managing-states-in-entity-component-system-aka-finite-state-machine-8db8d19dec46)
This article helped me with the decision to handle game states with a system-based approach instead of component-based approach. Although the system-based approach aligns more with Object-Oriented reasoning, it makes the code easier to understand and maintain. Because the game has only few game states, I found this to be a suitable solution.

Performance:

* [Simplify paint complexity and reduce paint areas](https://web.dev/articles/simplify-paint-complexity-and-reduce-paint-areas)
* [Stick to Compositor-Only Properties and Manage Layer Count](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)
