// Basic layout of a Creature
class Creature {
    constructor() {
        this.name = "Default";

        // health information
        this.maxHealth = 1000;
        this.health = this.maxHealth;

        // mana information
        this.maxMana = 100;
        this.mana = this.maxMana;

        // focus information
        this.baseFocus = 70;
        this.focus = this.baseFocus;
        this.maxFocus = 100;
        this.minFocus = 20;

        this.element = "no element";
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
        }else if (newHealth > this.maxHealth){
            this.health = this.maxHealth
        } 
        else {
            this.health = newHealth;
        }
    }

    // end setters

    isDead(){
        if (this.health <=0){
            return true;
        }
        return false;
    }

    getCreatureToWaveLevel() {
        var values = this.levelUpValues;
        this.health = values.healthUp * this.waveLevel;
        this.mana = values.manaUp * this.waveLevel;
    }

    restoreAllValues() {
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.focus = this.baseFocus;
    }

    // levels the creature based on levelUpValues
    levelUp() {
        var values = this.levelUpValues;
        this.health += values.healthUp;
        this.mana += values.manaUp;
    }
}

class BoulderBack extends Creature {
    constructor() {
        super();
        this.name = "Boulder Back";
    }

    copy() {
        return new BoulderBack();
    }
}

// list of created Creatures
export const CREATS = [
    { id: 1, creatureObj: new Creature() },
    { id: 2, creatureObj: new BoulderBack() },
    { id: 3, creatureObj: new Creature() }
];
