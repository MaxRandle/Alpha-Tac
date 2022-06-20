import { Board, GameState, Index, Move, Token } from "./types";

export const INITIAL_GAME_STATE: GameState = {
  megaBoard: [
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
    [
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
      Token.unplayed,
    ],
  ],
  localVictories: [
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
    Token.unplayed,
  ],
  lastMove: {
    board: 0,
    tile: 0,
  },
  turn: -1,
  gameStarted: false,
  victor: Token.unplayed,
};

export const applyMoveToGameState = (
  gameState: GameState,
  move: Move
): GameState => {
  const { board, tile } = move;
  // create a new gameState which we can mutate
  let newGameState: GameState = {
    ...INITIAL_GAME_STATE,
    ...JSON.parse(JSON.stringify(gameState)),
  };

  // set gameStarted = true
  newGameState.gameStarted = true;

  // update new board state with move
  newGameState.megaBoard[board][tile] = newGameState.turn;
  newGameState.lastMove = { board, tile };
  newGameState.turn = (newGameState.turn * -1) as Token.agent | Token.player;

  // check local victories
  newGameState.localVictories[board] = checkVictory(
    newGameState.megaBoard[board]
  );

  // check global victory
  newGameState.victor = checkVictory(newGameState.localVictories);

  return newGameState;
};

const checkVictory = (board: Board): Token => {
  // checks all the possible ways there are to win a board
  const noNullBoard = board.map((x) => (x === Token.unplayed ? Token.draw : x));
  let vicArray = [
    noNullBoard[0] + noNullBoard[1] + noNullBoard[2],
    noNullBoard[3] + noNullBoard[4] + noNullBoard[5],
    noNullBoard[6] + noNullBoard[7] + noNullBoard[8],
    noNullBoard[0] + noNullBoard[3] + noNullBoard[6],
    noNullBoard[1] + noNullBoard[4] + noNullBoard[7],
    noNullBoard[2] + noNullBoard[5] + noNullBoard[8],
    noNullBoard[0] + noNullBoard[4] + noNullBoard[8],
    noNullBoard[2] + noNullBoard[4] + noNullBoard[6],
  ];
  if (Math.max(...vicArray) === 3) {
    return Token.agent;
  } else if (Math.min(...vicArray) === -3) {
    return Token.player;
  } else if (!board.includes(Token.unplayed)) {
    return Token.draw;
  } else {
    return Token.unplayed;
  }
};

export const getLegalMoves = (gameState: GameState): Move[] => {
  // get an array of all legal moves in the given gameState
  let legalMoves: Move[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const move: Move = { board: i as Index, tile: j as Index };
      if (isMoveLegal(gameState, move)) {
        legalMoves.push(move);
      }
    }
  }
  return legalMoves;
};

export const isMoveLegal = (gameState: GameState, move: Move): boolean => {
  // check if move is legal in the given gameState
  const { board, tile } = move;
  return (
    gameState.victor === Token.unplayed && // the game is not over
    gameState.megaBoard[board][tile] === Token.unplayed && // the tile is unoccupied
    gameState.localVictories[board] === Token.unplayed && // the board is not won
    (gameState.lastMove.tile === board || // the current board position is equal to the lastMove tile position
      gameState.gameStarted === false || // this is this the first move of the game
      gameState.localVictories[gameState.lastMove.tile] !== Token.unplayed) // the board in the position of the lastMove tile position is won
  );
};

export const getRandomMove = (gameState: GameState) => {
  const legalMoves = getLegalMoves(gameState);
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
  return randomMove;
};
