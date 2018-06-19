import React, { Component } from 'react';
import Board from './components/Board';

class Minesweeper extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
      flags: 10,
      bombs: 10
    }
  }
  
  render() {
    console.log(this.state.rows);
    console.log(this.state.columns);
    return (
      <div className="minesweeper">
        <Board rows={this.state.rows} cols={this.state.columns}/>
      </div>
    );
  }
}

export default Minesweeper;
