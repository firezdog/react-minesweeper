import React, {Component} from 'react';

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            rows: this.createBoard(props)
        }
    }

    createBoard = (props) => {
        
        let board = [];
        for (let row = 0; row  < props.rows; row++){
            let newRow = [];
            for (let col = 0; col < props.cols; col++){
                newRow.push({row:row, col:col,nearbyMines:0,open:false,mine:false,flag:false});
            }
            board.push(newRow);
        }
        
        console.log(board);
    
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Board;