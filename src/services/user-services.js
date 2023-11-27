const {Auth} = require('../utils/common')
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
async function signin(data){
    try {
        const user = await userPepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found with given email',StatusCodes.NOT_FOUND);
        } 
        const passwordMatch = await Auth.checkPasword(data.password,user.password);
        
        if(!passwordMatch){
            throw new AppError('Password Does not match',StatusCodes.BAD_REQUEST);
        }
        const jwt_token = Auth.createToken({id:user.id,email:user.email});
        return jwt_token;
        
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userPepository.get(response.id);
        if(!user){
            throw new AppError('No user Found',StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('something went wrong',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createUser,
    signin,
    isAuthenticated
}