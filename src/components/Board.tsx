import { ReactNode } from "react";
import styled from "styled-components";

interface IBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
`;

export const Board: React.FC<IBoardProps> = ({ children, ...props }) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};
