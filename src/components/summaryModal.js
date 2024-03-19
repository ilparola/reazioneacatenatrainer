// SummaryModal.js
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const SummaryModal = ({
  isOpen,
  handleClose,
  score,
  guessedWords,
  errorWords,
  passedWords,
}) => {
  const componentRef = useRef();
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let today = `${day}-${month}-${year} ${hour}:${minutes}`;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card" ref={componentRef}>
        <header className="modal-card-head">
          <p className="modal-card-title">Riepliogo - {today}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <h1 className="title">Punteggio: {score}</h1>

          <h2 className="subtitle">Guessed Words</h2>
          <ul>
            {guessedWords.map((word, index) => (
              <li key={index}>{word.word + "-" + word.time.toFixed(1)}</li>
            ))}
          </ul>

          <h2 className="subtitle">Error Words</h2>
          <ul>
            {errorWords.map((word, index) => (
              <li key={index}>{word.word + "-" + word.time.toFixed(1)}</li>
            ))}
          </ul>

          <h2 className="subtitle">Passed Words</h2>
          <ul>
            {passedWords.map((word, index) => (
              <li key={index}>{word.word + "-" + word.time.toFixed(1)}</li>
            ))}
          </ul>
        </section>
        <footer className="modal-card-foot">
          <ReactToPrint
            trigger={() => <button className="button">Stampa</button>}
            content={() => componentRef.current}
          />
        </footer>
      </div>
    </div>
  );
};

export default SummaryModal;
