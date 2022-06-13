import { ReactNode } from "react";
import styled from "styled-components";

interface IMegaBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const StyledDiv = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
`;

export const MegaBoard: React.FC<IMegaBoardProps> = ({
  children,
  ...props
}) => {
  return <StyledDiv {...props}>{children}</StyledDiv>;
};
