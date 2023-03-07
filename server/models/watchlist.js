const {Schema, model} = require('mongoose')

const watchlistSchema = new Schema({
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movies'
        }
    ],
    userWatchlist: [{
         type: Schema.Types.ObjectId,
         ref: 'User'
    }
    ]
    
})

const Watchlist = model('Watchlist', watchlistSchema);

module.exports = Watchlist;
