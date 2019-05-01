import React, { Component } from "react";

export class HealthBar extends Component {

    render() {
        return (
            <div>
                <p>{this.props.currentHealth}</p>
                <div className="healthBar">
                    <div className="progress" ref={this.props.createdRef} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.createdRef.current.style.width =
            Math.floor(
                (this.props.currentHealth / this.props.maxHealth) * 100
            ) + "%";
    }
}
