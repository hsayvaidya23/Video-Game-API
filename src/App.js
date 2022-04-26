import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchedGames(data);
      });
  };

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3")
    .then((response) => response.json())
    .then((data)=> {
      console.log(data);
      setGameDeals(data);
    })
    
  }, [])
  

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search For A Game</h1>
        <input
          type="text "
          placeholder="Minecraft..."
          onChange={(event) => {
            setGameTitle(event.target.value);
          }}
        />
        <button onClick={searchGame}>Search Game Title</button>
        <div className="games">
          {searchedGames.map((game, key) => {
            return (
              <div className="game" key={key}>
                {game.external}
                <img src={game.thumb} />
                ${game.cheapest}
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        {gameDeals.map((game, key) =>{
          return (
            <h1 key={key}>{game.title} </h1>
          )
        })}
      </div>
    </div>
  );
}

export default App;
