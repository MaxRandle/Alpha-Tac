//AI STUFF

/*
// board format example
{
    boardArray: new Array(9).fill(new Array(9).fill(null)).map(x => x.slice(0)),
    victoryArray: new Array(9).fill(null),
    lastMove: {
      square: null,
      tile: null
    },
    turn: -1,
    victory: null
  }
*/

// returns a random legal move
const randomMove = boardState => {
  legalMoves = getLegalMoves(boardState);
  return legalMoves[Math.floor(Math.random() * legalMoves.length)];
};

// recursive tree search that returns the best move from a given board state
const bestMove = boardState => {
  // do monte carlo tree search
  // do minimax recursive tree search
  // do alpha-beta pruning
};

// static board evaluation
const staticEval = boardState => {
  // returns a number between 1 and -1 representing the score of the board state
  // do
};

// calculate all legal moves from a given board state
const getLegalMoves = boardState => {
  let legalMoves = [];
  for (let s = 0; s < 9; s++) {
    for (let t = 0; t < 9; t++) {
      if (
        (boardState.lastMove.tile === s ||
          boardState.lastMove.tile === null ||
          boardState.victoryArray[boardState.lastMove.tile] !== null) &&
        boardState.boardArray[s][t] === null
      ) {
        legalMoves.push({ square: s, tile: t });
      }
    }
  }
  return legalMoves;
};

// check a given square for local victories
const checkLocalVictory = square => {
  // checks rows columns and diagonals
};

// for duplicating deeply nested objects
const deepCopy = object => JSON.parse(JSON.stringify(object));

module.exports = randomMove;
