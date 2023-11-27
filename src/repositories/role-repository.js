const {StatusCodes} = require('http-status-codes');
const CrudRepository = require('./crud-repository');

const {Role} = require('../models');
const { Op } = require('sequelize');


class RoleReapositry extends CrudRepository{
    constructor (){
        super(Role)
    }

    async getRoleByName(name){
        const role = await Role.findOne({where:{
            name:name
        }});
        return role;
    }
}

module.exports = RoleReapositry;