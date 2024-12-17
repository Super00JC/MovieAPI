import React from "react";
import "./App.css";

const Favorites = ({ favorites, movies }) => {
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.releaseDate}</p>
          </div>
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
