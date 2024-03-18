/** Data model for validating and modifying Actions.
 *  
 *  Consumers should validate whether the Action is applicable for a specific
 *  GameState or not. This only validates the base format of the action. */
export default class Action {
    constructor(type, source, target, effect) {
        this.type = typeof type === 'string' ? type : 'none';
        this.source = source; // alidate the source as well
        this.target = target; // validate the target as well
        this.effect = typeof effect === 'string' ? effect : 'none';
    }

    // Method for exporting into JSON-safe format for transmission
    toJSON() {
        return {
            type: this.type,
            source: this.source,
            target: this.target,
            effect: this.effect
        };
    }
}
