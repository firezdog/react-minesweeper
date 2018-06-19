import React, { Component } from "react";
import Timer from '../Timer';

class Boardhead extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }

    render() {
        return (
            <div className="boardhead">
                <Timer/>
                <div id="resetButton">
                    <button>Reset</button>
                </div>
                <div id="mineNumber">Number of Mines</div>
            </div>
        );
    }
}

export default Boardhead;