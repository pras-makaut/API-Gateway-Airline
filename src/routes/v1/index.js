const express = require('express');
const router = express.Router();
const {InfoController} = require('../../controllers');
const UserRoutes = require('./user-routes');
const {AuthRequestMiddlewares} = require('../../middleware');
router.get('/info',AuthRequestMiddlewares.checkAuth, InfoController.info);

router.use('/users',UserRoutes);


module.exports = router;