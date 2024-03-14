import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";

function Timer({ words, startingTime }) {
  const [time, setTime] = useState(startingTime); // initial time in seconds
  const [startTime, setStartTime] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [word, setWord] = useState("");
  const [score, setScore] = useState(0);
  const [guessedWords, setGuessedWords] = useState([]);
  const [passedWords, setPassedWords] = useState([]);
  const [errors, setErrors] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const cantPass = () => !word || word === "" || passedWords.length === 3;
  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((time) =>
          time <= 0 ? 0 : parseFloat((time - 0.1).toFixed(1))
        );
      }, 100);
    } else if (time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      setEndGame(true);
    }
    return () => clearInterval(interval);
  }, [isPaused, time, words]);

  useEffect(() => {
    setTime(startingTime);
  }, [startingTime]);

  const handleBuzz = () => {
    if (isPaused) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setWord(words[randomIndex]);
      setStartTime(time);
    }
    setIsPaused(!isPaused);
  };
  const handlePasso = () => {
    if (cantPass()) {
      return;
    }
    setIsPaused(true);
    if (
      guessedWords.some((guessedWord) => guessedWord.word === word) ||
      errors.some((error) => error.word === word) ||
      passedWords.some((passed) => passed.word === word)
    ) {
      return;
    }
    setPassedWords([...passedWords, { word: word, time: startTime - time }]);
  };

  const handleAddScore = () => {
    if (isPaused) {
      if (
        guessedWords.some((guessedWord) => guessedWord.word === word) ||
        errors.some((error) => error.word === word) ||
        passedWords.some((passed) => passed.word === word)
      ) {
        return;
      }
      setScore(score + 1);
      setGuessedWords([
        ...guessedWords,
        { word: word, time: startTime - time },
      ]);
    }
  };

  const handleSubtractScore = () => {
    if (isPaused) {
      if (
        guessedWords.some((guessedWord) => guessedWord.word === word) ||
        errors.some((error) => error.word === word) ||
        passedWords.some((passed) => passed.word === word)
      ) {
        return;
      }
      if (score > 0) {
        setScore(score - 1);
      }
      setErrors([...errors, { word: word, time: startTime - time }]);
    }
  };

  const handleReset = () => {
    setIsPaused(true);
    setGuessedWords([]);
    setErrors([]);
    setPassedWords([]);
    setWord("");
    setScore(0);
    setTime(startingTime);
    setEndGame(false);
  };

  return (
    <div className="container">
      <h1
        className="title is-size-1"
        style={{
          backgroundColor: time <= 5 ? "red" : "blue",
          color: "white",
          textShadow: "2px 2px grey",
        }}
      >
        {time}
      </h1>
      <h1
        className="subtitle"
        style={{
          backgroundColor: "#31e83d",
          color: "white",
          textShadow: "2px 2px grey",
          fontSize: "7rem",
        }}
      >
        {word.toUpperCase()}
      </h1>
      <h1
        className="subtitle is-size-1"
        style={{
          backgroundColor: "#ff9447",
          color: "white",
          textShadow: "2px 2px grey",
        }}
      >
        {score}
      </h1>
      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button
            className="button is-danger is-large"
            onClick={handleBuzz}
            disabled={endGame}
          >
            BUZZER
          </button>
          <button
            className="button is-primary is-large"
            onClick={handlePasso}
            disabled={endGame || cantPass()}
          >
            PASSO
          </button>
        </div>
      </div>

      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button
            className={endGame ? "button is-success" : "button is-light"}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button
            className="button is-success"
            onClick={handleAddScore}
            disabled={endGame}
          >
            +
          </button>
          <button
            className="button is-danger"
            onClick={handleSubtractScore}
            disabled={endGame}
          >
            -
          </button>
        </div>
      </div>
      <div>
        <div className="level-item has-text-centered mb-5">
          <table className="table is-centered is-size-4" border="solid">
            <thead>
              <tr>
                <th>Parole Indovinate</th>
                <th>Parole Sbagliate</th>
                <th>Parole Passate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    {guessedWords.map((guessedWord, index) => (
                      <li key={index} style={{ color: "green" }}>
                        {guessedWord.word} - {guessedWord.time.toFixed(1)}s
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index} style={{ color: "red" }}>
                        {error.word} - {error.time.toFixed(1)}s
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {passedWords.map((passed, index) => (
                      <li key={index} style={{ color: "black" }}>
                        {passed.word} - {passed.time.toFixed(1)}s
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Timer;
