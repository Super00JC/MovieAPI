import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Movielist from "./Movielist";
import Favorites from "./Favorites";

const API_KEY = "0c36f9d8813a090c46788966ade3e953";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre: "Unknown",
      releaseDate: movie.release_date.split("-")[0],
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const Home = () => (
  <div className="home-container">
    <h1>Welcome to the Movie App</h1>
    <p>Discover and search for your favorite movies!</p>
    <Link to="/movies" className="nav-link">
      Go to Movie List
    </Link>
  </div>
);

const MovieApp = () => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  const toggleFavorite = (movie) => {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter((favId) => favId !== movie.id));
    } else {
      setFavorites([...favorites, movie.id]);
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/movies" className="nav-link">
          Movies
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <Movielist favorites={favorites} toggleFavorite={toggleFavorite} />
          }
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} movies={movies} />}
        />
      </Routes>
    </Router>
  );
};

export default MovieApp;
