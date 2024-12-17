import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "0c36f9d8813a090c46788966ade3e953";
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch movies
const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre: "Unknown", // Replace this with real genre logic if needed
      releaseDate: movie.release_date.split("-")[0],
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const MovieList = ({ favorites, toggleFavorite }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎥 Movie List</h1>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>
      <main className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-image"
              />
              <h2>{movie.title}</h2>
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.releaseDate}</p>
              <button
                className={`favorite-button ${
                  favorites.includes(movie.id) ? "favorited" : ""
                }`}
                onClick={() => toggleFavorite(movie)}
              >
                {favorites.includes(movie.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </main>
    </div>
  );
};

export default MovieList;
