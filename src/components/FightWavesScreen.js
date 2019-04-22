import React, { Component } from "react";

// The component responsible for the fighting game play
export class FightWavesScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            battlePhase: "playersTurn",
            playerCreature: this.props.playerCreature,
            enemyCreature: this.returnRandomCreature()
        }
    }
    render(){
        switch(this.state.battlePhase){
            case "playersTurn":
            return(
                <div id="fightWavesScreen"> 
                    <p>Fight Screen</p>

                    <div>
                        <p>{this.state.playerCreature.name}</p>
                        <p>{this.state.playerCreature.health}</p>
                        
                    </div>

                    <div>
                        <p>{this.state.enemyCreature.name}</p>
                        <p>{this.state.enemyCreature.health}</p>
                    </div>
                    
                    <div>
                        <button>
                            Base Attack
                        </button>
                    </div>
                </div>
            )
        }
    }

    returnRandomCreature(){
        return this.props.creatures[Math.floor(Math.random() * this.props.creatures.length)].creatureObj;
    }
}
