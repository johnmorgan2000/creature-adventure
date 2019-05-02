import React, { Component } from "react";

export class ResultScreen extends Component{
    constructor(props){
        super(props);
        this.results = this.props.results;
    }

    render(){
        return (
            <div>
                <p>Results</p>
                <p>You made it to wave {this.results.waves}</p>
            </div>
        )
    }
}
