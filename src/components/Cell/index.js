import React from 'react';

const Cell = (props) => {

    let renderCell = () => {
        if (props.cell.open) {
            if (props.cell.mine) {
                return <div className="cell open"><i className="fas fa-bomb"></i></div>
            } else if (props.cell.nearbyMines === 0) {
                return <div className="cell open"></div>
            } else {
                return <div className="cell open">{props.cell.nearbyMines}</div>
            }
        } else {
            return <div onClick={() => props.open(props.cell)} className="cell closed"></div>
        }
    }

    return renderCell();

}

export default Cell;