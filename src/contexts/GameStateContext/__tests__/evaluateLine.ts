import { evaluateLine } from "../helpers";
import { Board, Token, WAYS_TO_WIN } from "../types";

it("produces the correct output for board1", () => {
  const board1: Board = [
    Token.unoccupied,
    Token.agent,
    Token.unoccupied,
    Token.unoccupied,
    Token.player,
    Token.agent,
    Token.agent,
    Token.unoccupied,
    Token.unoccupied,
  ];

  /**
   *  | |o| |
   *  | |x|o|
   *  |o| | |
   */

  // rows
  expect(evaluateLine(board1, WAYS_TO_WIN[0])).toEqual(1);
  expect(evaluateLine(board1, WAYS_TO_WIN[1])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[2])).toEqual(1);
  // cols
  expect(evaluateLine(board1, WAYS_TO_WIN[3])).toEqual(1);
  expect(evaluateLine(board1, WAYS_TO_WIN[4])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[5])).toEqual(1);
  // diags
  expect(evaluateLine(board1, WAYS_TO_WIN[6])).toEqual(-1);
  expect(evaluateLine(board1, WAYS_TO_WIN[7])).toEqual(0);
});

it("produces the correct output for board2", () => {
  const board1: Board = [
    Token.agent,
    Token.player,
    Token.unoccupied,
    Token.agent,
    Token.player,
    Token.player,
    Token.unoccupied,
    Token.unoccupied,
    Token.unoccupied,
  ];

  /**
   *  |o|x| |
   *  |o|x|x|
   *  | | | |
   */

  // rows
  expect(evaluateLine(board1, WAYS_TO_WIN[0])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[1])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[2])).toEqual(0);
  // cols
  expect(evaluateLine(board1, WAYS_TO_WIN[3])).toEqual(1);
  expect(evaluateLine(board1, WAYS_TO_WIN[4])).toEqual(-1);
  expect(evaluateLine(board1, WAYS_TO_WIN[5])).toEqual(-1);
  // diags
  expect(evaluateLine(board1, WAYS_TO_WIN[6])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[7])).toEqual(-1);
});

it("produces the correct output for board3", () => {
  const board1: Board = [
    Token.agent,
    Token.player,
    Token.agent,
    Token.agent,
    Token.player,
    Token.agent,
    Token.player,
    Token.agent,
    Token.player,
  ];

  /**
   *  |o|x|o|
   *  |o|x|o|
   *  |x|o|x|
   */

  // rows
  expect(evaluateLine(board1, WAYS_TO_WIN[0])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[1])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[2])).toEqual(0);
  // cols
  expect(evaluateLine(board1, WAYS_TO_WIN[3])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[4])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[5])).toEqual(0);
  // diags
  expect(evaluateLine(board1, WAYS_TO_WIN[6])).toEqual(0);
  expect(evaluateLine(board1, WAYS_TO_WIN[7])).toEqual(0);
});
