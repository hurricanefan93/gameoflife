import React, { Component } from 'react'
import Cell from './Cell'

class Row extends Component {
  render () {
    console.log('in row.js')
    let objectRow = []
    for (let i = 0; i < this.props.numCols; i++) {
      console.log('building cell: ' + (i + this.props.thisRow * 10))
      objectRow.push(<Cell key={i + this.props.thisRow * 10} col={i} row={this.props.thisRow} />)
    }
    return (
      <tr className='component-row'>
        {objectRow}
      </tr>
    )
  }
}

export default Row
