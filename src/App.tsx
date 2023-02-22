import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [music, setMusic] = useState("");

  function getRecommendations(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Getting recommendations for " + music);
  }
  return (
    <div className="App">
      <div>
        <h1>Music Recommendation Engine</h1>
        <p>Enter a song title to get recommendations.</p>
        <form onSubmit={(e) => getRecommendations(e)}>
          <input
            type="text"
            value={music}
            onChange={(e) => setMusic(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
