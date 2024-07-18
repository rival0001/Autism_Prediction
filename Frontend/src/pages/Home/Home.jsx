import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
    
      <section>
      <div className="container">
        {/* <header>
          <a href="index.html" className="logo">G4A</a>
          <ul>
            <li><a href="g4a.html" className="active">Home</a></li>
            <li><a href="games.html">Games</a></li>
            <li><a href="Quiz/Quiz.html">Quiz</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </header> */}
        <div className="content">
          <h2>AutiPlay</h2>
          <p>
            Video games provide kids affected by autism with an opportunity for joint attention and shared interests with their peers. Studies suggest that kids with autism may have somewhat unique and unusual interest in these games that differs from their peers but nonetheless gives them a basis for shared focus on an activity.
          </p>
          <Link to='/games'><a className='home-play-button'>Play Now</a></Link>
        </div>
        <div className="imgBx">
          <img src="/src/assets/character.png" alt="Character" />
        </div>
        
      </div>
    </section>
    </div>
  )
}

export default Home
