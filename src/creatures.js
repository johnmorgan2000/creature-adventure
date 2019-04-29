// Basic layout of a Creature
class Creature {
    constructor() {
        this.name = "Default";
        this.health = 1000;
        this.mana = 100;
        this.element = "no element";
        this.attackDmg = 100;
        this.focus = 70;

        this.levelUpValues = {
            healthUp: 1,
            manaUp: 1
        };
    }

    // levels the creature based on levelUpValues
    levelUp() {
        var values = this.levelUpValues;
        this.health += values.healthUp;
        this.mana += values.manaUp;
    }
}

class BoulderBack extends Creature {
    constructor(){
        super();
        this.name = "Boulder Back";
    }
}

// list of created Creatures
export const CREATS = [
    { id: 1, creatureObj: new Creature() },
    { id: 2, creatureObj: new BoulderBack() },
    { id: 3, creatureObj: new Creature() }
];
