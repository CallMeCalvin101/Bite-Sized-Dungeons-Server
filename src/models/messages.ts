/* AbilityUsedMessage
 * ability_name: name of a valid action
 * source: ID of entity (Player 1,..., Player 4, Enemy)
 * target: ID of entity (Player 1,..., Player 4, Enemy)
 */

interface AbilityUsedMessage {
  msg_type: "AbilityUsedMessage";
  ability_name: String;
  source: String;
  target: String;
}

/* Game Start Message
 * enemy: The enemy as name, health, and current action
 * player: List of 4 players, sending their health and abilities
 */

interface CombatStartMessage {
  msg_type: "CombatStartMessage";
  enemy: {
    name: string;
    max_health: number;
    current_action: string;
    target: number;
  };

  players: [
    {
      id: number;
      health: number;
      abilities: string[];
      timestamp: number;
    },
    {
      id: number;
      health: number;
      abilities: string[];
      timestamp: number;
    },
    {
      id: number;
      health: number;
      abilities: string[];
      timestamp: number;
    },
    {
      id: number;
      health: number;
      abilities: string[];
      timestamp: number;
    }
  ];
}

/* Combat Update Message
 * enemy: The enemy as name, health, and current action
 * player: List of 4 players, sending their health and abilities
 */

interface CombatUpdateMessage {
  msg_type: "CombatUpdateMessage";
  enemy: {
    name: string;
    health: number;
    buffs: string[];
    current_action: string;
    target: number;
    action_timer: number;
  };

  players: [
    {
      id: number;
      health: number;
      buffs: string[];
      ability_cd: Map<string, number>;
      timestamp: number;
    },
    {
      id: number;
      health: number;
      buffs: string[];
      ability_cd: Map<string, number>;
      timestamp: number;
    },
    {
      id: number;
      health: number;
      buffs: string[];
      ability_cd: Map<string, number>;
      timestamp: number;
    },
    {
      id: number;
      health: number;
      buffs: string[];
      ability_cd: Map<string, number>;
      timestamp: number;
    }
  ];
}

interface CombatCompleteMessage {
  msg_type: "CombatCompleteMessage";
}
