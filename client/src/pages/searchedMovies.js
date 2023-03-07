import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { extendBaseTheme, SimpleGrid } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { saveMovie, searchOmdbMovies } from '../utils/omdbAPI';
import { saveMovieTitles, getSavedMovieTitles } from '../utils/localStorage';

const { 
  Button, 
  Form, 
  FormControl, 
  Container, 
  Card, 
  CardBody, 
  Box,
  Image,
  Heading,
  Text,
} = chakraTheme.components


const SearchMovies = () => {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedtitles, setSavedtitles] = useState(getSavedMovieTitles());

    useEffect(() => {
        return () => saveMovieTitles(savedtitles);
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
                rating: movie.Metascore
          }));

            setSearchedMovies(movieData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveMovie = async (title) => {
        const movieToSave = searchedMovies.find((movie) => movie.title === title);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }
        try {
          const response = await saveMovie(movieToSave, token);
          if (!response.ok) {
            throw new Error('something went wrong!');
          }
          setSavedtitles([...savedtitles, movieToSave.title]);
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
                <Card key={movie.title} border='dark'>
                  {movie.poster ? (
                    <Image src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' />
                  ) : null}
                  <CardBody>
                    <Heading>{movie.title}</Heading>
                    <p className='small'>Directors: {movie.director}</p>
                    <Text>{movie.description}</Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedtitles?.some((savedtitle) => savedtitle === movie.title)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveMovie(movie.title)}>
                        {savedtitles?.some((savedtitle) => savedtitle === movie.title)
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