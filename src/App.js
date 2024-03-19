import "./App.css";
import { useState } from "react";
import Timer from "./components/timer";
import Settings from "./components/settings";
import { getGeneratedWords, getCapturedWords } from "./lib/dataProvider";

function App() {
  const [time, setTime] = useState(60);
  const [words, setWords] = useState([]);
  function applySettings({ number, option, isDuplicate: removeDuplicate }) {
    setTime(number);
    if (option === "all") {
      setWords(
        getGeneratedWords(removeDuplicate).concat(
          getCapturedWords(removeDuplicate)
        )
      );
    } else if (option === "generated") {
      setWords(getGeneratedWords(removeDuplicate));
    } else {
      setWords(getCapturedWords(removeDuplicate));
    }
  }
  return (
    <div className="App">
      <Settings onApply={applySettings} />
      <Timer startingTime={time} words={words} />
    </div>
  );
}

export default App;
