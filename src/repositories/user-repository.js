const {StatusCodes} = require('http-status-codes');
const CrudRepository = require('./crud-repository');

const {User} = require('../models');
const { Op } = require('sequelize');


class UserReapositry extends CrudRepository{
    constructor (){
        super(User)
    }

    async getUserByEmail(email){
        const user = await User.findOne({where:{
            email:email
        }});
        return user;
    }
}

module.exports = UserReapositry;