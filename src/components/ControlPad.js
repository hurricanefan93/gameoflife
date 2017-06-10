import React, { Component } from 'react'

class ControlPad extends Component {
  render () {
    return (
      <div className='ControlPad'>
        <div id='controls'>
          <button onClick={this.props.runGame}> Run </button>
          <button onClick={this.props.pauseGame}> Pause </button>
          <button onClick={this.props.clearBoard}> Clear </button>
        </div>
        <div id='generation'>
          Generation: {this.props.generation}
        </div>
      </div>
    )
  }
}

export default ControlPad
