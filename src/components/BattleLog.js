import React, { Component } from "react";

export class BattleLog extends Component{
    // constructor(props){
    //     super(props);
    //     this.classNameExtension = "battleLog " + this.props.classNameExtension
        
    // }

    render(){
        return (
            <div className="battleLog">
                <ul>
                    {this.props.battleLog.map((log, key) => (
                        <li key={key}>{log}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
