import React, { Component } from 'react'
import Board from './Board'
import ControlPad from './ControlPad'

class App extends Component {
  constructor (props) {
    super(props)
    let startrows = 20
    let startcols = 20

    let arr = Array(startrows).fill().map(() => Array(startcols).fill())
    for (let i = 0; i < startrows; i++) {
      for (let j = 0; j < startcols; j++) {
        arr[i][j] = ((Math.random() < 0.5))
      }
    }

    this.state = {
      generation: 0,
      rows: startrows,
      cols: startcols,
      currentGen: arr,
      running: false
    }
  }

  toggleCell = (i, j) => {
    let arr = this.state.currentGen
    arr[i][j] = !arr[i][j]
    this.setState({
      currentGen: arr
    })
  }

  randomStart = () => {
    let arr = Array(this.state.rows).fill().map(() => Array(this.state.cols).fill())
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        arr[i][j] = ((Math.random() < 0.5))
      }
    }
    this.setState({
      currentGen: arr,
      generation: 0
    })
  }

  clearBoard = () => {
    let arr = this.state.currentGen
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        arr[i][j] = false
      }
    }
    let gen = 0
    this.pauseGame()
    this.setState({
      currentGen: arr,
      generation: gen,
      running: false
    })
  }

  nextGeneration = () => {
    let arr = this.state.currentGen

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        let count = 0

        if (i > 0) {
          if (j > 0) {
            // diagonal up and left
            if (arr[i - 1][j - 1]) {
              count += 1
            }
          }
            // directly above
          if (arr[i - 1][j]) {
            count += 1
          }

          if (j < this.state.cols - 1) {
            // diagonal up and right
            if (arr[i - 1][j + 1]) {
              count += 1
            }
          }
        }
        if (j > 0) {
            // directly left
          if (arr[i][j - 1]) {
            count += 1
          }
        }

        if (j < this.state.cols - 1) {
            // directly right
          if (arr[i][j + 1]) {
            count += 1
          }
        }

        if (i < this.state.rows - 1) {
          if (j > 0) {
            // diagonal down and left
            if (arr[i + 1][j - 1]) {
              count += 1
            }
          }
            // directly below

          if (arr[i + 1][j]) {
            count += 1
          }

          if (j < this.state.cols - 1) {
            // diagonal down and right
            if (arr[i + 1][j + 1]) {
              count += 1
            }
          }
        }
        if (arr[i][j]) {
          if (count < 2 || count > 3) {
            arr[i][j] = false
          }
        } else {
          // if cell is dead do this check (rule 4)
          // if exactly 3 cells, cell is born
          if (count === 3) {
            arr[i][j] = true
            // console.log("Cell: "+ i + ","+ j +  " has "+ count+ " neighbors and will be born")
          }
        }
      }
    }
    let newGen = this.state.generation + 1
    this.setState({
      currentGen: arr,
      generation: newGen
    })
  }

  runGame = () => {
    if (this.state.running === false) {
      this.setState({ running: true })
      this.timerID = setInterval(
          () => this.nextGeneration(),
          100
        )
    }
  }

  pauseGame = () => {
    if (this.state.running === true) {
      this.setState({ running: false })
      clearInterval(this.timerID)
    }
  }
  render () {
    return (
      <div className='App'>
        <div className='Header'>
          <h1>Game Of Life</h1>
          <ControlPad
            runGame={this.runGame}
            pauseGame={this.pauseGame}
            randomStart={this.randomStart}
            generation={this.state.generation}
            nextGen={this.nextGeneration}
            clearBoard={this.clearBoard}
          />
        </div>
        <div className='App-intro'>
          <Board
            numRows={this.state.rows}
            numCols={this.state.cols}
            currentGen={this.state.currentGen}
            toggleCell={this.toggleCell}
          />
        </div>
      </div>
    )
  }
}

export default App
