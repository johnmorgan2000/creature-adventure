import React, { Component } from "react";

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
            counterDirection: 1
        };

        // global variables
        this.meterTickInterval = null;
        this.playerAtkDamage = 0;

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
                    <div id="attackMeter">
                        <div className="meterPoint" />
                    </div>
                    <button onClick={() => this.stopTicker()}>
                        Hit
                    </button>
                </div>
            </div>
        );
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

    // starts the meterTickInterval
    startTicker(){
        this.meterTickInterval = setInterval(this.meterTickIntervalHandler, 1000);
    }

    // stops the meterTickInterval
    stopTicker(){
        clearInterval(this.meterTickInterval);
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
        return this.props.creatures[
            Math.floor(Math.random() * this.props.creatures.length)
        ].creatureObj;
    }

    getNewPlayerAttackDamage(){
        var counter = this.state.counter;
        var playerDamage = this.playerCreature.attackDmg;
        this.playerAtkDamage = playerDamage * (counter / 100);
    }

    // changes the isAttacking state to the either true or false
    toggleIsAttacking() {
        this.setState({
            isAttacking: !this.state.isAttacking
        });
    }

    baseAtkClickHandler() {
        this.changeToAttackPhase();
        this.startTicker();
    }

    meterTickIntervalHandler() {
        if (this.state.counter > 0 && this.state.counter < 100) {
            this.setState({
                counter: (this.state.counter + this.state.counterDirection)
            });
        }else{
            var newCounter = this.getNewCounter();
            this.setState({
                counter: newCounter,
                counterDirection: this.state.counterDirection * -1
            })
        }
        console.log(this.state.counter);
    }

    getNewCounter(){
        var newCounter;
            if (this.state.counter === 0){
                newCounter = 1;
            }
            else{
                newCounter = 99;
            }
        return newCounter;
    }

}
