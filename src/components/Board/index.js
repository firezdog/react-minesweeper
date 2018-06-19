import React, {Component} from 'react';
import Row from '../Row';

class Board extends Component {

    constructor(props){
        super(props);

        const board = this.createBoard(props);

        this.state = {
            board: board,
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

        //Generate mines randomly.
        let numberOfMines = this.props.mines;
        this.addMines(numberOfMines, board);
        
        return board;
    
    }

    addMines = (numberOfMines, board) => {
        while (numberOfMines > 0) {
            let randomRow = this.generateRandom(this.props.rows);
            let randomCol = this.generateRandom(this.props.cols);
            while (board[randomRow][randomCol].mine) {
                randomRow = this.generateRandom(this.props.rows);
                randomCol = this.generateRandom(this.props.cols);
            }
            board[randomRow][randomCol].mine = true;
            numberOfMines--;
        }
        return board;
    }

    generateRandom(endRange){
        return Math.floor(Math.random()*endRange);
    }

    render() {
        const rows = this.state.board.map((row,index) => {
            return <Row key={index} row={row} />
        });
        return (
            <div className="board">{rows}</div>
        );
    }
}

export default Board;