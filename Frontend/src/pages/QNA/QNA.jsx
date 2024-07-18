import React, { useState } from 'react';
import './QNA.css';

function QNA() {
    const questions = [
        "Question 1: He/She often notices small sounds when others do not?",
        "Question 2: He/She usually concentrates more on the whole picture, rather than the small details?",
        "Question 3: In a social group, he/she can easily keep track of several different people's conversions?",
        "Question 4: He/She finds it easy to go back and forth between different activities?",
        "Question 5: He/She doesn't know how to keep a conversation going with his/her peers?",
        "Question 6: He/She good at chit-chat?",
        "Question 7: When He/She was in preschool, he/she used to enjoy playing games involving pretending with other children?",
        "Question 8: When he/she read a story, he/she finds it difficult to work out the character's intentions or feelings?",
        "Question 9: He/She finds it easy to work out what someone is thinking or feeling just by looking at their face?",
        "Question 10: He/She finds it hard to make new friends?",
        "Question 11: What is the age of your child ? ",
        "Question 12: What is the gender of your child ? ",
        "Question 13: What is the Ethnicity of your child ?",
        "Question 14: Did your child often suffer with Jaundice ?",
        "Question 15: Did anyone in your family has autism ?",
        "Question 16: Who completed the test ?",
    ];

    const [answers, setAnswers] = useState(new Array(18).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [output, setOutput] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleAnswer = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);
        // Proceed to the next question
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };

    const handleReset = () => {
        setAnswers(new Array(questions.length).fill(null));
        setCurrentQuestion(0);
        setOutput(null); // Reset the output state
        setFormSubmitted(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
          
        // Construct the query parameters with all answers
        const queryParams = answers.map((answer, index) => `answer${index + 1}=${answer}`).join('&');
      
        console.log("Answers submitted:", answers);
      
        // Make a GET request to Flask server
        const response = await fetch(`http://127.0.0.1:5010/api?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        // Parse the response as JSON
        const data = await response.json();
      
        // Update the output state with the response from the server
        setOutput(data.output);

        // Set formSubmitted to true to hide the form
        setFormSubmitted(true);
    };

    return (
        <section className='qna-section'>
            <div className='qna-container'>
                {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <div className='qna-box'>
                            {currentQuestion < questions.length && (
                                <div>
                                    <p>{questions[currentQuestion]}</p>
                                    {/* Render options based on the question */}
                                    {currentQuestion < 10 ? (
                                        // For Yes/No questions
                                        <div>
                                            <button className='qna-next' type="button" onClick={() => handleAnswer(1)}>Yes</button>
                                            <button className='qna-next' type="button" onClick={() => handleAnswer(0)}>No</button>
                                        </div>
                                    ) : (
                                        // For character-based questions
                                        <div>
                                        {currentQuestion === 10 && (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={answers[currentQuestion] || ''}
                                                    onChange={(e) => {
                                                        const newAnswers = [...answers];
                                                        newAnswers[currentQuestion] = e.target.value;
                                                        setAnswers(newAnswers);
                                                    }}
                                                    placeholder="Enter your answer"
                                                />
                                                <button className='qna-next' type="button" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
                                            </div>
                                        )}
                                        {currentQuestion === 11 && (
                                            <>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('m')}>A. Male</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('f')}>B. Female</button>

                                            </>
                                        )}
                                        {currentQuestion === 12 && (
                                            <>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('asian')}>A. Asian</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('south asian')}>B. South Asian</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('middle eastern')}>C. Middle Eastren</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('White European')}>D. White European</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('Latino')}>E. Latino</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('Others')}>F. Others</button>

                                            </>
                                        )}
                                        {currentQuestion === 13 && (
                                            <>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('yes')}>A. Yes</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('no')}>B. No</button>

                                            </>
                                        )}
                                        {currentQuestion === 14 && (
                                            <>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('yes')}>A. Yes</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('no')}>B. No</button>

                                            </>
                                        )}
                                        {currentQuestion === 15 && (
                                            <>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('family member')}>A. Family Member</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('Health care professional')}>B. Health care professional</button>
                                                <button className='qna-next' type="button" onClick={() => handleAnswer('Self')}>C. Self</button>
                                            </>
                                        )}

                                    </div>

                                    )}
                                </div>
                            )}
                            {/* Render submit button if all questions are answered */}
                            {currentQuestion === questions.length && (
                                <div>
                                    <p>All questions answered!</p>
                                    <button className='qna-submit' type="submit">Submit</button>
                                </div>
                            )}
                        </div>
                        {/* Render reset button */}
                        <button className='qna-reset' type="button" onClick={handleReset}>Reset</button>
                    </form>
                ) : (
                    // Render output and reset button if form is submitted
                    <div>
                        {output !== null && (
                            <div className='qna-output'>
                                <p>Prediction of autism: {output}</p>
                            </div>
                        )}
                        <button className='qna-reset' type="button" onClick={handleReset}>Reset</button>
                    </div>
                    
                )}
            </div>
        </section>
    );
}

export default QNA;