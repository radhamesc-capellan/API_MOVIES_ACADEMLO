const express =  require('express');

//Controllers

const {
    getAllUsers,
    getUserById,
    createNewUser,
    logingUser,
} = require ('../controllers/users.controller');



const router = express.Router();

router.get ('/', getAllUsers);
router.get ('/:id', getUserById);
router.post ('/', createNewUser);
router.post ('/login', logingUser);

module.exports = { usersRouter: router};