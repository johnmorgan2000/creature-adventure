class Creature {
    constructor(){
        this.name = "Default";
        this.health = 100;
        this.mana = 100;
        this.element = "no element";

        this.levelUpValues = {
            healthUp: 1,
            manaUp: 1,
        }
    }

    levelUp(){
        var values = this.levelUpValues;
        this.health += values.healthUp;
        this.mana += values.manaUp;
    }
}

export const CREATS = [
    new Creature(), new Creature(), new Creature()
]


