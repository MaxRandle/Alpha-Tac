import styled from "styled-components";
import { IoMdClose, IoMdRadioButtonOff } from "react-icons/io";

interface ITileProps extends React.HTMLAttributes<HTMLButtonElement> {
  token?: "x" | "o";
  tile: number;
  board: number;
}

const StyledTile = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  user-select: none;

  background-color: var(--tile-bg);
  width: 32px;
  height: 32px;
  border-radius: 4px;
`;

export const Tile: React.FC<ITileProps> = ({ token, ...props }) => {
  return (
    <StyledTile {...props}>
      {token === "o" ? (
        <IoMdRadioButtonOff />
      ) : token === "x" ? (
        <IoMdClose />
      ) : null}
    </StyledTile>
  );
};
