import { useEffect, useState } from 'react';
import fruitItems from './fruits.json';
import './Memory.css';

function Card({ fruit, flipped, chooseCard }) {
  const cardClickHandle = () => {
    if (!flipped) {
      chooseCard(fruit);
    }
  };

  return (
    <div className={`memory-card ${flipped ? 'flipped' : ''}`} onClick={cardClickHandle}>
      {flipped ? (
        <img src={fruit.src} alt={fruit.name} />
      ) : (
        <div className="memory-card-back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
            <line x1="12" y1="19" x2="12" y2="19.01"></line>
          </svg>
        </div>
      )}
    </div>
  );
}

function App() {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);

  const chooseCard = (fruit) => {
    if (!fruitOne) {
      setFruitOne(fruit);
    } else if (!fruitTwo) {
      setFruitTwo(fruit);
    }
  };

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setFruits(allFruits);
  };

  const resetGame = () => {
    setFruitOne(null);
    setFruitTwo(null);
    initGame();
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
        setFruits((prevFruits) => {
          return prevFruits.map((item) => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true };
            }
            return item;
          });
        });
        setTimeout(() => {
          setFruitOne(null);
          setFruitTwo(null);
        }, 1000);
      } else {
        setTimeout(() => {
          setFruitOne(null);
          setFruitTwo(null);
        }, 1000);
      }
    }
  }, [fruitTwo, fruitOne]);

  return (
    <>
      <div className="memory-body">
        <h1 className="memory-title">Memory Game</h1>
        {fruits.length ? (
          <>
            <button className="memory-reset" onClick={resetGame}>
              <svg
                className="memory-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1.002 7.935 1.007 9.425 4.747"></path>
                <path d="M20 4v5h-5"></path>
              </svg>
            </button>
            <div className="memory-game-block">
              {fruits.map((fruit, key) => (
                <Card
                  className="memory-card"
                  key={key}
                  chooseCard={chooseCard}
                  flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched}
                  fruit={fruit}
                />
              ))}
            </div>
          </>
        ) : (
          <button className="memory-start-game" onClick={initGame}>
            Start Game
          </button>
        )}
      </div>
    </>
  );
}

export default App;