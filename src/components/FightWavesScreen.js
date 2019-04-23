import React, { Component } from "react";

// The component responsible for the fighting game play
export class FightWavesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battlePhase: "playersTurn",
            playerCreature: this.props.playerCreature,
            enemyCreature: this.returnRandomCreature(),
            isAttacking: false,
            counter: 1,
            counterDirection: 1
        };

        this.meterTickInterval = () =>
            setInterval(this.meterTickIntervalHandler, 1000);
        this.playerAtkDamage = 0;
        this.meterTickIntervalHandler = this.meterTickIntervalHandler.bind(
            this
        );
        // this.determinePlayerDamage = this.determinePlayerDamage.bind(this);
        this.changeToAttackPhase = this.changeToAttackPhase.bind(this);
        
    }
    render() {
        switch (this.state.battlePhase) {
            case "playersTurn":
                return this.returnPlayersTurnRender();
            case "attackPhase":
                return this.returnAttackPhaseRender();
        }
    }

    changeToAttackPhase() {
        console.log(this.state.isAttacking);
        this.setState({
            battlePhase: "attackPhase",
            isAttacking: true
        });
    }

    returnRandomCreature() {
        return this.props.creatures[
            Math.floor(Math.random() * this.props.creatures.length)
        ].creatureObj;
    }

    // possibly another component later
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

    toggleIsAttacking() {
        this.setState({
            isAttacking: !this.state.isAttacking
        });
    }

    baseAtkClickHandler() {
        this.changeToAttackPhase();
        this.meterTickInterval();
    }

    meterTickIntervalHandler() {
        if (this.state.counter > 0 && this.state.counter < 100) {
            this.setState({
                counter: (this.state.counter + this.state.counterDirection)
            });
        }else{
            var newCounter;
            if (this.state.counter === 0){
                newCounter = 1;
            }
            else{
                newCounter = 99;
            }
            this.setState({
                counter: newCounter,
                counterDirection: this.state.counterDirection * -1
            })
        }

        console.log(this.state.counter);
    }


    returnAttackPhaseRender() {
        return (
            <div id="fightWavesScreen">
                {this.creatureDisplayBlock()}

                <div id="bottomAttackBar">
                    <div id="attackMeter">
                        <div className="meterPoint" />
                    </div>
                    <button onClick={() => this.toggleIsAttacking()}>
                        Hit
                    </button>
                </div>
            </div>
        );
    }
}
