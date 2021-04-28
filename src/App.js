import React, { useState } from 'react'
import {Board} from "./components/Board"
import './App.css'
const App = props => {
  const initialState = {
    squares : Array(9).fill(null),
  };
  const [history, setHistory] = useState([initialState]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0)
  const currentHistory = history[stepNumber];
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleOnClick = i => {
      // Should be copy array to new array and handle on the new array
      // If don't copy setState hook won't rerender. 
      // I think the problem when I changed one of the values in array 
      // React doesn't see any reason to re-render because state hasn't changed; 
      // the same address and same value of all array
      // https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render
      // 
      // const squaresTemp = squares.slice();
      // squaresTemp[i] = "X";
      // setSquares(squaresTemp);
      console.log(history);
      let historyCopy = history.slice(0, stepNumber + 1);
      const current = historyCopy[historyCopy.length - 1];
      // Note: when clone a array should read : https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/
      // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
      // array, object, function is mutable. So when use "=" to copy file which will only copy reference to original array 
      // but use spread or some feature of the Array like slice(), filter(), map() to clone array, it's shallow copy
      // Shallow copy mean only copy value of array in one level of array and deeper lever won't copy value
      const squares = [...current.squares];
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = xIsNext === true ? "X" : "O";
      historyCopy = [...historyCopy,{squares}];
      console.log(historyCopy);
      setStepNumber(historyCopy.length-1)
      setHistory(historyCopy);
      // setSquares([...squares]);
      setxIsNext(!xIsNext);
  }

  const jumpTo = step => {
    setStepNumber(step);
    setxIsNext(step%2 === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(currentHistory.squares);
  const status = winner ? 'Winner: ' + winner :`Next player: ${xIsNext ? "X" : "O"}`;
  return (
    <div className="game">
        <div className="game-board">
        <div className="status">{status}</div>
          <Board squares={currentHistory.squares} onClick={(i) => handleOnClick(i)} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
    </div>
  );
}

export default App;
