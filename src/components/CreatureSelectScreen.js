import React, { Component } from "react";

export class CreatureSelectScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Selected Creature Container</div>
                <div>Creature Stats</div>
                <div>Selection Bar</div>
                    {this.props.creatures.map((creat, key) =>(
                        <p key={key}>Creature</p>
                    ))
                    }
            </div>
        );
    }


}
