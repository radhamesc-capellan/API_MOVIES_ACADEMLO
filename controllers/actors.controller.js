/*
getAllActors,
getActorById,
createNewActor,
updateActor, //patch
deleteActor, //soft delete
 */
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
// Models
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');
const { Movie } = require('../models/movie.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');

//get list all actors
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorInMovie }]
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});

//get list actors by id
exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({
    where: { id }
  });

  if (!actor) {
    return next(new AppError(404, 'Actor Not Found'));
  }

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

//create new actors and save in DB
exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, age, gender, country, adwars, rating } = req.body;

  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    age,
    gender,
    country,
    adwars,
    rating,
    profilePic: imgUploaded.metadata.fullPath
  });

  res.status(200).json({
    status: 'success',
    data: { newActor }
  });
});

//update actors
exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) {
    return next(new AppError(404, 'No actor found with that ID'));
  }

  const data = filterObj(
    req.body,
    'name',
    'age',
    'gender',
    'country',
    'adwars',
    'rating'
  );

  await actor.update({ ...data });

  res.status(204).json({ status: 'success' });
});

//delete actors
exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) {
    return next(new AppError(404, 'No actor found with that ID'));
  }

  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
