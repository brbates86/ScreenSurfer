import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($input: MovieInput) {
    saveMovie(input: $input) {
      _id
      name
      movieCount
      savedMovies {
        movieId
        title
        release
        description
        screenTime
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      movieCount
      savedMovies {
        movieId
        title
        release
        description
        screenTime
      }
    }
  }
`;

// export const ADD_WATCHLIST = gql`
//   mutation addWatchlist($movies: [MovieInput]!) {
//     addWatchlist(movies: $movies) {
//       title
//       release
//       description
//       screenTime
//     }
//   }
