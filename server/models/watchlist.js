const {Schema, model} = require('mongoose')

const watchlistSchema = new Schema({
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movies'
            
        }
    ],   
})

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;
