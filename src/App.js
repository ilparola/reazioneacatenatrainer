import "./App.css";
import Timer from "./components/timer";
import { getGeneratedWords } from "./lib/dataProvider";
function App() {
  return (
    <div className="App">
      <Timer startingTime={60} words={getGeneratedWords()} />
    </div>
  );
}

export default App;
