
const {UserRepository} = require('../repositories');
const db = require('../models');
const {ServerConfig} = require('../config')
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const userPepository = new UserRepository();

async function createUser(data){

    try {
        const user = await userPepository.createData(data);
        return user;
        
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create the new user object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createUser
}