//Base class which player and enemy inherit from

class Entity {
  constructor() {
    this.health = 0;
    this.statuses = [];
    this.actTimestamp = 0;
  }

  getHealth() {
    return this.health;
  }

  isAlive() {
    return this.health > 0;
  }

  damage(n) {
    this.health -= n;
  }

  heal(n) {
    this.health += n;
  }

  setStatus(status) {
    if (!this.statuses.includes(status)) {
      this.statuses.push(status);
    }
  }

  hasStatus(status) {
    return this.statuses.includes(status);
  }

  setNewTimestamp(timestamp) {
    this.actTimestamp = timestamp;
  }

  canAct() {
    return Date.now() <= this.actTimestamp;
  }
}

// Player class
export class Player extends Entity {
  constructor() {
    this.health = 100;
    this.skills = [];
    this.skillCD = [];
    this.statuses = [];
    this.actAgain = 0;
  }

  // Adds a new attack with a cooldown of cd
  addSkill(skill, cd) {
    this.skills.push(skill);
    this.skillCD.push(cd);
  }

  setSkills(newSkills) {
    this.skills = newSkills;
  }

  getSkills() {
    return this.skills;
  }

  getCooldowns() {
    return this.skillCD;
  }

  // Iterates through all of the player's skills and reduce it by 1
  reduceCooldowns() {
    for (const cd of this.skillCD) {
      if (cd > 0) {
        cd -= 1;
      }
    }
  }
}

// Enemy Class
export class Enemy extends Entity {
  constructor() {
    this.health = 100;
    this.attacks = [];
    this.attackChances = [];
    this.curAttack = "";
    this.curTarget = 1;
    this.statuses = [];
    this.actAgain = 0;
  }

  // Adds a new attack with chance % to activate (in decimal)
  addAttack(name, chance) {
    this.attacks.push(name);
    this.attackChances.push(chance);
  }

  selectNewAttack() {
    const chance = Math.random() * 100;
    let divider = 0;

    for (let i = 0; i < this.attacks.length; i++) {
      divider += this.attackChances[i];
      if (chance <= divider) {
        this.curAttack = this.attacks[i];
        return;
      }
    }

    this.curAttack = this.attacks[0];
  }

  // Changes the target if there is one, otherwise randomly select a partymember
  selectNewTarget(partyList, target = -1) {
    if (target > -1) {
      this.curTarget = target;
      return;
    }

    let numAlliesDead = 0;
    for (const ally of partyList) {
      if (!ally.isAlive()) {
        numAlliesDead += 1;
      }
    }

    if (numAlliesDead >= partyList.length) {
      return;
    }

    const numAllies = partyList.length;
    this.curTarget = Math.floor(Math.random() * numAllies);
    while (!partyList[this.curTarget].isAlive()) {
      this.curTarget = Math.floor(Math.random() * numAllies);
    }
  }
}
