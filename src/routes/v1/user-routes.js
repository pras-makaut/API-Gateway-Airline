const express = require('express');
const {UserController} = require('../../controllers')
const router = express.Router();

// api/v1/users POST
router.post('/',UserController.signup);



module.exports = router;