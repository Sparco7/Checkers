import React from "react";
import Square from "./Square";
import testPose from "../setPose";
import "./checkers.css";

class Board extends React.Component {
  state = {
    board: [],
    memoryBoard: [],
    player1: "RD",
    player2: "BL",
    squareSelected: {
      pose: "",
      value: false,
    },
    color: "",
    turn: "",
    movesCounter: 0,
  };

  componentDidMount() {

    this.initBoard();


  }

  // initializing board
  initBoard = () => {
    // this.setState({ board: [] });
    let board = [];
    // creating 8 rows
    for (let j = 0; j < 8; j++) {
      let row = [];
      for (let i = 0; i < 8; i++) {
        row.push(null);
      }
      board.push(row);
    }

    // placing RED pieces
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 8; l++) {
        if ((k === 0 && l % 2) || (k === 1 && !(l % 2)) || (k === 2 && l % 2)) {
          board[k][l] = this.state.player1;
        }
      }
    }

    // placing BLUE pieces
    for (let m = 5; m < 8; m++) {
      for (let n = 0; n < 8; n++) {
        if (
          (m === 5 && !(n % 2)) ||
          (m === 6 && n % 2) ||
          (m === 7 && !(n % 2))
        ) {
          board[m][n] = this.state.player2;
        }
      }
    }

    // this.setState({ turn: this.state.player2 });

       this.setState({
      board: JSON.parse(JSON.stringify(board)),
      player1: "RD",
      player2: "BL",
      turn: this.state.player2,
      memoryBoard: [board],
      movesCounter: 0
    });

    // return board;
  };

  undoLastMove = () => {
    console.log("undo last move");

    this.setState({
      board: this.state.memoryBoard[this.state.movesCounter - 1],
    });

    this.setState({
      movesCounter: this.state.movesCounter - 1,
    });
    console.log("memory board is: ", this.state.memoryBoard);

    //changing player's turn
    if (this.state.memoryBoard.length % 2) {
      this.setState({ turn: this.state.player2 }); // BLUE
    } else {
      this.setState({ turn: this.state.player1 }); // RED
    }
  };

  reduLastMove = () => {
    console.log("redu last move");
    this.setState({
      board: this.state.memoryBoard[this.state.movesCounter + 1],
    });

    this.setState({
      movesCounter: this.state.movesCounter + 1,
    });
  };

  setPose = (index, color) => {
    testPose(index, color, this.setState.bind(this), this.state);
  };

  render() {
    console.log("moves counter", this.state.movesCounter);

    console.log("memory board length is: ", this.state.memoryBoard.length);
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 new-game">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.initBoard()}
            >
              New Game
            </button>
            <div className="row">
              {!(this.state.memoryBoard.length === 1) &&
                !(this.state.movesCounter === 0) && (
                  <div className="undo-redo">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => this.undoLastMove()}
                    >
                      Undo
                    </button>
                  </div>
                )}
              {this.state.memoryBoard.length > this.state.movesCounter + 1 && (
                <div className="undo-redo">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.reduLastMove()}
                  >
                    Redo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <div className={this.state.turn}>
              {this.state.turn === "RD" ? "RED" : "BLUE"} TURN
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <div className="board">
              {this.state.board.map((row, i) => (
                <Row
                  key={i}
                  row={row}
                  index={i}
                  board={this.state.board}
                  setPose={this.setPose}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Row = ({ row, index, board, setPose }) => {
  return (
    <div>
      <div></div>
      <div className="row">
        {!index && <div className="row-numbers first-row-dig">{index}</div>}
        {index !== 0 && <div className="row-numbers">{index}</div>}

        {row.map((square, i) => (
          <Square
            key={i}
            square={square}
            i={i}
            rows={index}
            board={board}
            setPose={setPose}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
