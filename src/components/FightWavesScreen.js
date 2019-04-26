import React, { Component } from "react";

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
            displayDamageDone: false
        };

        // references
        this.meterPointRef = React.createRef();
        this.meterStopperBtnRef = React.createRef();

        // other global variables
        this.meterTickInterval = null;
        this.playerAtkDamage = 0;
        this.enemyAtkDamage = 0;
        this.blockAttack= false;

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
            <div>
                <div>
                    <p>{this.state.playerCreature.name}</p>
                    <p>{this.state.playerCreature.health}</p>
                </div>

                <div>
                    <p>{this.state.enemyCreature.name}</p>
                    <p>{this.state.enemyCreature.health}</p>
                </div>
            </div>
        );
    }

    // returns the attack phase render block
    returnAttackPhaseRender() {
        return (
            <div id="fightWavesScreen">
                {this.creatureDisplayBlock()}

                <div id="bottomAttackBar">
                    <div className="attackMeter meter">
                        <div className="meterPoint" ref={this.meterPointRef} />
                    </div>
                    {this.returnDamageDoneBlock()}

                    <button 
                    ref={this.meterStopperBtnRef}
                    onClick={() => this.hitBtnClickHandler()}>
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
                <p>Fight Screen</p>

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
                    {this.creatureDisplayBlock()}

                    <div className="defendMeter meter">
                        <div className="meterPoint" ref={this.meterPointRef} />
                    </div>
                    <button 
                    ref = {this.meterStopperBtnRef}
                    onClick={()=> this.blockBtnClickHandler()}>Stop</button>
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
        return Object.assign(
            {},
            this.props.creatures[
                Math.floor(Math.random() * this.props.creatures.length)
            ].creatureObj
        );
    }

    // -file search tag- DRY
    // Violates the Don't Repeat Yourself rule
    getNewPlayerAttackDamage() {
        if (this.blockAttack){
            var counter = this.state.counter;
            var playerDamage = this.state.playerCreature.attackDmg;
            this.playerAtkDamage = playerDamage * (counter / 100);
        }else{
            this.playerAtkDamage = 0;
        }
        
    }

    // -file search tag- DRY
    // Violates the Don't Repeat Yourself rule
    getNewEnemyAttackDamage(){
        if (this.blockAttack){
            var counter = this.state.counter;
            var playerDamage = this.state.enemyCreature.attackDmg;
            this.enemyAtkDamage = playerDamage * (counter / 100);
        }else{
            this.enemyAtkDamage = 0;
        }
        
    }

    // simulates the player's ability to stop the counter
    randomEnemyCounter(){
        return Math.random() * (100 - this.state.enemyCreature.focus) + this.state.enemyCreature.focus;
    }

    // takes the counter and turns it into a block percentage
    // takes in "player" or "enemy" to determine the calculations needed.
    calculateBlockFromCounter(stringFor){
        var distFrom50;
        switch (this.state.counter) {
            case "player":
                distFrom50 = this.state.counter;
            case "enemy":
                distFrom50 = Math.abs(50 - this.state.counter);
            default:
                distFrom50 = this.state.counter;
        }
        if (distFrom50 !== 0 || distFrom50 > 10){
            this.blockAttack = false;
        }else{
            this.blockAttack = true;
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
        damage = damage - (damage * this.blockPercentage())
        if (strPlayerOrEnemy === "player") {
            this.state.playerCreature.health -= damage;
            this.setState({
                playerCreature: this.state.playerCreature
            });
        } else if (strPlayerOrEnemy === "enemy") {
            this.state.enemyCreature.health -= damage;
            this.setState({
                enemyCreature: this.state.enemyCreature
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
    disabler(){
        this.meterStopperBtnRef.current.setAttribute("disabled", true);
    }

    // handles the series of actions to happen after the character hits
    // sorry for the sloppiness, plan to clean it up if time allows
    // -file search tag- clean
    hitBtnClickHandler() {
        this.disabler();
        this.stopTicker();
        this.getNewPlayerAttackDamage();
        this.setState({
            displayDamageDone: true
        });
        this.stopTicker();

        this.applyDamage("enemy", this.playerAtkDamage);

        this.resetCounter();
        this.toggleIsAttacking();

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
    }


    // handles the series of actions to happen after the enemy hits
    // sorry for the sloppiness, plan to clean it up if time allows
    // -file search tag- clean
    blockBtnClickHandler(){
        this.disabler();
        this.stopTicker();
        this.getNewEnemyAttackDamage();
        this.setState({
            displayDamageDone: true
        });

        this.stopTicker();
        this.applyDamage("player", this.enemyAtkDamage);
        this.resetCounter();

        
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
}
