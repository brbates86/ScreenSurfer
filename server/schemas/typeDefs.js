const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    watchlist: [Watchlist]!
  }

  type Movies {
    title: String!
    release: Date!
    description: String!
    screenTime: String!
    
  }

  type Watchlist {
    movies: [movies]!
    UserWatchlist: [User]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(username: String!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(UserId: ID!): User
    addWatchlist(movies: [Movies]!): Movies
    addReviews(
      movieId: ID!
      reivewText: String!
      reviewAuthor: String!
    ): Movies
    

    
    removeProfile: Profile
    
  }
`;

module.exports = typeDefs;
