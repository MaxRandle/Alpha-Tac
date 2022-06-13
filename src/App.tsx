import { MegaBoard } from "./components/MegaBoard";
import { Board } from "./components/Board";
import { Tile } from "./components/Tile";

function App() {
  return (
    <MegaBoard>
      {[...Array(9)].map((_board, boardIndex) => (
        <Board key={boardIndex}>
          {[...Array(9)].map((_tile, tileIndex) => (
            <Tile key={tileIndex} board={boardIndex} tile={tileIndex} />
          ))}
        </Board>
      ))}
    </MegaBoard>
  );
}

export default App;
