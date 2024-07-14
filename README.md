# :video_game: PalettePopper

PalettePopper is a cozy brick-breaker game with a sprinkle of color theory.

Designed to be both challenging and visually appealing, PalettePopper offers players a delightful gaming experience right in their browser. The game is implemented using modern web technologies including HTML, CSS, and JavaScript, ensuring a smooth and responsive performance across various devices.

## Table of contents

1. [Installation](#installation)
2. [Implementation](#implementation)
3. [For Auditors](#for-auditors)
4. [Authors](#authors)

## Installation

This guide will walk you through running the game on your browser using Python HTTP Server. If using VS Code, you can also use the Live Server extension.

The game can also be played on [Github Pages](https://emmaliivak.github.io/PalettePopper/).

### :clipboard: Prerequisites

Before using the program, ensure you have the following prerequisites installed:

1. **Python 3.x**
This method uses Python's built-in server and requires Python 3.x installed on your system.

### :runner: Running the Application

1. Clone the repository to your local machine:

``` bash
git clone https://01.kood.tech/git/eliivak/make-your-game.git
```

2. Change to the project directory:

```bash
cd make-your-game
```

3. Run Python HTTP Server:

```bash
python3 -m http.server --bind 127.0.0.1 8000
```

This command starts a server that listens on localhost (127.0.0.1) port 8000.

4. Open the Game in Browser:

 Open your web browser (Chrome, Firefox, etc.) and navigate to `http://localhost:8000` to view and play the game.

## Implementation

### :triangular_ruler: Architecture

The game utilizes Entity-Component-System (ECS) to manage the complexity and scalability of the game's codebase. This decision was made after careful consideration of various architectural approaches (like Object-Oriented or Component-Based architectures).

**Reasons for Choosing ECS:**

* Modularity and Flexibility:
  ECS promotes a modular design by separating entities (game objects), components (data), and systems (behavior). This modular approach makes adding new features or entities more straightforward as we can plug in new components and systems without rewriting existing code.
* Scalability and Performance:
  By organizing entities based on their components and processing them in separate systems, ECS improves scalability and performance. Systems can operate on batches of entities with similar components, enabling efficient processing and optimization.

### :star: Core Features

* **Engaging Gameplay**
PalettePopper offers a classic brick-breaker experience with modern enhancements. Players use a paddle to bounce a ball and break colorful bricks, progressing through increasingly challenging levels.

* **Color Theory Integration**
The game integrates elements of color theory, making it both educational and visually stimulating. Players must strategically choose the color of tha paddle and combine colors to progress through levels, adding an extra layer of depth to the traditional brick-breaker gameplay.

* **Levels and Progression**
The game features multiple levels, each with increasing difficulty and complexity. Players progress through levels by successfully clearing all bricks. Each level is designed with unique patterns and challenges.

* **Performance Optimization**
The game is designed with performance optimization in mind. By utilizing an Entity-Component-System (ECS) architecture, PalettePopper ensures smooth and efficient gameplay even as the complexity of the game increases. The ECS approach enhances modularity, flexibility, and scalability, allowing for easy addition of new features and optimization of existing ones.

* **Responsive Design**
PalettePopper is designed to be played on various devices. The responsive layout and controls ensure a seamless gaming experience across different screen sizes and orientations.

#### :sparkles: Future Enhancements

Planned enhancements to further enrich the PalettePopper experience:

* **Touch Controls**: Implement intuitive touch-based controls to make the game accessible on mobile devices and tablets.
* **Powerups**: Introduce various powerups that enhance gameplay dynamics, offering players strategic advantages as they progress.
* **Expanded Level Selection**: Add a broader selection of levels with diverse challenges and creative designs to keep the gameplay engaging and fresh.
* **Enhanced Animations**: Integrate captivating animations for bricks and special effects, enhancing visual appeal and immersion.

#### :books: Resources

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

## For Auditors

You can install the game locally ([Installation Instructions](#installation)) or play it on [Github Pages](https://emmaliivak.github.io/PalettePopper/).

:scroll: [Audit instructions](https://github.com/01-edu/public/tree/master/subjects/make-your-game/audit)

## Authors

[Emma Liivak](https://01.kood.tech/git/eliivak)
