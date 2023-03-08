import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { SimpleGrid } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { saveMovie, searchOmdbMovies } from '../utils/omdbAPI';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

const { 
  Box,
  Button, 
  Card, 
  CardBody, 
  Container, 
  Form, 
  FormControl, 
  Heading,
  Image,
  Text,
} = chakraTheme.components


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
            const { items } = await response.json();
            const movieData = items.map((movie) => ({
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year,
                released: movie.Released,
                director: movie.Director,
                genre: movie.Genre,
                rating: movie.Metascore,
                plot: movie.Plot,
                movieId: movie.imdbID,
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
        //savedmovie page, needs to be styled.
        <>
      <div fluid className='text-light bg-dark pt-5'>
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <SimpleGrid>
              <Box xs={12} md={8}>
                <FormControl
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Box>
              <Box xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Box>
            </SimpleGrid>
          </Form>
        </Container>
      </div>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <SimpleGrid>
          {searchedMovies.map((movie) => {
            return (
              <Box md="4">
                <Card key={movie.movieId} border='dark'>
                  {movie.poster ? (
                    <Image src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' />
                  ) : null}
                  <CardBody>
                    <Heading>{movie.title}</Heading>
                    <p className='small'>Directors: {movie.director}</p>
                    <Text>{movie.plot}</Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveMovie(movie.title)}>
                        {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                          ? 'This movie has already been saved!'
                          : 'Save this movie!'}
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </>
    )
};

export default SearchMovies;