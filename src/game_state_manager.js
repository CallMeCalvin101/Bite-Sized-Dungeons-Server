export class GameState {
    players = [];
    enemies = [];
    lastModified = 0;

    GameState() {
        this.enemies.push({
            maxHealth: 5000,
            health: 5000,
            attack: 20,
            lastAction: 0,
            cooldownExpires: 0
        });
        this.lastModified = Date.now();
        for (let i = 0; i < 4; i++)
            this.players.push({
                maxHealth: 100,
                health: 100,
                attack: 10,
                lastAction: 0,
                cooldownExpires: 0,
                skills: [
                    {
                        type: "Draining Blow",
                        lastUsed: 0,
                        cooldownExpires: 0
                    },
                    {
                        type: "Rampage",
                        lastUsed: 0,
                        cooldownExpires: 0
                    }
                ]
            });
    }
    changeEntity(type, index, values) {
        if (type == 0) {
            this.players[index] = { ...this.players[index], ...values };
        }
        if (type == 1) {
            this.enemies[index] = { ...this.enemies[index], ...values };
        }
    }
}

/** Methods to interact with GameStates */
export default class GameStateManager {
    static createNewGame() {
    }
    /** Processes an Action onto the given GameState */
    static processAction(action, state) {
        // TODO: Create a standard data structure for actions
        // TODO: Process the action and add a timestamp
        return state;
    }
    /** Generates an AIAction for the given entity using the given game state */
    static generateAIAction(id, state) {
    }

    // TODO: Maybe create methods for different types of actions/mechanics?

    /** Processes a rampage from the source entity onto the given target */
    static doRampage(action, state) {
    }

    /** Processes a draining blow from the source entity onto the given target */
    static doDrainingBlow(action, state) {
    }
}
