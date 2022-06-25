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

const StyledTile = styled.button<{
  isPlayable?: boolean;
  isLastMove?: boolean;
  isAgentThinking?: boolean;
}>`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;

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

  ${({ isPlayable }) =>
    isPlayable
      ? css`
          background-color: var(--tile-legal-bg);
          &:hover {
            background-color: var(--tile-hover-bg);
          }
        `
      : ""}

  ${({ isAgentThinking }) =>
    isAgentThinking
      ? css`
          &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
              90deg,
              transparent,
              white,
              transparent
            );
            opacity: 0.2;
            animation: shimmer 1s infinite;
            content: "";
          }

          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
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

  const TOKEN: Token = gameState.miniboards[board][tile];

  return (
    <StyledTile
      isPlayable={IS_LEGAL && IS_PLAYER_TURN}
      isAgentThinking={IS_LEGAL && !IS_PLAYER_TURN}
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
