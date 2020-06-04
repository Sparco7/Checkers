import React from 'react';
import Square from './Square';
import './checkers.css';


class Board extends React.Component {

    state = {
        board: [],
        player1: 'RD',
        player2: 'BL',
        squareSelected : {
            pose: '',
            value: false
        },
        color: '',
        turn: ''
    }

    componentDidMount() {    
        let stateBoard = this.initBoard();
        this.setState({
            board: stateBoard,
            player1: 'RD',
            player2: 'BL'
        })
    } 
   
    // initializing board
    initBoard = () => {

        this.setState({board: []});
        let board = [];
        // creating 8 rows
        for(let j=0; j<8; j++) {
            let row = [];
            for(let i=0; i<8; i++) {
                row.push(null);
            }
            board.push(row);
        }

        // placing RED pieces
        for(let k=0; k < 3; k++) {
            for(let l=0; l < 8; l++) {
                if ((k === 0 && l % 2) || (k === 1 && !(l % 2)) || (k === 2 && l % 2)) {
                    board[k][l] = this.state.player1;
                }
            }
        }

        // placing BLUE pieces
        for(let m=5; m < 8; m++) {
            for(let n=0; n < 8; n++) {
                if ((m === 5 && !(n % 2)) || (m === 6 && (n % 2)) || (m === 7 && !(n % 2))) {
                    board[m][n] = this.state.player2;
                }
            }
        }

        this.setState({turn: this.state.player2})

        return board;
    }

    setPose = (index, color) => {

        if((color == this.state.turn) || this.state.squareSelected.clicked) {
            if ((!this.state.squareSelected.clicked)) {
                this.setState({
                    squareSelected: {
                        pos: index,
                        clicked: true
                    },
                    color: color
                }, function() {})
            } else {
                let newBoard = this.state.board;
                let turn = this.state.turn;
                let opTurn;
                let condition;
                turn == 'BL' ? condition = index[0] < this.state.squareSelected.pos[0] : condition = index[0] > this.state.squareSelected.pos[0];
                turn == 'BL' ? opTurn = 'RD' : opTurn = 'BL';

                ////////////////////////////////////////////////////
                // conditions to prevent changing of existing square.
                ////////////////////////////////////////////////////

                // checks that the chosen squar is empty 
                if((newBoard[index[0]][index[1]] == null)&&
                    // checks to see the user chose a different square
                    (newBoard[index[0]][index[1]] != newBoard[this.state.squareSelected.pos[0]][this.state.squareSelected.pos[1]]) 
                    // incase of a regular move
                    &&( ((condition && Math.abs(index[1] - this.state.squareSelected.pos[1]) == 1))   
                    // incase of a eating move
                    || ((condition && Math.abs(index[1] - this.state.squareSelected.pos[1]) == 2)
                    && (newBoard[(this.state.squareSelected.pos[0] + index[0]) / 2][(this.state.squareSelected.pos[1] + index[1]) / 2] == opTurn)))
                    &&(Math.abs(index[0]-this.state.squareSelected.pos[0]) == 1 && Math.abs(index[1]-this.state.squareSelected.pos[1]) == 1 
                    || Math.abs(index[0]-this.state.squareSelected.pos[0]) == 2 && Math.abs(index[1]-this.state.squareSelected.pos[1]) == 2))
                    {
                        if(turn == 'BL' && this.state.player2) {
                        // actions for regular move
                        newBoard[this.state.squareSelected.pos[0]][this.state.squareSelected.pos[1]] = null;
                        newBoard[index[0]][index[1]] = this.state.color;
                            // eating another player
                            if(Math.abs(index[1] - this.state.squareSelected.pos[1]) == 2) {
                                // action for eating move
                                newBoard[index[0] + 1][Math.abs(index[1] + this.state.squareSelected.pos[1]) / 2] = null;
                            }
                        // changing player's turn
                        this.setState({turn: this.state.player1});

                        }
                        else {
                        // actions for regular move
                        newBoard[this.state.squareSelected.pos[0]][this.state.squareSelected.pos[1]] = null;
                        newBoard[index[0]][index[1]] = this.state.color;
                            // eating another player
                            if(Math.abs(index[1] - this.state.squareSelected.pos[1]) == 2) {
                                // action for eating move
                                newBoard[index[0] - 1][Math.abs(index[1] + this.state.squareSelected.pos[1]) / 2] = null;
                            }
                        this.setState({turn: this.state.player2});
                        }
                    }
               
                this.setState({
                    board: newBoard,
                    squareSelected: {
                        pos: '',
                        clicked: false
                    }
                },  function () { console.log(this.state.board)})
            }
        }
        else {
            console.log('No Color Choice!');
        }
    }
    consoleValue = () => {
        console.log('board from value: ',this.state.board)
    }

    render() {
        console.log('the turn is: ', this.state.turn);
    return (
        <div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12 new-game">
                    <button type="button" className="btn btn-secondary"
                        onClick={()=> this.componentDidMount()}>
                            New Game
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className={this.state.turn} >
                        {this.state.turn == 'RD' ? 'RED' : 'BLUE' } TURN
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="board">
                        {
                            this.state.board.map((row, i) =>
                            <Row key={i} row={row} 
                            index={i} board={this.state.board}
                            setPose={this.setPose} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    }
  
}

const Row = ({row, index, board, setPose}) => {


  return (
    <div>
        <div></div>
        <div className="row">
            {  !(index) &&
                <div className="row-numbers first-row-dig">{index}</div>
            }
            {   (index != 0) &&
                <div className="row-numbers">{index}</div>
            }
            
            { 

               row.map((square, i) =>
                   <Square key={i} square={square} i={i}
                    rows={index} board={board} setPose={setPose}
                    value={row[i]}   />)
            }
        </div>
    </div>
    )
}



export default Board;

