import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const checkWinner = (board) => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of winningPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const win = checkWinner(board);
    if (win) setWinner(win);
  }, [board]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="square"
          >
            {value}
          </button>
        ))}
      </div>
      <div className="status">
        {winner ? `${winner} Wins! 🎉` : `Next Player: ${isXTurn ? "X" : "O"}`}
      </div>
      <button
        className="reset-btn"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setWinner(null);
          setIsXTurn(true);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
