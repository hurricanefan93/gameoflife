import React, { Component } from 'react'
import Cell from './Cell'

class Board extends Component {
  render () {
    let fullBoard = []
    let objectRow = []
    for (let i = 0; i < this.props.numRows; i++) {
      objectRow = []
      for (let j = 0; j < this.props.numCols; j++) {
        objectRow.push(
          <Cell
            toggleCell={this.props.toggleCell}
            key={j + i * 10}
            col={j}
            row={i}
            living={this.props.currentGen[i][j]}
        />)
      }
      fullBoard.push(<tr key={i}>{objectRow}</tr>)
    }
    return (
      <div className='component-board'>
        <table>
          <tbody>
            {fullBoard}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board
