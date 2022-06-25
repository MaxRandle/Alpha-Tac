export enum Token {
  agent = 1,
  player = -1,
  draw = 0,
  unoccupied = "unoccupied",
}

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Board = [
  Token,
  Token,
  Token,
  Token,
  Token,
  Token,
  Token,
  Token,
  Token
];

export type Miniboards = [
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board
];

export interface Move {
  board: Index;
  tile: Index;
}

export interface GameState {
  miniboards: Miniboards;
  megaboard: Board;
  lastMove: Move;
  turn: 1 | -1;
  gameStarted: boolean;
  victor: Token;
}

export interface IContext {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  playMove: (move: Move) => GameState;
}

export type LineOfThree = [Index, Index, Index];

export enum BoardWeights {
  center = 4, // 4 ways to win with the center
  corner = 3, // 3 ways to win with a corner
  edge = 2, // 2 ways to with with an edge
}

export const BOARD_WEIGHTS = [
  BoardWeights.corner,
  BoardWeights.edge,
  BoardWeights.corner,
  BoardWeights.edge,
  BoardWeights.center,
  BoardWeights.edge,
  BoardWeights.corner,
  BoardWeights.edge,
  BoardWeights.corner,
];

export const WAYS_TO_WIN: LineOfThree[] = [
  // 3 in a line
  [0, 1, 2], // across the top
  [3, 4, 5], // across the middle
  [6, 7, 8], // across the bottom
  [0, 3, 6], // down the left
  [1, 4, 7], // down the middle
  [2, 5, 8], // down the right
  [0, 4, 8], // diagonal to bottom-right
  [2, 4, 6], // diagonal to bottom-left
];
