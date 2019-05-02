import React, { Component } from "react";

export class Meter extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div
                    style={{ left: this.props.counter + "%" }}
                    className="meterPoint"
                />
            </div>
        );
    }
}
