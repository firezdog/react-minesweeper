import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react';
import Board from './components/Board';
import Boardhead from './components/Boardhead'

class Minesweeper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "running",
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0
    }
  }
  
  render() {
    return (
      <div className="minesweeper">
        <Boardhead 
          time={this.state.time} 
          flags={this.state.flags}/>
        <Board 
          mines={this.state.mines} 
          rows={this.state.rows} 
          cols={this.state.columns} 
          openCells={this.state.openCells}/>
      </div>
    );
  }
}

export default Minesweeper;
