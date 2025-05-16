"use client";
import React, { useState } from 'react';

const TMDB_API_KEY = 'd7dd9c59891665d94a08deec3b746a3b';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<any>(null);

  const handleSearch = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const movieId = data.results[0].id;
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
            .then(res => res.json())
            .then(setMovie);
        } else {
          alert('Movie not found');
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={handleSearch}>Search</button>
      {movie && (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
