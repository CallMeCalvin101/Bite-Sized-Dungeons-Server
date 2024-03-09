import { Player, Enemy } from "./entities";

/** Data model for validating and modifying Actions.
 *
 *  Consumers should validate whether the Action is applicable for a specific
 *  GameState or not. This only validates the base format of the action. */
export default class Action {
  // TODO: Method for exporting into JSON-safe format for transmission

  Action(type, source, target) {
    this.type = typeof type == "string" ? type : "none";
    this.effect = typeof effect == "string" ? effect : "none";
  }
}

// Defines Attack Types
const TARGET_ENEMY = "TYPE_ENEMY";
const TARGET_ALLY = "TYPE_ALLY";

// Defines Status Types
const ATK_UP = "ATK_UP";
const ATK_DOWN = "ATK_DOWN";
const DEF_UP = "DEF_UP";
const DEF_DOWN = "DEF_DOWN";

function calcDamage(source, target, num) {
  let curDamage = num;
  if (source.hasStatus(ATK_UP)) {
    curDamage *= 1.5;
  }

  if (source.hasStatus(ATK_DOWN)) {
    curDamage /= 1.5;
  }

  if (target.hasStatus(DEF_UP)) {
    curDamage /= 1.5;
  }

  if (target.hasStatus(DEF_DOWN)) {
    curDamage *= 1.5;
  }

  return curDamage;
}

class Skill {
  name = "";
  type = "";
  description = "";
  actRate = 0;
  cooldown = 0;

  effect(source, target) {
    return;
  }
}

export const allSkills = new Map();

/* A Basic attack that is there to be able to pass turns
 */

class BasicAttack extends Skill {
  name = "basic strike";
  type = TARGET_ENEMY;
  description = "a simple strike that does a little damage (Recharge: Normal)";
  actRate = 1;
  cooldown = 0;

  effect(source, target) {
    target.damage(calcDamage(source, target, 10));
  }
}

allSkills.set("basic strike", new BasicAttack());

/* A weak heal to help pass the turns
 */

class LightHeal extends Skill {
  name = "light heal";
  type = TARGET_ALLY;
  description = "heal an ally for 20 health (Recharge: Slow)";
  actRate = 0.5;
  cooldown = 0;

  effect(source, target) {
    if (target.isAlive()) {
      target.heal(20);
    }
  }
}

allSkills.set("light heal", new LightHeal());

/* A heal used to keep allies alive
 */

class Heal extends Skill {
  name = "heal";
  type = TARGET_ALLY;
  description = "heal an ally for 50 health (Recharge: Slow, CD: 2)";
  actRate = 0.5;
  cooldown = 2;

  effect(source, target) {
    if (target.isAlive()) {
      target.heal(50);
    }
  }
}

allSkills.set("heal", new Heal());

/* A strong multi-hit attack with long recharge
 */

class Rampage extends Skill {
  name = "rampage";
  type = TARGET_ENEMY;
  description =
    "Deals 5 heavy blows to the enemy (Recharge: Extra Slow, CD: 7)";
  actRate = 0.15;
  cooldown = 7;

  effect(source, target) {
    const val = calcDamage(source, target, 16);
    setTimeout(() => {
      target.damage(val);
    }, 200);
    setTimeout(() => {
      target.damage(val);
    }, 400);
    setTimeout(() => {
      target.damage(val);
    }, 600);
    setTimeout(() => {
      target.damage(val);
    }, 800);
  }
}

allSkills.set("rampage", new Rampage());

/* A strike that reduces the defense of the enemy
 */

class PierceArmor extends Skill {
  name = "pierce armor";
  type = TARGET_ENEMY;
  description = "Deals damage and reduces defense (Recharge: Normal, CD: 5)";
  actRate = 1;
  cooldown = 5;

  effect(source, target) {
    target.damage(calcDamage(source, target, 20));
    target.setStatus(DEF_DOWN);
  }
}

allSkills.set("pierce armor", new PierceArmor());

/* A strike that reduces the attack of the enemy
 */

class WeakeningBlow extends Skill {
  name = "weakening blow";
  type = TARGET_ENEMY;
  description = "Deals damage and reduces attack (Recharge: Normal, CD: 5)";
  actRate = 1;
  cooldown = 5;

  effect(source, target) {
    target.damage(calcDamage(source, target, 20));
    target.setStatus(ATK_DOWN);
  }
}

allSkills.set("weakening blow", new WeakeningBlow());

/* A strike that damages the enemy and heals the user as well
 */

class DrainingBlow extends Skill {
  name = "draining blow";
  type = TARGET_ENEMY;
  description = "Drains the health form the enemy (Recharge: Normal, CD: 5)";
  actRate = 1;
  cooldown = 5;

  effect(source, target) {
    const val = calcDamage(source, target, 20);
    target.damage(val);
    source.heal(val);
  }
}

allSkills.set("draining blow", new DrainingBlow());

/* An attack buff
 */

class Empower extends Skill {
  name = "empower";
  type = TARGET_ALLY;
  description = "Drains the health form the enemy (Recharge: Normal, CD: 7)";
  actRate = 1;
  cooldown = 7;

  effect(source, target) {
    target.setStatus(ATK_UP);
  }
}

allSkills.set("empower", new Empower());
