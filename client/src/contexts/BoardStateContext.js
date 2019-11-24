import React, { createContext, useState, useEffect } from "react";

export const BoardStateContext = createContext();

const BoardStateContextProvider = props => {
  const [boardState, setBoardState] = useState({
    boardArray: new Array(9).fill(new Array(9).fill(null)).map(x => x.slice(0)),
    victoryArray: new Array(9).fill(null),
    lastMove: {
      square: null,
      tile: null
    },
    turn: -1,
    victory: null
  });

  return <BoardStateContext.Provider value={[boardState, setBoardState]}>{props.children}</BoardStateContext.Provider>;
};

export default BoardStateContextProvider;
