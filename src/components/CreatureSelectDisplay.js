import React, { Component } from "react";

// Component to display creature and information
export class CreatureSelectDisplay extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="creatureSelectDisplay">
                <p>{this.props.creatureObj.name}</p>
            </div>
        );
    }
}
