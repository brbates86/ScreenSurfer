import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { searchOmdbMovies } from "../utils/omdbAPI";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { SAVE_MOVIE } from "../utils/mutations";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });
  const [saveMovie] = useMutation(SAVE_MOVIE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchOmdbMovies(searchInput);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const items = await response.json();

      if (!items.Search) {
        return setSearchedMovies([]);
      }

      const movieData = items.Search.map((movie) => ({
        movieId: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        release: movie.Year,
        description: movie.Plot,
        screenTime: movie.Runtime,
      }));

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find(
      (movie) => movie.movieId === movieId
    );
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const response = await saveMovie({
        variables: {
          input: movieToSave,
        },
      });
      if (!response) {
        throw new Error("something went wrong!");
      }
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  ACTION!
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : "Search for a movie to begin"}
        </h2>

        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card
                key={movie.movieId}
                style={{ width: "40rem" }}
                border="dark"
              >
                {movie.poster ? (
                  <Card.Img
                    src={movie.poster}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className="small">Released: {movie.release}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMovie(movie.movieId)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )
                        ? "This movie has already been saved!"
                        : "Save this Movie!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
  );
};

export default SearchMovies;

// {
//   /* <main>
// <div>
//   <h1>Search for Movies!</h1>
//   <form onSubmit={handleFormSubmit}>
//     <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
//     <button type='submit'>Submit Search</button>
//   </form>
// </div>
// <div>
//   <h2>
//     {searchedMovies.length ? `Viewing ${searchedMovies.length} results:` : 'Search for a movie to begin'}
//   </h2>
//   {searchedMovies.map((movie) => {
//     return (
//       <div key={movie.movieId}>
//         <p>{movie.title}</p>
//         <button style={{'backgroundColor': 'red'}} onClick={() => handleSaveMovie(movie.movieId)}>Save this Movie</button>
//       </div>
//     )
//   })}
// </div>
// </main> */
// }
