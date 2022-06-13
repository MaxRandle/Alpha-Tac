import { createContext, ReactNode, useState } from "react";
import { INITIAL_GAME_STATE, applyMoveToGameState } from "./helpers";
import { GameState, Move } from "./types";

const GameStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const playMove = (move: Move) => {
    const newGameState = applyMoveToGameState(gameState, move);
    setGameState(newGameState);
  };

  const context = { gameState, playMove };

  const GameStateContext = createContext(context);

  return (
    <GameStateContext.Provider value={context}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
