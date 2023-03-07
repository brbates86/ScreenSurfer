const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    watchlist: [Watchlist]
  }

  type Movie {
    title: String
    release: String
    description: String
    screenTime: String
    
  }

  input MovieInput {
    title: String!
    release: String!
    description: String!
    screenTime: String!
    
  }

  type Watchlist {
    movies: [Movie]
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
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(UserId: ID!): User
    addWatchlist(movies: [MovieInput]!): [Movie]
    addReview(
      movieId: ID!
      reivewText: String!
      reviewAuthor: String!
    ): Movie
    
  }
`;

module.exports = typeDefs;
