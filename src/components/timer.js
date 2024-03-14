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
    return () => clearInterval(interval);
  }, [isPaused, time]);

  const handleBuzz = () => {
    if (isPaused) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setWord(words[randomIndex]);
      setStartTime(time);
    }
    setIsPaused(!isPaused);
  };
  const handlePasso = () => {
    setIsPaused(true);

    setPassedWords([...passedWords, { word: word, time: startTime - time }]);
  };

  const handleAddScore = () => {
    if (isPaused) {
      setScore(score + 1);

      setGuessedWords([
        ...guessedWords,
        { word: word, time: startTime - time },
      ]);
    }
  };

  const handleSubtractScore = () => {
    if (isPaused && score > 0) {
      setScore(score - 1);
      setErrors([...errors, { word: word, time: startTime - time }]);
    }
  };

  const handleReset = () => {
    setGuessedWords([]);
    setErrors([]);
    setPassedWords([]);
    setWord("");
    setScore(0);
    setTime(startingTime);
  };

  return (
    <div className="container">
      <h1
        className="title is-size-1"
        style={{
          backgroundColor: time <= 5 ? "red" : "blue",
          color: "white",
          textShadow: "2px 2px black",
        }}
      >
        {time}
      </h1>
      <h1
        className="subtitle is-size-1"
        style={{
          backgroundColor: "#31e83d",
          color: "white",
          textShadow: "2px 2px black",
        }}
      >
        {word}
      </h1>
      <h1
        className="subtitle is-size-1"
        style={{
          backgroundColor: "#ff9447",
          color: "white",
          textShadow: "2px 2px black",
        }}
      >
        {score}
      </h1>
      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button className="button is-danger is-large" onClick={handleBuzz}>
            BUZZER
          </button>
          <button className="button is-primary is-large" onClick={handlePasso}>
            PASSO
          </button>
        </div>
      </div>

      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button className="button is-light" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <div className="level-item has-text-centered mb-5">
        <div className="buttons are-centered">
          <button className="button is-success" onClick={handleAddScore}>
            +
          </button>
          <button className="button is-danger" onClick={handleSubtractScore}>
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
