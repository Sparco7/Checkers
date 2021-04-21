// const isValidMove = (fromIndex, toIndex, board) => {
  // Returns true if move is valid, false otherwise
// }
const setPose = (index, color, setState, state) => {

    console.log('stats', setState, state)
  if (color === state.turn || state.squareSelected.clicked) {
    if (!state.squareSelected.clicked) {
      setState(
        {
          squareSelected: {
            pos: index,
            clicked: true,
          },
          color: color,
        },
        function () {}
      );
    } else {
      let newBoard = state.board;
      let turn = state.turn;
      let opTurn;
      let condition;
      let deepCopy;
      turn === "BL"
        ? (condition = index[0] < state.squareSelected.pos[0])
        : (condition = index[0] > state.squareSelected.pos[0]);
      turn === "BL" ? (opTurn = "RD") : (opTurn = "BL");

      ////////////////////////////////////////////////////
      // conditions to prevent changing of existing square.
      ////////////////////////////////////////////////////

      // checks that the chosen squar is empty
      if (
        newBoard[index[0]][index[1]] === null &&
        // checks to see the user chose a different square
        newBoard[index[0]][index[1]] !==
          newBoard[state.squareSelected.pos[0]][
            state.squareSelected.pos[1]
          ] &&
        // incase of a regular move
        ((condition &&
          Math.abs(index[1] - state.squareSelected.pos[1]) === 1) ||
          // incase of a eating move
          (condition &&
            Math.abs(index[1] - state.squareSelected.pos[1]) === 2 &&
            newBoard[(state.squareSelected.pos[0] + index[0]) / 2][
              (state.squareSelected.pos[1] + index[1]) / 2
            ] === opTurn)) &&
        ((Math.abs(index[0] - state.squareSelected.pos[0]) === 1 &&
          Math.abs(index[1] - state.squareSelected.pos[1]) === 1) ||
          (Math.abs(index[0] - state.squareSelected.pos[0]) === 2 &&
            Math.abs(index[1] - state.squareSelected.pos[1]) === 2))
      ) {
        if (turn === "BL" && state.player2) {
          // actions for regular move
          newBoard[state.squareSelected.pos[0]][
            state.squareSelected.pos[1]
          ] = null;
          newBoard[index[0]][index[1]] = state.color;
          // eating another player
          if (Math.abs(index[1] - state.squareSelected.pos[1]) === 2) {
            // action for eating move
            newBoard[index[0] + 1][
              Math.abs(index[1] + state.squareSelected.pos[1]) / 2
            ] = null;
          }
          // changing player's turn
          setState({ turn: state.player1 });
          // // remembering the move
          const arr = [];

          for (let row of newBoard) {
            arr.push([...row]);
          }
          // console.log("initial state: ", state.memoryBoard);
          // console.log("read this:", arr);
          deepCopy = JSON.parse(JSON.stringify(newBoard));
          setState({
            memoryBoard: [...state.memoryBoard, deepCopy],
            movesCounter: state.movesCounter + 1
          });
          console.log("memory board is: ", state.memoryBoard);
        } else {
          // actions for regular move
          newBoard[state.squareSelected.pos[0]][
            state.squareSelected.pos[1]
          ] = null;
          newBoard[index[0]][index[1]] = state.color;
          // eating another player
          if (Math.abs(index[1] - state.squareSelected.pos[1]) === 2) {
            // action for eating move
            newBoard[index[0] - 1][
              Math.abs(index[1] + state.squareSelected.pos[1]) / 2
            ] = null;
          }
          const arr = [];

          for (let row of newBoard) {
            arr.push([...row]);
          }

          setState({ turn: state.player2 });
          // // remembering the move
          deepCopy = JSON.parse(JSON.stringify(newBoard));
          setState({
            memoryBoard: [...state.memoryBoard, arr],
            movesCounter: state.movesCounter + 1
          });
          console.log("memory board is: ", state.memoryBoard);
        }
      }

      setState(
        {
          board: newBoard,
          squareSelected: {
            pos: "",
            clicked: false,
          },
        },
        function () {
          // console.log(state.board);
        }
      );
    }
  } else {
    console.log("No Color Choice!");
  }
};

export default setPose;
