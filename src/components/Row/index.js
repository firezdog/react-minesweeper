import React from 'react';
import Cell from '../Cell';

const Row = (props) => {

    const cellList = props.row.map((cell, index) => {
        return <Cell key={index} cell={cell} />
    });

    return (
        <div className="row">{cellList}</div>
    );
}

export default Row;