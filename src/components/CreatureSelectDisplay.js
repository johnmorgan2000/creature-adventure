import React, { Component } from "react";

// Component to display creature and information
export class CreatureSelectDisplay extends Component {
    constructor(props){
        super(props);
        this.creatureObj = this.props.creatureObj
    }
    render() {
        return (
            <div className="creatureSelectDisplay">
                <p>{this.creatureObj.name}</p>
            </div>
        );
    }
}
