/** Data model for validating and modifying Actions.
 *  
 *  Consumers should validate whether the Action is applicable for a specific
 *  GameState or not. This only validates the base format of the action. */
export default class Action {
    // TODO: Method for exporting into JSON-safe format for transmission
    toJSON() {
    }

    Action(type, source, target) {
        this.type = typeof type == 'string' ? type : 'none' ;
        this.effect = typeof effect == 'string' ? effect : 'none';
        
    }
}
