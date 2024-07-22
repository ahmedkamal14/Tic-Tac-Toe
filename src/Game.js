import { useState } from "react";
import Board from "./Board";

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(index, count) {
    setHistory(history.slice(0, index + 1));
    setXIsNext(history.length % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #` + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h2>Latest Moves</h2>
        <ol className="moves-list" start={0}>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
