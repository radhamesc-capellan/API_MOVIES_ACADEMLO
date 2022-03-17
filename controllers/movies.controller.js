/*
getAllMovies,
getMovieById,
createNewMovie,
updateMovie, //patch
deleteMovie, //soft delete
 */

const { Movie } = require('../models/movie.model');

const { catchAsync } = require('../utils/catchAsync');

//get list all movies
exports.getAllMovies = catchAsync( async (req, res, next) =>{

} );


//get list movies by id
exports.getMovieById = catchAsync( async (req, res, next) =>{

} );

//create new movies and save in DB
exports.createNewMovie = catchAsync( async (req, res, next) =>{

} );

//update movies
exports.updateMovie = catchAsync( async (req, res, next) =>{

} );

//delete movies
exports.deleteMovie = catchAsync( async (req, res, next) =>{

} );
