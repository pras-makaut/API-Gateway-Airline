const {StatusCodes} = require('http-status-codes');
const CrudRepository = require('./crud-repository');

const {User} = require('../models');
const { Op } = require('sequelize');


class UserReapositry extends CrudRepository{
    constructor (){
        super(User)
    }
}

module.exports = UserReapositry;