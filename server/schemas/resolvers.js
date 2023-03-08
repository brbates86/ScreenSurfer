const { AuthenticationError } = require("apollo-server-express");
const { User, Movies, Review, Watchlist } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Make it so a logged in user can only remove a skill from their own profile
    addWatchlist: async (parent, { movies }, context) => {
      if (context.user) {
        const updatedUser = await User.findOne({ name: context.user.name });
        const newWatchlist = [{ movies: [...movies] }];
        updatedUser.watchlists = newWatchlist;
        await updatedUser.save();
        return updatedUser;
      }
    },

    addReview: async (parent, args, { moviesId, reviewText, ReviewAuthor }) => {
      return Movies.findOneAndUpdate(
        { _id: moviesId },
        {
          $addToSet: { reviews: { reviewText, ReviewAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
