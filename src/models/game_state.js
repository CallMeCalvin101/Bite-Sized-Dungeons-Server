/** Data model for validating and modifying game states. */
export default class GameState {
    GameState() {
        /* Consumers should not modify players and enemies directly.
         * Use the convenience methods addPlayer and addEnemy instead. */
        this.players = [];
        this.enemies = [];
        this.lastModified = 0;

        /* TODO: If this ends up being a server-only implementation, consider
         * adding the mutex locking functionality here */
    }
    validateEntity(entity) {
        if (!Array.isArray(entity.skills)) entity.skills = [];
        else {
            // Validate and remove invalid skills
            entity.skills = entity.skills.filter((skill) => {
                try {
                    return typeof skill.type == 'string'
                        && typeof skill.skillCooldown == 'number'
                        && typeof skill.cooldown == 'number';
                } catch {
                    return false;
                }
            });
            entity.skills = entity.skills.map((skill) => {
                skill.lastUsed = 0;
                skill.cooldownExpires = 0;
            });
        }

        // Validate and fill required values
        if (!entity.attack || typeof entity.attack !== 'number')
            entity.attack = 0;
        if (!entity.maxHealth || typeof entity.maxHealth !== 'number')
            entity.maxHealth == 0;
        if (!entity.health || typeof entity.maxHealth !== 'number')
            entity.health == 0;

        return entity;
    }
    addPlayer(player) {
        this.players.push(this.validateEntity(player));
    }
    addEnemy(enemy) {
        this.enemies.push(this.validateEntity(enemy));
    }
    clone() {
        let newState = new GameState();
        newState.players = [ ...this.players ];
        newState.enemies = [ ...this.enemies ];
        return newState;
    }
    /** Convenience function to get an entity and validate type and index */
    getEntity(type, index) {
        if (type == 'player' && this.players.length > index)
            return this.players[index];
        if (type == 'enemy' && this.enemies.length > index)
            return this.enemies[index];
    }
}
