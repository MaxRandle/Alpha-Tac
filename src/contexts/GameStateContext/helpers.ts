import {
  Board,
  GameState,
  Index,
  LineOfThree,
  Move,
  Token,
  WAYS_TO_WIN,
} from "./types";

export const INITIAL_GAME_STATE: GameState = {
  miniboards: [
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
    [
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
      Token.unoccupied,
    ],
  ],
  megaboard: [
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
  ],
  lastMove: {
    board: 0,
    tile: 0,
  },
  turn: -1,
  gameStarted: false,
  victor: Token.unoccupied,
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
  newGameState.miniboards[board][tile] = newGameState.turn;
  newGameState.lastMove = { board, tile };
  newGameState.turn = (newGameState.turn * -1) as Token.agent | Token.player;

  // check local victories
  newGameState.megaboard[board] = checkVictory(newGameState.miniboards[board]);

  // check global victory
  newGameState.victor = checkVictory(newGameState.megaboard);

  return newGameState;
};

const checkVictory = (board: Board): Token => {
  // checks all the possible ways there are to win a board
  const noNullBoard = board.map((x) =>
    x === Token.unoccupied ? Token.draw : x
  );
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
  } else if (!board.includes(Token.unoccupied)) {
    return Token.draw;
  } else {
    return Token.unoccupied;
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
    gameState.victor === Token.unoccupied && // the game is not over
    gameState.miniboards[board][tile] === Token.unoccupied && // the tile is unoccupied
    gameState.megaboard[board] === Token.unoccupied && // the board is not won
    (gameState.lastMove.tile === board || // the current board position is equal to the lastMove tile position
      gameState.gameStarted === false || // this is this the first move of the game
      gameState.megaboard[gameState.lastMove.tile] !== Token.unoccupied) // the board in the position of the lastMove tile position is won
  );
};

export const getRandomMove = (gameState: GameState) => {
  const legalMoves = getLegalMoves(gameState);
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
  return randomMove;
};

export const staticEval = (gameState: GameState): number => {
  // return a number indicating how advantageous the game is.

  // weight given to megaboard so that it's valued more than the miniboards
  // the state of the large board should be valued more than the state of the small ones.
  // 8 is the maximum weight that can be assigned to a miniboard
  const MEGABOARD_WEIGHT = 64;

  // check if the game is won
  if (gameState.victor === Token.agent) {
    return Infinity;
  } else if (gameState.victor === Token.player) {
    return -Infinity;
  } else if (gameState.victor === Token.draw) {
    return 0;
  }

  // evaluate mega board & generate the ways to win for he miniboards
  // build up weights for the miniboards
  // essentially 'how many ways for either player to win the megaboard rely on winning a given miniboard'
  let miniboardWeights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const megaboardScore: number = WAYS_TO_WIN.reduce(
    (totalScore: number, currentLine: LineOfThree) => {
      const LINE_EVAL = evaluateLine(gameState.megaboard, currentLine);
      const LINE_IMPORTANCE = 1 + Math.abs(LINE_EVAL);

      // get the indexes in the line
      const idx0 = currentLine[0];
      const idx1 = currentLine[1];
      const idx2 = currentLine[2];

      // add to the miniboard weights
      miniboardWeights[idx0] += LINE_IMPORTANCE;
      miniboardWeights[idx1] += LINE_IMPORTANCE;
      miniboardWeights[idx2] += LINE_IMPORTANCE;

      return totalScore + LINE_EVAL;
    },
    0
  );

  // evaluate mini-boards
  let miniboardScores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  // sum over  each miniboard
  gameState.miniboards.forEach((miniboard, idx) => {
    // if the miniboard has not already been won
    if (gameState.megaboard[idx] === Token.unoccupied) {
      // how many ways do we have to win the miniboard
      const currentMiniboardScore = evaluateBoard(miniboard);
      // multiply by the number of ways the miniboard can be used to win the megaboard
      miniboardScores[idx] = currentMiniboardScore * miniboardWeights[idx];
    }
  });

  const sumMiniboardScores = miniboardScores.reduce(
    (totalMiniboardScore, currentMiniboardScore) => {
      return totalMiniboardScore + currentMiniboardScore;
    },
    0
  );

  const evaluation = sumMiniboardScores + megaboardScore * MEGABOARD_WEIGHT;
  return evaluation;
};

export const evaluateBoard = (board: Board): number => {
  // number winning lines does the board contain
  // minus number of losing lines
  return WAYS_TO_WIN.reduce(
    (totalScore, currentLine) => totalScore + evaluateLine(board, currentLine),
    0
  );
};

export const evaluateLine = (board: Board, line: LineOfThree): 1 | 0 | -1 => {
  // returns 1 if the player has a way to win the line
  // returns -1 if the agent has a way to win the line
  // otherwise returns 0

  let includesAgentToken = false;
  let includesPlayerToken = false;
  let includesDrawToken = false;

  line.forEach((index: Index) => {
    if (board[index] === Token.agent) includesAgentToken = true;
    else if (board[index] === Token.player) includesPlayerToken = true;
    else if (board[index] === Token.draw) includesDrawToken = true;
  });

  if (includesAgentToken && !includesPlayerToken && !includesDrawToken) {
    return Token.agent;
  }
  if (!includesAgentToken && includesPlayerToken && !includesDrawToken) {
    return Token.player;
  }

  return Token.draw;
};

// tree search
const minimax = (
  gameState: GameState,
  depth: number,
  alpha: number,
  beta: number,
  turn: 1 | -1
) => {
  // exit condition
  if (depth <= 0 || gameState.victor !== Token.unoccupied) {
    return staticEval(gameState);
  }

  // get all child gameStates
  const children = getLegalMoves(gameState).map((move) =>
    applyMoveToGameState(gameState, move)
  );

  // optimise depth
  if (children.length <= 2) {
    depth += 1;
  }
  if (children.length >= 18) {
    depth -= 1;
  }

  // if maximizing player
  if (turn === 1) {
    let maxEval = -Infinity;
    children.every((child) => {
      const currentEval = minimax(child, depth - 1, alpha, beta, -1);
      maxEval = Math.max(maxEval, currentEval);
      alpha = Math.max(alpha, currentEval);
      if (beta <= alpha) {
        return false; // break
      }
      return true; // continue
    });
    return maxEval;
  }

  // if minimizing player
  else {
    let minEval = +Infinity;
    children.every((child) => {
      const currentEval = minimax(child, depth - 1, alpha, beta, 1);
      minEval = Math.min(minEval, currentEval);
      beta = Math.min(beta, currentEval);
      if (beta <= alpha) {
        return false; // break
      }
      return true; // continue
    });
    return minEval;
  }
};

export const getBestMove = (gameState: GameState) => {
  let depth = 6; // recommended 6
  const moves = getLegalMoves(gameState);
  const moveScores = moves.map((move) => ({
    ...move,
    score: minimax(
      applyMoveToGameState(gameState, move),
      depth,
      -Infinity,
      +Infinity,
      -1
    ),
  }));

  const bestMove = moveScores.reduce((bestMove, currentMove) =>
    currentMove.score > bestMove.score ? currentMove : bestMove
  );

  console.log("Best move:");
  console.log(`Board: ${bestMove.board} Tile: ${bestMove.tile}`);
  console.log(`Evaluation: ${bestMove.score}`);
  return bestMove;
};

export async function getBestMoveAsync(gameState: GameState): Promise<Move> {
  return new Promise<Move>((resolve) =>
    setTimeout(() => resolve(getBestMove(gameState)), 0)
  );
}
