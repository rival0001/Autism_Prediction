import React, { useState, useEffect, useRef } from 'react';
import './Guessing.css';

const wordsData = [
  {
    word: "addition",
    hint: "The process of adding numbers"
  },
  {
    word: "meeting",
    hint: "Event in which people come together"
  },
  {
    word: "number",
    hint: "Math symbol used for counting"
  },
  {
    word: "exchange",
    hint: "The act of trading"
  },
  {
    word: "canvas",
    hint: "Piece of fabric for oil painting"
  },
  {
    word: "garden",
    hint: "Space for planting flower and plant"
  },
  {
    word: "position",
    hint: "Location of someone or something"
  },
  {
    word: "feather",
    hint: "Hair like outer covering of bird"
  },
  {
    word: "comfort",
    hint: "A pleasant feeling of relaxation"
  },
  {
    word: "tongue",
    hint: "The muscular organ of mouth"
  },
  {
    word: "expansion",
    hint: "The process of increase or grow"
  },
  {
    word: "country",
    hint: "A politically identified region"
  },
  {
    word: "group",
    hint: "A number of objects or persons"
  },
  {
    word: "taste",
    hint: "Ability of tongue to detect flavour"
  },
  {
    word: "store",
    hint: "Large shop where goods are traded"
  },
  {
    word: "field",
    hint: "Area of land for farming activities"
  },
  {
    word: "friend",
    hint: "Person other than a family member"
  },
  {
    word: "pocket",
    hint: "A bag for carrying small items"
  },
  {
    word: "needle",
    hint: "A thin and sharp metal pin"
  },
  {
    word: "expert",
    hint: "Person with extensive knowledge"
  },
  {
    word: "statement",
    hint: "A declaration of something"
  },
  {
    word: "second",
    hint: "One-sixtieth of a minute"
  },
  {
    word: "library",
    hint: "Place containing collection of books"
  },
];

function WordScramble() {
  const [wordText, setWordText] = useState('');
  const [hintText, setHintText] = useState('');
  const [time, setTime] = useState(30);
  const [inputValue, setInputValue] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const timerRef = useRef(null);

  const initTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current);
          alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
          initGame();
          return 30; // Reset time after game restarts
        }
      });
    }, 1000);
  };

  const initGame = () => {
    const randomObj = wordsData[Math.floor(Math.random() * wordsData.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    setWordText(wordArray.join(""));
    setHintText(randomObj.hint);
    setCorrectWord(randomObj.word.toLowerCase());
    setInputValue('');
    setTime(30);
    initTimer();
  };

  const checkWord = () => {
    const userWord = inputValue.toLowerCase();
    if (!userWord) {
      alert("Please enter the word to check!");
      return;
    }
    if (userWord !== correctWord) {
      alert(`Oops! ${userWord} is not the correct word`);
    } else {
      clearInterval(timerRef.current);
      alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
      initGame();
    }
  };

  useEffect(() => {
    initGame();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className='guessing-section'>
      <div className="guessing-container">
        <h2>Guess the correct word</h2>
        <div className="guessing-content">
          <p className="guessing-word">{wordText}</p>
          <div className="guessing-details">
            <p className="guessing-hint">Hint: <span>{hintText}</span></p>
            <p className="guessing-time">Time Left: <span><b>{time}</b>s</span></p>
          </div>
          <input
            type="text"
            spellCheck="false"
            placeholder="Enter a valid word"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="guessing-buttons">
            <button className="guessing-refresh-word" onClick={initGame}>Refresh Word</button>
            <button className="guessing-check-word" onClick={checkWord}>Check Word</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WordScramble;