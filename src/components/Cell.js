import React, { Component } from 'react'

class Cell extends Component {
  _Click=() => {
    console.log('cell clicked')
    this.props.toggleCell(this.props.row, this.props.col)
  }

  renderLive () {
    return (
      <td onClick={this._Click} className='component-cell alive'>
        <span />
      </td>
    )
  }

  renderDead () {
    return (
      <td onClick={this._Click} className='component-cell dead'>
        <span />
      </td>
    )
  }
  render () {
    if (this.props.living) {
      return this.renderLive()
    } else {
      return this.renderDead()
    }
  }
}

export default Cell
