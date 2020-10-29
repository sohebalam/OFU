import checkAPIs from 'express-validator';


const { check} = checkAPIs;

const userSigninValidator = [
    
    check('email')
    .isEmail()
    .withMessage('Email is required and Valid Email address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least  characters long'),

]

export default  userSigninValidator