import express from 'express'
const router = express.Router()
import signup from '../controllers/authCont.js'
import runValidation from '../validators/index.js'

import userSignupValidator from '../validators/auth.valid.js'


router.post('/signup', userSignupValidator, runValidation, signup)


export default router