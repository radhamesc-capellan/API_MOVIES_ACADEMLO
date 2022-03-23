/*
 getAllUsers,
 getUserById,
 createNewUser,
 logingUser
 */

 //!role magnament??????

 const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
 const { User } = require('../models/user.model');

 //Utils
 const { catchAsync } = require('../utils/catchAsync');

 const { appError } = require('../utils/appError');

 dotenv.config({path : '../config.env'});


 //get list all getAllUsers
 exports.getAllUsers = catchAsync( async (req, res, next) =>{
    const users = await User.findAll({
       where: {status: 'active'}, 
       attributes: {exclude: ['password']},
       include: [

       ]
    });
 
 } );
 
 
 //get list Users by id
 exports.getUsersById = catchAsync( async (req, res, next) =>{
 
 } );
 
 //create new Users and save in DB
 exports.createNewUsers = catchAsync( async (req, res, next) =>{
 
 } );
 
 //update Users
 exports.updateUsers = catchAsync( async (req, res, next) =>{
 
 } );
 
 //delete actors
 exports.deleteUsers = catchAsync( async (req, res, next) =>{
 
 } );

 exports.logingUser = catchAsync(async(req, res, next) => {

 });