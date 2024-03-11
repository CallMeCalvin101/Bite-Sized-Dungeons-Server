import GameState from "./models/game_state";
import { allSkills } from "./models/action";
import { Enemy, Player } from "./models/entities";

/** Methods to interact with GameState objects. */
export default class GameStateManager {
  /** Creates a new GameStateManager with a default initial game state
   *  generator for convenience.
   *
   *  Using options that are not pre-validated is undefined behaviour. */
  GameStateManager(defaultInitialState) {
    if (defaultInitialState) {
      this.defaultInitialGameState = defaultInitialState;
      return;
    }

    // Populate default initial state with default values if not given
    // TODO: Consider putting this into an external JSON file
    this.defaultInitialGameState = new GameState();
    let i;
    for (i = 0; i < 4; i++)
      this.defaultInitialGameState.addPlayer({
        skills: [
          {
            type: "Attack",
            skillCooldown: 0,
            cooldown: 1,
          },
          {
            type: "Heal",
            skillCooldown: 0,
            cooldown: 3,
          },
          {
            type: "Draining Blow",
            skillCooldown: 15,
            cooldown: 4,
          },
          {
            type: "Rampage",
            skillCooldown: 20,
            cooldown: 5,
          },
        ],
        maxHealth: 100,
        health: 100,
        attack: 10,
      });
    this.defaultInitialGameState.addEnemy({
      maxHealth: 5000,
      health: 5000,
      attack: 20,
    });
  }

  /** Returns a new GameState with the default player and enemy values
   *  if not provided.
   *
   *  Passing options that are not prevalidated is undefined behaviour. */
  createDefaultGameState() {
    let state = this.defaultInitialGameState.clone();
    state.lastModified = Date.now();
    return state;
  }

  /** The following methods should be moved to a different class (or
   *  at least separated from the "default initial state" aspect of this
   *  class) if client-server is refactored to be event-driven instead
   *  of updating the entire state each time, as done in the current
   *  implementation.
   *  That way, we can export this functionality to a library the client
   *  can also use to process functions guaranteeably in the same way
   *  as the server. */

  /** Validates and processes an Action onto the given GameState.
   *  Returns the resulting effect of the Action. */
  static processAction(action, source, target, state) {
    // TODO: Process the action and add a timestamp
    if (allSkills.has(action)) {
      const curAction = allSkills.get(action);
      curAction.effect(source, target);
      source.reduceCooldowns();
      source.resetActionCD(action);
    }
    return;
  }
  /** Generates an AIAction for the given entity using the given game state */
  static generateAIAction(id, state) {
    /* TODO: Create a basic algorithm for generating AIActions. The method
     * signature can be changed accordingly if needed for extra inputs */

    for (const enemy of state.enemies) {
      enemy.selectNewAttack();
    }
  }
}
