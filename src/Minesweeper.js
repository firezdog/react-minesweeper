import React, { Component } from 'react';
import Board from './components/Board';
import Boardhead from './components/Boardhead'

class Minesweeper extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10
    }
  }
  
  render() {
    return (
      <div className="minesweeper">
        <Boardhead/>
        <Board mines={this.state.mines} rows={this.state.rows} cols={this.state.columns}/>
      </div>
    );
  }
}

export default Minesweeper;
