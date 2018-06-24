import React from "react";
import Timer from '../Timer';

const Boardhead = (props) => {
    let minutes = Math.floor(props.time / 60) || 0;
    let seconds = props.time % 60 || 0;
    let formattedTime = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

    return (
        <div className="boardhead">
            <h2 class="text-center">Minesweeper</h2>
            <div class="row">
                <div class="col md-4 text-center">
                    Flags: {props.flags}
                </div>
                <div class="col md-4 text-center">
                    <button class="btn btn-danger">Reset</button>
                </div>
                <div class="col md-4">
                    <Timer time={formattedTime}/>
                </div>
            </div>
        </div>
    );

}

export default Boardhead;