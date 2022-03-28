/*
 getAllUsers,
 getUserById,
 createNewUser,
 logingUser
 */

//!role magnament??????
//? add role

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { filterObj } = require('../utils/filterObj');

dotenv.config({ path: '../config.env' });

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user given an email and has status active
  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  // Compare entered password vs hashed password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  // Create JWT
  const token = await jwt.sign(
    { id: user.id }, // Token payload
    process.env.JWT_SECRET, // Secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

//get list all getAllUsers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    where: { status: 'active' }
  });

  res.status(200).json({ status: 'success', data: { users } });
});

//get list Users by id
exports.getUsersById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id }
  });

  if (!user) {
    return next(new AppError(404, 'User Not Found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

//create new Users and save in DB
exports.createNewUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError(400, 'Must Provide a Valid Name, Email or Password')
    );
  }

  const salt = await bcrypt.genSalt(9);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  newUser.password = undefined;

  res.status(201)({
    status: 'success',
    data: { newUser }
  });
});

//update Users
exports.updateUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found with given id'));
  }
  const data = filterObj(req.body, 'username', 'email');

  await user.update({ ...data });

  res.status(204).json({ status: 'success' });
});

//delete actors
exports.deleteUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, 'User not found with given id'));
  }

  await user.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
