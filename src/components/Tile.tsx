import styled, { css } from "styled-components";
import { IoMdClose, IoMdRadioButtonOff } from "react-icons/io";
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

const StyledTile = styled.button<{ isLegal?: boolean }>`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  user-select: none;
  position: relative;

  background-color: var(--tile-bg);
  width: 32px;
  height: 32px;
  border-radius: 4px;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

  &:disabled {
    cursor: default;
  }
`;

export const Tile: React.FC<ITileProps> = ({ tile, board, ...props }) => {
  const { gameState, playMove } = useGameStateContext();

  const IS_LEGAL = isMoveLegal(gameState, { tile, board });
  const IS_PLAYER_TURN = gameState.turn === Token.player;

  const TOKEN: Token = gameState.megaBoard[board][tile];

  return (
    <StyledTile
      isLegal={IS_LEGAL && IS_PLAYER_TURN}
      disabled={!IS_LEGAL || !IS_PLAYER_TURN}
      onClick={() => playMove({ tile, board })}
      {...props}
    >
      {TOKEN === Token.agent ? (
        <IoMdRadioButtonOff color="white" size={26} />
      ) : TOKEN === Token.player ? (
        <IoMdClose color="red" size={28} />
      ) : null}
    </StyledTile>
  );
};
