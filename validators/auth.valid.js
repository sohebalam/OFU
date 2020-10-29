import checkAPIs from 'express-validator';


const { check} = checkAPIs;



const userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Email is required and Valid Email address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least  characters long'),

]



export default userSignupValidator