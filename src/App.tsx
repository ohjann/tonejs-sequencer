import React from "react";
import "./styles/1bit-ui.css";
import "./styles/App.css";
import Grid from "./components/Grid";
import PlayPause from "./components/PlayPause";

function App() {
  return (
    <div className="App crt">
      <div>
        <Grid />
        <PlayPause />
      </div>
    </div>
  );
}

export default App;
