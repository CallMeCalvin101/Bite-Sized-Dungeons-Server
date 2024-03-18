import GameState from "./models/game_state.js";

export default class GameStateManager {

    onstructor(defaultInitialState) {
        // If defaultInitialState is provided, set it as the defaultInitialGameState, else create a new instance of GameState
        this.defaultInitialGameState = defaultInitialState || new GameState();

        // If defaultInitialState is not provided, add players and an enemy
        if (!defaultInitialState) {
            for (let i = 0; i < 4; i++) {
                this.defaultInitialGameState.addPlayer({
                    skills: [
                        {
                            type: "Attack",
                            skillCooldown: 0,
                            cooldown: 1
                        },
                        {
                            type: "Heal",
                            skillCooldown: 0,
                            cooldown: 3
                        },
                        {
                            type: "Draining Blow",
                            skillCooldown: 15,
                            cooldown: 4
                        },
                        {
                            type: "Rampage",
                            skillCooldown: 20,
                            cooldown: 5
                        }
                    ],
                    maxHealth: 100,
                    health: 100,
                    attack: 10
                });
            }

            this.defaultInitialGameState.addEnemy({
                maxHealth: 5000,
                health: 5000,
                attack: 20
            });
        }
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

}
