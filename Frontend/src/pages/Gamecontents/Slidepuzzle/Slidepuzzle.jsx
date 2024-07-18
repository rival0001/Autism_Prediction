import React, { useState, useEffect } from 'react';
import './Slidepuzzle.css';
import logo from './logo.png';
import doremonfull from './doremonfull.jpg'

const rows = 3;
const columns = 3;

const initialImgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

const SlidePuzzle = () => {
  const [imgOrder, setImgOrder] = useState([...initialImgOrder]);
  const [turns, setTurns] = useState(0);
  const [currTile, setCurrTile] = useState(null);

  useEffect(() => {
    setImgOrder([...initialImgOrder]);
  }, []);

  const handleDragStart = (e, tile) => {
    setCurrTile(tile);
  };

  const handleDrop = (e, tile) => {
    e.preventDefault();
    if (!currTile) {
      return;
    }

    const currCoords = currTile.id.split("-");
    const r = parseInt(currCoords[0]);
    const c = parseInt(currCoords[1]);

    const otherCoords = tile.id.split("-");
    const r2 = parseInt(otherCoords[0]);
    const c2 = parseInt(otherCoords[1]);

    // Check if the tiles are adjacent (one step up, down, left, or right)
    const moveLeft = r === r2 && c2 === c - 1;
    const moveRight = r === r2 && c2 === c + 1;
    const moveUp = c === c2 && r2 === r - 1;
    const moveDown = c === c2 && r2 === r + 1;

    const isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
      const newImgOrder = [...imgOrder];
      const currIndex = r * columns + c;
      const otherIndex = r2 * columns + c2;

      [newImgOrder[currIndex], newImgOrder[otherIndex]] = [newImgOrder[otherIndex], newImgOrder[currIndex]];

      setImgOrder(newImgOrder);
      setTurns(turns + 1);
      setCurrTile(null); // reset currTile
    }
  };

  const resetGame = () => {
    setImgOrder([...initialImgOrder]);
    setTurns(0);
    setCurrTile(null);
  };

  return (
    <div className="slide-container">
      <img id="title" src={logo} alt="logo" />
      <div id="board">      
        {imgOrder.map((img, index) => {
          const r = Math.floor(index / columns);
          const c = index % columns;
          return (
            <img
              key={index}
              id={`${r}-${c}`}
              src={`/${img}.jpg`}
              alt={`tile ${img}`}
              draggable
              onDragStart={(e) => handleDragStart(e, { id: `${r}-${c}`, src: `/${img}.jpg` })}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, { id: `${r}-${c}`, src: `/${img}.jpg` })}
            />
          );
        })}
      </div>
      <img className='slide-preview' src={doremonfull} />
      <h2 className='preview-spell' >Preview</h2>
      <h1 className='slide-turn'>Turns: <span id="turns">{turns}</span></h1>
      <button className='slide-reset' onClick={resetGame}>Reset</button>
    </div>
  );
};

export default SlidePuzzle;