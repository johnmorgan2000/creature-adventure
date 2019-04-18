// Basic layout of a Creature
class Creature {
    constructor() {
        this.name = "Default";
        this.health = 100;
        this.mana = 100;
        this.element = "no element";

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

// list of created Creatures
export const CREATS = [
    { id: 1, creatureObj: new Creature() },
    { id: 2, creatureObj: new Creature() },
    { id: 3, creatureObj: new Creature() }
];
