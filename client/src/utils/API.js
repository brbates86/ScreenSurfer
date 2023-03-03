import Profile from '../../../server/models/Profile';

const omdbUrl = "http://www.omdbapi.com/?";
const apiKey = "apikey=e9c91b8b";

function saveMovie(movietitle, poster, year, released, director, genre, rating){
    new Profile
}


const searchMovie = async (title) => {
        return fetch(`${omdbUrl}t=${title}&${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.Search.forEach((item) => {
                var movietitle = item.Title;
                var poster = item.Poster;
                var year = item.Year;
                var released = item.Released;
                var director = item.Director;
                var genre = item.Genre;
                var rating = item.Metascore;
                saveMovie(movietitle, poster, year, released, director, genre, rating);
            })
        })
}


searchMovie('Nope');