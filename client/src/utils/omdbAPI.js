const omdbUrl = "http://www.omdbapi.com/?";
const apiKey = "apikey=e9c91b8b";

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

export const searchOmdbMovies = (query) => {
    return fetch (`${omdbUrl}t=${query}&${apiKey}`)
};