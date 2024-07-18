import React from 'react'
import './Quiz.css'
import { Link } from 'react-router-dom'
const Quiz = () => {
  return (
    <div>


      <section className='quiz-section'>
        <div className="quiz-container">
          <div className="quiz-content">
            <h2>Dear Parents !</h2>
            <p>
              Hello! plz provide your valuable information througth this QNA, it will help to determine your childs nature. 
            </p>
            <Link to='/qna'><a className='quiz-play-button'>Start Quiz</a></Link>
          </div>
          <div className="imgBx">
            <img src="/src/assets/chat.svg" alt="Character" />
          </div>
          
        </div>
      </section>


    </div>

  )
}

export default Quiz
