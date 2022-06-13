export enum Token {
  agent = 1,
  player = -1,
  draw = 0,
  unplayed = "unplayed",
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

export type MegaBoard = [
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
  megaBoard: MegaBoard;
  localVictories: Board;
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
