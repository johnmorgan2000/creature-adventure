// Basic layout of a Creature
class Creature {
    constructor() {
        this.name = "Default";

        // health information
        this.maxHealth = 50;
        this.health = this.maxHealth;

        // mana information
        this.maxMana = 100;
        this.mana = this.maxMana;

        // focus information
        this.baseFocus = 70;
        this.focus = this.baseFocus;
        this.maxFocus = 100;
        this.minFocus = 40;

        // elemental information
        this.elementInformation = {
            type: "none",
            strongAgainst: "none",
            weakAgainst: "none",
            hasEffects: false
        };

        // other information
        this.attackDmg = 100;
        this.imageSrc = "./images/default.png";
        this.waveLevel = 1;

        // leveling up information
        this.levelUpValues = {
            healthUp: 1,
            manaUp: 1
        };
    }

    // setters
    setHealth(newHealth) {
        if (newHealth < 0) {
            this.health = 0;
        } else if (newHealth > this.maxHealth) {
            this.health = this.maxHealth;
        } else {
            this.health = newHealth;
        }
    }

    // end setters

    // determines if the creature is dead
    // returns a boolean
    isDead() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    }

    getCreatureToWaveLevel() {
        var values = this.levelUpValues;
        for (let i = 1; i < this.waveLevel; i++) {
            this.maxHealth += values.healthUp;
            this.maxMana += values.manaUp;
        }
    }

    restoreAllValues() {
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.focus = this.baseFocus;
    }

    // levels the creature based on levelUpValues
    levelUp() {
        var values = this.levelUpValues;
        this.maxHealth += values.healthUp;
        this.maxMana += values.manaUp;
    }
}

class BoulderBack extends Creature {
    constructor() {
        super();
        this.name = "Boulder Back";
        this.imageSrc = "./images/boulder_back.png";
        this.maxHealth = 1100;
        this.health = this.maxHealth;
    }
}

// list of created Creatures
export const CREATS = [
    { id: 1, creatureObj: new Creature() },
    { id: 2, creatureObj: new BoulderBack() },
    { id: 3, creatureObj: new Creature() },
    { id: 4, creatureObj: new Creature() },
    { id: 5, creatureObj: new Creature() },
    { id: 6, creatureObj: new Creature() },
    { id: 7, creatureObj: new Creature() },
    { id: 8, creatureObj: new Creature() },
    { id: 9, creatureObj: new Creature() }
];
