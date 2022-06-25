import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  INITIAL_GAME_STATE,
  applyMoveToGameState,
  getBestMove,
} from "./helpers";
import { GameState, Move, Token } from "./types";

interface IGameStateContext {
  gameState: GameState;
  playMove: (move: Move) => void;
}

const GameStateContext = createContext<IGameStateContext>({
  gameState: INITIAL_GAME_STATE,
  playMove: (move) => console.log(move),
});
export const useGameStateContext = () => useContext(GameStateContext);

const GameStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const playMove = (move: Move) => {
    const newGameState = applyMoveToGameState(gameState, move);
    setGameState(newGameState);
  };

  const context = { gameState, playMove };

  useEffect(() => {
    // plays on behalf of the agent
    if (
      gameState.turn === Token.agent &&
      gameState.victor === Token.unoccupied
    ) {
      // playMove(getRandomMove(gameState));
      playMove(getBestMove(gameState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <GameStateContext.Provider value={context}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateContextProvider;
