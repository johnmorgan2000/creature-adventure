import React, { Component } from "react";

export class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.results = this.props.results;
    }

    render() {
        return (
            <div id="resultScreen">
                <p class="screenTitle">Results</p>
                <p>You made it to wave {this.results.waves}</p>

                <button
                    className="restartBtn"
                    onClick={function() {
                        window.location.reload();
                    }}
                >
                    Restart
                </button>
            </div>
        );
    }
}
