import React, { useState, useEffect } from 'react';
import './Mole.css';
import MontyMoleImage from './monty-mole.png';
import PiranhaPlantImage from './piranha-plant.png';

const Mole = () => {
    const [score, setScore] = useState(0);
    const [currMoleTile, setCurrMoleTile] = useState(null);
    const [currPlantTile, setCurrPlantTile] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setGame();
    }, []);

    const setGame = () => {
        setInterval(setMole, 500);
        setInterval(setPlant, 1000);
    };

    const getRandomTile = () => {
        return Math.floor(Math.random() * 9).toString();
    };

    const setMole = () => {
        if (gameOver) return;

        let num = getRandomTile();
        if (currPlantTile === num) return;

        setCurrMoleTile(num);
    };

    const setPlant = () => {
        if (gameOver) return;

        let num = getRandomTile();
        if (currMoleTile === num) return;

        setCurrPlantTile(num);
    };

    const selectTile = (tileId) => {
        if (gameOver) return;

        if (tileId.toString() === currMoleTile) {
            setScore(score + 10);
            setCurrMoleTile(null);
        } else if (tileId.toString() === currPlantTile) {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setScore(0);
        setCurrMoleTile(null);
        setCurrPlantTile(null);
        setGameOver(false);
    };

    return (
        <div>
            <h1 className='mole-title'>Mole Game</h1>
            <h2 className='mole-gameover' id="score">{gameOver ? `GAME OVER: ${score}` : score}</h2>
            <div className="mole-board" id="board">
                {Array.from({ length: 9 }).map((_, index) => (
                    <Tile
                        key={index}
                        id={index}
                        onClick={selectTile}
                        currMoleTile={currMoleTile}
                        currPlantTile={currPlantTile}
                    />
                ))}
            </div>
            {gameOver && <button className='mole-reset' onClick={resetGame}>Reset Game</button>}
        </div>
    );
};

const Tile = ({ id, onClick, currMoleTile, currPlantTile }) => {
    return (
        <div id={id} className="tile" onClick={() => onClick(id)}>
            {id.toString() === currMoleTile && <img src={MontyMoleImage} alt="Mole" />}
            {id.toString() === currPlantTile && <img src={PiranhaPlantImage} alt="Plant" />}
        </div>
    );
};

export default Mole;