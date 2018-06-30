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
                newRow.push(
                    {
                        row: row, 
                        col: col, 
                        nearbyMines: 0, 
                        open: false, 
                        mine: false, 
                        flag: false
                    });
            }
            board.push(newRow);
        }

        //Generate mines randomly.
        let numberOfMines = this.props.mines;
        this.addMines(numberOfMines, board);
        
        return board;
    
    }

    open = (cell) => {
        let board = this.state.board;
        let currentCell = board[cell.row][cell.col];
        if (currentCell.mine && this.props.openCells == 0) {
            console.log("Bombed on first turn -- recreating board.");
            board = this.createBoard();
            this.setState({board:board}, () => this.open(cell));
        } else {
            //open closed cells without flags
            if(!currentCell.flag && !currentCell.open) {
                this.props.openCellClick();
                currentCell.open = true;
                //count number of mines open nearby.
                currentCell.nearbyMines = this.countMines(board, currentCell);
            }
        }
    }

    countMines = (board, cell) => {
        let mineCount = 0;
        let rowDeltas = [1, 0 -1];
        let colDeltas = [1, 0, -1];
        for (rowDelta of rowDeltas) {
            for (colDelta of colDeltas) {
                if (rowDelta == 0 && colDelta == 0) { continue; }
                if (lookForMine(board,cell,rowDelta,colDelta) { mineCount++; });
            }
        }
        return mineCount;
    }

    lookForMine = (board, cell, rowDelta, colDelta) => {
        cellDelta = board[cell.row + rowDelta][cell.col + colDelta];
        if (cellDelta == null) return false;
        return cellDelta.mine ? true : false;
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