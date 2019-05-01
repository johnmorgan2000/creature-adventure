import React, { Component } from "react";

export class HealthBar extends Component {
    render() {
        var percentage = this.getPercentage();
        var newWidth = percentage + "%";
        return (
            <div>
                <p>{this.props.currentHealth}</p>
                <div className="healthBar">
                    <div
                        style={{width: newWidth}}
                        className="progress"
                        // ref={this.props.createdRef}
                    />
                </div>
            </div>
        );
    }

    getPercentage() {
        return Math.floor((this.props.currentHealth / this.props.maxHealth) * 100);
    }

    // componentDidMount() {
    //     this.props.createdRef.current.style.width =
    //         Math.floor(
    //             (this.props.currentHealth / this.props.maxHealth) * 100
    //         ) + "%";
    // }
}
