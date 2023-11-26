const express = require('express');
const {UserController} = require('../../controllers')
const router = express.Router();

// api/v1/users POST
router.post('/signup',UserController.signup);

router.post('/signin',UserController.signin);



module.exports = router;