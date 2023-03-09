const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }

  type Movie {
    movieId: String
    title: String
    release: String
    description: String
    screenTime: String
  }

  input MovieInput {
    movieId: String
    title: String
    release: String
    description: String
    screenTime: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    me: User
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(UserId: ID!): User
    saveMovie(input: MovieInput): User
    removeMovie(movieId: String): User
  }
`;

module.exports = typeDefs;

// type Watchlist {
//   movies: [Movie]
// }

// addWatchlist(movies: [MovieInput]!): User
// addReview(movieId: ID!, reivewText: String!, reviewAuthor: String!): Movie
