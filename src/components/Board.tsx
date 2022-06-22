import { IoMdClose, IoMdRadioButtonOff } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import styled, { css } from "styled-components";
import {
  Index,
  Token,
  useGameStateContext,
} from "../contexts/GameStateContext";
import { Tile } from "./Tile";

interface IBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: Index;
}

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
`;

const StyledVictoryBoard = styled.div<{ isLastMove?: boolean }>`
  background-color: var(--tile-bg);
  border-radius: 4px;
  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ isLastMove }) =>
    isLastMove
      ? css`
          box-shadow: var(--tile-lastmove-box-shadow);
        `
      : ""}
`;

export const Board: React.FC<IBoardProps> = ({ index, ...props }) => {
  const { gameState } = useGameStateContext();

  const BOARD_VICTORY = gameState.localVictories[index];
  const IS_LAST_MOVE = gameState.lastMove.board === index;

  if (BOARD_VICTORY === Token.unplayed) {
    return (
      <StyledBoard {...props}>
        {[...Array(9)].map((_tile, tileIndex) => (
          <Tile
            key={tileIndex}
            board={index as Index}
            tile={tileIndex as Index}
          />
        ))}
      </StyledBoard>
    );
  }

  return (
    <StyledVictoryBoard isLastMove={IS_LAST_MOVE}>
      {BOARD_VICTORY === Token.agent ? (
        <IoMdRadioButtonOff color="white" size={52} />
      ) : BOARD_VICTORY === Token.player ? (
        <IoMdClose color="red" size={56} />
      ) : BOARD_VICTORY === Token.draw ? (
        <BiMinus color="#78909c" size={60} />
      ) : null}
    </StyledVictoryBoard>
  );
};
