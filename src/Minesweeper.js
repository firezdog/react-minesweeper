import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react';
import Board from './components/Board';
import Boardhead from './components/Boardhead'

class Minesweeper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "waiting", // running, ended, waiting
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0,
      intervals: []
    }
  }

  //create two functions -- one to "tick" and another to call that function every second.

  addSecond = () => {
    //will this cause an unwieldy number of renderings?
    if (this.state.openCells > 0 && this.state.status != "running"){
      let currentTime = this.state.time;
      this.setState({time: currentTime + 1}, () => this.setInterval(this.tick, 1000));
    }
  }

  setInterval = (fn, time) => {
    let intervals = this.state.intervals;
    //note, the setInterval being pushed is of course distinct from the setInterval pushing it.
    intervals.push(setInterval(fn, time));
    this.setState({intervals: intervals});
  }

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status != "running") {
      this.setState({status: "running"});
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
          openCells={this.state.openCells}
          openCellClick = {this.handleCellClick}/>
      </div>
    );
  }
}

export default Minesweeper;
