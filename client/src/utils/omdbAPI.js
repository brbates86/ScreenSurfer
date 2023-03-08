const omdbUrl = "http://www.omdbapi.com/?";
const apiKey = "apikey=e9c91b8b";

export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };
  
export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

export const saveMovie = async (movieData, token) => {
    return fetch('/api/profiles', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
    });
};

export const deleteMovie = (movieId, token) => {
    return fetch(`/api/users/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

export const searchOmdbMovies = (query) => {
    return fetch (`${omdbUrl}t=${query}&${apiKey}`)
};