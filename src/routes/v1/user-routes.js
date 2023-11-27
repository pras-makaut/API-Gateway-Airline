const express = require('express');
const {UserController} = require('../../controllers')
const router = express.Router();

const {AuthRequestMiddlewares} = require('../../middleware');

// api/v1/users POST
router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,UserController.signup);

router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signin);

router.post('/role',AuthRequestMiddlewares.checkAuth,AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser);



module.exports = router;