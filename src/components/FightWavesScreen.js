import React, { Component } from "react";
import { BattleLog } from "./BattleLog";
import { HealthBar } from "./HealthBar";
// file search tags are here for me to navigate the file easier
// and leave tags for coming back to later or finding a section of code

// file search table of contents
// ---Return to tags---
//      clean
// ---Method sections---
//      handlers --to-- end handlers
//      bindings

// The component responsible for the fighting game play
export class FightWavesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battlePhase: "playersTurn",
            playerCreature: this.props.playerCreature,
            enemyCreature: this.returnRandomCreature(),
            counter: 1,
            isAttacking: true,
            counterDirection: 1,
            displayDamageDone: false,
            wave: 1,
            battleLog: []
            // disabled: {
            //     baseAtkBtn: false,
            //     stopBtn: fa
            // }
        };

        // references
        this.meterPointRef = React.createRef();
        this.meterStopperBtnRef = React.createRef();
        // this.playerHealthRef = React.createRef();
        // this.enemyHealthRef = React.createRef();

        // other global variables
        this.changeGamePhase = this.props.changeGamePhase;
        this.meterTickInterval = null;
        this.playerAtkDamage = 0;
        this.enemyAtkDamage = 0;
        this.blockAttack = false;
        this.playThroughStats = {
            creature: this.state.playerCreature.name,
            waves: this.state.wave
        };

        // bindings
        this.meterTickIntervalHandler = this.meterTickIntervalHandler.bind(
            this
        );

        this.changeToAttackPhase = this.changeToAttackPhase.bind(this);
    }

    // main render method
    render() {
        switch (this.state.battlePhase) {
            case "playersTurn":
                return this.returnPlayersTurnRender();
            case "attackPhase":
                return this.returnAttackPhaseRender();
            case "enemysTurn":
                return this.returnEnemysTurnRender();
            default:
                return this.returnPlayersTurnRender();
        }
    }

    // possibly another component later
    // a block of code to display the creatures screen
    creatureDisplayBlock() {
        return (
            <div className="creatureDisplayBlock">
                <div className="displayBlock player">
                    <HealthBar
                        createdRef={this.playerHealthRef}
                        currentHealth={this.state.playerCreature.health}
                        maxHealth={this.state.playerCreature.maxHealth}
                    />
                    <p>{this.state.playerCreature.name}</p>

                    <img src={this.state.playerCreature.imageSrc} alt="" />
                </div>

                <div className="displayBlock enemy">
                    <HealthBar
                        createdRef={this.enemyHealthRef}
                        currentHealth={this.state.enemyCreature.health}
                        maxHealth={this.state.enemyCreature.maxHealth}
                    />
                    <p>{this.state.enemyCreature.name}</p>
                    <img src={this.state.enemyCreature.imageSrc} alt="" />
                </div>
            </div>
        );
    }

    // returns the attack phase render block
    returnAttackPhaseRender() {
        return (
            <div id="fightWavesScreen">
                <div className="roundBanner">
                    <p>Player's Turn</p>
                </div>
                {this.creatureDisplayBlock()}

                <BattleLog battleLog={this.state.battleLog} />

                <div className="bottomMeterContainer">
                    <p>Attacking</p>
                    <div className="attackMeter meter">
                        <div className="meterPoint" ref={this.meterPointRef} />
                    </div>

                    <button
                        ref={this.meterStopperBtnRef}
                        onClick={() => this.hitBtnClickHandler()}
                    >
                        Stop
                    </button>
                </div>
            </div>
        );
    }

    // should be replaced in battle log soon to come
    returnDamageDoneBlock() {
        if (this.state.displayDamageDone) {
            return (
                <div>
                    <p>You did {this.playerAtkDamage} Damage!</p>
                </div>
            );
        }
    }

    // returns the players turn change of screen
    returnPlayersTurnRender() {
        return (
            <div id="fightWavesScreen">
                <div className="roundBanner">
                    <p>Player's Turn</p>
                </div>

                {this.creatureDisplayBlock()}

                <div id="bottomOptionsBar">
                    <button onClick={() => this.baseAtkClickHandler()}>
                        Base Attack
                    </button>
                </div>
            </div>
        );
    }

    returnEnemysTurnRender() {
        if (this.state.isAttacking === true) {
            return (
                <div id="fightWavesScreen">
                    <div className="roundBanner">
                        <p>Opponent's Turn</p>
                    </div>
                    {this.creatureDisplayBlock()}

                    <BattleLog battleLog={this.state.battleLog} />

                    <div className="bottomMeterContainer">
                        <p>Block</p>
                        <div className="defendMeter meter">
                            <div
                                className="meterPoint"
                                ref={this.meterPointRef}
                            />
                        </div>

                        <button
                            ref={this.meterStopperBtnRef}
                            onClick={() => this.blockBtnClickHandler()}
                        >
                            Stop
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="fightWavesScreen">
                    {this.creatureDisplayBlock()}

                    <p>Opponent is thinking</p>
                </div>
            );
        }
    }

    // starts the meterTickInterval
    startTicker() {
        this.meterTickInterval = setInterval(this.meterTickIntervalHandler, 10);
    }

    // stops the meterTickInterval
    stopTicker() {
        clearInterval(this.meterTickInterval);
    }

    addToBattleLog(entry) {
        var log = this.state.battleLog;
        log.push(entry);
        if (log.length > 3) {
            log.shift();
        }

        this.setState({
            battleLog: log
        });
    }

    // resets the counter in the state
    resetCounter() {
        this.setState({
            counter: 1
        });
    }

    // returns a counter thats not over 99 or equal to 0
    getNewCounter() {
        var newCounter;
        if (this.state.counter === 0) {
            newCounter = 1;
        } else {
            newCounter = 99;
        }
        return newCounter;
    }

    // changes the battlePhase in state to "attackPhase"
    changeToAttackPhase() {
        this.setState({
            battlePhase: "attackPhase",
            isAttacking: true
        });
    }

    // returns a random creature obj
    returnRandomCreature() {
        const randCreat = this.props.creatures[
            Math.floor(Math.random() * this.props.creatures.length)
        ].creatureObj;

        return Object.assign({ __proto__: randCreat.__proto__ }, randCreat);
    }

    // -file search tag- DRY
    // Violates the Don't Repeat Yourself rule
    getNewPlayerAttackDamage() {
        if (this.blockAttack === false) {
            var counter = this.state.counter;
            var playerDamage = this.state.playerCreature.attackDmg;
            this.playerAtkDamage = Math.floor(playerDamage * (counter / 100));
            this.addToBattleLog("You attacked for " + this.playerAtkDamage);
        } else {
            this.playerAtkDamage = 0;
            this.addToBattleLog("Your attack was blocked");
        }
    }

    // -file search tag- DRY
    // Violates the Don't Repeat Yourself rule
    getNewEnemyAttackDamage() {
        if (this.blockAttack === false) {
            var counter = this.randomEnemyCounter();
            var enemyDamage = this.state.enemyCreature.attackDmg;
            this.enemyAtkDamage = Math.floor(enemyDamage * (counter / 100));
            this.addToBattleLog(
                "Your Opponent attacked for " + this.enemyAtkDamage
            );
        } else {
            this.enemyAtkDamage = 0;
            this.addToBattleLog("You blocked the attack");
        }
    }

    // simulates the player's ability to stop the counter
    randomEnemyCounter() {
        return (
            Math.random() * (100 - this.state.enemyCreature.focus) +
            this.state.enemyCreature.focus
        );
    }

    // takes the counter and turns it into a block percentage
    // takes in "player" or "enemy" to determine the calculations needed.
    calculateBlockFromCounter(stringFor) {
        var distFrom50;
        switch (stringFor) {
            case "player":
                distFrom50 = Math.abs(50 - this.state.counter);
                break;
            case "enemy":
                distFrom50 = Math.abs(100 - this.randomEnemyCounter());
                break;
            default:
                distFrom50 = Math.abs(50 - this.state.counter);
                break;
        }

        if (distFrom50 === 0 || distFrom50 <= 10) {
            this.blockAttack = true;
        } else {
            this.blockAttack = false;
        }
    }

    // changes the isAttacking state to the either true or false
    toggleIsAttacking() {
        this.setState({
            isAttacking: !this.state.isAttacking
        });
    }

    // sets the new creat obj by giving the method a string of
    // either "player" or "enemy" to apply given damage
    applyDamage(strPlayerOrEnemy, damage) {
        var newCreat;
        if (strPlayerOrEnemy === "player") {
            newCreat = this.state.playerCreature;
            newCreat.setHealth(newCreat.health - damage);
            this.setState({
                playerCreature: newCreat
            });
        } else if (strPlayerOrEnemy === "enemy") {
            newCreat = this.state.enemyCreature;
            newCreat.setHealth(newCreat.health - damage);
            this.setState({
                enemyCreature: newCreat
            });
        }
    }

    // determines what the enemy will do
    conductBotActions() {
        var action = "attack";
        if (action === "attack") {
            this.toggleIsAttacking();
            this.startTicker();
        }
    }

    // -file search tag- handlers
    baseAtkClickHandler() {
        this.changeToAttackPhase();
        this.startTicker();
    }

    // adds disabled to the element to the stopper btn
    disabler() {
        this.meterStopperBtnRef.current.setAttribute("disabled", true);
    }

    // returns true if both creatures are still alive
    bothCreaturesAreAlive() {
        if (
            this.state.playerCreature.isDead() === true ||
            this.state.enemyCreature.isDead() === true
        ) {
            return false;
        }
        return true;
    }

    roundResultAction() {
        if (this.state.playerCreature.isDead()) {
            this.props.setResults(this.playThroughStats);
            this.props.changeGamePhase("resultScreen");
        } else if (this.state.enemyCreature.isDead()) {
            this.setupNextWave();
        }
    }

    prepareCreatureForNewWave(newCreat, isPlayerCreature) {
        newCreat.waveLevel = this.state.wave + 1;
        if (isPlayerCreature) {
            newCreat.levelUp();
        } else {
            newCreat.getCreatureToWaveLevel();
        }
        newCreat.restoreAllValues();
        return newCreat;
    }

    setupNextWave() {
        // restore and update players values
        var newPlayer = this.state.playerCreature;
        newPlayer = this.prepareCreatureForNewWave(newPlayer, true);

        var newEnemy = this.returnRandomCreature();
        newEnemy = this.prepareCreatureForNewWave(newEnemy, false);

        this.setState({
            battlePhase: "playersTurn",
            playerCreature: newPlayer,
            enemyCreature: newEnemy,
            counter: 1,
            isAttacking: true,
            counterDirection: 1,
            displayDamageDone: false,
            wave: this.state.wave + 1,
            battleLog: []
        });

        this.playThroughStats.waves += 1;
    }

    // handles the series of actions to happen after the character hits
    // sorry for the sloppiness, plan to clean it up if time allows
    // -file search tag- clean
    hitBtnClickHandler() {
        this.disabler();
        this.stopTicker();

        this.calculateBlockFromCounter("enemy");
        this.getNewPlayerAttackDamage();
        this.setState({
            displayDamageDone: true
        });
        this.stopTicker();

        this.applyDamage("enemy", this.playerAtkDamage);

        this.resetCounter();
        this.toggleIsAttacking();

        console.log(this.bothCreaturesAreAlive());
        console.log(this.state.playerCreature);
        console.log(this.state.enemyCreature);
        if (this.bothCreaturesAreAlive()) {
            // gives time to show whats happening
            // might turn the timeout into a setting adjustable
            // by the user
            setTimeout(() => {
                this.setState({
                    displayDamageDone: false,
                    battlePhase: "enemysTurn"
                });
                this.conductBotActions();
            }, 2000);
        } else {
            console.log("hey");
            this.roundResultAction();
        }
    }

    // handles the series of actions to happen after the enemy hits
    // sorry for the sloppiness, plan to clean it up if time allows
    // -file search tag- clean
    blockBtnClickHandler() {
        this.disabler();
        this.stopTicker();

        this.calculateBlockFromCounter("player");
        this.getNewEnemyAttackDamage();
        this.setState({
            displayDamageDone: true
        });

        this.stopTicker();
        this.applyDamage("player", this.enemyAtkDamage);
        this.resetCounter();

        console.log(this.bothCreaturesAreAlive());
        console.log(this.state.playerCreature);
        console.log(this.state.enemyCreature);
        if (this.bothCreaturesAreAlive()) {
            // gives time to show whats happening
            // might turn the timeout into a setting adjustable
            // by the user

            setTimeout(() => {
                this.setState({
                    displayDamageDone: false,
                    battlePhase: "playersTurn"
                });
                this.toggleIsAttacking();
            }, 2000);
        } else {
            this.roundResultAction();
        }
    }

    meterTickIntervalHandler() {
        if (this.state.counter > 0 && this.state.counter < 100) {
            this.setState({
                counter: this.state.counter + this.state.counterDirection
            });
        } else {
            var newCounter = this.getNewCounter();
            this.setState({
                counter: newCounter,
                counterDirection: this.state.counterDirection * -1
            });
        }

        // moves the meter point
        this.meterPointRef.current.style["left"] = this.state.counter + "%";
    }
    // --end handlers--

    // utils
    // deepCopy(val) {
    //     return Object.assign( Object.create(val), JSON.parse( JSON.stringify(val) ));
    // }
}
