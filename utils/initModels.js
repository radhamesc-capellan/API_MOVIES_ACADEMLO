const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

const initModels = () => {

    User.hasMany(Review);
    Review.belongsTo(User);

    Movie.hasMany(Review);
    Review.belongsTo(Movie);

    Actor.belongsToMany(ActorInMovie);
    ActorInMovie.belongsToMany(Actor);

    Movie.belongsToMany(ActorInMovie);
    ActorInMovie.belongsToMany(Movie);
};