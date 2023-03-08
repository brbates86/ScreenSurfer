import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveMovie, searchOmdbMovies } from '../utils/omdbAPI';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';


const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchOmdbMovies(searchInput);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const items = await response.json();

      if (!items.Search) {
        return setSearchedMovies([]);
      }

      const movieData = items.Search.map((movie) => ({
        movieId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        released: movie.Released,
        description: movie.Plot,
        screenTime: movie.Runtime,
      }));

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const response = await saveMovie(movieToSave, token);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main>
      <div>
        <h1>Search for Movies!</h1>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <button type='submit'>Submit Search</button>
        </form>
      </div>
      <div>
        <h2>
          {searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'Search for a movie to begin'}
        </h2>
        {searchedMovies.map((movie) => {
          return (
            <div key={movie.movieId}>
              <p>{movie.title}</p>
              <button style={{'backgroundColor': 'red'}} onClick={() => handleSaveMovie(movie.movieId)}>Save this Movie</button>
            </div>
          )
        })}
      </div>
    </main>
  );
};

export default SearchMovies;