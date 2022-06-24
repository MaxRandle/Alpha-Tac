import styled, { css } from "styled-components";
import { IoMdClose } from "react-icons/io";
import { BiRadioCircle } from "react-icons/bi";
import {
  Index,
  isMoveLegal,
  Token,
  useGameStateContext,
} from "../contexts/GameStateContext";

interface ITileProps extends React.HTMLAttributes<HTMLButtonElement> {
  tile: Index;
  board: Index;
}

const StyledTile = styled.button<{ isLegal?: boolean; isLastMove?: boolean }>`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  user-select: none;
  position: relative;

  background-color: var(--tile-bg);
  width: 100%;
  height: 100%;
  border-radius: 4px;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  ${({ isLegal }) =>
    isLegal
      ? css`
          background-color: var(--tile-legal-bg);
          &:hover {
            background-color: var(--tile-hover-bg);
          }
        `
      : ""}

  ${({ isLastMove }) =>
    isLastMove
      ? css`
          box-shadow: var(--tile-lastmove-box-shadow);
        `
      : ""}

  &:disabled {
    cursor: default;
  }
`;

export const Tile: React.FC<ITileProps> = ({ tile, board, ...props }) => {
  const { gameState, playMove } = useGameStateContext();

  const IS_LEGAL = isMoveLegal(gameState, { tile, board });
  const IS_PLAYER_TURN = gameState.turn === Token.player;
  const IS_LAST_MOVE =
    gameState.gameStarted &&
    gameState.lastMove.board === board &&
    gameState.lastMove.tile === tile;

  const TOKEN: Token = gameState.megaBoard[board][tile];

  return (
    <StyledTile
      isLegal={IS_LEGAL && IS_PLAYER_TURN}
      isLastMove={IS_LAST_MOVE}
      disabled={!IS_LEGAL || !IS_PLAYER_TURN}
      onClick={() => playMove({ tile, board })}
      {...props}
    >
      {TOKEN === Token.agent ? (
        <BiRadioCircle color="white" />
      ) : TOKEN === Token.player ? (
        <IoMdClose color="red" />
      ) : null}
    </StyledTile>
  );
};
