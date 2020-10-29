import express from 'express'
const router = express.Router()
import signup from '../controllers/authCont.js'
import signin from '../controllers/signinCont.js'
import runValidation from '../validators/index.js'

import userSignupValidator from '../validators/auth.valid.js'
import userSigninValidator  from '../validators/signinValid.js'


router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin);



export default router