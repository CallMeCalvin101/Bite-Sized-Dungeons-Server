export default class GameState {
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
    getEntity(type, index) {
        if (type == 0) {
            return this.players[index];
        }
        if (type == 1) {
            return this.enemies[index];
        }
    }
    /** Change an entity's properties using the given options. */
    changeEntity(type, index, options) {
        let entity;
        if (type == 0) {
            entity = this.players[index];
        } else if (type == 1) {
            entity = this.enemies[index];
        } else {
            // Invalid input
            return;
        }

        if (options.changeHealth !== undefined &&
            Number.isInteger(options.changeHealth)) {
            entity.health += options.changeHealth;
        }
    }
}
