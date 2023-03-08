export const getSavedMovieTitles = () => {
    const savedMovieTitles = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : [];
  
    return savedMovieTitles;
  };
  
  export const saveMovieTitles = (movieTitleArr) => {
    if (movieTitleArr.length) {
      localStorage.setItem('saved_movies', JSON.stringify(movieTitleArr));
    } else {
      localStorage.removeItem('saved_movies');
    }
  };
  
  export const removemovieTitle = (movieTitle) => {
    const savedMovieTitles = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : null;
  
    if (!savedMovieTitles) {
      return false;
    }
  
    const updatedSavedMovieTitles = savedMovieTitles?.filter((savedMovieTitle) => savedMovieTitle !== movieTitle);
    localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieTitles));
  
    return true;
  };
  