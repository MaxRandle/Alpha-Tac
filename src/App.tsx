import { MegaBoard } from "./components/MegaBoard";
import { Board } from "./components/Board";
import GameStateContextProvider from "./contexts/GameStateContext/GameStateContext";
import { Index } from "./contexts/GameStateContext";

function App() {
  return (
    <GameStateContextProvider>
      <MegaBoard>
        {[...Array(9)].map((_board, boardIndex) => (
          <Board key={boardIndex} index={boardIndex as Index} />
        ))}
      </MegaBoard>
    </GameStateContextProvider>
  );
}

export default App;
