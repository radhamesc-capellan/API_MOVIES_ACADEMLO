/*
getAllMovies,
getMovieById,
createNewMovie,
updateMovie, //patch
deleteMovie, //soft delete
 */
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
//Models
const { Movie } = require('../models/movie.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Actor } = require('../models/actor.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { filterObj } = require('../utils/filterObj');
const { storage } = require('../utils/firebase');

//get list all movies
exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' },
    include: [{ model: Actor }]
  });

  res.status(200).json({
    status: 'success',
    data: { movies }
  });
});

//get list movies by id
exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id }
  });

  if (!movie) {
    return next(new AppError(404, 'Movie Not Found'));
  }

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

//create new movies and save in DB
exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/movies/${title}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    filmPic: imgUploaded.metadata.fullPath,
    rating,
    genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  res.status(200).json({
    status: 'success',
    data: { newMovie }
  });
});

//update movies
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id }
  });

  if (!movie) {
    return next(new AppError(404, 'Movie Not Found'));
  }
  const data = filterObj(
    req.body,
    'title',
    'description',
    'duration',
    'rating',
    'genre'
  );

  await movie.update({ ...data });

  res.status(204).json({ status: 'success' });
});

//delete movies
exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({
    where: { id }
  });

  if (!movie) {
    return next(new AppError(404, 'Movie Not Found'));
  }
  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
