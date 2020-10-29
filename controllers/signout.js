import checkAPIs from 'express-validator';
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config()

const { check} = checkAPIs;


export const signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'signout success'
    })
}


export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256']
})


