import React, { useState } from 'react'
import './Games.css'
import { Link } from 'react-router-dom';

const Games = () => {
const [menu, setMenu] = useState("guessing");

  return (

    <section className='game-section'>
      <div class="game-container">
               <game-body>
          <div class="game-container">
            <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Guess The Word</h2>
                <p>A word-guessing game where players try to identify a word or phrase based on clues provided by the game.</p>
                <Link to='/guessing'>
                  <a className='play-button-game' onClick={() => setMenu("guessing")}>Play Now</a>
                </Link>

              </div>
            </div>
            <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Memory Game</h2>
                <p>JumpMan! JumpMan! JumpMan! JumpMan! JumpMan! Jumps from platform to platform. How far can you jump?</p>
                <Link to='/memory'>
                  <a className='play-button-game' onClick={() => setMenu("memory")}>Play Now</a>
                </Link>
              </div>
            </div>
            {/* <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Mad Birds</h2>
                <p>Play the world's best bird flinging, monster popping game! Dish out revenge on the greedy monsters who stole their eggs.</p>
                <Link to='/guessing'>
                  <a className='play-button-game' onClick={() => setMenu("guessing")}>Play Now</a>
                </Link>
              </div>
            </div> */}
          </div>
          {/* <!-- Second Set --> */}
          <div class="game-container">
            <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Slide Puzzle</h2>
                <p>Move tiles to form a complete image or sequence by sliding them within a grid</p>
                {/* <a href="sixthousandcuts.html">Play Now</a> */}
                <Link to='/slidepuzzle'>
                  <a className='play-button-game' onClick={() => setMenu("slidepuzzle")}>Play Now</a>
                </Link>
              </div>
            </div>
            <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Mole Game</h2>
                <p>A First Person Shooter Game of Survival. Survive an Apocalyptic Forest. You have multiple weapons, your wit, and know how. Survive and be the Soul Survivor.</p>
                <Link to='/mole'>
                  <a className='play-button-game' onClick={() => setMenu("mole")}>Play Now</a>
                </Link>
              </div>
            </div>
            {/* <div class="game-box">
              <span></span>
              <div class="game-content">
                <h2>Vampire God</h2>
                <p>The human race is ending. Zombie's have taken over. The Vampire God has come down to earth to save the humans and keep his food supply alive.</p>
                <Link to='/guessing'>
                  <a className='play-button-game' onClick={() => setMenu("guessing")}>Play Now</a>
                </Link>
              </div>
            </div> */}
          </div>
          {/* <!-- End Second Set --> */}
          
        </game-body>


        

      </div>
    </section>





  )
}

export default Games
