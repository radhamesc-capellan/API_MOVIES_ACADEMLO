/*
getAllActors,
getActorById,
createNewActor,
updateActor, //patch
deleteActor, //soft delete
 */

const { Actor } = require('../models/actor.model');

const { catchAsync } = require('../utils/catchAsync');

//get list all actors
exports.getAllActors = catchAsync( async (req, res, next) =>{

} );


//get list actors by id
exports.getActorById = catchAsync( async (req, res, next) =>{

} );

//create new actors and save in DB
exports.createNewActor = catchAsync( async (req, res, next) =>{

} );

//update actors
exports.updateActor = catchAsync( async (req, res, next) =>{

} );

//delete actors
exports.deleteActor = catchAsync( async (req, res, next) =>{

} );

