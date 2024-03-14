import "./App.css";
import Timer from "./components/timer";
import Settings from "./components/settings";
import { getGeneratedWords } from "./lib/dataProvider";
import React, { useState } from "react";

function App() {
  const [time, setTime] = useState(60);
  function applySettings({ number, option, isDuplicate }) {
    setTime(number);
  }
  return (
    <div className="App">
      <Settings onApply={applySettings} />
      <Timer startingTime={time} words={getGeneratedWords()} />
    </div>
  );
}

export default App;
