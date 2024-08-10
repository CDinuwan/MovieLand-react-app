import React, { useEffect, useState } from "react";
import "./App.css";
import SearchImage from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState("");

  const searchMovies = async (searchString) => {
    const response = await fetch(`${API_URL}&s=${searchString}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Matrix");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchString}
          onChange={(e) => {setSearchString(e.target.value)}}
        />
        <img src={SearchImage} alt="search" onClick={() => searchMovies(searchString)} />
      </div>

      {
        movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie}/>
                ))}
                
            </div>
        ): (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
        )
      }
    </div>
  );
};

export default App;
