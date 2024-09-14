
// eslint-disable-next-line no-unused-vars
import React from "react";
import SearchBar from "./SearchBar";
import "./App.css";
import search from "./assets/search.jpg"

function App() {
  return (
    <div className="App">
      <div>
        <a href="" target="_blank">
          <img src={search} className="logo" alt="Vite logo" />
        </a>
      
      </div>
      <h1> Country Details Finder</h1>
      <SearchBar />
    </div>
  );
}

export default App;
