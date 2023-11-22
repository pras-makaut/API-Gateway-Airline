const express = require('express');
const router = express.Router();
const {InfoController} = require('../../controllers');
const UserRoutes = require('./user-routes');
router.get('/info',InfoController.info);

router.use('/signup',UserRoutes);


module.exports = router;