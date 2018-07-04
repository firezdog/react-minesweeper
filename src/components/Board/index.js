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
        let asyncCountMines = new Promise(resolve => {
            let mines = this.countMines(this.state.board, cell);
            resolve(mines);
        })

        asyncCountMines.then(numberOfMines => {
            let board = this.state.board;
            let currentCell = board[cell.row][cell.col];
            if(currentCell.mine && this.props.openCells === 0) {
                console.log("Bombed on first turn -- recreating board.");
                board = this.createBoard(this.props);
                this.setState({board}, () => this.open(board[cell.row][cell.col]));
            } else {
                //open closed cells without flags
                if (!currentCell.flag && !currentCell.open) {
                    if (numberOfMines === 0 && !currentCell.mine) {
                        this.openNearby(board, cell);
                    }
                    this.props.openCellClick(cell);
                    currentCell.open = true;
                    //count number of mines open nearby.
                    currentCell.nearbyMines = numberOfMines;
                    this.setState({board});
                }
            }
        })
    }

    openNearby = (board, cell) => {
        for (let rowDelta = -1; rowDelta <= 1; rowDelta++) {
            for (let colDelta = -1; colDelta <=1; colDelta++) {
                if (rowDelta === 0 && colDelta === 0) { continue; } //skip the current mine
                let newRow = cell.row + rowDelta;
                let newCol = cell.col + colDelta;
                if (0 <= newRow && newRow < this.props.rows) {
                    if (0 <= newCol && newCol < this.props.cols) {
                        this.open(board[newRow][newCol]);
                    }
                }
            }
        }
    }

    countMines = (board, cell) => {
        let mineCount = 0;
        for (let rowDelta = -1; rowDelta <= 1; rowDelta++) {
            for (let colDelta = -1; colDelta <=1; colDelta++) {
                if (rowDelta === 0 && colDelta === 0) { continue; } //skip the current mine
                if (this.lookForMine(board,cell,rowDelta,colDelta))   { mineCount++; };
            }
        }
        return mineCount;
    }

    lookForMine = (board, cell, rowDelta, colDelta) => {
        let newRow = cell.row + rowDelta;
        let newCol = cell.col + colDelta;
        if (0 <= newRow && newRow < this.props.rows) {
            if (0 <= newCol && newCol < this.props.cols) {
                let cellDelta = board[newRow][newCol];
                return cellDelta.mine ? true : false;
            }
        }
        return false;
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
            return <Row open={this.open} key={index} row={row} />
        });
        return (
            <div className="board">{rows}</div>
        );
    }
}

export default Board;