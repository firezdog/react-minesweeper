import React from 'react';

const Cell = (props) => {

    let renderCell = () => {
        if (props.cell.open) {
            return <div className="cell open"></div>
        } else {
            return <div className="cell closed"></div>
        }
    }

    return renderCell();

}

export default Cell;